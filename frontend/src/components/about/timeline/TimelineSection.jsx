/*
========================================

File:
TimelineSection.jsx

Purpose:
Ye component Jamia Academy ki growth journey ko ek cinematic, scroll-driven
vertical timeline ke roop me present karta hai — foundation se lekar recent
milestones tak.

Responsibilities:
- Central animated timeline line jo scroll ke saath progressively fill hoti hai
- Year badges + milestone cards (title, description) — desktop pe left/right
  alternating, mobile pe single column
- Har milestone ka independent entrance reveal (badge → card → text)

Animation Engine:
GSAP + ScrollTrigger:
- Ek scrub-linked timeline jo line ki height 0%→100% animate karti hai
  (scroll progress ke saath sync, "no sudden change" — smooth scrub:true)
- Har milestone ke liye alag ScrollTrigger: badge reveal → card reveal →
  title/description fade-up, replay-enabled (once:false)
Framer Motion — card hover (lift, shadow, border highlight) only

Data Source:
@/data/aboutData → timeline array (id, year, title, description)

========================================
*/

// 1. React
import React, { useRef } from "react";

// 2. Third-party Libraries
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flag } from "lucide-react";

// 3. Internal Components

// 4. Hooks
import useGSAPAnimation from "../../../hooks/useGSAPAnimation";
import usePrefersReducedMotion from "../../../hooks/usePrefersReducedMotion";

// 5. Utilities
import { cn, safeArray } from "../../../utils/helpers";

// 6. Constants / Data
import { timeline } from "../../../data/aboutData";
import { gsapEase } from "../../../constants/animations";

// 7. Styles

gsap.registerPlugin(ScrollTrigger);

/**
 * TimelineSection
 * Ye component kya karta hai: institute ki growth journey ko scroll-based vertical
 * timeline me render karta hai
 * Kyu banaya gaya: institute ki history/credibility ko cinematic tareeke se batana
 * Kab call hoga: pages/About.jsx me sabse aakhri section ke roop me
 * Kya return karega: <section> jisme central line + alternating milestone cards hain
 */
const TimelineSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const trackRef = useRef(null); // poore timeline track ka wrapper — line + items dono ke liye
  const lineFillRef = useRef(null); // wo inner bar jo scroll ke saath fill hoti hai
  const itemRefs = useRef([]); // har milestone item ka DOM node
  itemRefs.current = [];

  const prefersReducedMotion = usePrefersReducedMotion();
  const safeTimeline = safeArray(timeline);

  // Har item ko ref array me register karne ka helper
  const registerItemRef = (node) => {
    if (node && !itemRefs.current.includes(node)) {
      itemRefs.current.push(node);
    }
  };

  const scopeRef = useGSAPAnimation((scope) => {
    if (!sectionRef.current) return;

    if (prefersReducedMotion) {
      gsap.set(
        [headingRef.current, descriptionRef.current, ...itemRefs.current],
        { opacity: 1, y: 0, scale: 1, clearProps: "all" }
      );
      if (lineFillRef.current) gsap.set(lineFillRef.current, { height: "100%" });
      return;
    }

    // ------------------------------------------------------------------
    // HEADING + DESCRIPTION — normal entrance reveal
    // ------------------------------------------------------------------
    const introTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 40%",
        toggleActions: "play reverse play reverse",
        invalidateOnRefresh: true,
        markers: false,
      },
    });

    if (headingRef.current) {
      introTl.from(headingRef.current, {
        opacity: 0,
        y: 36,
        filter: "blur(6px)",
        duration: 0.7,
        ease: gsapEase.heading, // expo.out
      });
    }
    if (descriptionRef.current) {
      introTl.from(
        descriptionRef.current,
        { opacity: 0, y: 18, duration: 0.5, ease: gsapEase.paragraph },
        "-=0.35"
      );
    }

    // ------------------------------------------------------------------
    // TIMELINE LINE — scroll-progress fill (scrub:true, smooth, no jumps)
    // Line 0% se 100% height tak grow karti hai jaise-jaise user track ke
    // through scroll karta hai. Ye scrub isliye taaki motion scroll-linked ho.
    // ------------------------------------------------------------------
    if (trackRef.current && lineFillRef.current) {
      gsap.fromTo(
        lineFillRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 0.6, // halka smoothing lag — sudden jump nahi hoga
            invalidateOnRefresh: true,
            markers: false,
          },
        }
      );
    }

    // ------------------------------------------------------------------
    // MILESTONE ITEMS — har item ka apna ScrollTrigger:
    // badge reveal → card reveal → title/description fade-up
    // ------------------------------------------------------------------
    itemRefs.current.forEach((item) => {
      const badge = item.querySelector("[data-timeline-badge]");
      const card = item.querySelector("[data-timeline-card]");
      const title = item.querySelector("[data-timeline-title]");
      const desc = item.querySelector("[data-timeline-desc]");

      const itemTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 82%",
          end: "bottom 40%",
          toggleActions: "play reverse play reverse", // replay dono directions me
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          markers: false,
        },
      });

      if (badge) {
        itemTl.from(badge, {
          opacity: 0,
          scale: 0.6,
          duration: 0.5,
          ease: gsapEase.card, // back.out(1.4)
        });
      }
      if (card) {
        itemTl.from(
          card,
          { opacity: 0, y: 30, scale: 0.95, duration: 0.6, ease: "power4.out" },
          "-=0.25"
        );
      }
      if (title) {
        itemTl.from(
          title,
          { opacity: 0, y: 16, filter: "blur(4px)", duration: 0.5, ease: gsapEase.heading },
          "-=0.35"
        );
      }
      if (desc) {
        itemTl.from(
          desc,
          { opacity: 0, y: 12, duration: 0.45, ease: gsapEase.paragraph },
          "-=0.3"
        );
      }
    });
  }, [prefersReducedMotion]);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
        scopeRef.current = node;
      }}
      id="timeline"
      aria-labelledby="timeline-heading"
      className="relative w-full overflow-hidden bg-[#F7F3E9] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16">
        {/* Section heading + description */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E63946]">
            Our Journey
          </span>
          <h2
            id="timeline-heading"
            ref={headingRef}
            className="mt-3 font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#2B2D42]"
          >
            Milestones That Shaped Us
          </h2>
          <p ref={descriptionRef} className="mt-4 text-sm sm:text-base leading-relaxed text-[#2B2D42]/60">
            From a single classroom to a growing institution — the story of Jamia Academy.
          </p>
        </div>

        {/* ==============================================================
            TIMELINE TRACK
        ============================================================= */}
        {safeTimeline.length > 0 ? (
          <div ref={trackRef} className="relative mt-16">
            {/* Central line — track (background) + fill (animated foreground) */}
            <div
              className="absolute left-5 sm:left-7 lg:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 lg:-translate-x-1/2 rounded-full bg-[#2B2D42]/10"
              aria-hidden="true"
            >
              <div
                ref={lineFillRef}
                className="w-full rounded-full bg-gradient-to-b from-[#E63946] via-[#F4A261] to-[#2A9D8F]"
                style={{ height: "0%" }}
              />
            </div>

            <ol className="relative flex flex-col gap-12 sm:gap-14 lg:gap-16">
              {safeTimeline.map((item, index) => {
                const isRightAligned = index % 2 === 0; // desktop alternating side

                return (
                  <li
                    key={item?.id || item?.year}
                    ref={registerItemRef}
                    className={cn(
                      "relative pl-14 sm:pl-16 lg:pl-0",
                      "lg:grid lg:grid-cols-2 lg:items-center lg:gap-10"
                    )}
                  >
                    {/* Decorative dot + year badge — positioned on the central line */}
                    <span
                      data-timeline-badge
                      className={cn(
                        "absolute left-5 sm:left-7 lg:left-1/2 top-0 -translate-x-1/2",
                        "z-10 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full",
                        "bg-[#2B2D42] text-white shadow-[0_6px_18px_rgba(43,45,66,0.3)] will-change-transform"
                      )}
                      aria-hidden="true"
                    >
                      <Flag size={16} />
                    </span>

                    {/* Desktop: alternate left/right column placement */}
                    <div className={cn("hidden lg:block", isRightAligned ? "lg:order-1" : "lg:order-2")} aria-hidden="true" />

                    <motion.div
                      data-timeline-card
                      className={cn(
                        "relative rounded-3xl border border-[#2B2D42]/10 bg-white/80 backdrop-blur-md",
                        "p-5 sm:p-6 shadow-[0_10px_30px_rgba(43,45,66,0.08)] will-change-transform",
                        isRightAligned ? "lg:order-2" : "lg:order-1"
                      )}
                      whileHover={
                        prefersReducedMotion
                          ? {}
                          : {
                              y: -6,
                              boxShadow: "0 16px 40px rgba(43,45,66,0.14)",
                              borderColor: "rgba(230,57,70,0.35)",
                            }
                      }
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <span className="inline-flex items-center rounded-full bg-[#E63946]/10 px-3 py-1 text-xs font-bold tracking-wide text-[#E63946]">
                        {item?.year || "—"}
                      </span>
                      <h3
                        data-timeline-title
                        className="mt-2.5 text-base sm:text-lg font-semibold text-[#2B2D42]"
                      >
                        {item?.title || "Milestone"}
                      </h3>
                      <p
                        data-timeline-desc
                        className="mt-1.5 text-sm leading-relaxed text-[#2B2D42]/65"
                      >
                        {item?.description || ""}
                      </p>
                    </motion.div>
                  </li>
                );
              })}
            </ol>
          </div>
        ) : (
          // Defensive fallback — data missing hone par bhi layout crash na ho
          <p className="mt-14 text-center text-sm text-[#2B2D42]/50">
            {/* TODO:
                Replace Dummy Data with Official Jamia Academy Content. */}
            Timeline content coming soon.
          </p>
        )}
      </div>
    </section>
  );
};

export default TimelineSection;
