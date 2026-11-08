import { useRef, memo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from '../lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Favicon logo separator ── */
const FavIcon = ({ size = 50 ,invert=false}) => (
  <img
    src="/fav.png"
    alt=""
    aria-hidden="true"
    style={{
      width: size,
      height: size,
      objectFit: 'contain',
      flexShrink: 0,
      display: 'inline-block',
      verticalAlign: 'middle',
      filter:invert?'invert(100%)':'invert(0)',
    }}
  />
);

export const ITEMS_A = [
  'Game Developer',
  'Unreal Engine 5',
  'C++ Systems',
  'Blueprints',
  'Gameplay Architect',
  'Physics & Chaos',
  'AI Behavior',
  'Shader Craft',
  'Technical Artist',
];

export const ITEMS_B = [
  'Void Breach',
  'One Wrong Step',
  'Ashen Veil',
  'Chaos Destruction',
  'Lumen Dynamic GI',
  'Nanite Geometry',
  'Niagara FX',
  'FMOD Audio',
];

const repeat4 = (arr) => [...arr, ...arr, ...arr, ...arr];

/* ─── MarqueeRed (Red background, moves left xPercent 0 → -25) ─── */
export const MarqueeRed = memo(({ items = ITEMS_A, className = '' }) => {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const repeated = repeat4(items);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    gsap.fromTo(
      track,
      { xPercent: 0 },
      {
        xPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }
    );
  }, { scope: wrapperRef });

  return (
    <div
      ref={wrapperRef}
      className={`marquee-strip-red ${className}`}
      style={{
        background: 'var(--main-color)',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          width: 'max-content',
          alignItems: 'center',
          willChange: 'transform',
        }}
      >
        {repeated.map((label, i) => (
          <div
            key={i}
            className="mq-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.5rem, 1vw, 1.2rem)',
              padding: 'clamp(0.4rem, 0.7vw, 0.75rem) clamp(0.75rem, 1.5vw, 1.5rem)',
              flexShrink: 0,
            }}
          >
            <span
              className="mq-label"
              style={{
                fontFamily: "'MainFont', sans-serif",
                fontSize: 'clamp(1.1rem, 2vw, 2.2rem)',
                fontWeight: 500,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                letterSpacing: '0.05em',
                lineHeight: 1,
                color: 'rgba(5, 5, 5, 0.92)',
              }}
            >
              {label}
            </span>
            <FavIcon size={56} />
          </div>
        ))}
      </div>
    </div>
  );
});

MarqueeRed.displayName = 'MarqueeRed';

/* ─── MarqueeWhite (White background, moves right xPercent -25 → 0) ─── */
export const MarqueeWhite = memo(({ items = ITEMS_A, className = '' }) => {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const repeated = repeat4(items);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    gsap.fromTo(
      track,
      { xPercent: -25 },
      {
        xPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }
    );
  }, { scope: wrapperRef });

  return (
    <div
      ref={wrapperRef}
      className={`marquee-strip-white ${className}`}
      style={{
        background: '#ffffff',
        overflow: 'hidden',
        width: '120vw',
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          width: 'max-content',
          alignItems: 'center',
          willChange: 'transform',
        }}
      >
        {repeated.map((label, i) => (
          <div
            key={i}
            className="mq-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.5rem, 1vw, 1.2rem)',
              padding: 'clamp(0.4rem, 0.7vw, 0.75rem) clamp(0.75rem, 1.5vw, 1.5rem)',
              flexShrink: 0,
            }}
          >
            <span
              className="mq-label"
              style={{
                fontFamily: "'MainFont', sans-serif",
                fontSize: 'clamp(1.1rem, 2vw, 2.2rem)',
                fontWeight: 500,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                letterSpacing: '0.05em',
                lineHeight: 1,
                color: 'var(--main-color)',
              }}
            >
              {label}
            </span>
            <FavIcon invert={true} size={56} />
          </div>
        ))}
      </div>
    </div>
  );
});

MarqueeWhite.displayName = 'MarqueeWhite';

/* ─── MarqueePair (Dipram's signature tilted intersecting bottom ribbons) ───
   Used exclusively under Hero and About.
   White at -2deg, Red at +3.5deg, overlapping snugly with ZERO gap!
─────────────────────────────────────────────────────────────────────────── */
export const MarqueePair = memo(({ variant = 'a' }) => {
  const items = variant === 'b' ? ITEMS_B : ITEMS_A;

  return (
    <div
      className="marquee-pair-wrapper"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        pointerEvents: 'none',
        zIndex: 25,
      }}
    >
      {/* White strip: -2° tilt, anchored close to bottom edge */}
      <div
        style={{
          position: 'absolute',
          bottom: '0.75rem',
          left: '-10vw',
          width: '130vw',
          transform: 'rotate(-2deg)',
          transformOrigin: 'center center',
          zIndex: 19,
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))',
        }}
      >
        <MarqueeWhite items={items} />
      </div>

      {/* Red strip: +3.5° tilt, sits right against white strip with NO gap */}
      <div
        style={{
          position: 'absolute',
          bottom: '-1rem',
          left: '-10vw',
          width: '130vw',
          transform: 'rotate(3.5deg)',
          transformOrigin: 'center center',
          zIndex: 20,
          filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5))',
        }}
      >
        <MarqueeRed items={items} />
      </div>
    </div>
  );
});

MarqueePair.displayName = 'MarqueePair';

export default MarqueePair;
