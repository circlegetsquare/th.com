import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Import sections
import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Music from '@/components/sections/Music'
import TourDates from '@/components/sections/TourDates'
import Gallery from '@/components/sections/Gallery'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'

function App() {
  useEffect(() => {
    // Global GSAP setup
    gsap.defaults({ ease: 'power2.inOut', duration: 1 })

    // Refresh ScrollTrigger after all content loads
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        {/* <About />
        <Music />
        <TourDates />
        <Gallery />
        <Contact /> */}
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default App