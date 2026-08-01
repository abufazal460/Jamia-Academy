// src/components/home/Hero/HeroTypewriterSubtitle.jsx
import { memo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTypewriter } from "../../../hooks/useTypewriter";
import { heroTypewriter } from "../../../data/heroData";
import { fadeInUp } from "../../../utils/motionVariants";

/**
 * HeroTypewriterSubtitle.jsx
 * ---------------------------
 * PERFORMANCE ISOLATION COMPONENT.
 *
 * WHY YE FILE EXIST KARTI HAI:
 * `useTypewriter` hook har 25-45ms mein ek naya letter type/delete karke
 * apna internal state update karta hai. Pehle ye hook Hero.jsx ke andar
 * directly call ho raha tha — iska matlab Hero.jsx (poora top-level
 * component, jisme background, badge, heading, buttons, stats, pillars
 * sab kuch ek saath hai) HAR 25-45ms MEIN RE-RENDER ho raha tha, forever,
 * jab tak page khuli rahe. Isse do real problems hote the:
 *   1. `orphanLineVariant` jaisa object (jiske andar `repeat: Infinity`
 *      transition hai) har render pe naya reference ban raha tha — Motion
 *      isko "naya target" samajh ke infinite glow animation ko baar baar
 *      restart/glitch karta tha, bajaye smoothly loop karne ke.
 *   2. React ko Hero ke poore returned tree ka reconciliation pass baar
 *      baar chalana padta tha (~30 baar/second) — chahe memo() bache huye
 *      child components ko actual re-render se bacha leta, diffing ka
 *      overhead phir bhi accumulate hota tha.
 *
 * FIX: Typing state ab is chhote, isolated, leaf-level component mein
 * hai. Jab typewriter tick hota hai, SIRF ye component re-render hota
 * hai — Hero, background, badge, heading, buttons, stats, pillars sab
 * bilkul untouched rehte hain, render hi nahi hote.
 *
 * ACCESSIBILITY (bilkul same behavior jo pehle tha): sr-only span mein
 * poora static text hai (screen readers/SEO ke liye complete sentence),
 * visible animated span aria-hidden hai. prefers-reduced-motion mein
 * poora text turant static dikha diya jaata hai, koi loop nahi chalta.
 *
 * VARIANT PROPAGATION NOTE: Motion ka variants context React Context ke
 * through propagate hota hai, component-tree boundaries cross karke —
 * isliye ye component Hero ke staggerContainer se alag file mein hone ke
 * baad bhi stagger sequence mein sahi jagah pe fade-in karega, bilkul
 * pehle jaisa hi (koi visual/timing change nahi).
 */
function HeroTypewriterSubtitle() {
  const prefersReducedMotion = useReducedMotion();

  const typedSubtitle = useTypewriter(heroTypewriter.text, {
    typingSpeed: heroTypewriter.typingSpeed,
    deletingSpeed: heroTypewriter.deletingSpeed,
    pauseAfterTyping: heroTypewriter.pauseAfterTyping,
    pauseAfterDeleting: heroTypewriter.pauseAfterDeleting,
    disabled: prefersReducedMotion,
  });

  return (
    <motion.h2
      variants={fadeInUp}
      // Exact same classes as before — no layout/typography/spacing change.
      className="mx-auto mb-3 max-w-[90%] px-2 text-[clamp(1rem,3.2vw,1.5rem)] font-semibold leading-relaxed text-white sm:max-w-2xl sm:px-0 md:mb-4 md:max-w-4xl min-h-[clamp(3rem,9vw,4.5rem)]"
    >
      <span className="sr-only">{heroTypewriter.text}</span>
      <span aria-hidden="true">
        {typedSubtitle}
        {!prefersReducedMotion && (
          <span className="ml-1 inline-block h-[1.1em] w-[2px] animate-pulse align-middle bg-sky-300" />
        )}
      </span>
    </motion.h2>
  );
}

// memo() — is component ke bhi zero props hain, isliye agar kabhi parent
// (Hero) re-render ho (ab bohot rare hoga), ye khud bail-out kar lega aur
// sirf apne internal typewriter state se hi re-render karega.
export default memo(HeroTypewriterSubtitle);