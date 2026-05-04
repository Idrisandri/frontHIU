import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function PageWrapper({ children, wrapperRef }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Kill any existing animations
    gsap.killTweensOf(el)

    // Fade + slide up + slight rotation for that modern feel
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 32,
        rotateX: 6,
        filter: 'blur(4px)',
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 0.65,
        ease: 'power3.out',
      }
    )
  }, [])

  return (
    <main
      ref={ref}
      className="flex-1 overflow-y-auto"
      style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
    >
      {children}
    </main>
  )
}