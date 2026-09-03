import React, { memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TransitionNavLink } from "../../../app/providers/page-transition";
import WhatsAppButton from "./WhatsAppButton";
import { navLinks } from "../../data/navigation.data";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const panelVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 280,
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

const itemVariants = {
  hidden: { opacity: 0, y: -14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
};

const whatsappVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
  },
};

const MobileMenu = memo(function MobileMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.aside
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="fixed right-0 top-0 z-50 flex h-full w-[78%] max-w-[320px] flex-col bg-[#0a0a0a] border-l border-white/10 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Menu
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="grid h-8 w-8 place-items-center rounded-full text-slate-400 outline-none transition-colors hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* ---- NAV LINKS ---- */}
            <nav className="flex flex-1 flex-col overflow-y-auto px-4 py-5" aria-label="Mobile navigation">
              <ul className="flex flex-col gap-1">
                {navLinks.map((item) => (
                  <motion.li key={item.id} variants={itemVariants} className="list-none">
                    <TransitionNavLink
                      to={item.route}
                      onClick={onClose}
                      className={({ isActive }) =>
                        [
                          "block rounded-xl px-4 py-3 text-[15px] font-semibold",
                          "outline-none transition-colors duration-200",
                          isActive
                            ? "bg-white/10 text-cyan-300"
                            : "text-slate-300 hover:bg-white/8 hover:text-white",
                        ].join(" ")
                      }
                    >
                      {item.label}
                    </TransitionNavLink>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                variants={whatsappVariants}

                className="mt-auto border-t border-white/8 px-4 pb-4 pt-6"
              >
                <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-widest text-white/30">
                  Connect with us
                </p>

                <div className="flex w-full justify-center">
                  <WhatsAppButton />
                </div>
              </motion.div>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
});

export default MobileMenu;