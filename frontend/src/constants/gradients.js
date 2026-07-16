// File: gradients.js
// Purpose: Reusable gradient definitions — backgrounds, text gradients, border gradients
// Responsibility: GradientBackground, AnimatedButton, GlassCard border jaisi jagah use honge
// Future Usage: Text gradient sweep animation, decorative section backgrounds
// Dependencies: constants/colors.js ke values manually yaha map kiye gaye hain (Tailwind static requirement ki wajah se)

export const gradients = {
  primaryToSecondary: "linear-gradient(135deg, #b8342a 0%, #c2871c 100%)",
  secondaryToAccent: "linear-gradient(135deg, #c2871c 0%, #1f9a6c 100%)",
  heroOverlay: "linear-gradient(180deg, rgba(28,26,22,0) 0%, rgba(28,26,22,0.85) 100%)",
  radialGlow: "radial-gradient(circle at center, rgba(184,52,42,0.15) 0%, rgba(184,52,42,0) 70%)",
  textGradient: "linear-gradient(90deg, #b8342a 0%, #c2871c 50%, #1f9a6c 100%)",
  cardBorderGradient: "linear-gradient(135deg, rgba(184,52,42,0.4), rgba(194,135,28,0.4))",
  glassOverlay: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
};

export default gradients;
