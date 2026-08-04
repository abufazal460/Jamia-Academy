// Jamia Academy brand palette — single source of truth
// Blue/Indigo strictly avoided as per brand guideline
export const BRAND_COLORS = {
  primary: "#E63946", // action red — CTAs, highlights
  dark: "#2B2D42", // deep navy-charcoal — text, dark surfaces
  orange: "#F4A261", // warm accent — secondary highlights
  teal: "#2A9D8F", // trust/education accent
  darkTeal: "#264653", // deep surface accent
  cream: "#F7F3E9", // soft background
};

// Regex patterns used by utils/validators.js
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[6-9]\d{9}$/, // Indian 10-digit mobile
  nameMinLength: 2,
  messageMinLength: 10,
};

// Shared field length limits
export const FIELD_LIMITS = {
  name: 60,
  message: 500,
};
