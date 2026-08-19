// Hover/tap interaction variants — used via whileHover / whileTap props
import { staggerItem } from "../../features/contact/motion/contact.motion";

export const cardHoverVariant = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Composed variant: reuses staggerItem's hidden/visible (entrance, driven by
// parent's whileInView propagation) and adds a "hover" state — lets a single
// element handle both scroll-entrance and hover on its own variants object
// without one whileHover/initial override cancelling the other.
export const interactiveCardVariant = {
  hidden: staggerItem.hidden,
  visible: staggerItem.visible,
  hover: cardHoverVariant.hover,
};

export const buttonHoverVariant = {
  rest: { scale: 1 },
  hover: { scale: 1.04, transition: { duration: 0.25, ease: "easeOut" } },
  tap: { scale: 0.97 },
};

export const iconHoverVariant = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.15,
    rotate: 8,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// "Magnetic" feeling social icon — slight lift + glow via scale/shadow (no layout props)
export const socialIconHoverVariant = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.12,
    y: -4,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95 },
};
