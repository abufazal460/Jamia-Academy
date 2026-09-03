import { memo } from "react";
import { motion } from "motion/react";
import { MapPin, Clock, Navigation } from "lucide-react";
import { mapConfig } from "../data/contact.data";
import { scaleInVariant, viewportOnce } from "../motion/contact.motion";
import { buttonHoverVariant } from "../../../shared/motion/hover.motion";

const MapSection = () => {
  return (
    <section
      className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:py-24"
      aria-labelledby="map-section-heading"
    >
      <div className="relative h-[26rem] overflow-hidden rounded-[2rem] shadow-2xl sm:h-[32rem] lg:h-[42rem]">
        <iframe
          title={mapConfig.heading}
          src={mapConfig.embedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full grayscale-[15%] contrast-[1.05]"
          allowFullScreen
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(38,70,83,0.15) 0%, rgba(38,70,83,0) 40%)",
          }}
          aria-hidden="true"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={scaleInVariant}
          className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/50 bg-white/70 p-6 shadow-2xl backdrop-blur-2xl sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-sm"
        >
          <h2
            id="map-section-heading"
            className="flex items-center gap-2 text-lg font-bold text-[#2B2D42]"
          >
            <MapPin className="h-5 w-5 text-[#E63946]" aria-hidden="true" />
            {mapConfig.heading}
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-[#2B2D42]/70">
            {mapConfig.address}
          </p>

          <ul className="mt-4 flex flex-col gap-1.5 border-t border-[#2B2D42]/10 pt-4">
            {mapConfig.workingHours.map((slot) => (
              <li
                key={slot.day}
                className="flex items-center justify-between text-xs text-[#2B2D42]/70"
              >
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="h-3.5 w-3.5 text-[#2A9D8F]" aria-hidden="true" />
                  {slot.day}
                </span>
                <span>{slot.time}</span>
              </li>
            ))}
          </ul>

          <motion.a
            href={mapConfig.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            variants={buttonHoverVariant}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E63946] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#E63946]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            {mapConfig.ctaLabel}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(MapSection);
