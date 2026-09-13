import { useState, useEffect, useRef, useCallback } from "react";

const NORMAL_INTERVAL_MS = 5000;
const HOVER_INTERVAL_MS = 9000;

const useHeroSlider = (slides, { autoplay = true } = {}) => {
  const slideCount = slides.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [intervalDuration, setIntervalDuration] =
    useState(NORMAL_INTERVAL_MS);

  const intervalRef = useRef(null);

  const isVideoActive = slides[activeIndex]?.type === "video";

  const goToNext = useCallback(() => {
    setActiveIndex((prev) =>
      slideCount === 0 ? 0 : (prev + 1) % slideCount
    );
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

  const speedUp = useCallback(() => {
    if (isVideoActive) return;

    setIntervalDuration(HOVER_INTERVAL_MS);
  }, [isVideoActive]);

  const speedDown = useCallback(() => {
    setIntervalDuration(NORMAL_INTERVAL_MS);
  }, []);

  /*
   * Video active hote hi normal slider timer reset karo.
   * Video khud onEnded ke through next slide control karegi.
   */
  useEffect(() => {
    if (isVideoActive) {
      setIntervalDuration(NORMAL_INTERVAL_MS);
    }
  }, [isVideoActive]);

  /*
   * Image slides ke liye autoplay.
   * Video slides ke liye timer completely disabled.
   */
  useEffect(() => {
    if (
      !autoplay ||
      slideCount <= 1 ||
      isVideoActive
    ) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      return undefined;
    }

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount);
    }, intervalDuration);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [
    autoplay,
    slideCount,
    intervalDuration,
    isVideoActive,
  ]);

  return {
    activeIndex,
    goToNext,
    goToPrev,
    goToSlide,
    speedUp,
    speedDown,
  };
};

export default useHeroSlider;