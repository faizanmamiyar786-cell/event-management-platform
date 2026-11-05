import Link from 'next/link'

export const metadata = {
  title: 'About | TechVista 2026',
  description: 'About TechVista 2026 – College Tech & Cultural Fest',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="text-cyan-400 font-semibold hover:underline">
            ← TechVista 2026
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-cyan-500 text-slate-950 font-semibold rounded-lg text-sm"
          >
            Register
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-3">
          About the Event
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">TechVista 2026</h1>
        <p className="text-xl text-slate-300 mb-10">
          Innovate. Create. Celebrate.
        </p>

        <div className="prose prose-invert max-w-none space-y-6 text-slate-300 leading-relaxed">
          <p>
            TechVista is the flagship annual technology and cultural festival of the college.
            Over three days, students, speakers, artists, and industry guests come together for
            workshops, competitions, performances, exhibitions, and networking.
          </p>

          <h2 className="text-2xl font-semibold text-white pt-4">What to expect</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>Technical workshops and hands-on sessions</li>
            <li>Coding, design, and innovation competitions</li>
            <li>Talks by speakers from academia and industry</li>
            <li>Cultural performances and stage events</li>
            <li>Exhibition stalls and sponsor showcases</li>
            <li>Networking for students, volunteers, and guests</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white pt-4">Event details</h2>
          <div className="grid sm:grid-cols-2 gap-4 not-prose">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <p className="text-cyan-400 text-sm mb-1">Dates</p>
              <p className="font-medium">15 – 17 March 2026</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <p className="text-cyan-400 text-sm mb-1">Venue</p>
              <p className="font-medium">College Main Campus</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <p className="text-cyan-400 text-sm mb-1">Organizer</p>
              <p className="font-medium">Student Council</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <p className="text-cyan-400 text-sm mb-1">Contact</p>
              <p className="font-medium">techvista@college.edu</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-white pt-4">Who can join</h2>
          <p>
            Registration is open for students, workshop participants, VIP guests, speakers,
            stall owners, and volunteers. Choose the ticket type that matches your role when
            you register.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/register"
            className="px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition"
          >
            Register Now
          </Link>
          <Link
            href="/"
            className="px-8 py-3.5 border border-slate-600 hover:border-slate-400 rounded-lg transition"
          >
            Back to Home
          </Link>
        </div>
      </main>

      <footer className="border-t border-slate-800 py-10 text-center text-slate-500 text-sm">
        <p>TechVista 2026 · Event Management Platform</p>
      </footer>
    </div>
  )
}
