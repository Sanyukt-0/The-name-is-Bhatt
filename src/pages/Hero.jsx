import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from '../lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import pfp from '../assets/heroPic/pfp.png';
import MagneticBtn from '../components/MagneticBtn';
import TextScramble from '../components/TextScramble';

gsap.registerPlugin(ScrollTrigger);

// Dipram-style SVG Icons
const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const ItchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.5 5.5A2.5 2.5 0 0 1 5 3h14a2.5 2.5 0 0 1 2.5 2.5v13a2.5 2.5 0 0 1-2.5 2.5H5a2.5 2.5 0 0 1-2.5-2.5v-13zm4.5 5v2h2v-2h-2zm-2 2h2v2h-2v-2zm4 0h2v2h-2v-2zm-2 2h2v2h-2v-2zm8-4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-3 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
  </svg>
);

const ResumeIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
  </svg>
);

const SOCIALS = [
  { name: 'GitHub',   href: 'https://github.com/Sanyukt-0',     icon: <GitHubIcon /> },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sanyukt-bhatt/', icon: <LinkedInIcon /> },
  { name: 'Itch.io',  href: 'https://ludusdev.itch.io/',                icon: <ItchIcon /> },
  { name: 'Resume',   href: '/Sanyukt_Resume.pdf',            icon: <ResumeIcon /> },
];

const Hero = () => {
  const sectionRef  = useRef(null);
  const imgRef      = useRef(null);
  const bgNameRef   = useRef(null);
  const titlesRef   = useRef(null);
  const btnsRef     = useRef(null);
  const socialsRef  = useRef(null);
  const mainTextRef = useRef(null);

  /* ── Entrance animation (after IntroPage ~5.6s) ── */
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 4.3 });

    tl.fromTo(imgRef.current,
      { opacity: 0, scale: 1.05, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 1.6, ease: 'power2.out' }
    );
    tl.fromTo(bgNameRef.current,
      { clipPath: 'inset(0 100% 0 0)', xPercent: 50, opacity: 0 },
      { clipPath: 'inset(0 0% 0 0)', xPercent: 0, opacity: 1, duration: 1.4, ease: 'expo.out' },
      '-=1.2'
    );
    tl.fromTo(titlesRef.current.children,
      { clipPath: 'inset(0 100% 0 0)', x: 20, opacity: 0 },
      { clipPath: 'inset(0 0% 0 0)', x: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out' },
      '-=1.0'
    );
    tl.fromTo(btnsRef.current.children,
      { y: 30, opacity: 0, scale: 0.9, pointerEvents: 'none' },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power2.inOut', stagger: 0.1, pointerEvents: 'auto' },
      '-=0.6'
    );
    tl.fromTo(socialsRef.current,
      { x: -30, opacity: 0, pointerEvents: 'none' },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out', pointerEvents: 'auto' },
      '-=0.6'
    );
  }, { scope: sectionRef });

  /* ── Scroll parallax matching Dipram ── */
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 769px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
        defaults: { ease: 'none', force3D: true },
      });
      tl.to(socialsRef.current,  { y: -100 }, 0)
        .to(btnsRef.current,     { y: -100 }, 0)
        .to(imgRef.current,      { y: 50   }, 0)
        .to(mainTextRef.current, { y: 100  }, 0);
    });
  }, { scope: sectionRef });

  const scrollTo = (selector) => (e) => {
    e.preventDefault();
    const el = document.querySelector(selector) || document.querySelector('#games') || document.querySelector('#games-arsenal');
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -60, duration: 1.5, force: true });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="hero" id="hero">

      {/* ── Profile photo ── */}
      <div ref={imgRef} className="hero-img-wrap">
        <img
          src={pfp}
          alt="Sanyukt Bhatt - Creative Game Developer & Engine Systems Engineer"
          className="hero-img"
          fetchpriority="high"
          decoding="async"
          width="900"
          height="502"
        />
        {/* directional gradient to fade grey studio bg into dark */}
        <div className="hero-img-blend" aria-hidden="true" />
      </div>

      {/* ── Big outlined background name + subtitles ── */}
      <div className="hero-text-layer" aria-hidden="true">
        <div ref={mainTextRef} className="hero-text-inner">
          <div ref={bgNameRef} className="hero-bg-name-wrap">
            <span className="hero-bg-name">SANYUKT</span>
          </div>
          <div ref={titlesRef} className="hero-titles">
            <p className="hero-title">
              <TextScramble text="Creative Game" delay={5.8} hover={true} /><br />
              <TextScramble text="Developer" delay={6.1} hover={true} />
            </p>
            <p className="hero-title hero-title-r">
              <TextScramble text="C++ · Unreal 5" delay={5.8} hover={true} /><br />
              <TextScramble text="BluePrint · HLSL" delay={6.1} hover={true} />
            </p>
          </div>
        </div>
      </div>

      {/* ── CTA Buttons with Magnetic Spring Effect ── */}
      <div ref={btnsRef} className="hero-btns">
        <MagneticBtn
          href="#contact"
          className="hero-btn hero-btn-primary"
          onClick={scrollTo('#contact')}
          strength={0.35}
        >
          Work Together
        </MagneticBtn>
        <MagneticBtn
          href="#games-arsenal"
          className="hero-btn hero-btn-outline"
          onClick={scrollTo('#games-arsenal')}
          strength={0.35}
        >
          See Games
        </MagneticBtn>
      </div>

      {/* ── Social links (Positioned on the Left Side, strictly matching Dipram) ── */}
      <div ref={socialsRef} className="hero-socials" role="navigation" aria-label="Social links">
        {SOCIALS.map((s) => (
          <MagneticBtn
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="hero-social-pill"
            strength={0.22}
          >
            <span className="hero-social-icon">{s.icon}</span>
            <span className="hero-social-name">{s.name}</span>
          </MagneticBtn>
        ))}
      </div>
    </section>
  );
};

export default Hero;
