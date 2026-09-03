import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  heroContainerVariants,
  heroItemVariants,
  heroReducedContainerVariants,
  heroReducedItemVariants,
} from "../../motion/hero.motion";

const HeroContent = ({ slide, prefersReducedMotion }) => {
  const containerVariants = prefersReducedMotion ? heroReducedContainerVariants : heroContainerVariants;
  const itemVariants = prefersReducedMotion ? heroReducedItemVariants : heroItemVariants;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="max-w-2xl text-[#F7F3E9]"
    >
      {slide.eyebrow && (
        <motion.p
          variants={itemVariants}
          className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#F4A261] sm:text-base"
        >
          {slide.eyebrow}
        </motion.p>
      )}

      <motion.h1
        variants={itemVariants}
        className="text-[clamp(1.75rem,5vw,3.5rem)] font-bold leading-tight"
      >
        {slide.title}
      </motion.h1>

      {slide.description && (
        <motion.p
          variants={itemVariants}
          className="mt-4 text-[clamp(0.95rem,2vw,1.15rem)] text-[#F7F3E9]/85"
        >
          {slide.description}
        </motion.p>
      )}

      {(slide.primaryAction || slide.secondaryAction) && (
        <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-4">
          {slide.primaryAction && (
            <Link
              to={slide.primaryAction.href}
              className="inline-flex items-center justify-center rounded-full bg-[#E63946] px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03] hover:bg-[#E63946]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4A261] sm:text-base"
            >
              {slide.primaryAction.label}
            </Link>
          )}

          {slide.secondaryAction && (
            <Link
              to={slide.secondaryAction.href}
              className="inline-flex items-center justify-center rounded-full border border-[#F7F3E9]/40 px-6 py-3 text-sm font-semibold text-[#F7F3E9] transition-colors duration-200 hover:bg-[#F7F3E9]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4A261] sm:text-base"
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