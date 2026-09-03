import { useMemo, useState } from "react";
import Fuse from "fuse.js";

const FUSE_OPTIONS = {
  includeScore: true,
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 1,
  keys: [
    { name: "title", weight: 0.4 },
    { name: "description", weight: 0.15 },
    { name: "keywords", weight: 0.25 },
    { name: "hinglishKeywords", weight: 0.2 },
  ],
};

export function useCourseSearch(courses = []) {
  const [searchQuery, setSearchQuery] = useState("");

  const fuse = useMemo(() => new Fuse(courses, FUSE_OPTIONS), [courses]);

  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim();

    if (!query) return courses;

    if (query.length <= 2) {
      const lower = query.toLowerCase();
      const startsWithMatches = courses.filter((course) =>
        course.title?.toLowerCase().startsWith(lower)
      );

      return startsWithMatches.length > 0
        ? startsWithMatches
        : fuse.search(query).map((result) => result.item);
    }

    return fuse.search(query).map((result) => result.item);
  }, [courses, fuse, searchQuery]);

  return { searchQuery, setSearchQuery, filteredCourses };
}
