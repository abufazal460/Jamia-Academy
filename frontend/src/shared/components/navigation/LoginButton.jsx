import React, { memo } from "react";
import { motion } from "motion/react";
import { usePageTransition } from "../../../app/providers/page-transition";

const LoginButton = memo(function LoginButton() {

  const { navigateWithTransition } = usePageTransition();

  return (

    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 110, damping: 16, delay: 0.42 }}
    >
      <motion.button
        type="button"
        onClick={() => navigateWithTransition("/login")}
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.95 }}
        variants={{
          rest: {
            scale: 1,
            boxShadow: "0 4px 18px rgba(99,102,241,0.28)",
          },
          hover: {
            scale: 1.05,
            boxShadow: "0 0 28px rgba(99,102,241,0.65), 0 0 55px rgba(139,92,246,0.25)",
          },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        aria-label="Login to your account"
        className="relative overflow-hidden cursor-pointer rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2 text-sm font-bold text-white outline-none"
      >
        <span className="relative flex h-[1.8em] min-w-[64px]  items-center justify-center overflow-hidden">
          <motion.span
            variants={{
              rest: { y: 0, opacity: 1 },
              hover: { y: "-100%", opacity: 0 },
            }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute select-none whitespace-nowrap"
          >
            Login
          </motion.span>
          <motion.span
            variants={{
              rest: { y: "100%", opacity: 0 },
              hover: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
            className="absolute select-none whitespace-nowrap"
          >
            Login
          </motion.span>
        </span>
      </motion.button>
    </motion.div>
  );
});

export default LoginButton;
