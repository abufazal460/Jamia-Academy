import { motion } from "motion/react";
import { contactHero } from "../data/contact.data";
import { slideInLeft, slideInRight } from "../motion/contact.motion";
import { buttonHoverVariant } from "../../../shared/motion/hover.motion";
import { floatingCard, noMotion } from "../../../shared/motion/floating.motion";
import { usePrefersReducedMotion } from "../../../shared/hooks/usePrefersReducedMotion";
import { resolveIcon } from "../../../shared/utils/icons";
import TransitionLink from "../../../app/providers/page-transition/TransitionLink";
import HeroImg from "../../../assets/images/common/contact.png"

const ACCENT_MAP = {
  primary: "#E63946",
  orange: "#F4A261",
  teal: "#2A9D8F",
  darkTeal: "#264653",
};

const VISUAL_CARD_POSITIONS = [
  "top-2 left-0 sm:top-4 sm:left-2",
  "top-6 right-0 sm:top-10 sm:right-2",
  "bottom-4 left-2 sm:bottom-8 sm:left-4",
  "bottom-0 right-4 sm:bottom-6 sm:right-8",
];

const ContactHero = () => {
  const reducedMotion = usePrefersReducedMotion();
  const BadgeIcon = resolveIcon(contactHero.icon);

  return (
    <section
      className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 pt-28 pb-16 sm:px-10 lg:grid-cols-2 lg:gap-8 lg:pt-36 lg:pb-24"
      aria-labelledby="contact-hero-heading"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideInLeft}
        className="flex flex-col items-start gap-6"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-[#2A9D8F]/10 text-[#2A9D8F] px-4 py-1.5 text-sm font-semibold">
          {BadgeIcon && <BadgeIcon className="h-4 w-4" aria-hidden="true" />}
          {contactHero.badge}
        </span>

        <h1
          id="contact-hero-heading"
          className="text-[clamp(2rem,4.5vw,3.5rem)] font-heading font-extrabold leading-[1.1] text-[#2B2D42]"
        >
          {contactHero.headingPrefix}{" "}
          <span className="bg-gradient-to-r from-[#E63946] via-[#F4A261] to-[#2A9D8F] bg-clip-text text-transparent">
            {contactHero.highlightWord}
          </span>
        </h1>

        <p className="max-w-xl text-[clamp(1rem,1.2vw,1.15rem)] leading-relaxed text-[#2B2D42]/70">
          {contactHero.description}
        </p>

        <div className="mt-2 flex flex-wrap gap-4">
          <TransitionLink
            to={contactHero.buttons.primary.href}
            variants={buttonHoverVariant}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="rounded-full bg-[#E63946] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#E63946]/25 transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
          >
            {contactHero.buttons.primary.label}
          </TransitionLink>
          <motion.a
            href={contactHero.buttons.secondary.href}
            variants={buttonHoverVariant}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="rounded-full border-2 border-[#2B2D42]/15 bg-white/60 px-7 py-3.5 text-sm font-semibold text-[#2B2D42] backdrop-blur-sm transition-colors hover:border-[#2A9D8F]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A9D8F]"
          >
            {contactHero.buttons.secondary.label}
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideInRight}
        className="relative flex h-[22rem] items-center justify-center sm:h-[32rem] lg:h-[32rem]"
        aria-hidden="true"
      >
        <div className="relative h-60 w-80 overflow-hidden rounded-[2rem] shadow-2xl backdrop-blur-xl sm:h-80 sm:w-3/4 lg:h-85 lg:w-85">
          <img
            src={HeroImg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {contactHero.visualCards.map((card, index) => {
          const Icon = resolveIcon(card.icon);
          return (
            <motion.div
              key={card.id}
              variants={reducedMotion ? noMotion : floatingCard(index * 0.6)}
              animate="animate"
              className={`absolute ${VISUAL_CARD_POSITIONS[index]} flex max-w-[8.5rem]  items-center gap-1.5 rounded-2xl  bg-white/70 px-3 py-2 shadow-lg backdrop-blur-md sm:max-w-none sm:gap-2 sm:px-4 sm:py-2.5`}
            >

              {Icon && (
                <Icon
                  className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4"
                  style={{ color: ACCENT_MAP[card.accent] }}
                  strokeWidth={2}
                />
              )}
              <span className="truncate text-[0.65rem] font-semibold text-[#2B2D42] sm:whitespace-nowrap sm:text-xs">
                {card.label}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default ContactHero;
