import img1 from "../../../assets/images/home/hero/1.webp";
import img2 from "../../../assets/images/home/hero/2.webp";
import img3 from "../../../assets/images/home/hero/3.webp";
import img4 from "../../../assets/images/home/hero/4.webp";


export const heroSlides = [
  {
    id: "hero-slide-1",
    image: img1, 
    imageMobile: img1, 
    alt: "Students learning computer skills at Jamia Academy",

    layout: "left",
    theme: "dark",
    contentWidth: "compact",

    badge: "100% free for orphans",
    heading: "Build Skills That Build Your Future",
    paragraph:
      "Learn practical computer and technology skills through career-focused courses designed for real-world opportunities.",

    buttons: [
      { label: "Explore Courses", href: "/course", variant: "primary" },
      { label: "Contact Us", href: "/contact", variant: "secondary" },
    ],

    colors: {
      accent: "#F4A261",
      button: "#C45A3C",
      buttonText: "#FFFFFF",
    },
  },

  {
    id: "hero-slide-2",
    image: img2,
    imageMobile: img2,
    alt: "Students receiving educational opportunities at Jamia Academy",

    badge: "100% free for orphans",

  },

  {
    id: "hero-slide-3",
    image: img3,
    imageMobile: img3,
    alt: "Students completing professional courses at Jamia Academy",

    badge: "100% free for orphans",

    layout: "left",
    theme: "dark",
    contentWidth: "orphan",

    heading: "Every Child Deserves a Chance to Learn",
    paragraph:
      "Jamia Academy provides 100% free courses to orphan students, helping them gain practical skills and build a brighter future.",

    buttons: [
      { label: "Apply for Free", href: "/contact", variant: "primary" },
      { label: "Learn More", href: "/about", variant: "secondary" },
    ],

    colors: {
      accent: "#FFD166",
      button: "#FFD166",
      buttonText: "#292A27",
    },

  },

  {
    id: "hero-slide-4",
    badge: "100% free for orphans",

    image: img4,
    imageMobile: img4,
    alt: "Students developing professional and digital skills at Jamia Academy",

    layout: "center",
    theme: "orphan",
    contentWidth: "large",

    heading: "Build Your Future With Practical Tech Skills.",
    paragraph:
      "Explore career-focused computer courses designed by industry experts, taught with real hands-on projects.",

    buttons: [
      { label: "Explore Courses", href: "/course", variant: "primary" },
      { label: "Verify Certificate", href: "/certificate", variant: "secondary" },
    ],

    colors: {
      accent: "#F4A261",
      button: "#C45A3C",
      buttonText: "#FFFFFF",
    },
  },

];
