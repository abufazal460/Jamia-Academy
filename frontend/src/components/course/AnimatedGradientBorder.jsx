import { useEffect, useRef } from "react";
import { motion, useMotionValue, animate, useInView } from "framer-motion";
import { twMerge } from "tailwind-merge";

// Default neon palette — pink se shuru hoke purple, indigo, cyan, teal, yellow, orange
// se hote hue wapas pink pe close hota hai, taaki gradient loop seamless dikhe.
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

/**
 * AnimatedGradientBorder
 *
 * Reusable premium gradient-border wrapper — CourseCard, modal, ya kisi bhi
 * premium button ke around laga sakte ho. Border khud continuously rotate
 * karta hai, hover pe depend nahi karta.
 *
 * Props:
 * - children:       wrapped content
 * - className:      extra classes for the outer wrapper
 * - duration:       ek full rotation kitne seconds me complete ho (default 10s)
 * - colors:         gradient colors array (conic-gradient stops)
 * - glowIntensity:  0 to 1, external glow ki opacity
 * - borderRadius:   corner radius (any valid CSS radius value, e.g. "1.5rem")
 */
export default function AnimatedGradientBorder({
  children,
  className = "",
  duration = 10,
  colors = DEFAULT_COLORS,
  glowIntensity = 0.5,
  borderRadius = "1.5rem",
}) {
  const wrapperRef = useRef(null);

  // Single rotation ko motion value se drive kar rahe hain, CSS @keyframes se nahi —
  // isse Motion directly transform property update karta hai (React re-render ke bina),
  // jo continuous infinite loop ke liye sabse smooth aur GPU-friendly tarika hai.
  const rotate = useMotionValue(0);

  // Sirf tab animate karo jab component viewport me visible ho — off-screen cards
  // ke liye rotation loop chalate rehna sirf GPU/battery waste hai.
  const isInView = useInView(wrapperRef, { amount: 0.1 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Accessibility: reduced-motion users ke liye continuous spin band kar do,
    // gradient border static hi dikhega (still premium, bas non-animated).
    if (prefersReducedMotion || !isInView) {
      return;
    }

    const controls = animate(rotate, rotate.get() + 360, {
      duration,
      repeat: Infinity,
      ease: "linear",
    });

    // Cleanup: view se bahar jaate hi ya unmount pe animation turant stop,
    // taaki background me koi orphaned animation loop na chalta rahe.
    return () => controls.stop();
  }, [duration, isInView, rotate]);

  const gradient = `conic-gradient(from 0deg, ${colors.join(", ")})`;

  return (
    <div
      ref={wrapperRef}
      className={twMerge("relative", className)}
      style={{ borderRadius }}
    >
      {/* Glow layer — border ke peeche soft neon spill, blurred aur low-opacity,
          taaki content ki readability kabhi affect na ho. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[35%] -z-10 blur-2xl"
        style={{
          background: gradient,
          borderRadius,
          rotate,
          opacity: glowIntensity,
          willChange: "transform",
        }}
      />

      {/* Border layer — oversized rotating conic-gradient, jiske upar ek
          solid-background content panel baithta hai. Sirf padding ka ring
          gradient se visible rehta hai — ye hi "border" ka illusion banata hai,
          bina kisi mask-composite hack ke. */}
      <div
        className="relative overflow-hidden p-[1.5px]"
        style={{ borderRadius }}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[60%]"
          style={{
            background: gradient,
            rotate,
            willChange: "transform",
          }}
        />

        {/* Actual content — background yahan solid/glass hoga taaki gradient
            sirf ring ke roop me peek kare, content ke peeche na dikhe. */}
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
