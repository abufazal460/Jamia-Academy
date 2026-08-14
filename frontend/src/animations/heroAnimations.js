// Saare Framer Motion variants ek jagah — components mein duplicate nahi honge

// Image slide transition — fade + halka zoom, premium feel ke liye
export const imageVariants = {
  enter: { opacity: 0, scale: 1.03 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { opacity: { duration: 1, ease: "easeOut" }, scale: { duration: 6, ease: "linear" } },
  },
  exit: { opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } },
};

// Reduced-motion users ke liye — sirf opacity, koi scale/zoom nahi
export const imageReducedVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

// Text content — stagger ke saath eyebrow, heading, description, CTA ek-ek karke aate hain
export const heroContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

export const heroItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Reduced-motion version — koi movement nahi, sirf fade
export const heroReducedContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

export const heroReducedItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};