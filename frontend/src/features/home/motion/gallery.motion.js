import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { getLenisInstance } from "../../../app/providers/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

let activeLenisInstance = null;

export function getActiveLenis() {
  return activeLenisInstance;
}

export function initSmoothScroll() {
  return getLenisInstance();
}

export function destroySmoothScroll() {

}

function Desktop3DPreset(el, { scrub }) {
  return gsap
    .timeline({
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub,
      },
      defaults: { force3D: true },
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