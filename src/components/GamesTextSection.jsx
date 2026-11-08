import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from '../lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * GamesTextSection — 1:1 match for Dipram's Projects.jsx
 * Full-screen monumental transition section featuring massive 33vw "GAMES" typography.
 */
const GamesTextSection = ({ id = 'games-arsenal' }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      textRef.current,
      {
        opacity: 0,
        scale: 0.9,
        y: 40,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'bottom 45%',
          scrub: 0.4,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      id={id}
      className="games-giant-section"
    >
      <div ref={textRef} className="games-giant-wrap">
        <h1 className="games-giant-title">PROJECTS</h1>
      </div>
    </div>
  );
};

export default GamesTextSection;

