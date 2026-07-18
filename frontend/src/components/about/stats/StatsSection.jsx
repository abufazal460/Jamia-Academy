/*
========================================

File:
StatsSection.jsx

Purpose:
Ye component Jamia Academy ki achievements ko animated stat cards ke roop me
display karta hai — students, programs, years of excellence, placements.

Responsibilities:
- Section heading
- Dynamic stat cards (icon, animated number, label) from aboutData.stats
- Counter animation jo sirf viewport me visible hone par trigger ho
- GSAP scroll-triggered card entrance

Animation Engine:
GSAP + ScrollTrigger — replay-enabled (once:false):
Heading → Stat cards (stagger) → Counter trigger (react-countup, via useCountUp)
Framer Motion — card hover only

Data Source:
@/data/aboutData → stats array (id, label, value, suffix, icon)

========================================
*/

// 1. React
import React, { useRef } from "react";

// 2. Third-party Libraries
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";
import { Sparkles, Users, BookOpen, Briefcase } from "lucide-react";

// 3. Internal Components

// 4. Hooks
import useGSAPAnimation from "@/hooks/useGSAPAnimation";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import useCountUp from "@/hooks/useCountUp";

// 5. Utilities
import { cn, safeArray } from "@/utils/helpers";

// 6. Constants / Data
import { stats } from "@/data/aboutData";
import { gsapEase } from "@/constants/animations";

// 7. Styles

gsap.registerPlugin(ScrollTrigger);

// -----------------------------------------------------------------------------
// ICON MAP — stats array me icon string name ke roop me store hai
// -----------------------------------------------------------------------------
const iconMap = {
  Sparkles,
  Users,
  BookOpen,
  Briefcase,
};

/**
 * StatCard
 * Ye component kya karta hai: ek single stat card render karta hai apne khud ke
 * inView detection ke saath (taaki har card independently apna counter trigger kare)
 * Kyu banaya gaya: taaki counter sirf tab chale jab wo specific card screen pe ho
 * Kab call hoga: StatsSection ke andar .map() se, har stat item ke liye
 */
const StatCard = ({ stat, prefersReducedMotion }) => {
  const Icon = iconMap[stat?.icon] || Sparkles;
  // useCountUp — har card ka apna independent viewport-visibility tracker
  const { ref, inView } = useCountUp({ triggerOnce: false, threshold: 0.5 });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-3xl p-6 sm:p-7 will-change-transform",
        "bg-gradient-to-br from-[#2B2D42] to-[#1A1A2E]",
        "shadow-[0_14px_36px_rgba(0,0,0,0.25)]"
      )}
      whileHover={
        prefersReducedMotion
          ? {}
          : { y: -8, scale: 1.03, boxShadow: "0 20px 48px rgba(0,0,0,0.35)" }
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Soft glow accent — decorative */}
      <div
        className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-[#F4A261]/20 blur-2xl"
        aria-hidden="true"
      />
      <span
        className="relative z-10 mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#F4A261]"
        aria-hidden="true"
      >
        <Icon size={20} />
      </span>
      <p className="relative z-10 text-3xl sm:text-4xl font-bold text-white">
        {inView ? (
          <CountUp end={stat?.value || 0} duration={2} separator="," />
        ) : (
          0
        )}
        {stat?.suffix || ""}
      </p>
      <p className="relative z-10 mt-1.5 text-xs sm:text-sm text-white/60">{stat?.label}</p>
    </motion.div>
  );
};

/**
 * StatsSection
 * Ye component kya karta hai: institute ki achievements ko animated counters me render karta hai
 * Kyu banaya gaya: credibility aur scale ko quick-glance numbers ke through communicate karna
 * Kab call hoga: pages/About.jsx me ValuesSection ke baad
 * Kya return karega: <section> jisme heading + responsive stat-card grid hai
 */
const StatsSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const safeStats = safeArray(stats);

  const scopeRef = useGSAPAnimation((scope) => {
    if (!sectionRef.current) return;

    if (prefersReducedMotion) {
      gsap.set([headingRef.current, cardsRef.current?.children], {
        opacity: 1,
        y: 0,
        scale: 1,
        clearProps: "all",
      });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 30%",
        toggleActions: "play reverse play reverse", // replay har baar — once:true nahi
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

    // STEP 2 — Stat cards stagger entrance
    // NOTE: Counter trigger khud StatCard ke andar useCountUp/react-intersection-observer
    // se handle hota hai — GSAP sirf card ka visual entrance (opacity/scale/y) animate karta hai.
    if (cardsRef.current) {
      tl.from(
        cardsRef.current.children,
        {
          opacity: 0,
          y: 36,
          scale: 0.9,
          duration: 0.7,
          ease: "power4.out",
          stagger: 0.15,
        },
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
      id="stats"
      aria-labelledby="stats-heading"
      className="relative w-full overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="stats-heading"
            ref={headingRef}
            className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#2B2D42]"
          >
            Our Achievements
          </h2>
        </div>

        {/* Stat cards grid — mobile: 1 col, tablet: 2 col, desktop: 4 col */}
        <div ref={cardsRef} className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {safeStats.length > 0 ? (
            safeStats.map((stat) => (
              <StatCard key={stat?.id || stat?.label} stat={stat} prefersReducedMotion={prefersReducedMotion} />
            ))
          ) : (
            // Defensive fallback — data missing hone par bhi layout crash na ho
            <p className="col-span-full text-center text-sm text-[#2B2D42]/50">
              {/* TODO:
                  Replace Dummy Data with Official Jamia Academy Content. */}
              Stats coming soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
