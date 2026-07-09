import { motion } from 'motion/react';

/**
 * Shine
 * A single brushed-metal light pass, masked to the text via
 * mix-blend-mode + background-clip, not a CSS "hack" filter trick.
 * Fires exactly once, left -> right, then stays put (no loop).
 */
export default function Shine({ play, onComplete, reducedMotion }) {
  if (reducedMotion) return null;

  return (
    <motion.div
      className="intro-shine"
      initial={{ x: '-120%' }}
      animate={play ? { x: '120%' } : { x: '-120%' }}
      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      onAnimationComplete={() => play && onComplete?.()}
      aria-hidden="true"
    />
  );
}