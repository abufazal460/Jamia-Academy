import { memo, useMemo } from "react";
import TestimonialCard from "./TestimonialCard";

const TestimonialRow = ({ testimonials, direction = "left" }) => {

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

export default memo(TestimonialRow);
