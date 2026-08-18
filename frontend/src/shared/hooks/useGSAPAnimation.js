// File: useGSAPAnimation.js
// Purpose: GSAP context ko React lifecycle ke andar safely create/cleanup karna
// Responsibility: Memory leaks aur duplicate ScrollTrigger instances (especially HMR ke time) rokna
// Future Usage: Har section jo GSAP timeline use karegi, ye hook use karegi
// Dependencies: react, gsap

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * useGSAPAnimation
 * Ye hook kya karta hai: gsap.context() bana ke ek scoped ref return karta hai
 * Kyu banaya gaya: taaki selectors sirf apne component ke andar scoped rahein, global na ho
 * Kab call hoga: jab bhi kisi section ko apni GSAP animation chalani ho
 * Kya return karega: { scope } — is ref ko root DOM element pe lagana hai
 *
 * @param {Function} animationCallback - GSAP animation define karne wala function (context, scope) => {}
 * @param {Array} deps - dependency array, jaisa useEffect me hota hai
 */
const useGSAPAnimation = (animationCallback, deps = []) => {
  const scope = useRef(null);

  useEffect(() => {
    if (!scope.current || typeof animationCallback !== "function") return undefined;

    // gsap.context() sab animations ko is DOM node ke andar scope kar deta hai
    const ctx = gsap.context(() => {
      animationCallback(scope);
    }, scope);

    // Cleanup: unmount ya deps change hone par saari animations aur ScrollTriggers revert ho jayengi
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
};

export default useGSAPAnimation;
