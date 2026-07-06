import { useMemo } from "react";
import { motion } from "framer-motion";
import { GalleryCard } from "./GalleryCard";
import { shuffleArray } from "../../utils/shuffleArray";

// Panch possible entry directions — "center" ka matlab hai halka zoom-in
// bina kisi X/Y offset ke (jaise card apni jagah se pop-in ho raha ho).
const DIRECTIONS = ["top", "bottom", "left", "right", "center"];

function buildOffset(direction) {
  const THROW_DISTANCE = 90; // px, kitni door se card fly-in karega

  switch (direction) {
    case "top":
      return { x: 0, y: -THROW_DISTANCE, rotate: -6 };
    case "bottom":
      return { x: 0, y: THROW_DISTANCE, rotate: 6 };
    case "left":
      return { x: -THROW_DISTANCE, y: 0, rotate: -8 };
    case "right":
      return { x: THROW_DISTANCE, y: 0, rotate: 8 };
    case "center":
    default:
      return { x: 0, y: 0, rotate: 0 };
  }
}

/**
 * GalleryGrid.jsx
 * -----------------------------------------------------------------------
 * Hinglish:
 *  - Grid responsiveness pure Tailwind breakpoints se: mobile 1 column,
 *    tablet(sm) 2, laptop(lg) 3, desktop(xl) 4 — jaisa brief me maanga
 *    gaya. `gap` fixed rakha hai taaki reflow/CLS na ho.
 *  - Entry animation "card game" jaisa feel dene ke liye har image ko
 *    RANDOM direction (top/bottom/left/right/center) aur RANDOM chhota
 *    delay diya jata hai — normal Framer Motion stagger sequential order
 *    follow karta hai, isliye humne delay khud shuffle karke assign kiya
 *    hai taaki order bhi random lage, sirf direction hi nahi.
 *  - `useMemo` on `images` dependency: jab tab switch hota hai (images
 *    array badalta hai) tabhi naye random variants generate hote hain —
 *    beech-beech me unrelated re-renders par nahi (performance).
 */
export function GalleryGrid({ images, onOpenImage }) {
  const { containerVariants, itemVariants } = useMemo(() => {
    // Har image index ke liye ek random direction choose karo
    const perItemDirection = images.map(
      () => DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)]
    );

    // Delay values ko evenly-spaced generate karke shuffle karo — isse
    // total animation duration predictable rehta hai (koi bhi delay bahut
    // zyada lamba nahi hoga) lekin kis card ka number kab aayega ye random hai.
    const STEP = 0.035; // seconds
    const orderedDelays = images.map((_, i) => i * STEP);
    const shuffledDelays = shuffleArray(orderedDelays);

    const item = images.map((_, index) => {
      const offset = buildOffset(perItemDirection[index]);
      return {
        hidden: {
          opacity: 0,
          x: offset.x,
          y: offset.y,
          rotate: offset.rotate,
          scale: 0.85,
        },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          transition: {
            delay: shuffledDelays[index],
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      };
    });

    const container = {
      hidden: {},
      show: { transition: { staggerChildren: 0 } }, // stagger manually via per-item delay
    };

    return { containerVariants: container, itemVariants: item };
  }, [images]);

  return (
    <motion.div
      key={images.length} // tab switch par animation fresh se replay ho
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05 }}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6"
    >
      {images.map((src, index) => (
        <GalleryCard
          key={src}
          src={src}
          index={index}
          variants={itemVariants[index]}
          onOpen={onOpenImage}
        />
      ))}
    </motion.div>
  );
}