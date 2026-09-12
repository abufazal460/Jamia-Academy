import { motion } from "motion/react";
import { imageVariants, imageReducedVariants } from "../../motion/hero.motion";

/**
 * HeroSlide.jsx
 * -------------
 * Background image layer — animation (slide + opacity) bilkul unchanged
 * hai (existing timing/easing preserve ki gayi hai, koi change nahi).
 *
 * <picture> — Desktop pe landscape asset (`slide.image`), mobile pe
 * portrait asset (`slide.imageMobile`) dikhti hai. Breakpoint 767px rakha
 * hai (Tailwind ke `sm:` se just neeche) taaki "mobile" ka matlab wahi ho
 * jo baaki responsive system mein hai.
 *
 * FALLBACK: agar kisi slide ke paas alag portrait crop nahi hai to
 * `imageMobile` bhi `image` jaisa hi set kiya gaya hai (hero.data.js
 * mein) — isliye <source> hamesha ek VALID asset dega, kabhi missing/broken
 * image state nahi banegi.
 *
 * CLS PREVENTION: dono <source> aur <img> absolute + inset-0 + h-full/
 * w-full hain, parent section ki height fixed (h-screen) hai — image load
 * hone se pehle/baad koi layout shift nahi hota.
 */
const HeroSlide = ({ slide, isFirst, prefersReducedMotion }) => {
  const variants = prefersReducedMotion ? imageReducedVariants : imageVariants;
  const objectPosition = slide.imagePosition || "center";

  // Agar imageMobile explicitly na diya ho, landscape image hi fallback
  // ban jaati hai — kabhi bhi <img src="undefined"> jaisi broken state
  // nahi banti.
  const mobileImage = slide.imageMobile || slide.image;

  return (
    <motion.div
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0 z-0 overflow-hidden"
    >
      <picture>
        {/* Mobile/portrait — 767px aur neeche */}
        <source media="(max-width: 767px)" srcSet={mobileImage} />
        {/* Desktop/landscape — default/fallback source */}
        <img
          src={slide.image}
          alt={slide.alt}
          loading={isFirst ? "eager" : "lazy"}
          fetchPriority={isFirst ? "high" : "auto"}
          decoding="async"
          style={{ objectPosition }}
          // object-cover — aspect ratio hamesha preserve hoti hai (kabhi
          // stretch nahi hoti), object-position se crop-focus control.
          // absolute + h-full/w-full se 320px se 4K tak overflow/distortion
          // kabhi nahi hoti.
          className="absolute inset-0 block h-full w-full object-cover"
        />
      </picture>

      {/* Gradient overlay — text readability ke liye */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#2B2D42]/80 via-[#2B2D42]/25 to-[#2B2D42]/45" />
    </motion.div>
  );
};

export default HeroSlide;
