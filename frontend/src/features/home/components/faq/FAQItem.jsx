import { motion, AnimatePresence } from "motion/react";

const chevronVariant = {
  closed: { rotate: 0 },
  open: {
    rotate: 180,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

const answerVariant = {
  hidden: { height: 0, opacity: 0, y: 10 },
  visible: {
    height: "auto", opacity: 1, y: 0,
    transition: {
      height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.35, ease: "easeOut" },
      y: { duration: 0.35, ease: "easeOut" },
    },
  },
  exit: { height: 0, opacity: 0, y: -6, transition: { height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.25, ease: "easeIn" } } },
};

export const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: "easeOut",
      delay: index * 0.08,
    },
  }),
};

const FAQItem = ({ faq, isOpen, onToggle, index }) => {

  const answerId = `answer-${faq.id}`;
  const questionId = `question-${faq.id}`;

  return (
    <motion.div
      variants={cardVariant}
      custom={index}
      className={`
        overflow-hidden rounded-2xl
        border transition-all duration-300
        ${isOpen
          ? "border-white/10 bg-white/[0.07] shadow-lg shadow-cyan-500/10"
          : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.06]"
        }
      `}
    >
      <button
        id={questionId}
        aria-expanded={isOpen}
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
          rounded-2xl"
      >
        <span
          className={`
            text-sm sm:text-base md:text-lg font-semibold leading-snug
            transition-colors duration-300
            ${isOpen ? "bg-gradient-to-r from-orange-500 via-yellow-400 to-red-400 bg-clip-text text-transparent" : "text-slate-200 group-hover:text-white"}
          `}
        >
          {faq.question}
        </span>
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
            className={`transition-colors duration-300 ${isOpen ? "text-slate-500" : "text-slate-500 group-hover:text-slate-300"
              }`}
            aria-hidden="true"
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

      <AnimatePresence mode="sync" initial={false}>
        {isOpen && (
          <motion.div
            key={answerId}
            id={answerId}
            role="region"
            aria-labelledby={questionId}
            variants={answerVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6">
              <div className="h-px bg-white/10 mb-4 sm:mb-5" />
              <p className="font-medium text-sm sm:text-base text-slate-400 leading-relaxed">
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