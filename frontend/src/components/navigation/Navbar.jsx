import { usePageTransition } from "../pageTransition";
import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

// GSAP: Scroll-based hide/show animation ke liye use hoga.
// WHY GSAP aur Framer Motion dono: Framer Motion state-driven animations ke liye,
// GSAP imperative scroll-triggered animations ke liye — dono ka alag role hai.
import { gsap } from "gsap";
// LoginButton: navLinks array se alag, WhatsAppButton ki tarah independently rendered.
import LoginButton from "../navigation/LoginButton";


// Ye exact imports hai jo user ne diye hai — inhe bilkul change nahi kiya gaya.
import humburger from "../../assets/button/hambargur.webp";
import cross from "../../assets/button/cross.svg";
import logo from "../../assets/logo/jamia-academy-Logo.png";

import NavItem from "./NavItem";
import MobileMenu from "./MobileMenu";
import WhatsAppButton from "./WhatsAppButton";
import { navLinks } from "../../data/navLinksData";

// ====================================================================
// Navbar.jsx — MODIFIED
//
// REMOVED:
//   - isCourseOpen state aur usse related saare handlers
//     (handleCourseClick, toggleMobileCourse)
//   - MegaMenu import aur uska render
//   - Outside click handler jo sirf dropdown ke liye tha
//   - Glass morphism floating pill layout (rounded-2xl, backdrop-blur, border-white/10)
//   - bg-[#0b1437]/70 dark blue semi-transparent background
//   - Shadow / ring related classes
//
// ADDED:
//   - Full-width sticky black navbar (bg-black / bg-[#050505])
//   - Nav links ab center me ek subtle dark pill container me hai (Sheryians-inspired)
//   - Clean professional spacing, no floating center card
//
// WHY: New design requirement: full-width black bar, Sheryians-style layout.
//      Dropdown poora remove ho gaya, isliye related state/handlers bhi hata diye.
// ====================================================================

// Logo ka entry animation: left se slide karke aayega.
const logoVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 90, damping: 16, delay: 0.05 },
  },
};

