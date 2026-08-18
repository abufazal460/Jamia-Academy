// File: helpers.js
// Purpose: Generic misc helper functions jo kisi specific category (scroll/text/image) me fit nahi hote
// Responsibility: className merging, unique id generation, safe array access
// Future Usage: Har component me — especially conditional Tailwind classes ke liye
// Dependencies: clsx

import clsx from "clsx";

/**
 * cn
 * Ye function kya karta hai: multiple className strings/conditions ko safely merge karta hai
 * Kyu banaya gaya: taaki template-string className mess (`${a} ${b ? c : ""}`) na likhna pade
 * Kab call hoga: har component ke className prop me
 * Kya return karega: ek clean merged className string
 */
export const cn = (...inputs) => clsx(...inputs);

/**
 * generateId
 * Ye function kya karta hai: ek simple unique id string generate karta hai
 * Kyu banaya gaya: list items (timeline, faculty grid) ke liye stable keys chahiye
 * Kab call hoga: dummy data seed karte waqt ya dynamic list rendering me
 * Kya return karega: string, e.g. "id-3f9a2"
 */
export const generateId = (prefix = "id") =>
  `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

/**
 * safeArray
 * Ye function kya karta hai: agar value array nahi hai to empty array return karta hai
 * Kyu banaya gaya: data missing/undefined hone par component crash na ho (defensive coding)
 * Kab call hoga: .map() se pehle kisi bhi data array par
 * Kya return karega: Array
 */
export const safeArray = (value) => (Array.isArray(value) ? value : []);

/**
 * chunkArray
 * Ye function kya karta hai: ek array ko chhote-chhote groups (chunks) me todta hai
 * Kyu banaya gaya: grid layouts (e.g. faculty grid rows) banane ke liye useful
 * Kab call hoga: FacultyGrid jaise components me
 * Kya return karega: Array of Arrays
 */
export const chunkArray = (arr, size) => {
  const safe = safeArray(arr);
  const result = [];
  for (let i = 0; i < safe.length; i += size) {
    result.push(safe.slice(i, i + size));
  }
  return result;
};

export default { cn, generateId, safeArray, chunkArray };
