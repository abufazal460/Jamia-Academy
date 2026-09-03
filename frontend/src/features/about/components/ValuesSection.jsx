
import React, { useRef } from "react";

import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Award, Lightbulb, Users, HeartHandshake, Sparkles } from "lucide-react";

import useGSAPAnimation from "../../../shared/hooks/useGSAPAnimation";
import usePrefersReducedMotion from "../../../shared/hooks/usePrefersReducedMotion";

import { cn, safeArray } from "../../../shared/utils/helpers";

import { values } from "../data/about.data";
import { gsapEase } from "../../../shared/motion/config";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  ShieldCheck,
  Award,
  Lightbulb,
  Users,
  HeartHandshake,
};

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

    if (descriptionRef.current) {
      tl.from(
        descriptionRef.current,
        { opacity: 0, y: 18, duration: 0.5, ease: gsapEase.paragraph },
        "-=0.35"
      );
    }

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
      className="relative w-full overflow-hidden bg-bg-secondary py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#2A9D8F]">
            <Sparkles size={14} aria-hidden="true" />
            What We Stand For
          </span>
          <h2
            id="values-heading"
            ref={headingRef}
            className="mt-3 font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#2B2D42]"
          >
            Our Core Values
          </h2>
          <p ref={descriptionRef} className="mt-4 text-sm sm:text-base leading-relaxed text-[#2B2D42]/60">
            The principles that shape our culture, our classrooms, and every student we serve.
          </p>
        </div>

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
                        boxShadow: "0 16px 36px rgba(43,45,66,0.16)",
                        borderColor: "rgba(180,180,70,0.4)",
                      }
                  }
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <span
                    className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[#86e96b]/0 to-[#2A9D8F]/0 group-hover:from-[#86e96b]/5 group-hover:to-[#2A9D8F]/5 transition-colors duration-300"
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
                  <h3 className="relative z-10 text-base sm:text-lg font-bold text-[#2B2D42]">
                    {value?.title || "Value"}
                  </h3>
                  <p className="relative z-10 mt-2 text-sm leading-relaxed text-[#2B2D42]/60">
                    {value?.description || ""}
                  </p>
                </motion.div>
              );
            })
          ) : (
            <p className="col-span-full text-center text-sm text-[#2B2D42]/50">
              Values content coming soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
