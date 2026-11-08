import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import IntroPage from './pages/IntroPage'
import Hero from './pages/Hero'
import AboutPreview from './pages/AboutPreview'
import ServicesPreview from './pages/ServicesPreview'
import DiscographyProjects from './components/DiscographyProjects'
import Contact from './pages/Contact'
import GoToTop from './components/GoToTop'
import {
  MarqueePair,
  MarqueeRed,
  MarqueeWhite
} from './components/MarqueeStrip'
import IndiSection from './components/IndiSection'
import GamesTextSection from './components/GamesTextSection'
import Footer from './components/Footer'
import SkillsPage from './pages/SkillsPage'

/**
 * Layout strictly matching Dipram's Home.jsx:
 *
 * 1. Hero — with tilted MarqueePair at bottom
 * 2. About — with tilted MarqueePair at bottom
 * 3. Services — pure FlowingMenu, no marquee
 * 4. GAMES header (IndiSection) + STRAIGHT MarqueeRed (justify-start)
 * 5. Games Showcase (WebsitesSections-style) + STRAIGHT MarqueeWhite (justify-end)
 * 6. SKILLS header (IndiSection) + STRAIGHT MarqueeRed (justify-start)
 * 7. Skills Showcase + STRAIGHT MarqueeWhite (justify-end)
 * 8. Contact
 * 9. Footer
 */
const App = () => {
  return (
    <>
      <CustomCursor />
      <GoToTop />
      <main>
        <IntroPage />
        <div className='pages'>
          <Navbar />

          <div className='relative w-full overflow-visible'>
            <Hero />
            <MarqueePair variant='a' />
          </div>

          <div className='relative w-full overflow-visible'>
            <AboutPreview />
            <MarqueePair variant='b' />
          </div>

          <div className='w-full'>
            <ServicesPreview />
          </div>

          {/* 4. GAMES header (Dipram Projects style) + STRAIGHT White Strip */}
          <div className='w-full' id='games-arsenal'>
            <GamesTextSection />
            <div className='straight-strip-wrap justify-end'>
              <MarqueeWhite />
            </div>
          </div>

          {/* 5. DISCOGRAPHY — 3D Physical Jewel Case Game Project Showcase */}
          <div className='w-full'>
            <DiscographyProjects />
            <div className='straight-strip-wrap justify-end'>
              <MarqueeWhite />
            </div>
          </div>

          {/* 6. SKILLS header + STRAIGHT Red Strip */}
          <div className='w-full' id='tech-arsenal'>
            <IndiSection text='SKILLS' />
            <div className='straight-strip-wrap justify-start'>
              <MarqueeRed />
            </div>
          </div>

          {/* 7. Skills Showcase */}
          <div className='w-full'>
            <SkillsPage />
          </div>

          {/* 8. Contact */}
          <Contact />

          {/* 9. Footer */}
          <Footer />
        </div>
      </main>
    </>
  )
}

export default App
