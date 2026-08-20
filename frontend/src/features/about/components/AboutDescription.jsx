
import React, { useRef, useState, useMemo } from "react";

import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, MonitorSmartphone, ShieldCheck, ImageOff } from "lucide-react";


// Hooks
import useGSAPAnimation from "../../../shared/hooks/useGSAPAnimation";
import usePrefersReducedMotion from "../../../shared/hooks/usePrefersReducedMotion";
import useMediaQuery from "../../../shared/hooks/useMediaQuery";

 // Utilities
import { splitIntoWords } from "../../../shared/utils/text";
import { cn } from "../../../shared/utils/helpers";
import { getImageProps } from "../../../shared/utils/image";

// Constants / Data
import { aboutDescription, features } from "../data/about.data";
import { gsapEase } from "../../../shared/motion/config";

// 7. Styles
// (Sirf Tailwind utility classes)

gsap.registerPlugin(ScrollTrigger);


const iconMap = {
  GraduationCap,
  MonitorSmartphone,
  ShieldCheck,
};



const AboutDescription = () => {
  const sectionRef = useRef(null);
  const paragraphRef = useRef(null);
  const imageWrapRef = useRef(null);
  const cardsRef = useRef(null);
  const badgesRef = useRef(null);

  // Reduced motion aur mobile check — dono ke liye heavy mouse-tilt effect disable karna hai
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("lg"); // 1024px+ — sirf desktop pe mouse tilt chalega

  // Image load fail hone par fallback dikhane ke liye local state
  const [imageError, setImageError] = useState(false);

  // Mouse-tilt ke liye chhota transform state (sirf desktop, sirf reduced-motion off)
  const tiltTargetRef = useRef(null);

  const paragraphWords = useMemo(
    () =>
      splitIntoWords(
        Array.isArray(aboutDescription?.paragraphs) ? aboutDescription.paragraphs.join(" ") : ""
      ),
    []
  );

  // Defensive fallback — agar data missing ho to bhi component crash na ho
  const safeFeatures = Array.isArray(features) ? features : [];
  const safeBadges = Array.isArray(aboutDescription?.badges) ? aboutDescription.badges : [];


  const scopeRef = useGSAPAnimation((scope) => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse", // scroll down = play, scroll up = reverse+replay
        invalidateOnRefresh: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        markers: false,
      },
    });

    // Reduced motion: seedha final state set karo, koi animation timeline nahi chalao
    if (prefersReducedMotion) {
      gsap.set(
        [
          paragraphRef.current?.children,
          imageWrapRef.current,
          cardsRef.current?.children,
          badgesRef.current?.children,
        ],
        { opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)", clearProps: "all" }
      );
      return;
    }

    // STEP 1 — Paragraph: word by word, color gray(#8D99AE) → white, blur out
    if (paragraphRef.current) {
      tl.from(paragraphRef.current.children, {
        opacity: 0,
        y: 20,
        filter: "blur(6px)",
        color: "#8D99AE",
        duration: 0.5,
        ease: gsapEase.paragraph, // power3.out
        stagger: 0.02,
      });
    }

    // STEP 2 — Image: scale 0.8→1, rotate -5→0, blur 10px→0, opacity 0→1
    if (imageWrapRef.current) {
      tl.from(
        imageWrapRef.current,
        {
          opacity: 0,
          scale: 0.8,
          rotate: -5,
          filter: "blur(10px)",
          duration: 0.9,
          ease: "power4.out",
        },
        "-=0.2"
      );
    }

    // STEP 3 — Feature Cards: stagger 0.15, ease back.out(1.4)
    if (cardsRef.current) {
      tl.from(
        cardsRef.current.children,
        {
          opacity: 0,
          y: 36,
          scale: 0.92,
          duration: 0.7,
          ease: gsapEase.card, // back.out(1.4)
          stagger: 0.15,
        },
        "-=0.3"
      );
    }

    // STEP 4 — Badges: entrance reveal (idle floating loop is separate, added after)
    if (badgesRef.current) {
      tl.from(
        badgesRef.current.children,
        {
          opacity: 0,
          y: 16,
          scale: 0.9,
          duration: 0.5,
          ease: "back.out(1.3)",
          stagger: 0.12,
        },
        "-=0.25"
      );
    }

    // Idle floating loop for badges — sine.inOut, infinite, lightweight (y only)
    if (badgesRef.current?.children?.length) {
      gsap.to(badgesRef.current.children, {
        y: "-=15",
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
        delay: 1, // entrance complete hone ke baad start
      });
    }
  }, [prefersReducedMotion]);


  const handleMouseMove = (e) => {
    if (!isDesktop || prefersReducedMotion || !tiltTargetRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    // Seedha DOM pe likha — React re-render trigger nahi hota
    tiltTargetRef.current.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg)`;
  };

  const handleMouseLeave = () => {
    if (tiltTargetRef.current) {
      tiltTargetRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <section
      id="about-description"
      aria-labelledby="about-description-heading"
      className="relative w-full overflow-hidden bg-[#F7F3E9] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          {/* ==============================================================
              LEFT CONTENT
          ============================================================== */}
          <div className="flex flex-col gap-6">
            {/* Established / Location badges (inline, not floating) */}
            <div className="flex flex-wrap items-center gap-3">
              {aboutDescription?.established && (
                <span className="inline-flex items-center rounded-full bg-[#2B2D42]/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#2B2D42]">
                  {aboutDescription.established}
                </span>
              )}
              {aboutDescription?.location && (
                <span className="inline-flex items-center rounded-full bg-[#2A9D8F]/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#2A9D8F]">
                  {aboutDescription.location}
                </span>
              )}
            </div>

            {/* H2 — proper heading hierarchy (H1 is in HeroAbout) */}
            <h2
              id="about-description-heading"
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-tight text-[#2B2D42]"
            >
              {aboutDescription?.heading || "About Jamia Academy"}
            </h2>

            {/* Paragraph — word-by-word GSAP reveal target */}
            <p
              ref={paragraphRef}
              className="text-base sm:text-lg leading-relaxed text-[#2B2D42]/80 max-w-xl"
            >
              {paragraphWords.map((word, index) => (
                <span
                  key={`about-word-${index}-${word}`}
                  className="inline-block mr-[0.28em] will-change-transform"
                >
                  {word}
                </span>
              ))}
            </p>

            {/* Highlight Quote */}
            {aboutDescription?.quote && (
              <blockquote className="border-l-4 border-[#E63946] rounded-2xl pl-4 sm:pl-5 py-1 text-base sm:text-lg italic text-[#2B2D42]/90">
                “{aboutDescription.quote}”
              </blockquote>
            )}

            {/* ============================================================
                FEATURE CARDS
            ============================================================= */}
            <div ref={cardsRef} className="mt-4 grid grid-cols-1 xs:grid-cols-3 gap-4 sm:gap-5">
              {safeFeatures.map((feature) => {
                const Icon = iconMap[feature?.icon] || GraduationCap;
                return (
                  <motion.div
                    key={feature?.id || feature?.title}
                    className={cn(
                      "group relative rounded-2xl border border-[#2B2D42]/10 bg-white",
                      "px-5 py-6 shadow-[0_4px_20px_rgba(43,45,66,0.06)] will-change-transform"
                    )}
                    whileHover={
                      prefersReducedMotion
                        ? {}
                        : {
                          scale: 1.05,
                          y: -10,
                          boxShadow: "0 16px 36px rgba(43,45,66,0.16)",
                          borderColor: "rgba(230,57,70,0.4)",
                        }
                    }
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Gradient glow on hover — decorative */}
                    <span
                      className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[#E63946]/0 to-[#F4A261]/0 group-hover:from-[#E63946]/5 group-hover:to-[#F4A261]/5 transition-colors duration-300"
                      aria-hidden="true"
                    />
                    <span
                      className="relative z-10 mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2A9D8F]/10 text-[#2A9D8F]"
                      aria-hidden="true"
                    >
                      <Icon size={20} />
                    </span>
                    <h3 className="font-heading relative z-10 text-sm sm:text-base font-bold text-[#2B2D42]">
                      {feature?.title || "Feature"}
                    </h3>
                    <p className="relative z-10 mt-1.5 text-xs sm:text-sm leading-relaxed text-[#2B2D42]/65">
                      {feature?.description || ""}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ==============================================================
              RIGHT CONTENT — Image block + floating badges
          ============================================================== */}
          <div className="relative flex justify-center lg:justify-end">
            <div
              ref={(node) => {
                imageWrapRef.current = node;
                tiltTargetRef.current = node;
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-md will-change-transform"
              style={{ transition: "transform 0.2s ease-out" }}
            >
              {/* Gradient border frame */}
              <div className="rounded-[28px] bg-gradient-to-br from-[#E63946] via-[#F4A261] to-[#2A9D8F] p-[3px] shadow-[0_20px_50px_rgba(43,45,66,0.18)]">
                {/* Glass frame inner */}
                <div className="relative overflow-hidden rounded-[26px] bg-white/40 backdrop-blur-sm">
                  {!imageError ? (
                    <img
                      {...getImageProps(
                        aboutDescription?.image,
                        "Jamia Academy campus and students",
                        false
                      )}
                      onError={() => setImageError(true)}
                      className="aspect-[4/5] w-full object-fit"
                    />
                  ) : (
                    // Error fallback — image kabhi crash nahi karega, hamesha graceful fallback
                    <div
                      role="img"
                      aria-label="Jamia Academy image unavailable"
                      className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 bg-[#2B2D42]/5 text-[#2B2D42]/40"
                    >
                      <ImageOff size={32} aria-hidden="true" />
                      <span className="text-xs">Image unavailable</span>
                    </div>
                  )}
                  {/* Soft gradient overlay for depth */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/25 via-transparent to-transparent" />
                </div>
              </div>
              {/* TODO:
                  Replace dummy image with official Jamia Academy image. */}

              {/* Floating badges — absolute positioned, sine.inOut idle loop via GSAP */}
              <div ref={badgesRef} aria-hidden="false">
                {safeBadges.map((badge, index) => (
                  <div
                    key={badge?.id || badge?.label}
                    className={cn(
                      "absolute rounded-xl border border-white/40 bg-white/80 backdrop-blur-md",
                      "px-3.5 py-2 text-[11px] sm:text-xs font-semibold text-[#2B2D42] shadow-lg will-change-transform",
                      index === 0 && "-top-4 -left-4 sm:-left-8",
                      index === 1 && "top-1/2 -right-4 sm:-right-8 -translate-y-1/2",
                      index === 2 && "-bottom-4 left-6 sm:left-10"
                    )}
                  >
                    {badge?.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDescription;
