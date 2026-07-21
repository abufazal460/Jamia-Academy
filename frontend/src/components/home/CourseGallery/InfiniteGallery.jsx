// src/components/InfiniteGallery/InfiniteGallery.jsx
//
// YEH MAIN COMPONENT hai. Iska kaam sirf teen cheezein hai:
//   1. useInfiniteGallery hook se responsive column count + looped
//      (cloned) items list lena.
//   2. Un items ko Tailwind grid mein render karna (.map — koi
//      hardcoded JSX nahi).
//   3. GSAP/Lenis animation ko mount pe start, aur unmount/update
//      pe properly cleanup karna.
//
// Component KABHI bhi image count ya column count hardcode nahi
// karta — sab kuch props aur hook se driven hai. 6 images do ya
// 600, yeh component logic waise ka waisa rahega.

import { useEffect, useLayoutEffect, useRef } from "react";
import { useInfiniteGallery } from "../../../hooks/useInfiniteGallery";
import GalleryItem from "./GalleryItem";
import {
  initSmoothScroll,
  destroySmoothScroll,
  createInfiniteScrollAnimation,
  killScrollTriggers,
  refreshScrollTrigger,
  waitForImagesToLoad,
} from "./galleryAnimation";

// SSR-safe layout effect (Vite/CSR app mein useLayoutEffect hi chalega,
// lekin future-proofing ke liye yeh pattern common hai)
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * @param {object} props
 * @param {Array}  props.images            - [{id, image, title, alt}] — REQUIRED
 * @param {object} props.columns           - {desktop, tablet, mobile} column counts
 * @param {string} props.gap               - Tailwind-compatible gap value, e.g. "clamp(16px, 4vw, 48px)" or "24px"
 * @param {string} props.desktopHeight     - e.g. "88vh"
 * @param {string} props.tabletHeight      - e.g. "72vh"
 * @param {string} props.mobileHeight      - e.g. "60vh"
 * @param {string} props.className         - extra classes on the outer wrapper
 * @param {boolean} props.animationEnabled - turn GSAP animation on/off
 * @param {number} props.perspective       - 3D perspective depth in px
 * @param {number|boolean} props.scrub     - ScrollTrigger scrub value
 * @param {number} props.speed             - overall animation speed multiplier
 */
