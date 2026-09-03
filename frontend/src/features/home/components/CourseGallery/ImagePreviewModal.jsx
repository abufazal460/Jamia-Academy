import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { IoClose } from "react-icons/io5";
import { useLockBodyScroll } from "../../../../shared/hooks/useLockBodyScroll";
import { getLenisInstance } from "../../../../app/providers/SmoothScroll";

export default function ImagePreviewModal({ image, onClose }) {
  const closeBtnRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

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

    previouslyFocusedRef.current = document.activeElement;
    closeBtnRef.current?.focus();

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      previouslyFocusedRef.current?.focus?.();
    };
  }, [image, onClose]);

  const handleBackdropClick = useCallback(
    (event) => {
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
