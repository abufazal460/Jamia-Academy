import { useEffect, useRef } from "react";
import { motion, useMotionValue, animate, useInView } from "motion/react";
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
  duration = 10,
  colors = DEFAULT_COLORS,
  glowIntensity = 0.5,
  borderRadius = "1.5rem",
}) {
  const wrapperRef = useRef(null);

  const rotate = useMotionValue(0);

  const isInView = useInView(wrapperRef, { amount: 0.1 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !isInView) {
      return;
    }

    const controls = animate(rotate, rotate.get() + 360, {
      duration,
      repeat: Infinity,
      ease: "linear",
    });

    return () => controls.stop();
  }, [duration, isInView, rotate]);

  const gradient = `conic-gradient(from 0deg, ${colors.join(", ")})`;

  return (
    <div
      ref={wrapperRef}
      className={twMerge("relative", className)}
      style={{ borderRadius }}
    >
    
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[35%] -z-10 blur-2xl hidden sm:block"
        style={{
          background: gradient,
          borderRadius,
          rotate,
          opacity: glowIntensity,
          willChange: "transform",
        }}
      />

      <div
        className="relative overflow-hidden p-[1.5px]"
        style={{ borderRadius }}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[40%]"
          style={{
            background: gradient,
            rotate,
            willChange: "transform",
          }}
        />
        
        <div
          className="relative h-full w-full bg-neutral-950"
          style={{ borderRadius: `calc(${borderRadius} - 1.5px)` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
