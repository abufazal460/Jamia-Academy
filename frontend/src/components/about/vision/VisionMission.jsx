/*
========================================

File:
VisionMission.jsx

Purpose:
Ye component Jamia Academy ke Vision, Mission, aur Commitment ko teen
equal-height glass cards me present karta hai — institutional philosophy
aur long-term goals communicate karne ke liye.

Responsibilities:
- Section heading + description
- Vision card (icon, title, text, subtitle)
- Mission card (dynamic points list with check icons)
- Commitment card (icon, title, paragraph)
- Subtle floating decorative background shapes

Animation Engine:
GSAP + ScrollTrigger — single timeline, replay-enabled (once:false):
Heading → Description → Vision card → Mission card → Commitment card
Framer Motion — card hover + decorative floating shapes only

Data Source:
@/data/aboutData → vision, mission (with points array), commitment

========================================
*/

// 1. React
import React, { useRef } from "react";

// 2. Third-party Libraries
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, Target, HeartHandshake, CheckCircle2 } from "lucide-react";

// 3. Internal Components

// 4. Hooks
import useGSAPAnimation from "@/hooks/useGSAPAnimation";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

// 5. Utilities
import { cn } from "@/utils/helpers";
import { safeArray } from "@/utils/helpers";

// 6. Constants / Data
import { vision, mission, commitment } from "@/data/aboutData";
import { gsapEase } from "@/constants/animations";

// 7. Styles

gsap.registerPlugin(ScrollTrigger);

/**
 * VisionMission
 * Ye component kya karta hai: Vision, Mission, Commitment teen cards me render karta hai
 * Kyu banaya gaya: institute ki philosophy aur long-term direction communicate karne ke liye
 * Kab call hoga: pages/About.jsx me CoFounderSection ke baad
 * Kya return karega: <section> jisme heading + 3-column equal-height card grid hai
 */
