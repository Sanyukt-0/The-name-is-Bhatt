import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from '../lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SANYUKTbgSVG from './SANYUKTbgSVG';

// Portfolio images for the trail effect
import fps1 from '../assets/Games/FPS/cinematic_sci_fi_fps_action_key_art_1_on_1_intimate_close_quarters_combat.png';
import fps2 from '../assets/Games/FPS/cinematic_sci_fi_fps_key_art_intense_1_on_1_close_quarters_combat_duel_on_a.png';
import fps3 from '../assets/Games/FPS/cinematic_sci_fi_fps_key_art_intimate_1_on_1_close_quarters_combat_duel_inside.png';
import ows from '../assets/Games/One Wrong Step/official_cinematic_video_game_cover_key_art_for_a_3d_sci_fi_puzzle_platformer.png';
import soul1 from '../assets/Games/SoulsLike/wide_cinematic_16_9_aspect_ratio_artwork_for_pc._a_solitary_weary_knight_in.png';
import soul2 from '../assets/Games/SoulsLike/dark_gothic_fantasy_souls_like_digital_oil_painting._in_the_center_of_the_frame.png';
import charImg from '../assets/character-render.png';

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [fps1, fps2, fps3, ows, soul1, soul2, charImg];

const NAV_LINKS = [
  { label: 'Home',     href: '#hero'     },
  { label: 'About',    href: '#about'    },
  { label: 'Services', href: '#services' },
  { label: 'Games',    href: '#games'    },
  { label: 'Contact',  href: '#contact'  },
];

