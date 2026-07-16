// File: formatHelpers.js
// Purpose: Number aur date formatting helpers
// Responsibility: Stats counters aur timeline years ko consistent format me dikhana
// Future Usage: StatsSection (react-countup ke saath), TimelineSection
// Dependencies: Koi nahi

/**
 * formatNumber
 * Ye function kya karta hai: number ko locale-aware comma formatting deta hai (e.g. 5200 → "5,200")
 * Kyu banaya gaya: bade stats numbers ko readable banane ke liye
 * Kab call hoga: AnimatedCounter ke display value me
 * Kya return karega: string
 */
export const formatNumber = (value = 0) =>
  new Intl.NumberFormat("en-IN").format(value);

/**
 * formatYear
 * Ye function kya karta hai: timeline year value ko safe string me convert karta hai
 * Kyu banaya gaya: data me kabhi number kabhi string aa sakta hai, isse normalize karna hai
 * Kab call hoga: TimelineSection render ke waqt
 * Kya return karega: string
 */
export const formatYear = (year) => String(year ?? "");

/**
 * formatStatSuffix
 * Ye function kya karta hai: stat value ke aage "+" jaisa suffix add karta hai agar needed ho
 * Kyu banaya gaya: "5000+" style stats display ke liye
 * Kab call hoga: StatsSection me
 * Kya return karega: string
 */
export const formatStatSuffix = (value, suffix = "+") => `${formatNumber(value)}${suffix}`;

export default { formatNumber, formatYear, formatStatSuffix };
