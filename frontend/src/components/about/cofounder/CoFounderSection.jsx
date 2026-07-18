/*
========================================

File:
CoFounderSection.jsx

Purpose:
Ye component Jamia Academy ke Co-Founder ka premium profile section render
karta hai. Same design language jo FounderSection me use hui (glass cards,
gradient border image), lekin layout mirror kiya gaya hai (image right)
taaki dono sections visually distinct feel hon, copy-paste na lagen.

Responsibilities:
- Co-Founder image (right, desktop) + gradient frame + floating accent shapes
- Name, title, experience badge, qualification cards
- Inspirational personal message with progressive reveal

Animation Engine:
GSAP + ScrollTrigger — single timeline, replay-enabled (once:false):
Section → Image → Name → Title → Experience Badge → Qualification Cards
(stagger) → Message
Framer Motion — hover interactions + floating decorative shapes only

Data Source:
@/data/aboutData → coFounder (name, title, image, qualifications, experience, message)

========================================
*/

// 1. React
import React, { useRef, useState } from "react";

// 2. Third-party Libraries
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, ImageOff, Sparkles } from "lucide-react";

// 3. Internal Components

// 4. Hooks
import useGSAPAnimation from "../../../hooks/useGSAPAnimation";
import usePrefersReducedMotion from "../../../hooks/usePrefersReducedMotion";

// 5. Utilities
import { cn } from "../../../utils/helpers";
import { getImageProps } from "../../../utils/imageHelpers";

// 6. Constants / Data
import { coFounder } from "../../../data/aboutData";
import { gsapEase } from "../../../constants/animations";

// 7. Styles

gsap.registerPlugin(ScrollTrigger);

/**
 * CoFounderSection
 * Ye component kya karta hai: Co-Founder ka profile + qualifications + message render karta hai
 * Kyu banaya gaya: leadership team ki depth dikhane ke liye, Founder section ko complement karte hue
 * Kab call hoga: pages/About.jsx me FounderMessage ke baad
 * Kya return karega: <section> jisme info block (left, desktop) + image (right) hai
 */
const CoFounderSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const experienceRef = useRef(null);
  const qualsRef = useRef(null);
  const messageRef = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const [imageError, setImageError] = useState(false);

  const safeQualifications = Array.isArray(coFounder?.qualifications) ? coFounder.qualifications : [];
  const messageData = coFounder?.message || {};

  const scopeRef = useGSAPAnimation((scope) => {
    if (!sectionRef.current) return;

    if (prefersReducedMotion) {
      gsap.set(
        [
          sectionRef.current,
          imageRef.current,
          nameRef.current,
          titleRef.current,
          experienceRef.current,
          qualsRef.current?.children,
          messageRef.current,
        ],
        { opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)", clearProps: "all" }
      );
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 30%",
        toggleActions: "play reverse play reverse", // replay har baar section viewport me aaye
        invalidateOnRefresh: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        markers: false,
      },
    });

    // STEP 1 — Section container
    tl.from(sectionRef.current, { opacity: 0, duration: 0.5, ease: "power2.out" });

    // STEP 2 — Image reveal (mirrored direction — rotate opposite sign for visual variation)
    if (imageRef.current) {
      tl.from(
        imageRef.current,
        { opacity: 0, scale: 0.9, rotate: 5, filter: "blur(10px)", duration: 0.9, ease: "power4.out" },
        "-=0.15"
      );
    }

    // STEP 3 — Name
    if (nameRef.current) {
      tl.from(
        nameRef.current,
        { opacity: 0, y: 30, filter: "blur(6px)", duration: 0.6, ease: gsapEase.heading },
        "-=0.5"
      );
    }

    // STEP 4 — Title
    if (titleRef.current) {
      tl.from(titleRef.current, { opacity: 0, y: 20, duration: 0.5, ease: gsapEase.paragraph }, "-=0.35");
    }

    // STEP 5 — Experience badge
    if (experienceRef.current) {
      tl.from(
        experienceRef.current,
        { opacity: 0, y: 16, scale: 0.92, duration: 0.5, ease: gsapEase.card },
        "-=0.25"
      );
    }

    // STEP 6 — Qualification cards (stagger)
    if (qualsRef.current) {
      tl.from(
        qualsRef.current.children,
        { opacity: 0, y: 28, scale: 0.94, duration: 0.6, ease: gsapEase.card, stagger: 0.15 },
        "-=0.2"
      );
    }

    // STEP 7 — Message: progressive paragraph reveal
    if (messageRef.current) {
      tl.from(messageRef.current, { opacity: 0, y: 18, duration: 0.55, ease: gsapEase.paragraph }, "-=0.15");
    }
  }, [prefersReducedMotion]);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
        scopeRef.current = node;
      }}
      id="co-founder"
      aria-labelledby="cofounder-heading"
      className="relative w-full overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      {/* Decorative floating accent shapes — Framer Motion only, purely visual */}
      <motion.div
        className="pointer-events-none absolute -top-16 right-[8%] h-56 w-56 rounded-full bg-[#2A9D8F]/10 blur-3xl"
        animate={prefersReducedMotion ? {} : { y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,420px)] gap-12 lg:gap-16 items-center">
          {/* ==============================================================
              CO-FOUNDER INFORMATION — desktop: left
          ============================================================== */}
          <div className="order-2 lg:order-1 flex flex-col gap-5">
            <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#2A9D8F]">
              Meet Our Co-Founder
            </span>

            <h2 id="cofounder-heading" ref={nameRef} className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#2B2D42]">
              {coFounder?.name || "Co-Founder Name"}
            </h2>

            <p ref={titleRef} className="text-base sm:text-lg font-medium text-[#2B2D42]/60">
              {coFounder?.title || coFounder?.designation || "Co-Founder"}
            </p>

            {coFounder?.experience && (
              <span
                ref={experienceRef}
                className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#E63946]/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#E63946]"
              >
                <Sparkles size={13} aria-hidden="true" />
                {coFounder.experience}
              </span>
            )}

            {coFounder?.bio && (
              <p className="text-sm sm:text-base leading-relaxed text-[#2B2D42]/65 max-w-xl">{coFounder.bio}</p>
            )}

            {/* QUALIFICATION CARDS */}
            {safeQualifications.length > 0 && (
              <div ref={qualsRef} className="mt-2 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
                {safeQualifications.map((qual) => (
                  <motion.div
                    key={qual?.id || qual?.degree}
                    className={cn(
                      "rounded-2xl border border-[#2B2D42]/10 bg-[#F7F3E9]/60 backdrop-blur-md",
                      "px-4 py-4 will-change-transform"
                    )}
                    whileHover={
                      prefersReducedMotion
                        ? {}
                        : {
                            y: -6,
                            scale: 1.02,
                            boxShadow: "0 14px 32px rgba(43,45,66,0.14)",
                            borderColor: "rgba(42,157,143,0.4)",
                          }
                    }
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <span className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#2A9D8F]/10 text-[#2A9D8F]" aria-hidden="true">
                      <GraduationCap size={16} />
                    </span>
                    <p className="text-sm font-semibold text-[#2B2D42]">{qual?.degree}</p>
                    <p className="mt-0.5 text-xs text-[#2B2D42]/60">{qual?.field}</p>
                    <p className="mt-1 text-[11px] text-[#2B2D42]/40">{qual?.university}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* MESSAGE */}
            {messageData.body && (
              <div ref={messageRef} className="mt-3 rounded-2xl border-l-4 border-[#2A9D8F] bg-[#F7F3E9]/50 px-5 py-4">
                {messageData.label && (
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#2A9D8F]">{messageData.label}</p>
                )}
                <p className="mt-1.5 text-sm sm:text-base italic leading-relaxed text-[#2B2D42]/80">
                  “{messageData.body}”
                </p>
              </div>
            )}
          </div>

          {/* ==============================================================
              CO-FOUNDER IMAGE — desktop: right
          ============================================================== */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div ref={imageRef} className="relative w-full max-w-sm will-change-transform">
              <div className="rounded-[28px] bg-gradient-to-bl from-[#2A9D8F] via-[#F4A261] to-[#E63946] p-[3px] shadow-[0_20px_50px_rgba(43,45,66,0.16)]">
                <div className="relative overflow-hidden rounded-[26px] bg-[#2B2D42]/5 backdrop-blur-sm">
                  {!imageError ? (
                    <img
                      {...getImageProps(coFounder?.image, `${coFounder?.name || "Co-Founder"} portrait`, false)}
                      onError={() => setImageError(true)}
                      className="aspect-[4/5] w-full object-cover"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label="Co-Founder image unavailable"
                      className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 bg-[#2B2D42]/5 text-[#2B2D42]/40"
                    >
                      <ImageOff size={32} aria-hidden="true" />
                      <span className="text-xs">Co-Founder Image Unavailable</span>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
                </div>
              </div>
              {/* TODO:
                  Replace placeholder co-founder image with official portrait. */}

              {/* Floating accent badge — distinct from Founder section's social icons */}
              <motion.div
                className="absolute -bottom-4 -right-4 sm:-right-6 rounded-xl border border-[#2B2D42]/10 bg-white px-3.5 py-2 text-[11px] sm:text-xs font-semibold text-[#2B2D42] shadow-lg"
                animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Academic Director
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoFounderSection;
