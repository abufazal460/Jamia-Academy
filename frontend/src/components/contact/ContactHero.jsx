import { motion } from "framer-motion";
import { contactHero } from "../../data/contactData";
import { slideInLeft, slideInRight } from "../../animations/contactVariants";
import { buttonHoverVariant } from "../../animations/hoverVariants";
import { floatingCard, noMotion } from "../../animations/floatingVariants";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { resolveIcon } from "../../utils/iconResolver";
import TransitionLink from "../pageTransition/TransitionLink"

const ACCENT_MAP = {
  primary: "#E63946",
  orange: "#F4A261",
  teal: "#2A9D8F",
  darkTeal: "#264653",
};

// Static — hoisted out of render so it isn't rebuilt on every map iteration
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
      {/* Left column */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideInLeft}
        className="flex flex-col items-start gap-6"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-[#E63946]/20 bg-[#E63946]/10 px-4 py-1.5 text-sm font-medium text-[#E63946]">
          {BadgeIcon && <BadgeIcon className="h-4 w-4" aria-hidden="true" />}
          {contactHero.badge}
        </span>

        <h1
          id="contact-hero-heading"
          className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.1] text-[#2B2D42]"
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

      {/* Right column — education themed floating visual */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideInRight}
        className="relative flex h-[22rem] items-center justify-center sm:h-[28rem] lg:h-[32rem]"
        aria-hidden="true"
      >
        {/* Central glass panel */}
        <div className="relative h-56 w-56 rounded-[2rem] border border-white/40 bg-white/30 shadow-2xl backdrop-blur-xl sm:h-72 sm:w-72 lg:h-80 lg:w-80">
          <div
            className="absolute inset-0 rounded-[2rem] opacity-40"
            style={{
              background:
                "linear-gradient(135deg, #E63946 0%, #F4A261 35%, #2A9D8F 70%, #264653 100%)",
              backgroundSize: "200% 200%",
              animation: reducedMotion ? "none" : "jamiaHeroGradientShift 6s ease infinite",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {BadgeIcon && (
              <BadgeIcon className="h-20 w-20 text-white drop-shadow-lg sm:h-24 sm:w-24" strokeWidth={1.5} />
            )}
          </div>
        </div>

        {/* Floating achievement cards */}
        {contactHero.visualCards.map((card, index) => {
          const Icon = resolveIcon(card.icon);
          return (
            <motion.div
              key={card.id}
              variants={reducedMotion ? noMotion : floatingCard(index * 0.6)}
              animate="animate"
              className={`absolute ${VISUAL_CARD_POSITIONS[index]} flex max-w-[8.5rem] items-center gap-1.5 rounded-2xl border border-white/50 bg-white/70 px-3 py-2 shadow-lg backdrop-blur-md sm:max-w-none sm:gap-2 sm:px-4 sm:py-2.5`}
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

      <style>{`
        @keyframes jamiaHeroGradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default ContactHero;
