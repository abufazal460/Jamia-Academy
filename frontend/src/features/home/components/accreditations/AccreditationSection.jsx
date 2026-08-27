
import { LazyMotion, domAnimation, m } from "motion/react";
import { accreditationsData } from "../../data/accreditations.data";
import {
  VIEWPORT_REPLAY,
  textStaggerContainer,
  headingRiseVariant,
  paragraphRiseVariant,
  cardStaggerContainer,
  getCardDirection,
  getCardVariant,
  logoImageVariant,
  cardHoverLift,
} from "../../../../shared/motion/variants";
import { SECTION_CONTAINER, SECTION_PADDING_Y } from "../../../../shared/constants/layout.constants";

const AccreditationSection = () => {
  return (
    <LazyMotion features={domAnimation} strict>
     
      <section
        aria-label="Our Accreditations"
        className="relative w-full overflow-hidden bg-gradient-secondary"
      >
       

        <div
          className={`relative z-10 ${SECTION_CONTAINER} ${SECTION_PADDING_Y} grid grid-cols-1 items-center gap-x-[clamp(2rem,5vw,5rem)] gap-y-12 lg:grid-cols-[1fr_1.15fr]`}
        >
          {/* ---------------------------------------------------------- */}
          {/* LEFT — Heading + Paragraph (stagger animation on viewport) */}
          {/* ---------------------------------------------------------- */}
          <m.div
            variants={textStaggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_REPLAY}
          >
            <m.h2
              variants={headingRiseVariant}
              className="font-['Inter'] text-[clamp(1.9rem,1.4rem+2.5vw,4rem)] font-extrabold leading-[1.1] tracking-wide text-white"
            >
              Our Accreditations
            </m.h2>
            <m.p
              variants={paragraphRiseVariant}
              className="font-light mt-5 max-w-md text-[clamp(1rem,0.9rem+1vw,2rem)] leading-relaxed text-slate-200"
            >
              We are proud to be recognized by leading industry organizations
            </m.p>
          </m.div>

          {/* ---------------------------------------------------------- */}
          {/* RIGHT — Logo cards grid (2 columns, scalable via CSS grid) */}
          {/* ---------------------------------------------------------- */}
          <m.ul
            role="list"
            aria-label="Accrediting organizations"
            variants={cardStaggerContainer}
            initial="hidden"
            whileInView="visible"
            // viewport={VIEWPORT_REPLAY}
            viewport={{once: true}}
            className="grid grid-cols-2 gap-[clamp(0.9rem,2vw,1.5rem)]"
          >
            {accreditationsData.map((item, index) => {
              // Har card ko deterministic-random direction milti hai
              // (index-based pattern — no hydration mismatch, see variants.js)
              const direction = getCardDirection(index);

              return (
                <m.li key={item.id} variants={getCardVariant(direction)} className="list-none ">
                 
                  <m.div
                    whileHover={cardHoverLift}
                    tabIndex={0}
                    className="group relative rounded-[1.75rem] p-[2.2px] transition-colors duration-300 -border bg-gradient-to-br from-[#E63946] via-[#F4A261] to-[#2A9D8F]"
                  >
                    <article
                      className="relative flex aspect-[3/2] w-full flex-col items-center justify-center rounded-[calc(1.75rem-1.5px)] p-[clamp(1rem,3vw,1.75rem)] shadow-[0_8px_30px_rgba(15,23,42,0.35)] transition-all duration-300 bg-card hover:shadow-card"
                    >
                      {/* Image — apni animation se opacity/scale mein aati hai */}
                      <m.img
                        variants={logoImageVariant}
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                        className="max-h-full max-w-[95%] rounded-2xl origin-center object-contain transition-transform duration-300 group-hover:scale-[1.06]"
                      />
                    </article>
                  </m.div>
                </m.li>
              );
            })}
          </m.ul>
        </div>
      </section>
    </LazyMotion>
  );
};

export default AccreditationSection;