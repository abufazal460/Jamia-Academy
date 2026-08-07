import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

/**
 * Module-level singleton reference — is tarah hook file (useLenisScroll)
 * bhi isi Lenis instance ko access kar sakta hai bina Context/Provider ke.
 * ES modules cached hote hain, isliye yeh safe singleton store ban jaata hai.
 */
let lenisInstance = null;

// Dusre files (jaise useLenisScroll hook) is function se instance mangwa sakte hain
export function getLenisInstance() {
  return lenisInstance;
}

/**
 * Premium easing curve — exponential ease-out.
 * Shuru mein fast, end mein natural deceleration — Apple/Awwwards jaisa feel.
 */
const premiumEasing = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * SmoothScroll — poori website ke liye single, global Lenis controller.
 * Yeh koi wrapper <div> render nahi karta kyunki Lenis by default
 * document/window ko hi control karta hai — extra DOM layer se
 * layout/CSS issues (position:fixed, sticky, etc.) create ho sakte the.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);
  const hasInitializedRef = useRef(false);
  const location = useLocation();

  useEffect(() => {
    // StrictMode guard: dev mode mein effect do baar chalta hai.
    // Agar instance pehle se hai (module-level ya ref se), dubara mat banao.
    if (hasInitializedRef.current || lenisInstance) {
      return undefined;
    }

    hasInitializedRef.current = true;

    const lenis = new Lenis({
      // Balanced lerp — na zyada sluggish, na zyada snappy
      lerp: 0.08,
      // Duration sirf scrollTo() jaisi programmatic calls ke liye use hoti hai
      duration: 1.8,
      easing: premiumEasing,
      // Desktop mouse wheel ke liye smooth multiplier
      wheelMultiplier: 1,
      // Mobile touch ke liye thoda kam multiplier — native feel ke paas
      touchMultiplier: 1.2,
      // Mobile par bhi smooth interpolation enable karta hai
      // (warna touch devices par Lenis native scroll pe fallback karta hai)
      syncTouch: true,
      syncTouchLerp: 0.075,
      // Vertical scroll hi chahiye poori site ke liye
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      // Native scrollbar ko touch mat karo — sirf scroll behavior smooth karo
      autoResize: true,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    // ---- GSAP ScrollTrigger compatibility (fully optional) ----
    // GSAP na to install hai na import kiya hai. Agar future mein
    // project mein GSAP add hota hai, yeh dynamic import use kar
    // ScrollTrigger ko Lenis ke scroll event se sync kar dega.
    // @vite-ignore isliye taaki Vite build-time par "gsap" ko
    // resolve karne ki koshish na kare (jo error dega agar package
    // installed nahi hai).
    (async () => {
      try {
        const gsapCore = await import(/* @vite-ignore */ "gsap");
        const scrollTriggerModule = await import(
          /* @vite-ignore */ "gsap/ScrollTrigger"
        );
        const gsap = gsapCore?.gsap ?? gsapCore?.default;
        const ScrollTrigger =
          scrollTriggerModule?.ScrollTrigger ?? scrollTriggerModule?.default;

        if (gsap && ScrollTrigger) {
          gsap.registerPlugin(ScrollTrigger);
          lenis.on("scroll", ScrollTrigger.update);
        }
      } catch {
        // GSAP abhi installed nahi hai — koi problem nahi,
        // Lenis apne aap normally kaam karta rahega.
      }
    })();

    // ---- RAF loop ----
    function raf(time) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }
    rafIdRef.current = requestAnimationFrame(raf);

    // ---- Cleanup ----
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      lenis.destroy();
      lenisRef.current = null;
      lenisInstance = null;
      hasInitializedRef.current = false;
    };
  }, []);

  // ---- Route change par smooth scroll-to-top ----
  // window.scrollTo(0,0) jump feel deta hai — Lenis.scrollTo use karke
  // yeh RouteTransitionWatcher ke saath conflict kiye bina naturally
  // top par le jaata hai. useState nahi use kiya isliye scroll ke
  // dauraan koi extra re-render nahi hota.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    lenis.scrollTo(0, {
      duration: 1.2,
      easing: premiumEasing,
      immediate: false,
    });
  }, [location.pathname]);

  return children;
}