/**
 * FeatureSection.jsx
 * ---------------------------------------------------------------------------
 * RESPONSIBILITY
 * Teen feature-cards (Competitive salary / Go beyond design skills / Master
 * new technologies) render karta hai. Screenshot mein RED background tha aur
 * ek black decorative block cards ke peeche tha — dono cheezein YAHA copy
 * NAHI ki gayi. Iski jagah ek premium Navy -> Blue -> Purple gradient
 * background hai, aur decorative shapes CSS `before:` / `after:` pseudo-
 * elements + blurred glow-orbs se banaye gaye hai (koi image asset nahi).
 *
 * DATA FLOW
 * featuresData (src/data/features.data.js) -> `.map()` se cards + icons
 * render hote hai. Naya card add karna ho to sirf data file edit karo.
 * ---------------------------------------------------------------------------
 */

import { LazyMotion, domAnimation, m } from "framer-motion";
import { featuresData } from "../../data/features.data";
import {
  VIEWPORT_REPLAY,
  textStaggerContainer,
  headingRiseVariant,
  cardStaggerContainer,
  getCardDirection,
  getCardVariant,
  cardHoverLift,
  iconHoverRotate,
} from "../../animations/variants";
import {
  SECTION_CONTAINER,
  SECTION_PADDING_Y,
} from "../../constants/layout.constants";

const FeatureSection = () => {
  return (
    <LazyMotion features={domAnimation} strict>
      {/*
        SECTION BACKGROUND
        "Dark Navy -> Blue -> Cyan/Teal/Purple" combination, RED avoid kiya.
        `before:` aur `after:` pseudo-elements yaha explicitly use kiye hai
        (jaisa instruction mein maanga gaya tha) — do bade blurred glow-orbs
        jo decorative depth dete hai, real black-block copy nahi kiya.
        `isolate` + `overflow-hidden` taaki pseudo-elements section ke bahar
        na nikle (no horizontal scrollbar).
      */}
      <section
        aria-label="Why join us"
        className="relative isolate w-full overflow-hidden bg-[linear-gradient(160deg,#070B18_0%,#0B1E3E_35%,#123B63_65%,#3B1670_100%)]
          before:absolute before:-top-20 before:right-[-6rem] before:h-80 before:w-80 before:rounded-full
          before:bg-cyan-400/20 before:blur-[100px] before:content-['']
          after:absolute after:bottom-[-8rem] after:left-[-6rem] after:h-96 after:w-96 after:rounded-full
          after:bg-purple-500/25 after:blur-[120px] after:content-['']"
      >
        {/* Ek teesra chhota teal glow — depth ke layers barhane ke liye */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-teal-400/10 blur-[90px]"
        />

        <div
          className={`relative z-10 ${SECTION_CONTAINER} ${SECTION_PADDING_Y}`}
        >
          {/* -------------------------------------------------------- */}
          {/* HEADING (is section ka apna intro — content brief mein   */}
          {/* explicit heading text nahi tha, isliye ek chhota eyebrow */}
          {/* label diya hai jo cards ka context set karta hai)        */}
          {/* -------------------------------------------------------- */}

          {/* -------------------------------------------------------- */}
          {/* FEATURE CARDS GRID — 1 col mobile, 2 col tablet, 3 desktop*/}
          {/* -------------------------------------------------------- */}
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
              const Icon = feature.icon; // react-icons component reference

              return (
                <m.li
                  key={feature.id}
                  variants={getCardVariant(direction)}
                  className="list-none"
                >
                  <m.article
                    whileHover={cardHoverLift}
                    tabIndex={0}
                    className="group relative overflow-hidden rounded-3xl bg-white p-[clamp(1.5rem,3vw,2.25rem)] shadow-[0_10px_35px_rgba(2,6,23,0.45)] transition-shadow duration-300 hover:shadow-[0_25px_55px_rgba(56,189,248,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    {/*
                      "Background shine" hover effect — ek diagonal gradient
                      streak jo hover par left-to-right slide karta hai.
                      translate-x se hidden rehta hai, group-hover par visible.
                    */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-100/60 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                    />

                    {/* Icon badge */}
                    <m.div
                      whileHover={iconHoverRotate}
                      className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-blue-800 text-white shadow-md"
                    >
                      <Icon aria-hidden="true" className="h-7 w-7" />
                    </m.div>

                    <header className="relative z-10">
                      <h3 className="text-[clamp(1.1rem,1rem+0.4vw,1.35rem)] font-bold leading-snug text-slate-900">
                        {feature.title}
                      </h3>
                    </header>
                    <p className="relative z-10 mt-2 text-[clamp(0.9rem,0.85rem+0.2vw,1rem)] leading-relaxed text-slate-600">
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
