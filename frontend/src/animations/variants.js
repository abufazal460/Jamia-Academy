/**
 * variants.js
 * ---------------------------------------------------------------------------
 * YEH FILE KYU HAI (Why this file exists)
 * Requirement thi: "No duplicated animation code. Follow DRY. Use reusable
 * variants." Agar har component ke andar apna alag animation object likhenge
 * to code duplicate hoga aur maintain karna mushkil hoga. Isliye saari
 * Framer Motion variants ek central jagah define ki hai — dono sections
 * (Accreditation + Feature) yahi import karke use karenge.
 *
 * IMPORTANT CONCEPT: "Replay every time section enters viewport"
 * Framer Motion ke whileInView prop ke sath jab hum viewport={{ once:false }}
 * set karte hai, to jab bhi element viewport se bahar jaake wapas andar aata
 * hai, animation dobara chalta hai (replay). "once:true" hota to sirf ek
 * baar chalta. Hume replay chahiye, isliye har jagah once:false use hoga.
 * ---------------------------------------------------------------------------
 */

// Easing curve — ek premium "ease-out expo" jaisa smooth feel deta hai.
// Yeh ek hi curve poore project mein consistent motion-language banaye rakhta hai.
export const EASE_SMOOTH = [0.22, 1, 0.36, 1];

/**
 * Viewport config — reusable object jo whileInView ke sath use hoga.
 * amount: 0.3 matlab jab element ka 30% part visible ho jaye, tabhi trigger ho.
 * once: false matlab HAR baar viewport mein enter/exit par animation replay ho.
 */
export const VIEWPORT_REPLAY = { once: false, amount: 0.3 };

/* ---------------------------------------------------------------------------
 * HEADING + PARAGRAPH STAGGER SYSTEM
 * Requirement: "Heading comes from Bottom -> Paragraph appears after (stagger)"
 * Parent variant staggerChildren control karta hai, child variants (heading,
 * paragraph) khud ka opacity/translateY define karte hai.
 * ------------------------------------------------------------------------- */

// Parent wrapper — heading aur paragraph dono isi ke andar honge.
export const textStaggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18, // heading ke baad 0.18s delay se paragraph animate hoga
    },
  },
};

// Heading: neeche se (positive Y) upar aake opacity 0 -> 1
export const headingRiseVariant = {
  hidden: { opacity: 0, y: 42 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

// Paragraph: same pattern, thoda kam distance (subtle secondary motion)
export const paragraphRiseVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

/* ---------------------------------------------------------------------------
 * CARD RANDOM-DIRECTION ENTRY SYSTEM
 * Requirement: "Cards appear one by one, random direction (top/bottom/left/
 * right), opacity 0->1, scale 0.8->1, smooth spring."
 *
 * IMPORTANT (hydration-safety note):
 * Hum "Math.random()" render ke time par NAHI use kar rahe. Agar directly
 * render mein Math.random() call karte, to Server-Side Render aur Client
 * render ke beech mismatch aane ka risk hota (hydration warning/bug) — jo
 * requirement mein explicitly mana kiya gaya hai ("No hydration issues").
 *
 * Iski jagah ek FIXED deterministic pattern array use kiya hai jo index ke
 * basis par direction assign karta hai. Result "random jaisa" dikhta hai
 * (kyunki pattern mix hai) lekin har render/every-time-same predictable hai.
 * ------------------------------------------------------------------------- */

// Fixed cycling pattern — index % pattern.length se direction milegi.
// Chaho to yahi array shuffle karke "randomness ka feel" badal sakte ho.
const DIRECTION_PATTERN = ["left", "bottom", "right", "top", "bottom", "left"];

/**
 * getCardDirection
 * Card ke index se deterministic direction nikaalta hai.
 * @param {number} index - card ka array index
 * @returns {"top"|"bottom"|"left"|"right"}
 */
export const getCardDirection = (index) =>
  DIRECTION_PATTERN[index % DIRECTION_PATTERN.length];

// Direction string ko actual x/y pixel-offset mein convert karta hai.
const DIRECTION_OFFSET = {
  top: { x: 0, y: -60 },
  bottom: { x: 0, y: 60 },
  left: { x: -60, y: 0 },
  right: { x: 60, y: 0 },
};

/**
 * getCardVariant
 * Ek complete Framer Motion variant object return karta hai jo diye gaye
 * direction se hidden state banata hai, aur visible state mein spring ke
 * sath apni original position par settle hota hai.
 * @param {"top"|"bottom"|"left"|"right"} direction
 */
export const getCardVariant = (direction) => {
  const offset = DIRECTION_OFFSET[direction] ?? DIRECTION_OFFSET.bottom;
  return {
    hidden: {
      opacity: 0,
      scale: 0.8,
      x: offset.x,
      y: offset.y,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
        mass: 0.9,
      },
    },
  };
};

// Cards ka parent container — staggerChildren se "ek-ek karke" (one by one)
// appear hone ka effect milta hai.
export const cardStaggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/* ---------------------------------------------------------------------------
 * IMAGE-INSIDE-CARD ANIMATION (sirf Accreditation cards ke liye)
 * Requirement: "After each card reaches position, image animates: opacity
 * 0->1, scale 0->1, centered, one after another."
 * ------------------------------------------------------------------------- */
export const logoImageVariant = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.25, // card apni jagah pahuchne ke thodi der baad image aaye
      duration: 0.45,
      ease: EASE_SMOOTH,
    },
  },
};

/* ---------------------------------------------------------------------------
 * HOVER MICRO-INTERACTIONS (reusable across cards)
 * whileHover object motion component par directly spread kiya jayega.
 * ------------------------------------------------------------------------- */
export const cardHoverLift = {
  y: -10,
  scale: 1.02,
  transition: { duration: 0.3, ease: EASE_SMOOTH },
};

export const iconHoverRotate = {
  rotate: 8,
  scale: 1.1,
  transition: { duration: 0.3, ease: EASE_SMOOTH },
};