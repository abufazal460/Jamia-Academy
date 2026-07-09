import { motion } from 'motion/react';
import { ENTRANCE_SPRING, LUXURY_EASE } from './animationConfig';

/**
 * Letter
 * A single independent character. Owns its own entrance animation state,
 * its own explosion animation state, and nothing else. No word-level
 * wrapper animates — every letter is its own Motion component per spec.
 */
export default function Letter({
  char,
  from,
  blurFrom,
  delay,
  duration,
  phase, // 'idle' | 'enter' | 'settled' | 'exploding'
  explosionVector,
  reducedMotion,
  isSpace,
}) {
  if (isSpace) {
    return <span className="intro-letter intro-letter--space" aria-hidden="true">&nbsp;</span>;
  }

  if (reducedMotion) {
    return (
      <motion.span
        className="intro-letter"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'exploding' ? 0 : 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {char}
      </motion.span>
    );
  }

  // Entrance state
  const entranceInitial = {
    opacity: 0,
    x: from.x,
    y: from.y,
    rotate: from.rotate,
    scale: from.scale,
    filter: `blur(${blurFrom}px)`,
  };

  const entranceAnimate = {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    filter: 'blur(0px)',
  };

  const explodeAnimate = explosionVector
    ? {
        opacity: 0,
        x: explosionVector.x,
        y: explosionVector.y,
        rotate: explosionVector.rotate,
        scale: explosionVector.scale,
        filter: `blur(${explosionVector.blur}px)`,
      }
    : entranceAnimate;

  const target = phase === 'exploding' ? explodeAnimate : entranceAnimate;

  const transition =
    phase === 'exploding'
      ? {
          duration: 0.6,
          delay: explosionVector?.delay ?? 0,
          ease: LUXURY_EASE,
        }
      : {
          ...ENTRANCE_SPRING,
          delay: delay / 1000,
          duration,
        };

  return (
    <motion.span
      className="intro-letter"
      aria-hidden="true"
      initial={entranceInitial}
      animate={target}
      transition={transition}
      style={{ willChange: 'transform, opacity, filter', display: 'inline-block' }}
    >
      {char}
    </motion.span>
  );
}