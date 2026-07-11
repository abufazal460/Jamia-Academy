import { useMemo } from "react";
import { motion } from "framer-motion";
import { GalleryCard } from "./GalleryCard";
import { useIsMobile } from "../../hooks/useismobile";

/**
 * GalleryGrid.jsx
 * -----------------------------------------------------------------------
 * Hinglish — YE FILE OPTIMIZE HUI HAI (layout/grid classes SAME rakhi hain,
 * sirf animation weight kam ki gayi hai):
 *
 * 1. SHUFFLE/FLY-IN ANIMATION COMPLETELY HATA DIYA:
 *    Pehle har card random direction (top/bottom/left/right/center) se
 *    fly-in hota tha with rotate + x/y throw + scale 0.85->1 — ye sabse
 *    zyada CPU-heavy part tha (139 cards, har ek apna alag transform
 *    animation chala raha tha). Brief ke rules se match karte hue:
 *      - Desktop: sirf "opacity 0->1 + halka translateY(6px->0)"
 *      - Mobile: koi entry animation nahi, seedha visible (fade bhi nahi,
 *        taaki 768px se neeche zero animation overhead ho — brief point 9)
 *
 * 2. `useIsMobile()` hook se decide hota hai kaunsa variant use karna hai.
 *    Ye check render ke time hota hai, condition ke andar koi expensive
 *    calculation nahi — bas ek boolean branch.
 *
 * 3. Random delay/shuffleArray wala poora system HATA diya — ab sabka
 *    delay bahut chhota aur uniform hai (index * 0.015s, max ~2s total
 *    ke bajaye), koi Math.random() calls nahi bache render path me.
 *
 * 4. `staggerChildren` bhi minimal (0.015s) — pehle wale se ~80%+ halka,
 *    jaisa desktop ke liye "reduce complexity by 80%" point maanga gaya.
 *
 * 5. Grid classes (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
 *    xl:grid-cols-4`) BILKUL WAISI HI RAKHI GAYI HAIN — layout/design
 *    change nahi kiya, sirf jo animate ho raha tha wo halka kiya.
 */
export function GalleryGrid({ images, onOpenImage }) {
  const isMobile = useIsMobile();

  const { containerVariants, itemVariant } = useMemo(() => {
    if (isMobile) {
      // Mobile: koi transition/animation nahi — turant visible.
      // (Brief point 3 & 9: "Remove shuffle completely" + "disable every
      // heavy animation" niche 768px.)
      return {
        containerVariants: { hidden: {}, show: {} },
        itemVariant: { hidden: { opacity: 1 }, show: { opacity: 1 } },
      };
    }

    // Desktop: sirf fade + halka translateY, jaisa brief me example diya:
    // "opacity 0 -> 1, translateY 6px -> 0, duration ~0.35-0.45s, ease-out"
    return {
      containerVariants: {
        hidden: {},
        show: { transition: { staggerChildren: 0.015 } },
      },
      itemVariant: {
        hidden: { opacity: 0, y: 6 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: "easeOut" },
        },
      },
    };
  }, [isMobile]);

  return (
    <motion.div
      key={images.length}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05 }}
      /* Responsive Grid */
      /* Mobile 1 column, tablet 2, laptop 3, desktop 4 — jaisa design pehle se tha */
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6"
    >
      {images.map((src, index) => (
        <GalleryCard
          key={src}
          src={src}
          index={index}
          variants={itemVariant}
          onOpen={onOpenImage}
        />
      ))}
    </motion.div>
  );
}