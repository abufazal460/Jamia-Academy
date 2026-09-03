import { useState, useEffect, useRef, useCallback } from "react";

const NORMAL_INTERVAL_MS = 5000;
const FAST_INTERVAL_MS = 5000;

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

  const speedUp = useCallback(() => setIntervalDuration(FAST_INTERVAL_MS), []);
  const speedDown = useCallback(() => setIntervalDuration(NORMAL_INTERVAL_MS), []);

  useEffect(() => {
    if (!autoplay || slideCount <= 1) return undefined;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount);
    }, intervalDuration);

    return () => clearInterval(intervalRef.current);
  }, [autoplay, slideCount, intervalDuration]);

  return { activeIndex, goToNext, goToPrev, goToSlide, speedUp, speedDown };
};

export default useHeroSlider;