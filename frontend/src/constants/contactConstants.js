
// Regex patterns used by utils/validators.js
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[6-9]\d{9}$/, // Indian 10-digit mobile
  nameMinLength: 2,
  messageMinLength: 10,
};

