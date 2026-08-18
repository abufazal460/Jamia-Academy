// animationConfig.js
export const LUXURY_EASE = [0.16, 1, 0.3, 1];
export const LUXURY_EASE_IN = [0.7, 0, 0.84, 0];

// Slower spring — tuned (not duration-based, since Motion springs ignore `duration`)
// to visually resolve around ~1.6s including delay.
export const ENTRANCE_SPRING = {
  type: 'spring',
  stiffness: 55,
  damping: 14,
  mass: 1.4,
};

const R = 320; // increased from 140 — travel must be clearly visible

export const WORD_ONE = [
  { char: 'J', from: { x: R * 1.6, y: -R * 0.2, rotate: 28, scale: 0.7 }, delay: 0, blurFrom: 10 },
  { char: 'A', from: { x: -R * 0.3, y: -R * 1.7, rotate: -14, scale: 0.65 }, delay: 120, blurFrom: 14 },
  { char: 'M', from: { x: R * 0.2, y: R * 1.6, rotate: 16, scale: 0.68 }, delay: 40, blurFrom: 12 },
  { char: 'I', from: { x: R * 0.15, y: R * 0.2, rotate: 0, scale: 1.25 }, delay: 260, blurFrom: 6 },
  { char: 'A', from: { x: -R * 1.65, y: R * 0.2, rotate: 18, scale: 0.66 }, delay: 160, blurFrom: 13 },
];

export const WORD_TWO = [
  { char: 'A', from: { x: -R * 0.25, y: -R * 1.5, rotate: 10, scale: 0.7 }, delay: 480, blurFrom: 12 },
  { char: 'C', from: { x: 0, y: R * 0.15, rotate: 0, scale: 1.3 }, delay: 640, blurFrom: 16 },
  { char: 'A', from: { x: R * 0.3, y: R * 1.7, rotate: -18, scale: 0.65 }, delay: 540, blurFrom: 13 },
  { char: 'D', from: { x: R * 0.4, y: -R * 1.8, rotate: 22, scale: 0.63 }, delay: 600, blurFrom: 14 },
  { char: 'E', from: { x: -R * 0.15, y: R * 0.2, rotate: 0, scale: 1.15 }, delay: 760, blurFrom: 18 },
  { char: 'M', from: { x: -R * 0.35, y: R * 1.75, rotate: 20, scale: 0.64 }, delay: 660, blurFrom: 12 },
  { char: 'Y', from: { x: -R * 1.8, y: -R * 0.2, rotate: -25, scale: 0.6 }, delay: 840, blurFrom: 15 },
];

const EXPLOSION_ANGLES = [-52, 38, -18, 74, -84, 12, -40, 61, -70, 25, 90, -12];

export function buildExplosionVector(index, seedOffset = 0) {
  const angle = EXPLOSION_ANGLES[(index + seedOffset) % EXPLOSION_ANGLES.length];
  const rad = (angle * Math.PI) / 180;
  const distance = 260 + ((index * 37) % 140);
  return {
    x: Math.cos(rad) * distance,
    y: Math.sin(rad) * distance * -1,
    rotate: angle * (index % 2 === 0 ? 2.4 : -2.1),
    scale: 0.3 + ((index * 13) % 30) / 100,
    blur: 8 + (index % 4) * 3,
    delay: (index % 5) * 0.018,
  };
}