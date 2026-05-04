import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const socialLinks = [
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: '#',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
]

export default function Navbar({ menuOpen, setMenuOpen, navigate, activePage }) {
  const navRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
  }, [])

  return (
    <nav
      ref={navRef}
      className="flex items-center justify-between px-12 py-5 border-b border-black/10 bg-white z-50 relative"
      style={{ minHeight: '64px' }}
    >
      {/* Left: hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex flex-col gap-1.5 group z-[110] relative"
        aria-label="Menu"
      >
        <span
          className={`hamburger-line ${menuOpen ? 'rotate-45 translate-y-[6px] bg-white' : ''}`}
        />
        <span
          className={`hamburger-line ${menuOpen ? 'opacity-0' : ''}`}
        />
        <span
          className={`hamburger-line ${menuOpen ? '-rotate-45 -translate-y-[7px] bg-white' : ''}`}
        />
      </button>

      {/* Center: wordmark */}
      <button
        onClick={() => navigate('home')}
        className="font-display text-xl font-black tracking-widest uppercase absolute left-1/2 -translate-x-1/2"
      >
        Studio
      </button>

      {/* Right: social icons */}
      <div className="flex items-center gap-5">
        {socialLinks.map((s) => (
          <a
            key={s.name}
            href={s.href}
            aria-label={s.name}
            className="text-black/50 hover:text-black transition-colors duration-200"
          >
            {s.icon}
          </a>
        ))}
        <button onClick={() => navigate('login')} className="font-body text-xs tracking-widest uppercase border border-black/20 px-4 py-2 hover:bg-black hover:text-white transition-all duration-200">
    Login
  </button>
      </div>
    </nav>
  )
}