export default function InfiniteGallery({
  images = [],
  columns = { desktop: 3, tablet: 2, mobile: 1 },
  gap = "clamp(16px, 4vw, 48px)",
  desktopHeight = "88vh",
  tabletHeight = "72vh",
  mobileHeight = "60vh",
  className = "",
  animationEnabled = true,
  perspective = 1000,
  scrub = 1,
  speed = 1,
}) {
  const { activeColumns, loopedItems } = useInfiniteGallery(images, columns);

  const wrapperRef = useRef(null);
  const itemRefs = useRef(new Map()); // _loopKey -> DOM node
  const lenisRef = useRef(null);
  const timelinesRef = useRef([]);

  // Ref set/unset karne ka helper — Map use kiya hai kyunki items
  // dynamically add/remove ho sakte hain (image count change) aur
  // Map se O(1) lookup + easy cleanup milta hai.
  const setItemRef = (key) => (node) => {
    if (node) itemRefs.current.set(key, node);
    else itemRefs.current.delete(key);
  };

  // ---------- GSAP + Lenis lifecycle ----------
  useIsomorphicLayoutEffect(() => {
    if (!animationEnabled || loopedItems.length === 0) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // 1. Smooth scroll start — Lenis default config window/document ko
    //    drive karta hai (original Codrops jaisa hi). Koi custom scroll
    //    container nahi — sirf EK scroll architecture: window scroll.
    const lenis = initSmoothScroll();
    lenisRef.current = lenis;

    // 2. Sabhi item DOM nodes collect karo (order preserved via loopedItems)
    const itemEls = loopedItems
      .map((item) => itemRefs.current.get(item._loopKey))
      .filter(Boolean);

    // 3. Generalized animation banwao — koi index-based special case nahi.
    //    `wrapper` sirf CSS perspective ke liye pass hota hai, scroller
    //    ke liye nahi (ScrollTrigger default window scroller use karta hai).
    const timelines = createInfiniteScrollAnimation(itemEls, wrapper, {
      perspective,
      scrub,
      speed,
      columns: activeColumns,
    });
    timelinesRef.current = timelines;

    // 4. Turant ek refresh (initial DOM state ke liye)...
    refreshScrollTrigger();

    // ...aur phir images poori load hone ke baad EK aur refresh — images
    // load hone se pehle heights stable nahi hoti, isliye start/end
    // points galat calculate ho sakte the (yehi static-animation bug
    // ka ek hissa tha).
    let cancelled = false;
    waitForImagesToLoad(wrapper).then(() => {
      if (!cancelled) refreshScrollTrigger();
    });

    // ---------- CLEANUP: memory leaks se bachne ke liye zaroori ----------
    return () => {
      cancelled = true;
      killScrollTriggers(timelinesRef.current);
      timelinesRef.current = [];
      destroySmoothScroll(lenisRef.current);
      lenisRef.current = null;
    };
    // activeColumns badalne par (resize breakpoint cross hua) clones
    // ki count badal sakti hai, isliye animation ko re-init karna zaroori hai.
  }, [loopedItems, activeColumns, animationEnabled, perspective, scrub, speed]);

  // ---------- Resize par ScrollTrigger ko refresh karo (throttled) ----------
  useEffect(() => {
    let frame = null;
    const onResize = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        refreshScrollTrigger();
        frame = null;
      });
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  if (!images || images.length === 0) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center text-sm text-neutral-400">
        No images to display.
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      // CSS custom properties yahan set kiye hain taaki Tailwind
      // arbitrary-value utilities (neeche) inhe runtime pe consume
      // kar sakein — yeh dynamic column count/gap/height ko bina
      // custom stylesheet likhe Tailwind ke through drive karta hai.
      //
      // NOTE: yahan ab `overflow-y-auto` / `h-screen` NAHI hai — yeh
      // ek independent scroll container banata tha jo Lenis (jo
      // window/document scroll karta hai) se sync nahi hota tha.
      // Ab yeh div normal document flow mein rehta hai aur poora
      // scrolling window/body par hoti hai — original Codrops jaisa.
      style={{
        "--gallery-cols": activeColumns,
        "--gallery-gap": gap,
        "--gallery-h-desktop": desktopHeight,
        "--gallery-h-tablet": tabletHeight,
        "--gallery-h-mobile": mobileHeight,
      }}
      className={[
        // Premium centered container — gallery kabhi bhi screen edges ko
        // touch nahi karta. max-width breakpoints pe badhta hai, aur
        // responsive padding sabhi taraf comfortable breathing space
        // deta hai (mobile: 16-20px, tablet: 32-40px, desktop: 48-80px).
        "mx-auto w-full max-w-[1600px] overflow-x-hidden",
        "px-4 py-5 sm:px-8 sm:py-8 lg:px-12 lg:py-10 xl:max-w-[1800px] xl:px-20 xl:py-16",
        "relative",
        className,
      ].join(" ")}
    >
      <ul
        role="list"
        className={[
          "grid w-full list-none p-0",
          "grid-cols-[repeat(var(--gallery-cols),minmax(0,1fr))]",
          "gap-[var(--gallery-gap)]",
        ].join(" ")}
      >
        {loopedItems.map((item, index) => (
          <li key={item._loopKey} className="w-full">
            <GalleryItem
              ref={setItemRef(item._loopKey)}
              image={item.image}
              alt={item.alt}
              title={item.title}
              isClone={item._isClone}
              index={index}
              height={[
                "h-[var(--gallery-h-mobile)]",
                "sm:h-[var(--gallery-h-tablet)]",
                "lg:h-[var(--gallery-h-desktop)]",
              ].join(" ")}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}