import { loginData } from "../../features/auth/login/data/login.data";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export function validatePassword(value) {
  if (!value) {
    return loginData.errors.passwordRequired;
  }

  if (value.length < 6) {
    return loginData.errors.passwordMin;
  }

  return "";
}

export function validateLoginForm(values) {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  };
}

export function hasErrors(errors) {
  return Object.values(errors).some(Boolean);
}

import { VALIDATION_PATTERNS } from "../constants/contactConstants";

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

export const validateField = (validationKey, value) => {
  const fn = validators[validationKey];
  if (!fn) return true;
  return fn(value);
};

