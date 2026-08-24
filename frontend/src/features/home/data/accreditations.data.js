

import msme from "../../../assets/icons/msme.png";
import neilit from "../../../assets/icons/nielit.jpeg";
import nitiAyog from "../../../assets/icons/niti-aayog.jpeg";
import skillIndia from "../../../assets/icons/skill-india.png";
import ip from "../../../assets/icons/ip.png";
import iso from "../../../assets/icons/iso.jpeg";
import iaf from "../../../assets/icons/iaf.png";
import mole from "../../../assets/icons/mole.png";

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
 {
  id: 5,
  title: "IP",
  image: ip,
  alt: "IP official logo",
},
{
  id: 6,
  title: "ISO",
  image: iso,
  alt: "ISO official logo",
},
{
  id: 7,
  title: "IAF",
  image: iaf,
  alt: "IAF official logo",
},
{
  id: 8,
  title: "Mole",
  image: mole,
  alt: "Mole official logo",
},
];