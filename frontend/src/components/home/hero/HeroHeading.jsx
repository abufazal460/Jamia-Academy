import { memo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { heroHeading } from "./data/heroData";

/**
 * HeroHeading.jsx
 * ---------------
 * "JAMIA ACADEMY" — same placement jo original website mein hai, bas ab
 * premium animated gradient text hai jisme:
 *  1. Multi-color gradient slowly slide hota hai (background-position animate)
 *  2. Ek diagonal "shine" streak periodically text ke upar se guzarti hai
 *
 * IMPLEMENTATION NOTE:
 * `bg-clip-text` + `text-transparent` se text ke andar gradient dikhta
 * hai. `background-size: 200%` rakha hai taaki jab hum backgroundPosition
 * animate karein (0% -> 100% -> 0%) to gradient smoothly left-right slide
 * kare — yahi "moving gradient" effect hai.
 *
 * Shine ke liye ek alag absolute positioned layer use kiya hai jo text ke
 * bilkul upar `mix-blend-mode: overlay` ke saath left se right guzarta
 * hai — isse ek real "gloss pass" jaisa lagta hai, bina heavy GSAP
 * timeline banaye (Framer Motion se hi ho gaya, jaisa brief mein kaha
 * gaya tha ki GSAP sirf zaroorat pe hi use karo).
 *
 * PATCH: import "motion/react" se, aur prefers-reduced-motion support —
 * reduced-motion mein gradient position static rehti hai aur shine sweep
 * render hi nahi hota (ye dono purely decorative, auto-playing, infinite
 * loops hain — exactly wo cheez jo reduced-motion disable karna chahta hai).
 */
function HeroHeading() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative inline-block mb-4">
      <motion.h1
        id="hero-heading"
        initial={{ opacity: 0, y: 16 }}
        animate={{
          opacity: 1,
          y: 0,
          backgroundPosition: prefersReducedMotion
            ? "0% 50%"
            : ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          opacity: { duration: 0.6 },
          y: { duration: 0.6 },
          backgroundPosition: prefersReducedMotion
            ? { duration: 0 }
            : { duration: 8, repeat: Infinity, ease: "linear" },
        }}
        whileHover={{ scale: 1.02, filter: "brightness(1.15)" }}
        // FONT-SIZE FLUID SCALING:
        // clamp(min, preferred-vw, max) use kiya hai instead of fixed
        // text-5xl/text-7xl breakpoint jumps. Isse heading 320px se lekar
        // 3840px (4K) tak ek continuous smooth curve pe scale hoti hai —
        // koi bhi screen-width pe achanak size "jump" nahi karta, aur
        // heading hamesha visually dominant (poore Hero mein sabse bada
        // text) bani rehti hai.
        className="relative select-none bg-clip-text text-[clamp(2.25rem,9vw,6rem)] font-extrabold tracking-tight text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #38bdf8 0%, #ffffff 35%, #22d3ee 60%, #38bdf8 100%)",
          backgroundSize: "200% 100%",
          transition: "filter 0.3s ease",
        }}
      >
        {heroHeading.title}
      </motion.h1>

      {/* Shine sweep overlay — diagonal light streak, infinite loop,
          pointer-events-none taaki ye kabhi bhi heading ke clicks/hover ko
          block na kare. Reduced-motion mein pura skip hota hai. */}
      {!prefersReducedMotion && (
        <motion.span
          aria-hidden="true"
          initial={{ x: "-120%" }}
          animate={{ x: "220%" }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            repeatDelay: 1.8,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(75deg, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%)",
            mixBlendMode: "overlay",
            width: "50%",
          }}
        />
      )}
    </div>
  );
}

export default memo(HeroHeading);