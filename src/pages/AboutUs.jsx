import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const team = [
  { name: 'Léa Morin', role: 'Creative Director' },
  { name: 'Marcus Tan', role: 'Lead Developer' },
  { name: 'Sofia Reel', role: 'Motion Designer' },
  { name: 'James Obi', role: 'UX Strategist' },
]

export default function AboutUs() {
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const teamRef = useRef([])

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })
    tl.fromTo(leftRef.current, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
      .fromTo(rightRef.current, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .fromTo(
        teamRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: 'power3.out' },
        '-=0.3'
      )
  }, [])

  return (
    <section className="min-h-full px-10 md:px-16 lg:px-24 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">
        {/* Left */}
        <div ref={leftRef} className="flex flex-col gap-8">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-black/40 font-body mb-3">Our story</p>
            <h2 className="font-display text-5xl md:text-6xl font-black tracking-tight leading-[1.05]">
              Design is
              <br />
              thinking
              <br />
              <em className="not-italic text-black/25">made visual.</em>
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-body text-sm text-black/60 leading-relaxed">
              Founded in 2016, Studio is an independent creative practice based between Paris and Tokyo.
              We work at the intersection of brand, digital, and motion — helping ambitious companies
              communicate with precision and style.
            </p>
            <p className="font-body text-sm text-black/60 leading-relaxed">
              We believe great design is never decoration — it's how strategy becomes visible. Every
              pixel, every transition, every word earns its place.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            {['Precision', 'Boldness', 'Clarity', 'Craft'].map((v) => (
              <div key={v} className="border border-black/10 px-4 py-3">
                <p className="font-body text-xs tracking-widest uppercase text-black/50 mb-1">Value</p>
                <p className="font-display text-base font-bold">{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div ref={rightRef} className="flex flex-col gap-10">
          {/* Visual block */}
          <div className="aspect-[4/3] relative overflow-hidden">

            {/* Background image */}
            <img
              src="/images/about-us.jpg"
              alt="Since 2016"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Bottom border line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20 z-10" />
          </div>

          {/* Team */}
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-black/70 mb-5">The team</p>
            <div className="flex flex-col gap-0">
              {team.map((member, i) => (
                <div
                  key={member.name}
                  ref={(el) => (teamRef.current[i] = el)}
                  className="flex items-center justify-between py-3.5 border-b border-black/20 group"
                >
                  <p className="font-body text-sm font-medium group-hover:tracking-wide transition-all duration-200">
                    {member.name}
                  </p>
                  <p className="font-body text-xs text-black/60 uppercase tracking-widest">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}