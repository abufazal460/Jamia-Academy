// File: routes.js
// Purpose: App ke saare route paths ka single source of truth
// Responsibility: Navigation links, breadcrumbs, internal anchors sab isi se aayenge
// Future Usage: Header/Footer nav, SEO breadcrumb schema, CTA links
// Dependencies: Koi nahi

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  ACADEMICS: "/academics",
  ADMISSIONS: "/admissions",
  FACULTY: "/faculty",
  CONTACT: "/contact",
};

// About page ke andar ke section anchors — smooth scroll navigation ke liye
export const ABOUT_SECTIONS = {
  HERO: "hero",
  DESCRIPTION: "about-description",
  FOUNDER: "founder",
  CO_FOUNDER: "co-founder",
  VISION_MISSION: "vision-mission",
  VALUES: "values",
  STATS: "stats",
  FACULTY: "faculty",
  WHY_CHOOSE_US: "why-choose-us",
  TIMELINE: "timeline",
};

export default ROUTES;
