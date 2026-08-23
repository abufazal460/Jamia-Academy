import { useState } from "react";
import { motion, useMotionValue, animate } from "motion/react";
import { twMerge } from "tailwind-merge";

const DEFAULT_COLORS = [
  "#ec4899", // pink
  "#a855f7", // purple
  "#6366f1", // indigo
  "#22d3ee", // cyan
  "#2dd4bf", // teal
  "#eab308", // yellow
  "#f97316", // orange
  "#ec4899", // pink again — smooth loop ke liye
];

export default function AnimatedGradientBorder({
  children,
  className = "",
  duration = 3,
  colors = DEFAULT_COLORS,
  borderRadius = "1.5rem",
  borderWidth = "2px",
}) {
  const rotate = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const gradient = `conic-gradient(from 0deg, ${colors.join(", ")})`;

  const handleHoverStart = () => {
    setIsHovered(true);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    animate(rotate, rotate.get() + 360, {
      duration,
      repeat: Infinity,
      ease: "linear",
    });
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    // rotation ko current position par hi rok do — jump nahi hoga
    animate(rotate, rotate.get(), { duration: 0 });
  };

  return (
    <div
      className={twMerge("relative", className)}
      style={{ borderRadius }}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {/* Border layer — sirf edge par, koi blur/glow nahi */}
      <div
        className="relative overflow-hidden"
        style={{ borderRadius, padding: borderWidth }}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[50%]"
          style={{
            background: gradient,
            rotate,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.25s ease-out",
            willChange: "transform",
          }}
        />

        {/* Content layer — image hamesha yahi rahegi, kabhi hide nahi hogi */}
        <div
          className="relative h-full w-full overflow-hidden bg-neutral-950"
          style={{ borderRadius: `calc(${borderRadius} - ${borderWidth})` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}