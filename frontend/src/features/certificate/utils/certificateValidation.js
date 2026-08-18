// certificateValidation.js
// Pure functions — koi side effect nahi. Har validator trimmed value leta hai
// aur error string ya empty string return karta hai. Business logic yahi
// centralize hai taaki components sirf UI handle karein.

import { VALIDATION_MESSAGES } from "../../../data/certificateData";

const NAME_PATTERN = /^[A-Za-z][A-Za-z\s.'-]{1,59}$/;
const PHONE_PATTERN = /^[6-9]\d{9}$/;
const COURSE_PATTERN = /^[A-Za-z0-9][A-Za-z0-9\s.,&()'-]{1,79}$/;

const validators = {
  fullName: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return VALIDATION_MESSAGES.fullName.required;
    if (!NAME_PATTERN.test(trimmed)) return VALIDATION_MESSAGES.fullName.invalid;
    return "";
  },
  fatherName: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return VALIDATION_MESSAGES.fatherName.required;
    if (!NAME_PATTERN.test(trimmed)) return VALIDATION_MESSAGES.fatherName.invalid;
    return "";
  },
  phoneNumber: (value) => {
    const trimmed = value.trim();

    if (!trimmed) return VALIDATION_MESSAGES.phoneNumber.required;
    if (!PHONE_PATTERN.test(trimmed)) {
      return VALIDATION_MESSAGES.phoneNumber.invalid;
    }
    return "";
  },
  courseName: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return VALIDATION_MESSAGES.courseName.required;
    if (!COURSE_PATTERN.test(trimmed)) return VALIDATION_MESSAGES.courseName.invalid;
    return "";
  },
};

export function validateCertificateField(name, value) {
  const validator = validators[name];
  return validator ? validator(value ?? "") : "";
}

export function validateCertificateForm(formData) {
  const errors = {};
  Object.keys(formData).forEach((key) => {
    const message = validateCertificateField(key, formData[key]);
    if (message) errors[key] = message;
  });
  return errors;
}

export function isCertificateFormValid(errors) {
  return Object.keys(errors).length === 0;
}

export function sanitizeCertificateFormData(formData) {
  return Object.entries(formData).reduce((acc, [key, value]) => {
    acc[key] = typeof value === "string" ? value.trim() : value;
    return acc;
  }, {});
}
