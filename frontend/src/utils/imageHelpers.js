// File: imageHelpers.js
// Purpose: Responsive image attributes, lazy-load config, placeholder fallback logic
// Responsibility: Image performance logic ko components se alag rakhna
// Future Usage: AnimatedImage, PlaceholderImage components
// Dependencies: Koi nahi

/**
 * getImageProps
 * Ye function kya karta hai: ek image ke liye standard performance-friendly props object banata hai
 * Kyu banaya gaya: taaki har <img> tag me manually loading="lazy" decoding="async" na likhna pade
 * Kab call hoga: AnimatedImage component ke andar
 * Kya return karega: object jo spread kiya ja sake <img {...props} />
 *
 * @param {string} src - image path
 * @param {string} alt - accessibility ke liye zaroori alt text
 * @param {boolean} priority - true hone par eager load hoga (jaise Hero image)
 */
export const getImageProps = (src, alt = "", priority = false) => ({
  src,
  alt,
  loading: priority ? "eager" : "lazy",
  decoding: "async",
  fetchPriority: priority ? "high" : "auto",
});

/**
 * getFallbackImage
 * Ye function kya karta hai: agar original image missing/broken ho to placeholder path deta hai
 * Kyu banaya gaya: image load error hone par UI break na ho
 * Kab call hoga: <img onError={...}> handler ke andar
 * Kya return karega: string (placeholder image path)
 */
export const getFallbackImage = (section = "team") =>
  `/assets/about/${section}-placeholder.webp`;

/**
 * isPlaceholderImage
 * Ye function kya karta hai: check karta hai ki di gayi image path dummy placeholder hai ya nahi
 * Kyu banaya gaya: dev mode me console warning dikhane ke liye ki content abhi real nahi hai
 * Kab call hoga: component mount ke time, dev-only check
 * Kya return karega: boolean
 */
export const isPlaceholderImage = (src = "") => src.includes("-placeholder");

export default { getImageProps, getFallbackImage, isPlaceholderImage };
