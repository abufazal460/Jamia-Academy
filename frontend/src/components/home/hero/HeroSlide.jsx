import { motion } from "framer-motion";
import { imageVariants, imageReducedVariants } from "../../../animations/heroAnimations";

/**
 * Ek slide ka image + overlay handle karta hai.
 * Trick: blurred background copy image ko cover se fill karta hai (empty letterbox jagah acchi lage),
 * aur upar wali real image object-contain hai taaki content kabhi crop na ho.
 */
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
      {/* Decorative blurred backdrop — screen readers ke liye hidden */}
      <img
        src={slide.image}
        alt=""
        aria-hidden="true"
        loading={isFirst ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-2xl"
      />

      {/* Real image — object-contain taaki poora content visible rahe, distortion na ho */}
      <img
        src={slide.image}
        alt={slide.alt}
        loading={isFirst ? "eager" : "lazy"}
        fetchPriority={isFirst ? "high" : "auto"}
        decoding="async"
        className="relative z-10 h-full w-full object-contain"
      />

      {/* Readability overlay — text ke liye subtle gradient, image excessively dark nahi hoti */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#2B2D42]/80 via-[#2B2D42]/25 to-[#2B2D42]/45" />
    </motion.div>
  );
};

export default HeroSlide;