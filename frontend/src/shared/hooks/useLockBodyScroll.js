import { useEffect, useRef } from "react";

// Module-level (shared) lock state — Gallery Lightbox aur PageTransitionProvider
// dono isi single source of truth ko use karte hain, taaki koi bhi ek cleanup
// dusre ka active lock overwrite na kare (stale style re-apply na ho).
let lockCount = 0;
let savedStyles = null;
let savedScrollY = 0;

function applyLock() {
  const html = document.documentElement;
  const body = document.body;

  savedScrollY = window.scrollY;
  const scrollbarWidth = window.innerWidth - html.clientWidth;

  savedStyles = {
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
  body.style.top = `-${savedScrollY}px`;
  body.style.width = "100%";
  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${scrollbarWidth}px`;
  }
}

function releaseLock() {
  if (!savedStyles) return;
  const html = document.documentElement;
  const body = document.body;
  const styles = savedStyles;

  html.style.overflow = styles.htmlOverflow;
  body.style.overflow = styles.bodyOverflow;
  body.style.position = styles.bodyPosition;
  body.style.top = styles.bodyTop;
  body.style.width = styles.bodyWidth;
  body.style.paddingRight = styles.bodyPaddingRight;

  window.scrollTo(0, savedScrollY);
  savedStyles = null;
}

// Imperative helpers — non-hook consumers (e.g. PageTransitionProvider) inko
// use karke isi shared counter/snapshot me participate karte hain.
export function lockBodyScroll(lenis) {
  lockCount += 1;
  if (lockCount === 1) applyLock();
  lenis?.stop();
}

export function unlockBodyScroll(lenis) {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    releaseLock();
    lenis?.start();
  }
}

export function useLockBodyScroll(isLocked, options = {}) {
  const { lenis } = options;
  const hasAcquiredRef = useRef(false);

  useEffect(() => {
    if (!isLocked) return undefined;

    hasAcquiredRef.current = true;
    lockBodyScroll(lenis);

    return () => {
      if (!hasAcquiredRef.current) return; // StrictMode/double-invoke safe
      hasAcquiredRef.current = false;
      unlockBodyScroll(lenis);
    };
  }, [isLocked, lenis]);
}