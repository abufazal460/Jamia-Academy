import { useEffect, useRef } from "react";

/**
 * useLockBodyScroll
 *
 * Modal open hote hi background page ka scroll freeze karna zaroori hai.
 *
 * IMPORTANT — Lenis (smooth scroll):
 * Sirf `body.style.overflow = "hidden"` Lenis ko NAHI rokta — Lenis apna
 * khud ka requestAnimationFrame-based scroll loop chalata hai jo native
 * overflow property ko ignore kar deta hai. Isliye background "locked"
 * dikhta hai lekin scroll hota rehta hai. Fix: Lenis instance ko explicitly
 * `.stop()` / `.start()` karna padta hai — isliye hook ko dusre argument
 * me optional `lenis` instance pass karo.
 *
 * @param {boolean} isLocked
 * @param {{ lenis?: { stop: Function, start: Function } }} [options]
 */
export function useLockBodyScroll(isLocked, options = {}) {
  const { lenis } = options;
  const scrollPositionRef = useRef(0);
  const originalStylesRef = useRef(null);

  useEffect(() => {
    if (!isLocked) return;

    const html = document.documentElement;
    const body = document.body;

    // Scroll position save — modal band hone par exactly wahin wapas
    // laane ke liye (position:fixed lagane se scroll 0 pe reset ho jaata hai).
    scrollPositionRef.current = window.scrollY;

    // Scrollbar hatne se page right-shift ("jump") hoti hai — usse
    // right padding se compensate karte hain taaki layout shift na dikhe.
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    originalStylesRef.current = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
    };

    // html + body dono lock — mobile Safari jaise browsers me actual
    // scroll <html> pe hota hai, sirf body overflow:hidden kaam nahi karta.
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    // position:fixed sabse reliable tarika hai touch/trackpad scroll ko
    // bhi poori tarah rokne ka (sirf overflow:hidden mobile pe leaky hota hai).
    body.style.position = "fixed";
    body.style.top = `-${scrollPositionRef.current}px`;
    body.style.width = "100%";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Asli fix: Lenis ko explicitly stop karo, warna wo body ke overflow
    // lock ko ignore karke apna smooth-scroll animation chalata rehta hai.
    lenis?.stop();

    return () => {
      const styles = originalStylesRef.current;
      html.style.overflow = styles.htmlOverflow;
      body.style.overflow = styles.bodyOverflow;
      body.style.position = styles.bodyPosition;
      body.style.top = styles.bodyTop;
      body.style.width = styles.bodyWidth;
      body.style.paddingRight = styles.bodyPaddingRight;

      // position:fixed hatne ke baad browser top pe scroll kar deta hai —
      // isliye scrollTo se exact purani position wapas set karte hain.
      window.scrollTo(0, scrollPositionRef.current);

      lenis?.start();
    };
  }, [isLocked, lenis]);
}