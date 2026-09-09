import { motion } from "motion/react";
import { imageVariants, imageReducedVariants } from "../../motion/hero.motion";

/**
 * HeroSlide.jsx
 * -------------
 * Background image layer — poori section ko cover karta hai (absolute
 * inset-0). Animation ab SIRF horizontal slide + opacity hai — Ken-Burns
 * zoom/scale (jo pehle 6-second continuous scale tha) completely hata
 * diya gaya hai.
 *
 * <picture> DECISION: Har slide ke paas is data mein sirf EK hi (.webp)
 * image source hai — koi alag mobile/portrait crop ya multi-resolution
 * variant provide nahi kiya gaya hai `hero.data.js` mein. Isliye fake
 * <source> tags "invent" nahi kiye (jo asal mein kaam nahi karte agar
 * unke paas real alternate assets na hon). Agar future mein responsive
 * crops available hon, to yahan easily add ho sakta hai:
 *   <picture>
 *     <source media="(max-width: 640px)" srcSet={slide.imageMobile} />
 *     <img src={slide.image} ... />
 *   </picture>
 *
 * CLS PREVENTION: img absolute + inset-0 + h-full/w-full hai, aur parent
 * section ki height fixed hai (h-screen) — isliye image load hone se
 * pehle/baad koi layout shift nahi hota, image apni khud ki box-space
 * "claim" nahi karti jo reflow trigger kare.
 */
const HeroSlide = ({ slide, isFirst, prefersReducedMotion }) => {
  const variants = prefersReducedMotion ? imageReducedVariants : imageVariants;

  // objectPosition — optional per-slide override, default "center".
  // hero.data.js mein future mein "imagePosition" field add karke isse
  // customize kiya ja sakta hai bina kisi breaking change ke (backward
  // compatible fallback — agar field na ho to bhi kaam karega).
  const objectPosition = slide.imagePosition || "center";

  return (
    <motion.div
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0 z-0 overflow-hidden"
    >
      <img
        src={slide.image}
        alt={slide.alt}
        loading={isFirst ? "eager" : "lazy"}
        fetchPriority={isFirst ? "high" : "auto"}
        decoding="async"
        style={{ objectPosition }}
        // object-cover — aspect ratio hamesha preserve hoti hai (image
        // kabhi stretch nahi hoti), object-position se crop-focus control
        // hota hai. absolute + h-full + w-full se image kabhi bhi container
        // se overflow ya distort nahi hoti, chahe screen 320px ho ya 4K.
        className="absolute inset-0 block h-full w-full object-cover"
      />

      {/* Gradient overlay — text readability ke liye, image ke upar dark
          fade (bottom se top halka) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#2B2D42]/80 via-[#2B2D42]/25 to-[#2B2D42]/45" />
    </motion.div>
  );
};

export default HeroSlide;
