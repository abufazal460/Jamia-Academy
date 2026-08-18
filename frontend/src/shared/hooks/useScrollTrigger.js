// File: useScrollTrigger.js
// Purpose: Generic wrapper — kisi bhi target element pe ScrollTrigger-based animation register karna
// Responsibility: Section entry/replay animations ko consistent standard ke saath handle karna
// Future Usage: Timeline section, Hero parallax, Founder image reveal, etc.
// Dependencies: react, gsap, gsap/ScrollTrigger, constants/animations.js

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollTrigger
 * Ye hook kya karta hai: target ref pe ek ScrollTrigger-driven timeline create karta hai
 * Kyu banaya gaya: har section me manually ScrollTrigger boilerplate likhne se bachne ke liye
 * Kab call hoga: jab kisi section ko scroll-based reveal animation chahiye
 * Kya return karega: targetRef — isse hi DOM element pe attach karna hai
 *
 * @param {Function} buildTimeline - (gsap.timeline) => void, jisme timeline ke .to()/.from() calls likhne hain
 * @param {Object} options - { start, end, scrub, once, markers } — ScrollTrigger config
 */
const useScrollTrigger = (buildTimeline, options = {}) => {
  const targetRef = useRef(null);

  const {
    start = "top 80%",
    end = "bottom 20%",
    scrub = false,
    once = false, // Hero/Loader/Intro ke alawa har jagah false rakhna — replay ke liye
    markers = false, // Production me hamesha false
  } = options;

  useEffect(() => {
    if (!targetRef.current || typeof buildTimeline !== "function") return undefined;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: targetRef.current,
        start,
        end,
        scrub,
        markers,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        toggleActions: once ? "play none none none" : "play reverse play reverse",
      },
    });

    buildTimeline(tl);

    // Cleanup: component unmount hone par ScrollTrigger instance aur timeline dispose karna zaroori hai
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return targetRef;
};

export default useScrollTrigger;
