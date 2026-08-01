import { memo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { heroBadge } from "../../../data/heroData";

/**
 * HeroBadge.jsx
 * -------------
 * "Admission Open 2026" — premium glassmorphism badge jiske around ek
 * animated glowing border infinite ghoomti rehti hai.
 *
 * TECHNIQUE — Rotating Border:
 * Outer wrapper mein ek conic-gradient background hai jo continuously
 * rotate hota hai (motion.div ke through, rotate: 360, repeat: Infinity,
 * linear easing — taaki rotation ki speed hamesha constant rahe, kahin
 * pe jerk na aaye). Uske andar ek chhota inner div hai jiska solid dark
 * background hai (padding sirf 1.5px ki hai) — isse sirf ek thin glowing
 * line ki tarah dikhta hai jo badge ke around travel karti hai, jaise
 * "border animate honi chahiye, kabhi rukni nahi chahiye" wala requirement
 * hai.
 *
 * PATCH: import "motion/react" se (framer-motion se nahi, stack
 * consistency ke liye), aur prefers-reduced-motion support add kiya —
 * reduced-motion users ke liye border rotation + ping ripple dono band
 * ho jaate hain, sirf static glowing dot reh jaata hai.
 */
function HeroBadge() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      whileHover={{ scale: 1.04 }}
      // mb yahan bhi fluid rakha hai (heading ke saath spacing consistent
      // rahe har screen size pe, bina kisi manual breakpoint override ke)
      className="mb-[clamp(1rem,3vw,1.5rem)] inline-block rounded-full"
    >
      {/* Rotating conic-gradient border layer — normally kabhi nahi rukti,
          reduced-motion mein static rehti hai */}
      <motion.div
        // animate={{ rotate: prefersReducedMotion ? 0 : 360 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { repeat: Infinity, ease: "linear", duration: 3 }
        }
        className="p-[1.5px] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, #38bdf8 15%, transparent 35%, transparent 65%, #22d3ee 80%, transparent 100%)",
        }}
      >
        {/* Inner glass content — ye static rehta hai, sirf outer border ghoomti hai */}
        <div
          role="status"
          aria-label={heroBadge.ariaLabel}
          tabIndex={0}
          // Padding fluid clamp() hai — mini phones (320px) pe badge itna
          // tight nahi hoga ki dot+text squeeze ho jaaye, aur 4K pe itna
          // bada nahi hoga ki bemaani lage
          className="flex items-center gap-2 rounded-full bg-slate-900/80 px-[clamp(1rem,3vw,1.25rem)] py-[clamp(0.375rem,1.2vw,0.5rem)] shadow-lg shadow-sky-500/10 backdrop-blur-md transition-shadow duration-300 hover:shadow-sky-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 sm:gap-2.5"
        >
          {/* Glowing pulsing dot — premium blue/cyan glow + pulse animation.
              Ripple (animate-ping) ko motion-reduce:hidden diya hai — Tailwind
              ka built-in prefers-reduced-motion media variant, koi extra JS
              logic ki zaroorat nahi. Solid dot + glow hamesha visible rehta hai. */}
          <span className="relative flex h-3 w-3" aria-hidden="true">
            <span className="motion-reduce:hidden animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span
              className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"
              style={{ boxShadow: "0 0 8px 2px rgba(56,189,248,0.7)" }}
            />
          </span>

          {/* whitespace-nowrap zaroori hai — badge ka poora point hi ek
              single-line pill hona hai, 320px pe bhi text clamp() se chhota
              ho jaayega lekin do lines mein nahi tootega */}
          <span className="whitespace-nowrap text-[clamp(0.625rem,2vw,0.8125rem)] font-semibold uppercase tracking-wide text-white">
            {heroBadge.text}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// memo() — badge ka content static hai (koi props change nahi hote),
// isliye parent (Hero.jsx) re-render hone pe ye khamakha re-render nahi hoga
export default memo(HeroBadge);