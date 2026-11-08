import { useRef, useEffect, useState } from 'react';

// Key Art posters for video loading / fallback
import fpsCover from '../assets/Games/posters/fpsCover.jpg';
import owsCover from '../assets/Games/posters/owsCover.jpg';
import soulsWide from '../assets/Games/posters/soulsWide.jpg';

/**
 * Game definitions with sample gameplay video streams.
 * Users can easily swap `videoSrc` with their local recordings in `/videos/`.
 */
const GAME_VIDEO_DATA = [
  
  {
    id: 'one-wrong-step',
    alias: 'one-wrong-step',
    code: 'CAM_02 // CH_14',
    title: 'ONE WRONG STEP',
    subtitle: 'GRAVITATIONAL MATRIX',
    genre: '3D Precision Platformer',
    engine: 'UNREAL ENGINE 5.3 · C++',
    resolution: '1440p 60FPS',
    fps: '60.0 FPS',
    fov: '90° ORTHO',
    summary: 'Gravitational vector manipulation across 60+ precision handcrafted non-Euclidean chambers.',
    poster: owsCover,
    videoSrc: './videos/one-wrong-step-compressed.mp4',
    tags: ['Gravity Inversion', '60+ Chambers', 'Custom Kinematics', 'FMOD'],
  },
  {
    id: 'orbital-breach',
    alias: 'void-breach',
    code: 'CAM_01 // SEC_07',
    title: 'ORBITAL BREACH',
    subtitle: 'ORBITAL CQC DUEL',
    genre: 'Tactical Sci-Fi Shooter',
    engine: 'UNREAL ENGINE 5.4 · C++23',
    resolution: '4K 60FPS // HDR',
    fps: '60.0 FPS',
    fov: '84° FLIR',
    summary: 'Orbital bridge CQC duel with server-authoritative netcode & Chaos physics environmental destruction.',
    poster: fpsCover,
    videoSrc: 'sample.mp4',
    tags: ['Unreal 5.4', 'C++23', 'Chaos Physics', 'Lumen GI', 'TaskGraph'],
  },
  {
    id: 'ashen-veil',
    alias: 'ashes-of-valkyr',
    code: 'CAM_03 // GOTHIC_CH',
    title: 'ASHES OF VALKYR',
    subtitle: 'ASHES OF VALKYR',
    genre: 'Dark Fantasy Action RPG',
    engine: 'UNREAL ENGINE 5.4 · GAS',
    resolution: '4K HDR 60FPS',
    fps: '60.0 FPS',
    fov: '78° CINEMA',
    summary: 'Frame-precise stamina & poise combat, inverse-kinematics, and custom USF environmental decay shaders.',
    poster: soulsWide,
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    tags: ['GAS Framework', 'Nanite Meshes', 'Niagara GPU', 'Custom Shaders'],
  },
];

/**
 * DiscographyProjects — Pure 3D CD jewel case showcase.
 * When a CD is set into the CD player, a sleek Sci-Fi Tactical HUD
 * with angled clip-path geometry, targeting reticles, and hardware telemetry
 * automatically slides in on the right showing live footage of the selected game.
 */
