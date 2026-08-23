import { motion } from "motion/react";
import { imageVariants, imageReducedVariants } from "../../motion/hero.motion";

const HeroSlide = ({ slide, isFirst, prefersReducedMotion }) => {
  const variants = prefersReducedMotion ? imageReducedVariants : imageVariants;

  return (
    <motion.div
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0 z-0"
    >
      {/* object-cover — image screen ke har size pe fully chipki rahegi, width aur height dono 100% */}
      <img
        src={slide.image}
        alt={slide.alt}
        loading={isFirst ? "eager" : "lazy"}
        fetchPriority={isFirst ? "high" : "auto"}
        decoding="async"
        className="absolute inset-0 h-full w-full"
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#2B2D42]/80 via-[#2B2D42]/25 to-[#2B2D42]/45" />
    </motion.div>
  );
};

export default HeroSlide;