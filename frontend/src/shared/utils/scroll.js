export const scrollToSection = (sectionId, offset = 80) => {
  if (typeof document === "undefined") return; // SSR safety

  const el = document.getElementById(sectionId);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: "smooth" });
};

export const createScrollDirectionTracker = () => {
  let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

  return () => {
    const currentY = window.scrollY;
    const direction = currentY > lastScrollY ? "down" : "up";
    lastScrollY = currentY;
    return direction;
  };
};

export const getScrollProgress = () => {
  if (typeof document === "undefined") return 0;

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  return docHeight > 0 ? scrollTop / docHeight : 0;
};

export default { scrollToSection, createScrollDirectionTracker, getScrollProgress };
