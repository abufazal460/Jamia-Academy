/*
========================================

File:
WhyChooseUs.jsx

Purpose:
Ye component "Why Choose Jamia Academy" section render karta hai — credibility,
teaching quality, aur career support ko highlight karke trust build karne ke liye.

Responsibilities:
- Section heading + description
- Dynamic feature cards (icon, title, description) from aboutData.whyChooseUs
- GSAP scroll-triggered stagger reveal (replay-enabled)
- Framer Motion hover interactions (lift, scale, icon animation, glow)

Animation Engine:
GSAP + ScrollTrigger — replay-enabled (once:false):
Heading → Description → Feature cards (stagger 0.15, duration 0.8, expo.out)
Framer Motion — hover only (y, scale, icon rotate, shadow, gradient transition)

Data Source:
@/data/aboutData → whyChooseUs array (id, title, description, icon)

========================================
*/

// 1. React
import React, { useRef } from "react";

// 2. Third-party Libraries
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BadgeCheck, GraduationCap, Briefcase, ShieldCheck } from "lucide-react";

// 3. Internal Components

// 4. Hooks
import useGSAPAnimation from "../../../hooks/useGSAPAnimation";
import usePrefersReducedMotion from "../../../hooks/usePrefersReducedMotion";

// 5. Utilities
import { cn, safeArray } from "../../../utils/helpers";

// 6. Constants / Data
import { whyChooseUs } from "../../../data/aboutData";
import { gsapEase } from "../../../constants/animations";

// 7. Styles

gsap.registerPlugin(ScrollTrigger);

// -----------------------------------------------------------------------------
// ICON MAP — whyChooseUs array me icon sirf string name ke roop me store hai,
// taaki data file pure rahe (koi JSX/component import data file me na ho)
// -----------------------------------------------------------------------------
const iconMap = {
  BadgeCheck,
  GraduationCap,
  Briefcase,
  ShieldCheck,
};

/**
 * WhyChooseUs
 * Ye component kya karta hai: "Why Choose Us" feature cards ko grid me render karta hai
 * Kyu banaya gaya: credibility, teaching quality, aur career support ko highlight karne ke liye
 * Kab call hoga: pages/About.jsx me FacultyGrid ke baad
 * Kya return karega: <section> jisme heading + responsive 3-card grid hai
 */
const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const safeReasons = safeArray(whyChooseUs);

  // ---------------------------------------------------------------------------
  // GSAP SCROLLTRIGGER TIMELINE
  // Sequence: Heading → Description → Feature cards (stagger)
  // toggleActions "play reverse play reverse" — replay har baar, once:true kabhi nahi
  // ---------------------------------------------------------------------------
  const scopeRef = useGSAPAnimation((scope) => {
    if (!sectionRef.current) return;

    // Reduced motion: seedha final state set karo, koi timeline nahi chalao
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
        toggleActions: "play reverse play reverse",
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

    // STEP 2 — Section description
    if (descriptionRef.current) {
      tl.from(
        descriptionRef.current,
        { opacity: 0, y: 18, duration: 0.5, ease: gsapEase.paragraph },
        "-=0.35"
      );
    }

    // STEP 3 — Feature cards: one by one, duration 0.8, stagger 0.15, expo.out
    if (cardsRef.current) {
      tl.from(
        cardsRef.current.children,
        {
          opacity: 0,
          y: 40,
          scale: 0.92,
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.15,
        },
        "-=0.2"
      );

      // Icon-level animation — scale + opacity + subtle rotation, separate from card
      const icons = cardsRef.current.querySelectorAll("[data-why-icon]");
      if (icons.length) {
        tl.from(
          icons,
          { opacity: 0, scale: 0.5, rotate: -12, duration: 0.45, ease: gsapEase.icon, stagger: 0.15 },
          "-=0.55"
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
      id="why-choose-us"
      aria-labelledby="why-choose-us-heading"
      className="relative w-full overflow-hidden bg-[#2B2D42] py-20 sm:py-24 lg:py-28"
    >
      {/* Decorative soft glow — purely visual, aria-hidden */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[80%] rounded-full bg-[#E63946]/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16">
        {/* Section heading + description */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#F4A261]">
            Why Jamia Academy
          </span>
          <h2
            id="why-choose-us-heading"
            ref={headingRef}
            className="mt-3 font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white"
          >
            Why Choose Us
          </h2>
          <p ref={descriptionRef} className="mt-4 text-sm sm:text-base leading-relaxed text-white/60">
            Credibility, quality education, and real career support — the foundations every family looks for.
          </p>
        </div>

        {/* Feature cards — mobile: 1 col, tablet: 2 col, desktop: 3 col horizontal */}
        <div
          ref={cardsRef}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch"
        >
          {safeReasons.length > 0 ? (
            safeReasons.map((reason) => {
              const Icon = iconMap[reason?.icon] || ShieldCheck;
              return (
                <motion.div
                  key={reason?.id || reason?.title}
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-3xl",
                    "border border-white/10 bg-white/[0.06] backdrop-blur-xl",
                    "p-7 sm:p-8 shadow-[0_14px_40px_rgba(0,0,0,0.25)] will-change-transform"
                  )}
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          y: -10,
                          scale: 1.03,
                          boxShadow: "0 22px 54px rgba(0,0,0,0.4)",
                        }
                  }
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Gradient highlight sweep on hover — decorative */}
                  <span
                    className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[#E63946]/0 via-[#F4A261]/0 to-[#2A9D8F]/0 opacity-0 group-hover:opacity-100 group-hover:from-[#E63946]/10 group-hover:via-[#F4A261]/5 group-hover:to-[#2A9D8F]/10 transition-opacity duration-300"
                    aria-hidden="true"
                  />

                  {/* Decorative accent element — soft glow circle */}
                  <span
                    className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-[#2A9D8F]/10 blur-2xl"
                    aria-hidden="true"
                  />

                  {/* 1. Icon container */}
                  <motion.span
                    data-why-icon
                    className="relative z-10 mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E63946]/20 to-[#F4A261]/20 text-[#F4A261]"
                    whileHover={prefersReducedMotion ? {} : { rotate: 10, scale: 1.08 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    aria-hidden="true"
                  >
                    <Icon size={24} />
                  </motion.span>

                  {/* 2. Title */}
                  <h3 className="relative z-10 text-lg sm:text-xl font-semibold text-white">
                    {reason?.title || "Why Choose Us"}
                  </h3>

                  {/* 3. Description */}
                  <p className="relative z-10 mt-2.5 text-sm sm:text-base leading-relaxed text-white/60 flex-1">
                    {reason?.description || ""}
                  </p>

                  {/* 4. Decorative accent — bottom divider line that grows on hover */}
                  <span
                    className="relative z-10 mt-5 block h-[2px] w-10 rounded-full bg-gradient-to-r from-[#E63946] to-[#F4A261] transition-all duration-300 group-hover:w-16"
                    aria-hidden="true"
                  />
                </motion.div>
              );
            })
          ) : (
            // Defensive fallback — data missing hone par bhi layout crash na ho
            <p className="col-span-full text-center text-sm text-white/50">
              {/* TODO:
                  Replace Dummy Data with Official Jamia Academy Content. */}
              Reasons coming soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
