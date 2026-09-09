import { motion } from "motion/react";
import { Link } from "react-router-dom";

import {
  heroContainerVariants,
  heroItemVariants,
  heroReducedContainerVariants,
  heroReducedItemVariants,
} from "../../motion/hero.motion";

// layoutClasses aur widthClasses — dono hero.data.js ke "layout" aur
// "contentWidth" fields se match hone chahiye.
//
// BUG FIX: pehle widthClasses mein sirf "medium"/"large" the, jabki
// hero.data.js "compact" aur "orphan" values bhej raha tha — is wajah se
// wo hamesha `|| widthClasses.large` fallback pe chale jaate the (compact
// slides kabhi actually compact nahi dikhti thi). Ab dono real values map
// ki hain — koi naya data-field invent nahi kiya, sirf missing mapping
// poori ki hai.
const layoutClasses = {
  left: "justify-center items-start text-left",
  center: "justify-center items-center text-center mx-auto",
  right: "justify-center items-end text-right ml-auto",
  bottom: "justify-end items-start text-left",
};

const widthClasses = {
  medium: "max-w-xl",
  large: "max-w-3xl",
  compact: "max-w-lg",
  orphan: "max-w-2xl",
};

const HeroContent = ({ slide, prefersReducedMotion }) => {
  const containerVariants = prefersReducedMotion
    ? heroReducedContainerVariants
    : heroContainerVariants;

  const itemVariants = prefersReducedMotion
    ? heroReducedItemVariants
    : heroItemVariants;

  const layout = layoutClasses[slide.layout] || layoutClasses.left;
  const width = widthClasses[slide.contentWidth] || widthClasses.large;

  const isLight = slide.theme === "light";
  const isOrphan = slide.theme === "orphan";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={`relative flex min-h-full w-full flex-col ${layout} ${width}`}
    >
      {/* ORPHAN SPECIAL BORDER — scale animation hata di gayi hai (pehle
          `scale: [0.98, 1.015, 0.98]` tha, "no scale" rule todta tha).
          Ab sirf opacity pulse hai — same premium glow feel, halka aur
          GPU-cheap (sirf opacity, koi reflow/repaint heavy cheez nahi). */}
      {isOrphan && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-6 rounded-[2rem] border border-[#FFD166]"
          animate={{ opacity: [0.25, 0.8, 0.25] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* EYEBROW */}
      {slide.eyebrow && (
        <motion.div
          variants={itemVariants}
          className={`relative mb-5 inline-flex items-center rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] sm:text-sm ${
            isOrphan
              ? "border-[#FFD166] bg-[#FFD166]/10 text-[#FFD166]"
              : isLight
                ? "border-[#C45A3C]/40 text-[#C45A3C]"
                : "border-[#F4A261]/50 text-[#F4A261]"
          }`}
        >
          {isOrphan && (
            // Dot pulse — scale hata diya, sirf opacity animate hoti hai
            <motion.span
              aria-hidden="true"
              className="mr-2 h-2 w-2 rounded-full bg-[#FFD166]"
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          {slide.eyebrow}
        </motion.div>
      )}

      {/* HEADING */}
      <motion.h1
        variants={itemVariants}
        className={`relative max-w-4xl text-[clamp(2.2rem,5.5vw,5.5rem)] font-bold leading-[0.94] tracking-[-0.045em] ${
          isLight ? "text-[#292A27]" : "text-[#F7F3E9]"
        } ${isOrphan ? "drop-shadow-[0_0_25px_rgba(255,209,102,0.18)]" : ""}`}
      >
        {slide.title}
      </motion.h1>

      {/* DESCRIPTION */}
      {slide.description && (
        <motion.p
          variants={itemVariants}
          className={`relative mt-6 max-w-xl text-[clamp(0.95rem,1.4vw,1.15rem)] leading-relaxed ${
            isLight ? "text-[#292A27]/75" : "text-[#F7F3E9]/80"
          }`}
        >
          {slide.description}
        </motion.p>
      )}

      {/* CTA */}
      {(slide.primaryAction || slide.secondaryAction) && (
        <motion.div
          variants={itemVariants}
          className="relative mt-8 flex flex-wrap items-center gap-3"
        >
          {/* PRIMARY CTA — hover ab sirf ek lightweight shadow-transition
              hai. Pehle hover:-translate-y-1 + hover:scale-[1.02] +
              shadow ek saath the ("excessive/combined transforms" — brief
              explicitly mana karta hai). Arrow ka group-hover:translate-x-1
              bhi hata diya — button ab clean, lightweight aur GPU-cheap hai. */}
          {slide.primaryAction && (
            <Link
              to={slide.primaryAction.href}
              style={{ backgroundColor: slide.colors.button, color: slide.colors.buttonText }}
              className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-shadow duration-300 hover:shadow-[0_10px_28px_rgba(0,0,0,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 sm:px-7 sm:text-base ${
                isOrphan ? "shadow-[0_0_25px_rgba(255,209,102,0.25)]" : ""
              }`}
            >
              {slide.primaryAction.label}
              <span aria-hidden="true" className="text-lg">
                →
              </span>
            </Link>
          )}

          {/* SECONDARY CTA — hover ab sirf color transition (translate-y
              transform hata diya, cheap aur consistent). */}
          {slide.secondaryAction && (
            <Link
              to={slide.secondaryAction.href}
              className={`inline-flex items-center justify-center rounded-full border px-6 py-3.5 text-sm font-semibold transition-colors duration-300 sm:px-7 sm:text-base ${
                isLight
                  ? "border-[#292A27]/30 text-[#292A27] hover:bg-[#292A27] hover:text-[#F7F3E9]"
                  : "border-[#F7F3E9]/40 text-[#F7F3E9] hover:bg-[#F7F3E9] hover:text-[#292A27]"
              }`}
            >
              {slide.secondaryAction.label}
            </Link>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default HeroContent;
