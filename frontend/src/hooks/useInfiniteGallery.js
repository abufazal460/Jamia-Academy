// src/hooks/useInfiniteGallery.js
//
// YEH HOOK "AUTO LOOP LOGIC" ka core hai.
//
// Original demo mein hardcoded tha: "first 3 items clone karo".
// Hum yeh hardcode NAHI karte. Hum runtime pe pata karte hain ki
// abhi kitne columns visible hain (desktop=3 / tablet=2 / mobile=1,
// ya jo bhi props mein diya gaya ho), aur usi count ke barabar
// items ko start se clone karke end mein append karte hain.
//
// Isse infinite-loop illusion har screen size pe sahi dikhta hai,
// chahe images 6 ho, 60 ho, ya 600.

import { useEffect, useMemo, useState } from "react";

/**
 * @param {Array} images - raw data array (from galleryData.js or props)
 * @param {{desktop:number, tablet:number, mobile:number}} columnsConfig
 * @param {{tabletBreakpoint?:number, mobileBreakpoint?:number}} breakpoints
 */
export function useInfiniteGallery(
  images,
  columnsConfig = { desktop: 3, tablet: 2, mobile: 1 },
  breakpoints = { tabletBreakpoint: 1024, mobileBreakpoint: 640 }
) {
  const { tabletBreakpoint, mobileBreakpoint } = breakpoints;

  // ----- 1. Track viewport width safely (SSR-safe default) -----
  const getWidth = () => (typeof window !== "undefined" ? window.innerWidth : desktopFallback());
  const desktopFallback = () => 1280;

  const [viewportWidth, setViewportWidth] = useState(getWidth);

  useEffect(() => {
    // Resize ko throttle karte hain (rAF ke through) taaki
    // scroll/resize ke waqt unnecessary re-renders na ho.
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

  // ----- 2. Derive active column count from current breakpoint -----
  // Yeh kabhi bhi 3 hardcode nahi karta — columnsConfig se hi aata hai,
  // to agar future mein koi columns={{desktop:4, tablet:2, mobile:1}}
  // pass kare, yeh apne aap adapt ho jayega.
  const activeColumns = useMemo(() => {
    if (viewportWidth <= mobileBreakpoint) return columnsConfig.mobile;
    if (viewportWidth <= tabletBreakpoint) return columnsConfig.tablet;
    return columnsConfig.desktop;
  }, [viewportWidth, columnsConfig, mobileBreakpoint, tabletBreakpoint]);

  // ----- 3. Build the looped/cloned item list generically -----
  // "clone(3)" jaise hardcode ki jagah hum `activeColumns` items
  // ko start se copy karke end mein daal dete hain. Agar kabhi
  // images.length < activeColumns ho (edge case — bohot kam images),
  // to hum poori list repeat kar dete hain taaki loop tootay na.
  const loopedItems = useMemo(() => {
    if (!images || images.length === 0) return [];

    const cloneCount = Math.min(activeColumns, images.length);
    const clones = images.slice(0, cloneCount).map((item, i) => ({
      ...item,
      // unique key chahiye hoti hai kyunki id duplicate ho jayega
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
