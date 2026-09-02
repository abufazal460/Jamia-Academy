import { memo, useMemo } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { SearchX, Gamepad2 } from "lucide-react";
import CourseCard from "./CourseCard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06, // har card 60ms delay se aayega - "wave" feel
      delayChildren: 0.05,
    },
  },
};

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
  onViewDetails, // (course) => void - CourseSection modal open karega
  onEnroll, // (course) => void - CourseSection WhatsApp kholega
}) => {
  
  const prefersReducedMotion = useReducedMotion();

  const effectiveCardVariants = useMemo(() => {
    if (!prefersReducedMotion) return cardVariants;
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0 },
    };
  }, [prefersReducedMotion]);

  

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

export default memo(CourseGrid);
