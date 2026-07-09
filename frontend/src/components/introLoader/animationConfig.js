// animationConfig.js
// Central source of truth for the letter choreography.
// Every letter gets an independent origin, delay, spring, and exit vector
// so the sequence reads as art-directed rather than looped/generated.

export const LUXURY_EASE = [0.16, 1, 0.3, 1]; // expo-out, "luxury deceleration"
export const LUXURY_EASE_IN = [0.7, 0, 0.84, 0]; // "luxury acceleration"

// Spring tuned for weighty, controlled motion — not bouncy, not stiff.
export const ENTRANCE_SPRING = {
  type: 'spring',
  stiffness: 120,
  damping: 18,
  mass: 1.1,
};

const R = 140; // base travel distance in px, scaled responsively via clamp() at the component level

// Each entry: { from: {x,y,rotate,scale,blur}, delay (ms), duration (s) }
// Deliberately non-sequential delays so letters overlap, cross, and land
// at different moments — see "STAGGER" spec.
export const WORD_ONE = [
  // J — comes from right, slight downward arc, fast confident entry
  { char: 'J', from: { x: R * 1.3, y: -R * 0.15, rotate: 18, scale: 0.85 }, delay: 40, duration: 1.05, blurFrom: 6 },
  // A — comes from top, floats down like it's settling
  { char: 'A', from: { x: 0, y: -R * 1.4, rotate: -6, scale: 0.9 }, delay: 160, duration: 1.15, blurFrom: 10 },
  // M — comes from bottom, rises with weight
  { char: 'M', from: { x: R * 0.1, y: R * 1.3, rotate: 8, scale: 0.88 }, delay: 0, duration: 1.2, blurFrom: 8 },
  // I — barely moves, fades + scales only, feels like the anchor
  { char: 'I', from: { x: R * 0.06, y: R * 0.08, rotate: 0, scale: 1.15 }, delay: 260, duration: 0.9, blurFrom: 4 },
  // A — comes from left, overlaps with the first A's landing
  { char: 'A', from: { x: -R * 1.35, y: R * 0.1, rotate: 10, scale: 0.86 }, delay: 90, duration: 1.1, blurFrom: 9 },
];

export const WORD_TWO = [
  // A — from top, mirrors word one's rhythm but offset
  { char: 'A', from: { x: -R * 0.1, y: -R * 1.2, rotate: 5, scale: 0.9 }, delay: 340, duration: 1.1, blurFrom: 8 },
  // C — opacity + tiny scale only, ghost-like arrival
  { char: 'C', from: { x: 0, y: 0, rotate: 0, scale: 1.2 }, delay: 480, duration: 0.85, blurFrom: 12 },
  // A — from bottom
  { char: 'A', from: { x: R * 0.15, y: R * 1.35, rotate: -9, scale: 0.87 }, delay: 380, duration: 1.15, blurFrom: 7 },
  // D — from top, sharper rotation for contrast
  { char: 'D', from: { x: R * 0.2, y: -R * 1.5, rotate: 14, scale: 0.84 }, delay: 420, duration: 1.05, blurFrom: 9 },
  // E — opacity + heavy blur, minimal movement, dissolves into place
  { char: 'E', from: { x: -R * 0.08, y: R * 0.1, rotate: 0, scale: 1.1 }, delay: 560, duration: 0.95, blurFrom: 14 },
  // M — from bottom, echoes word one's M
  { char: 'M', from: { x: -R * 0.2, y: R * 1.4, rotate: 11, scale: 0.85 }, delay: 460, duration: 1.2, blurFrom: 8 },
  // Y — from left, last to commit, ties the bow
  { char: 'Y', from: { x: -R * 1.5, y: -R * 0.1, rotate: -15, scale: 0.83 }, delay: 600, duration: 1.1, blurFrom: 10 },
];

// Explosion vectors — glass-fragment feel: varied rotation, velocity, distance.
// Deterministic (not Math.random()) so the sequence is identical on every load,
// which matters for a "premium/finished" feel and for reduced-motion fallback logic.
const EXPLOSION_ANGLES = [-52, 38, -18, 74, -84, 12, -40, 61, -70, 25, 90, -12];

export function buildExplosionVector(index, seedOffset = 0) {
  const angle = EXPLOSION_ANGLES[(index + seedOffset) % EXPLOSION_ANGLES.length];
  const rad = (angle * Math.PI) / 180;
  const distance = 260 + ((index * 37) % 140); // 260–400px, varied per letter
  return {
    x: Math.cos(rad) * distance,
    y: Math.sin(rad) * distance * -1, // bias upward/outward, not just downward gravity dump
    rotate: angle * (index % 2 === 0 ? 2.4 : -2.1),
    scale: 0.3 + ((index * 13) % 30) / 100, // shrink to 0.3–0.6
    blur: 8 + (index % 4) * 3,
    delay: (index % 5) * 0.018, // tiny 0–72ms scatter so it isn't a single synchronized pop
  };
}