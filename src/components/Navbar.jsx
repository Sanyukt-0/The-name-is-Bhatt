import { useEffect, useRef, useState } from 'react'
import gsap from '../lib/gsap'
import { useGSAP } from '@gsap/react'
import { getGrid } from '../utils/getGrid'

const navLinks = [
  { label: 'Hero',     href: '#hero' },
  { label: 'About',    href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#games-arsenal' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Contact',  href: '#contact' },
]

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [grid, setGrid] = useState(getGrid)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      setGrid(getGrid())
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const { COLUMNS, ROWS } = grid

  useGSAP(() => {
    gsap.set('.menu-wrapper', {
      xPercent: -100
    })
    gsap.set('.nav-link-item', { opacity: 0, xPercent: -30 })
  }, [])

  const animateHam = () => {
    let navTimeline = gsap.timeline()
    const flag = !isMenuOpen
    setIsMenuOpen(flag)
    if (flag) {
      gsap.set('.menu-wrapper', {
        xPercent: 0
      })
      navTimeline
        .to('.line-one', {
          rotate: 45,
          y: 10,
          duration: 0.1,
          ease: 'circ.out'
        })
        .to(
          '.line-two',
          {
            rotate: -45,
            y: -10,
            duration: 0.1,
            ease: 'circ.out'
          },
          '<'
        )
        .to(
          '.menu-grid',
          {
            scaleY: 1,
            transformOrigin: 'bottom',
            ease: 'expo.inOut',
            stagger: {
              from: 'random',
              each: 0.004,
            }
          },
          '<'
        )
        .to(
          '.nav-link-item',
          {
            opacity: 1,
            xPercent: 0,
            stagger: 0.07,
            duration: 0.5,
            ease: 'expo.out',
          },
          '-=0.3'
        )
    } else {
      navTimeline
        .to('.nav-link-item', {
          opacity: 0,
          xPercent: -20,
          stagger: { from: 'end', each: 0.04 },
          duration: 0.25,
          ease: 'expo.in',
        })
        .to('.line-one', {
          rotate: 0,
          y: 0,
          duration: 0.1,
          ease: 'expo.inOut'
        })
        .to(
          '.line-two',
          {
            rotate: 0,
            y: 0,
            duration: 0.1,
            ease: 'expo.inOut'
          },
          '<'
        )
        .to(
          '.menu-grid',
          {
            scaleY: 0,
            transformOrigin: 'top',
            ease: 'expo.inOut',
            stagger: {
              from: 'random',
              each: 0.004
            }
          },
          '<'
        )
        .to(menuRef.current, {
          xPercent: -100,
          duration: 0.1
        })
    }
  }

  const handleNavClick = (href) => () => {
    if (isMenuOpen) animateHam()
    // Smooth scroll via Lenis if available
    setTimeout(() => {
      const target = document.querySelector(href)
      if (!target) return
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -60, duration: 1.4 })
      } else {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300)
  }

  const scrollToHero = (e) => {
    e.preventDefault()
    if (isMenuOpen) animateHam()
    setTimeout(() => {
      const hero = document.querySelector('#hero')
      if (!hero) return
      if (window.__lenis) {
        window.__lenis.scrollTo(hero, { offset: 0, duration: 1.2 })
      } else {
        hero.scrollIntoView({ behavior: 'smooth' })
      }
    }, 200)
  }

  return (
    <nav>
      {/* Top Left Brand: fav.png Logo + Name */}
      <a
        href="#hero"
        onClick={scrollToHero}
        className={`nav-brand${isMenuOpen ? ' menu-open' : ''}`}
        aria-label="Sanyukt - Home"
      >
        <img src="/fav.png" alt="Sanyukt Logo" className="nav-brand-icon" />
        <span className="nav-brand-name">SANYUKT</span>
      </a>

      <button onClick={animateHam} className={`ham-menu${isMenuOpen ? ' menu-open' : ''}`} aria-label="Toggle menu">
        <div className='line-one'></div>
        <div className='line-two'></div>
      </button>
      <div
        style={{
          gridTemplateColumns: `repeat(${COLUMNS},1fr)`,
          gridTemplateRows: `repeat(${ROWS},1fr)`
        }}
        ref={menuRef}
        className='menu-wrapper'
      >
        {Array(COLUMNS * ROWS)
          .fill(null)
          .map((_, idx) => {
            return <div key={idx} className='menu-grid'></div>
          })}

        {/* Nav links overlay — rendered on top of grid */}
        <div className='menu-nav-links'>
          <div className='menu-nav-meta'>
            <span className='menu-nav-index'>Menu</span>
          </div>
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className='nav-link-item'
              onClick={handleNavClick(link.href)}
            >
              <span className='nav-link-num'>0{i + 1}</span>
              <span className='nav-link-label'>{link.label}</span>
              <svg className='nav-link-arrow' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
                <path d='M5 12h14M12 5l7 7-7 7'/>
              </svg>
            </a>
          ))}
          <div className='menu-nav-footer'>
            <span>© 2026 Sanyukt Bhatt</span>
            <span>Game Engineer</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
