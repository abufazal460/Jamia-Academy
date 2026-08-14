import { useState, useEffect, useRef, useCallback } from "react";

const AUTOPLAY_INTERVAL_MS = 5000;

/**
 * Hero slider ka pura brain yahan hai — active slide, autoplay timer, aur cleanup.
 * Koi bhi component number of slides pe assume nahi karta, slideCount dynamic hai.
 */
const useHeroSlider = (slideCount, { autoplay = true } = {}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (slideCount === 0 ? 0 : (prev + 1) % slideCount));
  }, [slideCount]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) =>
      slideCount === 0 ? 0 : (prev - 1 + slideCount) % slideCount
    );
  }, [slideCount]);

  const goToSlide = useCallback(
    (index) => {
      if (index < 0 || index >= slideCount) return; // invalid index ko silently ignore
      setActiveIndex(index);
    },
    [slideCount]
  );

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  // Autoplay — sirf ek interval chalta hai, dependency change pe purana clear hoke naya banta hai
  useEffect(() => {
    if (!autoplay || isPaused || slideCount <= 1) return undefined;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount);
    }, AUTOPLAY_INTERVAL_MS);

    // Unmount ya dependency change pe timer hamesha clear — memory leak se bachne ke liye
    return () => clearInterval(intervalRef.current);
  }, [autoplay, isPaused, slideCount]);

  return { activeIndex, goToNext, goToPrev, goToSlide, pause, resume };
};

export default useHeroSlider;