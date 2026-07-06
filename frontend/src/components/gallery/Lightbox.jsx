import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";

const SWIPE_THRESHOLD_PX = 50;

/**
 * Lightbox.jsx
 * -----------------------------------------------------------------------
 * Hinglish: Fullscreen image viewer.
 *  - Keyboard: ESC se close, Left/Right arrow se prev/next.
 *  - Touch: swipe left/right (threshold ke andar se decide hota hai ki
 *    ye tap tha ya genuine swipe).
 *  - Boundary rule: pehli image par "Previous" button hidden, last image
 *    par "Next" hidden. NO LOOPING — jaisa brief me explicitly manga gaya.
 *  - Animation: opacity 0->1 aur scale 0.9->1, AnimatePresence ke
 *    `mode="wait"` se ek image exit hone ke baad hi doosri enter hoti hai
 *    (koi visual overlap/jump nahi).
 *
 * `images` = currently active tab ki poori array, `currentIndex` = us
 * array me se kaunsi image khuli hai. Ye state Gallery.jsx (parent) me
 * rehta hai — ye component pure "controlled" hai.
 */
export function Lightbox({ images, currentIndex, onClose, onNavigate }) {
  const touchStartXRef = useRef(null);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === images.length - 1;

  const goPrev = useCallback(() => {
    if (!isFirst) onNavigate(currentIndex - 1);
  }, [isFirst, currentIndex, onNavigate]);

  const goNext = useCallback(() => {
    if (!isLast) onNavigate(currentIndex + 1);
  }, [isLast, currentIndex, onNavigate]);

  // Keyboard support: ESC / ArrowLeft / ArrowRight
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    // Body scroll lock jab tak lightbox khula hai
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, goPrev, goNext]);

  function handleTouchStart(event) {
    touchStartXRef.current = event.changedTouches[0].clientX;
  }

  function handleTouchEnd(event) {
    if (touchStartXRef.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartXRef.current;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD_PX) {
      // Swipe right (finger left -> right movement) = pichli image
      if (deltaX > 0) goPrev();
      else goNext();
    }
    touchStartXRef.current = null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close viewer"
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
      >
        <IoClose size={26} />
      </button>

      {/* Previous button — hidden on first image */}
      {!isFirst && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous image"
          className="absolute left-2 z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 sm:left-6"
        >
          <IoChevronBack size={28} />
        </button>
      )}

      {/* Next button — hidden on last image */}
      {!isLast && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next image"
          className="absolute right-2 z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 sm:right-6"
        >
          <IoChevronForward size={28} />
        </button>
      )}

      <AnimatePresence mode="wait">
        <motion.img
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt={`Full screen gallery photo ${currentIndex + 1}`}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-h-[85vh] max-w-[92vw] select-none rounded-lg object-contain shadow-2xl sm:max-h-[90vh] sm:max-w-[85vw]"
        />
      </AnimatePresence>

      {/* Counter */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white">
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>
  );
}