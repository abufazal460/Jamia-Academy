
import {
  FaGraduationCap,
  FaAward,
  FaBookOpen,
  FaLaptop,
  FaPhone,
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaXTwitter,
  FaUsers,
  FaCompass,
  FaClock,
  FaCopy,
  FaCheck,
  FaLocationArrow,
  FaPaperPlane,
} from "react-icons/fa6";

import { FaMapMarkerAlt } from "react-icons/fa";

const ICONS = {
  GraduationCap: FaGraduationCap,
  Award: FaAward,
  BookOpen: FaBookOpen,
  Laptop: FaLaptop,
  Phone: FaPhone,
  MapPin: FaMapMarkerAlt,
  MessageCircle: FaWhatsapp,
  Instagram: FaInstagram,
  Facebook: FaFacebookF,
  Youtube: FaYoutube,
  Linkedin: FaLinkedinIn,
  Twitter: FaXTwitter,
  Users: FaUsers,
  Compass: FaCompass,
  Clock: FaClock,
  Copy: FaCopy,
  Check: FaCheck,
  Navigation: FaLocationArrow,
  Send: FaPaperPlane,
};

export const resolveIcon = (name) => ICONS[name] || null;