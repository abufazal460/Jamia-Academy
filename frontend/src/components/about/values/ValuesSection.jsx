/*
========================================

File:
ValuesSection.jsx

Purpose:
Ye component Jamia Academy ke core values ko premium glass cards ke grid me
render karta hai — trust, excellence, innovation, community aur compassion
communicate karne ke liye.

Responsibilities:
- Section heading + description
- Dynamic value cards (icon, title, description) from aboutData.values
- Stagger scroll reveal + icon entrance animation
- Hover: scale, lift, icon rotation, shadow

Animation Engine:
GSAP + ScrollTrigger — replay-enabled (once:false):
Heading → Description → Value cards (stagger 0.12, expo.out)
Framer Motion — hover only (scale, y, icon rotation, shadow)

Data Source:
@/data/aboutData → values array (id, title, description, icon)

========================================
*/

// 1. React
import React, { useRef } from "react";

// 2. Third-party Libraries
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Award, Lightbulb, Users, HeartHandshake, Sparkles } from "lucide-react";

// 3. Internal Components

// 4. Hooks
import useGSAPAnimation from "@/hooks/useGSAPAnimation";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

// 5. Utilities
import { cn, safeArray } from "@/utils/helpers";

// 6. Constants / Data
import { values } from "@/data/aboutData";
import { gsapEase } from "@/constants/animations";

// 7. Styles

gsap.registerPlugin(ScrollTrigger);

// -----------------------------------------------------------------------------
// ICON MAP — values array me icon sirf string name ke roop me store hai
// (data file pure JSON-like rehni chahiye), ye map string ko component se jodta hai
// -----------------------------------------------------------------------------
const iconMap = {
  ShieldCheck,
  Award,
  Lightbulb,
  Users,
  HeartHandshake,
};

/**
 * ValuesSection
 * Ye component kya karta hai: institute ke core values ko card grid me render karta hai
 * Kyu banaya gaya: educational culture aur principles ko visually communicate karne ke liye
 * Kab call hoga: pages/About.jsx me VisionMission ke baad
 * Kya return karega: <section> jisme heading + responsive value-card grid hai
 */
const ValuesSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const safeValues = safeArray(values);

  const scopeRef = useGSAPAnimation((scope) => {
    if (!sectionRef.current) return;

    if (prefersReducedMotion) {
      gsap.set(
        [headingRef.current, descriptionRef.current, cardsRef.current?.children],
        { opacity: 1, y: 0, scale: 1, rotate: 0, clearProps: "all" }
      );
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 30%",
        toggleActions: "play reverse play reverse", // replay har entry — once:true kabhi nahi
        invalidateOnRefresh: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        markers: false,
      },
    });

    // STEP 1 — Section heading
    if (headingRef.current) {
      tl.from(headingRef.current, {
        opacity: 0,
        y: 36,
        filter: "blur(6px)",
        duration: 0.7,
        ease: gsapEase.heading, // expo.out
      });
    }

    // STEP 2 — Description
    if (descriptionRef.current) {
      tl.from(
        descriptionRef.current,
        { opacity: 0, y: 18, duration: 0.5, ease: gsapEase.paragraph },
        "-=0.35"
      );
    }

    // STEP 3 — Value cards: stagger entrance + icon scale/rotate inside each card
    if (cardsRef.current) {
      tl.from(
        cardsRef.current.children,
        {
          opacity: 0,
          y: 32,
          scale: 0.92,
          duration: 0.65,
          ease: "expo.out",
          stagger: 0.12,
        },
        "-=0.2"
      );

      // Icon entrance — subtle scale + rotate, separate from card container animation
      const icons = cardsRef.current.querySelectorAll("[data-value-icon]");
      if (icons.length) {
        tl.from(
          icons,
          { opacity: 0, scale: 0.5, rotate: -15, duration: 0.4, ease: gsapEase.icon, stagger: 0.12 },
          "-=0.5"
        );
      }
    }
  }, [prefersReducedMotion]);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
        scopeRef.current = node;
      }}
      id="values"
      aria-labelledby="values-heading"
      className="relative w-full overflow-hidden bg-[#F7F3E9] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16">
        {/* Section heading + description */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E63946]">
            <Sparkles size={14} aria-hidden="true" />
            What We Stand For
          </span>
          <h2
            id="values-heading"
            ref={headingRef}
            className="mt-3 font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#2B2D42]"
          >
            Our Core Values
          </h2>
          <p ref={descriptionRef} className="mt-4 text-sm sm:text-base leading-relaxed text-[#2B2D42]/60">
            The principles that shape our culture, our classrooms, and every student we serve.
          </p>
        </div>

        {/* Value cards grid — mobile: 1 col, tablet: 2-3 col, desktop: 5 col */}
        <div
          ref={cardsRef}
          className="mt-14 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 lg:gap-6"
        >
          {safeValues.length > 0 ? (
            safeValues.map((value) => {
              const Icon = iconMap[value?.icon] || ShieldCheck;
              return (
                <motion.div
                  key={value?.id || value?.title}
                  className={cn(
                    "group relative flex flex-col rounded-3xl border border-[#2B2D42]/10 bg-white/70",
                    "backdrop-blur-md p-6 shadow-[0_8px_28px_rgba(43,45,66,0.06)] will-change-transform"
                  )}
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          scale: 1.04,
                          y: -8,
                          boxShadow: "0 18px 40px rgba(43,45,66,0.14)",
                          borderColor: "rgba(230,57,70,0.35)",
                        }
                  }
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Gradient accent overlay on hover */}
                  <span
                    className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[#E63946]/0 to-[#F4A261]/0 group-hover:from-[#E63946]/5 group-hover:to-[#F4A261]/5 transition-colors duration-300"
                    aria-hidden="true"
                  />
                  <motion.span
                    data-value-icon
                    className="relative z-10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2A9D8F]/10 text-[#2A9D8F]"
                    whileHover={prefersReducedMotion ? {} : { rotate: 12 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    aria-hidden="true"
                  >
                    <Icon size={22} />
                  </motion.span>
                  <h3 className="relative z-10 text-base sm:text-lg font-semibold text-[#2B2D42]">
                    {value?.title || "Value"}
                  </h3>
                  <p className="relative z-10 mt-2 text-sm leading-relaxed text-[#2B2D42]/60">
                    {value?.description || ""}
                  </p>
                </motion.div>
              );
            })
          ) : (
            // Defensive fallback — data missing hone par bhi layout crash na ho
            <p className="col-span-full text-center text-sm text-[#2B2D42]/50">
              {/* TODO:
                  Replace Dummy Data with Official Jamia Academy Content. */}
              Values content coming soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
