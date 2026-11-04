import { prisma } from './prisma'
import { randomBytes } from 'crypto'
import QRCode from 'qrcode'

export async function generateRegistrationId(eventId: string): Promise<string> {
  const year = new Date().getFullYear()
  const count = await prisma.registration.count({ where: { eventId } })
  const seq = String(count + 1).padStart(4, '0')
  return `REG-${year}-${seq}`
}

export async function generateTicketNumber(eventId: string): Promise<string> {
  const year = new Date().getFullYear()
  const count = await prisma.ticket.count({
    where: { registration: { eventId } },
  })
  const seq = String(count + 1).padStart(4, '0')
  return `TKT-${year}-${seq}`
}

export function generateQrToken(): string {
  return randomBytes(24).toString('base64url')
}

export async function generateQrDataUrl(token: string, baseUrl: string): Promise<string> {
  const verifyUrl = `${baseUrl}/ticket/verify?token=${token}`
  return QRCode.toDataURL(verifyUrl, {
    errorCorrectionLevel: 'M',
    margin: 2,
    width: 300,
    color: { dark: '#0f172a', light: '#ffffff' },
  })
}

export async function createRegistrationWithTicket(params: {
  eventId: string
  ticketTypeId: string
  fullName: string
  email: string
  phone?: string
  organization?: string
  designation?: string
  city?: string
  country?: string
  answers?: Record<string, any>
  invitationId?: string
  rsvpStatus?: string
}) {
  const registrationId = await generateRegistrationId(params.eventId)
  const ticketNumber = await generateTicketNumber(params.eventId)
  const qrToken = generateQrToken()

  const result = await prisma.$transaction(async (tx) => {
    const existing = await tx.registration.findFirst({
      where: {
        eventId: params.eventId,
        email: params.email.toLowerCase().trim(),
        ticketTypeId: params.ticketTypeId,
        status: { not: 'CANCELLED' },
      },
    })
    if (existing) throw new Error('DUPLICATE_REGISTRATION')

    const registration = await tx.registration.create({
      data: {
        eventId: params.eventId,
        ticketTypeId: params.ticketTypeId,
        registrationId,
        fullName: params.fullName.trim(),
        email: params.email.toLowerCase().trim(),
        phone: params.phone?.trim(),
        organization: params.organization?.trim(),
        designation: params.designation?.trim(),
        city: params.city?.trim(),
        country: params.country?.trim(),
        answers: params.answers || {},
        invitationId: params.invitationId,
        rsvpStatus: params.rsvpStatus,
        status: 'CONFIRMED',
      },
    })

    const ticket = await tx.ticket.create({
      data: {
        registrationId: registration.id,
        ticketTypeId: params.ticketTypeId,
        ticketNumber,
        qrToken,
        status: 'VALID',
      },
    })

    await tx.ticketType.update({
      where: { id: params.ticketTypeId },
      data: { soldCount: { increment: 1 } },
    })

    return { registration, ticket }
  })

  return result
}

export async function getTicketByToken(token: string) {
  return prisma.ticket.findUnique({
    where: { qrToken: token },
    include: {
      registration: {
        include: {
          event: true,
          ticketType: {
            include: {
              spocAssignments: { include: { spoc: true } },
            },
          },
        },
      },
      checkIns: {
        include: { staff: { select: { name: true, email: true } } },
        orderBy: { checkedInAt: 'desc' },
        take: 5,
      },
    },
  })
}
