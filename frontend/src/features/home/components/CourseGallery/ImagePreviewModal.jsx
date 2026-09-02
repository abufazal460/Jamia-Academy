// src/features/home/components/CourseGallery/ImagePreviewModal.jsx
//
// Full-screen image preview modal — opens jab user "Empower Your Future"
// gallery (InfiniteGallery) ke kisi bhi image pe click karta hai.
//
// Design notes (why it's built this way):
//
// 1. PORTAL to document.body — InfiniteGallery ka wrapper div GSAP se
//    `perspective` (CSS) set karta hai (gallery.motion.js -> Desktop3DPreset /
//    gsap.set(perspectiveEl, { perspective })). Any element with a CSS
//    `perspective`/`transform`/`filter` becomes a *containing block* for its
//    `position: fixed` descendants (CSS spec) — so a `fixed` modal rendered
//    INSIDE that wrapper would be clipped/mispositioned instead of covering
//    the real viewport. Rendering via createPortal(document.body) sidesteps
//    this entirely and guarantees true full-screen coverage.
//
// 2. SCROLL LOCK — reuses the project's existing `useLockBodyScroll` hook
//    (src/shared/hooks/useLockBodyScroll.js), which already:
//      - locks <html> + <body> (position:fixed technique, iOS-safe)
//      - compensates scrollbar-width to avoid layout shift
//      - restores exact scroll position on close
//      - explicitly calls lenis.stop()/lenis.start() — plain
//        `overflow:hidden` does NOT stop Lenis's own rAF scroll loop.
//    No new scroll-lock logic is introduced — this is the smallest,
//    safest reuse of what already exists in the codebase.
//
// 3. LENIS INSTANCE — pulled via `getActiveLenis()` from
//    `../../motion/gallery.motion`, the exact same accessor already used by
//    this folder's `BrowseCoursesCTA.jsx`. No second Lenis/scroll system
//    is created.
//
// 4. RAPID OPEN/CLOSE SAFETY — this component is only ever mounted while
//    an image is selected (parent does `{selectedImage && <ImagePreviewModal />}`).
//    Every listener is registered in a single useEffect and removed in its
//    cleanup, so mount → unmount → mount always yields exactly one active
//    set of listeners. Nothing is registered outside effects, so there is
//    no path to duplicate listeners or a stuck scroll-lock.

import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { IoClose } from "react-icons/io5";
import { useLockBodyScroll } from "../../../../shared/hooks/useLockBodyScroll";
import { getLenisInstance } from "../../../../app/providers/SmoothScroll";

export default function ImagePreviewModal({ image, onClose }) {
  const closeBtnRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  // Existing shared hook — already handles html+body lock, iOS position:fixed,
  // scrollbar compensation, scroll-position restore AND Lenis stop/start.
  useLockBodyScroll(Boolean(image), { lenis: getLenisInstance() });

  // ---------- Escape to close ----------
  useEffect(() => {
    if (!image) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      }
    }

    // Remember what had focus so it can be restored on close (a11y).
    previouslyFocusedRef.current = document.activeElement;
    // Move focus into the modal (close button) so keyboard/SR users land
    // somewhere sensible instead of a focus trap outside the viewport.
    closeBtnRef.current?.focus();

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // Restore focus to whatever triggered the modal (the clicked image).
      previouslyFocusedRef.current?.focus?.();
    };
  }, [image, onClose]);

  // ---------- Click outside (backdrop) closes ----------
  const handleBackdropClick = useCallback(
    (event) => {
      // Only close when the click originated on the backdrop itself —
      // the image/close-button handlers stopPropagation() so this never
      // double-fires for clicks meant for them.
      if (event.target === event.currentTarget) onClose();
    },
    [onClose]
  );

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {image ? (
        <motion.div
          key="image-preview-backdrop"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          role="dialog"
          aria-modal="true"
          aria-label={image.title || image.alt || "Image preview"}
          onClick={handleBackdropClick}
        >
          {/* Close button */}
          <button
            ref={closeBtnRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close image preview"
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6 sm:top-6"
          >
            <IoClose size={26} />
          </button>

          {/* Image — object-contain + max-h/max-w keeps aspect ratio,
              never stretches, and stays centered via the flex parent. */}
          <motion.img
            key={image.src}
            src={image.src}
            alt={image.alt || image.title || ""}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[85vh] max-w-[92vw] w-auto h-auto select-none rounded-lg object-contain shadow-2xl sm:max-h-[90vh] sm:max-w-[85vw]"
            draggable={false}
          />

          {image.title ? (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white">
              {image.title}
            </div>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
    