import { memo } from "react";
import { motion } from "motion/react";
import { BUTTON_TEXT } from "../../../data/certificateData";
import { certButtonWidthVariants } from "../../../utils/certificateAnimationVariants";
import { LoadingSpinner } from "./LoadingSpinner";

/**
 * VerifyButton
 * Mount par width 0% -> 100% animate hota hai. Hover par idle text upar
 * slide karke exit hoti hai aur neeche se hover text enter karti hai —
 * dono spans ek hi overflow-hidden track ke andar stacked hain.
 */
function VerifyButtonBase({ isSubmitting, disabled }) {
  return (
    <motion.button
      type="submit"
      disabled={disabled || isSubmitting}
      variants={certButtonWidthVariants}
      initial="hidden"
      animate="visible"
      whileHover={
        disabled || isSubmitting
          ? undefined
          : {
              scale: 1.015,
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.5), 0 12px 40px rgba(255,255,255,0.35)",
            }
      }
      whileTap={disabled || isSubmitting ? undefined : { scale: 0.97 }}
      className="group relative mt-2 flex h-[52px] w-full items-center justify-center overflow-hidden rounded-full bg-white text-[15px] font-semibold text-[#0d1420] shadow-[0_4px_24px_rgba(255,255,255,0.25)] transition-shadow duration-300 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isSubmitting ? (
        <span className="flex items-center gap-2">
          <LoadingSpinner className="h-4 w-4" />
          {BUTTON_TEXT.loading}
        </span>
      ) : (
        <span className="relative block h-5 w-full overflow-hidden text-center">
          <span className="absolute inset-0 block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
            {BUTTON_TEXT.idle}
          </span>
          <span className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
            {BUTTON_TEXT.hover}
          </span>
        </span>
      )}
    </motion.button>
  );
}

export const VerifyButton = memo(VerifyButtonBase);
