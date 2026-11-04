'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type TicketType = {
  id: string
  name: string
  description: string | null
  price: number
  currency: string
  capacity: number | null
  soldCount: number
}

type EventInfo = {
  id: string
  name: string
  tagline: string | null
  registrationMode: string
}

export default function RegisterPage() {
  const [event, setEvent] = useState<EventInfo | null>(null)
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState<any>(null)

  const [form, setForm] = useState({
    ticketTypeId: '',
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    city: '',
    invitationCode: '',
    rsvpStatus: 'ATTENDING' as const,
  })

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/events/public')
        if (res.ok) {
          const data = await res.json()
          setEvent(data.event)
          setTicketTypes(data.ticketTypes || [])
          if (data.ticketTypes?.length > 0) {
            setForm((f) => ({ ...f, ticketTypeId: data.ticketTypes[0].id }))
          }
        } else {
          setError('Unable to load event. Ensure setup has been run.')
        }
      } catch {
        setError('Failed to load registration form.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      if (!event) {
        setError('Event not loaded')
        return
      }
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          ticketTypeId: form.ticketTypeId,
          fullName: form.fullName,
          email: form.email,
          phone: form.phone || undefined,
          organization: form.organization || undefined,
          city: form.city || undefined,
          invitationCode: form.invitationCode || undefined,
          rsvpStatus: event.registrationMode === 'RSVP' ? form.rsvpStatus : undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Registration failed')
        return
      }
      setSuccess(data)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-400">Loading registration form…</p>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="max-w-lg mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold mb-2">Registration Confirmed!</h1>
          <p className="text-slate-400 mb-8">
            You are registered for <strong className="text-white">{success.event?.name}</strong>
          </p>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-left mb-8 space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Registration ID</span>
              <span className="font-mono text-cyan-400">{success.registration?.registrationId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Ticket Number</span>
              <span className="font-mono">{success.ticket?.ticketNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Name</span>
              <span>{success.registration?.fullName}</span>
            </div>
          </div>
          {success.ticket?.qrDataUrl && (
            <div className="mb-8">
              <p className="text-sm text-slate-400 mb-3">Your QR Code</p>
              <img src={success.ticket.qrDataUrl} alt="QR Code" className="mx-auto rounded-lg" width={220} height={220} />
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={success.ticketUrl || `/ticket/${success.ticket?.qrToken}`} className="px-6 py-3 bg-cyan-500 text-slate-950 font-semibold rounded-lg">
              View Full Ticket
            </Link>
            <Link href="/" className="px-6 py-3 border border-slate-600 rounded-lg">Back to Home</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-xl mx-auto px-6 py-16">
        <Link href="/" className="text-slate-400 hover:text-cyan-400 text-sm mb-8 inline-block">← Back to Home</Link>
        <h1 className="text-3xl font-bold mb-2">{event ? `Register for ${event.name}` : 'Event Registration'}</h1>
        {event?.tagline && <p className="text-slate-400 mb-10">{event.tagline}</p>}

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {ticketTypes.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Ticket Type *</label>
              <select required value={form.ticketTypeId} onChange={(e) => setForm({ ...form, ticketTypeId: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white">
                {ticketTypes.map((tt) => (
                  <option key={tt.id} value={tt.id}>
                    {tt.name} {Number(tt.price) > 0 ? `– ₹${tt.price}` : '(Free)'}
                  </option>
                ))}
              </select>
            </div>
          )}

          {event?.registrationMode === 'INVITATION' && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Invitation Code *</label>
              <input type="text" required value={form.invitationCode} onChange={(e) => setForm({ ...form, invitationCode: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white" placeholder="Enter code" />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
            <input type="text" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Mobile</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">College / Organization</label>
            <input type="text" value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">City</label>
            <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white" />
          </div>

          <button type="submit" disabled={submitting || ticketTypes.length === 0}
            className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-semibold rounded-lg">
            {submitting ? 'Registering…' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </div>
  )
}
