export const EASE_SMOOTH = [0.22, 1, 0.36, 1];

export const VIEWPORT_REPLAY = { once: false, amount: 0.3 };

export const textStaggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

export const headingRiseVariant = {
  hidden: { opacity: 0, y: 42 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

export const paragraphRiseVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

const DIRECTION_PATTERN = ["left", "bottom", "right", "top", "bottom", "left"];

export const getCardDirection = (index) =>
  DIRECTION_PATTERN[index % DIRECTION_PATTERN.length];

const DIRECTION_OFFSET = {
  top: { x: 0, y: -60 },
  bottom: { x: 0, y: 60 },
  left: { x: -60, y: 0 },
  right: { x: 60, y: 0 },
};

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

export const cardStaggerContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const logoImageVariant = {
  hidden: { opacity: 0, scale: 0 },
  VIEWPORT_REPLAY: { once: true },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.25,
      duration: 0.45,
      ease: EASE_SMOOTH,
    },
  },
};

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