import { useEffect, useRef, useCallback } from 'react';

const GLYPHS = 'ABCDEF0123456789_#@&%<>[]{}/*+=!アイウエオカキクケコサシスセソ';

/**
 * TextScramble — Cyberpunk / Game Dev hacker text decoding effect.
 * Can trigger automatically with delay, and also decodes cleanly on mouse enter.
 */
const TextScramble = ({
  text = '',
  className = '',
  delay = 0,
  hover = false,
  tag: Tag = 'span',
  ...props
}) => {
  const spanRef = useRef(null);
  const animRef = useRef(null);
  const isRunningRef = useRef(false);

  const runScramble = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    let frame = 0;
    const original = text;

    const animate = () => {
      let output = '';
      let complete = 0;

      for (let i = 0; i < original.length; i++) {
        if (original[i] === ' ' || original[i] === '\n') {
          output += original[i];
          complete++;
          continue;
        }

        if (frame > i * 2 + 6) {
          output += original[i];
          complete++;
        } else {
          output += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      if (spanRef.current) {
        spanRef.current.innerText = output;
      }

      frame++;
      if (complete < original.length) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        isRunningRef.current = false;
      }
    };

    animRef.current = requestAnimationFrame(animate);
  }, [text]);

  useEffect(() => {
    let timeout;
    if (delay >= 0) {
      timeout = setTimeout(runScramble, delay * 1000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      isRunningRef.current = false;
    };
  }, [delay, runScramble]);

  const onMouseEnter = () => {
    if (hover) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      isRunningRef.current = false;
      runScramble();
    }
  };

  return (
    <Tag
      ref={spanRef}
      className={`text-scramble ${className}`}
      onMouseEnter={onMouseEnter}
      {...props}
    >
      {text}
    </Tag>
  );
};

export default TextScramble;
