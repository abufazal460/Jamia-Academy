import { useEffect, useMemo, useState } from "react";

export function useInfiniteGallery(
  images,
  columnsConfig = { desktop: 3, tablet: 2, mobile: 1 },
  breakpoints = { tabletBreakpoint: 1024, mobileBreakpoint: 640 }
) {
  const { tabletBreakpoint, mobileBreakpoint } = breakpoints;

  const getWidth = () => (typeof window !== "undefined" ? window.innerWidth : desktopFallback());
  const desktopFallback = () => 1280;

  const [viewportWidth, setViewportWidth] = useState(getWidth);

  useEffect(() => {
    let frame = null;
    const handleResize = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setViewportWidth(window.innerWidth);
        frame = null;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const activeColumns = useMemo(() => {
    if (viewportWidth <= mobileBreakpoint) return columnsConfig.mobile;
    if (viewportWidth <= tabletBreakpoint) return columnsConfig.tablet;
    return columnsConfig.desktop;
  }, [viewportWidth, columnsConfig, mobileBreakpoint, tabletBreakpoint]);

  const loopedItems = useMemo(() => {
    if (!images || images.length === 0) return [];

    const cloneCount = Math.min(activeColumns, images.length);
    const clones = images.slice(0, cloneCount).map((item, i) => ({
      ...item,
      _loopKey: `clone-${item.id}-${i}`,
      _isClone: true,
    }));

    const original = images.map((item) => ({
      ...item,
      _loopKey: `item-${item.id}`,
      _isClone: false,
    }));

    return [...original, ...clones];
  }, [images, activeColumns]);

  return { activeColumns, loopedItems, viewportWidth };
}
