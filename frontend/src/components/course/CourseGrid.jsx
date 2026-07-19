import { memo, useMemo } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { SearchX, Gamepad2 } from "lucide-react";
import CourseCard from "./CourseCard";
import CourseCardSkeleton from "./CourseCardSkeleton";

/**
 * CourseGrid.jsx
 * -----------------------------------------------------------------------
 * AUDIT FIX: Pehle `<CourseCard onClick={...} />` pass ho raha tha, lekin
 * CourseCard.jsx ka real prop contract `onViewDetails` aur `onEnroll` hai
 * (onClick naam ka koi prop wo accept hi nahi karta) — isliye "View
 * Details" aur "Enroll Now" dono buttons kuch nahi kar rahe the. Ab dono
 * callbacks seedhe CourseCard ko pass ho rahe hain.
 *
 * Import bhi `motion/react` se `framer-motion` kar diya hai — project ke
 * baaki components (Card, Modal, Search, Filter, GradientBorder) sab
 * `framer-motion` use kar rahe hain, do alag animation packages saath
 * me install/import karna bundle size aur runtime dono ke liye risky hai.
 *
 * Baaki sab as-is: rendering + animation yahin isolated hai, data/business
 * logic CourseSection se as props aata hai.
 * -----------------------------------------------------------------------
 */

// Stagger container - bacchon (cards) ko ek ek karke reveal karega
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06, // har card 60ms delay se aayega - "wave" feel
      delayChildren: 0.05,
    },
  },
};

// Individual card entrance - gaming UI ke liye thoda "pop + rise" motion
const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
};

const CourseGrid = ({
  courses = [],
  isLoading = false,
  skeletonCount = 6,
  onViewDetails, // (course) => void - CourseSection modal open karega
  onEnroll, // (course) => void - CourseSection WhatsApp kholega
}) => {
  // Reduced motion respect karna accessibility + low-end device rule dono
  // ke liye zaroori hai - agar user ne OS level pe motion off kiya hai
  // to hum bhi heavy animation skip karke sirf opacity fade denge.
  const prefersReducedMotion = useReducedMotion();

  const effectiveCardVariants = useMemo(() => {
    if (!prefersReducedMotion) return cardVariants;
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0 },
    };
  }, [prefersReducedMotion]);

  // Loading state - skeleton grid same layout use karta hai taaki
  // real content aane par grid "jump" na kare
  if (isLoading) {
    return (
      <div
        className="
          grid gap-4 sm:gap-5 lg:gap-6
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          2xl:grid-cols-4
          max-w-[1800px] mx-auto
          px-4 sm:px-6
        "
      >
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <CourseCardSkeleton key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }

  // Empty state - jab search/filter se result zero aaye. Sirf "no data"
  // text nahi, gaming theme ke hisaab se "no missions found" jaisa feel.
  if (!courses.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          flex flex-col items-center justify-center
          text-center gap-4
          py-20 px-6
          max-w-md mx-auto
        "
      >
        <div
          className="
            relative w-16 h-16 rounded-2xl
            flex items-center justify-center
            bg-white/[0.04] border border-white/10
          "
        >
          <SearchX className="w-7 h-7 text-fuchsia-400" strokeWidth={1.75} />
          <Gamepad2
            className="absolute -bottom-2 -right-2 w-6 h-6 text-cyan-400 opacity-80"
            strokeWidth={1.75}
          />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          Koi course match nahi hua
        </h3>
        <p className="text-sm text-white/50 leading-relaxed">
          Apna search ya filter check karein — shayad spelling ya category
          alag try karne se result mil jaye.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="
        grid gap-4 sm:gap-5 lg:gap-6
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-4
        max-w-[1800px] mx-auto
        px-4 sm:px-6
      "
    >
      <AnimatePresence mode="popLayout">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            layout
            variants={effectiveCardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <CourseCard
              course={course}
              onViewDetails={onViewDetails}
              onEnroll={onEnroll}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

// memo lagaya - jab CourseSection ke andar search input type ho raha ho
// tab tak grid re-render na ho jab tak filtered courses actually change na ho
export default memo(CourseGrid);
