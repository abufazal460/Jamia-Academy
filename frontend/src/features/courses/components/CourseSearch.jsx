import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useCourseSearch } from "../hooks/useCourseSearch";

export default function CourseSearch({ courses = [], onResultsChange, className = "" }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);
  const inputId = useId();

  const { searchQuery, setSearchQuery, filteredCourses } = useCourseSearch(courses);

  useEffect(() => {
    onResultsChange?.(filteredCourses);
  }, [filteredCourses, onResultsChange]);

  const handleExpand = () => {
    setIsExpanded(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setSearchQuery("");
  };

  return (
    <div className={twMerge("flex w-full items-center justify-between gap-4", className)}>
      <h1 className="text-xl font-bold px-1 tracking-wide text-white sm:text-2xl">
        OUR COURSES
      </h1>

      <motion.div
        layout
        animate={{ width: isExpanded ? "min(320px, 70vw)" : 44 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={twMerge(
          "relative flex items-center overflow-hidden rounded-full  border border-white/10 bg-white/5 backdrop-blur-md transition-shadow duration-300",
          isExpanded ? "shadow-[0_0_25px_rgba(168,85,247,0.35)]" : "shadow-none"
        )}
      >
 
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full  bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20"
          animate={{ opacity: isExpanded ? 1 : 0.5 }}
          transition={{ duration: 0.4 }}
        />

        <button
          type="button"
          onClick={isExpanded ? handleCollapse : handleExpand}
          aria-label={isExpanded ? "Close search" : "Open course search"}
          aria-expanded={isExpanded}
          aria-controls={inputId}
          className="relative z-10 flex cursor-pointer h-11 w-11 shrink-0 items-center justify-center rounded-full text-neutral-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        >
          {isExpanded ? <X size={18} aria-hidden="true" /> : <Search size={18} aria-hidden="true" />}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.input
              id={inputId}
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search courses..."
              aria-label="Search courses"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="relative z-10 h-11 w-full bg-transparent pr-4 text-sm text-white placeholder:text-neutral-500 focus-visible:outline-none"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export function CourseEmptyState({ className = "" }) {
  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={twMerge(
        "mx-auto flex max-w-md flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-10 text-center backdrop-blur-xl",
        className
      )}
    >
      <p className="text-sm font-medium text-neutral-200">
        No courses available. We currently do not offer this course.
      </p>
      <p className="text-sm text-neutral-500">
        Ye course abhi Jamia Academy par available nahi hai.
      </p>
    </motion.div>
  );
}
