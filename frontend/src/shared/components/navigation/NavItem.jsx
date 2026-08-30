import React, { memo } from "react";
import { motion } from "motion/react";
import { TransitionNavLink } from "../../../app/providers/page-transition";

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
const NavItem = memo(function NavItem({ item, index, isActive, onHover, itemRef }) {
  return (
    <motion.li
      ref={itemRef}
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="relative list-none"

    >
      {/* isko motion div de simple div kiya hai aur iske andar ka content ko commnet kar diya hai */} <div
      // whileHover={{ scale: 1.05 }}
      // whileTap={{ scale: 0.95 }}
      // transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >

        <TransitionNavLink
          to={item.route}
          aria-current={isActive ? "page" : undefined}
          onMouseEnter={() => onHover(index)}
          className={({ isActive: navIsActive }) =>
            [
              "relative block px-5 py-2 rounded-full text-sm font-semibold",
              "transition-colors duration-300 outline-none select-none",
              navIsActive || isActive
                ? "bg-gradient-to-r from-orange-400 via-yellow-300 to-red-500 bg-clip-text text-transparent"
                : "text-slate-300 hover:bg-white hover:text-black",
            ].join(" ")
          }
        >
          {item.label}
        </TransitionNavLink>

        {/* Active indicator: sirf subtle background pill.
            NO ring, NO shadow glow, NO border animation.
            layoutId use kiya hai taaki active pill smoothly ek link se doosre par move kare. */}
        {isActive && (
          <motion.span
            layoutId="active-nav-pill"
            className="absolute inset-0 -z-10 rounded-full bg-white/15"
            // Spring transition: smooth aur natural movement
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}
      </div>
    </motion.li>
  );
});

export default NavItem;