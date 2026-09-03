import { memo } from "react";
import { motion } from "motion/react";
import RatingStars from "./RatingStars";

const TestimonialCard = ({ name, course, rating, review, image }) => {
  return (
    <motion.article
      className="
        group relative shrink-0
        w-[280px] sm:w-[320px] lg:w-[360px]
        rounded-3xl
        bg-[#111111]
        border border-white/[0.08]
        px-6 py-8
        shadow-[0_10px_30px_rgba(0,0,0,0.35)]
        backdrop-blur-sm
        transform-gpu
        transition-shadow duration-300
        hover:shadow-[0_20px_45px_rgba(0,0,0,0.55)]"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.6 }}
    >
      <header className="flex flex-col items-center text-center">
        <figure className="mb-4 h-20 w-20 overflow-hidden rounded-full ring-1 ring-white/10 shadow-[0_4px_14px_rgba(0,0,0,0.5)]">
          <img
            src={image}
            alt={`${name} ka profile photo`}
            loading="lazy"
            className="
              h-full w-full object-cover
              transition-transform duration-500 ease-out
              group-hover:scale-[1.12] transform-gpu"
          />
        </figure>

        <h3 className="text-base sm:text-lg font-bold text-white">
          {name}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-white/50 font-medium">{course}</p>
      </header>

      <div className="mt-4 flex items-center justify-center gap-2">
        <RatingStars rating={rating} />
        <span className="text-xs sm:text-sm font-medium text-white/70">
          {rating.toFixed(1)}
        </span>
      </div>

      <p className="mt-4 text-center text-sm leading-relaxed text-white/60">
        {review}
      </p>
    </motion.article>
  );
};

export default memo(TestimonialCard);
