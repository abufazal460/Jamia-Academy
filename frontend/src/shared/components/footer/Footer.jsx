import { useRef } from "react";
import { motion } from "motion/react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { usePageTransition } from "../../../app/providers/page-transition";

import logo from "../../../assets/icons/logo.png";
import msme from "../../../assets/icons/msme.png";
import neilit from "../../../assets/icons/nielit.jpeg";
import nitiAyog from "../../../assets/icons/niti-aayog.jpeg";
import skillIndia from "../../../assets/icons/skill-india.png";
import ip from "../../../assets/icons/ip.png";
import iso from "../../../assets/icons/iso.jpeg";
import iaf from "../../../assets/icons/iaf.png";
import mole from "../../../assets/icons/mole.png";

const SOCIAL_LINKS = [
  {
    id: "facebook",
    icon: FaFacebookF,
    url: "https://www.facebook.com/JamiaAcademyDelhi?rdid=3MCDv6OSxWYtSox5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1JSKQKefbV%2F#",
    label: "Facebook",
  },
  {
    id: "instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/jamiaacademy?igsh=MTlza3JjbWs3eWQwNw%3D%3D",
    label: "Instagram",
  },
  {
    id: "youtube",
    icon: FaYoutube,
    url: "https://www.youtube.com/@JamiaAcademy",
    label: "YouTube",
  },
  {
    id: "twitter",
    icon: FaTwitter,
    url: "https://x.com/AcademyJamia",
    label: "Twitter",
  },
];

const QUICK_LINKS = [
  { title: "Home", path: "/" },
  { title: "Courses", path: "/course" },
  { title: "Gallery", path: "/gallery" },
  { title: "Contact", path: "/contact" },
  { title: "About Us", path: "/about" },
];

const PHONE_NUMBERS = ["+91 9621555551", "+91 1147586007"];

const EMAIL_ADDRESSES = ["jamiaacademycs@gmail.com", "info@jamiaacademy.in"];

const GOVERNMENT_LOGOS = [
  { id: "msme", name: "MSME", img: msme, url: "https://msme.gov.in" },
  { id: "mole", name: "MoLE", img: mole, url: "https://labour.gov.in" },
  { id: "iso", name: "ISO", img: iso, url: "https://www.iso.org/home.html" },
  { id: "iaf", name: "IAF", img: iaf, url: "https://iaf.nu/en/home/" },
  {
    id: "skillindia",
    name: "Skill India",
    img: skillIndia,
    url: "https://www.skillindia.gov.in",
  },
  { id: "niti", name: "Niti Aayog", img: nitiAyog, url: "https://www.niti.gov.in" },
  {
    id: "nielit",
    name: "NIELIT",
    img: neilit,
    url: "https://www.nielit.gov.in",
  },
];

const footerContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.25,
    },
  },
};

const sectionVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const listVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.5 },
  },
};

const listItemVariant = {
  hidden: { opacity: 0, x: 200 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const iconRowVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const iconItemVariant = {
  hidden: { opacity: 0, scale: 0.5, y: 80 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const govLogoRowVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25, delayChildren: 0.2 },
  },
};

const govLogoItemVariant = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const copyrightVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
  },
};

