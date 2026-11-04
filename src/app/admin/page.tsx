'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type User = {
  id: string
  email: string
  name: string
  roles: string[]
}

type Stats = {
  totalRegistrations: number
  confirmed: number
  checkedIn: number
  ticketTypes: number
  speakers: number
  sponsors: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch('/api/auth/me')
        if (!meRes.ok) {
          router.push('/admin/login')
          return
        }
        const meData = await meRes.json()
        setUser(meData.user)

        const regRes = await fetch('/api/registrations?limit=1')
        if (regRes.ok) {
          const regData = await regRes.json()
          setStats({
            totalRegistrations: regData.pagination?.total || 0,
            confirmed: regData.pagination?.total || 0,
            checkedIn: 0,
            ticketTypes: 0,
            speakers: 0,
            sponsors: 0,
          })
        }
      } catch {
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [router])

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-400">Loading dashboard…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Event Admin</h1>
            <p className="text-xs text-slate-400">{user?.name} · {user?.roles.join(', ')}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-slate-400 hover:text-cyan-400">
              View Public Site
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-slate-400 hover:text-red-400"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-8">Dashboard Overview</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {[
            { label: 'Registrations', value: stats?.totalRegistrations ?? '–' },
            { label: 'Confirmed', value: stats?.confirmed ?? '–' },
            { label: 'Checked In', value: stats?.checkedIn ?? '–' },
            { label: 'Ticket Types', value: stats?.ticketTypes ?? '–' },
            { label: 'Speakers', value: stats?.speakers ?? '–' },
            { label: 'Sponsors', value: stats?.sponsors ?? '–' },
          ].map((s) => (
            <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <p className="text-2xl font-bold text-cyan-400">{s.value}</p>
              <p className="text-sm text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: '/admin/registrations', title: 'Registrations', desc: 'View & manage all registrations' },
            { href: '/admin/tickets', title: 'Tickets & Check-in', desc: 'QR scanner and ticket status' },
            { href: '/admin/event', title: 'Event Configuration', desc: 'Name, branding, dates, venue' },
            { href: '/admin/speakers', title: 'Speakers', desc: 'Manage speakers & sessions' },
            { href: '/admin/sponsors', title: 'Sponsors', desc: 'Manage sponsors & tiers' },
            { href: '/admin/spocs', title: 'SPOCs', desc: 'Single points of contact' },
            { href: '/admin/emails', title: 'Email Campaigns', desc: 'Send & schedule emails' },
            { href: '/admin/users', title: 'Users & Roles', desc: 'Admin users and permissions' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-5 transition"
            >
              <h4 className="font-semibold text-white mb-1">{item.title}</h4>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
          <h3 className="font-semibold mb-2">Getting Started</h3>
          <ol className="text-sm text-slate-400 space-y-1 list-decimal list-inside">
            <li>Update Event Configuration with your real event details and branding.</li>
            <li>Add Speakers, Sponsors, and assign SPOCs to ticket categories.</li>
            <li>Customize registration form fields if needed.</li>
            <li>Share the public registration link.</li>
            <li>Use the Check-in page on event day to scan QR codes.</li>
          </ol>
        </div>
      </main>
    </div>
  )
}
