import { useEffect, useRef } from "react";

/**
 *
 * @param {boolean} isLocked - true hone par scroll lock ho jaata hai
 * @param {{ lenis?: { stop: Function, start: Function, scroll?: number, scrollTo: Function } }} [options]
 */
export function useLockBodyScroll(isLocked, options = {}) {
  const { getLenis } = options;

  const scrollPositionRef = useRef(0);
  const originalStylesRef = useRef(null);
  // Kitne "lock" active hain — normally 1 hoga (ek hi modal), lekin
  // fast re-open/close cycles me temporarily 2 tak ja sakta hai.
  const lockCountRef = useRef(0);

  useEffect(() => {
    if (!isLocked) return;
    const lenis = getLenis?.();

    const html = document.documentElement;
    const body = document.body;

    lockCountRef.current += 1;

    // Sirf pehla lock hi styles capture + apply karta hai.
    if (lockCountRef.current === 1) {
      // Lenis active ho to uski internal scroll value use karo (source of
      // truth), warna window.scrollY par fallback karo.
      scrollPositionRef.current = lenis?.scroll ?? window.scrollY;

      const scrollbarWidth = window.innerWidth - html.clientWidth;

      originalStylesRef.current = {
        htmlOverflow: html.style.overflow,
        bodyOverflow: body.style.overflow,
        bodyPosition: body.style.position,
        bodyTop: body.style.top,
        bodyWidth: body.style.width,
        bodyPaddingRight: body.style.paddingRight,
      };

      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${scrollPositionRef.current}px`;
      body.style.width = "100%";
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }

      lenis?.stop();
    }

    return () => {
      lockCountRef.current -= 1;

      // Sirf tab restore karo jab koi bhi aur active lock na bacha ho.
      if (lockCountRef.current === 0) {
        const styles = originalStylesRef.current;
        html.style.overflow = styles.htmlOverflow;
        body.style.overflow = styles.bodyOverflow;
        body.style.position = styles.bodyPosition;
        body.style.top = styles.bodyTop;
        body.style.width = styles.bodyWidth;
        body.style.paddingRight = styles.bodyPaddingRight;

        if (lenis) {
          // Lenis khud apni scroll authority restore karta hai — koi
          // competing window.scrollTo() nahi, isliye scroll state
          // corrupt nahi hoti.
          lenis.start();
          lenis.scrollTo(scrollPositionRef.current, { immediate: true });
        } else {
          // Lenis available nahi hai (fallback case) — tabhi native
          // scrollTo use karo.
          window.scrollTo(0, scrollPositionRef.current);
        }
      }
    };
  }, [isLocked, lenis]);
}