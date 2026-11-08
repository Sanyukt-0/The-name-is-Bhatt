import FlowingMenu from '../components/FlowingMenu';
import MagneticBtn from '../components/MagneticBtn';

import fps1 from '../assets/Games/thumbnails/fps1.jpg';
import fps2 from '../assets/Games/thumbnails/fps2.jpg';
import ows from '../assets/Games/thumbnails/ows.jpg';
import soul from '../assets/Games/thumbnails/soul1.jpg';
import soul2 from '../assets/Games/thumbnails/soul2.jpg';

const GAME_SERVICES = [
  {
    text: 'Unreal Engine 5 C++ Architecture',
    image: fps1,
    link: '#services-breakdown',
  },
  {
    text: 'Gameplay Mechanics & Blueprints',
    image: fps2,
    link: '#services-breakdown',
  },
  {
    text: 'Combat Systems & Character Rigging',
    image: ows,
    link: '#services-breakdown',
  },
  {
    text: 'AI Behavior Trees & Smart EQS',
    image: soul,
    link: '#services-breakdown',
  },
  {
    text: 'Niagara VFX & Custom HLSL Shaders',
    image: soul2,
    link: '#services-breakdown',
  },
];

const ServicesPreview = () => {
  const scrollTo = (href) => (e) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -80, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="services-preview" id="services">
      {/* ── Header with mix-blend-difference, exactly like Dipram ── */}
      <div className="services-preview-header">
        <h2 className="services-preview-title">SERVICES</h2>
        <p className="services-preview-desc">
          I offer comprehensive game engineering and technical development services focused on
          Unreal Engine 5, C++, and Blueprint architecture. From responsive combat systems and
          custom character mechanics to high-performance C++ subsystems, Niagara VFX, and tactical AI,
          each system is built for scalability, tactile game feel, and production stability.
        </p>
      </div>

      {/* ── FlowingMenu — Dipram's #flowing-menu ── */}
      <div id="flowing-menu">
        <FlowingMenu
          items={GAME_SERVICES}
          speed={12}
          textColor="#ffffff"
          bgColor="transparent"
          marqueeBgColor="#ffffff"
          marqueeTextColor="#050505"
          borderColor="rgba(255, 255, 255, 0.25)"
        />
      </div>

      {/* ── Action Buttons with Magnetic Spring Effect ── */}
      <div className="services-preview-cta">
        <MagneticBtn
          href="#contact"
          className="serv-cta-btn serv-cta-primary"
          onClick={scrollTo('#contact')}
          strength={0.35}
        >
          Work Together
        </MagneticBtn>
        <MagneticBtn
          href="#games-arsenal"
          className="serv-cta-btn serv-cta-outline"
          onClick={scrollTo('#games-arsenal')}
          strength={0.35}
        >
          See Games
        </MagneticBtn>
      </div>
    </section>
  );
};

export default ServicesPreview;
