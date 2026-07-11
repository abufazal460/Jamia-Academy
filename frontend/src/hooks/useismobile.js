import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT_PX = 768;

/**
 * useIsMobile.js
 * -----------------------------------------------------------------------
 * Hinglish: 768px se neeche "mobile" maana gaya hai (jaisa brief me
 * explicitly likha hai). Ye hook resize par bhi update hota hai (rotate
 * ya browser resize case cover karne ke liye), lekin listener ek hi
 * baar attach hota hai — koi heavy computation nahi, sirf matchMedia.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.innerWidth < MOBILE_BREAKPOINT_PX
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT_PX - 1}px)`
    );

    // Initial sync (in case SSR/hydration mismatch ho)
    setIsMobile(mediaQuery.matches);

    function handleChange(event) {
      setIsMobile(event.matches);
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}