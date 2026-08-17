import { useState, useEffect, useRef, useCallback } from "react";

const NORMAL_INTERVAL_MS = 5000; // normal autoplay speed
const FAST_INTERVAL_MS = 5000;   // hover ke time ki speed

const useHeroSlider = (slideCount, { autoplay = true } = {}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [intervalDuration, setIntervalDuration] = useState(NORMAL_INTERVAL_MS);
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
      if (index < 0 || index >= slideCount) return;
      setActiveIndex(index);
    },
    [slideCount]
  );

  // Hover shuru hote hi speed fast ho jaye
  const speedUp = useCallback(() => setIntervalDuration(FAST_INTERVAL_MS), []);
  // Hover hatte hi wapas normal speed
  const speedDown = useCallback(() => setIntervalDuration(NORMAL_INTERVAL_MS), []);

  useEffect(() => {
    if (!autoplay || slideCount <= 1) return undefined;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount);
    }, intervalDuration);

    // Duration change hote hi purana timer clear hoke naya turant sahi speed se start hota hai
    return () => clearInterval(intervalRef.current);
  }, [autoplay, slideCount, intervalDuration]);

  return { activeIndex, goToNext, goToPrev, goToSlide, speedUp, speedDown };
};

export default useHeroSlider;