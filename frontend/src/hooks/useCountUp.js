// File: useCountUp.js
// Purpose: Number counter ko sirf tab trigger karna jab wo viewport me visible ho
// Responsibility: react-intersection-observer ke saath inView state manage karna
// Future Usage: StatsSection me AnimatedCounter component ke andar
// Dependencies: react-intersection-observer

import { useInView } from "react-intersection-observer";

/**
 * useCountUp
 * Ye hook kya karta hai: ek ref aur inView boolean deta hai
 * Kyu banaya gaya: taaki counter sirf screen pe aane par animate ho, load hote hi nahi
 * Kab call hoga: Stats section ke har counter card ke andar
 * Kya return karega: { ref, inView } — ref ko wrapper element pe lagana hai
 *
 * @param {Object} options - { triggerOnce, threshold }
 */
const useCountUp = (options = {}) => {
  const { triggerOnce = false, threshold = 0.4 } = options;

  const { ref, inView } = useInView({
    triggerOnce, // false rakhne se scroll upar-neeche karne par counter replay hoga
    threshold,
  });

  return { ref, inView };
};

export default useCountUp;
