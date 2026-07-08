/**
 * layout.constants.js
 * ---------------------------------------------------------------------------
 * YEH FILE KYU HAI (Why this file exists)
 * Requirement clear thi: "Both sections must have SAME OUTER WIDTH."
 * Agar hum har component mein alag-alag "max-w-[...] mx-auto px-[...]" likhenge,
 * to kal ko agar width change karni ho, hume 2-3 jagah edit karna padega aur
 * mismatch hone ka risk rahega. Isliye ek single source of truth bana diya.
 *
 * HOW TO MODIFY LATER
 * Agar tumhe homepage ki overall content-width badalni/ghatani ho, to sirf
 * yahi ek jagah change karo — AccreditationSection aur FeatureSection dono
 * automatically sync ho jayenge.
 * ---------------------------------------------------------------------------
 */

// Container ki max-width — 1440px se bade screens (2K/4K/ultrawide) par bhi
// content bohot zyada stretch nahi hoga, reading-width professional rahegi.
export const SECTION_MAX_WIDTH = "max-w-[1400px]";

// Fluid horizontal padding — clamp(min, preferred, max) ka use kiya hai taaki
// 320px mobile se leke 4K tak padding smoothly scale ho, kahi bhi content
// screen edge se chipke nahi aur kahi bhi bohot zyada khaali jagah na bache.
export const SECTION_PADDING_X = "px-[clamp(1.25rem,4vw,5rem)]";

// Fluid vertical rhythm (top-bottom) individual section ke liye.
export const SECTION_PADDING_Y = "py-[clamp(3.5rem,3rem+3vw,7rem)]";

// Yeh full class-string dono sections common outer wrapper par lagayenge.
// "w-full" -> parent ki poori width le, phir max-w + mx-auto se center ho,
// px se safe padding mile. Isse "same outer width" guarantee hoti hai.
export const SECTION_CONTAINER = `w-full ${SECTION_MAX_WIDTH} mx-auto ${SECTION_PADDING_X}`;

// Gap jo Hero Section aur inn dono sections ke beech, aur in dono sections
// ke aapas mein bhi consistent spacing dene ke liye use hoga.
export const SECTION_GAP_Y = "clamp(2.5rem,4vw,5rem)";