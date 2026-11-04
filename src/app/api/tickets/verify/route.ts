import { NextRequest, NextResponse } from 'next/server'
import { getTicketByToken } from '@/lib/tickets'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token')
    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 })
    }

    const ticket = await getTicketByToken(token)
    if (!ticket) {
      return NextResponse.json({ error: 'Invalid ticket', status: 'INVALID' }, { status: 404 })
    }

    const user = await getSession()
    const isStaff = user && (
      user.roles.includes('SUPER_ADMIN') ||
      user.roles.includes('EVENT_MANAGER') ||
      user.roles.includes('REGISTRATION_MANAGER') ||
      user.roles.includes('CHECKIN_STAFF')
    )

    const publicData = {
      ticketNumber: ticket.ticketNumber,
      status: ticket.status,
      ticketType: ticket.registration.ticketType.name,
      eventName: ticket.registration.event.name,
      eventDates: {
        start: ticket.registration.event.startDate,
        end: ticket.registration.event.endDate,
      },
      venue: ticket.registration.event.venueName,
      checkedInAt: ticket.checkedInAt,
      isValid: ticket.status === 'VALID',
    }

    if (!isStaff) {
      return NextResponse.json(publicData)
    }

    const spocs = ticket.registration.ticketType.spocAssignments.map((a) => ({
      name: a.spoc.name,
      designation: a.spoc.designation,
      email: a.spoc.email,
      phone: a.spoc.phone,
      whatsapp: a.spoc.whatsapp,
      responsibility: a.spoc.responsibility,
    }))

    return NextResponse.json({
      ...publicData,
      registrationId: ticket.registration.registrationId,
      fullName: ticket.registration.fullName,
      email: ticket.registration.email,
      phone: ticket.registration.phone,
      organization: ticket.registration.organization,
      spocs,
      checkIns: ticket.checkIns,
      canCheckIn: ticket.status === 'VALID' && !ticket.checkedInAt,
    })
  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const allowed = ['SUPER_ADMIN', 'EVENT_MANAGER', 'REGISTRATION_MANAGER', 'CHECKIN_STAFF']
    if (!allowed.some((r) => user.roles.includes(r))) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    const body = await req.json()
    const { token, notes, force } = body

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 })
    }

    const ticket = await getTicketByToken(token)
    if (!ticket) {
      return NextResponse.json({ error: 'Invalid ticket', status: 'INVALID' }, { status: 404 })
    }

    if (ticket.status === 'CANCELLED' || ticket.status === 'EXPIRED') {
      return NextResponse.json({
        error: `Ticket is ${ticket.status.toLowerCase()}`,
        status: ticket.status,
      }, { status: 400 })
    }

    if (ticket.checkedInAt && !force) {
      return NextResponse.json({
        error: 'Ticket already checked in',
        status: 'USED',
        checkedInAt: ticket.checkedInAt,
      }, { status: 409 })
    }

    const now = new Date()
    await prisma.$transaction([
      prisma.ticket.update({
        where: { id: ticket.id },
        data: {
          status: 'USED',
          checkedInAt: now,
          checkedInById: user.id,
        },
      }),
      prisma.checkIn.create({
        data: {
          ticketId: ticket.id,
          checkedInBy: user.id,
          checkedInAt: now,
          notes: notes || null,
        },
      }),
      prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'CHECKIN',
          entity: 'Ticket',
          entityId: ticket.id,
          details: {
            ticketNumber: ticket.ticketNumber,
            registrationId: ticket.registration.registrationId,
            force: !!force,
          },
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      message: 'Check-in successful',
      ticketNumber: ticket.ticketNumber,
      fullName: ticket.registration.fullName,
      checkedInAt: now,
    })
  } catch (error) {
    console.error('Check-in error:', error)
    return NextResponse.json({ error: 'Check-in failed' }, { status: 500 })
  }
}
