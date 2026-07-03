import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import WhatsAppButton from "./WhatsAppButton";
import { navLinks } from "../../data/navLinksData";

// ====================================================================
// MobileMenu.jsx — MODIFIED
//
// REMOVED:
//   - onCourseToggle prop aur isCourseOpen prop (dropdown gone)
//   - Courses ke liye alag <button> accordion logic
//   - ALL focus-visible:ring-* classes (ring intentionally removed)
//
// ADDED:
//   - WhatsApp button ab navigation links ke NEECHE aayega (mobile-only).
//     Desktop par WhatsApp Navbar ke right me hai. Mobile sidebar me bottom par.
//   - Improved stagger timing for premium feel
//
// WHY: Courses simple NavLink ban gaya, accordion ki zaroorat khatam.
//      Ring remove karna explicit requirement tha.
//      WhatsApp mobile me bottom par move karna UX improvement hai.
// ====================================================================

// Backdrop overlay variant — background dhundla/blur karta hai sidebar ke peeche.
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

// Sidebar panel variant — RIGHT se slide hoke aata hai (x: 100% -> x: 0).
// staggerChildren: andar ke nav items ek ek karke appear honge (top to bottom).
const panelVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 280,       // Higher stiffness = snappier but still smooth entry
      damping: 30,
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.22, ease: "easeInOut" },
  },
};

// Har individual nav link ka variant — top se thoda fade-slide karke aayega.
const itemVariants = {
  hidden: { opacity: 0, y: -14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] }, // Custom ease: smooth out
  },
};

// WhatsApp button wrapper ke liye separate variant — sabse last me fade-in hoga.
const whatsappVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut", delay: 0.15 },
  },
};

// React.memo: Parent (Navbar) me re-render hone par ye tab tak re-render nahi karega
// jab tak isOpen ya onClose change na ho.
const MobileMenu = memo(function MobileMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background overlay — click karne par menu close hoga (UX best practice). */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            // bg-black/60 backdrop-blur-sm: dark semi-transparent overlay with blur
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Sidebar panel — right se slide hoga */}
          <motion.aside
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            // role="dialog" + aria-modal: Screen readers ko batata hai ye ek modal overlay hai.
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            // bg-[#0a0a0a]: Almost pure black, consistent with new navbar theme.
            // w-[78%] max-w-[320px]: Responsive width — chhote phones (320px) par bhi sahi rahega.
            className="fixed right-0 top-0 z-50 flex h-full w-[78%] max-w-[320px] flex-col bg-[#0a0a0a] border-l border-white/10 shadow-2xl"
          >
            {/* ---- CLOSE BUTTON ROW ---- */}
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Menu
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                // outline-none: NO ring — as per requirement. hover:bg-white/10 subtle feedback.
                className="grid h-8 w-8 place-items-center rounded-full text-slate-400 outline-none transition-colors hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* ---- NAV LINKS ---- */}
            {/* flex-1 overflow-y-auto: Long content wale screens par scroll kare sidebar. */}
            <nav className="flex flex-1 flex-col overflow-y-auto px-4 py-5" aria-label="Mobile navigation">
              <ul className="flex flex-col gap-1">
                {navLinks.map((item) => (
                  <motion.li key={item.id} variants={itemVariants} className="list-none">
                    {/* Ab saare links (including Courses) same NavLink hai — koi accordion nahi.
                        Dropdown logic REMOVED. Ye sirf route par navigate karega aur menu band karega. */}
                    <NavLink
                      to={item.route}
                      onClick={onClose} // Click hone par sidebar band karo
                      className={({ isActive }) =>
                        [
                          "block rounded-xl px-4 py-3 text-[15px] font-semibold",
                          // outline-none: NO ring/border outline. Ye requirement tha.
                          "outline-none transition-colors duration-200",
                          isActive
                            ? // Active: background + text color change. Ring nahi, border nahi.
                              "bg-white/10 text-cyan-300"
                            : "text-slate-300 hover:bg-white/8 hover:text-white",
                        ].join(" ")
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              {/* ---- WHATSAPP BUTTON (MOBILE — BOTTOM OF NAV LINKS) ----
                  Desktop par WhatsApp Navbar ke right me hai.
                  Mobile sidebar me ye navigation links ke NEECHE show hoga.
                  WHY: Mobile pe sidebar bottom me call-to-action naturally milta hai
                  aur user ko easily reach out karne ka option deta hai. */}
              <motion.div
                variants={whatsappVariants}
                // mt-6: Nav links se thoda gap. pb-2: Bottom ke close nahi ho.
                // flex justify-center: Button center align hoga.
                className="mt-6 flex justify-center pb-2"
              >
                {/* WhatsAppButton already React.memo se wrapped hai aur icon animation bhi hai.
                    Mobile me bhi wahi component reuse kar rahe hai — DRY principle. */}
                <WhatsAppButton />
              </motion.div>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
});

export default MobileMenu;