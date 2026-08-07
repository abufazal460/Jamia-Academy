import { useCallback } from "react";
import { getLenisInstance } from "../components/smoothScroll/SmoothScroll";

/**
 * useLenisScroll — anchor links (#contact jaise) ko smoothly scroll
 * karne ke liye lightweight hook. Directly Lenis singleton instance
 * (SmoothScroll.jsx se) use karta hai, koi extra Context nahi chahiye.
 */
export default function useLenisScroll() {
  const scrollTo = useCallback((target, options = {}) => {
    const lenis = getLenisInstance();

    // Agar Lenis abhi ready nahi hai (edge case: bahut jaldi call ho gaya)
    // to native fallback taaki link kabhi bhi "dead" na lage.
    if (!lenis) {
      const el =
        typeof target === "string" ? document.querySelector(target) : target;
      el?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    lenis.scrollTo(target, {
      offset: options.offset ?? 0,
      duration: options.duration ?? 1.5,
      easing:
        options.easing ??
        ((t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))),
    });
  }, []);

  return { scrollTo };
}