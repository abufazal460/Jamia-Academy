// RatingStars.jsx
// Ye component decimal rating (jaise 4.3, 4.5, 4.7) ko full/half/empty stars me convert karta hai
// react-icons/fa6 use kiya hai jaisa spec me mentioned tha

import { memo } from "react";
import { FaStar, FaStarHalfStroke, FaRegStar } from "react-icons/fa6";

// Rating ko full, half aur empty stars ki count me todne wala helper function
// Rounding logic: 0.75 aur usse zyada -> agla full star
// 0.25 se 0.74 ke beech -> half star
// 0.25 se kam -> current star empty maana jayega
function getStarBreakdown(rating) {
  const safeRating = Math.min(5, Math.max(0, rating)); // rating ko 0-5 ke range me clamp karna
  const fullStarsBase = Math.floor(safeRating);
  const decimal = safeRating - fullStarsBase;

  let fullStars = fullStarsBase;
  let hasHalfStar = false;

  if (decimal >= 0.75) {
    fullStars += 1; // 0.75+ ko round up karke full star bana diya
  } else if (decimal >= 0.25) {
    hasHalfStar = true; // beech wala decimal half star banega
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
      {/* Full stars render karna */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <FaStar
          key={`full-${index}`}
          className="text-[#FBBF24] text-sm sm:text-base"
          aria-hidden="true"
        />
      ))}

      {/* Agar half star hai to sirf ek render hoga */}
      {hasHalfStar && (
        <FaStarHalfStroke
          className="text-[#FBBF24] text-sm sm:text-base"
          aria-hidden="true"
        />
      )}

      {/* Empty stars render karna */}
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

// React.memo lagaya kyunki rating prop change na ho to re-render ki zarurat nahi
export default memo(RatingStars);
