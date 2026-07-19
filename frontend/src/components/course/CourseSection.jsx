import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

import CourseSearch from "./CourseSearch";
import CourseFilter from "./CourseFilter";
import CourseGrid from "./CourseGrid";
import CourseModal from "./CourseModal";

import { courses } from "../../data/courses.data";
import { useCourseSearch } from "../../hooks/useCourseSearch";
import { useCourseFilter } from "../../hooks/useCourseFilter";

/**
 * CourseSection.jsx  —  PART 8: Master Integration
 * =========================================================================
 * Kyu chahiye: Ab tak Search (PART 5), Filter (PART 5), Card (PART 4),
 * Modal (PART 6) sab independent, testable pieces the. Ye component un
 * sabko ek single "Course Section" me jodta hai jo directly homepage/
 * landing page me drop kiya ja sakta hai.
 *
 * Data flow (single source of truth pattern):
 *   courses.data.js
 *        -> useCourseSearch (query se filter)
 *              -> useCourseFilter (category/level filter further apply)
 *                    -> CourseGrid (sirf final list render karta hai)
 *
 * Isse koi bhi ek jagah state confuse nahi hoti - search aur filter dono
 * sequentially apply hote hain, aur CourseGrid ko sirf "final result"
 * dikhna hota hai, usse pata nahi hona chahiye search/filter kaise kaam
 * karte hain (separation of concerns).
 *
 * NOTE FOR INTEGRATION: Maine hooks/components ka API is tarah assume
 * kiya hai (as per PART 5/6 naming already established):
 *   useCourseSearch(list, query)   -> filtered array
 *   useCourseFilter(list, filters) -> filtered array
 *   CourseSearch  props: { value, onChange, placeholder }
 *   CourseFilter  props: { activeFilter, onFilterChange, courses }
 * Agar actual hook signature thoda alag hai to sirf yahan ke 3 lines
 * (query/activeFilter wiring) adjust karne honge, baaki sab as-is chalega.
 * =========================================================================
 */

const CourseSection = () => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sectionRef = useRef(null);
  const glowRef = useRef(null);

  // Step 1: search apply
  const searchResults = useCourseSearch(courses, query);

  // Step 2: usi search result par filter apply - chaining se dono
  // ek saath kaam karte hain (e.g. "python" search + "beginner" filter)
  const filteredCourses = useCourseFilter(searchResults, activeFilter);

  // Initial mount par chhota "loading" simulate kiya - real app me yeh
  // API fetch ka wait hoga, abhi data.js se sync data hai isliye
  // sirf skeleton ka smooth entrance dikhane ke liye short delay.
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  // GSAP - ambient background glow loop. Ye Motion se nahi kiya kyunki
  // GSAP timeline-based infinite ambient loops ke liye zyada performant
  // aur predictable hai (single timeline, GPU-friendly transform only).
  useEffect(() => {
    if (!glowRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, {
        x: 80,
        y: -40,
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert(); // cleanup - memory leak / duplicate tween se bachne ke liye
  }, []);

  const handleCardSelect = useCallback((course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    // Course ko turant null nahi karte - modal close animation ke
    // dauraan content abhi bhi dikhna chahiye (flicker avoid karne ke liye)
    setTimeout(() => setSelectedCourse(null), 300);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="courses"
      className="
        relative w-full overflow-hidden
        bg-[#0a0a12]
        py-16 sm:py-20 lg:py-28
      "
    >
      {/* Ambient neon glow - purely decorative, cyberpunk depth ke liye.
          pointer-events-none taaki clicks block na ho */}
      <div
        ref={glowRef}
        className="
          absolute -top-40 left-1/4 w-[600px] h-[600px]
          rounded-full blur-[140px] opacity-25
          bg-gradient-to-br from-fuchsia-600 via-purple-600 to-cyan-500
          pointer-events-none
        "
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1800px] mx-auto px-4 sm:px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10 sm:mb-14"
        >
          <span
            className="
              inline-flex items-center gap-2
              px-3 py-1 mb-4 rounded-full
              text-xs font-medium tracking-wide uppercase
              text-fuchsia-300 bg-fuchsia-500/10
              border border-fuchsia-500/20
            "
          >
            <Sparkles className="w-3.5 h-3.5" />
            Choose Your Path
          </span>
          <h2
            className="
              text-3xl sm:text-4xl lg:text-5xl font-bold text-white
              tracking-tight
            "
          >
            Level Up With{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Jamia Academy
            </span>
          </h2>
          <p className="mt-3 text-white/50 text-sm sm:text-base max-w-xl mx-auto">
            Har course ek mission hai — apna skill tree unlock karo.
          </p>
        </motion.div>

        {/* Search + Filter toolbar */}
        <div
          className="
            flex flex-col md:flex-row items-stretch md:items-center
            gap-3 md:gap-4
            mb-8 sm:mb-10
          "
        >
          <div className="flex-1">
            <CourseSearch
              value={query}
              onChange={setQuery}
              placeholder="Course dhundo... (e.g. React, Python)"
            />
          </div>
          <CourseFilter
            courses={courses}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Result count - user ko feedback dena zaroori hai kitna match hua */}
        {!isLoading && (
          <p className="text-xs text-white/40 mb-4 px-1">
            {filteredCourses.length}{" "}
            {filteredCourses.length === 1 ? "course" : "courses"} mile
          </p>
        )}

        {/* Grid */}
        <CourseGrid
          courses={filteredCourses}
          isLoading={isLoading}
          onCardSelect={handleCardSelect}
        />
      </div>

      {/* Details modal - sirf ek instance, selectedCourse data-driven hai */}
      <CourseModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </section>
  );
};

export default CourseSection;
