// ============================================================
// FAQItem.jsx
// Ye ek single FAQ accordion card hai.
// State yahan NAHI hai — parent (FAQ.jsx) se activeId aata hai.
// Iska faida: sirf ek FAQ open rehti hai ek waqt mein (accordion).
// Agar state yahan hoti toh multiple cards ek saath open ho jaate.
//
// Props:
// - faq: { id, question, answer }
// - isOpen: boolean — kya ye card abhi open hai?
// - onToggle: function — parent ko batao ki is card pe click hua
// - index: number — stagger animation ke liye delay calculate karne mein
// ============================================================

import { motion, AnimatePresence } from "framer-motion";

// -- Chevron rotation animation --
// Spring type — natural bouncy feel, not robotic
const chevronVariant = {
  closed: { rotate: 0 },
  open: {
    rotate: 180,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

// -- Answer panel (open/close) --
// AnimatePresence ke andar ye variants kaam karte hain
// initial false rakhte hain taki mount pe animate na ho sirf exit/enter pe
const answerVariant = {
  hidden: {
    height: 0,
    opacity: 0,
    filter: "blur(8px)",
    y: 10,
  },
  visible: {
    height: "auto",
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }, // cubic bezier — premium
      opacity: { duration: 0.35, ease: "easeOut" },
      filter: { duration: 0.35, ease: "easeOut" },
      y: { duration: 0.35, ease: "easeOut" },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    filter: "blur(8px)",
    y: -6,
    transition: {
      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.25, ease: "easeIn" },
      filter: { duration: 0.25, ease: "easeIn" },
    },
  },
};

// -- Card scroll reveal variant (stagger ke liye parent se inherit) --
// index prop se delay calculate hota hai
export const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: "easeOut",
      // Har card pichle se 0.08s baad aayega — smooth stagger
      delay: index * 0.08,
    },
  }),
};

const FAQItem = ({ faq, isOpen, onToggle, index }) => {
  // Unique IDs — accessibility ke liye zaroori
  // aria-controls + id match karna chahiye
  const answerId = `answer-${faq.id}`;
  const questionId = `question-${faq.id}`;

  return (
    // motion.div — scroll reveal ke liye, custom variant with index
    <motion.div
      variants={cardVariant}
      custom={index} // 'custom' prop variant function mein argument ki tarah jaata hai
      // overflow-hidden zaroori hai taki height: 0 pe answer hide rahe
      // bina iske answer visible rahega collapse hone ke baad
      className={`
        overflow-hidden rounded-2xl
        border transition-all duration-300
        ${
          isOpen
            ? "border-white/10 bg-white/[0.07] shadow-lg shadow-cyan-500/10"
            : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.06]"
        }
      `}
    >
      {/* -- Question Button -- */}
      {/* button tag — keyboard accessible (Enter/Space se click hota hai) */}
      <button
        id={questionId}
        // aria-expanded — screen readers ko pata chalta hai ki accordion open hai ya nahi
        aria-expanded={isOpen}
        // aria-controls — ye button kis element ko control karta hai (answer div)
        aria-controls={answerId}
        onClick={onToggle}
        className="
          w-full flex items-center justify-between gap-4
          px-5 sm:px-6 py-5 sm:py-6
          text-left cursor-pointer
          group
          focus:outline-none focus-visible:ring-2
          focus-visible:ring-cyan-400/60 focus-visible:ring-offset-1
          focus-visible:ring-offset-transparent
          rounded-2xl
        "
      >
        {/* Question text */}
        <span
          className={`
            text-sm sm:text-base md:text-lg font-medium leading-snug
            transition-colors duration-300
            ${isOpen ? "text-cyan-300" : "text-slate-200 group-hover:text-white"}
          `}
        >
          {faq.question}
        </span>

        {/* -- Chevron Icon (SVG — no library needed) -- */}
        {/* flex-shrink-0 — icon kabhi squish nahi hoga lamba text hone pe */}
        <motion.span
          variants={chevronVariant}
          animate={isOpen ? "open" : "closed"}
          className="flex-shrink-0"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-colors duration-300 ${
              isOpen ? "text-slate-500" : "text-slate-500 group-hover:text-slate-300"
            }`}
            aria-hidden="true" // decorative icon — screen readers skip karein
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </button>

      {/* -- Answer Panel --
          AnimatePresence zaroori hai exit animation ke liye.
          Bina iske component unmount hote hi gayab ho jaata — koi animation nahi.
          mode="sync" — exit aur enter same time pe ho sakte hain (no wait) */}
      <AnimatePresence mode="sync" initial={false}>
        {isOpen && (
          <motion.div
            key={answerId} // key important hai AnimatePresence ke liye
            id={answerId}
            role="region" // semantic role — accessibility ke liye
            aria-labelledby={questionId}
            variants={answerVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            // overflow-hidden — height animation ke liye zaroori
            // bina iske height 0 pe bhi content bahar dikhai dega
            className="overflow-hidden"
          >
            {/* Inner padding wrapper — px/pb se answer ka spacing */}
            <div className="px-5 sm:px-6 pb-5 sm:pb-6">
              {/* Thin divider line */}
              <div className="h-px bg-white/10 mb-4 sm:mb-5" />
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQItem;