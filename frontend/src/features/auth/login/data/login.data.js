export const loginData = {
  meta: {
    pageTitle: "Login | Jamia Academy",
    description: "Login to your Jamia Academy account to continue your learning journey.",
  },
  heading: {
    title: "Login",
    subtitle: "Welcome back, apna safar continue karein",
  },
  form: {
    email: {
      label: "Email",
      placeholder: "",
      id: "login-email",
      name: "email",
      autoComplete: "email",
    },
    password: {
      label: "Password",
      placeholder: "",
      id: "login-password",
      name: "password",
      autoComplete: "current-password",
    },
  },
  button: {
    idleText: "Sign In",
    hoverText: "Sign In",
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
