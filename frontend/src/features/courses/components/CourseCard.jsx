import { memo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Clock, Sprout, Layers, Crown } from "lucide-react";
import { twMerge } from "tailwind-merge";
import AnimatedGradientBorder from "./AnimatedGradientBorder";

const BADGE_COLOR_MAP = {
  green: "bg-green-500/10 text-green-400 border-green-500/30",
  yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  red: "bg-red-500/10 text-red-400 border-red-500/30",
  orange: "bg-orange-500/10 text-orange-400 border-orange-500/30",
};

const LEVEL_ICON_MAP = {
  seedling: Sprout,
  layers: Layers,
  crown: Crown,
};

function CardButton({ label, onClick, variant = "ghost" }) {
  const isSolid = variant === "solid";

  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        "group/btn relative flex-1  cursor-pointer overflow-hidden rounded-lg border px-4 py-2.5 text-xs font-semibold tracking-wide transition-shadow duration-300 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
        isSolid
          ? "border-transparent bg-white text-neutral-950 hover:shadow-[0_0_22px_rgba(255,255,255,0.35)] focus-visible:ring-white"
          : "border-white/15 bg-white/5 text-white hover:shadow-[0_0_22px_rgba(168,85,247,0.4)] focus-visible:ring-purple-400"
      )}
    >
      <span className="relative block h-4 overflow-hidden">
        <span className="block transition-transform duration-300 ease-out group-hover/btn:-translate-y-full">
          {label}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover/btn:translate-y-0"
        >
          {label}
        </span>
      </span>
    </button>
  );
}

function CourseCard({ course, onViewDetails, onEnroll }) {
  const shouldReduceMotion = useReducedMotion();
  const LevelIcon = LEVEL_ICON_MAP[course.level.icon] ?? Sprout;

  // const batchClasses = BADGE_COLOR_MAP[course.batch.color] ?? BADGE_COLOR_MAP.green;
  const levelClasses = BADGE_COLOR_MAP[course.level.color] ?? BADGE_COLOR_MAP.green;

  return (
    <motion.div
      className="group relative h-full"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
  
      whileHover={shouldReduceMotion ? undefined : { y: -8, scale: 1.02 }}
    >
      <AnimatedGradientBorder
        colors={course.theme?.borderColors}
        glowIntensity={0.4}
        borderRadius="1.25rem"
        className="h-full"
      >
        <div className="relative flex h-full flex-col overflow-hidden rounded-[1.1rem] bg-gradient-to-b from-neutral-900/90 to-neutral-950/95 p-3 backdrop-blur-xl sm:p-4">
         
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-900">
            <motion.img
              src={course.image?.thumbnail}
              alt={`${course.title} course thumbnail`}
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />
          </div>
          <div className="mt-3 flex justify-end">
            {/* <span
              className={twMerge(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm",
                batchClasses
              )}
            >
              {course.batch?.name}
            </span> */}
          </div>

          {/* Course Title */}
          <h3 className="mt-2 font-orbitron text-lg font-semibold tracking-tight text-white sm:text-xl">
            {course.title}
          </h3>

          {/* Description — 2 lines se zyada clamp, card height consistent rakhne ke liye */}
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-400">
            {course.description}
          </p>

          {/* Duration + Level Badges */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-neutral-300">
              <Clock size={13} aria-hidden="true" />
              {course.duration?.value} {course.duration?.unit}
            </span>
            <span
              className={twMerge(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
                levelClasses
              )}
            >
              <LevelIcon size={13} aria-hidden="true" />
              {course.level?.name}
            </span>
          </div>

          <div className="mt-5 flex items-center gap-3 pt-1">
            <CardButton
              label="View Details"
              variant="ghost"
              onClick={() => onViewDetails?.(course)}
            />
            <CardButton
              label="Enroll Now"
              variant="solid"
              onClick={() => onEnroll?.(course)}
            />
          </div>
        </div>
      </AnimatedGradientBorder>
    </motion.div>
  );
}

export default memo(CourseCard);
