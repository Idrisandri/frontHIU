import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const navItems = [
  { key: 'home', label: 'Home' },
  { key: 'prices', label: 'Prices' },
  { key: 'products', label: 'Products' },
  { key: 'about', label: 'About Us' },
]

export default function Sidebar({ activePage, navigate }) {
  const sidebarRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      sidebarRef.current,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.3 }
    )
  }, [])

  return (
    <aside
      ref={sidebarRef}
      className="hidden md:flex flex-col items-center justify-center gap-10 border-l border-black/10"
      style={{ minWidth: '72px' }}
    >
      {navItems.map((item) => (
        <button
          key={item.key}
          onClick={() => navigate(item.key)}
          className={`nav-item-rotated font-body text-xs font-medium tracking-widest uppercase transition-all duration-300 ${
            activePage === item.key
              ? 'text-black active'
              : 'text-black/70 hover:text-black/90'
          }`}
        >
          {item.label}
        </button>
      ))}
    </aside>
  )
}