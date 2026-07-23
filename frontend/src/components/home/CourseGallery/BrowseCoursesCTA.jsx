// src/components/CTA/BrowseCoursesCTA.jsx
//
// NAYA, ALAG component — gallery ke andar kuch nahi chhuya gaya. Yeh
// sirf gallery ke BAAD render hota hai (normal page flow mein, koi
// fixed/sticky positioning nahi), isliye scroll karte hue gallery
// khatam hone ke baad naturally dikhta hai.
//
// GSAP fade-up animation self-contained hai — apna khud ka ScrollTrigger
// banata aur cleanup karta hai, gallery ki animation timelines ko
// bilkul touch nahi karta.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getActiveLenis } from "./galleryAnimation";
import { usePageTransition } from "../../pageTransition";
gsap.registerPlugin(ScrollTrigger); // idempotent — already registered elsewhere bhi

/**
 * @param {object} props
 * @param {string} props.heading       - default: "Browse More Courses"
 * @param {string} props.description   - supporting paragraph
 * @param {string} props.buttonLabel   - default: "Browse All Courses"
 * @param {string} props.targetId      - DOM id of the Courses section to scroll to (same page)
 * @param {string} props.href          - fallback route to navigate to if targetId isn't found on the page
 * @param {() => void} [props.onBrowseCourses] - optional override; if provided, this runs instead of the default scroll/navigate logic (use this to plug in React Router's navigate())
 */
export default function BrowseCoursesCTA({
  heading = "Browse More Courses",
  description = "Continue exploring our complete collection of professional courses designed to help you learn new skills and grow your career.",
  buttonLabel = "Browse All Courses",
  targetId = "course",
  href = "/course",
  onBrowseCourses,
}) {
  const sectionRef = useRef(null);
  const { navigateWithTransition } = usePageTransition();

  // ---------- Subtle fade-up entrance, isolated ScrollTrigger ----------
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tween = gsap.fromTo(
      section,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  // ---------- Navigation: prefer an existing routing solution ----------
  const handleClick = () => {
    // Agar parent app apna khud ka routing handler de raha hai
    // (e.g. React Router ka navigate()), usi ko priority do.
    if (typeof onBrowseCourses === "function") {
      onBrowseCourses();
      return;
    }

    const target = targetId ? document.getElementById(targetId) : null;

    if (target) {
      // Same-page section — existing Lenis instance se smooth scroll,
      // native window.scrollTo NAHI use karte kyunki Lenis pehle se
      // scroll control kar raha hai.
      const lenis = getActiveLenis();
      if (lenis) {
        lenis.scrollTo(target, { offset: 0, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

      // Courses section is page pe nahi mili — SPA route change karo,
    // transition ke through (full page reload nahi hoga).
    if (href) navigateWithTransition(href);
  };

  return (
    <section
      ref={sectionRef}
      id="browse-courses"
      className="relative w-full bg-neutral-950 px-4 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {heading}
        </h2>

        <p className="mt-4 max-w-xl text-balance text-base text-neutral-400 sm:mt-6 sm:text-lg">
          {description}
        </p>

        <button
          type="button"
          onClick={handleClick}
          className={[
            "mt-8 inline-flex items-center justify-center sm:mt-10",
            "rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-neutral-950 sm:px-10 sm:py-4 sm:text-base",
            "transition-transform duration-200 ease-out hover:scale-[1.03] hover:bg-neutral-100",
            "active:scale-[0.98]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
          ].join(" ")}
        >
          {buttonLabel}
        </button>
      </div>
    </section>
  );
}