import { motion } from "motion/react";
import { whyContactSection } from "../../data/contactData";
import { fadeUpVariant, staggerContainer, viewportOnce } from "../../animations/contactVariants";
import { interactiveCardVariant, iconHoverVariant } from "../../animations/hoverVariants";
import { resolveIcon } from "../../utils/iconResolver";

const WhyContactSection = () => {
  return (
    <section
      className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:py-24"
      aria-labelledby="why-contact-heading"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUpVariant}
        className="mb-12 text-center"
      >
        <h2
          id="why-contact-heading"
          className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-[#2B2D42]"
        >
          {whyContactSection.heading}
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-[#2B2D42]/70 sm:text-base">
          {whyContactSection.description}
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer(0.12)}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {whyContactSection.cards.map((card) => {
          const Icon = resolveIcon(card.icon);
          return (
            <motion.article
              key={card.id}
              variants={interactiveCardVariant}
              whileHover="hover"
              className="relative flex flex-col items-start gap-4 overflow-hidden rounded-3xl border border-white/50 bg-white/40 p-6 shadow-md backdrop-blur-xl"
            >
              <motion.div
                variants={iconHoverVariant}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2A9D8F] to-[#264653] text-white shadow-md"
              >
                {Icon && <Icon className="h-6 w-6" strokeWidth={2} />}
              </motion.div>
              <div>
                <h3 className="text-base font-bold text-[#2B2D42]">{card.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#2B2D42]/65">
                  {card.description}
                </p>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
};

export default WhyContactSection;
