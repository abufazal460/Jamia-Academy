import { motion } from 'motion/react';

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