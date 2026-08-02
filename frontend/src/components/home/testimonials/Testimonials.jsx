// Testimonials.jsx
// Ye main orchestrator component hai jo Testimonials section ko poora assemble karta hai
// Heading + Subheading + Top row (left) + Bottom row (right)

import { motion } from "motion/react";
import TestimonialRow from "./TestimonialRow";
import {
  testimonialsRowOne,
  testimonialsRowTwo,
} from "../../../data/testimonialsData";
import "./testimonials.css";

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative w-full overflow-hidden bg-black py-16 sm:py-20 lg:py-28"
    >
      {/* Section header */}
      <header className="mx-auto mb-10 max-w-2xl px-4 text-center sm:mb-14">
        <motion.h2
          id="testimonials-heading"
          className="font-orbitron text-[clamp(1.5rem,4vw,2.5rem)] font-semibold text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          What Our Students Say
        </motion.h2>

        <motion.p
          className="mt-3 text-[clamp(0.875rem,1.5vw,1rem)] text-white/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          Trusted by hundreds of learners across India.
        </motion.p>
      </header>

      {/* Marquee rows */}
      <div className="flex flex-col gap-6 sm:gap-8">
        <TestimonialRow testimonials={testimonialsRowOne} direction="left" />
        <TestimonialRow testimonials={testimonialsRowTwo} direction="right" />
      </div>
    </section>
  );
};

export default Testimonials;
