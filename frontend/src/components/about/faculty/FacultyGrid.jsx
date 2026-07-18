/*
========================================

File:
FacultyGrid.jsx

Purpose:
Ye component Jamia Academy ke experienced educators ko premium card grid me
showcase karta hai — qualifications, experience, aur expertise dikhakar
academic credibility aur trust build karne ke liye.

Responsibilities:
- Section heading + description
- Dynamic faculty cards (image, name, designation, qualification, experience,
  expertise) from aboutData.faculty
- Hover/focus par expertise details ka smooth expand reveal
- Image fallback jab profile photo load na ho

Animation Engine:
GSAP + ScrollTrigger — replay-enabled (once:false):
Heading → Description → Faculty cards (stagger 0.12, expo.out, duration 0.8)
Framer Motion — hover (lift, scale, shadow, image zoom) + expertise expand only

Data Source:
@/data/aboutData → faculty array (id, name, title/designation, image,
qualification, experience, expertise)

========================================
*/

// 1. React
import React, { useRef, useState } from "react";

// 2. Third-party Libraries
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageOff, GraduationCap, BadgeCheck } from "lucide-react";

// 3. Internal Components

// 4. Hooks
import useGSAPAnimation from "../../../hooks/useGSAPAnimation";
import usePrefersReducedMotion from "../../../hooks/usePrefersReducedMotion";

// 5. Utilities
import { cn, safeArray } from "../../../utils/helpers";
import { getImageProps } from "../../../utils/imageHelpers";

// 6. Constants / Data
import { faculty } from "../../../data/aboutData";
import { gsapEase } from "../../../constants/animations";

// 7. Styles

gsap.registerPlugin(ScrollTrigger);

/**
 * FacultyCard
 * Ye component kya karta hai: ek single faculty member ka card render karta hai,
 * apna khud ka image-error state aur hover/focus-based expertise expand handle karta hai
 * Kyu banaya gaya: FacultyGrid ko clean rakhne ke liye — har card ka local state alag
 * Kab call hoga: FacultyGrid ke andar .map() se, har faculty member ke liye
 */
