// src/components/home/whyChooseUs/whyChooseUsData.js

import { 
  Users, 
  Code, 
  Award, 
  Briefcase, 
  DollarSign, 
  Clock,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export const whyChooseData = [
  {
    id: 1,
    title: "Expert Faculty",
    description: "Learn directly from industry veterans and domain leaders bringing real-world wisdom into every lesson.",
    icon: Users,
    gradient: "from-[#E63946] to-[#C1121F]",
    bgGradient: "from-red-50 to-red-100/30",
    borderColor: "border-red-200/50",
    iconBg: "bg-red-50",
    iconColor: "text-[#E63946]",
    lineGradient: "from-[#E63946] to-transparent"
  },
  {
    id: 2,
    title: "Practical Learning",
    description: "Focus on building live projects, writing real code, and solving practical industry problems hands-on.",
    icon: Code,
    gradient: "from-[#2A9D8F] to-[#264653]",
    bgGradient: "from-teal-50 to-teal-100/30",
    borderColor: "border-teal-200/50",
    iconBg: "bg-teal-50",
    iconColor: "text-[#2A9D8F]",
    lineGradient: "from-[#2A9D8F] to-transparent"
  },
  {
    id: 3,
    title: "Industry Recognized Certificates",
    description: "Earn globally verified credentials that boost your resume and showcase your verified technical competence.",
    icon: Award,
    gradient: "from-[#F4A261] to-[#E76F51]",
    bgGradient: "from-amber-50 to-amber-100/30",
    borderColor: "border-amber-200/50",
    iconBg: "bg-amber-50",
    iconColor: "text-[#F4A261]",
    lineGradient: "from-[#F4A261] to-transparent"
  },
  {
    id: 4,
    title: "Career Guidance",
    description: "Get 1-on-1 resume reviews, mock interview sessions, and placement assistance tailored for success.",
    icon: Briefcase,
    gradient: "from-[#264653] to-[#2A9D8F]",
    bgGradient: "from-cyan-50 to-cyan-100/30",
    borderColor: "border-cyan-200/50",
    iconBg: "bg-cyan-50",
    iconColor: "text-[#264653]",
    lineGradient: "from-[#264653] to-transparent"
  },
  {
    id: 5,
    title: "Affordable Fees",
    description: "Access top-notch, premium educational quality with flexible payment structures and accessible pricing.",
    icon: DollarSign,
    gradient: "from-[#2B2D42] to-[#1A1A2E]",
    bgGradient: "from-emerald-50 to-emerald-100/30",
    borderColor: "border-emerald-200/50",
    iconBg: "bg-emerald-50",
    iconColor: "text-[#2B2D42]",
    lineGradient: "from-[#2B2D42] to-transparent"
  },
  {
    id: 6,
    title: "Flexible Learning",
    description: "Study at your own pace with self-paced content, weekend practical sessions, and lifetime resource access.",
    icon: Clock,
    gradient: "from-[#E63946] to-[#F4A261]",
    bgGradient: "from-purple-50 to-purple-100/30",
    borderColor: "border-purple-200/50",
    iconBg: "bg-purple-50",
    iconColor: "text-[#E63946]",
    lineGradient: "from-[#E63946] to-transparent"
  }
];

export const ctaData = {
  title: "Ready to Start Learning?",
  description: "Join Jamia Academy today and equip yourself with future-proof tech skills to launch your dream career.",
  buttonText: "Explore Courses",
  buttonIcon: ArrowRight
};

export const sectionData = {
  heading: "Why Students Choose Jamia Academy",
  description: "We empower learners with hands-on practical education, seasoned faculty mentorship, globally valid certifications, dedicated career guidance, and an industry-aligned curriculum—at accessible fees."
};