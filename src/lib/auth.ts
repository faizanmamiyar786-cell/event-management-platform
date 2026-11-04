import { cookies } from 'next/headers'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { randomBytes } from 'crypto'

const AUTH_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'fallback-dev-secret-change-me-in-production-32chars'
)

const SESSION_COOKIE = 'event_session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export type SessionUser = {
  id: string
  email: string
  name: string
  roles: string[]
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createSession(userId: string, ip?: string, ua?: string) {
  const token = randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000)

  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
      ipAddress: ip,
      userAgent: ua,
    },
  })

  const jwt = await new SignJWT({ sub: userId, token })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(AUTH_SECRET)

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })

  return { token, expiresAt }
}

export async function destroySession() {
  const cookieStore = await cookies()
  const jwt = cookieStore.get(SESSION_COOKIE)?.value

  if (jwt) {
    try {
      const { payload } = await jwtVerify(jwt, AUTH_SECRET)
      const token = payload.token as string
      if (token) {
        await prisma.session.deleteMany({ where: { token } })
      }
    } catch {
      // ignore invalid token
    }
  }

  cookieStore.delete(SESSION_COOKIE)
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const jwt = cookieStore.get(SESSION_COOKIE)?.value

  if (!jwt) return null

  try {
    const { payload } = await jwtVerify(jwt, AUTH_SECRET)
    const userId = payload.sub as string
    const token = payload.token as string

    if (!userId || !token) return null

    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        user: {
          include: {
            roles: {
              include: { role: true },
            },
          },
        },
      },
    })

    if (!session || session.expiresAt < new Date() || !session.user.isActive) {
      await prisma.session.deleteMany({ where: { token } })
      return null
    }

    return {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      roles: session.user.roles.map((r) => r.role.name),
    }
  } catch {
    return null
  }
}

export async function requireAuth(requiredRoles?: string[]): Promise<SessionUser> {
  const user = await getSession()
  if (!user) {
    throw new Error('UNAUTHORIZED')
  }

  if (requiredRoles && requiredRoles.length > 0) {
    const hasRole = requiredRoles.some((r) => user.roles.includes(r))
    if (!hasRole && !user.roles.includes('SUPER_ADMIN')) {
      throw new Error('FORBIDDEN')
    }
  }

  return user
}

export async function login(email: string, password: string, ip?: string, ua?: string) {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
    include: {
      roles: { include: { role: true } },
    },
  })

  if (!user || !user.isActive) {
    return { error: 'Invalid email or password' }
  }

  const valid = await verifyPassword(password, user.passwordHash)
  if (!valid) {
    return { error: 'Invalid email or password' }
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  })

  await createSession(user.id, ip, ua)

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'LOGIN',
      entity: 'User',
      entityId: user.id,
      ipAddress: ip,
      userAgent: ua,
    },
  })

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles.map((r) => r.role.name),
    },
  }
}
