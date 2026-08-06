import { forwardRef, memo } from "react";
import { motion } from "motion/react";
import { cardFloatVariants } from "../../utils/animationVariants";

/**
 * GlassPanel
 * Reusable liquid-glass container — frosted blur, thin white border,
 * soft glow, aur hover pe blur/glow thoda badh jaata hai.
 * GPU-accelerated transforms only (transform + opacity), koi layout
 * thrashing property animate nahi hoti.
 *
 * Props:
 * - children: node
 * - className: extra classes (merge hote hain, override nahi)
 * - enableFloat: boolean — idle floating motion on/off
 * - variants / initial / animate: parent se motion sequence control ke liye
 */
const GlassPanel = forwardRef(function GlassPanel(
  { children, className = "", enableFloat = true, variants, initial, animate, ...rest },
  ref
) {
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial={initial}
      animate={animate}
      className={[
        "relative isolate overflow-hidden rounded-[1.75rem]",
        "border border-white/15",
        "bg-white/[0.01] backdrop-blur-xl",
        "shadow-[0_8px_40px_-8px_rgba(0,0,0,0.6)]",
        "transition-[backdrop-filter,border-color,box-shadow] duration-500 ease-out",
        "hover:backdrop-blur-2xl hover:border-white/25",
        "hover:shadow-[0_0_60px_-10px_rgba(56,189,248,0.35),0_8px_50px_-8px_rgba(0,0,0,0.7)]",
        "will-change-transform",
        className,
      ].join(" ")}
      {...rest}
    >
      {/* Floating top-light reflection */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[140%] -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
      />
      {/* Bottom ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 left-1/2 h-40 w-3/4 -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl"
      />

      {enableFloat ? (
        <motion.div
          variants={cardFloatVariants}
          animate="float"
          className="relative z-10 will-change-transform"
        >
          {children}
        </motion.div>
      ) : (
        <div className="relative z-10">{children}</div>
      )}
    </motion.div>
  );
});

export default memo(GlassPanel);
