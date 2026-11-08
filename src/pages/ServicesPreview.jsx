import FlowingMenu from '../components/FlowingMenu';
import MagneticBtn from '../components/MagneticBtn';

import fps1 from '../assets/Games/FPS/cinematic_sci_fi_fps_action_key_art_1_on_1_intimate_close_quarters_combat.png';
import fps2 from '../assets/Games/FPS/cinematic_sci_fi_fps_key_art_intense_1_on_1_close_quarters_combat_duel_on_a.png';
import ows from '../assets/Games/One Wrong Step/official_cinematic_video_game_cover_key_art_for_a_3d_sci_fi_puzzle_platformer.png';
import soul from '../assets/Games/SoulsLike/wide_cinematic_16_9_aspect_ratio_artwork_for_pc._a_solitary_weary_knight_in.png';
import soul2 from '../assets/Games/SoulsLike/dark_gothic_fantasy_souls_like_digital_oil_painting._in_the_center_of_the_frame.png';

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
