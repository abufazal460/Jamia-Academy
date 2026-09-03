import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function getLenisInstance() {
  return lenisInstance;
}

const premiumEasing = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (hasInitializedRef.current || lenisInstance) {
      return undefined;
    }
    hasInitializedRef.current = true;

    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      lerp: 0.3,
      duration: 1.8,
      easing: premiumEasing,
      wheelMultiplier: 0.8,
      touchMultiplier: 1,
      syncTouch: false,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      autoResize: true,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // ---- Cleanup ----
    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
      lenisInstance = null;
      hasInitializedRef.current = false;
    };
  }, []);

  return children;
}