import { useRef } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { usePageTransition } from "../pageTransition";

import logo from "../../assets/logo/jamia-academy-Logo.png";
import msme from "../../assets/logo/msme.png";
import mole from "../../assets/logo/mole.jpeg";
import skillIndia from "../../assets/logo/skill-india.png";
import niti from "../../assets/logo/niti-aayog.jpeg";
import nielit from "../../assets/logo/nielit.jpeg";

/* ============================================================
   DATA — Sab links/arrays ek jagah rakhe hain (constants).
   Isse component clean rehta hai aur baad mein replace karna
   easy ho jaata hai — bas yahan values change karo, JSX touch
   karne ki zarurat nahi padti.
============================================================ */

// Social media icons + dummy links — replace later with real URLs
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

// Quick Links section — title + path pair
const QUICK_LINKS = [
  { title: "Home", path: "/" },
  { title: "Courses", path: "/course" },
  { title: "Gallery", path: "/gallery" },
  { title: "Contact", path: "/contact" },
  { title: "About Us", path: "/about" },
];

// Popular Courses section — title + dummy course url
const POPULAR_COURSES = [
  { title: "Diploma in Data Analytics", url: "/course" },
  { title: "Full Stack Web Development", url: "/course" },
  { title: "Artificial Intelligence & ML", url: "/course" },
  { title: "Graphic Design with AI", url: "/course" },
  { title: "Tally Prime with GST", url: "/course" },
];

// Phone numbers — multiple numbers supported via array
const PHONE_NUMBERS = ["+91 9621555551", "+91 1147586007"];

// Email addresses — multiple emails supported via array
const EMAIL_ADDRESSES = ["jamiaacademycs@gmail.com", "info@jamiaacademy.in"];

// Government / partner logos shown in "Powered By" strip
const GOVERNMENT_LOGOS = [
  { id: "msme", name: "MSME", img: msme, url: "https://msme.gov.in" },
  { id: "mole", name: "MoLE", img: mole, url: "https://labour.gov.in" },
  {
    id: "skillindia",
    name: "Skill India",
    img: skillIndia,
    url: "https://www.skillindia.gov.in",
  },
  { id: "niti", name: "Niti Aayog", img: niti, url: "https://www.niti.gov.in" },
  {
    id: "nielit",
    name: "NIELIT",
    img: nielit,
    url: "https://www.nielit.gov.in",
  },
];

/* ============================================================
   FRAMER MOTION VARIANTS — Reusable animation configs.
   "Container" variants control staggerChildren (bachche ek ek
   karke aate hain), "item" variants control har individual
   element ka fade/slide/scale.
============================================================ */

// Pura footer — jab viewport mein aaye tab fade-up se reveal ho
const footerContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.25, // har section thoda delay ke baad aayega
    },
  },
};

// Har section (logo block, quick links, courses, contact) — fade + slide up
const sectionVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// List wrapper (ul) — apne andar ke <li> items ko stagger karega
const listVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.5 },
  },
};

