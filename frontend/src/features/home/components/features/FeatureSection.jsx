
import { LazyMotion, domAnimation, m } from "motion/react";
import { featuresData } from "../../data/features.data";
import {
  VIEWPORT_REPLAY,
  cardStaggerContainer,
  getCardDirection,
  getCardVariant,
  cardHoverLift,
  iconHoverRotate,
} from "../../../../shared/motion/variants";
import {
  SECTION_CONTAINER,
  SECTION_PADDING_Y,
} from "../../../../shared/constants/layout.constants";

const FeatureSection = () => {
  return (
    <LazyMotion features={domAnimation} strict>
      <section
        aria-label="Why join us"
        className="relative isolate w-full overflow-hidden bg-gradient-secondary"
      >
        <div
          className={`relative z-10 ${SECTION_CONTAINER} ${SECTION_PADDING_Y}`}
        >
          <h2 className="sr-only">Why Join Jamia Academy</h2>
          <m.ul
            role="list"
            aria-label="Reasons to join"
            variants={cardStaggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_REPLAY}
            className="grid grid-cols-1 gap-[clamp(1.25rem,2.5vw,2rem)] sm:grid-cols-2 lg:grid-cols-3"
          >
            {featuresData.map((feature, index) => {
              const direction = getCardDirection(index);
              const Icon = feature.icon;

              return (
                <m.li
                  key={feature.id}
                  variants={getCardVariant(direction)}
                  className="list-none"
                >
                  <m.article
                    whileHover={cardHoverLift}
                    tabIndex={0}
                    className="group relative overflow-hidden rounded-3xl hover:shadow-card bg-card  p-[clamp(1.5rem,3vw,2.25rem)] shadow-[0_10px_35px_rgba(2,6,23,0.45)] transition-all duration-300"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-100/60 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                    />

                    <m.div
                      whileHover={iconHoverRotate}
                      className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2A9D8F]/10 text-[#2A9D8F] shadow-md"
                    >
                      <Icon aria-hidden="true" className="h-7 w-7" />
                    </m.div>

                    <header className="relative z-10">
                      <h3 className="font-['Poppins'] text-[clamp(1.1rem,1rem+0.4vw,1.35rem)] font-extrabold leading-snug text-slate-900">
                        {feature.title}
                      </h3>
                    </header>
                    <p className="font-medium relative z-10 mt-2 text-[clamp(0.9rem,0.85rem+0.2vw,1rem)] leading-relaxed text-slate-600">
                      {feature.description}
                    </p>
                  </m.article>
                </m.li>
              );
            })}
          </m.ul>
        </div>
      </section>
    </LazyMotion>
  );
};

export default FeatureSection;
