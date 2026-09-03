export const splitIntoWords = (text = "") =>
  typeof text === "string" ? text.split(" ").filter(Boolean) : [];

export const splitIntoCharacters = (text = "") =>
  typeof text === "string" ? text.split("") : [];

export const truncateText = (text = "", maxLength = 120) => {
  if (typeof text !== "string" || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
};

export default { splitIntoWords, splitIntoCharacters, truncateText };
