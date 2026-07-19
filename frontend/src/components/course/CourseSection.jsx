import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

import CourseSearch from "./CourseSearch";
import CourseFilter from "./CourseFilter";
import CourseGrid from "./CourseGrid";
import CourseModal from "./CourseModal";

import { coursesData as courses } from "../../data/courses.data";
import { useCourseFilter } from "../../hooks/useCourseFilter";
import { openWhatsApp } from "../../utils/whatsapp";

/**
 * CourseSection.jsx  —  Corrected Integration (Production Audit fix)
 * =========================================================================
 * AUDIT ME MILA BUG: Pehle wali file `courses.data.js` se `{ courses }`
 * import kar rahi thi, jabki actual export `coursesData` hai — isse
 * page render hote hi crash hoti thi. Yahan named import ko alias kiya:
 * `coursesData as courses` — baaki poore file me variable naam same
 * rakha taaki neeche ka code minimal badle.
 *
 * SEARCH OWNERSHIP FIX: `CourseSearch.jsx` khud apna `useCourseSearch`
 * call karta hai aur apna "OUR COURSES" heading bhi render karta hai —
 * isliye CourseSection ab duplicate heading/search state NAHI rakhta.
 * Search ka final result `onResultsChange` callback se yahan aata hai.
 * Data flow ab: CourseSearch (apna state+heading) -> onResultsChange
 * -> yahan `searchedCourses` me store -> useCourseFilter().applyFilters()
 * -> CourseGrid.
 *
 * FILTER FIX: `useCourseFilter()` zero-argument hook hai jo
 * { filters, setFilters, resetFilters, applyFilters } deta hai —
 * `applyFilters(list)` khud call karna padta hai, hook khud filter
 * kiya hua array nahi deta. Pehle wala code isko array maan raha tha.
 *
 * MODAL + ENROLL FIX: CourseGrid ab `onViewDetails`/`onEnroll` dono
 * pass karta hai (CourseCard ka real prop contract). Enroll click par
 * seedha `openWhatsApp` call hota hai — EnrollButton.jsx ki tarah hi
 * whatsapp.js ka istemal, bina us component ko touch kiye.
 * =========================================================================
 */

const CourseSection = () => {
  // CourseSearch apna query state khud rakhta hai — yahan sirf uska
  // "current result" store hota hai taaki filter usi par chal sake.
  const [searchedCourses, setSearchedCourses] = useState(courses);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sectionRef = useRef(null);
  const glowRef = useRef(null);

  // useCourseFilter() argument nahi leta — filters state + pure
  // applyFilters(list) function deta hai jo hum khud call karte hain.
  const { filters, setFilters, resetFilters, applyFilters } =
    useCourseFilter();

  // Search result par filter apply — dono chain hote hain isliye
  // "python" search + "beginner" filter jaisi combined query kaam karti hai.
  const filteredCourses = applyFilters(searchedCourses);

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

  const handleViewDetails = useCallback((course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    // Course ko turant null nahi karte - modal close animation ke
    // dauraan content abhi bhi dikhna chahiye (flicker avoid karne ke liye)
    setTimeout(() => setSelectedCourse(null), 300);
  }, []);

  // Enroll ek hi jagah se trigger hota hai — CourseCard aur CourseModal
  // dono isi handler ko call karte hain, WhatsApp logic duplicate nahi hai.
  const handleEnroll = useCallback((course) => {
    openWhatsApp(course);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="courses"
      aria-labelledby="courses-heading"
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
        {/* CourseSearch apna "OUR COURSES" heading + search UI dono khud
            render karta hai — isliye yahan koi separate <h2> nahi hai,
            warna SEO ke liye duplicate H2 ban jaata (audit issue tha). */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 sm:mb-10"
        >
          <CourseSearch courses={courses} onResultsChange={setSearchedCourses} />
        </motion.div>

        {/* Filter row - CourseFilter ka real prop contract:
            filters object + onFilterChange(key, value) + onReset() */}
        <div className="mb-8 sm:mb-10">
          <CourseFilter
            courses={courses}
            filters={filters}
            onFilterChange={setFilters}
            onReset={resetFilters}
          />
        </div>

        {/* Result count - user ko feedback dena zaroori hai kitna match hua */}
        <p className="text-xs text-white/40 mb-4 px-1">
          {filteredCourses.length}{" "}
          {filteredCourses.length === 1 ? "course" : "courses"} mile
        </p>

        {/* Grid - CourseCard ka real prop contract onViewDetails/onEnroll hai,
            onClick nahi (audit issue tha, ab fix hai) */}
        <CourseGrid
          courses={filteredCourses}
          onViewDetails={handleViewDetails}
          onEnroll={handleEnroll}
        />
      </div>

      {/* Details modal - sirf ek instance, selectedCourse data-driven hai.
          Modal ke andar ka "Enroll Now" bhi isi handleEnroll ko use karta
          hai - WhatsApp logic sirf ek jagah (whatsapp.js) se aata hai. */}
      <CourseModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onEnroll={handleEnroll}
      />
    </section>
  );
};

export default CourseSection;
