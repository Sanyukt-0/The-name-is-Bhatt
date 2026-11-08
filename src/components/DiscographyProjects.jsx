import { useRef, useEffect, useState } from 'react';

// Key Art posters for video loading / fallback
import fpsCover from '../assets/Games/FPS/cinematic_sci_fi_fps_action_key_art_1_on_1_intimate_close_quarters_combat.png';
import owsCover from '../assets/Games/One Wrong Step/official_cinematic_video_game_cover_key_art_for_a_3d_sci_fi_puzzle_platformer.png';
import soulsWide from '../assets/Games/SoulsLike/wide_cinematic_16_9_aspect_ratio_artwork_for_pc._a_solitary_weary_knight_in.png';

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Forward wheel events from inside the 3D canvas iframe to the main page
  // and listen for CD-ROM player insertion events.
  useEffect(() => {
    const handleMessage = (e) => {
      // 1. Lenis scroll forwarding
      if (e.data?.type === 'DISCOGRAPHY_WHEEL') {
        const delta = e.data.deltaY;
        if (window.__lenis) {
          window.__lenis.scrollTo(window.scrollY + delta * 1.5, { immediate: true });
        } else {
          window.scrollBy({ top: delta, behavior: 'auto' });
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

      {/* ═══════════════════════════════════════════════════════════════
         TACTICAL SCI-FI GAMEPLAY VIDEO & INFO HUD (Clipped with User's SVG Blob)
      ═══════════════════════════════════════════════════════════════ */}
      <div
        aria-label="Live Gameplay Feed HUD"
        className={`discography-hud-panel ${showVideoHUD ? 'is-open' : ''}`}
        style={{
          filter:
            'drop-shadow(0 25px 60px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 35px rgba(239, 81, 67, 0.28))',
        }}
      >
        {isMobile ? (
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
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
                <h4 className="dmh-title">{currentGame.title}</h4>
                <span className="dmh-subtitle">// {currentGame.subtitle}</span>
              </div>
              <span className="dmh-engine-pill">{currentGame.engine}</span>
            </div>

            {/* Summary */}
            <p className="dmh-summary">{currentGame.summary}</p>

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
        ) : (
          <svg
            viewBox="0 0 863 1028"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              overflow: 'visible',
            }}
          >
          <defs>
            {/* The User's Exact Blob ClipPath */}
            <clipPath id="game-blob-clip">
              <path
                id="game-blob-shape"
                d="M402 30a332 332 0 01203 59q44 31 80 72A690 690 0 01792 345a1305 1305 0 0170 427c0 39-10 79-36 101s-62 30-95 42q-50 19-99 40t-98 39-102 28-109 5-108-24-85-57-50-93q-15-51-15-107t1-113l2-114q1-57-2-112t-11-110-11-110c2-35 12-78 42-93s74-8 108-16l102-29q52-16 106-19"
              />
            </clipPath>

            <linearGradient id="blob-card-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0e0f16" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#07080d" stopOpacity="0.99" />
            </linearGradient>
          </defs>

          {/* 1. SOLID CARD BASE (Guarantees card is NEVER empty/blank) */}
          <path
            d="M402 30a332 332 0 01203 59q44 31 80 72A690 690 0 01792 345a1305 1305 0 0170 427c0 39-10 79-36 101s-62 30-95 42q-50 19-99 40t-98 39-102 28-109 5-108-24-85-57-50-93q-15-51-15-107t1-113l2-114q1-57-2-112t-11-110-11-110c2-35 12-78 42-93s74-8 108-16l102-29q52-16 106-19"
            fill="url(#blob-card-grad)"
            stroke="rgba(239, 81, 67, 0.35)"
            strokeWidth="3"
          />

          {/* 2. THE GLOWING OFFSET ACCENT STROKE (Matching user sample: x="-40" y="-27") */}
          <use
            href="#game-blob-shape"
            x="-30"
            y="-20"
            fill="none"
            stroke="var(--main-color, #ef5143)"
            strokeWidth="7"
            opacity="0.88"
            style={{
              pointerEvents: 'none',
              filter: 'drop-shadow(0 0 16px rgba(239, 81, 67, 0.85))',
            }}
          />

          {/* 3. CLIPPED FOREIGN OBJECT (Contains both the gameplay video and game info deck) */}
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
                  padding: '70px 75px 70px 80px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  pointerEvents: 'auto',
                }}
              >
                {/* Subtle Cyber Grid Background & Noise */}
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
                    borderBottom: '2px solid rgba(239, 81, 67, 0.22)',
                  }}
                >
                  {/* Left: Recording Badge */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '12px',
                      clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 100%, 0 100%)',
                      background: 'rgba(239, 81, 67, 0.16)',
                      borderLeft: '4px solid var(--main-color, #ef5143)',
                      padding: '8px 22px 8px 14px',
                    }}
                  >
                    <span
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--main-color, #ef5143)',
                        boxShadow: '0 0 14px var(--main-color, #ef5143)',
                        animation: 'sk-pulse 1.8s infinite ease-in-out',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'SecondaryFont', monospace, sans-serif",
                        fontSize: '18px',
                        letterSpacing: '0.14em',
                        color: '#ffffff',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}
                    >
                      LIVE GAMEPLAY FEED // REC ●
                    </span>

                    {/* Animated 4-bar Audio / Optical Equalizer */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: '4px',
                        height: '20px',
                        marginLeft: '6px',
                      }}
                    >
                      {[10, 20, 14, 24].map((h, i) => (
                        <span
                          key={i}
                          style={{
                            width: '3px',
                            height: `${h}px`,
                            backgroundColor: 'var(--main-color, #ef5143)',
                            borderRadius: '1px',
                            opacity: 0.85,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right: Chamfered Close Button */}
                  <button
                    type="button"
                    onClick={() => setIsUserClosed(true)}
                    aria-label="Close gameplay feed"
                    style={{
                      clipPath:
                        'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                      width: '42px',
                      height: '42px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontFamily: "'MainFont', sans-serif",
                      fontSize: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      pointerEvents: 'auto',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--main-color, #ef5143)';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = 'var(--main-color, #ef5143)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    }}
                  >
                    ✕
                  </button>
                </div>

                {/* ── THE VIDEO WHERE GAMEPLAY WILL PLAY (Standard high-tech 16:9 viewport) ── */}
                <div
                  style={{
                    position: 'relative',
                    marginTop: '16px',
                    aspectRatio: '16 / 9',
                    background: '#020204',
                    borderRadius: '10px',
                    border: '2px solid rgba(239, 81, 67, 0.35)',
                    overflow: 'hidden',
                    zIndex: 10,
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)',
                  }}
                >
                  <video
                    ref={videoRef}
                    key={currentGame.videoSrc}
                    src={currentGame.videoSrc}
                    poster={currentGame.poster}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />

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

                  {/* Top-Left Telemetry Readout */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '14px',
                      fontFamily: "'SecondaryFont', monospace, sans-serif",
                      fontSize: '15px',
                      letterSpacing: '0.1em',
                      color: 'rgba(255, 255, 255, 0.9)',
                      textTransform: 'uppercase',
                      zIndex: 5,
                      backgroundColor: 'rgba(5, 5, 8, 0.75)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      border: '1px solid rgba(239, 81, 67, 0.35)',
                    }}
                  >
                    {currentGame.fov} // {currentGame.fps}
                  </div>

                  {/* Top-Right Chamfered Resolution Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '14px',
                      clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
                      background: 'var(--main-color, #ef5143)',
                      color: '#ffffff',
                      fontFamily: "'SecondaryFont', monospace, sans-serif",
                      fontSize: '15px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      padding: '4px 12px',
                      zIndex: 5,
                      boxShadow: '0 0 14px rgba(239, 81, 67, 0.7)',
                    }}
                  >
                    {currentGame.resolution}
                  </div>

                  {/* Chamfered Tactical Control Buttons (Bottom Left) */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '14px',
                      display: 'flex',
                      gap: '10px',
                      zIndex: 6,
                    }}
                  >
                    <button
                      type="button"
                      onClick={togglePlay}
                      style={{
                        clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)',
                        fontFamily: "'SecondaryFont', monospace, sans-serif",
                        fontSize: '15px',
                        letterSpacing: '0.08em',
                        color: '#ffffff',
                        backgroundColor: 'rgba(12, 13, 18, 0.92)',
                        border: '1px solid rgba(239, 81, 67, 0.65)',
                        padding: '6px 14px',
                        cursor: 'pointer',
                        backdropFilter: 'blur(8px)',
                        pointerEvents: 'auto',
                      }}
                    >
                      {isPlaying ? 'PAUSE ❚❚' : 'PLAY ▶'}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      style={{
                        clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)',
                        fontFamily: "'SecondaryFont', monospace, sans-serif",
                        fontSize: '15px',
                        letterSpacing: '0.08em',
                        color: '#ffffff',
                        backgroundColor: 'rgba(12, 13, 18, 0.92)',
                        border: '1px solid rgba(239, 81, 67, 0.65)',
                        padding: '6px 14px',
                        cursor: 'pointer',
                        backdropFilter: 'blur(8px)',
                        pointerEvents: 'auto',
                      }}
                    >
                      {isMuted ? 'UNMUTE 🔊' : 'MUTE 🔇'}
                    </button>
                  </div>
                </div>

                {/* ── LOWER SPECIFICATION & INFORMATION DECK ── */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 10,
                    paddingTop: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  {/* Title & Engine Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h4
                        style={{
                          fontFamily: "'MainFont', sans-serif",
                          fontSize: '26px',
                          color: '#ffffff',
                          margin: 0,
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          textShadow: '0 0 12px rgba(255, 255, 255, 0.25)',
                        }}
                      >
                        {currentGame.title}
                      </h4>
                      <span
                        style={{
                          fontFamily: "'SecondaryFont', monospace, sans-serif",
                          fontSize: '15px',
                          color: 'rgba(255, 255, 255, 0.5)',
                          letterSpacing: '0.08em',
                        }}
                      >
                        // {currentGame.subtitle}
                      </span>
                    </div>

                    {/* Engine Pill */}
                    <div
                      style={{
                        background: 'rgba(239, 81, 67, 0.16)',
                        border: '1px solid var(--main-color, #ef5143)',
                        padding: '4px 14px',
                        borderRadius: '4px',
                        fontFamily: "'SecondaryFont', monospace, sans-serif",
                        fontSize: '15px',
                        color: 'var(--main-color, #ef5143)',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {currentGame.engine}
                    </div>
                  </div>

                  {/* Architecture Summary */}
                  <p
                    style={{
                      fontFamily: "'SecondaryFont', sans-serif",
                      fontSize: '17px',
                      color: 'rgba(255, 255, 255, 0.75)',
                      lineHeight: 1.45,
                      margin: 0,
                    }}
                  >
                    {currentGame.summary}
                  </p>

                  {/* Tactical Subsystem Badges */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginTop: '4px',
                    }}
                  >
                    {currentGame.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "'SecondaryFont', monospace, sans-serif",
                          fontSize: '14px',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          padding: '4px 12px',
                          borderRadius: '4px',
                          backgroundColor: 'rgba(239, 81, 67, 0.12)',
                          border: '1px solid rgba(239, 81, 67, 0.35)',
                          color: '#ffffff',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--main-color, #ef5143)',
                          }}
                        />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Hardware Telemetry Ruler & CD-ROM Speed */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '12px',
                      marginTop: '6px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                      fontFamily: "'SecondaryFont', monospace, sans-serif",
                      fontSize: '15px',
                      color: 'rgba(255, 255, 255, 0.5)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>STATUS: ACTIVE CD-ROM DRIVE</span>
                      {/* 6-step Segmented LED gauge */}
                      <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                        {[1, 2, 3, 4, 5, 6].map((k) => (
                          <span
                            key={k}
                            style={{
                              width: '6px',
                              height: '10px',
                              backgroundColor: 'var(--main-color, #ef5143)',
                              boxShadow: '0 0 6px var(--main-color, #ef5143)',
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
              </div>
            </foreignObject>
          </g>
        </svg>
        )}
      </div>

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
