import { motion, AnimatePresence } from "motion/react";

/**
 * HeroBadge.jsx
 * -------------
 * Pehle "eyebrow" HeroContent ke andar tha aur har slide ke layout
 * (left/center/right/bottom) ke saath move karta tha. Naye spec ke
 * mutabik badge ki position HAMESHA SAME rehni chahiye (navbar ke neeche,
 * fixed spot) — chahe slide ka content-layout kuch bhi ho. Isliye ye
 * component Hero.jsx mein content-block se ALAG, independently positioned
 * hai (absolute, apni khud ki jagah).
 *
 * VISIBILITY: Sirf tab dikhta hai jab active slide ke paas `badge` text
 * ho (slides 1-3). Slide 4 pe `slide.badge` undefined hai, isliye ye
 * component AnimatePresence ke through smoothly fade-out ho jaata hai
 * (no error, no leftover empty box).
 *
 * ANIMATION (naya requirement, "existing animation" ka hissa nahi hai):
 *  - Badge khud: continuous pulsing box-shadow (glow "blink" jaisa) —
 *    sirf box-shadow animate ho raha hai (composite-safe, layout/paint
 *    trigger nahi karta).
 *  - Badge text: halka opacity blink loop.
 *  - prefers-reduced-motion honor karta hai — dono infinite loops band
 *    ho jaate hain, badge static (lekin fully visible) rehta hai.
 */
const HeroBadge = ({ text, prefersReducedMotion }) => {
  const show = Boolean(text);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="hero-badge"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          // NOTE: top offset ek estimate hai (navbar height ~64-80px farz
          // karke). Agar actual navbar height alag ho, to yahan
          // top-[clamp(...)] ya navbar se ek shared CSS variable use kar
          // ke isse aur precise kiya ja sakta hai.
          className="absolute left-5 top-20 z-30 sm:left-8 sm:top-24 lg:left-12"
        >
          <motion.span
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    boxShadow: [
                      "0 0 0 0 rgba(255,209,102,0.45)",
                      "0 0 0 10px rgba(255,209,102,0)",
                      "0 0 0 0 rgba(255,209,102,0.45)",
                    ],
                  }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }
            className="inline-flex items-center rounded-full border border-[#FFD166] bg-[#FFD166]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FFD166] sm:text-sm"
          >
            <motion.span
              animate={prefersReducedMotion ? undefined : { opacity: [1, 0.4, 1] }}
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
              }
            >
              {text}
            </motion.span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeroBadge;
