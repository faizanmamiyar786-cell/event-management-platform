import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const userCount = await prisma.user.count()
    if (userCount > 0) {
      return NextResponse.json(
        { error: 'Setup already completed. Database already has users.' },
        { status: 403 }
      )
    }

    const body = await req.json().catch(() => ({}))
    const email = (body.email || process.env.INITIAL_ADMIN_EMAIL || 'admin@example.com').toLowerCase().trim()
    const password = body.password || process.env.INITIAL_ADMIN_PASSWORD || 'ChangeMe123!'
    const name = body.name || process.env.INITIAL_ADMIN_NAME || 'Super Admin'

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    const roles = [
      { name: 'SUPER_ADMIN', description: 'Full access to everything', isSystem: true },
      { name: 'EVENT_MANAGER', description: 'Manage event, pages, registrations, communications', isSystem: true },
      { name: 'SPEAKER_MANAGER', description: 'Manage speakers and their schedules', isSystem: true },
      { name: 'SPONSOR_MANAGER', description: 'Manage sponsors', isSystem: true },
      { name: 'STALL_MANAGER', description: 'Manage stalls and stall owners', isSystem: true },
      { name: 'ARTIST_MANAGER', description: 'Manage artists and performers', isSystem: true },
      { name: 'REGISTRATION_MANAGER', description: 'View and manage registrations, check-ins', isSystem: true },
      { name: 'CHECKIN_STAFF', description: 'Scan QR codes and check-in participants', isSystem: true },
    ]

    for (const role of roles) {
      await prisma.role.upsert({
        where: { name: role.name },
        update: {},
        create: role,
      })
    }

    const permissionModules = [
      'event', 'pages', 'registrations', 'tickets', 'speakers', 'sponsors',
      'exhibitors', 'stalls', 'artists', 'performers', 'volunteers', 'spocs',
      'users', 'roles', 'emails', 'reports', 'settings', 'checkin'
    ]
    const actions = ['read', 'create', 'update', 'delete', 'export']

    for (const mod of permissionModules) {
      for (const action of actions) {
        const code = `${mod}:${action}`
        await prisma.permission.upsert({
          where: { code },
          update: {},
          create: { code, name: `${action} ${mod}`, module: mod },
        })
      }
    }

    const superAdminRole = await prisma.role.findUnique({ where: { name: 'SUPER_ADMIN' } })
    const allPermissions = await prisma.permission.findMany()
    if (superAdminRole) {
      for (const perm of allPermissions) {
        await prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: superAdminRole.id,
              permissionId: perm.id,
            },
          },
          update: {},
          create: { roleId: superAdminRole.id, permissionId: perm.id },
        })
      }
    }

    const passwordHash = await hashPassword(password)
    await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        isActive: true,
        emailVerified: true,
        roles: { create: { roleId: superAdminRole!.id } },
      },
    })

    const event = await prisma.event.create({
      data: {
        name: 'TechVista 2026',
        tagline: 'Innovate. Create. Celebrate.',
        description: 'The flagship annual technology and cultural festival of the college.',
        category: 'tech-fest',
        startDate: new Date('2026-03-15'),
        endDate: new Date('2026-03-17'),
        startTime: '09:00',
        endTime: '22:00',
        timezone: 'Asia/Kolkata',
        venueName: 'College Main Campus',
        venueAddress: 'University Road, City, State 123456',
        organizerName: 'Student Council',
        organizerEmail: 'techvista@college.edu',
        organizerPhone: '+91 98765 43210',
        primaryColor: '#0f172a',
        secondaryColor: '#06b6d4',
        backgroundColor: '#f8fafc',
        textColor: '#0f172a',
        registrationMode: 'OPEN',
        isPublished: true,
      },
    })

    const pages = [
      { slug: 'home', title: 'Home', sortOrder: 0 },
      { slug: 'about', title: 'About the Event', sortOrder: 1 },
      { slug: 'agenda', title: 'Event Agenda', sortOrder: 2 },
      { slug: 'speakers', title: 'Speakers', sortOrder: 3 },
      { slug: 'sponsors', title: 'Sponsors', sortOrder: 4 },
      { slug: 'workshops', title: 'Workshops', sortOrder: 5 },
      { slug: 'venue', title: 'Venue & Location', sortOrder: 6 },
      { slug: 'register', title: 'Registration', sortOrder: 7 },
      { slug: 'contact', title: 'Contact', sortOrder: 8 },
      { slug: 'privacy', title: 'Privacy Policy', sortOrder: 9 },
      { slug: 'terms', title: 'Terms and Conditions', sortOrder: 10 },
    ]

    for (const page of pages) {
      await prisma.eventPage.create({
        data: { eventId: event.id, ...page, isEnabled: true, content: {} },
      })
    }

    const ticketTypes = [
      { name: 'General Attendee', description: 'Access to all open sessions', price: 0, sortOrder: 0 },
      { name: 'Workshop Participant', description: 'Includes materials and certificate', price: 299, sortOrder: 1 },
      { name: 'VIP', description: 'Priority seating and networking', price: 999, sortOrder: 2 },
      { name: 'Speaker', description: 'For invited speakers', price: 0, requiresApproval: true, sortOrder: 3 },
      { name: 'Stall Owner', description: 'Exhibition stall allocation', price: 4999, requiresApproval: true, sortOrder: 4 },
      { name: 'Volunteer', description: 'Event volunteer registration', price: 0, requiresApproval: true, sortOrder: 5 },
    ]

    for (const tt of ticketTypes) {
      await prisma.ticketType.create({
        data: { eventId: event.id, ...tt, currency: 'INR', isActive: true },
      })
    }

    const formFields = [
      { name: 'fullName', label: 'Full Name', type: 'text', isRequired: true, sortOrder: 0 },
      { name: 'email', label: 'Email Address', type: 'email', isRequired: true, sortOrder: 1 },
      { name: 'phone', label: 'Mobile Number', type: 'phone', isRequired: true, sortOrder: 2 },
      { name: 'organization', label: 'College / Organization', type: 'text', isRequired: false, sortOrder: 3 },
      { name: 'city', label: 'City', type: 'text', isRequired: false, sortOrder: 4 },
    ]

    for (const field of formFields) {
      await prisma.registrationFormField.create({
        data: { eventId: event.id, ...field, isActive: true },
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Setup completed successfully!',
      admin: { email, name },
      event: { id: event.id, name: event.name },
      nextSteps: [
        '1. Login at /admin/login with the admin credentials',
        '2. Customize your event in the admin dashboard',
        '3. Share the public registration link',
      ],
    })
  } catch (error: any) {
    console.error('Setup error:', error)
    return NextResponse.json(
      { error: error.message || 'Setup failed. Check database connection and try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const userCount = await prisma.user.count()
    const eventCount = await prisma.event.count()
    return NextResponse.json({ setupRequired: userCount === 0, userCount, eventCount })
  } catch {
    return NextResponse.json({
      setupRequired: true,
      error: 'Database not ready. Ensure DATABASE_URL is set correctly.',
    })
  }
}
