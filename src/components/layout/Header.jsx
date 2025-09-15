import { useState, useEffect } from 'react'
import Navigation from './Navigation'
import { cn } from '@/lib/utils'
import TH_name from '../../assets/TH_name.svg'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
    )}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center h-16 md:h-20">
          <img
            src={TH_name}
            alt="Troubled Hubble"
            className="h-10 md:h-10 w-auto brightness-0 invert"
          />
          {/* <Navigation /> */}
        </div>
      </div>
    </header>
  )
}

export default Header