import { useState, useEffect, useRef, useCallback } from "react";

const NORMAL_INTERVAL_MS = 5000;
// BUG FIX: pehle FAST_INTERVAL_MS bhi 5000 tha (NORMAL_INTERVAL_MS ke
// bilkul barabar) — matlab speedUp()/speedDown() call hone ke baad bhi
// interval kabhi actually change hi nahi hota tha (dead logic, hover/focus
// pe koi visible effect nahi tha). Ab hover/keyboard-focus pe autoplay
// thoda SLOW ho jaata hai (interval badh jaata hai), taaki user ko slide
// padhne/interact karne ka time mile — ye standard, accessible carousel
// UX pattern hai. Function names (speedUp/speedDown) same rakhe hain
// taaki Hero.jsx mein koi breaking change na ho.
const HOVER_INTERVAL_MS = 9000;

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

  const speedUp = useCallback(() => setIntervalDuration(HOVER_INTERVAL_MS), []);
  const speedDown = useCallback(() => setIntervalDuration(NORMAL_INTERVAL_MS), []);

  useEffect(() => {
    if (!autoplay || slideCount <= 1) return undefined;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount);
    }, intervalDuration);

    // Cleanup — interval clear karo taaki multiple timers stack na hon
    // (component unmount ho ya intervalDuration change ho, dono cases mein)
    return () => clearInterval(intervalRef.current);
  }, [autoplay, slideCount, intervalDuration]);

  return { activeIndex, goToNext, goToPrev, goToSlide, speedUp, speedDown };
};

export default useHeroSlider;
