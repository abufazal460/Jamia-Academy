/**
 * features.data.js
 * ---------------------------------------------------------------------------
 * YEH FILE KYU HAI (Why this file exists)
 * "Feature Cards" section (Competitive salary / Go beyond design skills /
 * Master the new technologies) ka data yaha se aata hai. FeatureSection.jsx
 * sirf is array ko map karta hai — koi bhi card JSX mein hardcoded nahi hai.
 *
 * ICONS
 * Requirement tha "Do NOT use image icons. Use React Icons." — humne
 * `react-icons/hi2` (Heroicons v2 outline set) use kiya hai kyunki iska
 * style modern/premium look ke sath match karta hai. Icon yaha "component
 * reference" (function) ke roop mein store hota hai, JSX element ke roop
 * mein NAHI (<Icon /> yaha mat likhna) — component isko khud render karega
 * taaki size/color props us waqt control kiye ja sakein.
 *
 * HOW TO ADD A NEW FEATURE CARD (kal ko 10/20/50 cards add karne ho to)
 * 1. react-icons se jo icon chahiye use import karo (upar import list mein).
 * 2. `featuresData` array mein naya object push karo:
 *      { id: 4, title: "...", description: "...", icon: IconComponent }
 * 3. Bas — grid aur animation system automatically naya card handle
 *    kar lega, layout break nahi hoga.
 * ---------------------------------------------------------------------------
 */

import {
  HiOutlineBanknotes,
  HiOutlineShieldCheck,
  HiOutlineCpuChip,
} from "react-icons/hi2";

/**
 * @typedef {Object} FeatureItem
 * @property {number} id            - unique identifier (React key ke liye)
 * @property {string} title         - card ka heading
 * @property {string} description   - card ka body text
 * @property {React.ComponentType} icon - react-icons component reference (call NAHI kiya)
 */

/** @type {FeatureItem[]} */
export const featuresData = [
  {
    id: 1,
    title: "Competitive salary",
    description:
      "Attractive pay scale with excellent growth opportunities.",
    icon: HiOutlineBanknotes,
  },
  {
    id: 2,
    title: "Go beyond design skills",
    description:
      "Creativity, attention to detail, teamwork, desire to overcome challenges.",
    icon: HiOutlineShieldCheck,
  },
  {
    id: 3,
    title: "Master the new technologies",
    description:
      "You will get trained to work on new emerging animation tools and software.",
    icon: HiOutlineCpuChip,
  },
];