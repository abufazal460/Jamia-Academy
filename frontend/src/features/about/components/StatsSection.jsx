import React, { useRef } from "react";

import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";
import { Sparkles, Users, BookOpen, Briefcase } from "lucide-react";

import useGSAPAnimation from "../../../shared/hooks/useGSAPAnimation";
import usePrefersReducedMotion from "../../../shared/hooks/usePrefersReducedMotion";
import useCountUp from "../hooks/useCountUp";

import { cn, safeArray } from "../../../shared/utils/helpers";

import { stats } from "../data/about.data";
import { gsapEase } from "../../../shared/motion/config";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  Sparkles,
  Users,
  BookOpen,
  Briefcase,
};

const StatCard = ({ stat, prefersReducedMotion }) => {
  const Icon = iconMap[stat?.icon] || Sparkles;
  const { ref, inView } = useCountUp({ triggerOnce: false, threshold: 0.5 });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-3xl p-6 sm:p-7 will-change-transform bg-card",
        "shadow-[0_14px_36px_rgba(0,0,0,0.25)]"
      )}
      whileHover={
        prefersReducedMotion
          ? {}
          : { y: -8, scale: 1.03, boxShadow: "0 20px 48px rgba(0,0,0,0.35)" }
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
    >

      <span
        className="relative z-10 mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2A9D8F]/10 text-[#2A9D8F]"
        aria-hidden="true"
      >
        <Icon size={20} />
      </span>
      <p className="relative z-10 text-3xl sm:text-4xl font-black tracking-wide text-black">
        {inView ? (
          <CountUp end={stat?.value || 0} duration={2} separator="," />
        ) : (
          0
        )}
        {stat?.suffix || ""}
      </p>
      <p className="relative z-10 mt-1.5 text-xs sm:text-sm text-black/60">{stat?.label}</p>
    </motion.div>
  );
};

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
        toggleActions: "play reverse play reverse",
        invalidateOnRefresh: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        markers: false,
      },
    });

    if (headingRef.current) {
      tl.from(headingRef.current, {
        opacity: 0,
        y: 36,
        filter: "blur(6px)",
        duration: 0.7,
        ease: gsapEase.heading,
      });
    }

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
      className="relative w-full overflow-hidden bg-bg-secondary py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="stats-heading"
            ref={headingRef}
            className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#2B2D42]"
          >
            Our Achievements
          </h2>
        </div>

        <div ref={cardsRef} className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {safeStats.length > 0 ? (
            safeStats.map((stat) => (
              <StatCard key={stat?.id || stat?.label} stat={stat} prefersReducedMotion={prefersReducedMotion} />
            ))
          ) : (
            <p className="col-span-full text-center text-sm text-[#2B2D42]/50">
              Stats coming soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
