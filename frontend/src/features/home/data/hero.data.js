import img1 from "../../../assets/images/home/hero/1.webp";
import img2 from "../../../assets/images/home/hero/2.webp";
import img3 from "../../../assets/images/home/hero/3.webp";
import img4 from "../../../assets/images/home/hero/4.jpeg";

// ============================================================================
// hero.data.js
// ----------------------------------------------------------------------------
// DATA MODEL CHANGE: pehle har slide ka apna alag "eyebrow" text tha. Naye
// spec ke mutabik, slides 1-3 pe hamesha SAME fixed badge ("100% free for
// orphans") dikhna chahiye — isliye har slide ka "badge" field ab sirf
// present/absent hota hai (slide 4 mein bilkul nahi hai).
//
// "title"/"description"/"primaryAction"/"secondaryAction" fields ko
// "heading"/"paragraph"/"buttons" (array) se replace kiya hai — buttons ab
// ek array hai (0, 1, 2 ya zyada bhi ho sakte hain) taaki naya button
// add/remove/change karna sirf is file mein ho, component logic mein
// kabhi nahi (data-driven CTA system).
//
// "imageMobile" — optional portrait/mobile-crop image. Agar future mein
// koi slide ke liye alag portrait asset available ho to yahan add karo.
// Agar nahi diya, HeroSlide.jsx automatically "image" (landscape/desktop)
// ko hi mobile pe bhi use kar leta hai — koi crash/missing-image state
// nahi banta.
// ============================================================================

export const heroSlides = [
  {
    id: "hero-slide-1",
    image: img1, // desktop/landscape asset
    imageMobile: img1, // TODO: jab portrait crop mile, yahan replace karo
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

    layout: "center",
    theme: "orphan",
    contentWidth: "orphan",

    badge: "100% free for orphans",
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
    id: "hero-slide-3",
    image: img3,
    imageMobile: img3,
    alt: "Students completing professional courses at Jamia Academy",

    layout: "right",
    theme: "dark",
    contentWidth: "compact",

    badge: "100% free for orphans",
    // heading: "Learn Today. Get Certified. Move Forward.",
    // paragraph:
    //   "Build practical knowledge with structured courses that prepare you for real-world career opportunities.",

    // buttons: [
    //   { label: "View Courses", href: "/course", variant: "primary" },
    //   { label: "Verify Certificate", href: "/certificate", variant: "secondary" },
    // ],

    colors: {
      accent: "#F4A261",
      button: "#C45A3C",
      buttonText: "#FFFFFF",
    },
  },

  {
    // SLIDE 4 — IMAGE ONLY. Koi badge/heading/paragraph/buttons field hi
    // nahi diya (undefined) — HeroContent.jsx isse detect karke poora
    // content-block hi render nahi karta (return null), sirf background
    // image dikhti hai. Koi "empty string" fields nahi rakhe (jaisa pehle
    // the) kyunki empty string bhi ek "value" hai aur accidentally
    // truthy-check todh sakti hai kahin — undefined/missing sabse safe hai.
    id: "hero-slide-4",
    badge: "100% free for orphans",

    image: img4,
    imageMobile: img4,
    alt: "Students developing professional and digital skills at Jamia Academy",
  },
];
