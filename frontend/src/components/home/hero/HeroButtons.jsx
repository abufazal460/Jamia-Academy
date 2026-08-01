import { memo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { heroButtons } from "./data/heroData";
import { buttonTap } from "./utils/motionVariants";

/**
 * HeroButtons.jsx
 * ---------------
 * Dono CTA buttons:
 *
 * 1. "Explore Courses" — solid premium button. Hover pe current text upar
 *    slide karke fade out hota hai, aur ussi jagah neeche se naya text
 *    (same label) slide-in hota hai — classic "premium reveal" button
 *    effect. Arrow icon hata diya hai jaisa brief mein kaha gaya tha.
 *
 * 2. "Contact Us" — liquid glass button. Hover pe glass ki intensity aur
 *    border-glow dono badh jaate hain, plus ek floating reflection
 *    highlight continuously guzarti rehti hai (liquid-glass ka premium feel).
 *
 * VARIANT PROPAGATION:
 * Parent <motion.a> pe `whileHover="hover"` set kiya hai, aur children
 * spans mein same variant names ("rest"/"hover") use kiye hain. Motion
 * automatically parent ka hover state children tak propagate kar deta
 * hai — isliye har child pe alag se whileHover likhne ki zaroorat nahi
 * (no duplicate animation code).
 *
 * PATCH: import "motion/react" se, aur floating reflection ab
 * prefers-reduced-motion mein render hi nahi hoti (auto-playing infinite
 * loop hai, hover-triggered text-swap ko touch nahi kiya — wo user
 * initiated hai).
 */

// Text reveal variants — dono text layers isi se control hoti hain
const textUpVariant = {
  rest: { y: 0, opacity: 1 },
  hover: { y: "-120%", opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
};
const textInVariant = {
  rest: { y: "120%", opacity: 0 },
  hover: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
};

// Glass intensity variants — Contact button ke hover state ke liye
const glassVariant = {
  rest: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderColor: "rgba(100,116,139,0.6)",
  },
  hover: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(148,163,184,0.9)",
  },
};

function HeroButtons() {
  const { primary, secondary } = heroButtons;
  const prefersReducedMotion = useReducedMotion();

  return (
    // MOBILE STACKING: flex-col se mobile pe dono buttons upar-neeche stack
    // hote hain (jaisa brief mein maanga tha), sm: breakpoint (640px) se
    // row mein aa jaate hain kyunki us width pe dono buttons side-by-side
    // aaram se fit ho jaate hain. w-full sm:w-auto dono ko mobile pe equal
    // full-width deta hai (touch-friendly, balanced look), aur desktop pe
    // unki natural content-width le leta hai.
    <div className="mx-auto mb-12 flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:mb-16 sm:max-w-none sm:flex-row sm:items-center sm:gap-5">
      {/* ============ PRIMARY BUTTON — Explore Courses ============ */}
      <motion.a
        href={primary.href}
        aria-label={primary.ariaLabel}
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileTap={buttonTap}
        // w-full sm:w-auto — mobile pe dono buttons equal full-width stack
        // hote hain, sm+ pe apni content-width le lete hain.
        // min-h-[44px] — Apple/WCAG ka minimum touch target size, taaki
        // chhoti screens pe bhi button aasani se tap ho sake.
        // px/py clamp() se fluid hai taaki 320px pe button cramped na lage.
        className="relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-sky-500 px-[clamp(1.5rem,5vw,2rem)] py-[clamp(0.75rem,2.5vw,0.875rem)] font-bold text-white shadow-lg shadow-sky-500/25 transition-colors duration-200 hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:w-auto min-h-[44px]"
      >
        {/* Fixed height wrapper — overflow-hidden isi ke through hai,
            taaki dono text layers overlap ho sakein bina button ki
            height badhaye (no layout shift) */}
        {/* whitespace-nowrap — "Explore Courses" jaisa 2-word label kabhi
            beech mein wrap na ho, button hamesha compact single-line rahe */}
        <span className="relative block h-[1.4em] w-max whitespace-nowrap text-[clamp(0.875rem,2.6vw,1rem)] leading-[1.4em] overflow-hidden">
          <motion.span variants={textUpVariant} className="absolute inset-0">
            {primary.label}
          </motion.span>
          <motion.span
            variants={textInVariant}
            className="absolute inset-0"
            aria-hidden="true"
          >
            {primary.label}
          </motion.span>
        </span>
      </motion.a>

      {/* ============ SECONDARY BUTTON — Contact Us (Liquid Glass) ============ */}
      <motion.a
        href={secondary.href}
        aria-label={secondary.ariaLabel}
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileTap={buttonTap}
        variants={glassVariant}
        className="relative flex w-full items-center justify-center overflow-hidden rounded-xl border px-[clamp(1.5rem,5vw,2rem)] py-[clamp(0.75rem,2.5vw,0.875rem)] text-[clamp(0.875rem,2.6vw,1rem)] font-semibold text-white backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 sm:w-auto min-h-[44px] whitespace-nowrap"
      >
        {secondary.label}

        {/* Floating reflection — glass ke upar ek halki chalti hui streak,
            liquid-glass ka premium feel dene ke liye. Ye ek auto-playing,
            continuous infinite loop hai (koi hover trigger nahi), isliye
            reduced-motion mein skip karte hain. */}
        {!prefersReducedMotion && (
          <motion.span
            aria-hidden="true"
            initial={{ x: "-150%" }}
            animate={{ x: "250%" }}
            transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-y-0 w-1/3"
            style={{
              background:
                "linear-gradient(75deg, transparent, rgba(255,255,255,0.25), transparent)",
            }}
          />
        )}
      </motion.a>
    </div>
  );
}

export default memo(HeroButtons);