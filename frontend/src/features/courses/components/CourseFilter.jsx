import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { twMerge } from "tailwind-merge";

function FilterDropdown({ label, options, selectedValue, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full sm:w-auto ">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={twMerge(
          "flex w-full items-center justify-between gap-2 rounded-xl border cursor-pointer px-4 py-2.5 text-sm backdrop-blur-md transition-colors sm:w-auto",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400",
          selectedValue
            ? "border-purple-400/50 bg-purple-500/10 text-white"
            : "border-white/10 bg-white/5 text-neutral-300 hover:border-white/20"
        )}
      >
        <span>{selectedValue || label}</span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={twMerge("transition-transform duration-200", isOpen && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {isOpen && options.length > 0 && (
          <motion.ul
            role="listbox"
            aria-label={label}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 mt-2 w-full min-w-[10rem] overflow-hidden rounded-xl border border-white/10 bg-neutral-900/95 p-1 shadow-[0_0_25px_rgba(168,85,247,0.25)] backdrop-blur-xl sm:w-max"
          >
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selectedValue === option}
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false);
                  }}
                  className={twMerge(
                    "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400",
                    selectedValue === option
                      ? "bg-purple-500/20 text-white"
                      : "text-neutral-300 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {option}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CourseFilter({
  courses = [],
  filters = {},
  onFilterChange,
  onReset,
  className = "",
}) {
  const categoryOptions = useMemo(
    () => Array.from(new Set(courses.flatMap((course) => course.category || []))),
    [courses]
  );

  const levelOptions = useMemo(
    () => Array.from(new Set(courses.map((course) => course.level?.name).filter(Boolean))),
    [courses]
  );

  const durationOptions = useMemo(
    () =>
      Array.from(
        new Set(
          courses
            .map((course) =>
              course.duration ? `${course.duration.value} ${course.duration.unit}` : null
            )
            .filter(Boolean)
        )
      ),
    [courses]
  );

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return (
    <div
      className={twMerge(
        "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center",
        className
      )}
    >
      <FilterDropdown
        label="Category"
        options={categoryOptions}
        selectedValue={filters.category}
        onSelect={(value) => onFilterChange?.("category", value)}
      />
      <FilterDropdown
        label="Level"
        options={levelOptions}
        selectedValue={filters.level}
        onSelect={(value) => onFilterChange?.("level", value)}
      />
      <FilterDropdown
        label="Duration"
        options={durationOptions}
        selectedValue={filters.duration}
        onSelect={(value) => onFilterChange?.("duration", value)}
      />

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium cursor-pointer border border-white/10 bg-white/5 text-neutral-300 hover:border-white/20  px-4 py-3 rounded-lg  transition-colors hover:text-white  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
