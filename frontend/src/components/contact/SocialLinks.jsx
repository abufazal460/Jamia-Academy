import { memo } from "react";
import { motion } from "framer-motion";
import { socialConnect } from "../../data/contactData";
import {
  fadeUpVariant,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../../animations/contactVariants";
import { socialIconHoverVariant } from "../../animations/hoverVariants";
import { resolveIcon } from "../../utils/iconResolver";

const SocialLinks = () => {
  return (
    <section
      className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:py-24"
      aria-labelledby="social-connect-heading"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUpVariant}
        className="mb-10 text-center"
      >
        <h2
          id="social-connect-heading"
          className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-[#2B2D42]"
        >
          {socialConnect.heading}
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-[#2B2D42]/60 sm:text-base">
          {socialConnect.description}
        </p>
      </motion.div>

      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer(0.08)}
        className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
      >
        {socialConnect.links.map((link) => {
          const Icon = resolveIcon(link.icon);
          return (
            <motion.li key={link.id} variants={staggerItem}>
              <motion.a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                variants={socialIconHoverVariant}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className="flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-2xl border border-white/50 bg-white/40 shadow-md backdrop-blur-md transition-colors hover:border-[#E63946]/30 hover:shadow-[0_0_24px_rgba(230,57,70,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
              >
                {Icon && <Icon className="h-5 w-5 text-[#2B2D42]" strokeWidth={2} />}
                <span className="sr-only">{link.platform}</span>
              </motion.a>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
};

export default memo(SocialLinks);
