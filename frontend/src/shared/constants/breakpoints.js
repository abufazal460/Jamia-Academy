export const breakpoints = {
  xs: 320,   // Chhoti mobile screens
  xs2: 360,
  xs3: 375,  // iPhone SE / standard mobile
  xs4: 390,
  xs5: 412,  // Android standard
  sm: 480,   // Large mobile
  md: 640,   // Small tablet / large mobile landscape
  tablet: 768,   // iPad portrait
  tabletLg: 820, // iPad Air
  lg: 1024,  // iPad landscape / small laptop
  xl: 1280,  // Laptop
  xxl: 1440, // Standard desktop
  xxxl: 1536,
  wide: 1728,
  full: 1920,  // Full HD
  qhd: 2560,   // 2K
  uhd: 3840,   // 4K
};

export const mediaQuery = (key) => `(min-width: ${breakpoints[key]}px)`;

export default breakpoints;
