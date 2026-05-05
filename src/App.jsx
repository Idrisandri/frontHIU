import { useState, useRef, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import PageWrapper from './components/PageWrapper'
import Home from './pages/Home'
import Prices from './pages/Prices'
import Products from './pages/Products'
import AboutUs from './pages/AboutUs'
import Login from './pages/Login'
import Register from './pages/Register'

const pages = {
  home: Home,
  prices: Prices,
  products: Products,
  about: AboutUs,
  login: Login,
  register: Register,
}

const pageOrder = ['home', 'prices', 'products', 'about']

export default function App() {
  const [activePage, setActivePage] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const wrapperRef = useRef(null)
  const hasNavigated = useRef(false) // 👈 anti double-trigger

  const navigate = (page) => {
    if (page === activePage) return
    setActivePage(page)
    setMenuOpen(false)
  }

  // 👇 Scroll global centralisé ici
  useEffect(() => {
    const handleWheel = (e) => {
      if (hasNavigated.current) return
      hasNavigated.current = true

      const currentIndex = pageOrder.indexOf(activePage)

      if (e.deltaY > 0 && currentIndex < pageOrder.length - 1) {
        navigate(pageOrder[currentIndex + 1])
      } else if (e.deltaY < 0 && currentIndex > 0) {
        navigate(pageOrder[currentIndex - 1])
      }

      setTimeout(() => { hasNavigated.current = false }, 800)
    }

    let touchStartY = 0
    const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY }
    const handleTouchEnd = (e) => {
      const deltaY = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(deltaY) < 50 || hasNavigated.current) return
      hasNavigated.current = true

      const currentIndex = pageOrder.indexOf(activePage)
      if (deltaY > 0 && currentIndex < pageOrder.length - 1) {
        navigate(pageOrder[currentIndex + 1])
      } else if (deltaY < 0 && currentIndex > 0) {
        navigate(pageOrder[currentIndex - 1])
      }

      setTimeout(() => { hasNavigated.current = false }, 800)
    }

    window.addEventListener('wheel', handleWheel)
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [activePage]) // 👈 re-run à chaque changement de page

  const ActivePage = pages[activePage]

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} navigate={navigate} activePage={activePage} />

      <div className="flex flex-1 overflow-hidden relative">
        <PageWrapper key={activePage} wrapperRef={wrapperRef}>
          <ActivePage navigate={navigate} />
        </PageWrapper>
        <Sidebar activePage={activePage} navigate={navigate} />
      </div>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {Object.keys(pages).map((page) => (
          <button
            key={page}
            onClick={() => navigate(page)}
            className={`font-display text-4xl font-bold tracking-tight transition-colors duration-200 ${activePage === page ? 'text-white' : 'text-white/40 hover:text-white/70'
              }`}
          >
            {page === 'about' ? 'About Us' : page.charAt(0).toUpperCase() + page.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}