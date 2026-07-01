import React, { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { courseCategories } from "../../data/coursesData";

// ====================================================================
// MegaMenu.jsx
// Ye "Courses" link click karne par khulne wala Mega Menu hai.
// Reference image ke jaisa: white background, columns me categories,
// har category ke andar courses list.
// ====================================================================

// Container ke liye variant - poora box scale + slide-down + opacity ke saath aata hai.
const containerVariants = {
  hidden: { opacity: 0, scale: 0.96, y: -16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 22,
      // staggerChildren: har column thodi der baad ek ek karke aayegi.
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -16,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

// Har column (category) ke liye variant.
const columnVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 20, staggerChildren: 0.05 },
  },
};

// Har individual course item ke liye variant (column ke andar stagger).
const courseItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

const MegaMenu = memo(function MegaMenu({ isOpen, onCourseClick }) {
  // Ye state track karta hai ki container ki entry animation complete hui ya nahi.
  // WHY: Border animation aur glow tabhi start karni hai jab dropdown fully open ho chuka ho,
  // taki dono animations overlap na kare aur premium feel aaye.
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <AnimatePresence onExitComplete={() => setHasEntered(false)}>
      {isOpen && (
        <motion.div
          // absolute positioning se ye Navbar ke niche float karta hai bina layout todhe.
          className="absolute left-1/2 top-full z-40 mt-3 w-[min(96vw,1100px)] -translate-x-1/2 px-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          // onAnimationComplete tab fire hota hai jab "visible" state ka animation poora ho jaye.
          onAnimationComplete={(definition) => {
            if (definition === "visible") setHasEntered(true);
          }}
          role="menu"
          aria-label="Courses menu"
        >
          {/* ============================================================
              ANIMATED GRADIENT BORDER WRAPPER
              WHY: Outer div me rotating conic-gradient background hai jo
              border jaisa dikhta hai (padding trick se). Sirf hasEntered
              true hone ke baad hi ye animate start karta hai.
          ============================================================ */}
          <div
            className={[
              "relative rounded-3xl p-[2px] overflow-hidden",
              hasEntered ? "animate-border-spin" : "",
            ].join(" ")}
            style={{
              // Conic gradient multiple colors ke saath - ye continuously rotate hoga (CSS keyframe via tailwind config).
              backgroundImage: hasEntered
                ? "conic-gradient(from 0deg, #22d3ee, #818cf8, #f472b6, #fbbf24, #22d3ee)"
                : "none",
            }}
          >
            {/* Inner white box - ye actual mega menu content hai.
                Jab border animate hoti hai, tab hi hum soft glow + subtle scale pulse bhi start karte hai. */}
            <motion.div
              className="relative rounded-[22px] bg-white shadow-2xl ring-1 ring-black/5"
              animate={
                hasEntered
                  ? { scale: [1, 1.01, 1] } // Subtle infinite pulse: 1 -> 1.01 -> 1
                  : { scale: 1 }
              }
              transition={
                hasEntered
                  ? { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
                  : {}
              }
              style={{
                // Soft glow shadow jab border-animation start ho chuki ho.
                boxShadow: hasEntered
                  ? "0 0 35px 4px rgba(99,102,241,0.18)"
                  : undefined,
              }}
            >
              {/* Professional padding aur responsive grid - reference image jaisa */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-8 p-6 sm:grid-cols-3 sm:p-8 lg:grid-cols-6">
                {courseCategories.map((category) => (
                  <motion.div key={category.id} variants={columnVariants} role="none">
                    {/* Category title - icon + text */}
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-rose-600">
                      <span
                        aria-hidden="true"
                        className="grid h-5 w-5 place-items-center rounded bg-rose-50 text-rose-500"
                      >
                        {/* Simple box icon, inline SVG taki extra image load na ho (performance) */}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 2 21 7v10l-9 5-9-5V7l9-5Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {category.title}
                    </h3>

                    {/* Courses list - .map() use kiya hai, NO hardcoded repeated HTML */}
                    <ul className="space-y-2.5">
                      {category.courses.map((course) => (
                        <motion.li key={course.id} variants={courseItemVariants} role="none">
                          <Link
                            to={course.route}
                            role="menuitem"
                            onClick={() => onCourseClick?.(course)}
                            className="text-[13.5px] text-slate-600 outline-none transition-colors duration-200 hover:text-rose-600 focus-visible:text-rose-600 focus-visible:underline"
                          >
                            {course.label}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default MegaMenu;