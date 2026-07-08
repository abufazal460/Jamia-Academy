import { memo, useState } from "react";
import { motion } from "framer-motion";
import { ImageSkeleton } from "./ImageSkeleton";

/**
 * GalleryCard.jsx
 * -----------------------------------------------------------------------
 * Hinglish: Ek single gallery tile. Responsibilities:
 *  1. Image load hone tak skeleton dikhana (loaded state track karke).
 *  2. Hover par scale + shadow + travelling gradient border
 *     (`.gg-border-frame` class CSS file me defined hai, dekhein
 *     src/styles/gallery.css).
 *  3. Framer Motion se random-direction entry animation (variants prop
 *     parent se aata hai — GalleryGrid decide karta hai ki ye card kis
 *     direction se "fly-in" karega, taaki cards ek dam card-game jaisa
 *     random feel de, sequential na lage).
 *  4. Click hone par onOpen(index) call karna — jo Gallery.jsx ko
 *     lightbox open karne ke liye batata hai.
 *
 * `memo` + custom comparator: list bahut badi ho sakti hai (139 images),
 * isliye har card ko sirf tab re-render hone dete hain jab uska khud ka
 * src ya index badle — parent ke unrelated state change (jaise lightbox
 * open/close) par pura grid re-render nahi hoga.
 */
function GalleryCardBase({ src, index, variants, onOpen }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.button
      type="button"
      variants={variants}
      onClick={() => onOpen(index)}
      className="gg-border-frame group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 text-left shadow-md transition-shadow duration-300 hover:shadow-2xl  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{ willChange: "transform" }}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      aria-label={`Open image ${index + 1} in full screen`}
    >
      <span className="gg-border-inner block ">
        {!isLoaded && <ImageSkeleton />}
        <img
          src={src}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          alt={`Jamia Academy gallery photo ${index + 1}`}
          className={`h-full w-full object-cover transition-all  duration-500 ease-out group-hover:scale-[1.06]  ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </span>
    </motion.button>
  );
}

function areEqual(prevProps, nextProps) {
  return prevProps.src === nextProps.src && prevProps.index === nextProps.index;
}

export const GalleryCard = memo(GalleryCardBase, areEqual);