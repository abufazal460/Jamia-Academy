// File: animationHelpers.js
// Purpose: Shared GSAP timeline builders aur Framer variant generator functions
// Responsibility: Repeated animation config objects ko duplicate hone se rokna
// Future Usage: aboutAnimations.js aur direct section components dono isse use karenge
// Dependencies: gsap, constants/animations.js

import { duration, delay, stagger, easing, gsapEase } from "@/constants/animations";

/**
 * getFadeUpVariant
 * Ye function kya karta hai: Framer Motion ke liye ek fade+move-up variant object banata hai
 * Kyu banaya gaya: taaki har component apna alag variant object na likhe
 * Kab call hoga: kisi bhi text/card entrance animation ke liye
 * Kya return karega: Framer Motion variants object { hidden, visible }
 *
 * @param {number} customDelay - is element ka entrance delay (stagger ke liye useful)
 * @param {number} distance - kitna px upar se aayega
 */
export const getFadeUpVariant = (customDelay = 0, distance = 24) => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, delay: customDelay, ease: easing.entrance },
  },
});

/**
 * getStaggerContainer
 * Ye function kya karta hai: parent container ke liye stagger config generate karta hai
 * Kyu banaya gaya: children ko sequentially reveal karne ke liye (timeline items, stat cards)
 * Kab call hoga: kisi list/grid wrapper component par
 * Kya return karega: Framer Motion variants object
 */
export const getStaggerContainer = (staggerAmount = stagger.base, startDelay = delay.short) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerAmount, delayChildren: startDelay },
  },
});

/**
 * applyGsapFadeUp
 * Ye function kya karta hai: GSAP timeline par ek fade-up "from" animation add karta hai
 * Kyu banaya gaya: repeated gsap.from() config likhne se bachne ke liye
 * Kab call hoga: useScrollTrigger ke buildTimeline callback ke andar
 * Kya animate karega: opacity 0→1, y 30px→0
 *
 * @param {gsap.core.Timeline} tl - GSAP timeline instance
 * @param {string|Element} target - animate hone wala element/selector
 * @param {"heading"|"paragraph"|"card"|"button"|"icon"} type - easing select karne ke liye
 */
export const applyGsapFadeUp = (tl, target, type = "paragraph") => {
  if (!tl || !target) return tl;
  return tl.from(target, {
    opacity: 0,
    y: 30,
    duration: duration.base,
    ease: gsapEase[type] || gsapEase.paragraph,
  });
};

export default { getFadeUpVariant, getStaggerContainer, applyGsapFadeUp };
