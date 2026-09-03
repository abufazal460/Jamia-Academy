
export const getImageProps = (src, alt = "", priority = false) => ({
  src,
  alt,
  loading: priority ? "eager" : "lazy",
  decoding: "async",
  fetchPriority: priority ? "high" : "auto",
});

export const getFallbackImage = (section = "team") =>
  `/assets/about/${section}-placeholder.webp`;

export const isPlaceholderImage = (src = "") => src.includes("-placeholder");

export default { getImageProps, getFallbackImage, isPlaceholderImage };
