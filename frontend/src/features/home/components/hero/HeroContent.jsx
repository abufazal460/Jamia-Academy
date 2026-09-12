import { motion } from "motion/react";
import { Link } from "react-router-dom";

import {
  heroContainerVariants,
  heroItemVariants,
  heroReducedContainerVariants,
  heroReducedItemVariants,
} from "../../motion/hero.motion";

// layoutClasses/widthClasses — hero.data.js ke "layout"/"contentWidth"
// fields se match karte hain (bug-fixed mapping, "compact"/"orphan" bhi
// included, pehle sirf medium/large the)
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

/**
 * HeroContent.jsx
 * ---------------
 * DATA-DRIVEN OPTIONAL CONTENT: har field (heading/paragraph/buttons)
 * independently present ya absent ho sakta hai. Koi bhi field missing ho
 * to us jagah koi khaali block ya extra spacing nahi banti — kyunki:
 *
 *  1. Har block sirf tab render hota hai jab uska data maujood ho
 *     (`{slide.heading && (...)}` jaisa conditional pattern).
 *  2. Container `gap-*` use karta hai (manual margin-top/margin-bottom har
 *     nahi) — CSS gap sirf ACTUALLY-rendered siblings ke BEECH space
 *     deta hai, kisi bhi missing field ke liye phantom space nahi banti.
 *     (Pehle `mt-6`/`mt-8` jaise fixed margins the jo missing-field case
 *     mein galat/extra spacing bana dete — ab wo bug bhi fix ho gaya.)
 *
 * NO CONTENT AT ALL (jaise slide 4) -> `hasAnyContent` false hone pe
 * poora component `null` return karta hai — koi empty wrapper DOM mein
 * nahi jaata (low DOM complexity requirement).
 *
 * BADGE: ab yahan nahi hai — badge Hero.jsx mein `<HeroBadge />` ke
 * through independently render hota hai (fixed position, layout se
 * decouple), isliye is component se poori tarah hata diya gaya hai.
 */
const HeroContent = ({ slide, prefersReducedMotion }) => {
  const hasHeading = Boolean(slide.heading);
  const hasParagraph = Boolean(slide.paragraph);
  const hasButtons = Array.isArray(slide.buttons) && slide.buttons.length > 0;
  const hasAnyContent = hasHeading || hasParagraph || hasButtons;

  // Slide ke paas heading/paragraph/buttons mein se KUCH bhi nahi hai
  // (jaise image-only slide) -> content block hi render mat karo.
  if (!hasAnyContent) return null;

  const containerVariants = prefersReducedMotion
    ? heroReducedContainerVariants
    : heroContainerVariants;

  const itemVariants = prefersReducedMotion ? heroReducedItemVariants : heroItemVariants;

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
      className={`relative flex min-h-full w-full flex-col gap-5 sm:gap-6 ${layout} ${width}`}
    >
      {/* ORPHAN SPECIAL BORDER — sirf orphan-themed slide ke around
          (jaise pehle tha), scale-free opacity pulse */}
      {isOrphan && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-6 rounded-[2rem] border border-[#FFD166]"
          animate={{ opacity: [0.25, 0.8, 0.25] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* HEADING — optional */}
      {hasHeading && (
        <motion.h1
          variants={itemVariants}
          className={`relative max-w-4xl text-[clamp(2.2rem,5.5vw,5.5rem)] font-bold leading-[0.94] tracking-[-0.045em] ${
            isLight ? "text-[#292A27]" : "text-[#F7F3E9]"
          } ${isOrphan ? "drop-shadow-[0_0_25px_rgba(255,209,102,0.18)]" : ""}`}
        >
          {slide.heading}
        </motion.h1>
      )}

      {/* PARAGRAPH — optional */}
      {hasParagraph && (
        <motion.p
          variants={itemVariants}
          className={`relative max-w-xl text-[clamp(0.95rem,1.4vw,1.15rem)] leading-relaxed ${
            isLight ? "text-[#292A27]/75" : "text-[#F7F3E9]/80"
          }`}
        >
          {slide.paragraph}
        </motion.p>
      )}

      {/* BUTTONS — data-driven array, 0/1/2/N buttons, koi hardcoded
          "primary"/"secondary" JSX duplication nahi, sirf .map() */}
      {hasButtons && (
        <motion.div variants={itemVariants} className="relative flex flex-wrap items-center gap-3">
          {slide.buttons.map((button) => {
            const isPrimary = button.variant === "primary";
            const colors = slide.colors || {};

            if (isPrimary) {
              return (
                <Link
                  key={button.label}
                  to={button.href}
                  style={{ backgroundColor: colors.button, color: colors.buttonText }}
                  className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-shadow duration-300 hover:shadow-[0_10px_28px_rgba(0,0,0,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 sm:px-7 sm:text-base ${
                    isOrphan ? "shadow-[0_0_25px_rgba(255,209,102,0.25)]" : ""
                  }`}
                >
                  {button.label}
                  <span aria-hidden="true" className="text-lg">
                    →
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={button.label}
                to={button.href}
                className={`inline-flex items-center justify-center rounded-full border px-6 py-3.5 text-sm font-semibold transition-colors duration-300 sm:px-7 sm:text-base ${
                  isLight
                    ? "border-[#292A27]/30 text-[#292A27] hover:bg-[#292A27] hover:text-[#F7F3E9]"
                    : "border-[#F7F3E9]/40 text-[#F7F3E9] hover:bg-[#F7F3E9] hover:text-[#292A27]"
                }`}
              >
                {button.label}
              </Link>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
};

export default HeroContent;
