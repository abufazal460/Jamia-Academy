import React, { memo } from "react";
import { motion } from "framer-motion";

// ====================================================================
// WhatsAppButton.jsx
// Ye Navbar ke right side wala WhatsApp contact button hai (Search button replace kiya).
// Button khud static rahega, sirf andar wala Icon float + rotate + scale karega.
// ====================================================================

// Icon ke liye infinite floating animation - bahut subtle, premium feel ke liye.
const iconFloatVariants = {
  animate: {
    y: [0, -3, 0], // Float up-down
    rotate: [0, -6, 6, 0], // Halka sa rotate
    scale: [1, 1.08, 1], // Halka sa scale pulse
    transition: {
      duration: 2.8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const WhatsAppButton = memo(function WhatsAppButton() {
  return (
    <motion.a
      // Initial page-load animation: right se slide-in
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 110, damping: 16, delay: 0.4 }}
      href="https://wa.me/9621555551" // Yaha actual WhatsApp number daalna hoga production me
      target="_blank"
      rel="noopener noreferrer" // Security best practice - external link tab-nabbing se bachata hai
      aria-label="Chat with us on WhatsApp"
      // whileHover/whileTap se button khud bhi halka sa scale karega click feedback ke liye,
      // lekin "float" sirf icon karega (button static rahega jaisa instruction me bola gaya).
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={[
        "flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2.5",
        "text-sm font-semibold text-white shadow-lg shadow-emerald-500/30",
        "outline-none transition-colors duration-300 hover:bg-emerald-400",
        "focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1437]",
      ].join(" ")}
    >
      {/* Sirf ye SVG icon animate hota hai, button background/shape static hai */}
      <motion.svg
        variants={iconFloatVariants}
        animate="animate"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.85.5 3.58 1.36 5.07L2 22l5.2-1.36a9.84 9.84 0 0 0 4.84 1.24h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.78 14.07c-.24.68-1.4 1.32-1.93 1.39-.49.07-1.12.1-1.81-.11a16.6 16.6 0 0 1-1.65-.61c-2.9-1.25-4.8-4.16-4.94-4.35-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.81 2 .88 2.14.07.14.12.31.02.5-.1.19-.15.31-.3.48-.14.17-.31.37-.44.5-.14.14-.3.3-.13.59.18.29.78 1.29 1.68 2.09 1.16 1.04 2.13 1.36 2.43 1.51.3.15.47.13.65-.08.18-.21.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 1.99.94.29.15.48.22.55.34.07.13.07.74-.17 1.42Z" />
      </motion.svg>
      <span>WhatsApp</span>
    </motion.a>
  );
});

export default WhatsAppButton;