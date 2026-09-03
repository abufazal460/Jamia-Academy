import { memo } from "react";
import { motion } from "motion/react";
import { getCertLabelEntryVariants } from "../motion/certificate.motion";

function FloatingLabelBase({ htmlFor, text, isFloating, direction = "fade" }) {
  const entryVariants = getCertLabelEntryVariants(direction);

  return (
    <motion.label
      htmlFor={htmlFor}
      variants={entryVariants}
      initial="hidden"
      animate="visible"
      className={`pointer-events-none absolute left-10 select-none whitespace-nowrap rounded-full px-1.5 text-white/70 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isFloating
          ? "-top-2.5 scale-[0.65] bg-[#0d1420]/80 text-[#F4A261] backdrop-blur-sm"
          : "top-1/2 -translate-y-1/2 scale-100 bg-transparent"
        }`}
    >
      {text}
    </motion.label>
  );
}

export const FloatingLabel = memo(FloatingLabelBase);
