import React, { memo } from "react";
import { motion } from "motion/react";
import { TransitionNavLink } from "../../../app/providers/page-transition";

const itemVariants = {
  hidden: { opacity: 0, y: -40 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
      delay: 0.1 + index * 0.07,
    },
  }),
};

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
      {isActive && (
        <motion.span
          layoutId="active-nav-pill"
          className="absolute inset-0 -z-10 rounded-full bg-white/15"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </motion.li>
  );
});

export default NavItem;