import { memo } from "react";
import { motion } from "motion/react";
import { certSpinnerTransition } from "../../../../utils/certificateAnimationVariants";
import { useCertificateReducedMotion } from "../../hooks/useCertificateReducedMotion";

function LoadingSpinnerBase({ className = "h-5 w-5" }) {
  const prefersReducedMotion = useCertificateReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={`inline-block rounded-full border-2 border-current border-t-transparent ${className}`}
      animate={prefersReducedMotion ? {} : { rotate: 360 }}
      transition={prefersReducedMotion ? {} : certSpinnerTransition}
    />
  );
}

export const LoadingSpinner = memo(LoadingSpinnerBase);
