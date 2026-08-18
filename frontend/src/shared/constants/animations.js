// File: animations.js
// Purpose: Standard animation durations, delays, stagger values aur easing references
// Responsibility: Framer Motion variants aur GSAP timelines dono isi file se apni timing values lenge
// Future Usage: animationHelpers.js, aboutAnimations.js
// Dependencies: Koi nahi

export const duration = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
  slower: 1.2,
};

export const delay = {
  none: 0,
  short: 0.1,
  medium: 0.2,
  long: 0.4,
};

export const stagger = {
  tight: 0.06,
  base: 0.1,
  loose: 0.15,
};

// Framer Motion ke liye easing curves (cubic-bezier arrays)
export const easing = {
  smooth: [0.25, 0.1, 0.25, 1],
  entrance: [0.16, 1, 0.3, 1],
  exit: [0.7, 0, 0.84, 0],
};

// GSAP ke liye easing strings — element-type ke hisaab se mapped
// Ye guide Part 2 me explain kiye gaye reasoning ko follow karta hai
export const gsapEase = {
  heading: "expo.out",
  paragraph: "power3.out",
  card: "back.out(1.4)",
  button: "power4.out",
  icon: "circ.out",
  timeline: "power2.inOut",
  hover: "sine.out",
};

export default { duration, delay, stagger, easing, gsapEase };
