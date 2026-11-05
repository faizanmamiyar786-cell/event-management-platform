import Image from 'next/image'

export const metadata = {
  title: 'Speakers',
  description: 'Speakers at TechVista 2026',
}

const speakers = [
  {
    name: 'Aisha Rahman',
    role: 'AI Researcher',
    org: 'Open Labs',
    topic: 'Building responsible AI products',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Rohan Mehta',
    role: 'Founder',
    org: 'CampusStart',
    topic: 'From idea to first 100 users',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Priya Nair',
    role: 'Design Lead',
    org: 'Pixelcraft',
    topic: 'Design systems for scale',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Dev Kapoor',
    role: 'Security Engineer',
    org: 'ShieldNet',
    topic: 'Practical app security for students',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Meera Joshi',
    role: 'Product Manager',
    org: 'NovaApps',
    topic: 'Shipping products students love',
    image:
      'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Arjun Sethi',
    role: 'Creative Director',
    org: 'StageRight',
    topic: 'Storytelling on campus stages',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
  },
]

export default function SpeakersPage() {
  return (
    <div>
      <section className="relative h-56 md:h-72 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1600&q=80"
          alt="Speaker on stage"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/75 flex items-end">
          <div className="max-w-6xl mx-auto px-6 pb-10 w-full">
            <p className="text-cyan-400 text-sm tracking-widest uppercase mb-2">Line-up</p>
            <h1 className="text-4xl font-bold">Speakers</h1>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-slate-400 max-w-2xl mb-12">
          Meet the practitioners sharing ideas across technology, design, product, security, and
          the creative arts. Final list and session slots will appear on your ticket closer to the
          event.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((s) => (
            <article
              key={s.name}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition"
            >
              <div className="relative h-56">
                <Image src={s.image} alt={s.name} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold">{s.name}</h2>
                <p className="text-cyan-400 text-sm">{s.role} · {s.org}</p>
                <p className="text-slate-400 text-sm mt-3">{s.topic}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