const DiscographyProjects = () => {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const videoRef = useRef(null);

  const [isCdSeated, setIsCdSeated] = useState(false);
  const [activeGameIndex, setActiveGameIndex] = useState(0);
  const [isUserClosed, setIsUserClosed] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Pre-load 3D iframe when approaching viewport
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadIframe(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '450px 0px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Forward wheel events from inside the 3D canvas iframe to the main page
  // and listen for CD-ROM player insertion events.
  useEffect(() => {
    const handleMessage = (e) => {
      // 1. Lenis scroll forwarding
      if (e.data?.type === 'DISCOGRAPHY_WHEEL') {
        const delta = e.data.deltaY;
        if (!delta) return;

        // Dispatch synthetic wheel event so Lenis handles it with its native smooth momentum curve
        const syntheticWheel = new WheelEvent('wheel', {
          deltaY: delta,
          deltaX: e.data.deltaX || 0,
          deltaMode: 0,
          bubbles: true,
          cancelable: true,
        });
        window.dispatchEvent(syntheticWheel);

        // Fallback if Lenis didn't intercept or isn't active
        if (!syntheticWheel.defaultPrevented) {
          if (window.__lenis && typeof window.__lenis.targetScroll === 'number') {
            window.__lenis.scrollTo(window.__lenis.targetScroll + delta, {
              programmatic: false,
              duration: window.__lenis.options?.duration || 1.0,
              easing: window.__lenis.options?.easing,
            });
          } else {
            window.scrollBy({ top: delta, behavior: 'smooth' });
          }
        }
      }

      // 2. CD Seated / Ejected in 3D player event
      if (e.data?.type === 'DISCOGRAPHY_CD_SEATED') {
        if (e.data.seated) {
          const idx = typeof e.data.gameIndex === 'number' ? e.data.gameIndex : 0;
          setActiveGameIndex(idx % GAME_VIDEO_DATA.length);
          setIsCdSeated(true);
          setIsUserClosed(false);
          setIsPlaying(true);
        } else {
          setIsCdSeated(false);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const currentGame = GAME_VIDEO_DATA[activeGameIndex] || GAME_VIDEO_DATA[0];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const showVideoHUD = isCdSeated && !isUserClosed;

  // Sci-Fi Chamfer Clip-Path for the main HUD card
  const cardClipPath =
    'polygon(0 22px, 22px 0, calc(100% - 32px) 0, 100% 32px, 100% calc(100% - 22px), calc(100% - 22px) 100%, 32px 100%, 0 calc(100% - 32px))';

  // Video container inner chamfer
  const videoClipPath =
    'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))';

  return (
    <section
      ref={containerRef}
      id="games"
      className="discography-section"
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(620px, 86vh, 920px)',
        backgroundColor: '#07070a',
        overflow: 'hidden',
        borderTop: '1px solid rgba(239, 81, 67, 0.18)',
        borderBottom: '1px solid rgba(239, 81, 67, 0.18)',
      }}
    >
      {/* 3D CD-ROM Simulation Iframe */}
      {shouldLoadIframe ? (
        <iframe
          ref={iframeRef}
          src="/discography/index.html"
          title="Game Projects Discography 3D Showcase"
          allow="autoplay"
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
            backgroundColor: '#07070a',
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#07070a',
          }}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════
         MOBILE UNIFIED HUD CONSOLE
      ═══════════════════════════════════════════════════════════════ */}
      {isMobile && (
        <div
          aria-label="Live Gameplay Feed HUD"
          className={`discography-hud-panel ${showVideoHUD ? 'is-open' : ''}`}
        >
          <div className="discography-mobile-hud-card">
            {/* Header */}
            <div className="dmh-header">
              <div className="dmh-rec-badge">
                <span className="dmh-rec-dot" />
                <span className="dmh-rec-txt">REC ● {currentGame.code}</span>
              </div>
              <button
                type="button"
                className="dmh-close-btn"
                onClick={() => setIsUserClosed(true)}
                aria-label="Close gameplay feed"
              >
                ✕
              </button>
            </div>

            {/* Video Viewport */}
            <div className="dmh-video-wrap">
              {showVideoHUD ? (
                <video
                  ref={videoRef}
                  key={currentGame.videoSrc}
                  src={currentGame.videoSrc}
                  poster={currentGame.poster}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="dmh-video"
                />
              ) : (
                <img
                  src={currentGame.poster}
                  alt={currentGame.title}
                  className="dmh-video"
                  style={{ objectFit: 'cover' }}
                />
              )}
              <div className="dmh-video-telemetry">
                {currentGame.fov} // {currentGame.fps}
              </div>
              <div className="dmh-video-res">{currentGame.resolution}</div>
              <div className="dmh-video-controls">
                <button type="button" className="dmh-ctrl-btn" onClick={togglePlay}>
                  {isPlaying ? 'PAUSE ❚❚' : 'PLAY ▶'}
                </button>
                <button type="button" className="dmh-ctrl-btn" onClick={toggleMute}>
                  {isMuted ? 'UNMUTE 🔊' : 'MUTE 🔇'}
                </button>
              </div>
            </div>

            {/* Meta Row: Title, Subtitle, Engine Pill */}
            <div className="dmh-meta-row">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span style={{ fontFamily: "'MainFont', sans-serif", fontSize: '0.65rem', color: 'var(--main-color, #ef5143)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {currentGame.genre}
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
                  <h4 className="dmh-title">{currentGame.title}</h4>
                  <span className="dmh-subtitle">// {currentGame.subtitle}</span>
                </div>
              </div>
              <span className="dmh-engine-pill">{currentGame.engine}</span>
            </div>

            {/* Architectural Overview Card for Mobile */}
            <div
              style={{
                backgroundColor: 'rgba(239, 81, 67, 0.08)',
                border: '1px solid rgba(239, 81, 67, 0.35)',
                borderLeft: '3px solid var(--main-color, #ef5143)',
                borderRadius: '4px',
                padding: '10px 14px',
                margin: '4px 0',
              }}
            >
              <div
                style={{
                  fontFamily: "'MainFont', sans-serif",
                  fontSize: '0.68rem',
                  color: 'var(--main-color, #ef5143)',
                  letterSpacing: '0.12em',
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    width: '5px',
                    height: '5px',
                    backgroundColor: 'var(--main-color, #ef5143)',
                    borderRadius: '1px',
                  }}
                />
                <span>// ARCHITECTURAL OVERVIEW</span>
              </div>
              <p
                style={{
                  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  color: '#ffffff',
                  lineHeight: 1.55,
                  margin: 0,
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
                }}
              >
                {currentGame.summary}
              </p>
            </div>

            {/* Tags */}
            <div className="dmh-tags">
              {currentGame.tags.map((tag) => (
                <span key={tag} className="dmh-tag">
                  <span className="dmh-tag-dot" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
         DESKTOP DUAL HUD: LEFT DETAILS DECK (BLOB CLIPPED) + RIGHT VIDEO MONITOR
      ═══════════════════════════════════════════════════════════════ */}
      {!isMobile && (
        <>
          {/* ── LEFT PANEL: PROJECT DETAILS DECK WITH SIGNATURE BLOB CLIPPATH ── */}
          <div
            aria-label="Project Architecture Details"
            className={`discography-details-panel ${showVideoHUD ? 'is-open' : ''}`}
          >
            <svg
              viewBox="0 0 863 1028"
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                overflow: 'visible',
                filter: 'drop-shadow(0 20px 45px rgba(0, 0, 0, 0.9))',
              }}
            >
              <defs>
                {/* The Signature Blob ClipPath */}
                <clipPath id="game-blob-clip">
                  <path
                    id="game-blob-shape"
                    d="M402 30a332 332 0 01203 59q44 31 80 72A690 690 0 01792 345a1305 1305 0 0170 427c0 39-10 79-36 101s-62 30-95 42q-50 19-99 40t-98 39-102 28-109 5-108-24-85-57-50-93q-15-51-15-107t1-113l2-114q1-57-2-112t-11-110-11-110c2-35 12-78 42-93s74-8 108-16l102-29q52-16 106-19"
                  />
                </clipPath>

                <linearGradient id="blob-card-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0e0f16" stopOpacity="0.97" />
                  <stop offset="100%" stopColor="#07080d" stopOpacity="0.99" />
                </linearGradient>
              </defs>

              {/* 1. SOLID BLOB BASE */}
              <path
                d="M402 30a332 332 0 01203 59q44 31 80 72A690 690 0 01792 345a1305 1305 0 0170 427c0 39-10 79-36 101s-62 30-95 42q-50 19-99 40t-98 39-102 28-109 5-108-24-85-57-50-93q-15-51-15-107t1-113l2-114q1-57-2-112t-11-110-11-110c2-35 12-78 42-93s74-8 108-16l102-29q52-16 106-19"
                fill="url(#blob-card-grad)"
                stroke="rgba(239, 81, 67, 0.45)"
                strokeWidth="3"
              />

              {/* 2. THE GLOWING OFFSET ACCENT OUTLINE */}
              <use
                href="#game-blob-shape"
                x="-26"
                y="-18"
                fill="none"
                stroke="var(--main-color, #ef5143)"
                strokeWidth="6"
                opacity="0.88"
                style={{
                  pointerEvents: 'none',
                  filter: 'drop-shadow(0 0 16px rgba(239, 81, 67, 0.85))',
                }}
              />

              {/* 3. CLIPPED FOREIGN OBJECT (Safe Inner Zone: padded strictly away from tapered edges) */}
              <g clipPath="url(#game-blob-clip)">
                <foreignObject
                  x="0"
                  y="0"
                  width="863"
                  height="1028"
                  style={{ overflow: 'hidden' }}
                >
                  <div
                    style={{
                      width: '863px',
                      height: '1028px',
                      boxSizing: 'border-box',
                      padding: '135px 95px 120px 95px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      pointerEvents: 'auto',
                    }}
                  >
                    {/* Subtle Cyber Grid Background */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        backgroundImage:
                          'linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                        zIndex: 1,
                      }}
                    />

                    {/* ── TOP HUD HEADER BAR ── */}
                    <div
                      style={{
                        position: 'relative',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: '14px',
                        borderBottom: '2px solid rgba(239, 81, 67, 0.25)',
                      }}
                    >
                      {/* Left: Recording Badge */}
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '12px',
                          backgroundColor: 'rgba(239, 81, 67, 0.12)',
                          border: '1px solid rgba(239, 81, 67, 0.4)',
                          padding: '6px 14px',
                          borderRadius: '4px',
                        }}
                      >
                        <span
                          style={{
                            width: '9px',
                            height: '9px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--main-color, #ef5143)',
                            boxShadow: '0 0 10px var(--main-color, #ef5143)',
                            animation: 'sk-pulse 1.2s infinite ease-in-out',
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "'MainFont', sans-serif",
                            fontSize: '15px',
                            color: 'var(--main-color, #ef5143)',
                            letterSpacing: '0.12em',
                          }}
                        >
                          REC ● {currentGame.code}
                        </span>
                      </div>

                      {/* Right: Engine Badge */}
                      <div
                        style={{
                          fontFamily: "'MainFont', sans-serif",
                          fontSize: '14px',
                          letterSpacing: '0.1em',
                          color: 'var(--main-color, #ef5143)',
                          backgroundColor: 'rgba(239, 81, 67, 0.12)',
                          border: '1px solid rgba(239, 81, 67, 0.4)',
                          padding: '6px 14px',
                          borderRadius: '4px',
                        }}
                      >
                        {currentGame.engine}
                      </div>
                    </div>

                    {/* ── TITLE & SUBTITLE SECTION ── */}
                    <div
                      style={{
                        position: 'relative',
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        marginTop: '2px',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'MainFont', sans-serif",
                          fontSize: '15px',
                          letterSpacing: '0.14em',
                          color: 'var(--main-color, #ef5143)',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                        }}
                      >
                        {currentGame.genre}
                      </div>

                      <h3
                        style={{
                          fontFamily: "'MainFont', sans-serif",
                          fontSize: '46px',
                          letterSpacing: '0.04em',
                          lineHeight: 1.05,
                          color: '#ffffff',
                          margin: 0,
                          textTransform: 'uppercase',
                          textShadow: '0 0 20px rgba(255, 255, 255, 0.35)',
                        }}
                      >
                        {currentGame.title}
                      </h3>

                      <div
                        style={{
                          fontFamily: "'MainFont', sans-serif",
                          fontSize: '18px',
                          letterSpacing: '0.1em',
                          color: 'rgba(255, 255, 255, 0.82)',
                        }}
                      >
                        // {currentGame.subtitle}
                      </div>
                    </div>

                    {/* ── THE SMALL DESCRIPTION (ARCHITECTURAL OVERVIEW) - PROMINENT, HIGH CONTRAST & FRAMED ── */}
                    <div
                      style={{
                        position: 'relative',
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        backgroundColor: 'rgba(239, 81, 67, 0.08)',
                        border: '1px solid rgba(239, 81, 67, 0.35)',
                        borderLeft: '4px solid var(--main-color, #ef5143)',
                        borderRadius: '6px',
                        padding: '16px 20px',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(239, 81, 67, 0.06)',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'MainFont', sans-serif",
                          fontSize: '14px',
                          letterSpacing: '0.14em',
                          color: 'var(--main-color, #ef5143)',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '1px',
                            backgroundColor: 'var(--main-color, #ef5143)',
                          }}
                        />
                        <span>// ARCHITECTURAL OVERVIEW</span>
                      </div>

                      <p
                        style={{
                          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                          fontSize: '22px',
                          fontWeight: 500,
                          color: '#ffffff',
                          lineHeight: 1.55,
                          margin: 0,
                          letterSpacing: '0.01em',
                          textShadow: '0 1px 3px rgba(0, 0, 0, 0.9)',
                        }}
                      >
                        {currentGame.summary}
                      </p>
                    </div>

                    {/* ── TACTICAL SUBSYSTEM BADGES ── */}
                    <div
                      style={{
                        position: 'relative',
                        zIndex: 10,
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px',
                      }}
                    >
                      {currentGame.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: "'MainFont', sans-serif",
                            fontSize: '14px',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: '#ffffff',
                            backgroundColor: 'rgba(239, 81, 67, 0.16)',
                            border: '1px solid rgba(239, 81, 67, 0.45)',
                            padding: '6px 14px',
                            borderRadius: '4px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.35)',
                          }}
                        >
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: 'var(--main-color, #ef5143)',
                              boxShadow: '0 0 6px var(--main-color, #ef5143)',
                            }}
                          />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* ── HARDWARE TELEMETRY RULER ── */}
                    <div
                      style={{
                        position: 'relative',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '14px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                        fontFamily: "'MainFont', sans-serif",
                        fontSize: '15px',
                        color: 'rgba(255, 255, 255, 0.75)',
                        letterSpacing: '0.1em',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>STATUS: ACTIVE CD-ROM DRIVE</span>
                        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                          {[1, 2, 3, 4, 5, 6].map((k) => (
                            <span
                              key={k}
                              style={{
                                width: '7px',
                                height: '12px',
                                backgroundColor: 'var(--main-color, #ef5143)',
                                boxShadow: '0 0 8px var(--main-color, #ef5143)',
                                borderRadius: '1px',
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      <span
                        style={{
                          color: 'var(--main-color, #ef5143)',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                        }}
                      >
                        52X SPEED
                      </span>
                    </div>
                  </div>
                </foreignObject>
              </g>
            </svg>
          </div>

          {/* ── RIGHT PANEL: GAMEPLAY VIDEO MONITOR ── */}
          <div
            aria-label="Live Gameplay Video Monitor"
            className={`discography-video-panel ${showVideoHUD ? 'is-open' : ''}`}
          >
            {/* Header: Monitor Label + Close Button */}
            <div className="dvp-header">
              <div className="dvp-monitor-label">
                <span className="dmh-rec-dot" />
                <span>LIVE GAMEPLAY FEED // MONITOR</span>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '14px', marginLeft: '6px' }}>
                  {[8, 14, 10, 16].map((h, i) => (
                    <span
                      key={i}
                      style={{
                        width: '2.5px',
                        height: `${h}px`,
                        backgroundColor: 'var(--main-color, #ef5143)',
                        borderRadius: '1px',
                        opacity: 0.85,
                      }}
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsUserClosed(true)}
                className="dvp-close-btn"
                aria-label="Close gameplay feed"
              >
                ✕
              </button>
            </div>

            {/* 16:9 Video Viewport */}
            <div className="dvp-video-viewport">
              {showVideoHUD ? (
                <video
                  ref={videoRef}
                  key={currentGame.videoSrc}
                  src={currentGame.videoSrc}
                  poster={currentGame.poster}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="dvp-video"
                />
              ) : (
                <img
                  src={currentGame.poster}
                  alt={currentGame.title}
                  className="dvp-video"
                  style={{ objectFit: 'cover' }}
                />
              )}

              {/* CRT Scanline & Grain Grid */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background:
                    'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0, 0, 0, 0.4) 2px, rgba(0, 0, 0, 0.4) 4px)',
                  opacity: 0.5,
                  zIndex: 3,
                }}
              />

              {/* Overlays */}
              <div className="dvp-video-telemetry">
                {currentGame.fov} // {currentGame.fps}
              </div>
              <div className="dvp-video-res">{currentGame.resolution}</div>

              {/* Controls */}
              <div className="dvp-video-controls">
                <button type="button" className="dvp-ctrl-btn" onClick={togglePlay}>
                  {isPlaying ? 'PAUSE ❚❚' : 'PLAY ▶'}
                </button>
                <button type="button" className="dvp-ctrl-btn" onClick={toggleMute}>
                  {isMuted ? 'UNMUTE 🔊' : 'MUTE 🔇'}
                </button>
              </div>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="dvp-bottom-bar">
              <span>STREAM: LOW-LATENCY 60FPS</span>
              <span style={{ color: 'var(--main-color, #ef5143)', fontWeight: 600 }}>OPTICAL FEED ONLINE</span>
            </div>
          </div>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════════
         MANUAL PREVIEW TOGGLE PILL (Bottom Right — ONLY shown when CD is seated)
      ═══════════════════════════════════════════════════════════════ */}
      {isCdSeated && !showVideoHUD && (
        <button
          type="button"
          onClick={() => {
            setIsUserClosed(false);
          }}
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '24px',
            zIndex: 35,
            clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
            fontFamily: "'SecondaryFont', monospace, sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#ffffff',
            backgroundColor: 'rgba(12, 13, 18, 0.92)',
            border: '1px solid rgba(239, 81, 67, 0.5)',
            padding: '0.55rem 1.1rem',
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 15px rgba(239, 81, 67, 0.25)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--main-color, #ef5143)';
            e.currentTarget.style.backgroundColor = 'rgba(239, 81, 67, 0.25)';
            e.currentTarget.style.boxShadow =
              '0 8px 30px rgba(0, 0, 0, 0.8), 0 0 25px rgba(239, 81, 67, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(239, 81, 67, 0.5)';
            e.currentTarget.style.backgroundColor = 'rgba(12, 13, 18, 0.92)';
            e.currentTarget.style.boxShadow =
              '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 15px rgba(239, 81, 67, 0.25)';
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: 'var(--main-color, #ef5143)',
              boxShadow: '0 0 8px var(--main-color, #ef5143)',
              animation: 'sk-pulse 1.8s infinite ease-in-out',
            }}
          />
          <span style={{ fontWeight: 600 }}>REOPEN GAMEPLAY FEED</span>
          <span style={{ color: 'var(--main-color, #ef5143)' }}>↗</span>
        </button>
      )}
    </section>
  );
};

export default DiscographyProjects;
