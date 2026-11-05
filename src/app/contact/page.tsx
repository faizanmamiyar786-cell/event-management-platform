import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Contact',
  description: 'Contact the TechVista 2026 organising team',
}

const contacts = [
  {
    role: 'Overall Coordinator',
    name: 'Student Council Desk',
    email: 'techvista@college.edu',
    phone: '+91 98765 43210',
  },
  {
    role: 'Registrations',
    name: 'Registration Team',
    email: 'register@techvista.college.edu',
    phone: '+91 98765 43211',
  },
  {
    role: 'Sponsorships',
    name: 'Partnerships',
    email: 'sponsors@techvista.college.edu',
    phone: '+91 98765 43212',
  },
  {
    role: 'Media & PR',
    name: 'Communications',
    email: 'media@techvista.college.edu',
    phone: '+91 98765 43213',
  },
]

export default function ContactPage() {
  return (
    <div>
      <section className="relative h-56 md:h-72 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1600&q=80"
          alt="Contact"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/75 flex items-end">
          <div className="max-w-6xl mx-auto px-6 pb-10 w-full">
            <p className="text-cyan-400 text-sm tracking-widest uppercase mb-2">Get in touch</p>
            <h1 className="text-4xl font-bold">Contact</h1>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-slate-400 max-w-2xl mb-10">
          Questions about tickets, workshops, stalls, or volunteering? Reach the right desk below.
          On event days, SPOCs listed on your ticket remain your primary contact.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {contacts.map((c) => (
            <div
              key={c.role}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
            >
              <p className="text-cyan-400 text-sm font-medium mb-1">{c.role}</p>
              <h2 className="text-lg font-semibold mb-3">{c.name}</h2>
              <p className="text-slate-300 text-sm">{c.email}</p>
              <p className="text-slate-400 text-sm">{c.phone}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Ready to join?</h3>
            <p className="text-slate-400 text-sm">
              Register online and receive your QR ticket instantly.
            </p>
          </div>
          <Link
            href="/register"
            className="inline-flex justify-center px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg shrink-0"
          >
            Go to Registration
          </Link>
        </div>
      </section>
    </div>
  )
}
