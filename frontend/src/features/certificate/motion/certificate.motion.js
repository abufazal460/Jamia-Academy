export const CERT_EASE_PREMIUM = [0.16, 1, 0.3, 1];

export const certHeadingVariants = {
  hidden: { opacity: 0, y: -48, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: CERT_EASE_PREMIUM },
  },
};

export const certCardVariants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: CERT_EASE_PREMIUM, delay: 0.15 },
  },
};

export const certFieldsContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.35 },
  },
};

export const certFieldItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: CERT_EASE_PREMIUM },
  },
};

export const certLabelEntryOffsets = {
  top: { x: 0, y: -14 },
  bottom: { x: 0, y: 14 },
  left: { x: -18, y: 0 },
  right: { x: 18, y: 0 },
  fade: { x: 0, y: 6 },
};

export function getCertLabelEntryVariants(direction = "fade") {
  const offset = certLabelEntryOffsets[direction] || certLabelEntryOffsets.fade;
  return {
    hidden: { opacity: 0, x: offset.x, y: offset.y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.55, ease: CERT_EASE_PREMIUM, delay: 0.5 },
    },
  };
}

export const certButtonWidthVariants = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: { duration: 0.9, ease: CERT_EASE_PREMIUM, delay: 0.9 },
  },
};

export const certShakeVariants = {
  idle: { x: 0 },
  shake: {
    x: [0, -8, 8, -6, 6, -3, 3, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

export const certSpinnerTransition = {
  repeat: Infinity,
  ease: "linear",
  duration: 0.9,
};
