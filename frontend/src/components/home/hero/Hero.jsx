import { AnimatePresence } from "framer-motion";
import { heroSlides } from "../../../data/heroData";
import useHeroSlider from "../../../hooks/useHeroSlider";
import usePrefersReducedMotion from "../../../hooks/usePrefersReducedMotion";
import HeroSlide from "./HeroSlide";
import HeroContent from "./HeroContent";
import HeroControls from "./HeroControls";

const Hero = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { activeIndex, goToNext, goToPrev, goToSlide, pause, resume } = useHeroSlider(
    heroSlides.length,
    { autoplay: !prefersReducedMotion }
  );

  // Error-safe: agar data file khaali ho gayi to Hero crash nahi hoga, bas render nahi karega
  if (!heroSlides.length) return null;

  const activeSlide = heroSlides[activeIndex] ?? heroSlides[0];

  return (
    <section
      className="relative h-screen min-h-[480px] w-full overflow-hidden bg-[#2B2D42]"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      aria-roledescription="carousel"
      aria-label="Jamia Academy highlights"
    >
      <AnimatePresence mode="wait">
        <HeroSlide
          key={activeSlide.id}
          slide={activeSlide}
          isFirst={activeIndex === 0}
          prefersReducedMotion={prefersReducedMotion}
        />
      </AnimatePresence>

      <div className="relative z-20 flex h-full w-full items-center">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <AnimatePresence mode="wait">
            <HeroContent
              key={activeSlide.id}
              slide={activeSlide}
              prefersReducedMotion={prefersReducedMotion}
            />
          </AnimatePresence>
        </div>
      </div>

      {heroSlides.length > 1 && (
        <HeroControls
          slideCount={heroSlides.length}
          activeIndex={activeIndex}
          onNext={goToNext}
          onPrev={goToPrev}
          onSelect={goToSlide}
        />
      )}
    </section>
  );
};

export default Hero;