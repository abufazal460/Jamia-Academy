import { memo } from "react";
import { motion } from "motion/react";
import { spinnerTransition } from "../../utils/animationVariants";
import { useReducedMotion } from "../../hooks/useReducedMotion";

function LoadingSpinnerBase({ className = "h-5 w-5" }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={`inline-block rounded-full border-2 border-current border-t-transparent ${className}`}
      animate={prefersReducedMotion ? {} : { rotate: 360 }}
      transition={prefersReducedMotion ? {} : spinnerTransition}
    />
  );
}

export const LoadingSpinner = memo(LoadingSpinnerBase);
