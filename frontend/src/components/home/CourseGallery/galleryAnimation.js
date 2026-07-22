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

gsap.registerPlugin(ScrollTrigger);

// Currently active Lenis instance — gallery ke bahar (e.g. CTA button)
// ko bhi isi Lenis se smooth-scroll karna ho to yeh access deta hai,
// taaki kahin bhi native `window.scrollTo` use na karna pade jab
// Lenis already scroll control kar raha ho.
let activeLenisInstance = null;

/**
 * Currently mounted gallery ka active Lenis instance return karta hai
 * (ya null agar gallery mount nahi hai / animation disabled hai).
 * Sirf READ karne ke liye — is instance ko yahan se destroy/mutate mat karo.
 */
export function getActiveLenis() {
  return activeLenisInstance;
}

/**
 * Lenis ko GSAP ScrollTrigger ke saath sync karta hai.
 * Yeh smooth-scroll ka core hai — Lenis scroll deta hai,
 * ScrollTrigger uspe react karta hai.
 *
 * @returns {Lenis} lenis instance — cleanup ke liye return karo
 */
export function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  // Lenis ka scroll event ScrollTrigger ko update karne ke liye batao
  lenis.on("scroll", ScrollTrigger.update);

  // GSAP ke apne ticker se Lenis ko drive karo (rAF ka single source of truth)
  const rafCallback = (time) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(rafCallback);
  gsap.ticker.lagSmoothing(0);

  // cleanup ke liye rafCallback ko instance pe attach kar dete hain
  lenis._rafCallback = rafCallback;

  activeLenisInstance = lenis;

  return lenis;
}

/**
 * Lenis ko poori tarah destroy karta hai — memory leak rokne ke liye.
 */
export function destroySmoothScroll(lenis) {
  if (!lenis) return;
  if (lenis._rafCallback) gsap.ticker.remove(lenis._rafCallback);
  lenis.destroy();
  if (activeLenisInstance === lenis) activeLenisInstance = null;
}

/**
 * DESKTOP / TABLET PRESET — original Codrops 3D feeling.
 * EK hi timeline, EK hi ScrollTrigger per item (pehle do alag-alag
 * scrubbed triggers the jo same properties pe fight karte the —
 * ab ek timeline ke andar do keyframes hain: 0 = enter, 0.5 = exit,
 * dono ek hi scrub se drive hote hain, isliye conflict nahi hota).
 * Tablet ISI preset ko reuse karta hai — koi duplicate animation code nahi,
 * sirf column count alag hota hai (jo layout se aata hai, animation se nahi).
 *
 * NOTE: koi `scroller` yahan set nahi hota — ScrollTrigger by default
 * window/document ko scroller maanta hai, jo Lenis (default config mein)
 * bhi drive karta hai. Dono ek hi scroll-context share karte hain,
 * isliye animation reliably update hoti hai.
 *
 * NOTE 2: `transformPerspective` per-item yahan set NAHI karte — perspective
 * sirf parent container par (CSS `perspective`) apply hota hai, jo original
 * Codrops ka tarika hai. Item khud sirf `transform-style: preserve-3d` +
 * `transform-origin: center` use karta hai (GalleryItem.jsx mein already hai).
 */
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

/**
 * MOBILE PRESET — dedicated, no rotationY, no perspective illusion.
 * Ek hi column visible hota hai isliye 3D tilt awkward lagta hai —
 * iski jagah vertical translate + opacity + halki rotationX use hoti hai.
 * Yeh bhi window scroller use karta hai — koi custom scroller nahi.
 */
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
 * Sabhi gallery items ke liye scroll animation banata hai — ANY number
 * of items ke saath kaam karta hai (6 ho ya 600), kyunki loop mein
 * hardcoded index checks kahin nahi hain.
 *
 * `columns` (current active column count, layout hook se aata hai) decide
 * karta hai kaunsa preset chalega — 1 column = MobilePreset, 2/3+ = same
 * Desktop3DPreset (tablet automatically desktop engine reuse karta hai).
 * Koi :nth-child, koi "if index < 3" jaisa hardcode nahi.
 *
 * Scrolling ARCHITECTURE: sirf ek scroller hai — window/document. Lenis
 * (default config) window ko drive karta hai, aur ScrollTrigger bhi
 * default window scroller use karta hai — dono sync mein rehte hain.
 * Isliye yahan koi `scroller` pass nahi hota aur koi
 * ScrollTrigger.scrollerProxy() ki zaroorat nahi.
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

  // Perspective sirf parent par — mobile pe 3D depth illusion nahi chahiye.
  gsap.set(perspectiveEl, { perspective: isMobile ? 0 : perspective });

  // gsap.globalTimeline.timeScale() POORI app ki saari animations slow/fast
  // kar deta (buttons, toasts, kuch bhi ho) — isliye speed sirf is gallery
  // ki apni timelines par per-instance apply karte hain.
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
 * Container ke andar sabhi <img> tags ke load hone ka wait karta hai.
 * Gallery images load hone se pehle heights/positions stable nahi hoti,
 * isliye ScrollTrigger ko unke baad ek refresh chahiye hota hai —
 * warna start/end points galat calculate ho jaate hain.
 *
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
 * Saari animation timelines (aur unke andar ke ScrollTriggers) ko safely
 * kill karta hai. Component unmount ya images prop change hone pe yeh
 * zaroor call karo — warna stale triggers memory leak aur "ghost"
 * animations create karte hain.
 *
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

/**
 * Layout badalne par (resize, column count change, images load hone
 * ke baad) ScrollTrigger ko positions recalculate karne ke liye batao.
 * Debounced/rAF-wrapped taaki resize storm mein bar-bar na chale.
 */
export function refreshScrollTrigger() {
  requestAnimationFrame(() => ScrollTrigger.refresh());
}