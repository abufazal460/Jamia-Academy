import { memo } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "../../../../shared/hooks/usePrefersReducedMotion";
import { reducedMotionVariants } from "../../../../shared/utils/animationVariants";

function MotionWrapper({
  as = "div",
  variants,
  children,
  className = "",
  initial = "hidden",
  animate = "visible",
  ...rest
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  const appliedVariants = prefersReducedMotion ? reducedMotionVariants : variants;

  return (
    <MotionTag
      variants={appliedVariants}
      initial={initial}
      animate={animate}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export default memo(MotionWrapper);
