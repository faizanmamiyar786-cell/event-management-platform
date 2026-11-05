import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        <div>
          <p className="font-bold text-white text-lg mb-3">
            TechVista <span className="text-cyan-400">2026</span>
          </p>
          <p className="text-slate-400 leading-relaxed">
            The flagship college tech &amp; cultural festival. Innovate. Create. Celebrate.
          </p>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">Explore</p>
          <ul className="space-y-2 text-slate-400">
            <li><Link href="/about" className="hover:text-cyan-400">About</Link></li>
            <li><Link href="/agenda" className="hover:text-cyan-400">Agenda</Link></li>
            <li><Link href="/speakers" className="hover:text-cyan-400">Speakers</Link></li>
            <li><Link href="/workshops" className="hover:text-cyan-400">Workshops</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">Event</p>
          <ul className="space-y-2 text-slate-400">
            <li><Link href="/sponsors" className="hover:text-cyan-400">Sponsors</Link></li>
            <li><Link href="/venue" className="hover:text-cyan-400">Venue</Link></li>
            <li><Link href="/contact" className="hover:text-cyan-400">Contact</Link></li>
            <li><Link href="/register" className="hover:text-cyan-400">Register</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">Details</p>
          <ul className="space-y-2 text-slate-400">
            <li>15 – 17 March 2026</li>
            <li>College Main Campus</li>
            <li>techvista@college.edu</li>
            <li><Link href="/admin/login" className="hover:text-cyan-400">Admin Login</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-5 text-center text-slate-500 text-xs">
        © 2026 TechVista · Student Council · Event Management Platform
      </div>
    </footer>
  )
}
