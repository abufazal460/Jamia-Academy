import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { navLinks } from "../../data/navLinksData";

// ====================================================================
// MobileMenu.jsx
// Ye mobile/tablet screens par RIGHT side se slide hone wala sidebar hai.
// Hamburger click karne par open hota hai, cross click par close.
// ====================================================================

// Backdrop (background blur overlay) ke liye variant.
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// Sidebar panel ke liye variant - x: 100% (right se bahar) -> x: 0 (visible).
const panelVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 28,
      staggerChildren: 0.07, // Items top to bottom ek ek karke aayenge
      delayChildren: 0.12,
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
};

// Har mobile menu item ka variant - top se thoda fade-slide karke aayega.
const itemVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const MobileMenu = memo(function MobileMenu({ isOpen, onClose, onCourseToggle, isCourseOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background blur overlay - isse click karne par bhi menu close ho jata hai (UX best practice) */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Actual sliding sidebar panel */}
          <motion.aside
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            // role="dialog" + aria-modal: screen readers ko batata hai ye ek modal overlay hai.
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="fixed right-0 top-0 z-50 flex h-full w-[80%] max-w-sm flex-col bg-[#0b1437]/95 backdrop-blur-xl shadow-2xl ring-1 ring-white/10"
          >
            <div className="flex items-center justify-end p-5">
              {/* Close button - keyboard accessible, clear focus ring */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-full p-2 text-slate-300 outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                ✕
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6">
              <ul className="flex flex-col gap-2">
                {navLinks.map((item) => (
                  <motion.li key={item.id} variants={itemVariants} className="list-none">
                    {item.hasDropdown ? (
                      // Courses item mobile par accordion jaisa toggle karega (sub-list expand/collapse)
                      <div>
                        <button
                          type="button"
                          onClick={onCourseToggle}
                          aria-expanded={isCourseOpen}
                          className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-semibold text-slate-100 outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-cyan-400"
                        >
                          {item.label}
                          <motion.span animate={{ rotate: isCourseOpen ? 180 : 0 }} aria-hidden="true">
                            ▾
                          </motion.span>
                        </button>
                      </div>
                    ) : (
                      <NavLink
                        to={item.route}
                        onClick={onClose}
                        className={({ isActive }) =>
                          [
                            "block rounded-xl px-4 py-3 text-base font-semibold outline-none transition-colors",
                            "focus-visible:ring-2 focus-visible:ring-cyan-400",
                            isActive
                              ? "bg-cyan-400/15 text-cyan-300 ring-1 ring-cyan-300/40"
                              : "text-slate-100 hover:bg-white/10",
                          ].join(" ")
                        }
                      >
                        {item.label}
                      </NavLink>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
});

export default MobileMenu;