import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createRegistrationWithTicket, generateQrDataUrl } from '@/lib/tickets'
import { z } from 'zod'

const registrationSchema = z.object({
  eventId: z.string().min(1),
  ticketTypeId: z.string().min(1),
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  organization: z.string().optional(),
  designation: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  answers: z.record(z.any()).optional(),
  invitationCode: z.string().optional(),
  rsvpStatus: z.enum(['ATTENDING', 'NOT_ATTENDING', 'MAYBE']).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = registrationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data

    const event = await prisma.event.findUnique({ where: { id: data.eventId } })
    if (!event || !event.isPublished) {
      return NextResponse.json({ error: 'Event not found or not published' }, { status: 404 })
    }

    const ticketType = await prisma.ticketType.findFirst({
      where: { id: data.ticketTypeId, eventId: data.eventId, isActive: true },
    })
    if (!ticketType) {
      return NextResponse.json({ error: 'Invalid ticket type' }, { status: 400 })
    }

    if (ticketType.capacity !== null && ticketType.soldCount >= ticketType.capacity) {
      return NextResponse.json({ error: 'This ticket type is sold out' }, { status: 400 })
    }

    let invitationId: string | undefined
    if (event.registrationMode === 'INVITATION') {
      if (!data.invitationCode) {
        return NextResponse.json({ error: 'Invitation code is required' }, { status: 400 })
      }
      const invitation = await prisma.invitation.findFirst({
        where: {
          eventId: data.eventId,
          code: data.invitationCode.toUpperCase().trim(),
          isActive: true,
        },
      })
      if (!invitation) {
        return NextResponse.json({ error: 'Invalid invitation code' }, { status: 400 })
      }
      if (invitation.expiresAt && invitation.expiresAt < new Date()) {
        return NextResponse.json({ error: 'Invitation has expired' }, { status: 400 })
      }
      if (invitation.usedCount >= invitation.maxUses) {
        return NextResponse.json({ error: 'Invitation has reached maximum uses' }, { status: 400 })
      }
      invitationId = invitation.id
      await prisma.invitation.update({
        where: { id: invitation.id },
        data: { usedCount: { increment: 1 } },
      })
    }

    const { registration, ticket } = await createRegistrationWithTicket({
      eventId: data.eventId,
      ticketTypeId: data.ticketTypeId,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      organization: data.organization,
      designation: data.designation,
      city: data.city,
      country: data.country,
      answers: data.answers,
      invitationId,
      rsvpStatus: data.rsvpStatus,
    })

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const qrDataUrl = await generateQrDataUrl(ticket.qrToken, baseUrl)

    await prisma.ticket.update({
      where: { id: ticket.id },
      data: { qrCodeUrl: qrDataUrl },
    })

    const spocs = await prisma.spocAssignment.findMany({
      where: { ticketTypeId: data.ticketTypeId },
      include: { spoc: true },
    })

    return NextResponse.json({
      success: true,
      registration: {
        id: registration.id,
        registrationId: registration.registrationId,
        fullName: registration.fullName,
        email: registration.email,
        status: registration.status,
      },
      ticket: {
        id: ticket.id,
        ticketNumber: ticket.ticketNumber,
        qrToken: ticket.qrToken,
        qrDataUrl,
        status: ticket.status,
      },
      event: {
        name: event.name,
        startDate: event.startDate,
        venueName: event.venueName,
      },
      ticketType: { name: ticketType.name },
      spocs: spocs.map((s) => ({
        name: s.spoc.name,
        designation: s.spoc.designation,
        email: s.spoc.email,
        phone: s.spoc.phone,
        whatsapp: s.spoc.whatsapp,
        responsibility: s.spoc.responsibility,
      })),
      ticketUrl: `${baseUrl}/ticket/${ticket.qrToken}`,
    })
  } catch (error: any) {
    console.error('Registration error:', error)
    if (error.message === 'DUPLICATE_REGISTRATION') {
      return NextResponse.json(
        { error: 'You have already registered for this ticket type with this email' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: error.message || 'Registration failed. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const eventId = searchParams.get('eventId')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)

    const where: any = {}
    if (eventId) where.eventId = eventId
    if (status) where.status = status

    const [registrations, total] = await Promise.all([
      prisma.registration.findMany({
        where,
        include: {
          ticketType: { select: { name: true } },
          ticket: { select: { ticketNumber: true, status: true, qrToken: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.registration.count({ where }),
    ])

    return NextResponse.json({
      registrations,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('List registrations error:', error)
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 })
  }
}
