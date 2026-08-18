// ==========================================================================
// motionVariants.js
// --------------------------------------------------------------------------
// Saare reusable Framer Motion variants yahan ek jagah rakhe hain.
// Isse har component mein baar baar wahi animation object likhne ki
// zaroorat nahi padti — DRY principle follow hota hai.
// ==========================================================================

// Fade + slide up — jab koi block viewport mein aaye ya mount ho
export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
};

// Stagger container — parent pe lagao, children ek ek karke animate
// honge (function hai taaki delay customize kar sako without duplicating)
export const staggerContainer = (staggerDelay = 0.12, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

// Simple opacity fade
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

// Scale pop — badges/icons ke entrance ke liye
export const scalePop = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 14 },
  },
};

// Button press/hover feedback — buttons mein whileTap/whileHover ke saath use hoga
export const buttonTap = { scale: 0.96 };
export const buttonHover = { scale: 1.03 };

// Card lift on hover — pillar cards ke liye (rest/hover named states)
export const cardHover = {
  rest: { y: 0, boxShadow: "0 0px 0px rgba(56,189,248,0)" },
  hover: {
    y: -6,
    boxShadow: "0 20px 40px -12px rgba(56,189,248,0.25)",
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

// Letter-by-letter reveal — heading/description letters ke liye
export const letterVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};
