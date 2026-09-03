import { useCallback, useMemo, useState } from "react";

const DEFAULT_FILTERS = {
  category: null,
  level: null,
  duration: null,
};

export function useCourseFilter() {
  const [filters, setFiltersState] = useState(DEFAULT_FILTERS);

  const setFilters = useCallback((key, value) => {
    setFiltersState((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  }, []);

  const resetFilters = useCallback(() => setFiltersState(DEFAULT_FILTERS), []);

  const applyFilters = useCallback(
    (courses = []) => {
      const { category, level, duration } = filters;

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
