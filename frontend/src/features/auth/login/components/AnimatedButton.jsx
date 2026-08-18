import { memo, useState } from "react";
import { motion } from "motion/react";
import { buttonExpandVariants } from "../../../../utils/animationVariants";

function AnimatedButton({
  idleText,
  hoverText,
  loadingText,
  isSubmitting = false,
  disabled = false,
  type = "submit",
  ...rest
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isDisabled = disabled || isSubmitting;

  return (
    <motion.button
      type={type}
      variants={buttonExpandVariants}
      disabled={isDisabled}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={!isDisabled ? { scale: 0.97 } : undefined}
      className={[
        "group relative isolate w-full overflow-hidden rounded-2xl",
        "border border-sky-300/30 bg-gradient-to-r from-sky-500/90 to-cyan-400/90",
        "px-6 py-3.5 text-sm font-semibold tracking-wide text-slate-950",
        "shadow-[0_8px_30px_-6px_rgba(56,189,248,0.55)]",
        "transition-[box-shadow,border-color] duration-300",
        "hover:shadow-[0_10px_40px_-4px_rgba(56,189,248,0.75)] hover:border-sky-200/60",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300",
        "disabled:cursor-not-allowed disabled:opacity-60",
      ].join(" ")}
      {...rest}
    >
      {/* Glass shine sweep on hover */}
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg]",
          "bg-white/40 blur-sm transition-transform duration-700 ease-out",
          isHovered ? "translate-x-[420%]" : "translate-x-0",
        ].join(" ")}
      />

      {/* Text-slide container */}
      <span className="relative block h-5 overflow-hidden">
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          animate={{ y: isHovered ? "-100%" : "0%" }}
          transition={{ duration: 0.32, ease: "easeInOut" }}
        >
          {isSubmitting ? loadingText : idleText}
        </motion.span>
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          animate={{ y: isHovered ? "0%" : "100%" }}
          transition={{ duration: 0.32, ease: "easeInOut" }}
        >
          {hoverText}
        </motion.span>
      </span>
    </motion.button>
  );
}

export default memo(AnimatedButton);
