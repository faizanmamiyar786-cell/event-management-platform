import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-slate-950 to-slate-950" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <p className="text-cyan-400 font-medium tracking-widest text-sm uppercase mb-4">
            College Tech &amp; Cultural Fest
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            TechVista <span className="text-cyan-400">2026</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-10">
            Innovate. Create. Celebrate. Three days of workshops, competitions, performances and unforgettable experiences.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/register"
              className="inline-flex items-center px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition"
            >
              Register Now
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-8 py-3.5 border border-slate-600 hover:border-slate-400 text-white font-medium rounded-lg transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h3 className="text-cyan-400 font-semibold mb-2">When</h3>
          <p className="text-lg">15 – 17 March 2026</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h3 className="text-cyan-400 font-semibold mb-2">Where</h3>
          <p className="text-lg">College Main Campus</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h3 className="text-cyan-400 font-semibold mb-2">Who</h3>
          <p className="text-lg">Students, Speakers, Artists &amp; more</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to join?</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Secure your spot. Unique tickets with QR codes will be issued instantly after registration.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center px-10 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg text-lg transition"
        >
          Register for TechVista 2026
        </Link>
      </section>

      <footer className="border-t border-slate-800 py-10 text-center text-slate-500 text-sm">
        <p>TechVista 2026 · Powered by Event Management Platform</p>
        <p className="mt-2">
          <Link href="/admin/login" className="hover:text-cyan-400">Admin Login</Link>
        </p>
      </footer>
    </div>
  )
}
