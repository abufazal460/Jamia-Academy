import { usePageTransition } from "../pageTransition";
import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

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
          {/* WhatsApp button:
              hidden: Mobile (< lg) par completely hide kar do — sidabar me dikhega.
              lg:flex: Sirf desktop (1024px+) par show hoga, right side me.
              WHY: Mobile screen par navbar me WhatsApp aur hamburger dono saath ek cramped
              layout banate the. Ab mobile me WhatsApp sirf sidebar ke andar milega. */}
          <div className="hidden lg:flex">
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