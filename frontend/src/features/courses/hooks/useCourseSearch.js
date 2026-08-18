import { useMemo, useState } from "react";
import Fuse from "fuse.js";

// Ye hook SIRF search ki responsibility rakhta hai. Category/level/duration
// filters jaan-bujhkar yahan nahi hain (wo useCourseFilter me hain) — dono
// hooks independent rehte hain taaki CourseSection unhe apni marzi se
// kisi bhi order me chain kar sake: applyFilters(filteredCourses) ya ulta.
const FUSE_OPTIONS = {
  includeScore: true,
  // threshold thoda lenient rakha hai (0.35) taaki typing mistakes
  // (jaise "pyhton") bhi Python Programming tak match ho jaayein.
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 1,
  keys: [
    { name: "title", weight: 0.4 },
    { name: "description", weight: 0.15 },
    { name: "keywords", weight: 0.25 },
    // hinglishKeywords ko bhi index karte hain taaki "python sikhna hai"
    // jaisi natural Hinglish query bhi seedhe match ho jaaye.
    { name: "hinglishKeywords", weight: 0.2 },
  ],
};

/**
 * useCourseSearch
 *
 * @param {Array} courses - poora courses array jispe search chalega
 * @returns {{ searchQuery: string, setSearchQuery: Function, filteredCourses: Array }}
 */
export function useCourseSearch(courses = []) {
  const [searchQuery, setSearchQuery] = useState("");

  // Fuse instance sirf tab dobara banta hai jab `courses` khud change ho —
  // static/rarely-changing data ke case me ye practically ek hi baar banega,
  // har keystroke pe naya Fuse() banana (aur poora index rebuild karna) waste hai.
  const fuse = useMemo(() => new Fuse(courses, FUSE_OPTIONS), [courses]);

  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim();

    // Khaali query pe poora list dikhado — koi filtering cost nahi.
    if (!query) return courses;

    // Starting-letter search: 1-2 character queries (jaise "w") ke liye
    // fuzzy matching kabhi kabhi irrelevant/noisy results de deta hai,
    // isliye chhoti queries ke liye seedha "title startsWith" check better hai.
    if (query.length <= 2) {
      const lower = query.toLowerCase();
      const startsWithMatches = courses.filter((course) =>
        course.title?.toLowerCase().startsWith(lower)
      );

      // Agar starting-letter se kuch na mile, fuzzy search pe fallback kar do
      // (e.g. koi single-char query jo title me kahin beech me match karti ho).
      return startsWithMatches.length > 0
        ? startsWithMatches
        : fuse.search(query).map((result) => result.item);
    }

    // Normal + Hinglish + fuzzy — teeno isi ek Fuse.search() call se handle
    // ho jaate hain kyunki title/description/keywords/hinglishKeywords sab
    // indexed hain.
    return fuse.search(query).map((result) => result.item);
  }, [courses, fuse, searchQuery]);

  return { searchQuery, setSearchQuery, filteredCourses };
}
