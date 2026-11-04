'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function TicketPage() {
  const params = useParams()
  const token = params.token as string
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/tickets/verify?token=${encodeURIComponent(token)}`)
        const json = await res.json()
        if (!res.ok) setError(json.error || 'Ticket not found')
        else setData(json)
      } catch {
        setError('Failed to load ticket')
      } finally {
        setLoading(false)
      }
    }
    if (token) load()
  }, [token])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-400">Loading ticket…</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Invalid Ticket</h1>
          <p className="text-slate-400 mb-6">{error || 'This ticket could not be found.'}</p>
          <Link href="/" className="text-cyan-400 hover:underline">Back to Home</Link>
        </div>
      </div>
    )
  }

  const statusColor =
    data.status === 'VALID' ? 'text-emerald-400' :
    data.status === 'USED' ? 'text-amber-400' : 'text-red-400'

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-2">Official Ticket</p>
          <h1 className="text-2xl font-bold">{data.eventName}</h1>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className={`px-6 py-3 text-center text-sm font-semibold ${statusColor} bg-slate-950/50`}>
            Status: {data.status}
          </div>

          <div className="p-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Ticket Number</span>
              <span className="font-mono font-medium">{data.ticketNumber}</span>
            </div>
            {data.registrationId && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Registration ID</span>
                <span className="font-mono">{data.registrationId}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Ticket Type</span>
              <span>{data.ticketType}</span>
            </div>
            {data.fullName && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Name</span>
                <span>{data.fullName}</span>
              </div>
            )}
            {data.venue && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Venue</span>
                <span>{data.venue}</span>
              </div>
            )}
            {data.checkedInAt && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Checked In</span>
                <span>{new Date(data.checkedInAt).toLocaleString()}</span>
              </div>
            )}
          </div>

          <div className="px-6 pb-6 text-center">
            <p className="text-xs text-slate-500 mb-2">Present this page at the entrance.</p>
            <p className="text-xs font-mono text-slate-600 break-all">{token}</p>
          </div>
        </div>

        {data.spocs && data.spocs.length > 0 && (
          <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="font-semibold text-cyan-400 mb-4">Your Point of Contact</h3>
            {data.spocs.map((s: any, i: number) => (
              <div key={i} className="mb-4 last:mb-0">
                <p className="font-medium">{s.name}</p>
                {s.designation && <p className="text-sm text-slate-400">{s.designation}</p>}
                {s.email && <p className="text-sm">{s.email}</p>}
                {s.phone && <p className="text-sm">{s.phone}</p>}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/" className="text-slate-400 hover:text-cyan-400 text-sm">← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