/* ============================================================
   FOOTER COMPONENT
============================================================ */
const Footer = () => {
  const footerRef = useRef(null);

  const { navigateWithTransition, isTransitioning } = usePageTransition();

  const handleInternalNav = (e, path) => {
    e.preventDefault();
    if (isTransitioning) return;
    navigateWithTransition(path);
  };
  return (
    <motion.footer
      ref={footerRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={footerContainerVariant}
      className="relative bg-footer-bg pt-16 pb-8 px-5 sm:px-8 md:px-12 lg:px-16 overflow-hidden"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
        <motion.div variants={sectionVariant} className="flex flex-col gap-5">
          <div className="bg-white rounded-xl w-fit">
            <img
              src={logo}
              alt="Jamia Academy Logo"
              className="h-12 sm:h-18 w-auto rounded-lg object-contain"
            />
          </div>

          <p className="text-sm sm:text-[15px] leading-relaxed text-footer-text hover:text-footer-link-hover max-w-xs">
            Empowering students with cutting-edge technology education. Building
            skills, innovation, and future-ready professionals.
          </p>

          <motion.div
            variants={iconRowVariant}
            className="flex items-center gap-4 mt-1"
          >
            {SOCIAL_LINKS.map(({ id, icon: Icon, url, label }) => (
              <motion.a
                key={id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                variants={iconItemVariant}
                whileHover={{ y: -4, scale: 1.15, rotate: 4 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-9 h-9 flex items-center justify-center rounded-full
                           text-footer-text hover:text-footer-link-hover
                           hover:bg-white/10 transition-colors duration-300
                           focus:outline-none"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* ---------- SECTION 2: Quick Links ---------- */}
        <motion.div variants={sectionVariant}>
          <h3 className="text-footer-text hover:text-footer-link-hover font-semibold text-lg mb-5">Quick Links</h3>
          <motion.ul
            variants={listVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            className="flex flex-col gap-3"
          >
            {QUICK_LINKS.map((link) => (
              <motion.li key={link.title} variants={listItemVariant}>
                <a
                  href={link.path}
                  onClick={(e) => handleInternalNav(e, link.path)}
                  className="relative text-sm sm:text-[15px] text-footer-text hover:text-footer-link-hover transition-colors duration-300
                             group inline-block w-fit
                             focus:outline-none rounded"
                >
                  {link.title}

                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ---------- SECTION 4: Contact Info ---------- */}
        <motion.div variants={sectionVariant}>
          <h3 className="font-semibold text-lg mb-5 text-footer-text hover:text-footer-link-hover">
            Contact Info
          </h3>

          <motion.ul
            variants={listVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            className="flex flex-col gap-4 text-sm sm:text-[15px] text-slate-400"
          >
            <motion.li variants={listItemVariant} className="flex gap-3">
              <FiMapPin className="text-green-600 mt-0.5 shrink-0" size={18} />
              <a
                href="https://maps.google.com/?q=A-29, 1st Floor, Above J&K Bank, Batla House Chowk, Jamia Nagar, Okhla, Delhi 110025"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-footer-text transition-colors duration-300 leading-relaxed
                           focus:outline-none rounded"
              >
                A-29, 1st Floor, Above J&K Bank, Batla House Chowk, Jamia Nagar,
                Okhla, Delhi 110025
              </a>
            </motion.li>

            <motion.li variants={listItemVariant} className="flex gap-3">
              <FiPhone className="text-green-600 mt-0.5 shrink-0" size={18} />
              <div className="flex flex-col gap-1">
                {PHONE_NUMBERS.map((num) => (
                  <a
                    key={num}
                    href={`tel:${num.replace(/\s/g, "")}`}
                    className="hover:text-footer-text transition-colors duration-300 focus:outline-none  rounded w-fit"
                  >
                    {num}
                  </a>
                ))}
              </div>
            </motion.li>

            <motion.li variants={listItemVariant} className="flex gap-3">
              <FiMail className="text-green-600 mt-0.5 shrink-0" size={18} />
              <div className="flex flex-col gap-1 break-all">
                {EMAIL_ADDRESSES.map((mail) => (
                  <a
                    key={mail}
                    href={`mailto:${mail}`}
                    className="hover:text-footer-text transition-colors duration-300 focus:outline-none rounded w-fit"
                  >
                    {mail}
                  </a>
                ))}
              </div>
            </motion.li>
          </motion.ul>
        </motion.div>
      </div>

      <motion.div
        variants={sectionVariant}
        className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-10"
      >
        {/* ---------- POWERED BY SECTION ---------- */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <h3 className="text-footer-text font-bold text-2xl sm:text-3xl">
              Accreditations By
            </h3>
            <span className="block w-12 h-[3px] bg-green-600 rounded-full mt-2" />
          </div>

          <motion.div
            variants={govLogoRowVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            className="flex flex-wrap items-start justify-center lg:justify-end gap-6 sm:gap-8"
          >
            {GOVERNMENT_LOGOS.map((gov) => (
              <motion.a
                key={gov.id}
                href={gov.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={govLogoItemVariant}
                whileHover={{ y: -6, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="flex flex-col items-center gap-2 group focus:outline-none rounded-xl"
              >
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl flex items-center justify-center p-2.5 transition-shadow duration-300"
                >
                  <img
                    src={gov.img}
                    alt={`${gov.name} logo`}
                    className="max-w-full max-h-full object-contain rounded-md"
                  />
                </div>
                <span className="text-xs sm:text-sm text-slate-300 font-medium">
                  {gov.name}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* ============================================================
            BOTTOM COPYRIGHT STRIP
        ============================================================ */}
        <motion.div
          variants={copyrightVariant}
          className="border-t border-white/10 mt-10 pt-6 text-center"
        >
          <p className="text-xs sm:text-sm text-slate-500">
            © {new Date().getFullYear()} Jamia Academy. All rights reserved.
            Official Website of Jamia Academy
          </p>
          <p className="text-[11px] sm:text-xs text-slate-600 mt-1">
            Designed & Developed by Jamia Academy Student &nbsp;

            <a
              target="_blank"
              href="https://abufazal.netlify.app/"
              className="text-blue-500 hover:underline transition-all"
            >
              Abu Fazal
            </a>{" "}

          </p>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
