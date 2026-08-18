import { VALIDATION_PATTERNS } from "../constants/contactConstants";

// Har validator ek boolean return karta hai — valid ya invalid
export const validators = {
  name: (value) =>
    typeof value === "string" &&
    value.trim().length >= VALIDATION_PATTERNS.nameMinLength,

  email: (value) =>
    typeof value === "string" && VALIDATION_PATTERNS.email.test(value.trim()),

  phone: (value) =>
    typeof value === "string" && VALIDATION_PATTERNS.phone.test(value.trim()),

  message: (value) =>
    typeof value === "string" &&
    value.trim().length >= VALIDATION_PATTERNS.messageMinLength,

  required: (value) => value !== undefined && value !== null && value !== "",
};

// field.validation key se sahi validator function nikaalta hai
export const validateField = (validationKey, value) => {
  const fn = validators[validationKey];
  if (!fn) return true;
  return fn(value);
};
