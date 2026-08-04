// Central icon resolver — data files sirf icon name (string) store karti hain,
// yeh util us naam ko actual lucide-react component mein resolve karta hai.
import {
  GraduationCap,
  Award,
  BookOpen,
  Laptop,
  Phone,
  MapPin,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  Users,
  Compass,
  Clock,
  Copy,
  Check,
  Navigation,
  Send,
} from "lucide-react";

const ICONS = {
  GraduationCap,
  Award,
  BookOpen,
  Laptop,
  Phone,
  MapPin,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  Users,
  Compass,
  Clock,
  Copy,
  Check,
  Navigation,
  Send,
};

// resolveIcon("Phone") -> Phone component. Falls back gracefully to null.
export const resolveIcon = (name) => ICONS[name] || null;
