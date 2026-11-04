import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Public endpoint – returns the first published event + active ticket types.
 * Used by the registration page and public website.
 */
export async function GET() {
  try {
    const event = await prisma.event.findFirst({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
    })

    if (!event) {
      return NextResponse.json({ error: 'No published event found' }, { status: 404 })
    }

    const ticketTypes = await prisma.ticketType.findMany({
      where: {
        eventId: event.id,
        isActive: true,
      },
      orderBy: { sortOrder: 'asc' },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        currency: true,
        capacity: true,
        soldCount: true,
      },
    })

    return NextResponse.json({
      event: {
        id: event.id,
        name: event.name,
        tagline: event.tagline,
        description: event.description,
        category: event.category,
        startDate: event.startDate,
        endDate: event.endDate,
        startTime: event.startTime,
        endTime: event.endTime,
        venueName: event.venueName,
        venueAddress: event.venueAddress,
        registrationMode: event.registrationMode,
        primaryColor: event.primaryColor,
        secondaryColor: event.secondaryColor,
      },
      ticketTypes,
    })
  } catch (error) {
    console.error('Public event fetch error:', error)
    return NextResponse.json({ error: 'Failed to load event' }, { status: 500 })
  }
}
