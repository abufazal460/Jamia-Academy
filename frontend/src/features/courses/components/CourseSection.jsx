import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { motion } from "motion/react";

import CourseSearch from "./CourseSearch";
import CourseFilter from "./CourseFilter";
import CourseGrid from "./CourseGrid";
import CourseModal from "./CourseModal";

import { coursesData as courses } from "../data/courses.data";
import { useCourseFilter } from "../hooks/useCourseFilter";
import { openWhatsApp } from "../../../shared/utils/whatsapp";

const CourseSection = () => {

  const [searchedCourses, setSearchedCourses] = useState(courses);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sectionRef = useRef(null);
  const glowRef = useRef(null);

  const { filters, setFilters, resetFilters, applyFilters } =
    useCourseFilter();

  const filteredCourses = useMemo(
    () => applyFilters(searchedCourses),
    [applyFilters, searchedCourses]
  );

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

    return () => ctx.revert();
  }, []);

  const handleViewDetails = useCallback((course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCourse(null), 300);
  }, []);

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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 sm:mb-10"
        >
          <CourseSearch courses={courses} onResultsChange={setSearchedCourses} />
        </motion.div>
        <div className="mb-8 sm:mb-10">
          <CourseFilter
            courses={courses}
            filters={filters}
            onFilterChange={setFilters}
            onReset={resetFilters}
          />
        </div>

        <p className="text-xs text-white/40 mb-4 px-1">
          {filteredCourses.length}{" "}
          {filteredCourses.length === 1 ? "course" : "courses"} mile
        </p>

        <CourseGrid
          courses={filteredCourses}
          onViewDetails={handleViewDetails}
          onEnroll={handleEnroll}
        />
      </div>

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
