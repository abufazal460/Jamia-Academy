import img1 from "../../../assets/images/home/hero/1.webp";
import img2 from "../../../assets/images/home/hero/2.webp";
import img3 from "../../../assets/images/home/hero/3.webp";
import img4 from "../../../assets/images/home/hero/4.webp";

export const heroSlides = [
  {
    id: "hero-slide-1",
    image: img1,
    alt: "Students learning computer skills at Jamia Academy",

    layout: "left",
    theme: "dark",
    contentWidth: "compact",

    eyebrow: "LEARN • CREATE • GROW",

    title: "Build Skills That Build Your Future",

    description:
      "Learn practical computer and technology skills through career-focused courses designed for real-world opportunities.",

    primaryAction: {
      label: "Explore Courses",
      href: "/course",
    },

    secondaryAction: {
      label: "Contact Us",
      href: "/contact",
    },

    colors: {
      accent: "#F4A261",
      button: "#C45A3C",
      buttonText: "#FFFFFF",
    },
  },

  {
    id: "hero-slide-2",
    image: img4,
    alt: "Students receiving educational opportunities at Jamia Academy",

    layout: "center",
    theme: "orphan",
    contentWidth: "orphan",

    eyebrow: "100% FREE FOR ORPHANS",

    title: "Every Child Deserves a Chance to Learn",

    description:
      "Jamia Academy provides 100% free courses to orphan students, helping them gain practical skills and build a brighter future.",

    primaryAction: {
      label: "Apply for Free",
      href: "/contact",
    },

    secondaryAction: {
      label: "Learn More",
      href: "/about",
    },

    colors: {
      accent: "#FFD166",
      button: "#FFD166",
      buttonText: "#292A27",
    },
  },

  {
    id: "hero-slide-3",
    image: img3,
    alt: "Students completing professional courses at Jamia Academy",

    layout: "right",
    theme: "dark",
    contentWidth: "compact",

    eyebrow: "SKILLS • CERTIFICATION • CONFIDENCE",

    title: "Learn Today. Get Certified. Move Forward.",

    description:
      "Build practical knowledge with structured courses that prepare you for real-world career opportunities.",

    primaryAction: {
      label: "View Courses",
      href: "/course",
    },

    secondaryAction: {
      label: "Verify Certificate",
      href: "/certificate",
    },

    colors: {
      accent: "#F4A261",
      button: "#C45A3C",
      buttonText: "#FFFFFF",
    },
  },

  {
    id: "hero-slide-4",
    image: img2,
    alt: "Students developing professional and digital skills at Jamia Academy",

    layout: "bottom",
    theme: "dark",
    contentWidth: "compact",

    eyebrow: "YOUR CAREER STARTS HERE",

    title: "Turn Your Potential Into a Career",

    description:
      "Explore in-demand skills from computer fundamentals to web development and AI, and take your next step with confidence.",

    primaryAction: {
      label: "Start Learning",
      href: "/course",
    },

    secondaryAction: {
      label: "Talk to Us",
      href: "/contact",
    },

    colors: {
      accent: "#F4A261",
      button: "#F4A261",
      buttonText: "#292A27",
    },
  },
];