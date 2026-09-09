// ============================================================================
// hero.motion.js
// ----------------------------------------------------------------------------
// SIMPLIFIED ANIMATION SYSTEM — pehle Ken-Burns zoom (scale, 6s continuous),
// aur multiple heavy transforms the. Ab sirf 2 animation types hain, jaisa
// maanga gaya tha:
//   1. IMAGE   -> horizontal slide + opacity
//   2. CONTENT -> opacity + subtle directional (vertical) reveal
//
// Koi scale/zoom/rotate/bounce/parallax nahi bacha. Sirf `transform`
// (translateX/Y via x/y) aur `opacity` animate ho rahe hain — dono
// GPU-compositor-friendly properties hain (layout/paint trigger nahi
// karte), isliye 60fps easily maintain hota hai, mobile pe bhi.
// ============================================================================

// -------------------- IMAGE SLIDER (Hero background) --------------------
// Old image "exit" hoti hai left ki taraf (x: -60, opacity fade), new
// image "enter" hoti hai right se (x: 60 -> 0, opacity fade-in). Dono ek
// hi AnimatePresence ke andar hain bina mode="wait" ke, isliye simultaneously
// (crossfade) animate hoti hain — jaisa "both images animate during
// transition" requirement mein maanga gaya.
export const imageVariants = {
  enter: { opacity: 0, x: 60 },
  center: {
    opacity: 1,
    x: 0,
    transition: {
      x: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }, // custom ease — smooth premium deceleration
      opacity: { duration: 0.6, ease: "easeOut" },
    },
  },
  exit: {
    opacity: 0,
    x: -60,
    transition: {
      x: { duration: 0.6, ease: [0.4, 0, 1, 1] },
      opacity: { duration: 0.45, ease: "easeInOut" },
    },
  },
};

// Reduced-motion version — koi translateX nahi, sirf ek simple, chhoti
// duration wali opacity crossfade (prefers-reduced-motion respect karta hai)
export const imageReducedVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

// -------------------- CONTENT REVEAL (text block) --------------------
// Poora content (eyebrow, heading, description, CTA) ek stagger container
// ke andar hai — har child ek ke baad ek reveal hota hai (delayChildren se
// thoda pause bhi hai taaki image thodi settle ho jaaye pehle).
export const heroContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

// "Subtle directional reveal" — halka translateY (16px, pehle se kam) +
// opacity. Koi scale/clip-path nahi rakha kyunki content mein buttons bhi
// hain, aur clip-path button jaise interactive elements pe ajeeb dikh
// sakta hai — translateY zyada safe aur universally clean hai.
export const heroItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export const heroReducedContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

export const heroReducedItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};
