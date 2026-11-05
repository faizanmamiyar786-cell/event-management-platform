import Link from 'next/link'
import Image from 'next/image'

const highlights = [
  {
    title: 'Workshops',
    desc: 'Hands-on sessions in AI, web, design, and product.',
    href: '/workshops',
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Speakers',
    desc: 'Industry leaders and campus innovators on stage.',
    href: '/speakers',
    image:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Cultural Night',
    desc: 'Music, dance, and performances under the lights.',
    href: '/agenda',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
  },
]

const stats = [
  { label: 'Days', value: '3' },
  { label: 'Workshops', value: '12+' },
  { label: 'Speakers', value: '20+' },
  { label: 'Expected Footfall', value: '5K+' },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80"
          alt="Conference audience"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <p className="text-cyan-400 font-medium tracking-[0.2em] text-sm uppercase mb-4">
            College Tech &amp; Cultural Fest
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-3xl">
            TechVista <span className="text-cyan-400">2026</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-4">
            Innovate. Create. Celebrate.
          </p>
          <p className="text-slate-400 max-w-xl mb-10">
            Three days of workshops, competitions, speakers, exhibitions, and unforgettable
            cultural performances — 15–17 March 2026 at College Main Campus.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/register"
              className="px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition"
            >
              Register Now
            </Link>
            <Link
              href="/agenda"
              className="px-8 py-3.5 border border-slate-500 hover:border-white text-white font-medium rounded-lg transition"
            >
              View Agenda
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-800 bg-slate-900/40">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl md:text-4xl font-bold text-cyan-400">{s.value}</p>
              <p className="text-slate-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">What awaits you</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            From deep-tech workshops to stage nights — TechVista is built for every kind of campus
            energy.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((h) => (
            <Link
              key={h.title}
              href={h.href}
              className="group rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/40 hover:border-cyan-500/50 transition"
            >
              <div className="relative h-48">
                <Image src={h.image} alt={h.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition">{h.title}</h3>
                <p className="text-slate-400 text-sm">{h.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About blurb */}
      <section className="bg-slate-900/30 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1523580495188-d76d8c8f5e41?auto=format&fit=crop&w=1000&q=80"
              alt="Students collaborating"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-3">About</p>
            <h2 className="text-3xl font-bold mb-4">A festival by students, for students</h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              TechVista is the annual flagship fest of the Student Council — blending technology,
              entrepreneurship, arts, and culture. Whether you code, design, perform, or just want
              to explore, there is a track for you.
            </p>
            <Link href="/about" className="text-cyan-400 font-medium hover:underline">
              Read more about TechVista →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to be part of it?</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Register now to get your digital ticket and QR code. Choose General, Workshop, VIP,
          Speaker, Stall, or Volunteer passes.
        </p>
        <Link
          href="/register"
          className="inline-flex px-10 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg text-lg transition"
        >
          Register for TechVista 2026
        </Link>
      </section>
    </div>
  )
}
