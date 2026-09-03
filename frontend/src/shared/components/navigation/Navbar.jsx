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
import LoginButton from "../navigation/LoginButton";

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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navRef = useRef(null);

  const logoWrapRef = useRef(null);
  const navLinksRef = useRef(null);
  const loginWrapRef = useRef(null);
  const whatsappWrapRef = useRef(null);

  const navHoverRef = useRef(null);
  const navItemRefs = useRef([]);
  const hoverBgRef = useRef(null);
  const hoverIndexRef = useRef(null);
  const hoverTimelineRef = useRef(null);

  const activeId = useMemo(() => {
    if (location.pathname === "/") return "home";
    const match = navLinks.find(
      (link) => link.route !== "/" && location.pathname.startsWith(link.route),
    );
    return match?.id ?? "";
  }, [location.pathname]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
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

      gsap.killTweensOf(navRef.current);

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

      gsap.killTweensOf(navRef.current);

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

      if (currentScrollY <= 20) {
        showNavbar();
        lastScrollY.current = currentScrollY;
        return;
      }

      const scrollDifference = currentScrollY - previousScrollY;

      if (Math.abs(scrollDifference) < SCROLL_THRESHOLD) {
        return;
      }

      if (scrollDifference > 0) {
        if (currentScrollY > HIDE_AFTER) {
          hideNavbar();
        }
      }

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
    <header ref={navRef} className="fixed top-0 z-50 w-full">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={[
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
            className="flex shrink-0 items-center gap-2 outline-none"
          >
            <img
              src={logo}
              alt="Jamia Academy Logo"
              width="50"
              height="50"
              className="h-12 w-auto sm:h-14"
            />
          </motion.a>
        </div>
        {/* ======================== NAV LINKS (CENTER) — DESKTOP ONLY ======================== */}
        <nav
          ref={navLinksRef}
          aria-label="Primary navigation"
          className="hidden lg:flex"
        >
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
        </nav>
        {/* ======================== RIGHT SIDE ======================== */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div ref={loginWrapRef} className="flex items-center">
            <LoginButton />
          </div>
          <div ref={whatsappWrapRef} className="hidden lg:flex">
            <WhatsAppButton />
          </div>

          {/* ======================== HAMBURGER BUTTON (MOBILE/TABLET) ======================== */}
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
            className="grid h-10 w-10 place-items-center rounded-full outline-none transition-colors hover:bg-white/10 lg:hidden"
          >
            <div className="absolute right-3  px-6 py-4 rounded-2xl bg-white"></div>
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
        />
      </div>
    </header>
  );
}

export default Navbar;
