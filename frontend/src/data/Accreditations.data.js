/**
 * accreditations.data.js
 * ---------------------------------------------------------------------------
 * YEH FILE KYU HAI (Why this file exists)
 * Requirement: "Do NOT hardcode cards. Everything must come from arrays."
 * Yeh file "Our Accreditations" section ke saare logo-cards ka DATA source
 * hai. AccreditationSection.jsx sirf isi array ko `.map()` karta hai —
 * component ke andar kahi bhi koi JSX hardcoded nahi hai.
 *
 * HOW TO ADD A NEW LOGO (kal ko 10/20/50/100 logos add karne ho to)
 * 1. Neeche jaise import kiye hai, waise apni nayi image ko import karo.
 * 2. `accreditationsData` array mein ek naya object push karo:
 *      { id: 5, title: "New Org", image: newOrgLogo, alt: "New Org logo" }
 * 3. Bas! UI automatically render ho jayega, grid apne aap adjust hoga,
 *    koi layout break nahi hoga (CSS grid auto-flow handle karta hai).
 *
 * NOTE ON IMAGE PATHS
 * User ne explicitly kaha hai path change NAHI karna. Yeh imports EXACTLY
 * waise hi hai jaise diye gaye the. Is file ka location assume kiya gaya
 * hai `src/data/` — isliye "../assets/logo/..." sahi resolve hota hai
 * (src/data/.. -> src -> assets/logo). Agar tum is file ko kahi aur move
 * karo, to path adjust karna mat bhoolna.
 * ---------------------------------------------------------------------------
 */

import msme from "../assets/logo/msme.png";
import neilit from "../assets/logo/nielit.jpeg";
import nitiAyog from "../assets/logo/niti-aayog.jpeg";
import skillIndia from "../assets/logo/skill-india.png";

/**
 * @typedef {Object} AccreditationItem
 * @property {number} id       - unique identifier (React key ke liye)
 * @property {string} title    - organization ka naam
 * @property {*}      image    - imported image asset
 * @property {string} alt      - accessibility ke liye descriptive alt text
 */

/** @type {AccreditationItem[]} */
export const accreditationsData = [
  {
    id: 1,
    title: "MSME",
    image: msme,
    alt: "Ministry of Micro, Small and Medium Enterprises (MSME) official logo",
  },
  {
    id: 2,
    title: "Niti Aayog",
    image: nitiAyog,
    alt: "Niti Aayog, National Institution for Transforming India, official logo",
  },
  {
    id: 3,
    title: "NIELIT",
    image: neilit,
    alt: "National Institute of Electronics and Information Technology (NIELIT) official logo",
  },
  {
    id: 4,
    title: "Skill India",
    image: skillIndia,
    alt: "Skill India official logo",
  },
];