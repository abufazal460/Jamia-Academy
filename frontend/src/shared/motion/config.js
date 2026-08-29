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

// animationVariants.js
// Saare Framer Motion variants ek jagah — reusable, aur LoginCard ke
// andar stagger sequence isi se drive hota hai:
// card -> heading -> email label -> password label -> inputs -> button

// Har spring ka "duration" key ignore hota hai — stiffness/damping/mass hi
// actual feel control karte hain (Jamia Academy me yeh pattern already established hai).

export const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
      mass: 1,
      when: "beforeChildren",
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const headingVariants = {
  hidden: {
    y: -60,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 16,
      mass: 0.9,
    },
  },
};

export const emailLabelEntranceVariants = {
  hidden: {
    y: -24,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

export const passwordLabelEntranceVariants = {
  hidden: {
    y: 24,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};


export const buttonExpandVariants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 20,
      delay: 0.05,
    },
  },
};

// Floating label ke liye — jab input focused ho ya value ho, top-border
// center pe move karega aur thoda scale down hoga.
export const floatingLabelVariants = {
  resting: {
    top: "50%",
    left: "1.25rem",
    x: 0,
    y: "-50%",
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 26 },
  },
  floating: {
    top: "0%",
    y: "-50%",
    scale: 0.78,
    transition: { type: "spring", stiffness: 300, damping: 26 },
  },
};

// Card ki continuous floating idle motion (subtle depth ke liye)
export const cardFloatVariants = {
  float: {
    y: [0, -8, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Eye / EyeOff icon toggle ke liye smooth rotation + fade
export const iconToggleVariants = {
  initial: { opacity: 0, rotate: -90, scale: 0.6 },
  animate: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 22 },
  },
  exit: {
    opacity: 0,
    rotate: 90,
    scale: 0.6,
    transition: { duration: 0.15 },
  },
};

// Field-level error message ke liye shake + fade
export const errorMessageVariants = {
  hidden: { opacity: 0, height: 0, y: -4 },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 28 },
  },
};

// Button hover text-slide (idle text upar exit, naya text neeche se enter)
export const buttonTextSlideVariants = {
  idle: { y: 0, opacity: 1 },
  exit: { y: "-100%", opacity: 0, transition: { duration: 0.28, ease: "easeInOut" } },
  enter: { y: "100%", opacity: 0 },
  active: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.28, ease: "easeInOut" },
  },
};

// Jab prefers-reduced-motion on ho, saare variants isse replace karte hain —
// sirf opacity fade, koi transform/spring nahi.
export const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
};
