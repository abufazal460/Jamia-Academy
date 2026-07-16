// File: usePrefersReducedMotion.js
// Purpose: OS-level "reduce motion" accessibility setting detect karna
// Responsibility: Har animation hook/component isse pehle check karega — accessibility ke liye critical
// Future Usage: GSAP/Framer animations conditionally simplify ya disable karne ke liye
// Dependencies: react

import { useEffect, useState } from "react";

/**
 * usePrefersReducedMotion
 * Ye hook kya karta hai: user ne OS settings me reduced motion on kiya hai ya nahi, batata hai
 * Kyu banaya gaya: accessibility compliance ke liye — motion-sensitive users ko heavy animation na dikhe
 * Kab call hoga: har animation-heavy component ke start me
 * Kya return karega: boolean
 */
const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQueryList = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReduced(mediaQueryList.matches);

    handleChange();
    mediaQueryList.addEventListener("change", handleChange);

    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, []);

  return prefersReduced;
};

export default usePrefersReducedMotion;
