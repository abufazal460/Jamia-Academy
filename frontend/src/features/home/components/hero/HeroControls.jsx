import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * HeroControls.jsx
 * -----------------
 * Chevron buttons ab 44px (h-11 w-11) hain — Apple/WCAG ka minimum touch
 * target size. Dot buttons ka VISUAL size same (chhota, elegant) hai,
 * lekin unka clickable area badhaya gaya hai (height 44px, padding se
 * width bhi thodi badi) taaki mobile pe tap karna aasan ho, bina dots ko
 * visually bulky banaye.
 */
const HeroControls = ({ slideCount, activeIndex, onNext, onPrev, onSelect }) => {
  return (
    <div className="absolute inset-x-0 bottom-6 z-20 flex items-center justify-center gap-3 px-4 sm:bottom-10 sm:gap-5">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous slide"
        className="hidden h-11 w-11 items-center justify-center rounded-full bg-[#F7F3E9]/15 text-[#F7F3E9] backdrop-blur-sm transition-colors duration-200 hover:bg-[#F7F3E9]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4A261] sm:flex"
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>

      <div className="flex items-center gap-1" role="tablist" aria-label="Slide selection">
        {Array.from({ length: slideCount }).map((_, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => onSelect(index)}
              // h-11 + px-2 — button ka height 44px hai (touch target),
              // width content (span) + padding ke hisaab se auto-size hoti
              // hai. Visual dot (span) ka size bilkul same rakha hai.
              className="flex h-11 items-center justify-center px-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4A261]"
            >
              <span
                aria-hidden="true"
                className={`block h-2.5 rounded-full transition-all duration-300 ${
                  isActive ? "w-8 bg-[#E63946]" : "w-2.5 bg-[#F7F3E9]/40 hover:bg-[#F7F3E9]/60"
                }`}
              />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next slide"
        className="hidden h-11 w-11 items-center justify-center rounded-full bg-[#F7F3E9]/15 text-[#F7F3E9] backdrop-blur-sm transition-colors duration-200 hover:bg-[#F7F3E9]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4A261] sm:flex"
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>
    </div>
  );
};

export default HeroControls;