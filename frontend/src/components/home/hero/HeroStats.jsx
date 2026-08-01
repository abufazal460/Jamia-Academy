import { memo } from "react";
import { motion } from "motion/react";
import { heroStats } from "./data/heroData";
import { useCounter } from "./hooks/useCounter";
import { staggerContainer, fadeInUp } from "./utils/motionVariants";

/**
 * HeroStats.jsx
 * -------------
 * 4 stats ka grid jisme har number 0 se target tak count-up hota hai,
 * lekin SIRF jab wo screen pe visible ho jaaye (useCounter hook ke andar
 * useInView se handle hota hai) — aur ek baar ho gaya to dobara nahi hota.
 *
 * "40+ Web AI IT Courses" wali stat ko brief ke mutabik "100% Job
 * Assistance" se replace kiya gaya hai (heroData.js mein).
 *
 * NOTE: Har stat ke liye alag <StatItem /> sub-component banaya hai
 * kyunki useCounter hook internally apna khud ka state/ref rakhta hai —
 * agar hum isse ek array .map() ke andar directly call karte (bina
 * separate component ke) to Rules of Hooks todte (hooks ko loop ke andar
 * conditionally/dynamically call nahi kar sakte).
 *
 * PATCH: import "motion/react" se (framer-motion se nahi) — stack consistency.
 */

// Number ko display format ke hisaab se format karta hai
function formatValue(count, displayFormat) {
  if (displayFormat === "comma-plus") {
    // 2500 -> "2,500"
    return count.toLocaleString("en-IN");
  }
  return count.toString();
}

function StatItem({ stat }) {
  const { ref, count } = useCounter(stat.target, 1800);

  return (
    // h-full + flex-col — sab 4 stat items ki height grid row ke andar
    // barabar rehti hai (equal height requirement), chahe label 1 line ho
    // ya 2 line wrap ho jaaye.
    <motion.div ref={ref} variants={fadeInUp} className="flex h-full flex-col items-center">
      {/* whitespace-nowrap + tabular-nums — "2,500+" jaisi badi value kabhi
          mid-number wrap na ho, aur counting animation ke time digits ka
          width change hone se number "kaanpta" hua na dikhe */}
      <div
        className={`mb-1 whitespace-nowrap text-[clamp(1.375rem,5.5vw,2.25rem)] font-extrabold tabular-nums ${stat.colorClass}`}
      >
        {formatValue(count, stat.displayFormat)}
        {stat.suffix}
      </div>
      <div className="px-1 text-[clamp(0.625rem,2vw,0.875rem)] leading-snug text-slate-400">
        {stat.label}
      </div>
    </motion.div>
  );
}

function HeroStats() {
  return (
    <motion.div
      variants={staggerContainer(0.15)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      // GRID COLUMNS PLAN:
      // - Mini phones (<375px): grid-cols-1 — 4 stats ko squeeze karne se
      //   numbers overflow/wrap ho sakte the, isliye single column safest hai.
      // - 375px se lekar desktop tak: grid-cols-2 (2x2) — mobile aur tablet
      //   dono ke liye same, kyunki spec mein "Tablet 2x2" bhi mobile jaisa
      //   hi hai.
      // - lg (1024px+, laptop/desktop): grid-cols-4 — poori row mein 4 stats.
      // items-stretch (grid default) sab cards ko equal height deta hai.
      className="grid grid-cols-1 gap-x-4 gap-y-6 py-6 min-[375px]:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-8"
      role="list"
      aria-label="Jamia Academy key statistics"
    >
      {heroStats.map((stat) => (
        <div key={stat.id} role="listitem" className="h-full">
          <StatItem stat={stat} />
        </div>
      ))}
    </motion.div>
  );
}

export default memo(HeroStats);