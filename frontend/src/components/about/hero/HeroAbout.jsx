
// 1. React
import React, { useRef, useLayoutEffect, useState } from "react";

// 2. Third-party Libraries
import { motion } from "motion/react";
import gsap from "gsap";
import { Play, ChevronDown } from "lucide-react";

// 3. Internal Components
// (Is phase me koi child shared component nahi use ho raha — Phase 3+ me
// SectionContainer/AnimatedButton jaisi shared components yaha plug hongi)

// 4. Hooks
import usePrefersReducedMotion from "../../../hooks/usePrefersReducedMotion";

// 5. Utilities
import { splitIntoCharacters, splitIntoWords } from "../../../utils/textHelpers";
import { cn } from "../../../utils/helpers";

// 6. Constants / Data
import { hero } from "../../../data/aboutData";
import { gsapEase } from "../../../constants/animations";

// 7. Styles
// (Sirf Tailwind utility classes — koi separate CSS file nahi)

// -----------------------------------------------------------------------------
// STATIC STATS CONFIG
// Ye teeno stat cards Hero-specific hain (aboutData.js ke global `stats` array
// se alag rakhe gaye hain, kyunki wo StatsSection ke liye hai — Hero apna chhota
// preview dikhata hai). Isliye ye yahi file me local const ke roop me rakha gaya.
// -----------------------------------------------------------------------------
const heroStats = [
  { id: "hero-stat-students", value: "2000+", label: "Students Enrolled" },
  { id: "hero-stat-programs", value: "35+", label: "Programs Offered" },
  { id: "hero-stat-years", value: "4+", label: "Years Excellence" },
];

/**
 * HeroAbout
 * Ye component kya karta hai: About page ka hero section render karta hai
 * Kyu banaya gaya: page ka pehla impression premium aur cinematic banane ke liye
 * Kab call hoga: pages/About.jsx me sabse pehle
 * Kya return karega: <section> jisme background, heading, subtitle, paragraph,
 * CTA, stats aur scroll indicator hain
 */
