import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

// Ye exact imports hai jo user ne diye hai - inhe replace nahi kiya gaya.
import humburger from "../../assets/button/hambargur.webp";
import cross from "../../assets/button/cross.svg";
import logo from "../../assets/logo/jamia-academy-Logo.png";

import NavItem from "./NavItem";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import WhatsAppButton from "./WhatsAppButton";
import { navLinks } from "../../data/navLinksData";

// ====================================================================
// Navbar.jsx
// Ye Navbar ka MAIN/PARENT component hai jo saare chhote components
// (NavItem, MegaMenu, MobileMenu, WhatsAppButton) ko jodta hai.
// ====================================================================

// Logo animation variant - left se slide karke aayega, slow & smooth.
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
  // STATE MANAGEMENT
  // ------------------------------------------------------------------
  // activeItem: konsa nav link currently "active/selected" hai (URL ke hisaab se).
  const location = useLocation();

  // isCourseOpen: Mega Menu (desktop) ya accordion (mobile) khula hai ya nahi.
  const [isCourseOpen, setIsCourseOpen] = useState(false);

  // isMobileMenuOpen: Hamburger sidebar khula hai ya nahi.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Ye ref Mega Menu ke bahar click hone par usko close karne ke liye hai.
  const navRef = useRef(null);

  // ------------------------------------------------------------------
  // DERIVED / MEMOIZED VALUES
  // ------------------------------------------------------------------
  // useMemo isliye use kiya hai taki har render par naya activeId calculate na ho,
  // sirf tab calculate ho jab location.pathname change ho. Performance optimization.
  const activeId = useMemo(() => {
    if (location.pathname === "/") return "home";
    const match = navLinks.find(
      (link) => link.route !== "/" && location.pathname.startsWith(link.route)
    );
    return match?.id ?? "";
  }, [location.pathname]);

  // ------------------------------------------------------------------
  // EVENT HANDLERS (useCallback se memoize kiya gaya hai)
  // ------------------------------------------------------------------
  // WHY useCallback: NavItem React.memo se wrapped hai, agar har render par
  // ye function naya banta to memo ka fayda hi nahi hota (NavItem fir bhi re-render hota).
  const handleNavClick = useCallback((item, e) => {
    if (item.hasDropdown) {
      // Courses pe click karne par default navigation rokho, dropdown toggle karo.
      e.preventDefault();
      setIsCourseOpen((prev) => !prev);
    } else {
      setIsCourseOpen(false);
    }
  }, []);

  const handleCourseClick = useCallback(() => {
    // Jab user koi specific course select kare to mega menu close ho jaye.
    setIsCourseOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsCourseOpen(false);
  }, []);

  const toggleMobileCourse = useCallback(() => {
    setIsCourseOpen((prev) => !prev);
  }, []);

  // ------------------------------------------------------------------
  // CLOSE MEGA MENU ON OUTSIDE CLICK / ESCAPE (Accessibility + UX)
  // ------------------------------------------------------------------
  useEffect(() => {
    function handleOutsideClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsCourseOpen(false);
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") {
        setIsCourseOpen(false);
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    // Cleanup - memory leak rokne ke liye event listeners hata dete hai.
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    // Ye Navbar ka main container hai.
    // sticky top-0: scroll karte waqt navbar upar fixed/chipka rahega.
    // z-50: baaki content ke upar render hoga.
    <header
      ref={navRef}
      className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={[
          // Glass UI: semi-transparent dark background + backdrop blur se glass effect aata hai.
          "relative mx-auto flex max-w-7xl items-center justify-between gap-3",
          "rounded-2xl border border-white/10 bg-[#0b1437]/70 px-4 py-3",
          "shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-6",
        ].join(" ")}
      >
        {/* ============================== LOGO (LEFT) ============================== */}
        <motion.a
          href="/"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          className="flex shrink-0 items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
          aria-label="Jamia Academy - Home"
        >
          {/* width/height fix kiya hai taki image load hone se pehle CLS (layout shift) na ho */}
          <img src={logo} alt="Jamia Academy Logo" width="40" height="40" className="h-9 w-auto sm:h-10" />
        </motion.a>

        {/* ============================== NAV LINKS (CENTER) - DESKTOP ============================== */}
        {/* hidden lg:flex: Mobile/Tablet par hide, Desktop (lg breakpoint = 1024px+) par show. */}
        <nav aria-label="Primary navigation" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {navLinks.map((item, index) => (
              <NavItem
                key={item.id}
                item={item}
                index={index}
                isActive={activeId === item.id}
                isDropdownOpen={item.hasDropdown && isCourseOpen}
                onClick={handleNavClick}
              />
            ))}
          </ul>

          {/* Mega Menu yaha mount hota hai, "Courses" ke niche float karta hai */}
          <MegaMenu isOpen={isCourseOpen} onCourseClick={handleCourseClick} />
        </nav>

        {/* ============================== RIGHT SIDE ============================== */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* WhatsApp button - sab screens par dikhega */}
          <WhatsAppButton />

          {/* ============================== HAMBURGER (MOBILE/TABLET ONLY) ============================== */}
          {/* lg:hidden: Desktop par hamburger hide rahega, sirf chhoti screens par dikhega. */}
          <motion.button
            type="button"
            onClick={toggleMobileMenu}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 110, damping: 16, delay: 0.45 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-panel"
            className="grid h-10 w-10 place-items-center rounded-full outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-cyan-400 lg:hidden"
          >
            {/* Hamburger <-> Cross transform: dono images yahi hai, crossfade + rotate se transform feel aata hai. */}
            <motion.img
              key={isMobileMenuOpen ? "cross" : "hamburger"}
              src={isMobileMenuOpen ? cross : humburger}
              alt=""
              aria-hidden="true"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              width="22"
              height="22"
              className="h-5 w-5 object-contain"
            />
          </motion.button>
        </div>
      </motion.div>

      {/* ============================== MOBILE SIDEBAR + ITS OWN MEGA MENU ============================== */}
      <div id="mobile-menu-panel">
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
          onCourseToggle={toggleMobileCourse}
          isCourseOpen={isCourseOpen}
        />
        {/* Mobile par Courses accordion khulne par neeche list dikhegi (alag se simple list,
            mega-menu grid mobile par UX ke hisaab se accordion bana di gayi hai). */}
      </div>
    </header>
  );
}

// React.memo se poora Navbar bhi wrap kar sakte the, lekin ye top-level route component hai
// jo App.jsx me ek hi baar render hota hai, isliye memo zaroori nahi - internal children
// (NavItem, MegaMenu, WhatsAppButton) already memoized hai jo actual perf gain dete hai.
export default Navbar;