function Navbar() {
  // ------------------------------------------------------------------
  // STATE
  // ------------------------------------------------------------------
  const location = useLocation();
const { navigateWithTransition, isTransitioning } = usePageTransition();

const handleLogoClick = useCallback(
  (e) => {
    e.preventDefault();
    if (isTransitioning) return;
    navigateWithTransition("/");
  },
  [navigateWithTransition, isTransitioning]
);

  // isMobileMenuOpen: Hamburger sidebar open/close control.
  // isCourseOpen STATE REMOVED — dropdown ab exist hi nahi karta.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // navRef: Iska use ab sirf Escape key close ke liye hai (mega menu outside click logic removed).
  const navRef = useRef(null);
  
  // ---- GSAP Scroll Animation Refs ----
  // WHY alag wrapper divs: Framer Motion ke motion elements par directly GSAP chalana
  // conflicts create kar sakta hai. Wrapper divs pe GSAP chalao — clean separation.
  const logoWrapRef = useRef(null);    // Logo: left slide + fade on hide
  const navLinksRef = useRef(null);    // Nav pill: upward + fade on hide
  const loginWrapRef = useRef(null);   // Login button: right slide + fade on hide
  const whatsappWrapRef = useRef(null); // WhatsApp button: right slide + fade on hide

  // scrollState: useRef me isliye rakha hai (useState nahi) kyunki is state ke
  // change hone par component ko re-render NAHI karna hai — sirf GSAP animate karna hai.
  // useState se unnecessary re-renders hote jo performance hit karte.
  const scrollState = useRef({
    isHidden: false,   // Ab navbar hide hai ya nahi
    lastScrollY: 0,    // Last known scroll position (direction detect karne ke liye)
    ticking: false,    // rAF throttle flag — ek hi rAF pending ho at a time
    hideScrollY: 0,    // Jis scroll position par hide hua tha (wapas show kab karna hai)
  });

  // ------------------------------------------------------------------
  // DERIVED
  // ------------------------------------------------------------------
  // useMemo: location.pathname tabhi recalculate ho jab route change ho,
  // har render par nahi. Performance optimization.
  const activeId = useMemo(() => {
    if (location.pathname === "/") return "home";
    const match = navLinks.find(
      (link) => link.route !== "/" && location.pathname.startsWith(link.route)
    );
    return match?.id ?? "";
  }, [location.pathname]);

  // ------------------------------------------------------------------
  // HANDLERS
  // ------------------------------------------------------------------
  // useCallback: MobileMenu React.memo use karta hai, isliye stable function reference
  // zaroori hai warna memoization ka koi fayda nahi.
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // NavItem ke liye simple click handler — sirf mobile menu close karta hai.
  // Dropdown toggle logic REMOVED (isCourseOpen, handleCourseClick, etc. — ye sab hata diye).
  const handleNavClick = useCallback(() => {
    // Mobile menu khula ho to nav click par band kar do.
    setIsMobileMenuOpen(false);
  }, []);

  // ------------------------------------------------------------------
  // KEYBOARD ACCESSIBILITY (Escape close)
  // ------------------------------------------------------------------
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
    // Cleanup — memory leak rokne ke liye listener hata dete hai component unmount par.
  }, []);

  
  // ------------------------------------------------------------------
  // GSAP SCROLL: NAVBAR HIDE / SHOW
  // WHY GSAP (Framer Motion nahi): Scroll-triggered imperative animations ke liye
  // GSAP ka Power2/Expo easing premium feel deta hai. Framer Motion state-driven
  // animations ke liye better hai. Dono ka alag role — koi conflict nahi.
  // ------------------------------------------------------------------
  useEffect(() => {
    // 100vh se zyada scroll karne ke baad hi navbar hide hoga.
    // WHY 100vh: Page ke hero section ke baad user content mein hai — tab hide karna sahi hai.
    const HIDE_AFTER_PX = window.innerHeight;

    // ~25vh wapas scroll karne ke baad navbar wapas dikhega.
    // WHY 25vh: Itna threshold rakhne se slight wobble ya micro-scroll par
    // navbar baar baar show/hide nahi hoga — professional, no-flicker behavior.
    const SHOW_AFTER_UP_PX = window.innerHeight * 0.25;

    const state = scrollState.current;

    // ---- HIDE FUNCTION ----
    // Navbar ko smoothly upar slide out karta hai + individual elements alag direction me.
    function hideNavbar() {
      if (state.isHidden) return; // Already hidden hai to dobara animate mat karo.
      state.isHidden = true;

      // Poora header upar chala jata hai — sticky position se bahar.
      // expo.out: Fast start, smooth end — premium "swoosh" feel.
      gsap.to(navRef.current, {
        y: "-100%",
        duration: 0.52,
        ease: "expo.out",
      });

      // Logo left ki taraf shift hoke fade out — "fly away" feel.
      gsap.to(logoWrapRef.current, {
        x: -28,
        opacity: 0,
        duration: 0.42,
        ease: "power2.out",
      });

      // Nav links upar ki taraf fade out — header ke saath connected lagta hai.
      gsap.to(navLinksRef.current, {
        y: -14,
        opacity: 0,
        duration: 0.36,
        ease: "power2.out",
      });

      // Login aur WhatsApp right ki taraf slide out — symmetrical to logo.
      // filter(Boolean): Refs null na ho agar element desktop par render na ho.
      const rightTargets = [loginWrapRef.current, whatsappWrapRef.current].filter(Boolean);
      if (rightTargets.length) {
        gsap.to(rightTargets, {
          x: 28,
          opacity: 0,
          duration: 0.42,
          ease: "power2.out",
        });
      }
    }

    // ---- SHOW FUNCTION ----
    // Navbar ko wapas smoothly show karta hai — exactly reverse of hide.
    function showNavbar() {
      if (!state.isHidden) return; // Already visible hai to dobara animate mat karo.
      state.isHidden = false;

      // Header wapas neeche aata hai — expo.out se natural "snap back" feel.
      gsap.to(navRef.current, {
        y: "0%",
        duration: 0.58,
        ease: "expo.out",
      });

      // Logo wapas left se normal position mein aata hai.
      // delay: 0.08 — header ke settle hone ke baad individual elements animate ho.
      gsap.to(logoWrapRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.44,
        ease: "power2.out",
        delay: 0.08,
      });

      // Nav links upar se wapas normal position.
      gsap.to(navLinksRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.38,
        ease: "power2.out",
        delay: 0.08,
      });

      // Login aur WhatsApp right se wapas normal position.
      const rightTargets = [loginWrapRef.current, whatsappWrapRef.current].filter(Boolean);
      if (rightTargets.length) {
        gsap.to(rightTargets, {
          x: 0,
          opacity: 1,
          duration: 0.44,
          ease: "power2.out",
          delay: 0.08,
        });
      }
    }

    // ---- SCROLL HANDLER ----
    // WHY requestAnimationFrame: Scroll event bahut tezi se fire hota hai.
    // rAF ise screen refresh rate (60fps) ke saath sync karta hai —
    // unnecessary calculations avoid hoti hai, performance smooth rehti hai.
    function handleScroll() {
      if (state.ticking) return; // Pehle se ek rAF pending hai — naya schedule mat karo.
      state.ticking = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;

        // Scroll direction detect karo.
        const isScrollingDown = currentY > state.lastScrollY;

        if (isScrollingDown && currentY > HIDE_AFTER_PX && !state.isHidden) {
          // User neeche scroll kar raha hai + 100vh se zyada gaya hai + already hidden nahi.
          state.hideScrollY = currentY; // Record karo kahan hide kiya.
          hideNavbar();
        } else if (!isScrollingDown && state.isHidden) {
          // User upar scroll kar raha hai + navbar abhi hide hai.
          // Kitna upar aaya hide hone ki jagah se?
          const scrolledBackUp = state.hideScrollY - currentY;
          if (scrolledBackUp >= SHOW_AFTER_UP_PX) {
            // 25vh wapas scroll ho gaya — ab show karo.
            showNavbar();
          }
        }

        // Last scroll position update karo. Math.max(0): Negative scroll position avoid.
        state.lastScrollY = Math.max(0, currentY);
        state.ticking = false; // Agla rAF accept karne ke liye ready.
      });
    }

    // passive: true — scroll handler me preventDefault() nahi call hoga,
    // isliye browser scroll performance optimize kar sakta hai.
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Component unmount par GSAP tweens clean karo — memory leak avoid.
      gsap.killTweensOf([
        navRef.current,
        logoWrapRef.current,
        navLinksRef.current,
        loginWrapRef.current,
        whatsappWrapRef.current,
      ].filter(Boolean));
    };
  }, []); // Empty deps: Ye effect sirf ek baar mount par run hoga.


  return (
    // ================================================================
    // MAIN NAVBAR CONTAINER
    // bg-black: Pure black background — new design requirement.
    //           Pehle bg-[#0b1437]/70 + backdrop-blur tha (glass effect),
    //           ab solid black full-width bar hai.
    // sticky top-0: Scroll karte waqt navbar hamesha upar fixed rahega.
    // z-50: Baaki content ke upar render hoga (overlays, modals etc se bhi upar).
    // border-b border-white/8: Subtle separator line neeche, baaki content se alag karta hai.
    // w-full: Poori screen width cover kare — no floating center card anymore.
    // ================================================================
    <header
      ref={navRef}
      className="fixed top-0 z-50 w-full"
    >
      <motion.div
        // Navbar ka pura row — initial me thoda upar se fade-in hoga.
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={[
          // max-w-screen-2xl: bahut bade screens par content bahut wide na ho.
          // mx-auto: center-aligned content within full-width bar.
          // px-4 sm:px-6 lg:px-10: responsive horizontal padding.
          // h-16 md:h-[68px]: fixed height — CLS (layout shift) prevent karta hai.
          "mx-auto flex max-w-screen-2xl items-center justify-between",
          "h-16 px-4 sm:px-6 lg:px-10 md:h-[68px]",
        ].join(" ")}
      >
        {/* ======================== LOGO (LEFT) ======================== */}
        <motion.a
          href="/"
          onChange={handleLogoClick}
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          aria-label="Jamia Academy — Home"
          // outline-none: No browser default outline. NO ring added (as per requirement).
          className="flex shrink-0 items-center gap-2 outline-none"
        >
          <img
            src={logo}
            alt="Jamia Academy Logo"
            // Width/height fix kiya — image load hone se pehle CLS na ho.
            width="40"
            height="40"
            className="h-9 w-auto sm:h-10"
          />
        </motion.a>

        {/* ======================== NAV LINKS (CENTER) — DESKTOP ONLY ======================== */}
        {/* hidden lg:flex: Mobile/Tablet par chhupa do, Desktop (lg = 1024px+) par dikhao. */}
        <nav aria-label="Primary navigation" className="hidden lg:flex">
          {/* ----------------------------------------------------------------
              Ye pill container Sheryians-inspired design hai.
              bg-white/5: Very subtle dark glass — links ke liye ek group container feel deta hai.
              rounded-full: Pill/capsule shape, modern look.
              p-1: Thoda andar padding taaki active pill ke corners tight na lage.
              border border-white/8: Barely visible border for depth.
          ---------------------------------------------------------------- */}
          <ul className="flex items-center gap-0.5 rounded-full border border-white/8 bg-white/5 p-1">
            {navLinks.map((item, index) => (
              <NavItem
                key={item.id}
                item={item}
                index={index}
                isActive={activeId === item.id}
                // isDropdownOpen aur hasDropdown props REMOVED — ab zaroorat nahi.
                onClick={handleNavClick}
              />
            ))}
          </ul>
          {/* MegaMenu REMOVED — import bhi hata diya, render bhi nahi hai ab. */}
        </nav>

         {/* ======================== RIGHT SIDE ======================== */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* LOGIN BUTTON — Desktop only.
              loginWrapRef: GSAP scroll par right slide + fade.
              WHY hidden lg:flex: Mobile me Login button sirf sidebar me ho sakta hai future me.
              Abhi mobile par nahi dikhega, desktop par dikhega. */}
          <div ref={loginWrapRef} className="hidden lg:flex">
            <LoginButton />
          </div>

          {/* WHATSAPP BUTTON — Desktop only.
              whatsappWrapRef: GSAP scroll par right slide + fade (Login ke saath synchronized).
              hidden lg:flex: Mobile me WhatsApp sirf MobileMenu sidebar ke bottom me dikhega. */}
          <div ref={whatsappWrapRef} className="hidden lg:flex">
            <WhatsAppButton />
          </div>

          {/* ======================== HAMBURGER BUTTON (MOBILE/TABLET) ======================== */}
          {/* lg:hidden: Desktop (1024px+) par hamburger hide ho jata hai. */}
          <motion.button
            type="button"
            onClick={toggleMobileMenu}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 110, damping: 16, delay: 0.4 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-panel"
            // outline-none: NO ring anywhere — as per requirement.
            // hover:bg-white/10: Subtle hover background feedback.
            className="grid h-10 w-10 place-items-center rounded-full outline-none transition-colors hover:bg-white/10 lg:hidden"
          >
            {/* Hamburger <-> Cross image crossfade with rotate */}
            <motion.img
              key={isMobileMenuOpen ? "cross" : "hamburger"}
              src={isMobileMenuOpen ? cross : humburger}
              alt=""
              aria-hidden="true"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              width="22"
              height="22"
              className="h-5 w-5 object-contain"
            />
          </motion.button>
        </div>
      </motion.div>

      {/* ======================== MOBILE SIDEBAR ======================== */}
      <div id="mobile-menu-panel">
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
          // onCourseToggle aur isCourseOpen props REMOVED — dropdown gone.
        />
      </div>
    </header>
  );
}

export default Navbar;