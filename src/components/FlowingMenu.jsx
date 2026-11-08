import { useRef, useEffect, forwardRef } from 'react';
import gsap from '../lib/gsap';

/**
 * FlowingMenu — Exact architectural and interaction clone from Dipram-portfolio-main.
 * Features:
 * - Direction-aware clip-path sweep reveal (cursor from top vs bottom)
 * - Infinite horizontal marquee on hover with rounded-pill game screenshots
 * - Responsive typography in Euclid (SecondaryFont)
 * - Isolated div elements (avoiding clash with global nav styles)
 */
function FlowingMenu({
  items = [],
  textColor = '#ffffff',
  bgColor = 'transparent',
  marqueeBgColor = '#ffffff',
  marqueeTextColor = '#050505',
  borderColor = 'rgba(255, 255, 255, 0.25)',
  fontClass = 'font-euclid',
  textSize = 'text-xl md:text-2xl lg:text-3xl',
  gap = 'gap-[2vw]',
  paddingLeft = 'pl-[2vw]',
  imageWidth = 'w-48',
  imageHeight = 'h-[7vh]',
  imageRadius = 'rounded-full',
  speed = 12,
  fadeDuration = 0.28,
  revealEase = 'power2.out',
  copies = 4,
}) {
  return (
    <div
      className="flowing-menu-container w-full h-full overflow-hidden"
      style={{
        backgroundColor: bgColor,
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        role="navigation"
        aria-label="Services Menu"
        className="flowing-menu-nav flex flex-col h-full"
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          position: 'relative',
          top: 0,
          left: 0,
          margin: 0,
          padding: 0,
        }}
      >
        {items.map((item, i) => (
          <MenuItem
            key={i}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            fontClass={fontClass}
            textSize={textSize}
            gap={gap}
            paddingLeft={paddingLeft}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            imageRadius={imageRadius}
            fadeDuration={fadeDuration}
            revealEase={revealEase}
            copies={copies}
            isFirst={i === 0}
          />
        ))}
      </div>
    </div>
  );
}

