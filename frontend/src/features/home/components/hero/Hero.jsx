import { AnimatePresence } from "motion/react";
import { heroSlides } from "../../data/hero.data";
import useHeroSlider from "../../hooks/useHeroSlider";
import usePrefersReducedMotion from "../../../../shared/hooks/usePrefersReducedMotion";
import HeroSlide from "./HeroSlide";
import HeroContent from "./HeroContent";
import HeroBadge from "./HeroBadge";
import HeroControls from "./HeroControls";

const Hero = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { activeIndex, goToNext, goToPrev, goToSlide, speedUp, speedDown } = useHeroSlider(
    heroSlides.length,
    { autoplay: !prefersReducedMotion }
  );

  const handleFocus = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) speedUp();
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) speedDown();
  };

  if (!heroSlides.length) return null;

  const activeSlide = heroSlides[activeIndex] ?? heroSlides[0];

  return (
    <section
      className="relative h-screen min-h-[480px] w-full overflow-hidden bg-[#2B2D42]"
      onMouseEnter={speedUp}
      onMouseLeave={speedDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-roledescription="carousel"
      aria-label="Jamia Academy highlights"
    >
      {/* IMAGE LAYER — animation timing/behavior unchanged */}
      <AnimatePresence initial={false}>
        <HeroSlide
          key={activeSlide.id}
          slide={activeSlide}
          isFirst={activeIndex === 0}
          prefersReducedMotion={prefersReducedMotion}
        />
      </AnimatePresence>

      {/* BADGE — content-layout (left/center/right/bottom) se poori tarah
          INDEPENDENT hai, isliye HeroContent ke andar nahi, yahan seedha
          section-level pe render hota hai. Isse badge ki position har
          slide pe EXACTLY same rehti hai (navbar ke neeche), chahe us
          slide ka content kahin bhi positioned ho. z-30 rakha hai taaki
          ye image (z-0/z-10) aur content (z-20) dono ke UPAR dikhe. */}
      <HeroBadge text={activeSlide.badge} prefersReducedMotion={prefersReducedMotion} />

      {/* CONTENT LAYER — height/layout bug-fix unchanged, mode="wait" se
          text overlap kabhi nahi hota */}
      <div className="relative z-20 flex h-full w-full">
        <div className="mx-auto h-full w-full max-w-7xl px-5 sm:px-8 lg:px-12">
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
