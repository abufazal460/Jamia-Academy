// File: typography.js
// Purpose: Reusable typography scale — font size, weight, line-height, letter-spacing tokens
// Responsibility: Har text role (hero, heading, body, caption etc.) ka fixed style define karna
// Future Usage: SectionHeading, Hero text, paragraphs — sab isi se apna style lenge
// Dependencies: Koi nahi
// Rule: Kahin bhi component ke andar raw font-size hardcode nahi hogi

export const fontFamily = {
  heading: "'Playfair Display', serif", // TODO: Replace with official Jamia Academy brand font if different
  body: "'Inter', sans-serif",
};

export const typography = {
  display: {
    fontSize: "clamp(2.75rem, 6vw, 5rem)",
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: "-0.02em",
    fontFamily: fontFamily.heading,
  },
  hero: {
    fontSize: "clamp(2.25rem, 5vw, 4rem)",
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: "-0.01em",
    fontFamily: fontFamily.heading,
  },
  heading1: {
    fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
    fontWeight: 600,
    lineHeight: 1.2,
    fontFamily: fontFamily.heading,
  },
  heading2: {
    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
    fontWeight: 600,
    lineHeight: 1.25,
    fontFamily: fontFamily.heading,
  },
  heading3: {
    fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
    fontWeight: 600,
    lineHeight: 1.3,
    fontFamily: fontFamily.heading,
  },
  body: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.7,
    fontFamily: fontFamily.body,
  },
  bodyLarge: {
    fontSize: "1.125rem",
    fontWeight: 400,
    lineHeight: 1.7,
    fontFamily: fontFamily.body,
  },
  caption: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.5,
    fontFamily: fontFamily.body,
  },
  label: {
    fontSize: "0.8125rem",
    fontWeight: 600,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    fontFamily: fontFamily.body,
  },
  button: {
    fontSize: "1rem",
    fontWeight: 600,
    letterSpacing: "0.01em",
    fontFamily: fontFamily.body,
  },
};

export default typography;
