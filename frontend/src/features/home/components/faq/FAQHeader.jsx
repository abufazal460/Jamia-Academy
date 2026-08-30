// ============================================================
// FAQHeader.jsx
// Sirf heading ka kaam yahan hota hai — badge + title.
// Alag isliye rakha kyunki:
// 1. Agar sirf heading style change karni ho, sirf yahan aao
// 2. Reusable hai — kisi bhi section mein same header use ho sakta hai
// Motion variants yahan define hain taaki FAQ.jsx clean rahe.
// ============================================================

import { motion } from "motion/react";

// -- Heading animation variant --
// Viewport mein aate hi opacity 0->1, Y 40->0 smooth slide up
const headingVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    // duration 0.7s, easeOut — premium, natural feel
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// Badge apna alag stagger — heading se thoda pehle aayega
const badgeVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Container — badge pehle, heading baad mein (stagger)
const headerContainerVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const FAQHeader = () => {
  return (
    // whileInView — jab ye element viewport mein 30% dikh jaaye tab animate ho
    // once: true — sirf ek baar, scroll up-down pe repeat nahi hogi
    <motion.div
      variants={headerContainerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.3 }}
      // text-center — sab kuch center mein, consistent across all screen sizes
      className="text-center mb-12 sm:mb-16 lg:mb-20"
    >
      

      {/* -- Main heading -- */}
      <motion.h2
        variants={headingVariant}
        // text fluid scaling: sm se 4xl tak — kabhi bhi overflow nahi hogi
        className="
          font-['Inter'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl
          font-black text-white
          leading-tight tracking-wide
          max-w-3xl mx-auto
          px-4
        "
      >
        <span className="bg-gradient-to-r from-orange-400 via-yellow-300 to-red-500 bg-clip-text text-transparent">Frequently</span> 
        {" "}
        Asked 
        Questions
        From Our
        {" "}
        <span className="bg-gradient-to-r from-orange-400 via-yellow-300 to-red-500 bg-clip-text text-transparent">Students</span>
      </motion.h2>
    </motion.div>
  );
};

export default FAQHeader;