// loginData.js
// Single source of truth for all Login page copy.
// Koi bhi text JSX me hardcode nahi hoga — sab yahan se aayega.

export const loginData = {
  meta: {
    pageTitle: "Login | Jamia Academy",
  },
  heading: {
    title: "Login",
    subtitle: "Welcome back, apna safar continue karein",
  },
  form: {
    email: {
      label: "Email",
      placeholder: "you@example.com",
      id: "login-email",
      name: "email",
      autoComplete: "email",
    },
    password: {
      label: "Password",
      placeholder: "Enter your password",
      id: "login-password",
      name: "password",
      autoComplete: "current-password",
    },
  },
  button: {
    idleText: "Sign In",
    hoverText: "Let's Go",
    loadingText: "Signing In...",
  },
  errors: {
    emailRequired: "Email is required",
    emailInvalid: "Enter a valid email address",
    passwordRequired: "Password is required",
    passwordMin: "Password must be at least 6 characters",
  },
  a11y: {
    formLabel: "Login form",
    togglePasswordShow: "Show password",
    togglePasswordHide: "Hide password",
    emailIconLabel: "Email icon",
  },
};

export default loginData;
