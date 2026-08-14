import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Prev/Next buttons + dot indicators — sab keyboard accessible aur focus-visible.
 */
const HeroControls = ({ slideCount, activeIndex, onNext, onPrev, onSelect }) => {
  return (
    <div className="absolute inset-x-0 bottom-6 z-20 flex items-center justify-center gap-5 px-4 sm:bottom-10">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous slide"
        className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#F7F3E9]/15 text-[#F7F3E9] backdrop-blur-sm transition-colors duration-200 hover:bg-[#F7F3E9]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4A261] sm:flex"
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>

      <div className="flex items-center gap-2" role="tablist" aria-label="Slide selection">
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
              className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4A261] ${
                isActive ? "w-8 bg-[#E63946]" : "w-2.5 bg-[#F7F3E9]/40 hover:bg-[#F7F3E9]/60"
              }`}
            />
          );
        })}
      </div>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next slide"
        className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#F7F3E9]/15 text-[#F7F3E9] backdrop-blur-sm transition-colors duration-200 hover:bg-[#F7F3E9]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4A261] sm:flex"
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>
    </div>
  );
};

export default HeroControls;