const FacultyCard = ({ member, prefersReducedMotion }) => {
  const [imageError, setImageError] = useState(false);
  const [isActive, setIsActive] = useState(false); // hover ya keyboard focus dono se true hota hai

  const expertiseList = safeArray(member?.expertise);

  return (
    <motion.div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl",
        "border border-white/10 bg-white/[0.06] backdrop-blur-xl",
        "shadow-[0_10px_32px_rgba(0,0,0,0.18)] will-change-transform"
      )}
      onHoverStart={() => setIsActive(true)}
      onHoverEnd={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      // Keyboard users ke liye bhi card focusable, taaki expertise expand keyboard se bhi trigger ho
      tabIndex={0}
      whileHover={
        prefersReducedMotion
          ? {}
          : { y: -8, scale: 1.03, boxShadow: "0 20px 46px rgba(0,0,0,0.3)" }
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* ================================================================
          PROFILE IMAGE — gradient border, zoom-on-hover, fallback safe
      ================================================================= */}
      <div className="relative m-4 mb-0 overflow-hidden rounded-2xl bg-gradient-to-br from-[#E63946] via-[#F4A261] to-[#2A9D8F] p-[2.5px]">
        <div className="relative overflow-hidden rounded-[14px] bg-white/5">
          {!imageError ? (
            <motion.img
              {...getImageProps(member?.image, `${member?.name || "Faculty member"} profile photo`, false)}
              onError={() => setImageError(true)}
              className="aspect-square w-full object-cover"
              animate={prefersReducedMotion ? {} : { scale: isActive ? 1.08 : 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          ) : (
            <div
              role="img"
              aria-label={`${member?.name || "Faculty"} image unavailable`}
              className="flex aspect-square w-full flex-col items-center justify-center gap-2 bg-white/5 text-white/40"
            >
              <ImageOff size={26} aria-hidden="true" />
              <span className="text-[11px] text-center px-2">Faculty Image Unavailable</span>
            </div>
          )}
        </div>
      </div>

      {/* ================================================================
          INFORMATION
      ================================================================= */}
      <div className="flex flex-1 flex-col gap-1.5 p-5 pt-4">
        <h3 className="text-base sm:text-lg font-semibold text-white">{member?.name || "Faculty Member"}</h3>
        <p className="text-xs sm:text-sm font-medium text-[#F4A261]">
          {member?.title || member?.designation || "Faculty"}
        </p>

        {member?.qualification && (
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-white/60">
            <GraduationCap size={13} className="shrink-0" aria-hidden="true" />
            <span>{member.qualification}</span>
          </div>
        )}

        {member?.experience && (
          <div className="flex items-center gap-1.5 text-xs text-white/60">
            <BadgeCheck size={13} className="shrink-0" aria-hidden="true" />
            <span>{member.experience} Experience</span>
          </div>
        )}

        {/* ==============================================================
            EXPAND DETAILS — expertise list, hover/focus par smooth reveal
            height + opacity transition, koi layout glitch nahi (grid-rows trick)
        ============================================================== */}
        {expertiseList.length > 0 && (
          <motion.div
            className="mt-2 grid"
            initial={false}
            animate={{ gridTemplateRows: isActive || prefersReducedMotion ? "1fr" : "0fr" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <div className="overflow-hidden">
              <motion.div
                className="flex flex-wrap gap-1.5 pt-2"
                animate={{ opacity: isActive || prefersReducedMotion ? 1 : 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {expertiseList.map((skill, index) => (
                  <span
                    key={`${member?.id}-expertise-${index}`}
                    className="rounded-full bg-[#2A9D8F]/15 px-2.5 py-1 text-[10px] font-medium text-[#2A9D8F]"
                  >
                    {skill}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

/**
 * FacultyGrid
 * Ye component kya karta hai: institute ke faculty members ko responsive grid me render karta hai
 * Kyu banaya gaya: experienced educators dikha kar academic trust build karna
 * Kab call hoga: pages/About.jsx me StatsSection ke baad
 * Kya return karega: <section> jisme heading + responsive faculty-card grid hai
 */
const FacultyGrid = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const safeFaculty = safeArray(faculty);

  const scopeRef = useGSAPAnimation((scope) => {
    if (!sectionRef.current) return;

    if (prefersReducedMotion) {
      gsap.set(
        [headingRef.current, descriptionRef.current, cardsRef.current?.children],
        { opacity: 1, y: 0, scale: 1, clearProps: "all" }
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

    // STEP 2 — Description
    if (descriptionRef.current) {
      tl.from(
        descriptionRef.current,
        { opacity: 0, y: 18, duration: 0.5, ease: gsapEase.paragraph },
        "-=0.35"
      );
    }

    // STEP 3 — Faculty cards: stagger entrance
    if (cardsRef.current) {
      tl.from(
        cardsRef.current.children,
        {
          opacity: 0,
          y: 34,
          scale: 0.93,
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.12,
        },
        "-=0.2"
      );
    }
  }, [prefersReducedMotion]);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
        scopeRef.current = node;
      }}
      id="faculty"
      aria-labelledby="faculty-heading"
      className="relative w-full overflow-hidden bg-[#1A1A2E] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16">
        {/* Section heading + description */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#F4A261]">
            Our Educators
          </span>
          <h2
            id="faculty-heading"
            ref={headingRef}
            className="mt-3 font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white"
          >
            Meet Our Faculty
          </h2>
          <p ref={descriptionRef} className="mt-4 text-sm sm:text-base leading-relaxed text-white/60">
            Experienced educators dedicated to academic excellence and student growth.
          </p>
        </div>

        {/* Faculty grid — mobile: 1 col, tablet: 2 col, desktop: 4 col */}
        <div ref={cardsRef} className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safeFaculty.length > 0 ? (
            safeFaculty.map((member) => (
              <FacultyCard key={member?.id || member?.name} member={member} prefersReducedMotion={prefersReducedMotion} />
            ))
          ) : (
            // Defensive fallback — data missing hone par bhi layout crash na ho
            <p className="col-span-full text-center text-sm text-white/50">
              {/* TODO:
                  Replace Dummy Data with Official Jamia Academy Content. */}
              Faculty information coming soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FacultyGrid;
