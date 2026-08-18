// File: spacing.js
// Purpose: Consistent spacing scale — section padding, gaps, margins
// Responsibility: SectionWrapper, SectionContainer aur saare layout components isi se spacing lenge
// Future Usage: Prevents arbitrary Tailwind spacing values scattered across components
// Dependencies: Koi nahi

export const spacing = {
  xs: "0.5rem",   // 8px
  sm: "1rem",     // 16px
  md: "1.5rem",   // 24px
  lg: "2rem",     // 32px
  xl: "3rem",     // 48px
  xxl: "4rem",    // 64px
  xxxl: "6rem",   // 96px
  section: "clamp(4rem, 8vw, 8rem)",       // Har major section ka vertical padding
  sectionGap: "clamp(2rem, 5vw, 4rem)",    // Section ke andar ke blocks ke beech gap
  containerPadding: "clamp(1.25rem, 5vw, 4rem)", // Left/right container padding
};

export const containerMaxWidth = "1440px"; // SectionContainer ka max-width

export default spacing;