// Har text/list item — left se slide karke opacity 0 -> 1
const listItemVariant = {
  hidden: { opacity: 0, x: 200 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Social icons row — scale + lift entrance, stagger ek ek icon
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

// Government logos — slide-from-top, ek ek karke
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

// Bottom copyright strip — simple fade up, sabse last mein aata hai
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
  // useRef sirf documentation/clarity ke liye — agar future me
  // scroll-linked effects chahiye ho to yahan se hook kar sakte ho
  const footerRef = useRef(null);

  const { navigateWithTransition, isTransitioning } = usePageTransition();

  const handleInternalNav = (e, path) => {
    e.preventDefault();
    if (isTransitioning) return;
    navigateWithTransition(path);
  };
  return (
    // <footer> semantic tag — accessibility ke liye zaroori hai,
    // screen readers ise "footer landmark" ki tarah identify karte hain
    <motion.footer
      ref={footerRef}
      // whileInView -> jab footer scroll karke screen pe aaye tab animate ho
      // viewport.once true -> animation sirf ek baar chale, baar baar repeat na ho
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={footerContainerVariant}
      className="relative bg-[#0a0f1f] text-slate-300 pt-16 pb-8 px-5 sm:px-8 md:px-12 lg:px-16 overflow-hidden"
      aria-label="Site footer"
    >
      {/* ============================================================
          TOP GRID — 4 columns on large screens, stacks on mobile.
          grid-cols-1 (mobile) -> sm:grid-cols-2 (tablet) ->
          lg:grid-cols-4 (desktop) — isse content kabhi overflow
          nahi hota aur har screen size pe naturally stack hota hai.
      ============================================================ */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        {/* ---------- SECTION 1: Logo + Description + Socials ---------- */}
        <motion.div variants={sectionVariant} className="flex flex-col gap-5">
          {/* Logo image — white rounded card jaisa look reference mein hai */}
          <div className="bg-white rounded-xl px-4 py-2 w-fit">
            <img
              src={logo}
              alt="Jamia Academy Logo"
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </div>

          <p className="text-sm sm:text-[15px] leading-relaxed text-slate-400 max-w-xs">
            Empowering students with cutting-edge technology education. Building
            skills, innovation, and future-ready professionals.
          </p>

          {/* Social icons — stagger animation, hover lift+scale+color */}
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
                // whileHover -> mouse aane par upar uthe + thoda scale ho + slight rotate
                whileHover={{ y: -4, scale: 1.15, rotate: 4 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-9 h-9 flex items-center justify-center rounded-full
                           text-slate-300 hover:text-cyan-400
                           hover:bg-white/5 transition-colors duration-300
                           focus:outline-none"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* ---------- SECTION 2: Quick Links ---------- */}
        <motion.div variants={sectionVariant}>
          <h3 className="text-white font-semibold text-lg mb-5">Quick Links</h3>
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
                  className="relative text-sm sm:text-[15px] text-slate-400
                             hover:text-cyan-400 transition-colors duration-300
                             group inline-block w-fit
                             focus:outline-none rounded"
                >
                  {link.title}
                  {/* underline jo hover pe left se right grow hota hai */}
                  <span
                    className="absolute left-0 -bottom-0.5 h-[1px] w-0 bg-cyan-400
                               transition-all duration-300 group-hover:w-full"
                  />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ---------- SECTION 3: Popular Courses ---------- */}
        <motion.div variants={sectionVariant}>
          <h3 className="text-white font-semibold text-lg mb-5">
            Popular Courses
          </h3>
          <motion.ul
            variants={listVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            className="flex flex-col gap-3"
          >
            {POPULAR_COURSES.map((course) => (
              <motion.li key={course.title} variants={listItemVariant}>
                <a
                  href={course.url}
                  onClick={(e) => handleInternalNav(e, course.url)}
                  className="relative text-sm sm:text-[15px] text-slate-400
                             hover:text-cyan-400 transition-colors duration-300
                             group inline-block w-fit
                             focus:outline-none rounded"
                >
                  {course.title}
                  <span
                    className="absolute left-0 -bottom-0.5 h-[1px] w-0 bg-cyan-400
                               transition-all duration-300 group-hover:w-full"
                  />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ---------- SECTION 4: Contact Info ---------- */}
        <motion.div variants={sectionVariant}>
          <h3 className="text-white font-semibold text-lg mb-5">
            Contact Info
          </h3>

          <motion.ul
            variants={listVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            className="flex flex-col gap-4 text-sm sm:text-[15px] text-slate-400"
          >
            {/* Location — clickable, Google Maps khulta hai naye tab mein */}
            <motion.li variants={listItemVariant} className="flex gap-3">
              <FiMapPin className="text-cyan-400 mt-0.5 shrink-0" size={18} />
              <a
                href="https://maps.google.com/?q=A-29, 1st Floor, Above J&K Bank, Batla House Chowk, Jamia Nagar, Okhla, Delhi 110025"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors duration-300 leading-relaxed
                           focus:outline-none rounded"
              >
                A-29, 1st Floor, Above J&K Bank, Batla House Chowk, Jamia Nagar,
                Okhla, Delhi 110025
              </a>
            </motion.li>

            {/* Phone numbers — tel: link, multiple numbers via array+map */}
            <motion.li variants={listItemVariant} className="flex gap-3">
              <FiPhone className="text-cyan-400 mt-0.5 shrink-0" size={18} />
              <div className="flex flex-col gap-1">
                {PHONE_NUMBERS.map((num) => (
                  <a
                    key={num}
                    href={`tel:${num.replace(/\s/g, "")}`}
                    className="hover:text-cyan-400 transition-colors duration-300
                               focus:outline-none  rounded w-fit"
                  >
                    {num}
                  </a>
                ))}
              </div>
            </motion.li>

            {/* Emails — mailto: link, multiple emails via array+map */}
            <motion.li variants={listItemVariant} className="flex gap-3">
              <FiMail className="text-cyan-400 mt-0.5 shrink-0" size={18} />
              <div className="flex flex-col gap-1 break-all">
                {EMAIL_ADDRESSES.map((mail) => (
                  <a
                    key={mail}
                    href={`mailto:${mail}`}
                    className="hover:text-cyan-400 transition-colors duration-300
                               focus:outline-none rounded w-fit"
                  >
                    {mail}
                  </a>
                ))}
              </div>
            </motion.li>
          </motion.ul>
        </motion.div>
      </div>

      {/* ============================================================
          DIVIDER — top grid aur "Powered By" section ko separate
          karne wali thin line
      ============================================================ */}
      <motion.div
        variants={sectionVariant}
        className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-10"
      >
        {/* ---------- POWERED BY SECTION ---------- */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Heading + underline accent */}
          <div>
            <h3 className="text-white font-bold text-2xl sm:text-3xl">
              Powered By
            </h3>
            <span className="block w-12 h-[3px] bg-cyan-400 rounded-full mt-2" />
          </div>

          {/* Government logos grid — wraps naturally on small screens
              so logos never overflow horizontally */}
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
                // hover: card upar uthe + thoda scale + shadow smooth ho
                whileHover={{ y: -6, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="flex flex-col items-center gap-2 group
                           focus:outline-none rounded-xl"
              >
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl
                             flex items-center justify-center p-2.5
                             shadow-md shadow-black/30
                             group-hover:shadow-xl group-hover:shadow-cyan-400/20
                             transition-shadow duration-300"
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
            Made by{" "}
            <a
              target="_blank"
              href="https://abufazal.netlify.app/"
              className="text-blue-500 hover:underline transition-all"
            >
              Abu Fazal
            </a>
          </p>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
