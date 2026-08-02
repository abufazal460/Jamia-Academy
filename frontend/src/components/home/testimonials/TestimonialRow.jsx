// TestimonialRow.jsx
// Ek marquee row - cards ko horizontally infinite scroll karwata hai
// Loop seamless banane ke liye data ko sirf ek baar array level par duplicate kiya hai
// (DOM mutation nahi kiya, jaisa original vanilla JS wale version me tha)
// CSS keyframes use ki hai kyunki continuous infinite marquee ke liye ye
// Framer Motion ke JS-driven animation se zyada performant aur GPU friendly hai

import { memo, useMemo } from "react";
import TestimonialCard from "./TestimonialCard";

const TestimonialRow = ({ testimonials, direction = "left" }) => {
  // Seamless loop ke liye data ko exactly do baar duplicate karna
  // translateX(-50%) tab hi perfectly seamless dikhega jab total content 2x ho
  const duplicatedTestimonials = useMemo(
    () => [...testimonials, ...testimonials],
    [testimonials]
  );

  const animationClass =
    direction === "right" ? "marquee-track-right" : "marquee-track-left";

  return (
    <div className="marquee-row group/row">
      <div className={`marquee-track ${animationClass} transform-gpu`}>
        {duplicatedTestimonials.map((testimonial, index) => (
          <TestimonialCard
            // Duplicate set ke liye stable-unique key chahiye, isliye index bhi jod diya
            key={`${testimonial.id}-${index}`}
            name={testimonial.name}
            course={testimonial.course}
            rating={testimonial.rating}
            review={testimonial.review}
            image={testimonial.image}
          />
        ))}
      </div>
    </div>
  );
};

// Memo lagaya - jab tak testimonials array reference change na ho, row re-render nahi hogi
export default memo(TestimonialRow);
