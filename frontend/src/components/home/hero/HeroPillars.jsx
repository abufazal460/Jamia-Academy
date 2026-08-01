import { memo } from "react";
import { motion } from "motion/react";
import { heroPillars } from "./data/heroData";
import { staggerContainer, fadeInUp, cardHover } from "./utils/motionVariants";

/**
 * HeroPillars.jsx
 * ---------------
 * 3 "why choose us" style cards — content bilkul same rakha hai
 * (⚡ Hands-on Live Projects, 🎓 Recognized Certifications, 🚀 Placement
 * & Mentorship), sirf presentation premium bana di hai:
 *  - Glass background (subtle border + backdrop blur)
 *  - Hover pe card lift + soft glow shadow (cardHover variant se)
 *  - Icon hover pe halka rotate + scale karta hai
 *
 * Cards heroPillars array pe map() karke render hote hain — naya pillar
 * add karna ho to sirf heroData.js mein object add karna hoga.
 *
 * PATCH: import "motion/react" se (framer-motion se nahi) — stack consistency.
 */
function HeroPillars() {
  return (
    <motion.div
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      // GRID COLUMNS PLAN:
      // - Mobile (<640px): grid-cols-1 — cards ek ke neeche ek, poori width
      //   use karke readable rehte hain.
      // - Tablet (sm, 640px+): grid-cols-2 — 3 cards mein se 2 pehli row
      //   mein, teesra apni row mein akela center-aligned rehta hai (jo
      //   optically theek lagta hai kyunki text-center hai).
      // - Desktop (lg, 1024px+): grid-cols-3 — poori row mein teeno cards.
      // pt aur gap dono clamp() se fluid hain.
      className="grid grid-cols-1 gap-4 border-t border-slate-800/60 pt-[clamp(2rem,6vw,2.5rem)] text-center sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
    >
      {heroPillars.map((pillar) => (
        <motion.article
          key={pillar.id}
          variants={fadeInUp}
          initial="rest"
          whileHover="hover"
          animate="rest"
          tabIndex={0}
          aria-label={pillar.title}
          // h-full — grid ke andar teeno (ya do) cards ki height barabar
          // rehti hai, chahe kisi ek card ka description text lamba ho aur
          // do lines mein wrap ho jaaye (equal-height cards requirement).
          className="relative h-full rounded-2xl border border-slate-800/70 bg-white/[0.03] px-[clamp(1rem,4vw,1.25rem)] py-[clamp(1.25rem,4vw,1.5rem)] backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          <motion.div
            variants={cardHover}
            className="flex h-full flex-col items-center justify-center rounded-2xl"
          >
            <motion.span
              aria-hidden="true"
              variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: -8, scale: 1.15 } }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
              className="mb-1 inline-block text-[clamp(1.25rem,4vw,1.5rem)]"
            >
              {pillar.icon}
            </motion.span>
            <h3 className="mb-1 text-[clamp(0.875rem,2.4vw,1rem)] font-bold text-white">
              {pillar.title}
            </h3>
            <p className="text-[clamp(0.6875rem,1.8vw,0.75rem)] text-slate-400">
              {pillar.description}
            </p>
          </motion.div>
        </motion.article>
      ))}
    </motion.div>
  );
}

export default memo(HeroPillars);