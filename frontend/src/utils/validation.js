// validation.js
// Pure validation functions — koi side effect nahi, sirf input le kar
// result return karte hain. UI logic yahan bilkul nahi.

import { loginData } from "../data/loginData";

// Standard email pattern — RFC-perfect nahi hai, lekin practical use ke liye kaafi hai
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Email field validate karta hai.
 * @param {string} value
 * @returns {string} error message, ya empty string agar valid hai
 */
export function validateEmail(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return loginData.errors.emailRequired;
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return loginData.errors.emailInvalid;
  }

  return "";
}

/**
 * Password field validate karta hai.
 * @param {string} value
 * @returns {string} error message, ya empty string agar valid hai
 */
export function validatePassword(value) {
  if (!value) {
    return loginData.errors.passwordRequired;
  }

  if (value.length < 6) {
    return loginData.errors.passwordMin;
  }

  return "";
}

/**
 * Poore login form ko ek saath validate karta hai.
 * @param {{ email: string, password: string }} values
 * @returns {{ email: string, password: string }} errors object
 */
export function validateLoginForm(values) {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  };
}

/**
 * Check karta hai ki errors object me koi error hai ya nahi.
 * @param {{ email: string, password: string }} errors
 * @returns {boolean}
 */
export function hasErrors(errors) {
  return Object.values(errors).some(Boolean);
}
