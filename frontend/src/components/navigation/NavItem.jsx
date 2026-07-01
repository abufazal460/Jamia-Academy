import React, { memo } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

// ====================================================================
// NavItem.jsx
// Ye ek reusable component hai jo Navbar ke har single link (Home, About, etc)
// ke liye use hota hai. SOLID ke "Single Responsibility" principle follow karta hai:
// iska sirf ek hi kaam hai - ek nav link ko render karna with hover + active states.
// ====================================================================

// Ye Framer Motion variant hai stagger animation ke liye.
// Parent (Navbar) se "custom" prop me index aayega jisse delay calculate hoga.
const itemVariants = {
  hidden: { opacity: 0, y: -40 }, // Start: upar se invisible
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      // Spring animation premium aur natural feel deta hai (harsh nahi).
      type: "spring",
      stiffness: 120,
      damping: 14,
      delay: 0.15 + index * 0.08, // Stagger: har item thoda late aayega
    },
  }),
};

// React.memo isliye use kiya hai taki agar parent re-render ho
// (jaise mobile menu toggle hone par) to ye unnecessarily re-render na ho,
// jab tak iske apne props (isActive, item, onClick) change na ho.
const NavItem = memo(function NavItem({ item, index, isActive, onClick, isDropdownOpen }) {
  return (
    <motion.li
      // Ye list item hai, semantic HTML (ul > li) accessibility ke liye zaroori hai.
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="relative list-none"
    >
      <motion.div
        // whileHover/whileTap se Framer Motion ka smooth scale + cursor feedback milta hai.
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <NavLink
          to={item.route}
          // onClick prop se hum parent ko bata rahe hai ki kaunsa item click hua,
          // taki agar ye "Courses" hai to dropdown toggle ho sake.
          onClick={(e) => onClick(item, e)}
          // aria-current accessibility ke liye - screen reader ko batata hai
          // ki ye current/selected page hai.
          aria-current={isActive ? "page" : undefined}
          // aria-expanded sirf dropdown wale item (Courses) ke liye relevant hai.
          aria-haspopup={item.hasDropdown ? "true" : undefined}
          aria-expanded={item.hasDropdown ? isDropdownOpen : undefined}
          className={({ isActive: navIsActive }) =>
            [
              // px-5 py-2: professional padding, rounded-full: pill shape button look
              "relative px-5 py-2 rounded-full text-sm md:text-[15px] font-semibold",
              "transition-colors duration-300 outline-none",
              // focus-visible: keyboard users ke liye clear focus ring (accessibility)
              "focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1437]",
              "flex items-center gap-1 select-none",
              navIsActive || isActive
                ? "text-cyan-300" // Active state text color change
                : "text-slate-200 hover:text-cyan-300",
            ].join(" ")
          }
        >
          {item.label}
          {/* Courses ke saath ek chota arrow icon, dropdown khulne par rotate hota hai */}
          {item.hasDropdown && (
            <motion.svg
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          )}
        </NavLink>

        {/* Ye active background pill hai - jab item active/selected hota hai
            tab niche glowing rounded background animate ho ke aata hai. */}
        {isActive && (
          <motion.span
            layoutId="active-nav-pill" // layoutId se Framer Motion automatically smooth transition deta hai
            className="absolute inset-0 -z-10 rounded-full bg-cyan-400/15 shadow-[0_0_18px_2px_rgba(34,211,238,0.45)] ring-1 ring-cyan-300/40"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}
      </motion.div>
    </motion.li>
  );
});

export default NavItem;