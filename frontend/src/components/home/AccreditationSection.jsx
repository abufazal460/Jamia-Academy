/**
 * AccreditationSection.jsx
 * ---------------------------------------------------------------------------
 * RESPONSIBILITY
 * "Our Accreditations" section render karta hai — left side heading +
 * paragraph, right side logo cards ka responsive grid. Screenshot ka UI
 * copy nahi kiya gaya — yeh ek fresh premium redesign hai (glass cards,
 * soft glow gradient background, gradient-border hover) jabki CONTENT
 * exactly wahi rakha gaya hai jo diya gaya tha.
 *
 * DATA FLOW
 * accreditationsData (src/data/accreditations.data.js) -> is component mein
 * import hota hai -> `.map()` se cards render hote hai. Naya logo add karna
 * ho to sirf data file edit karo, yeh component untouched rahega.
 *
 * ANIMATION SYSTEM
 * Saari variants src/animations/variants.js se aati hai (DRY — koi bhi
 * animation object yaha dobara define nahi kiya gaya). LazyMotion +
 * domAnimation use kiya hai taaki Framer Motion ka bundle-size chota rahe
 * (sirf zaroori animation features load hote hai, poora "motion" package
 * nahi).
 * ---------------------------------------------------------------------------
 */

import { LazyMotion, domAnimation, m } from "framer-motion";
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
} from "../../animations/variants";
import { SECTION_CONTAINER, SECTION_PADDING_Y } from "../../constants/layout.constants";

const AccreditationSection = () => {
  return (
    <LazyMotion features={domAnimation} strict>
      {/*
        SECTION BACKGROUND
        "Not white" + "elegant premium gradient" requirement. Deep indigo/
        slate gradient (#0B1224 -> #131B34 -> #1B2745) use kiya hai jo
        premium/enterprise feel deta hai. `relative overflow-hidden` isliye
        taaki neeche diye glow-blobs (absolute positioned blurred circles)
        section ke bahar overflow karke horizontal-scrollbar na banaye.
      */}
      <section
        aria-label="Our Accreditations"
        className="relative w-full overflow-hidden bg-[linear-gradient(135deg,#0B1224_0%,#131B34_45%,#1B2745_100%)]"
      >
        {/*
          DECORATIVE GLOW BLOBS
          Yeh sirf ambient light ka feel dete hai — "soft gradients, subtle
          glow" requirement. aria-hidden isliye taaki screen-readers inhe
          skip kare (yeh purely decorative hai, content nahi).
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 h-[22rem] w-[22rem] rounded-full bg-cyan-500/20 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-16 h-[26rem] w-[26rem] rounded-full bg-violet-500/20 blur-[120px]"
        />

        {/* CONTAINER — same outer width jo FeatureSection bhi use karega */}
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
              className="text-[clamp(1.9rem,1.4rem+2vw,3.25rem)] font-extrabold leading-[1.1] tracking-tight text-white"
            >
              Our Accreditations
            </m.h2>
            <m.p
              variants={paragraphRiseVariant}
              className="mt-5 max-w-md text-[clamp(1rem,0.9rem+0.3vw,1.125rem)] leading-relaxed text-slate-300"
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
            viewport={VIEWPORT_REPLAY}
            className="grid grid-cols-2 gap-[clamp(0.9rem,2vw,1.5rem)]"
          >
            {accreditationsData.map((item, index) => {
              // Har card ko deterministic-random direction milti hai
              // (index-based pattern — no hydration mismatch, see variants.js)
              const direction = getCardDirection(index);

              return (
                <m.li key={item.id} variants={getCardVariant(direction)} className="list-none">
                  {/*
                    GRADIENT-BORDER CARD TRICK
                    Outer wrapper ek gradient background rakhta hai, andar
                    1px ka padding chhod ke white card baithta hai — isse
                    "gradient border effect" milta hai bina kisi extra
                    pseudo-element library ke. Hover par gradient opacity
                    barhti hai (group-hover) — subtle glow-border reveal.
                  */}
                  <m.div
                    whileHover={cardHoverLift}
                    tabIndex={0}
                    className="group relative rounded-[1.75rem] bg-gradient-to-br from-cyan-400/0 via-violet-400/0 to-fuchsia-400/0 p-[1.5px] transition-colors duration-300 hover:from-cyan-400/70 hover:via-violet-400/60 hover:to-fuchsia-400/70 focus-visible:outline-none focus-visible:from-cyan-400/70 focus-visible:via-violet-400/60 focus-visible:to-fuchsia-400/70"
                  >
                    <article
                      className="relative flex aspect-[4/3] w-full flex-col items-center justify-center rounded-[calc(1.75rem-1.5px)] bg-white p-[clamp(1rem,3vw,1.75rem)] shadow-[0_8px_30px_rgba(15,23,42,0.35)] transition-shadow duration-300 group-hover:shadow-[0_20px_45px_rgba(56,189,248,0.25)] group-focus-visible:ring-2 group-focus-visible:ring-cyan-400"
                    >
                      {/* Image — apni animation se opacity/scale mein aati hai */}
                      <m.img
                        variants={logoImageVariant}
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                        className="max-h-full max-w-[85%] origin-center object-contain transition-transform duration-300 group-hover:scale-[1.06]"
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