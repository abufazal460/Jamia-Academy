import { useEffect, useState } from "react";
import { breakpoints } from "../constants/breakpoints";

const useMediaQuery = (breakpointKeyOrQuery) => {
  const query = breakpoints[breakpointKeyOrQuery]
    ? `(min-width: ${breakpoints[breakpointKeyOrQuery]}px)`
    : breakpointKeyOrQuery;

  const getMatch = () =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false;

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
