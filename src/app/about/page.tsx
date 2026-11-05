import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'About',
  description: 'About TechVista 2026 – College Tech & Cultural Fest',
}

export default function AboutPage() {
  return (
    <div>
      <section className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
          alt="Team collaboration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/70 flex items-end">
          <div className="max-w-6xl mx-auto px-6 pb-10 w-full">
            <p className="text-cyan-400 text-sm tracking-widest uppercase mb-2">About</p>
            <h1 className="text-4xl md:text-5xl font-bold">TechVista 2026</h1>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-10">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">Innovate. Create. Celebrate.</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            TechVista is the flagship annual technology and cultural festival organised by the
            Student Council. Over three days, the campus transforms into a hub of workshops,
            competitions, talks, exhibitions, and stage performances.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Whether you are a coder, designer, entrepreneur, performer, or curious first-year —
            TechVista is designed so every student finds a track, a team, and a memory.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: 'Technology', d: 'Workshops, hackathons, product demos, and tech talks.' },
            { t: 'Culture', d: 'Music, dance, theatre, and open-mic nights under the stars.' },
            { t: 'Community', d: 'Networking, stalls, sponsors, volunteers, and campus clubs.' },
          ].map((x) => (
            <div key={x.t} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-cyan-400 font-semibold mb-2">{x.t}</h3>
              <p className="text-slate-400 text-sm">{x.d}</p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { k: 'Dates', v: '15 – 17 March 2026' },
            { k: 'Venue', v: 'College Main Campus' },
            { k: 'Organizer', v: 'Student Council' },
            { k: 'Contact', v: 'techvista@college.edu' },
          ].map((x) => (
            <div key={x.k} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
              <p className="text-cyan-400 text-xs uppercase tracking-wider mb-1">{x.k}</p>
              <p className="font-medium">{x.v}</p>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <Link
            href="/register"
            className="inline-flex px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg"
          >
            Register for TechVista
          </Link>
        </div>
      </section>
    </div>
  )
}
