import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from '../lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import ABOUTsvg from '../components/ABOUTsvg';

gsap.registerPlugin(ScrollTrigger, SplitText);

const TOOLS = [
  { abbr: 'UE5', name: 'Unreal Engine 5.4' },
  { abbr: 'BP',  name: 'Blueprints'        },
  { abbr: 'INS', name: 'Unreal Insights'   },
  { abbr: 'RDC', name: 'RenderDoc'         },
  { abbr: 'BLN', name: 'Blender'           },
  { abbr: 'SBS', name: 'Substance 3D'      },
];

const LANGUAGES = [
  { abbr: 'C++', name: 'C++ 20 / 23'       },
  { abbr: 'BP',  name: 'Blueprint Scripting'},
  { abbr: 'HLS', name: 'HLSL Shaders'      },
  { abbr: 'USF', name: 'USF Custom Passes' },
  { abbr: 'GAS', name: 'Gameplay Abilities' },
  { abbr: 'PY',  name: 'Python (Tooling)'   },
];

const AboutPreview = () => {
  const scrollRef      = useRef(null);
  const toolRef        = useRef(null);
  const langRef        = useRef(null);
  const buttonRef      = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      { isMobile: '(max-width: 768px)', isDesktop: '(min-width: 769px)' },
      (ctx) => {
        const { isMobile } = ctx.conditions;

        // SplitText scrub on all .scrollAnimate elements
        const split = new SplitText('.about-scroll-animate', {
          type: 'chars,words',
          charsClass: 'about-char',
        });

        gsap.from(split.chars, {
          scrollTrigger: {
            trigger: scrollRef.current,
            start: isMobile ? 'top 70%' : 'top 60%',
            end:   isMobile ? 'bottom 90%' : '80% 80%',
            scrub: 0.05,
            toggleActions: 'play reverse play reverse',
          },
          opacity: 0,
          stagger: { amount: isMobile ? 0.5 : 1.5 },
          ease: 'power2.out',
        });

        // Tools fade
        gsap.from(toolRef.current, {
          scrollTrigger: {
            trigger: toolRef.current,
            start: isMobile ? 'top 80%' : 'top 70%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          ease: 'power2.out',
          duration: 1,
        });

        // Languages fade
        gsap.from(langRef.current, {
          scrollTrigger: {
            trigger: langRef.current,
            start: isMobile ? 'top 80%' : 'top 70%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          ease: 'power2.out',
          duration: 1,
        });

        // Buttons fade
        gsap.from(buttonRef.current, {
          scrollTrigger: {
            trigger: buttonRef.current,
            start: isMobile ? 'top 90%' : 'top 80%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          ease: 'power2.out',
          duration: 1,
        });

        return () => split.revert();
      }
    );
  }, { scope: scrollRef });

  const scrollTo = (href) => (e) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -80, duration: 1.2 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={scrollRef} className="about-preview" id="about">

      {/* 90-degree rotated ABOUT SVG watermark matching Dipram */}
      <div className="about-svg-watermark" aria-hidden="true">
        <ABOUTsvg />
      </div>

      {/* ── Bio text (SplitText scrub) ── */}
      <div className="about-preview-content">
        <h1 className="about-preview-heading about-scroll-animate">
          Hi, I'm <span>Sanyukt</span>,<br />
          I'm a{' '}
          <span className="about-accent">creative game developer</span>{' '}
          and{' '}
          <span className="about-accent">engine systems engineer</span>{' '}
          focused on building{' '}
          <span className="about-accent">
            high-performance, visually stunning interactive experiences.
          </span>
        </h1>

        <p className="about-preview-sub about-scroll-animate">
          I combine Unreal Engine architecture, C++ gameplay systems, Blueprints, HLSL shader craft,
          and technical art to create games that are immersive, responsive, and
          built with long-term quality and performance in mind.
        </p>
      </div>

      {/* ── Engine & Tools ── */}
      <div ref={toolRef} className="about-preview-group">
        <h2 className="about-preview-group-title">ENGINE &amp; TOOLS</h2>
        <div className="about-preview-icons">
          {TOOLS.map((t) => (
            <div key={t.abbr} className="about-tool-badge">
              <span className="about-tool-abbr">{t.abbr}</span>
              <span className="about-tool-name">{t.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Languages & Shaders ── */}
      <div ref={langRef} className="about-preview-group">
        <h2 className="about-preview-group-title">LANGUAGES &amp; SHADERS</h2>
        <div className="about-preview-icons">
          {LANGUAGES.map((l) => (
            <div key={l.abbr} className="about-tool-badge">
              <span className="about-tool-abbr">{l.abbr}</span>
              <span className="about-tool-name">{l.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA buttons ── */}
      <div ref={buttonRef} className="about-preview-cta">
        <a
          href="/Sanyukt_Resume.pdf"
          className="about-cta-btn about-cta-primary"
          onClick={(e) => { e.preventDefault(); window.open('/Sanyukt_Resume.pdf', '_blank'); }}
        >
          Learn More
        </a>
        <a href="#games-arsenal" className="about-cta-btn about-cta-outline" onClick={scrollTo('#games-arsenal')}>
          See Games
        </a>
      </div>
    </div>
  );
};

export default AboutPreview;

