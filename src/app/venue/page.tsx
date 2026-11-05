import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Venue',
  description: 'Venue and location for TechVista 2026',
}

export default function VenuePage() {
  return (
    <div>
      <section className="relative h-56 md:h-80 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80"
          alt="Campus"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/70 flex items-end">
          <div className="max-w-6xl mx-auto px-6 pb-10 w-full">
            <p className="text-cyan-400 text-sm tracking-widest uppercase mb-2">Location</p>
            <h1 className="text-4xl font-bold">Venue</h1>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">College Main Campus</h2>
          <p className="text-slate-300 leading-relaxed mb-6">
            All major sessions, workshops, exhibitions, and cultural nights will be hosted across
            the main academic block, auditorium, open-air amphitheatre, and innovation plaza.
          </p>
          <ul className="space-y-3 text-slate-400">
            <li>
              <span className="text-cyan-400 font-medium">Address:</span> University Road, City,
              State 123456
            </li>
            <li>
              <span className="text-cyan-400 font-medium">Nearest metro / bus:</span> Campus Gate
              stop (5 min walk)
            </li>
            <li>
              <span className="text-cyan-400 font-medium">Parking:</span> Visitor parking near Gate
              2
            </li>
            <li>
              <span className="text-cyan-400 font-medium">Entry:</span> Bring your digital ticket /
              QR code
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg"
            >
              Get your ticket
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-slate-600 rounded-lg hover:border-slate-400"
            >
              Ask for directions
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <div className="relative h-56 rounded-2xl overflow-hidden border border-slate-800">
            <Image
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80"
              alt="Campus building"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-56 rounded-2xl overflow-hidden border border-slate-800">
            <Image
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80"
              alt="Campus green"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
