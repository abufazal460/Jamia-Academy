// File: zIndex.js
// Purpose: Layering scale — taaki har jagah random z-index numbers (z-50, z-9999) na use hon
// Responsibility: Consistent stacking order define karna
// Future Usage: Modals, sticky nav, tooltips, decorative background layers
// Dependencies: Koi nahi

export const zIndex = {
  base: 0,
  decorative: 1,      // Background blobs, floating shapes
  content: 10,        // Normal section content
  sticky: 20,          // Sticky nav / scroll indicator
  dropdown: 30,
  overlay: 40,          // Image overlays, gradient overlays
  modal: 50,
  toast: 60,
  tooltip: 70,
};

export default zIndex;
