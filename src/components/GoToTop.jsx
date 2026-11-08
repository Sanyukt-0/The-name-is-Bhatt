import { useRef, useEffect } from 'react';
import gsap from '../lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const GoToTop = () => {
  const btnRef          = useRef(null);
  const timeOutRef      = useRef(null);
  const isHovering      = useRef(false);
  const isInScrollZone  = useRef(false);

  const scrollToTop = () => {
    const lenis = window.__lenis;
    const dist  = Math.abs(window.scrollY);
    const dur   = Math.min(Math.max(dist / 1200, 1.2), 1.8);
    if (lenis) lenis.scrollTo(0, { duration: dur, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleActivity = () => {
    if (!isInScrollZone.current) return;
    gsap.to(btnRef.current, { autoAlpha: 1, duration: 0.3, overwrite: 'auto' });
    if (timeOutRef.current) clearTimeout(timeOutRef.current);
    if (!isHovering.current) {
      timeOutRef.current = setTimeout(() => {
        gsap.to(btnRef.current, { autoAlpha: 0, duration: 0.3 });
      }, 1000);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleActivity);
    return () => {
      window.removeEventListener('scroll', handleActivity);
      if (timeOutRef.current) clearTimeout(timeOutRef.current);
    };
  }, []);

  useGSAP(() => {
    gsap.set(btnRef.current, { autoAlpha: 0 });
    ScrollTrigger.create({
      start: 300,
      onEnter:     () => { isInScrollZone.current = true;  handleActivity(); },
      onLeaveBack: () => {
        isInScrollZone.current = false;
        if (timeOutRef.current) clearTimeout(timeOutRef.current);
        gsap.to(btnRef.current, { autoAlpha: 0, duration: 0.3 });
      },
    });
  }, []);

  const onMove = (e) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    gsap.to(el, { x: (e.clientX - cx) * 0.35, y: (e.clientY - cy) * 0.35, duration: 0.3, overwrite: 'auto' });
  };

  const onLeave = () => {
    isHovering.current = false;
    handleActivity();
    if (btnRef.current) {
      gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1.1, 0.4)', overwrite: 'auto' });
    }
  };

  return (
    <button
      ref={btnRef}
      onClick={scrollToTop}
      onMouseEnter={() => { isHovering.current = true;  handleActivity(); }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="go-to-top-btn"
      aria-label="Back to top"
    >
      ↑
    </button>
  );
};

export default GoToTop;