const VisionMission = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const visionCardRef = useRef(null);
  const missionCardRef = useRef(null);
  const commitmentCardRef = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const missionPoints = safeArray(mission?.points);

  const scopeRef = useGSAPAnimation((scope) => {
    if (!sectionRef.current) return;

    if (prefersReducedMotion) {
      gsap.set(
        [
          headingRef.current,
          descriptionRef.current,
          visionCardRef.current,
          missionCardRef.current,
          commitmentCardRef.current,
        ],
        { opacity: 1, y: 0, filter: "blur(0px)", clearProps: "all" }
      );
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 30%",
        toggleActions: "play reverse play reverse", // replay har baar viewport me aane par — once:true nahi
        invalidateOnRefresh: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        markers: false,
      },
    });

    // STEP 1 — Section heading: opacity + y + blur removal
    if (headingRef.current) {
      tl.from(headingRef.current, {
        opacity: 0,
        y: 40,
        filter: "blur(8px)",
        duration: 0.8,
        ease: gsapEase.heading, // expo.out
      });
    }

    // STEP 2 — Section description
    if (descriptionRef.current) {
      tl.from(
        descriptionRef.current,
        { opacity: 0, y: 20, duration: 0.5, ease: gsapEase.paragraph },
        "-=0.4"
      );
    }

    // STEP 3 — Vision card
    if (visionCardRef.current) {
      tl.from(
        visionCardRef.current,
        { opacity: 0, y: 40, scale: 0.95, duration: 0.7, ease: "power4.out" },
        "-=0.2"
      );
    }

    // STEP 4 — Mission card
    if (missionCardRef.current) {
      tl.from(
        missionCardRef.current,
        { opacity: 0, y: 40, scale: 0.95, duration: 0.7, ease: "power4.out" },
        "-=0.5"
      );
    }

    // STEP 5 — Commitment card
    if (commitmentCardRef.current) {
      tl.from(
        commitmentCardRef.current,
        { opacity: 0, y: 40, scale: 0.95, duration: 0.7, ease: "power4.out" },
        "-=0.5"
      );
    }

    // Mission points sequential animation — cards ke andar chhota stagger
    const pointItems = missionCardRef.current?.querySelectorAll("[data-mission-point]");
    if (pointItems?.length) {
      tl.from(
        pointItems,
        { opacity: 0, x: -12, duration: 0.35, ease: "power2.out", stagger: 0.08 },
        "-=0.3"
      );
    }
  }, [prefersReducedMotion]);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
        scopeRef.current = node;
      }}
      id="vision-mission"
      aria-labelledby="vision-mission-heading"
      className="relative w-full overflow-hidden bg-[#2B2D42] py-20 sm:py-24 lg:py-28"
    >
      {/* Decorative floating background shapes — slow, minimal, Framer Motion only */}
      <motion.div
        className="pointer-events-none absolute top-10 left-[10%] h-64 w-64 rounded-full bg-[#E63946]/10 blur-3xl"
        animate={prefersReducedMotion ? {} : { y: [0, 25, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-[8%] h-72 w-72 rounded-full bg-[#2A9D8F]/10 blur-3xl"
        animate={prefersReducedMotion ? {} : { y: [0, -20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16">
        {/* Section heading + description */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="vision-mission-heading" ref={headingRef} className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white">
            Vision, Mission &amp; Commitment
          </h2>
          <p ref={descriptionRef} className="mt-4 text-sm sm:text-base leading-relaxed text-white/60">
            The principles that guide every decision we make at Jamia Academy.
          </p>
        </div>

        {/* Equal-height 3-card grid — mobile: 1 col, tablet: 2+1, desktop: 3 col */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {/* ============================================================
              VISION CARD
          ============================================================= */}
          <motion.div
            ref={visionCardRef}
            className={cn(
              "flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.06]",
              "backdrop-blur-xl p-7 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.25)] will-change-transform",
              "md:col-span-2 lg:col-span-1"
            )}
            whileHover={
              prefersReducedMotion
                ? {}
                : { y: -8, scale: 1.02, boxShadow: "0 20px 50px rgba(0,0,0,0.35)" }
            }
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4A261]/15 text-[#F4A261]" aria-hidden="true">
              <Eye size={22} />
            </span>
            {vision?.subtitle && (
              <span className="text-xs font-semibold uppercase tracking-widest text-[#F4A261]">{vision.subtitle}</span>
            )}
            <h3 className="mt-2 text-xl sm:text-2xl font-bold text-white">{vision?.heading || "Our Vision"}</h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/65 flex-1">
              {vision?.description}
            </p>
          </motion.div>

          {/* ============================================================
              MISSION CARD — dynamic points list
          ============================================================= */}
          <motion.div
            ref={missionCardRef}
            className={cn(
              "flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.06]",
              "backdrop-blur-xl p-7 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.25)] will-change-transform"
            )}
            whileHover={
              prefersReducedMotion
                ? {}
                : { y: -8, scale: 1.02, boxShadow: "0 20px 50px rgba(0,0,0,0.35)" }
            }
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2A9D8F]/15 text-[#2A9D8F]" aria-hidden="true">
              <Target size={22} />
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">{mission?.heading || "Our Mission"}</h3>
            {mission?.description && (
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/65">{mission.description}</p>
            )}

            {missionPoints.length > 0 && (
              <ul className="mt-4 flex flex-1 flex-col gap-3">
                {missionPoints.map((point) => (
                  <li
                    key={point?.id || point?.text}
                    data-mission-point
                    className="flex items-start gap-2.5 text-sm text-white/75"
                  >
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#2A9D8F]" aria-hidden="true" />
                    {/* Short animated divider — decorative vertical accent before text */}
                    <span className="leading-relaxed">{point?.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          {/* ============================================================
              COMMITMENT CARD
          ============================================================= */}
          <motion.div
            ref={commitmentCardRef}
            className={cn(
              "relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10",
              "bg-white/[0.06] backdrop-blur-xl p-7 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.25)] will-change-transform"
            )}
            whileHover={
              prefersReducedMotion
                ? {}
                : { y: -8, scale: 1.02, boxShadow: "0 20px 50px rgba(0,0,0,0.35)" }
            }
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Subtle decorative background gradient */}
            <div
              className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br from-[#E63946]/20 to-transparent blur-2xl"
              aria-hidden="true"
            />
            <span className="relative z-10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E63946]/15 text-[#E63946]" aria-hidden="true">
              <HeartHandshake size={22} />
            </span>
            <h3 className="relative z-10 text-xl sm:text-2xl font-bold text-white">
              {commitment?.heading || "Our Commitment"}
            </h3>
            <p className="relative z-10 mt-3 text-sm sm:text-base leading-relaxed text-white/65 flex-1">
              {commitment?.description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
