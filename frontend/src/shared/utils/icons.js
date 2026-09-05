import {
  GraduationCap, Award, BookOpen, Laptop, Phone, MapPin,
  MessageCircle, Users, Compass, Clock, Copy, Check,
  Navigation, Send,
} from "lucide-react";

import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const ICONS = {
  GraduationCap, Award, BookOpen, Laptop, Phone, MapPin,
  MessageCircle, Users, Compass, Clock, Copy, Check,
  Navigation, Send,
  Instagram: FaInstagram, Facebook: FaFacebookF, Youtube: FaYoutube,
  Linkedin: FaLinkedinIn, Twitter: FaXTwitter,
};

export const resolveIcon = (name) => ICONS[name] || null;