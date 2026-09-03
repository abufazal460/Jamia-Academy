import { memo } from "react";
import { FaStar, FaStarHalfStroke, FaRegStar } from "react-icons/fa6";

function getStarBreakdown(rating) {
  const safeRating = Math.min(5, Math.max(0, rating));
  const fullStarsBase = Math.floor(safeRating);
  const decimal = safeRating - fullStarsBase;

  let fullStars = fullStarsBase;
  let hasHalfStar = false;

  if (decimal >= 0.75) {
    fullStars += 1;
  } else if (decimal >= 0.25) {
    hasHalfStar = true;
  }

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return { fullStars, hasHalfStar, emptyStars };
}

const RatingStars = ({ rating }) => {
  const { fullStars, hasHalfStar, emptyStars } = getStarBreakdown(rating);

  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`Rating: ${rating} out of 5 stars`}
    >
      {Array.from({ length: fullStars }).map((_, index) => (
        <FaStar
          key={`full-${index}`}
          className="text-[#FBBF24] text-sm sm:text-base"
          aria-hidden="true"
        />
      ))}

      {hasHalfStar && (
        <FaStarHalfStroke
          className="text-[#FBBF24] text-sm sm:text-base"
          aria-hidden="true"
        />
      )}

      {Array.from({ length: emptyStars }).map((_, index) => (
        <FaRegStar
          key={`empty-${index}`}
          className="text-[#FBBF24] text-sm sm:text-base"
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

export default memo(RatingStars);
