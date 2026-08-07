import { memo } from "react";
import { motion } from "motion/react";
import { useCertificateReducedMotion } from "../../../hooks/useCertificateReducedMotion";

/**
 * GlassContainer
 * Liquid-glass shell: backdrop blur, thin border, inner highlight, outer
 * glow aur ek slow animated shine sweep. Reduced-motion me shine off ho
 * jaata hai, baaki sab static rehta hai.
 */
function GlassContainerBase({ children, className = "" }) {
  const prefersReducedMotion = useCertificateReducedMotion();

  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-white/15 bg-white/[0.06] backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(0,0,0,0.2)] ${className}`}
    >
      {/* outer ambient glow — teal/orange dono brand accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 -z-10 rounded-[30px] bg-[radial-gradient(120%_120%_at_20%_0%,rgba(42,157,143,0.35)_0%,rgba(244,162,97,0.12)_45%,transparent_75%)] blur-2xl"
      />

      {/* inner top highlight — glass reflection */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[28px] bg-gradient-to-b from-white/15 to-transparent"
      />

      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: "-120%" }}
          animate={{ x: "220%" }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}

export const GlassContainer = memo(GlassContainerBase);