function MenuItem({
  link,
  text,
  image,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  fontClass,
  textSize,
  gap,
  paddingLeft,
  imageWidth,
  imageHeight,
  imageRadius,
  fadeDuration,
  revealEase,
  copies,
  isFirst,
}) {
  const itemRef = useRef(null);
  const marqueeWrapperRef = useRef(null);
  const marqueeAnimationRef = useRef(null);
  const contentRefs = useRef([]);

  // Direction detection matching Dipram exactly
  const getDirection = (e, el) => {
    const bounds = el.getBoundingClientRect();
    const y = e.clientY - bounds.top;
    return y < bounds.height / 2 ? 'bottom' : 'top';
  };

  useEffect(() => {
    if (!marqueeWrapperRef.current) return;

    const ctx = gsap.context(() => {
      const targets = contentRefs.current.filter(Boolean);

      if (targets.length > 0) {
        marqueeAnimationRef.current = gsap.to(targets, {
          xPercent: -100,
          duration: speed,
          repeat: -1,
          ease: 'none',
          paused: true,
        });
      }

      // Initial hidden clipPath
      gsap.set(marqueeWrapperRef.current, {
        clipPath: 'inset(100% 0% 0% 0%)',
      });
    });

    return () => ctx.revert();
  }, [speed, copies]);

  const onEnter = (e) => {
    if (!itemRef.current || !marqueeWrapperRef.current) return;

    const dir = getDirection(e, itemRef.current);

    gsap.set(marqueeWrapperRef.current, {
      clipPath: dir === 'top' ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
    });

    gsap.to(marqueeWrapperRef.current, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: fadeDuration,
      ease: revealEase,
    });

    marqueeAnimationRef.current?.play();
  };

  const onLeave = (e) => {
    if (!itemRef.current || !marqueeWrapperRef.current) return;

    const dir = getDirection(e, itemRef.current);

    gsap.to(marqueeWrapperRef.current, {
      clipPath: dir === 'top' ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
      duration: fadeDuration,
      ease: revealEase,
    });

    marqueeAnimationRef.current?.pause();
  };

  const handleClick = (e) => {
    if (link && link.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(link);
      if (el) {
        if (window.__lenis) {
          window.__lenis.scrollTo(el, { offset: -80, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  contentRefs.current = [];

  return (
    <div
      ref={itemRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="flowing-menu-item flex-1 relative overflow-hidden text-center cursor-pointer"
      style={{
        flex: '1 1 0%',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        width: '100%',
        borderTop: isFirst ? 'none' : `1px solid ${borderColor}`,
        minHeight: 'clamp(3.8rem, 7vh, 6.5rem)',
      }}
    >
      {/* ── Static Layer (Visible by default in pure white) ── */}
      <a
        href={link || '#contact'}
        onClick={handleClick}
        className={`flowing-menu-link flex items-center justify-center h-full uppercase cursor-pointer no-underline ${fontClass} ${textSize}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          color: textColor,
          fontFamily: "'SecondaryFont', sans-serif",
          fontSize: 'clamp(1.15rem, 2.1vw, 2.3rem)',
          fontWeight: 500,
          textTransform: 'uppercase',
          textDecoration: 'none',
          letterSpacing: '0.04em',
          lineHeight: 1,
          userSelect: 'none',
          transition: 'opacity 0.2s ease',
        }}
      >
        {text}
      </a>

      {/* ── Marquee Hover Layer (Sweeps in from top or bottom) ── */}
      <div
        ref={marqueeWrapperRef}
        className="flowing-menu-marquee-wrapper absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          pointerEvents: 'none',
          backgroundColor: marqueeBgColor,
          clipPath: 'inset(100% 0% 0% 0%)',
          zIndex: 5,
        }}
      >
        <div
          className="flowing-menu-marquee-track flex h-full w-fit items-center whitespace-nowrap"
          style={{
            display: 'flex',
            height: '100%',
            width: 'max-content',
            alignItems: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          {Array.from({ length: copies }).map((_, i) => (
            <MarqueeGroup
              key={i}
              ref={(el) => (contentRefs.current[i] = el)}
              text={text}
              image={image}
              fontClass={fontClass}
              textSize={textSize}
              textColor={marqueeTextColor}
              gap={gap}
              paddingLeft={paddingLeft}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
              imageRadius={imageRadius}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Reusable Group with horizontal loop track
const MarqueeGroup = forwardRef(
  (
    {
      text,
      image,
      fontClass,
      textSize,
      textColor,
      gap,
      paddingLeft,
      imageWidth,
      imageHeight,
      imageRadius,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`flowing-menu-marquee-group flex h-full items-center shrink-0 ${gap} ${paddingLeft}`}
        style={{
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          flexShrink: 0,
          gap: '2vw',
          paddingLeft: '2vw',
        }}
      >
        {/* Item A */}
        <div
          className={`flowing-menu-marquee-text whitespace-nowrap w-max uppercase leading-none ${fontClass} ${textSize}`}
          style={{
            color: textColor,
            fontFamily: "'SecondaryFont', sans-serif",
            whiteSpace: 'nowrap',
            lineHeight: 1,
            fontWeight: 600,
            fontSize: 'clamp(1.15rem, 2.1vw, 2.3rem)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {text}
        </div>
        <div
          className={`flowing-menu-marquee-img ${imageWidth} ${imageHeight} ${imageRadius} bg-cover bg-center`}
          style={{
            backgroundImage: `url(${image})`,
            width: 'clamp(120px, 14vw, 195px)',
            height: 'clamp(40px, 6.5vh, 65px)',
            borderRadius: '9999px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            flexShrink: 0,
            border: '1.5px solid rgba(0, 0, 0, 0.15)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          }}
        />

        {/* Item B (Repeated for density) */}
        <div
          className={`flowing-menu-marquee-text whitespace-nowrap w-max uppercase leading-none ${fontClass} ${textSize}`}
          style={{
            color: textColor,
            fontFamily: "'SecondaryFont', sans-serif",
            whiteSpace: 'nowrap',
            lineHeight: 1,
            fontWeight: 600,
            fontSize: 'clamp(1.15rem, 2.1vw, 2.3rem)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {text}
        </div>
        <div
          className={`flowing-menu-marquee-img ${imageWidth} ${imageHeight} ${imageRadius} bg-cover bg-center`}
          style={{
            backgroundImage: `url(${image})`,
            width: 'clamp(120px, 14vw, 195px)',
            height: 'clamp(40px, 6.5vh, 65px)',
            borderRadius: '9999px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            flexShrink: 0,
            border: '1.5px solid rgba(0, 0, 0, 0.15)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          }}
        />
      </div>
    );
  }
);
MarqueeGroup.displayName = 'MarqueeGroup';

export default FlowingMenu;
