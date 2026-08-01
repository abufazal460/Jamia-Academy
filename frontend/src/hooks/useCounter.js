import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

/**
 * useCounter
 * ----------
 * Ye hook 0 se target value tak number ko animate karta hai, lekin SIRF
 * jab element viewport mein visible ho (performance ke liye — offscreen
 * counters ki wajah se khamakha CPU waste nahi hota).
 *
 * "once: true" ka matlab — animation sirf ek baar chalegi. Baar baar
 * scroll up/down karne pe number repeat nahi hoga (distracting lagta hai
 * aur unnecessary re-renders bhi bachte hain).
 *
 * requestAnimationFrame use kiya hai (na ki setInterval) kyunki ye
 * browser ke repaint cycle ke saath sync rehta hai — isse animation
 * smooth 60FPS ke kareeb rehti hai aur battery-friendly bhi hai.
 *
 * PATCH: import "motion/react" se (framer-motion se nahi) — stack consistency.
 */
export function useCounter(target = 0, duration = 1800) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Jab tak element view mein nahi aaya, kuch mat karo
    if (!isInView) return;

    let rafId;
    const startTime = performance.now();

    // Ease-out cubic curve — shuru mein fast movement, end mein slow ho
    // jaata hai (natural aur premium feel deta hai counting ko)
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setCount(target); // rounding error avoid karne ke liye exact value set
      }
    };

    rafId = requestAnimationFrame(tick);

    // Cleanup — component unmount ho jaye to pending frame cancel karo
    // (memory leak / "setState on unmounted component" warning se bachne ke liye)
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, duration]);

  return { ref, count, isInView };
}