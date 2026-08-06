import { memo } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { reducedMotionVariants } from "../../utils/animationVariants";

/**
 * MotionWrapper
 * Generic entrance-animation wrapper jo prefers-reduced-motion respect
 * karta hai. Agar user ne reduced motion on kiya hai, to sirf opacity
 * fade hota hai — koi transform/spring nahi (Jamia Academy ka existing
 * pattern, Hero section me bhi yehi guard use hota hai).
 *
 * Props:
 * - as: motion element tag (default "div")
 * - variants: normal-motion variants object (hidden/visible keys)
 * - children, className, aur baaki motion props pass-through
 */
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
