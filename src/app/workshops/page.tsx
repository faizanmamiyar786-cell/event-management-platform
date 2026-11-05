import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Workshops',
  description: 'Hands-on workshops at TechVista 2026',
}

const workshops = [
  {
    title: 'Intro to Generative AI',
    level: 'Beginner',
    duration: '2 hours',
    seats: '40 seats',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Full-stack with Next.js',
    level: 'Intermediate',
    duration: '3 hours',
    seats: '30 seats',
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'UI Design Sprint',
    level: 'All levels',
    duration: '2.5 hours',
    seats: '35 seats',
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Cybersecurity Basics',
    level: 'Beginner',
    duration: '2 hours',
    seats: '40 seats',
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Product Thinking Lab',
    level: 'Intermediate',
    duration: '2 hours',
    seats: '25 seats',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Creative Coding & Visuals',
    level: 'All levels',
    duration: '2 hours',
    seats: '30 seats',
    image:
      'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=800&q=80',
  },
]

export default function WorkshopsPage() {
  return (
    <div>
      <section className="relative h-56 md:h-72 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80"
          alt="Workshop"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/75 flex items-end">
          <div className="max-w-6xl mx-auto px-6 pb-10 w-full">
            <p className="text-cyan-400 text-sm tracking-widest uppercase mb-2">Learn by doing</p>
            <h1 className="text-4xl font-bold">Workshops</h1>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-slate-400 max-w-2xl mb-10">
          Limited seats. Choose the <strong className="text-white">Workshop Participant</strong>{' '}
          ticket when you register to access materials and certificates where applicable.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((w) => (
            <article
              key={w.title}
              className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/50 hover:border-cyan-500/40 transition"
            >
              <div className="relative h-44">
                <Image src={w.image} alt={w.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold mb-2">{w.title}</h2>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-slate-800 text-cyan-300">{w.level}</span>
                  <span className="px-2 py-1 rounded bg-slate-800 text-slate-300">{w.duration}</span>
                  <span className="px-2 py-1 rounded bg-slate-800 text-slate-300">{w.seats}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/register"
            className="inline-flex px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg"
          >
            Register for workshops
          </Link>
        </div>
      </section>
    </div>
  )
}
