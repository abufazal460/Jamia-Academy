import { useEffect, useRef } from "react";

export function useLockBodyScroll(isLocked, options = {}) {
  const { lenis } = options;
  const scrollPositionRef = useRef(0);
  const originalStylesRef = useRef(null);

  useEffect(() => {
    if (!isLocked) return;

    const html = document.documentElement;
    const body = document.body;

    scrollPositionRef.current = window.scrollY;

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

    return () => {
      const styles = originalStylesRef.current;
      html.style.overflow = styles.htmlOverflow;
      body.style.overflow = styles.bodyOverflow;
      body.style.position = styles.bodyPosition;
      body.style.top = styles.bodyTop;
      body.style.width = styles.bodyWidth;
      body.style.paddingRight = styles.bodyPaddingRight;

      window.scrollTo(0, scrollPositionRef.current);

      lenis?.start();
    };
  }, [isLocked, lenis]);
}