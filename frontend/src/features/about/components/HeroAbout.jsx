
import React, { useRef, useLayoutEffect, useState } from "react";

import { motion } from "motion/react";
import gsap from "gsap";
import { Play, ChevronDown } from "lucide-react";

import usePrefersReducedMotion from "../../../shared/hooks/usePrefersReducedMotion";

import { splitIntoWords } from "../../../shared/utils/text";
import { cn } from "../../../shared/utils/helpers";

import { hero } from "../data/about.data";
import { gsapEase } from "../../../shared/motion/config";

const heroStats = [
  { id: "hero-stat-students", value: "2000+", label: "Students Enrolled" },
  { id: "hero-stat-programs", value: "50+", label: "Programs Offered" },
  { id: "hero-stat-years", value: "4+", label: "Years Excellence" },
];

const HeroAbout = () => {
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const paragraphRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  const [subtitleDone, setSubtitleDone] = useState(false);

  const subtitleWords = splitIntoWords(hero.subtitle);
  const descriptionWords = splitIntoWords(hero.description);

  useLayoutEffect(() => {
    if (!rootRef.current) return undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: gsapEase.heading },
      });

      tl.from(rootRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      if (headingRef.current) {
        tl.from(
          headingRef.current.children,
          {
            opacity: 0,
            y: 80,
            filter: "blur(10px)",
            duration: 0.9,
            ease: gsapEase.heading,
            stagger: 0.025,
          },
          "-=0.2"
        );
      }

      if (subtitleRef.current) {
        tl.from(
          subtitleRef.current.children,
          {
            opacity: 0,
            y: 12,
            duration: 0.35,
            ease: "power2.out",
            stagger: 0.12,
            onComplete: () => setSubtitleDone(true),
          },
          "-=0.3"
        );
      }

      if (paragraphRef.current) {
        tl.from(
          paragraphRef.current.children,
          {
            opacity: 0,
            y: 14,
            filter: "blur(6px)",
            color: "#8D99AE",
            duration: 0.5,
            ease: gsapEase.paragraph, // power3.out
            stagger: 0.035,
          },
          "-=0.2"
        );
      }

      if (statsRef.current) {
        tl.from(
          statsRef.current.children,
          {
            opacity: 0,
            y: 40,
            scale: 0.9,
            duration: 0.7,
            ease: gsapEase.card,
            stagger: 0.15,
          },
          "-=0.15"
        );
      }

      if (ctaRef.current) {
        tl.from(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: gsapEase.button,
          },
          "-=0.4"
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={rootRef}
      id="hero"
      aria-labelledby="hero-heading"
      className={cn(
        "relative w-full min-h-[100svh] overflow-hidden",
        "flex items-center",
        "bg-gradient-primary"
      )}
    >

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Soft glow blob 1 */}
        <motion.div
          className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full  will-change-transform"
          animate={
            prefersReducedMotion
              ? {}
              : { x: [0, 30, 0], y: [0, 20, 0] }
          }
          viewport={{ once: false }}

          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-5%] h-[480px] w-[480px] rounded-full bg-[#8D99AE]/10 blur-[120px] will-change-transform"
          animate={
            prefersReducedMotion
              ? {}
              : { x: [0, -25, 0], y: [0, -15, 0] }
          }
          viewport={{ once: false }}

          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #EDF2F4 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-[2px]" />
      </div>

      {/* ================================================================
          CONTENT LAYER
      ================================================================= */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16 py-24 sm:py-28">
        <div className="flex flex-col items-start gap-6 sm:gap-8 max-w-3xl">
          {hero.eyebrow && (
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide text-[#EDF2F4] backdrop-blur-md">
              {hero.eyebrow}
            </span>
          )}

          <h1
            id="hero-heading"
            ref={headingRef}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.05] text-white"
          >

            {hero.title}
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl lg:text-2xl font-medium text-[#EDF2F4]"
          >
            {subtitleWords.map((word, index) => (
              <span key={`subtitle-word-${index}-${word}`} className="inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
            <motion.span
              className="inline-block w-[2px] h-[1em] bg-[#ff953f] align-middle ml-1"
              animate={subtitleDone && !prefersReducedMotion ? { opacity: [1, 0, 1] } : { opacity: 0 }}
              transition={{ duration: 0.9, repeat: subtitleDone ? 4 : 0, ease: "easeInOut" }}
              aria-hidden="true"
            />
          </p>

          <p
            ref={paragraphRef}
            className="text-base sm:text-lg leading-relaxed text-[#8D99AE] max-w-2xl"
          >
            {descriptionWords.map((word, index) => (
              <span
                key={`desc-word-${index}-${word}`}
                className="inline-block mr-[0.28em] will-change-transform"
              >
                {word}
              </span>
            ))}
          </p>

          <div
            ref={statsRef}
            className="mt-8 grid grid-cols-1 xs:grid-cols-3 gap-4 sm:gap-5 w-full max-w-2xl"
          >
            {heroStats.map((stat) => (
              <motion.div
                key={stat.id}
                className={cn(
                  "rounded-2xl border border-white/10 bg-white/[0.06]",
                  "backdrop-blur-md px-5 py-4 will-change-transform"
                )}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                      y: -6,
                      boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
                      borderColor: "rgba(180,180,180,0.5)",
                    }
                }

                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-xs sm:text-sm text-[#8D99AE]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroAbout;