const Footer = () => {
  const containerRef = useRef(null);
  const bigNameWrapRef = useRef(null);
  const trailLayerRef = useRef(null);

  // ── GSAP effect 1: 'SANYUKT' scaleY goes from 0 to 100% on arrival ──
  useGSAP(() => {
    if (!bigNameWrapRef.current || !containerRef.current) return;

    // Refresh ScrollTrigger so positions downstream of pinned sections (like UnwovenSkills) are exact
    ScrollTrigger.refresh();

    gsap.fromTo(
      bigNameWrapRef.current,
      {
        scaleY: 0,
        opacity: 0.2,
        transformOrigin: 'bottom center',
      },
      {
        scaleY: 1,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'top 25%',
          scrub: 0.2,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      }
    );
  }, { scope: containerRef });

  // ── Effect 2: Cursor Image Trail (Desktop pointer only) ──
  useEffect(() => {
    // Skip on touch/mobile devices to keep scrolling buttery smooth
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

    const box = containerRef.current;
    const layer = trailLayerRef.current;
    if (!box || !layer) return;

    const MAX_ON_SCREEN = 18;
    const SPAWN_EVERY_PX = 32;
    const LIFE_MS = 1000;

    const JITTER = 8;
    const ROTATE_DEG = 5;
    const SCALE_MIN = 0.94;
    const SCALE_MAX = 1.05;

    let lastX = null;
    let lastY = null;
    let accDist = 0;

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function pick(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function spawn(x, y) {
      const img = document.createElement('div');
      img.className = 'trail-img';

      const url = pick(IMAGES);
      img.style.backgroundImage = `url("${url}")`;

      const r = rand(-ROTATE_DEG, ROTATE_DEG);
      const s = rand(SCALE_MIN, SCALE_MAX);

      const rect = box.getBoundingClientRect();
      const px = x - rect.left + rand(-JITTER, JITTER);
      const py = y - rect.top + rand(-JITTER, JITTER);

      img.style.left = px + 'px';
      img.style.top = py + 'px';

      // Start slightly scaled down for a smooth zoom-in
      img.style.transform = `translate(-50%, -50%) rotate(${r}deg) scale(${s * 0.88})`;

      layer.appendChild(img);

      requestAnimationFrame(() => {
        img.classList.add('is-in');
        img.style.transform = `translate(-50%, -50%) rotate(${r}deg) scale(${s})`;
      });

      // Smooth fade out & dissolve
      setTimeout(() => {
        img.classList.remove('is-in');
        img.classList.add('is-out');
        img.style.transform = `translate(-50%, -50%) rotate(${r * 0.8}deg) scale(${s * 0.94})`;
      }, LIFE_MS);

      // Clean removal after exit transition finishes
      setTimeout(() => {
        if (img.parentNode === layer) {
          img.remove();
        }
      }, LIFE_MS + 650);

      // Smooth FIFO: gently start dissolving the oldest card instead of abruptly deleting it
      if (layer.children.length > MAX_ON_SCREEN) {
        const oldestActive = layer.querySelector('.trail-img.is-in');
        if (oldestActive) {
          oldestActive.classList.remove('is-in');
          oldestActive.classList.add('is-out');
        }
      }
    }

    function onMove(e) {
      const rect = box.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inside) {
        lastX = null;
        lastY = null;
        accDist = 0;
        return;
      }

      if (lastX === null) {
        lastX = e.clientX;
        lastY = e.clientY;
        spawn(e.clientX, e.clientY);
        return;
      }

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.hypot(dx, dy);

      if (dist === 0) return;

      accDist += dist;

      // Smooth continuous interpolation along motion vector
      if (accDist >= SPAWN_EVERY_PX) {
        const steps = Math.floor(accDist / SPAWN_EVERY_PX);
        const cappedSteps = Math.min(steps, 4);

        for (let i = 1; i <= cappedSteps; i++) {
          const ratio = (i * SPAWN_EVERY_PX) / accDist;
          const interpX = lastX + dx * ratio;
          const interpY = lastY + dy * ratio;
          spawn(interpX, interpY);
        }

        accDist %= SPAWN_EVERY_PX;
      }

      lastX = e.clientX;
      lastY = e.clientY;
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  const scrollTo = (href) => (e) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -80, duration: 1.2 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer ref={containerRef} className="footer-dp" id="trailBox">
      {/* ── Trail Layer matching user snippet ── */}
      <div ref={trailLayerRef} id="trailLayer" className="trail-layer" aria-hidden="true" />

      {/* ── Top section (Interactive links & brand with z-index above trail) ── */}
      <div className="footer-dp-top">
        {/* Left: logo + about + follow */}
        <div className="footer-dp-col footer-dp-col-left">
          <div className="footer-dp-brand">SANYUKT</div>

          <div>
            <h4 className="footer-dp-col-title">About Me</h4>
            <p className="footer-dp-col-text">
              Engineering high-performance game systems, engine tooling, and
              technical art — built for clarity, craft, and long-term play.
            </p>
          </div>

          <div>
            <h4 className="footer-dp-col-title">Follow Me</h4>
            <div className="footer-dp-socials">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-dp-social-btn">in</a>
              <a href="https://github.com"   target="_blank" rel="noreferrer" className="footer-dp-social-btn">GH</a>
              <a href="https://itch.io"      target="_blank" rel="noreferrer" className="footer-dp-social-btn">IO</a>
              <a href="https://twitter.com"  target="_blank" rel="noreferrer" className="footer-dp-social-btn">TW</a>
            </div>
          </div>
        </div>

        {/* Middle: Nav links */}
        <div className="footer-dp-col">
          <h3 className="footer-dp-col-heading">Navigation Links</h3>
          <ul className="footer-dp-nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="footer-dp-nav-item">
                <span className="footer-dp-nav-arrow">→</span>
                <a href={link.href} onClick={scrollTo(link.href)} className="footer-dp-nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Location + Contact */}
        <div className="footer-dp-col">
          <div>
            <h3 className="footer-dp-col-heading">Location</h3>
            <p className="footer-dp-col-text">New Delhi, India</p>
          </div>
          <div>
            <h3 className="footer-dp-col-heading">Contact Me</h3>
            <div className="footer-dp-contact-list">
              <p className="footer-dp-contact-item">
                <span>📞</span> +91 000 000 0000
              </p>
              <p className="footer-dp-contact-item">
                <span>✉</span> sanyukt@example.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Big wordmark at bottom — scaleY from 0 to 100% on bottom reach ── */}
      <div ref={bigNameWrapRef} className="footer-dp-big-name-wrap" aria-hidden="true">
        <SANYUKTbgSVG className="sanyukt-footer-svg" />
      </div>

      {/* ── Copyright ── */}
      <div className="footer-dp-copyright">
        © 2026 Sanyukt. All rights reserved. Unauthorized use prohibited.
      </div>
    </footer>
  );
};

export default Footer;
