import { memo } from "react";
import { motion } from "motion/react";
import GlassPanel from "./GlassPanel";
import LoginForm from "./LoginForm";
import { usePrefersReducedMotion } from "../../../../shared/hooks/usePrefersReducedMotion";
import { loginData } from "../data/login.data";
import {
  cardVariants,
  headingVariants,
  reducedMotionVariants,
} from "../../../../shared/motion/config";


function LoginCard({ onSubmit }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const rootVariants = prefersReducedMotion ? reducedMotionVariants : cardVariants;
  const headingMotionVariants = prefersReducedMotion ? reducedMotionVariants : headingVariants;

  return (
    <GlassPanel
      variants={rootVariants}
      initial="hidden"
      animate="visible"
      enableFloat={!prefersReducedMotion}
      className="w-full max-w-md px-7 py-9 sm:px-9 sm:py-10"
    >
      <motion.h1
        variants={headingMotionVariants}
        className="mb-1 text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl"
      >
        {loginData.heading.title}
      </motion.h1>

      <motion.p
        variants={headingMotionVariants}
        className="mb-8 text-center text-sm text-white/50"
      >
        {loginData.heading.subtitle}
      </motion.p>

      <LoginForm onSubmit={onSubmit} />
    </GlassPanel>
  );
}

export default memo(LoginCard);
