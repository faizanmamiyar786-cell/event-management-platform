import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Sponsors',
  description: 'Sponsors and partners of TechVista 2026',
}

const tiers = [
  {
    name: 'Title Partners',
    items: ['NovaTech', 'CampusCloud'],
  },
  {
    name: 'Gold',
    items: ['PixelForge', 'DataRiver', 'ShieldOps'],
  },
  {
    name: 'Silver',
    items: ['CodeNest', 'DesignDock', 'LaunchPad', 'ByteClub'],
  },
  {
    name: 'Community',
    items: ['DevCircle', 'ArtGuild', 'StartupCell'],
  },
]

export default function SponsorsPage() {
  return (
    <div>
      <section className="relative h-56 md:h-72 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80"
          alt="Partnership"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/75 flex items-end">
          <div className="max-w-6xl mx-auto px-6 pb-10 w-full">
            <p className="text-cyan-400 text-sm tracking-widest uppercase mb-2">Partners</p>
            <h1 className="text-4xl font-bold">Sponsors</h1>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        <p className="text-slate-400 max-w-2xl">
          TechVista is made possible by organisations that believe in student innovation. Branding
          below is illustrative — final sponsor list will be updated by the organising team.
        </p>

        {tiers.map((tier) => (
          <div key={tier.name}>
            <h2 className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-4">
              {tier.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tier.items.map((name) => (
                <div
                  key={name}
                  className="h-24 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-center text-slate-200 font-semibold"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">Want to sponsor TechVista?</h3>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Reach thousands of students through stalls, workshops, branding, and hiring pipelines.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg"
          >
            Talk to the team
          </Link>
        </div>
      </section>
    </div>
  )
}
