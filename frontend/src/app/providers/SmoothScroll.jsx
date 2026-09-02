import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Module-level singleton reference — is tarah dusre files (jaise
 * BrowseCoursesCTA, CourseModal, Lightbox, PageTransitionProvider) bhi
 * isi Lenis instance ko access kar sakte hain bina Context/Provider ke.
 * ES modules cached hote hain, isliye yeh safe singleton store ban jaata hai.
 *
 * IMPORTANT: Poore project mein Lenis ka YEH hi ek instance hona chahiye.
 * Koi bhi naya `new Lenis()` kahin aur mat banao — sirf yahan se
 * `getLenisInstance()` import karo.
 */
let lenisInstance = null;

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
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    // StrictMode guard: dev mode mein effect do baar chalta hai.
    // Agar instance pehle se hai (module-level ya ref se), dubara mat banao.
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
      // syncTouch: false (default) — Lenis ke apne docs is mode ko
      // "can be unstable" bolte hain. Yehi combo (syncTouch:true +
      // touchMultiplier>1) chhoti touch-swipe ko bade scroll jump mein
      // convert kar raha tha mobile par.
      syncTouch: false,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      autoResize: true,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    // ---- GSAP ScrollTrigger sync ----
    // ScrollTrigger ko Lenis ke virtual scroll se sync karna zaroori hai,
    // warna pinned/scrub animations real scroll position se peeche reh jaate hain.
    // Yeh listener poore project mein sirf YAHAN register hota hai — kahin
    // bhi dusri jagah (jaise gallery.motion.js) dobara mat lagao, warna
    // ScrollTrigger.update har scroll tick pe do baar chalega (duplicate work).
    lenis.on("scroll", ScrollTrigger.update);

    // ---- RAF: GSAP ke ticker se drive hota hai (independent rAF loop nahi) ----
    // Wajah: agar Lenis ka apna alag requestAnimationFrame loop ho aur GSAP
    // animations GSAP ke apne ticker se chalein, to dono clocks thoda sa
    // drift karte hain — yehi micro-desync Gallery jaise scrub-heavy
    // sections mein "jerky" feel deta hai. Ek hi clock (GSAP ticker) pe
    // dono ko chalane se yeh drift khatam ho jaata hai. (Official Lenis +
    // GSAP ScrollTrigger integration pattern.)
    const update = (time) => {
      lenis.raf(time * 1000); // GSAP ticker seconds deta hai, Lenis ko ms chahiye
    };
    gsap.ticker.add(update);

    // GSAP apne aap tab-throttle/lag-catch-up karta hai (lagSmoothing) —
    // isse Lenis ke smooth interpolation ke saath conflict hota hai
    // (sudden "jump/catch-up" jerk). Disable karna Lenis+ScrollTrigger
    // setups ke liye official recommendation hai.
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

  // NOTE: Route-change par scroll-reset yahan se jaanbujh kar hataya gaya hai.
  // PageTransitionProvider (src/app/providers/page-transition/PageTransitionProvider.jsx)
  // curtain ke peeche `getLenisInstance()?.scrollTo(0, { immediate: true })` se
  // reset karta hai. Pehle yeh effect bhi apna alag animated scrollTo(0)
  // chalata tha — do independent scroll-reset systems ek hi route change par
  // conflict karte the (reveal ke turant baad visible scroll-flash/jump).
  // Ab sirf ek jagah (PageTransitionProvider) yeh responsibility rakhta hai.

  return children;
}