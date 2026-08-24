// src/components/InfiniteGallery/galleryAnimation.js
//
// YEH FILE saari GSAP/Lenis logic ko component se ALAG rakhti hai.
// Isse InfiniteGallery.jsx sirf "render" karta hai, aur animation
// ka poora control yahan centralize hota hai — testable, reusable,
// aur agar kal ScrollSmoother ya kisi aur lib pe switch karna ho,
// to sirf yeh file badalni padegi, component nahi.
//
// IMPORTANT: Hum "first 3 / middle 3 / last 3" jaisa special-case
// animation KABHI nahi likhte. Har item pe SAME function chalta hai,
// aur uska visual "position in view" GSAP khud scrub se decide karta
// hai (scrollTrigger start/end + progress based transform).

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { getLenisInstance } from "../../../app/providers/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

let activeLenisInstance = null;

export function getActiveLenis() {
  return activeLenisInstance;
}

/**
 * @returns {Lenis} lenis instance — cleanup ke liye return karo
 */


export function initSmoothScroll() {
  const lenis = getLenisInstance();
  if (!lenis) return null; // app-level Lenis not mounted yet
  lenis.on("scroll", ScrollTrigger.update);
  activeLenisInstance = lenis;
  return lenis;
}

export function destroySmoothScroll(lenis) {
  if (!lenis) return;
  lenis.off("scroll", ScrollTrigger.update);

  if (activeLenisInstance === lenis) {
    activeLenisInstance = null;
  }
}

function Desktop3DPreset(el, { scrub }) {
  return gsap
    .timeline({
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub,
        // markers: true, // debug ke liye on karo
      },
    })
    .fromTo(
      el,
      { rotationY: -35, rotationX: 8, scale: 0.82, filter: "brightness(0.55)" },
      { rotationY: 0, rotationX: 0, scale: 1, filter: "brightness(1)", ease: "none" },
      0
    )
    .to(
      el,
      { rotationY: 30, rotationX: -8, scale: 0.85, filter: "brightness(0.6)", ease: "none" },
      0.5
    );
}

function MobilePreset(el, { scrub }) {
  return gsap
    .timeline({
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub,
      },
    })
    .fromTo(
      el,
      { y: 70, scale: 0.92, opacity: 0.45, rotationX: 6, filter: "brightness(0.65)" },
      { y: 0, scale: 1, opacity: 1, rotationX: 0, filter: "brightness(1)", ease: "none" },
      0
    )
    .to(
      el,
      { y: -70, scale: 0.94, opacity: 0.5, rotationX: -6, filter: "brightness(0.65)", ease: "none" },
      0.5
    );
}

/**
 *
 * @param {HTMLElement[]} itemEls
 * @param {HTMLElement} perspectiveEl - element jispe CSS perspective set hoga (parent wrapper)
 * @param {object} options
 * @param {number} options.perspective
 * @param {number} options.scrub
 * @param {number} options.speed - is animation instance ki apni speed (gsap.globalTimeline ko touch nahi karta)
 * @param {number} options.columns - current active column count (1 = mobile)
 * @returns {gsap.core.Timeline[]} created timelines (for cleanup — har ek ke paas apna .scrollTrigger hai)
 */
export function createInfiniteScrollAnimation(itemEls, perspectiveEl, options = {}) {
  const { perspective = 1000, scrub = 1, speed = 1, columns = 3 } = options;

  if (!itemEls || itemEls.length === 0 || !perspectiveEl) return [];

  const isMobile = columns <= 1;
  gsap.set(perspectiveEl, { perspective: isMobile ? 0 : perspective });

  const timelines = itemEls
    .filter(Boolean)
    .map((el) => {
      const tl = isMobile ? MobilePreset(el, { scrub }) : Desktop3DPreset(el, { scrub });
      tl.timeScale(speed);
      return tl;
    });

  return timelines;
}

/**
 * @param {HTMLElement} containerEl
 * @returns {Promise<void>}
 */
export function waitForImagesToLoad(containerEl) {
  if (!containerEl) return Promise.resolve();

  const imgs = Array.from(containerEl.querySelectorAll("img"));
  if (imgs.length === 0) return Promise.resolve();

  return Promise.all(
    imgs.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener("error", resolve, { once: true });
      });
    })
  );
}

/**
 * @param {gsap.core.Timeline[]} timelines
 */
export function killScrollTriggers(timelines) {
  if (!timelines) return;
  timelines.forEach((tl) => {
    if (!tl) return;
    if (tl.scrollTrigger) tl.scrollTrigger.kill();
    tl.kill();
  });
}

export function refreshScrollTrigger() {
  requestAnimationFrame(() => ScrollTrigger.refresh());
}