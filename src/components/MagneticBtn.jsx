import { useRef } from 'react';
import gsap from '../lib/gsap';

/**
 * MagneticBtn — Awwards-level interactive magnetic button / link.
 * Tracks mouse position relative to center and creates a smooth spring pull.
 */
const MagneticBtn = ({
  children,
  className = '',
  href,
  onClick,
  strength = 0.35,
  as: Component,
  ...props
}) => {
  const btnRef = useRef(null);

  const onMove = (e) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;

    gsap.to(el, {
      x: dx,
      y: dy,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const onLeave = () => {
    const el = btnRef.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1.1, 0.4)',
      overwrite: 'auto',
    });
  };

  const Tag = Component || (href ? 'a' : 'button');

  return (
    <Tag
      ref={btnRef}
      href={href}
      onClick={onClick}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default MagneticBtn;
