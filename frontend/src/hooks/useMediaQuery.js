// File: useMediaQuery.js
// Purpose: JS-side breakpoint detection — constants/breakpoints.js ke saath sync
// Responsibility: Conditionally heavy animations disable karna mobile pe, layout logic decide karna
// Future Usage: Heavy blur/parallax effects ko chhote screens pe skip karne ke liye
// Dependencies: react, constants/breakpoints.js

import { useEffect, useState } from "react";
import { breakpoints } from "../constants/breakpoints";

/**
 * useMediaQuery
 * Ye hook kya karta hai: diya gaya media query match karta hai ya nahi, boolean deta hai
 * Kyu banaya gaya: taaki components conditionally render/behave kar sakein screen size ke hisaab se
 * Kab call hoga: responsive JS logic chahiye ho (sirf CSS classes se kaam na chale)
 * Kya return karega: boolean
 *
 * @param {string} breakpointKeyOrQuery - constants/breakpoints.js ki key (e.g. "lg") ya raw media query string
 */
const useMediaQuery = (breakpointKeyOrQuery) => {
  const query = breakpoints[breakpointKeyOrQuery]
    ? `(min-width: ${breakpoints[breakpointKeyOrQuery]}px)`
    : breakpointKeyOrQuery;

  const getMatch = () =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false; // SSR-safe default

  const [matches, setMatches] = useState(getMatch);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQueryList = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQueryList.matches);

    handleChange();
    mediaQueryList.addEventListener("change", handleChange);

    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
};

export default useMediaQuery;
