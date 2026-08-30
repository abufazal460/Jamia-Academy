
import React, { useRef, useState } from "react";

// 2. Third-party Libraries
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuImageOff } from "react-icons/lu";
import { FaGraduationCap , FaFacebook , FaLinkedin , FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

// 3. Internal Components
// (Shared components abhi nahi bane — Phase 4+ me plug honge)

// 4. Hooks
import useGSAPAnimation from "../../../shared/hooks/useGSAPAnimation";
import usePrefersReducedMotion from "../../../shared/hooks/usePrefersReducedMotion";

// 5. Utilities
import { cn } from "../../../shared/utils/helpers";
import { getImageProps } from "../../../shared/utils/image";

// 6. Constants / Data
import { founder } from "../data/about.data";
import { gsapEase } from "../../../shared/motion/config";

// 7. Styles
// (Sirf Tailwind utility classes)

gsap.registerPlugin(ScrollTrigger);


const socialIconMap = {
  linkedin: FaLinkedin,
  twitter: FaSquareXTwitter,
  facebook: FaFacebook,
  instagram: FaInstagram,
};


const FounderSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const experienceRef = useRef(null);
  const positionRef = useRef(null);
  const qualsRef = useRef(null);
  const socialRef = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  // Image load fail hone par graceful fallback dikhane ke liye
  const [imageError, setImageError] = useState(false);

  // Defensive fallback — data missing hone par bhi component crash na ho
  const safeQualifications = Array.isArray(founder?.qualifications) ? founder.qualifications : [];
  const socialEntries = founder?.social
    ? Object.entries(founder.social).filter(([, url]) => Boolean(url))
    : [];

  // ---------------------------------------------------------------------------
  // GSAP MASTER TIMELINE
  // useGSAPAnimation context create/cleanup khud handle karta hai — memory leak safe.
  // Sequence: Section → Image → Name → Title → Experience → Position → Quals (stagger) → Social
  // toggleActions "play reverse play reverse" — replay har baar jab section viewport me aaye.
  // ---------------------------------------------------------------------------
  const scopeRef = useGSAPAnimation((scope) => {
    if (!sectionRef.current) return;

    // Reduced motion: seedha final state set karo, koi timeline nahi chalao
    if (prefersReducedMotion) {
      gsap.set(
        [
          sectionRef.current,
          imageRef.current,
          nameRef.current,
          titleRef.current,
          experienceRef.current,
          positionRef.current,
          qualsRef.current?.children,
          socialRef.current?.children,
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
        scrub: false,
        toggleActions: "play reverse play reverse", // replay dono directions me
        invalidateOnRefresh: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        markers: false,
      },
    });

    // STEP 1 — Section container fade in
    tl.from(sectionRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    // STEP 2 — Founder image: scale 0.9→1, rotate -5→0, blur out
    if (imageRef.current) {
      tl.from(
        imageRef.current,
        {
          opacity: 0,
          scale: 0.9,
          rotate: -5,
          filter: "blur(10px)",
          duration: 0.9,
          ease: "power4.out",
        },
        "-=0.15"
      );
    }

    // STEP 3 — Name reveal
    if (nameRef.current) {
      tl.from(
        nameRef.current,
        { opacity: 0, y: 30, filter: "blur(6px)", duration: 0.6, ease: gsapEase.heading },
        "-=0.5"
      );
    }

    // STEP 4 — Title reveal
    if (titleRef.current) {
      tl.from(
        titleRef.current,
        { opacity: 0, y: 20, duration: 0.5, ease: gsapEase.paragraph },
        "-=0.35"
      );
    }

    // STEP 5 — Experience badge
    if (experienceRef.current) {
      tl.from(
        experienceRef.current,
        { opacity: 0, y: 16, scale: 0.92, duration: 0.5, ease: gsapEase.card },
        "-=0.25"
      );
    }

    // STEP 6 — Government position
    if (positionRef.current) {
      tl.from(
        positionRef.current,
        { opacity: 0, y: 16, duration: 0.5, ease: gsapEase.paragraph },
        "-=0.3"
      );
    }

    // STEP 7 — Qualification cards (stagger)
    if (qualsRef.current) {
      tl.from(
        qualsRef.current.children,
        {
          opacity: 0,
          y: 28,
          scale: 0.94,
          duration: 0.6,
          ease: gsapEase.card, // back.out(1.4)
          stagger: 0.15,
        },
        "-=0.2"
      );
    }

    // STEP 8 — Social icons
    if (socialRef.current) {
      tl.from(
        socialRef.current.children,
        { opacity: 0, y: 12, scale: 0.85, duration: 0.4, ease: "back.out(1.3)", stagger: 0.1 },
        "-=0.25"
      );
    }
  }, [prefersReducedMotion]);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
        scopeRef.current = node;
      }}
      id="founder"
      aria-labelledby="founder-heading"
      className="relative w-full overflow-hidden bg-[#F7F3E9] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_1fr] gap-12 lg:gap-16 items-center">
          {/* ==============================================================
              FOUNDER IMAGE — desktop: left, mobile: order-first via DOM order
          ============================================================== */}
          <div className="flex justify-center lg:justify-start">
            <div ref={imageRef} className="relative w-full max-w-sm will-change-transform">
              <div className="rounded-[28px] bg-gradient-to-br from-[#E63946] via-[#F4A261] to-[#2A9D8F] p-[3px] shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <div className="relative overflow-hidden rounded-[26px] bg-white/5 backdrop-blur-sm">
                  {!imageError ? (
                    <img
                      {...getImageProps(founder?.image, `${founder?.name || "Founder"} portrait`, false)}
                      onError={() => setImageError(true)}
                      className="aspect-[4/5] w-full object-cover"
                    />
                  ) : (
                    // Fallback — image kabhi bhi layout ko break nahi karega
                    <div
                      role="img"
                      aria-label="Founder image unavailable"
                      className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 bg-white/5 text-white/40"
                    >
                      <LuImageOff size={32} aria-hidden="true" />
                      <span className="text-xs">Founder Image Unavailable</span>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/40 via-transparent to-transparent" />
                </div>
              </div>
              {/* TODO:
                  Replace placeholder founder image with official portrait. */}
            </div>
          </div>

          {/* ==============================================================
              FOUNDER INFORMATION
          ============================================================== */}
          <div className="flex flex-col gap-5">
            <span className="text-xs sm:text-sm  tracking-widest uppercase text-[#2A9D8F] font-bold">
              Meet Our Founder
            </span>

            <h2 id="founder-heading" ref={nameRef} className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-black">
              {founder?.name || "Founder Name"}
            </h2>

            <p ref={titleRef} className="text-base sm:text-lg font-medium text-[#333333]">
              {founder?.title || founder?.designation || "Founder & Director"}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {founder?.experience && (
                <span
                  ref={experienceRef}
                  className="inline-flex items-center rounded-full bg-[#2A9D8F]/15 px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#2A9D8F]"
                >
                  {founder.experience}
                </span>
              )}
            </div>

            {founder?.position && (
              <p ref={positionRef} className="text-sm sm:text-base text-black/80">
                {founder.position}
              </p>
            )}

            {founder?.bio && (
              <p className="text-sm sm:text-base leading-relaxed text-[#2B2D42]/85 max-w-xl">{founder.bio}</p>
            )}

            {/* ============================================================
                QUALIFICATION CARDS
            ============================================================= */}
            {safeQualifications.length > 0 && (
              <div ref={qualsRef} className="mt-2 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
                {safeQualifications.map((qual) => (
                  <motion.div
                    key={qual?.id || qual?.degree}
                    className={cn(
                      "rounded-2xl  border border-[#2B2D42]/10 bg-card backdrop-blur-md",
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
                      <FaGraduationCap  size={16} />
                    </span>
                    <p className="text-sm font-semibold text-black">{qual?.degree}</p>
                    <p className="mt-0.5 text-xs text-black/60">{qual?.field}</p>
                    <p className="mt-1 text-[11px] text-black/40">{qual?.university}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
