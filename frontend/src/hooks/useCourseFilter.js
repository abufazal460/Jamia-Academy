import { useCallback, useMemo, useState } from "react";

const DEFAULT_FILTERS = {
  category: null,
  level: null,
  duration: null,
};

/**
 * useCourseFilter
 *
 * Search se bilkul alag hook — sirf category/level/duration selection state
 * rakhta hai aur ek pure `applyFilters(courses)` function deta hai jo kisi
 * bhi course list ko current filters ke hisaab se narrow kar deta hai.
 * Isse parent (CourseSection) search results ke upar bhi chain kar sakta hai:
 *   applyFilters(searchFilteredCourses)
 *
 * @returns {{
 *   filters: { category: string|null, level: string|null, duration: string|null },
 *   setFilters: (key: string, value: string) => void,
 *   resetFilters: () => void,
 *   applyFilters: (courses: Array) => Array,
 *   hasActiveFilters: boolean
 * }}
 */
export function useCourseFilter() {
  const [filters, setFiltersState] = useState(DEFAULT_FILTERS);

  // Ek hi filter key update karta hai. Same value pe dobara select karne se
  // wo filter clear (toggle off) ho jaata hai — chip/dropdown UI me ye
  // expected UX hai (dobara click = deselect).
  const setFilters = useCallback((key, value) => {
    setFiltersState((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  }, []);

  const resetFilters = useCallback(() => setFiltersState(DEFAULT_FILTERS), []);

  // Pure filtering function — koi state read/write nahi karta, sirf current
  // `filters` closure use karta hai. useCallback isliye taaki jab tak filters
  // na badlein, parent ko wahi function reference mile (memoized children
  // re-render se bach sakein).
  const applyFilters = useCallback(
    (courses = []) => {
      const { category, level, duration } = filters;

      // Koi filter active hi nahi hai to poora array wapas — filter() call
      // karke bhi bewajah nayi array reference banane se bachne ke liye.
      if (!category && !level && !duration) return courses;

      return courses.filter((course) => {
        const matchesCategory = !category || course.category?.includes(category);
        const matchesLevel = !level || course.level?.name === level;
        const matchesDuration =
          !duration ||
          `${course.duration?.value} ${course.duration?.unit}` === duration;

        return matchesCategory && matchesLevel && matchesDuration;
      });
    },
    [filters]
  );

  const hasActiveFilters = useMemo(
    () => Object.values(filters).some(Boolean),
    [filters]
  );

  return { filters, setFilters, resetFilters, applyFilters, hasActiveFilters };
}
