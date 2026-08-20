// File: scrollHelpers.js
// Purpose: Scroll position, direction detection aur smooth-scroll-to-anchor logic
// Responsibility: Scroll-related math ko components ke bahar rakhna
// Future Usage: Nav links, ScrollIndicator component, GSAP direction-aware triggers
// Dependencies: Koi nahi (pure browser API wrapper)

/**
 * scrollToSection
 * Ye function kya karta hai: diye gaye id wale section tak smooth scroll karta hai
 * Kyu banaya gaya: nav links aur CTA buttons ke liye reusable scroll logic
 * Kab call hoga: kisi bhi anchor link click par
 * Kya return karega: kuch nahi (side-effect function)
 *
 * @param {string} sectionId - constants/routes.js ke ABOUT_SECTIONS se aayega
 * @param {number} offset - fixed header ki height jitna offset
 */
export const scrollToSection = (sectionId, offset = 80) => {
  if (typeof document === "undefined") return; // SSR safety

  const el = document.getElementById(sectionId);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: "smooth" });
};

/**
 * getScrollDirection
 * Ye function kya karta hai: ek closure-based tracker return karta hai jo scroll direction batata hai
 * Kyu banaya gaya: kuch UI elements (jaise sticky nav hide/show) ko direction chahiye hota hai
 * Kab call hoga: scroll event listener ke andar
 * Kya return karega: "up" | "down"
 */
export const createScrollDirectionTracker = () => {
  let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

  return () => {
    const currentY = window.scrollY;
    const direction = currentY > lastScrollY ? "down" : "up";
    lastScrollY = currentY;
    return direction;
  };
};

/**
 * getScrollProgress
 * Ye function kya karta hai: page ka overall scroll progress 0 se 1 ke beech return karta hai
 * Kyu banaya gaya: progress bar / reading indicator jaise features ke liye
 * Kab call hoga: scroll event ke andar, throttled tarike se
 * Kya return karega: number (0 to 1)
 */
export const getScrollProgress = () => {
  if (typeof document === "undefined") return 0;

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  return docHeight > 0 ? scrollTop / docHeight : 0;
};

export default { scrollToSection, createScrollDirectionTracker, getScrollProgress };
