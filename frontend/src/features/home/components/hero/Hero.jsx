import { AnimatePresence } from "motion/react";
import { heroSlides } from "../../data/hero.data";
import useHeroSlider from "../../hooks/useHeroSlider";
import usePrefersReducedMotion from "../../../../shared/hooks/usePrefersReducedMotion";
import HeroSlide from "./HeroSlide";
import HeroContent from "./HeroContent";
import HeroControls from "./HeroControls";

const Hero = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { activeIndex, goToNext, goToPrev, goToSlide, speedUp, speedDown } = useHeroSlider(
    heroSlides.length,
    { autoplay: !prefersReducedMotion }
  );

  // BUG FIX: pehle yahan `pause()` / `resume()` call ho rahe the jo hook
  // mein kahin defined hi nahi the (ye ReferenceError deta, console error
  // dikhata). Hook sirf `speedUp`/`speedDown` expose karta hai (jo mouse
  // hover pe bhi use ho rahe hain) — isliye keyboard focus/blur ko bhi
  // usi consistent, already-working pattern se wire kiya hai.
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
      {/* IMAGE LAYER
          `mode="wait"` yahan NAHI hai (default = "sync"), taaki purani
          exit ho rahi image aur nayi enter ho rahi image DONO simultaneously
          animate hon — jaisa "both images animate during transition"
          requirement mein maanga gaya tha. Dono images absolute inset-0 hain
          isliye overlap hone pe bhi ek clean crossfade+slide dikhta hai,
          broken/jumpy nahi.
          `initial={false}` — pehli image page-load pe animate NAHI hoti
          (seedhi visible hoti hai). Ye jaan-boojh kar hai: hero image
          typically LCP (Largest Contentful Paint) element hoti hai, ise
          animate/delay karna perceived load performance ke liye bura hai.
          Slide-transitions ke baad (activeIndex change hone pe) animation
          normally chalti hai. */}
      <AnimatePresence initial={false}>
        <HeroSlide
          key={activeSlide.id}
          slide={activeSlide}
          isFirst={activeIndex === 0}
          prefersReducedMotion={prefersReducedMotion}
        />
      </AnimatePresence>

      {/* CONTENT LAYER
          BUG FIX: pehle is wrapper pe `items-center` tha jo iske andar
          wale content-box ki height ko uske apne content-size tak collapse
          kar deta tha — isliye HeroContent ke andar `min-h-full` +
          `justify-end` (layout: "bottom") kabhi kaam nahi karta tha (koi
          extra space hi nahi thi justify karne ke liye). Ab `items-center`
          hata diya hai (default align-items: stretch le leta hai) aur
          inner wrapper ko explicit `h-full` diya hai — isse HeroContent ka
          `min-h-full` ab ACTUAL section height reference karta hai, aur
          har layout variant (left/center/right/bottom) sahi se kaam karta
          hai.
          `mode="wait"` yahan jaan-boojh kar rakha hai (image layer se
          alag) — taaki purana aur naya text KABHI overlap na ho
          (readability/no-text-overlap requirement ke liye zaroori hai). */}
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
