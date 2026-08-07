// certificateData.js
// Saara static content aur form field config yaha se aata hai — JSX ke andar
// kabhi bhi hardcoded string nahi honi chahiye. Icons bhi yahi se reference
// hote hain taaki FormFields sirf ek array map kare, koi business logic na ho.

import {
  FiUser,
  FiUsers,
  FiHeart,
  FiMail,
} from "react-icons/fi";
import { FaGraduationCap, FaCertificate } from "react-icons/fa";

export const PAGE_CONTENT = {
  title: "Certificate Verification",
  subtitle:
    "Confirm the authenticity of a Jamia Academy certificate by entering the details exactly as they appear on the original document.",
  eyebrow: "Authenticity Check",
};

export const BUTTON_TEXT = {
  idle: "Check Certificate",
  hover: "Verify Now",
  loading: "Verifying…",
};

export const STATUS_MESSAGES = {
  successTitle: "Request submitted",
  successBody:
    "Your details have been received. Verification will be available once the certificate database is connected.",
  errorTitle: "Something went wrong",
  errorBody: "We couldn't process that request. Please try again.",
};

export const VALIDATION_MESSAGES = {
  fullName: {
    required: "Full name is required",
    invalid: "Enter a valid full name",
  },
  fatherName: {
    required: "Father's name is required",
    invalid: "Enter a valid name",
  },
  motherName: {
    required: "Mother's name is required",
    invalid: "Enter a valid name",
  },
  email: {
    required: "Email ID is required",
    invalid: "Enter a valid email address",
  },
  courseName: {
    required: "Course name is required",
    invalid: "Enter a valid course name",
  },
  certificateId: {
    required: "Certificate ID is required",
    invalid: "Only letters, numbers and hyphens are allowed",
  },
};

// direction: label entry animation direction — FormFields isi key se
// AnimatedInput ko batata hai ki label kis taraf se andar aayegi
export const CERTIFICATE_FIELDS = [
  {
    id: "fullName",
    name: "fullName",
    label: "Full Name",
    type: "text",
    autoComplete: "name",
    icon: FiUser,
    direction: "top",
    required: true,
  },
  {
    id: "fatherName",
    name: "fatherName",
    label: "Father Name",
    type: "text",
    autoComplete: "off",
    icon: FiUsers,
    direction: "left",
    required: true,
  },
  {
    id: "motherName",
    name: "motherName",
    label: "Mother Name",
    type: "text",
    autoComplete: "off",
    icon: FiHeart,
    direction: "right",
    required: true,
  },
  {
    id: "email",
    name: "email",
    label: "Email ID",
    type: "email",
    autoComplete: "email",
    icon: FiMail,
    direction: "top",
    required: true,
  },
  {
    id: "courseName",
    name: "courseName",
    label: "Course Name",
    type: "text",
    autoComplete: "off",
    icon: FaGraduationCap,
    direction: "bottom",
    required: true,
  },
  {
    id: "certificateId",
    name: "certificateId",
    label: "Certificate ID",
    type: "text",
    autoComplete: "off",
    icon: FaCertificate,
    direction: "fade",
    required: true,
  },
];

export const INITIAL_FORM_STATE = CERTIFICATE_FIELDS.reduce((acc, field) => {
  acc[field.name] = "";
  return acc;
}, {});
