import { motion } from "motion/react";
import { imageVariants, imageReducedVariants } from "../../motion/hero.motion";


const HeroSlide = ({ slide, isFirst, prefersReducedMotion, onVideoEnded }) => {
  const variants = prefersReducedMotion ? imageReducedVariants : imageVariants;

  const mobileImage = slide.imageMobile || slide.image;

  return (
    <motion.div
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0 z-0 h-screen w-full overflow-hidden"
    >
      {slide.type === "video" ? (
        <picture className="absolute inset-0 block h-full w-full">
          <source
            media="(max-width: 767px)"
            srcSet={slide.imageMobile || slide.image}
          />
          <video
            autoPlay
            muted
            playsInline
            preload={isFirst ? "auto" : "metadata"}
            onEnded={onVideoEnded}
            aria-label={slide.alt}
            style={{
              objectFit: "fill",
              objectPosition: "center",
              width: "100%",
              height: "100%",
            }}
            className="absolute inset-0 block"
          >
            <source
              src={slide.imageMobile || slide.image}
              media="(max-width: 767px)"
              type="video/webm"
            />
            <source src={slide.image} type="video/webm" />
          </video>
        </picture>
      ) : (
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileImage} />

          <img
            src={slide.image}
            alt={slide.alt}
            loading={isFirst ? "eager" : "lazy"}
            fetchPriority={isFirst ? "high" : "auto"}
            decoding="async"            style={{
              objectFit: "fill",
              objectPosition: "center",
              width: "100%",
              height: "100%",
            }}
            className="absolute inset-0 block"
          />
        </picture>
      )}

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#2B2D42]/80 via-[#2B2D42]/25 to-[#2B2D42]/45" />
    </motion.div>
  );
};

export default HeroSlide;
