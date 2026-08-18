import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * useCertificateReducedMotion
 * OS-level "reduce motion" preference ko track karta hai taaki animations
 * conditionally simplify ho sakein — accessibility requirement hai.
 * Note: agar aapke paas already ek generic useReducedMotion hook hai
 * (jaise contact module me), to yeh naya hook delete karke wahi generic
 * hook reuse karna better hai — yeh purely OS-preference read karta hai,
 * certificate-specific kuch nahi hai isme.
 */
export function useCertificateReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(QUERY).matches : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);
    const handleChange = (event) => setPrefersReduced(event.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReduced;
}
