// File: useWindowSize.js
// Purpose: Viewport width/height ko reactively track karna (debounced)
// Responsibility: Responsive animation value calculations (jaise parallax strength) ke liye
// Future Usage: Hero decorative layers, GSAP timelines jinhe resize pe recalculate karna hai
// Dependencies: react

import { useEffect, useState } from "react";

/**
 * useWindowSize
 * Ye hook kya karta hai: current window width/height return karta hai, resize pe update hota hai
 * Kyu banaya gaya: taaki components ko dynamic viewport-based calculations mil sakein
 * Kab call hoga: jab kisi animation ya layout logic ko exact viewport size chahiye
 * Kya return karega: { width, height }
 */
const useWindowSize = () => {
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    let timeoutId = null;

    // Debounce: resize event bar-bar fire hota hai, isliye 150ms delay lagaya gaya hai
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return size;
};

export default useWindowSize;
