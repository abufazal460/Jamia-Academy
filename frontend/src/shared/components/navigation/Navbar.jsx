import { usePageTransition } from "../../../app/providers/page-transition";
import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { motion } from "motion/react";
import { useLocation } from "react-router-dom";
import useMediaQuery from "../../hooks/useMediaQuery";

import { gsap } from "gsap";
// LoginButton: navLinks array se alag, WhatsAppButton ki tarah independently rendered.
import LoginButton from "../navigation/LoginButton";

// Ye exact imports hai jo user ne diye hai — inhe bilkul change nahi kiya gaya.
import humburger from "../../../assets/icons/hamburger.webp";
import cross from "../../../assets/icons/cross.svg";
import logo from "../../../assets/icons/logo.png";

import NavItem from "./NavItem";
import MobileMenu from "./MobileMenu";
import WhatsAppButton from "./WhatsAppButton";
import { navLinks } from "../../data/navigation.data";

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
  const isDesktop = useMediaQuery("lg");

  const handleLogoClick = useCallback(
    (e) => {
      e.preventDefault();
      if (isTransitioning) return;
      navigateWithTransition("/");
    },
    [navigateWithTransition, isTransitioning],
  );

  // isMobileMenuOpen: Hamburger sidebar open/close control.
  // isCourseOpen STATE REMOVED — dropdown ab exist hi nahi karta.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // navRef: Iska use ab sirf Escape key close ke liye hai (mega menu outside click logic removed).
  const navRef = useRef(null);

  // ---- GSAP Scroll Animation Refs ----
  // WHY alag wrapper divs: Framer Motion ke motion elements par directly GSAP chalana
  // conflicts create kar sakta hai. Wrapper divs pe GSAP chalao — clean separation.
  const logoWrapRef = useRef(null); // Logo: left slide + fade on hide
  const navLinksRef = useRef(null); // Nav pill: upward + fade on hide
  const loginWrapRef = useRef(null); // Login button: right slide + fade on hide
  const whatsappWrapRef = useRef(null); // WhatsApp button: right slide + fade on hide

  const navHoverRef = useRef(null);
  const navItemRefs = useRef([]);
  const hoverBgRef = useRef(null);
  const hoverIndexRef = useRef(null);
  const hoverTimelineRef = useRef(null);

  // ------------------------------------------------------------------
  // DERIVED
  // ------------------------------------------------------------------
  // useMemo: location.pathname tabhi recalculate ho jab route change ho,
  // har render par nahi. Performance optimization.
  const activeId = useMemo(() => {
    if (location.pathname === "/") return "home";
    const match = navLinks.find(
      (link) => link.route !== "/" && location.pathname.startsWith(link.route),
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

  const lastScrollY = useRef(window.scrollY);
  const navbarVisible = useRef(true);

  useEffect(() => {
    if (!isDesktop) {
      gsap.killTweensOf(navRef.current);

      gsap.set(navRef.current, {
        clearProps: "all",
      });

      return;
    }

    const SCROLL_THRESHOLD = 10;
    const HIDE_AFTER = 80;

    const showNavbar = () => {
      if (navbarVisible.current) return;

      navbarVisible.current = true;

      // Previous animation stop
      gsap.killTweensOf(navRef.current);

      // Sirf straight down
      gsap.to(navRef.current, {
        yPercent: 0,
        duration: 0.45,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const hideNavbar = () => {
      if (!navbarVisible.current) return;

      navbarVisible.current = false;

      // Previous animation stop
      gsap.killTweensOf(navRef.current);

      // Sirf straight up
      gsap.to(navRef.current, {
        yPercent: -100,
        duration: 0.55,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const previousScrollY = lastScrollY.current;

      // Top par navbar hamesha visible
      if (currentScrollY <= 20) {
        showNavbar();
        lastScrollY.current = currentScrollY;
        return;
      }

      const scrollDifference = currentScrollY - previousScrollY;

      // Chhoti movement ignore
      if (Math.abs(scrollDifference) < SCROLL_THRESHOLD) {
        return;
      }

      // Scroll DOWN
      if (scrollDifference > 0) {
        if (currentScrollY > HIDE_AFTER) {
          hideNavbar();
        }
      }

      // Scroll UP
      else {
        showNavbar();
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      gsap.killTweensOf(navRef.current);
    };
  }, [isDesktop]);

  const handleNavHover = useCallback((targetIndex) => {
    const items = navItemRefs.current;
    const background = hoverBgRef.current;

    if (!background || !items[targetIndex]) return;

    const startIndex = hoverIndexRef.current ?? targetIndex;

    if (hoverTimelineRef.current) {
      hoverTimelineRef.current.kill();
    }

    const direction = targetIndex >= startIndex ? 1 : -1;

    const timeline = gsap.timeline();

    hoverTimelineRef.current = timeline;

    gsap.set(background, {
      opacity: 1,
    });

    for (
      let index = startIndex;
      direction === 1 ? index <= targetIndex : index >= targetIndex;
      index += direction
    ) {
      const item = items[index];

      if (!item) continue;

      timeline.to(
        background,
        {
          x: item.offsetLeft,
          width: item.offsetWidth,
          duration: index === startIndex ? 0.22 : 0.32,
          delay: index === startIndex ? 0.05 : 0,
          ease: "power3.out",
          overwrite: true,

        },
        index === startIndex ? 0 : ">+=0.04");
    }

    hoverIndexRef.current = targetIndex;
  }, []);

  const handleNavLeave = useCallback(() => {
    const background = hoverBgRef.current;

    if (!background) return;

    if (hoverTimelineRef.current) {
      hoverTimelineRef.current.kill();
    }

    gsap.to(background, {
      opacity: 0,
      duration: 0.18,
      delay: 0.08,
      ease: "power2.out",
      overwrite: true,
    });

    hoverIndexRef.current = null;
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
    <header ref={navRef} className="fixed top-0 z-50 w-full">
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
          "h-16 px-4 sm:px-4 lg:px-8 md:h-[68px]",
        ].join(" ")}
      >
        {/* ======================== LOGO (LEFT) ======================== */}
        <div ref={logoWrapRef}>
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
              width="50"
              height="50"
              className="h-12 w-auto sm:h-14"
            />
          </motion.a>
        </div>
        {/* ======================== NAV LINKS (CENTER) — DESKTOP ONLY ======================== */}
        {/* hidden lg:flex: Mobile/Tablet par chhupa do, Desktop (lg = 1024px+) par dikhao. */}
        <nav
          ref={navLinksRef}
          aria-label="Primary navigation"
          className="hidden lg:flex"
        >
          {/* ----------------------------------------------------------------
              Ye pill container Sheryians-inspired design hai.
              bg-white/5: Very subtle dark glass — links ke liye ek group container feel deta hai.
              rounded-full: Pill/capsule shape, modern look.
              p-1: Thoda andar padding taaki active pill ke corners tight na lage.
              border border-white/8: Barely visible border for depth.
          ---------------------------------------------------------------- */}
          <ul
            ref={navHoverRef}
            onMouseLeave={handleNavLeave}

            className="relative flex items-center gap-0.5 rounded-full border border-white/20 bg-white/10 p-1">
            <div
              ref={hoverBgRef}
              className="pointer-events-none absolute left-0 top-1 bottom-1 z-0 rounded-full bg-white backdrop-blur-sm opacity-0" style={{ width: 0 }}
            />

            {navLinks.map((item, index) => (
              <NavItem
                key={item.id}
                item={item}
                index={index}
                isActive={activeId === item.id}
                onHover={handleNavHover}
                onLeave={handleNavLeave}
                itemRef={(el) => {
                  navItemRefs.current[index] = el;
                }}
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
          <div ref={loginWrapRef} className="flex items-center">
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
            transition={{
              type: "spring",
              stiffness: 110,
              damping: 16,
              delay: 0.4,
            }}
            whileTap={{ scale: 0.9 }}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-panel"
            // outline-none: NO ring anywhere — as per requirement.
            // hover:bg-white/10: Subtle hover background feedback.
            className="grid h-10 w-10 place-items-center rounded-full outline-none transition-colors hover:bg-white/10 lg:hidden"
          >
            <div className="absolute right-3  px-6 py-4 rounded-2xl bg-white"></div>
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
              className="relative  h-5 w-5 object-contain"
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
