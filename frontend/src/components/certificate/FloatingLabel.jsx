import { memo } from "react";
import { motion } from "motion/react";
import { getLabelEntryVariants } from "../../utils/animationVariants";

/**
 * FloatingLabel
 * Do animation layers hain:
 *  1. Entry animation (ek baar, mount par) — direction ke hisaab se
 *     top/left/right/bottom/fade se andar aati hai (Motion variants).
 *  2. Float transition (baar-baar, focus/blur par) — CSS transition se
 *     handle hoti hai kyunki yeh high-frequency toggle hai aur JS-driven
 *     spring har baar chalane se zyada re-render/GC pressure padta hai.
 */
function FloatingLabelBase({ htmlFor, text, isFloating, direction = "fade" }) {
  const entryVariants = getLabelEntryVariants(direction);

  return (
    <motion.label
      htmlFor={htmlFor}
      variants={entryVariants}
      initial="hidden"
      animate="visible"
      className={`pointer-events-none absolute left-11 select-none whitespace-nowrap rounded-full px-1.5 text-white/70 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFloating
          ? "-top-2.5 left-8 scale-[0.78] bg-[#0d1420]/80 text-[#F4A261] backdrop-blur-sm"
          : "top-1/2 -translate-y-1/2 scale-100 bg-transparent"
      }`}
    >
      {text}
    </motion.label>
  );
}

export const FloatingLabel = memo(FloatingLabelBase);
