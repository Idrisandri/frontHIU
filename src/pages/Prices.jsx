import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const plans = [
  {
    name: 'Starter',
    price: '$1,200',
    period: 'project',
    description: 'Perfect for small businesses launching their first digital presence.',
    features: ['Brand Identity', 'Landing Page', '3 Revisions', 'Basic SEO'],
    highlight: false,
  },
  {
    name: 'Studio',
    price: '$4,800',
    period: 'project',
    description: 'Our most popular package for growing brands ready to scale.',
    features: ['Full Brand System', 'Multi-page Site', 'Motion Design', 'Advanced SEO', 'Analytics Setup'],
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'retainer',
    description: 'Dedicated creative partnership for ambitious organizations.',
    features: ['Unlimited Projects', 'Dedicated Team', 'Priority Support', 'Monthly Strategy', 'Performance Reports'],
    highlight: false,
  },
]

export default function Prices() {
  const cardsRef = useRef([])

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      }
    )
  }, [])

  return (
    <section className="min-h-full px-10 md:px-16 lg:px-24 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-black/40 font-body mb-3">Investment</p>
          <h2 className="font-display text-5xl md:text-6xl font-black tracking-tight">
            Simple pricing,
            <br />
            <em className="not-italic text-black/50">serious results.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`relative p-8 flex flex-col gap-6 transition-transform duration-300 hover:-translate-y-1 ${plan.highlight
                  ? 'bg-black text-white'
                  : 'border border-black/50 bg-white text-black'
                }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-8 bg-white text-black px-3 py-1 text-[10px] tracking-widest uppercase font-body">
                  Most Popular
                </div>
              )}

              <div>
                <p className={`font-body text-xs tracking-widest uppercase mb-2 ${plan.highlight ? 'text-white/50' : 'text-black/40'}`}>
                  {plan.name}
                </p>
                <p className="font-display text-4xl font-bold">{plan.price}</p>
                <p className={`font-body text-xs ${plan.highlight ? 'text-white/40' : 'text-black/50'}`}>
                  / {plan.period}
                </p>
              </div>

              <p className={`font-body text-sm leading-relaxed ${plan.highlight ? 'text-white/70' : 'text-black/60'}`}>
                {plan.description}
              </p>

              <ul className="flex flex-col gap-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 font-body text-sm">
                    <span className={`w-4 h-4 flex items-center justify-center rounded-full flex-shrink-0 ${plan.highlight ? 'bg-white/20' : 'bg-black/8'}`}>
                      <svg width="8" height="8" fill={plan.highlight ? 'white' : 'black'} viewBox="0 0 12 12">
                        <polyline points="2,6 5,9 10,3" fill="none" stroke={plan.highlight ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-2 py-3.5 text-xs tracking-widest uppercase font-body transition-all duration-200 ${plan.highlight
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'border border-black text-black hover:bg-black hover:text-white'
                  }`}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}