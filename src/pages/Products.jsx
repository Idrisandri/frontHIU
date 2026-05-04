import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const products = [
  { id: '01', name: 'Brand Identity', category: 'Design', desc: 'Logo systems, typography, color, and brand guidelines that define who you are.' },
  { id: '02', name: 'Web Experience', category: 'Development', desc: 'Custom-built websites that convert visitors into customers.' },
  { id: '03', name: 'Motion Design', category: 'Animation', desc: 'Animations and transitions that make your brand feel alive.' },
  { id: '04', name: 'Art Direction', category: 'Creative', desc: 'Visual storytelling across campaigns, shoots, and digital assets.' },
  { id: '05', name: 'UX Strategy', category: 'Research', desc: 'User research and experience design that removes friction.' },
  { id: '06', name: 'Campaign Kit', category: 'Marketing', desc: 'Launch-ready creative assets for any channel or platform.' },
]

export default function Products() {
  const rowsRef = useRef([])

  useEffect(() => {
    gsap.fromTo(
      rowsRef.current,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  return (
    <section className="min-h-full px-10 md:px-16 lg:px-24 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-black/40 font-body mb-3">What we offer</p>
          <h2 className="font-display text-5xl md:text-6xl font-black tracking-tight">
            Our products.
          </h2>
        </div>

        <div className="border-t border-black/10">
          {products.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => (rowsRef.current[i] = el)}
              className="group flex items-start gap-8 py-7 border-b border-black/10 cursor-pointer hover:bg-black/[0.02] transition-colors duration-200 px-2 -mx-2"
            >
              <span className="font-body text-xs text-black/50 pt-1 w-6 flex-shrink-0">{p.id}</span>

              <div className="flex-1 grid md:grid-cols-3 gap-4 items-start">
                <h3 className="font-display text-xl font-bold group-hover:tracking-wider transition-all duration-300">
                  {p.name}
                </h3>
                <p className="font-body text-sm text-black/70 leading-relaxed md:col-span-2">
                  {p.desc}
                </p>
              </div>

              <div className="flex items-center gap-6 flex-shrink-0 pt-0.5">
                <span className="font-body text-[10px] tracking-widest uppercase text-black/60 hidden md:block">
                  {p.category}
                </span>
                <div className="w-7 h-7 border border-black/50 rounded-full flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-200">
                  <svg
                    width="10"
                    height="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="text-black group-hover:text-white transition-colors duration-200"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}