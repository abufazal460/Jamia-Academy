// File: textHelpers.js
// Purpose: Text ko characters/words me split karna — reveal animations ke liye
// Responsibility: Heading character-reveal aur paragraph word-reveal animation logic centralize karna
// Future Usage: HeroAbout heading, AboutDescription paragraph animation
// Dependencies: Koi nahi

/**
 * splitIntoWords
 * Ye function kya karta hai: ek string ko words ke array me todta hai, spaces preserve karke
 * Kyu banaya gaya: word-by-word reveal animation ke liye har word ko alag span me render karna hai
 * Kab call hoga: paragraph animation components ke andar
 * Kya return karega: Array<string>
 */
export const splitIntoWords = (text = "") =>
  typeof text === "string" ? text.split(" ").filter(Boolean) : [];

/**
 * splitIntoCharacters
 * Ye function kya karta hai: ek string ko individual characters ke array me todta hai
 * Kyu banaya gaya: heading character-reveal animation ke liye
 * Kab call hoga: Hero/Heading components me
 * Kya return karega: Array<string>
 */
export const splitIntoCharacters = (text = "") =>
  typeof text === "string" ? text.split("") : [];

/**
 * truncateText
 * Ye function kya karta hai: text ko max length tak truncate karke "..." add karta hai
 * Kyu banaya gaya: card previews, meta descriptions me overflow rokne ke liye
 * Kab call hoga: FacultyGrid bio preview, SEO meta description
 * Kya return karega: string
 */
export const truncateText = (text = "", maxLength = 120) => {
  if (typeof text !== "string" || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
};

export default { splitIntoWords, splitIntoCharacters, truncateText };
