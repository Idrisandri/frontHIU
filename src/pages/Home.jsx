import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Home({ navigate }) {
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    tl.fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
      .fromTo(descRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .fromTo(ctaRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .fromTo(imageRef.current, { x: 40, opacity: 0, scale: 0.97 }, { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
  }, [])

  return (
    <section className="min-h-full flex items-center">
      <div className="grid md:grid-cols-2 gap-16 items-center w-full max-w-6xl mx-auto">
        {/* Left: text */}
        <div className="flex flex-col gap-8">
          <div ref={titleRef}>
            <p className="text-xs tracking-[0.3em] uppercase text-black/40 font-body mb-4">
              Creative Studio
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
              We craft
              <br />
              <em className="not-italic relative">
                bold
                <span
                  className="absolute bottom-1 left-0 w-full h-[3px] bg-black"
                  style={{ transform: 'scaleX(1)', transformOrigin: 'left' }}
                />
              </em>
              <br />
              experiences.
            </h1>
          </div>

          <p ref={descRef} className="font-body text-black/60 text-base leading-relaxed max-w-sm">
            We blend strategy, design, and technology to build digital products
            that stand out in a crowded world. Your vision, amplified.
          </p>

          <div ref={ctaRef} className="flex items-center gap-6">
            <button
              onClick={() => navigate('prices')}
              className="bg-black text-white font-body text-sm tracking-widest uppercase px-8 py-4 hover:bg-black/80 transition-colors duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 mix-blend-difference" />
            </button>
            <button
              onClick={() => navigate('about')}
              className="font-body text-sm tracking-widest uppercase text-black/50 hover:text-black transition-colors duration-200 flex items-center gap-2"
            >
              Learn more
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-10 pt-4 border-t border-black/10">
            {[['120+', 'Projects'], ['8yr', 'Experience'], ['40+', 'Awards']].map(([num, label]) => (
              <div key={label}>
                <p className="font-display text-2xl font-bold">{num}</p>
                <p className="font-body text-xs text-black/40 uppercase tracking-widest">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image */}
        <div ref={imageRef} className="relative">
        <div className="aspect-[4/5] overflow-hidden relative">
            
            {/* Background image */}
            <img
            src="/images/hero.png"
            alt="Collection"
            className="absolute inset-0 w-full h-full object-contain z-0"
            />
        </div>

</div>
      </div>
    </section>
  )
}