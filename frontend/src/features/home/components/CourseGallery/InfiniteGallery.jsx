
import { useEffect, useLayoutEffect, useRef } from "react";
import { useInfiniteGallery } from "../../hooks/useInfiniteGallery";
import GalleryItem from "./GalleryItem";
import {
  initSmoothScroll,
  destroySmoothScroll,
  createInfiniteScrollAnimation,
  killScrollTriggers,
  refreshScrollTrigger,
  waitForImagesToLoad,
} from "../../motion/gallery.motion";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

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
  onImageClick,
}) {
  const { activeColumns, loopedItems } = useInfiniteGallery(images, columns);

  const wrapperRef = useRef(null);
  const itemRefs = useRef(new Map());
  const lenisRef = useRef(null);
  const timelinesRef = useRef([]);

  const setItemRef = (key) => (node) => {
    if (node) itemRefs.current.set(key, node);
    else itemRefs.current.delete(key);
  };


useIsomorphicLayoutEffect(() => {
  if (!animationEnabled || loopedItems.length === 0) return;

  const wrapper = wrapperRef.current;
  if (!wrapper) return;

  let cancelled = false;

  const lenis = initSmoothScroll();
  lenisRef.current = lenis;

  const itemEls = loopedItems
    .map((item) => itemRefs.current.get(item._loopKey))
    .filter(Boolean);

  if (!itemEls.length) return;

  const timelines = createInfiniteScrollAnimation(itemEls, wrapper, {
    perspective,
    scrub,
    speed,
    columns: activeColumns,
  });

  timelinesRef.current = timelines;

  refreshScrollTrigger();

  waitForImagesToLoad(wrapper).then(() => {
    if (cancelled) return;

    requestAnimationFrame(() => {
      refreshScrollTrigger();
    });
  });

  return () => {
    cancelled = true;

    killScrollTriggers(timelinesRef.current);
    timelinesRef.current = [];

    destroySmoothScroll(lenisRef.current);
    lenisRef.current = null;
  };
}, [
  loopedItems,
  activeColumns,
  animationEnabled,
  perspective,
  scrub,
  speed,
]);

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

      style={{
        "--gallery-cols": activeColumns,
        "--gallery-gap": gap,
        "--gallery-h-desktop": desktopHeight,
        "--gallery-h-tablet": tabletHeight,
        "--gallery-h-mobile": mobileHeight,
      }}
      className={[
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
              onImageClick={onImageClick}
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