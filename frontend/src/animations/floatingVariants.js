// Infinite idle animations — hamesha usePrefersReducedMotion ke saath guard karke use karo

export const floatingBlob = {
  animate: {
    y: [0, -20, 0],
    x: [0, 12, 0],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
  },
};

export const floatingBlobSlow = {
  animate: {
    y: [0, 18, 0],
    x: [0, -14, 0],
    transition: { duration: 11, repeat: Infinity, ease: "easeInOut" },
  },
};

// Hero visual cards — har card ko alag delay dene ke liye function
export const floatingCard = (delay = 0) => ({
  animate: {
    y: [0, -14, 0],
    transition: {
      duration: 4.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    },
  },
});

// Static fallback jab reduced-motion on ho
export const noMotion = { animate: {} };
