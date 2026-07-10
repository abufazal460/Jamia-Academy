// ============================================================
// FAQ.jsx
// Main orchestrator component.
// Yahan state rakha hai (activeId) — "Lift State Up" pattern.
// Agar state har FAQItem mein hoti toh multiple items ek saath
// open ho jaate — accordion behaviour kaam nahi karta.
//
// Yahan kya hota hai:
// 1. activeId state manage hoti hai
// 2. faqData se map karke FAQItem render hote hain
// 3. Scroll reveal ke liye container variant hai
// 4. FAQHeader import kiya hai
// ============================================================

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import FAQHeader from "./FAQHeader";
import FAQItem from "./FAQItem";
import faqData from "../../data/faqData";

// -- Scroll reveal container variant --
// Children (FAQ cards) ek ek karke stagger ke saath aayenge
// staggerChildren — har card pichle ke 0.08s baad start hoga
const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1, // header aane ke baad thoda wait
    },
  },
};

const FAQ = () => {
  // activeId — currently open FAQ ka id store karta hai
  // null means koi bhi open nahi (default — sab closed)
  // Ye ek hi state se poora accordion control hota hai
  const [activeId, setActiveId] = useState(null);

  // useCallback — ye function baar baar recreate nahi hoga
  // performance optimization — especially jab FAQItem re-render ho
  const handleToggle = useCallback((id) => {
    // Agar same id click ho jis par already open hai → close kar do (null)
    // Agar naya id click ho → us id ko open karo (purana automatically close)
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  return (
    // section tag — semantic HTML, accessibility ke liye landmark
    // bg-[#0a0f1f] — dark navy background, reference jaise
    // py responsive — mobile pe kam, desktop pe zyada padding
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="
        bg-[#0a0f1f] relative
        py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32
        px-4 sm:px-6 md:px-8 lg:px-12
        overflow-hidden
      "
    >
      {/* -- Subtle background glow (decorative) --
          pointer-events-none — mouse events block na ho
          aria-hidden — screen readers skip karein */}
      <div
        aria-hidden="true"
        className="
          absolute top-0 left-1/2 -translate-x-1/2
          w-[600px] h-[400px]
          bg-cyan-500/5 rounded-full blur-3xl
          pointer-events-none
        "
      />

      {/* Max width container — content ek jagah centered rahe */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* -- Section Header (Badge + Heading) -- */}
        <FAQHeader />

        {/* -- FAQ Cards List --
            motion.div ke andar map kiya hai taaki stagger kaam kare
            whileInView — jab list viewport mein aaye tab animate ho
            viewport once: true — sirf ek baar */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{  amount: 0.1 }}
          // flex-col + gap — cards ke beech spacing
          className="flex flex-col gap-3 sm:gap-4"
          // ul/div — ye list hai isliye role="list" add karna better practice hai
          role="list"
        >
          {faqData.map((faq, index) => (
            // role="listitem" — har card ek list item hai
            <div key={faq.id} role="listitem">
              <FAQItem
                faq={faq}
                // isOpen — kya ye particular card open hai?
                isOpen={activeId === faq.id}
                // onToggle — is card ka toggle handler
                onToggle={() => handleToggle(faq.id)}
                // index — stagger delay calculate karne ke liye
                index={index}
              />
            </div>
          ))}
        </motion.div>

        {/* -- Bottom CTA (optional, premium touch) -- */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="
            text-center mt-10 sm:mt-12
            text-sm sm:text-base text-slate-500
          "
        ></motion.p>
      </div>
    </section>
  );
};

export default FAQ;
