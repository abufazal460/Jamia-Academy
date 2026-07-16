// File: aboutAnimations.js
// Purpose: About page ke saare REUSABLE Framer Motion variants aur GSAP helper functions
// Responsibility: Ye file sirf generic, reusable animation exports rakhti hai — koi component-specific
// animation yaha nahi likhi jaati (wo Phase 2/3 me respective component files me hogi)
// Future Usage: Hero, Founder, Timeline, Mission, Faculty — sab sections inhi variants ko import/reuse karenge
// Dependencies: gsap, gsap/ScrollTrigger, constants/animations.js

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { duration, delay, stagger, easing, gsapEase } from "../constants/animations";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// FRAMER MOTION VARIANTS
// ============================================================================

// Fade Up — sabse zyada use hone wala entrance animation (text, cards)
export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.base, ease: easing.entrance } },
};

// Fade Down — jab element upar se neeche aana ho (e.g. dropdown-style reveal)
export const fadeDown = {
  hidden: { opacity: 0, y: -32 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.base, ease: easing.entrance } },
};

// Fade Left — right se left reveal (image/text split sections ke liye)
export const fadeLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: duration.base, ease: easing.entrance } },
};

// Fade Right — left se right reveal
export const fadeRight = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: duration.base, ease: easing.entrance } },
};

// Scale — cards, badges, icons ke entrance ke liye
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: duration.base, ease: easing.entrance } },
};

// Blur Reveal — Hero headline jaisi high-impact jagah, GPU cost zyada hai isliye limited use
export const blurReveal = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  visible: { opacity: 1, filter: "blur(0px)", transition: { duration: duration.slow, ease: easing.entrance } },
};

// Image Reveal — clip-path based mask reveal (lightweight, GPU-friendly)
export const imageReveal = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0.6 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: duration.slower, ease: easing.entrance },
  },
};

// Mask Reveal — generic version, headings/containers dono ke liye reusable
export const maskReveal = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: duration.slow, ease: easing.entrance } },
};

// Rotate — decorative icons ke liye subtle entrance rotation
export const rotateIn = {
  hidden: { opacity: 0, rotate: -8, scale: 0.95 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: duration.base, ease: easing.entrance } },
};

// Float — idle infinite floating loop, sirf DECORATIVE elements ke liye (content nahi)
export const floatLoop = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

// Card Hover — hover lift + shadow
export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.02, transition: { duration: duration.fast, ease: easing.smooth } },
};

// Button Hover — subtle scale feedback
export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.04, transition: { duration: 0.2, ease: easing.smooth } },
  tap: { scale: 0.97 },
};

// Text Reveal — parent wrapper for word/char stagger children
export const textReveal = {
  hidden: {},
  visible: { transition: { staggerChildren: stagger.tight, delayChildren: delay.short } },
};

// Character Reveal — single character child variant (use with textReveal parent)
export const characterReveal = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easing.entrance } },
};

// Word Reveal — single word child variant (use with textReveal parent)
export const wordReveal = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: easing.entrance },
  },
};

// Stagger Container — generic parent for any staggered children group
export const staggerContainer = (staggerAmount = stagger.base, startDelay = delay.short) => ({
  hidden: {},
  visible: { transition: { staggerChildren: staggerAmount, delayChildren: startDelay } },
});

// Page Transition — route/page level enter-exit (future multi-page use)
export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: duration.base, ease: easing.entrance } },
  exit: { opacity: 0, y: -12, transition: { duration: duration.fast, ease: easing.exit } },
};

// ============================================================================
// GSAP PARALLAX / SCROLL HELPERS
// ============================================================================

/**
 * createScrollReveal
 * Ye function kya karta hai: kisi bhi target element pe standard fade-up ScrollTrigger reveal banata hai
 * Kaha use hoga: Hero, Timeline, Founder sections ke root-level GSAP animations me
 * Kya animate karega: opacity 0→1, y 40px→0, replay-enabled (Hero/Loader ke alawa)
 *
 * @param {string|Element} target
 * @param {Object} options - { start, once, easeType }
 */
export const createScrollReveal = (target, options = {}) => {
  const { start = "top 80%", once = false, easeType = "paragraph" } = options;

  return gsap.timeline({
    scrollTrigger: {
      trigger: target,
      start,
      toggleActions: once ? "play none none none" : "play reverse play reverse",
      invalidateOnRefresh: true,
      anticipatePin: 1,
      fastScrollEnd: true,
      markers: false,
    },
  }).from(target, {
    opacity: 0,
    y: 40,
    duration: duration.base,
    ease: gsapEase[easeType] || gsapEase.paragraph,
  });
};

/**
 * createParallaxScroll
 * Ye function kya karta hai: scroll ke saath ek element ko dheere-dheere translateY karta hai (scrub-linked)
 * Kaha use hoga: Hero background layers, decorative images
 * Kya animate karega: transform (translate3d) — kabhi bhi top/left nahi
 *
 * @param {string|Element} target
 * @param {number} distance - kitna px move karega
 */
export const createParallaxScroll = (target, distance = 80) =>
  gsap.to(target, {
    y: distance,
    ease: "none",
    scrollTrigger: {
      trigger: target,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
      markers: false,
    },
  });

export default {
  fadeUp,
  fadeDown,
  fadeLeft,
  fadeRight,
  scaleIn,
  blurReveal,
  imageReveal,
  maskReveal,
  rotateIn,
  floatLoop,
  cardHover,
  buttonHover,
  textReveal,
  characterReveal,
  wordReveal,
  staggerContainer,
  pageTransition,
  createScrollReveal,
  createParallaxScroll,
};
