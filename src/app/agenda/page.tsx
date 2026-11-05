import Image from 'next/image'

export const metadata = {
  title: 'Agenda',
  description: 'Day-wise schedule for TechVista 2026',
}

const days = [
  {
    day: 'Day 1 — 15 March',
    title: 'Inauguration & Tech Kickoff',
    items: [
      { time: '09:00', event: 'Registration & welcome desk opens' },
      { time: '10:30', event: 'Inaugural ceremony & keynote' },
      { time: '12:00', event: 'Workshop track A begins' },
      { time: '14:00', event: 'Hackathon kickoff' },
      { time: '17:00', event: 'Startup pitch practice sessions' },
      { time: '19:00', event: 'Cultural ice-breaker evening' },
    ],
  },
  {
    day: 'Day 2 — 16 March',
    title: 'Deep Dive & Competitions',
    items: [
      { time: '09:30', event: 'Parallel workshops (AI, Web, Design)' },
      { time: '11:30', event: 'Speaker panels' },
      { time: '13:30', event: 'Coding & design contests' },
      { time: '16:00', event: 'Exhibition & stall walkthrough' },
      { time: '18:30', event: 'Main stage cultural night' },
    ],
  },
  {
    day: 'Day 3 — 17 March',
    title: 'Finals & Closing',
    items: [
      { time: '10:00', event: 'Hackathon & contest finals' },
      { time: '13:00', event: 'Sponsor showcase & networking' },
      { time: '15:30', event: 'Awards ceremony' },
      { time: '17:30', event: 'Closing keynote' },
      { time: '18:30', event: 'Farewell jam & photo ops' },
    ],
  },
]

export default function AgendaPage() {
  return (
    <div>
      <section className="relative h-56 md:h-72 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1600&q=80"
          alt="Event schedule"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/75 flex items-end">
          <div className="max-w-6xl mx-auto px-6 pb-10 w-full">
            <p className="text-cyan-400 text-sm tracking-widest uppercase mb-2">Schedule</p>
            <h1 className="text-4xl font-bold">Event Agenda</h1>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        <p className="text-slate-400 max-w-2xl">
          Timings are indicative and may be refined closer to the event. Registered participants
          will receive the final schedule on their ticket page and email.
        </p>
        {days.map((d) => (
          <div key={d.day} className="border border-slate-800 rounded-2xl overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 border-b border-slate-800">
              <p className="text-cyan-400 text-sm font-medium">{d.day}</p>
              <h2 className="text-xl font-semibold">{d.title}</h2>
            </div>
            <ul className="divide-y divide-slate-800">
              {d.items.map((item) => (
                <li key={item.time + item.event} className="flex gap-6 px-6 py-4">
                  <span className="text-cyan-400 font-mono text-sm w-14 shrink-0">{item.time}</span>
                  <span className="text-slate-200">{item.event}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  )
}
