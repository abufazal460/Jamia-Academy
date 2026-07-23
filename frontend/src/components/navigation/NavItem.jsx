import React, { memo } from "react";
import { motion } from "framer-motion";
import { TransitionNavLink } from "../pageTransition";

// ====================================================================
// NavItem.jsx — MODIFIED
//
// REMOVED:
//   - hasDropdown logic (arrow SVG, aria-haspopup, aria-expanded, isDropdownOpen prop)
//   - focus-visible:ring-* classes (ring intentionally hata diya gaya hai)
//   - ring-* in active indicator span
//   - layoutId active glow shadow (shadow-[0_0_18px...] bhi gone)
//
// WHY: Courses ab ek normal link ban gaya hai. Ring effect remove karna
// explicit requirement tha. Active state sirf background + text + rounded se milegi.
// ====================================================================

// Stagger entry animation - upar se neeche ek ek karke links aate hai.
const itemVariants = {
  hidden: { opacity: 0, y: -40 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
      delay: 0.1 + index * 0.07, // Stagger: har item thoda late aayega
    },
  }),
};

// React.memo: Agar parent re-render ho (mobile toggle etc) to ye component
// tabhi re-render hoga jab iske apne props change ho. Performance optimization.
const NavItem = memo(function NavItem({ item, index, isActive }) {
  return (
    <motion.li
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="relative list-none"
    >
      <motion.div
        // whileHover: small scale + smooth easing, professional feel.
        // whileTap: click feedback ke liye slight shrink.
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <TransitionNavLink
          to={item.route}
          // aria-current accessibility ke liye: screen reader ko active page batata hai.
          aria-current={isActive ? "page" : undefined}
          className={({ isActive: navIsActive }) =>
            [
              // px-5 py-2: professional padding around each link
              // rounded-full: pill shape for active state
              // text-sm: clean, readable font size
              "relative block px-5 py-2 rounded-full text-sm font-semibold",
              // transition-colors: hover text/bg smoothly change hoga (no jarring flash)
              "transition-colors duration-300 outline-none select-none",
              // NO ring, NO focus-visible:ring — intentionally removed as per requirement
              navIsActive || isActive
                ? // Active: background color + text color change. Ring nahi, border nahi.
                  "bg-white/10 text-cyan-300"
                : // Inactive: transparent bg, muted text, hover pe bg + text change
                  "text-slate-300 hover:bg-white/8 hover:text-white",
            ].join(" ")
          }
        >
          {item.label}
          {/* Courses dropdown arrow REMOVED — ab yahan kuch nahi render hoga */}
        </TransitionNavLink>

        {/* Active indicator: sirf subtle background pill.
            NO ring, NO shadow glow, NO border animation.
            layoutId use kiya hai taaki active pill smoothly ek link se doosre par move kare. */}
        {isActive && (
          <motion.span
            layoutId="active-nav-pill"
            className="absolute inset-0 -z-10 rounded-full bg-white/10"
            // Spring transition: smooth aur natural movement
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}
      </motion.div>
    </motion.li>
  );
});

export default NavItem;