const HeroAbout = () => {
  // Root scope ref — GSAP context isi ke andar scoped rahega
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const paragraphRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  // Accessibility: agar user ne reduced motion on kiya hai to heavy animation skip karenge
  const prefersReducedMotion = usePrefersReducedMotion();

  // Typewriter cursor ke liye local state (subtitle animation complete hua ya nahi)
  const [subtitleDone, setSubtitleDone] = useState(false);

  // Heading ko characters me todna — GSAP character-reveal ke liye
  const headingChars = splitIntoCharacters(hero.title);
  // Subtitle ko words me todna — typewriter effect ke liye
  const subtitleWords = splitIntoWords(hero.subtitle);
  // Description paragraph ko words me todna — word-by-word reveal ke liye
  const descriptionWords = splitIntoWords(hero.description);

  useLayoutEffect(() => {
    if (!rootRef.current) return undefined;

   
    // gsap.context() — sab selectors isi component ke andar scope honge,
    // aur unmount hote hi automatically cleanup ho jayega (memory leak safe)
    const ctx = gsap.context(() => {
      // Master timeline — Hero sirf ek baar (page load pe) animate hota hai,
      // isliye ScrollTrigger ki zaroorat nahi, seedha timeline chalayenge.
      const tl = gsap.timeline({
        defaults: { ease: gsapEase.heading },
      });

      // --------------------------------------------------------------------
      // STEP 1 — Background: hum background ko CSS/Framer se already animate
      // kar rahe hain (mesh gradient), yaha sirf background layer ko fade-in
      // karke timeline shuru karte hain taaki sequence sahi order me chale.
      // --------------------------------------------------------------------
      tl.from(rootRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // --------------------------------------------------------------------
      // STEP 2 — Heading Character Reveal
      // Har character: opacity 0→1, y 80→0, blur 10px→0px
      // Ease: expo.out (confident, strong deceleration — headings ke liye best)
      // Stagger se letters ek ek karke reveal honge, poora word nahi ek saath.
      // --------------------------------------------------------------------
      if (headingRef.current) {
        tl.from(
          headingRef.current.children,
          {
            opacity: 0,
            y: 80,
            filter: "blur(10px)",
            duration: 0.9,
            ease: gsapEase.heading, // expo.out
            stagger: 0.025,
          },
          "-=0.2"
        );
      }

      // --------------------------------------------------------------------
      // STEP 3 — Subtitle Typewriter Effect
      // Har word ek ek karke appear hoga (opacity + chhota y move), jaise
      // koi type kar raha ho. Last word ke baad cursor blink start hoga.
      // --------------------------------------------------------------------
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

      // --------------------------------------------------------------------
      // STEP 4 — Paragraph Word-by-Word Reveal
      // Har word: opacity 0→1, y movement, color gray(#8D99AE) → white,
      // blur 6px → 0px. Ease: power3.out (smooth, readable settle).
      // --------------------------------------------------------------------
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

      // --------------------------------------------------------------------
      // STEP 5 — Stats Cards Stagger (Card 1 → Card 2 → Card 3)
      // Ease: back.out(1.4) — halka overshoot, tactile/playful entrance
      // --------------------------------------------------------------------
      if (statsRef.current) {
        tl.from(
          statsRef.current.children,
          {
            opacity: 0,
            y: 40,
            scale: 0.9,
            duration: 0.7,
            ease: gsapEase.card, // back.out(1.4)
            stagger: 0.15,
          },
          "-=0.15"
        );
      }

      // --------------------------------------------------------------------
      // STEP 6 — CTA Button
      // Ease: power4.out — sharp, decisive, clickable feel
      // --------------------------------------------------------------------
      if (ctaRef.current) {
        tl.from(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: gsapEase.button, // power4.out
          },
          "-=0.4"
        );
      }
    }, rootRef);

    // Cleanup — component unmount hone par context revert (koi leak nahi)
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
        "bg-gradient-to-br from-[#0A0F30] via-[#301050] to-[#601580]"
      )}
    >
      {/* ================================================================
          BACKGROUND LAYER — animated mesh gradient + floating glow shapes
          Sirf transform/opacity animate ho raha hai, koi layout property nahi.
          Ye purely decorative hai isliye aria-hidden lagaya gaya hai.
      ================================================================= */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Soft glow blob 1 */}
        <motion.div
          className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-[#EF233C]/20 blur-[110px] will-change-transform"
          animate={
            prefersReducedMotion
              ? {}
              : { x: [0, 30, 0], y: [0, 20, 0] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Soft glow blob 2 */}
        <motion.div
          className="absolute bottom-[-10%] right-[-5%] h-[480px] w-[480px] rounded-full bg-[#8D99AE]/10 blur-[120px] will-change-transform"
          animate={
            prefersReducedMotion
              ? {}
              : { x: [0, -25, 0], y: [0, -15, 0] }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Subtle dot-grid pattern overlay — CSS background, GPU-cheap */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #EDF2F4 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Glass effect sheen across the top */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-[2px]" />
      </div>

      {/* ================================================================
          CONTENT LAYER
      ================================================================= */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16 py-24 sm:py-28">
        <div className="flex flex-col items-start gap-6 sm:gap-8 max-w-3xl">
          {/* Eyebrow badge */}
          {hero.eyebrow && (
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide text-[#EDF2F4] backdrop-blur-md">
              {hero.eyebrow}
            </span>
          )}

          {/* H1 — sirf ek H1 poore page pe, SEO ke liye zaroori */}
          <h1
            id="hero-heading"
            ref={headingRef}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] text-white"
          >
            {/* Har character ek span me — GSAP stagger yahi children animate karega */}
            {headingChars.map((char, index) => (
              <span
                key={`hero-char-${index}-${char}`}
                className="inline-block will-change-transform"
                aria-hidden="true"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            {/* Screen readers ke liye actual accessible text alag se */}
            <span className="sr-only">{hero.title}</span>
          </h1>

          {/* Subtitle — typewriter effect */}
          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl lg:text-2xl font-medium text-[#EDF2F4]"
          >
            {subtitleWords.map((word, index) => (
              <span key={`subtitle-word-${index}-${word}`} className="inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
            {/* Blinking cursor — subtitle complete hote hi dikhta hai */}
            <motion.span
              className="inline-block w-[2px] h-[1em] bg-[#EF233C] align-middle ml-1"
              animate={subtitleDone ? { opacity: [1, 0, 1] } : { opacity: 0 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
          </p>

          {/* Description paragraph — word by word reveal (color gray → white) */}
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

        

          {/* --------------------------------------------------------------
              STATS — 3 floating cards, GSAP stagger entrance,
              Framer Motion hover lift
          --------------------------------------------------------------- */}
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
                        borderColor: "rgba(239,35,60,0.5)",
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
