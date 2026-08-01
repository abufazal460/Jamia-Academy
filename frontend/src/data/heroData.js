// ==========================================================================
// heroData.js
// --------------------------------------------------------------------------
// Yahan Hero Section ka SAARA text/content centralized hai.
// Kabhi bhi component JSX ke andar hardcoded text nahi likhna hai —
// naya text add/update karna ho to sirf yahi file edit karo, kahin aur
// nahi. Isse components purely "presentational" rehte hain aur reusable
// bante hain (single source of truth principle).
// ==========================================================================

// 1. Top badge — "Admission Open 2026"
export const heroBadge = {
  text: "Admission Open 2026",
  ariaLabel: "Admission open for the year 2026",
};

// 2. Main heading
export const heroHeading = {
  title: "JAMIA ACADEMY",
};

// 3. Typewriter subtitle (typing + deleting loop)
export const heroTypewriter = {
  text: "A Future-Focused Institution Driving Technology, Talent & Transformation",
  typingSpeed: 45, // ms — har letter type hone mein kitna time lage
  deletingSpeed: 25, // ms — har letter delete hone mein kitna time lage
  pauseAfterTyping: 2200, // pura text likhne ke baad kitni der ruke
  pauseAfterDeleting: 500, // pura text delete hone ke baad kitni der ruke
};

// 4. ISO certification line
export const heroIsoText = {
  text: "(ISO Certified & Govt. Approved Institute)",
};

// 5. Orphan free courses line (highlight ke liye teen parts mein todha hai)
export const heroOrphanText = {
  prefix: "Orphan Children Get",
  highlight: "100% FREE",
  suffix: "Professional & Technical Courses",
};

// 6. Description paragraphs — array hai taaki HeroDescription component
//    map() se dono paragraphs render kar sake, koi JSX duplicate na ho
export const heroDescriptions = [
  {
    id: "desc-primary",
    text: "Providing industry-driven IT education, practical software training, and 1-on-1 career guidance to build future tech leaders.",
    tone: "primary", // -> text-slate-300
  },
  {
    id: "desc-secondary",
    text: "Master Web Development, Data Analytics, Cyber Security, AI Tools, and Graphic Design.",
    tone: "secondary", // -> text-slate-400
  },
];

// 7. CTA Buttons
export const heroButtons = {
  primary: {
    id: "explore-courses",
    label: "Explore Courses",
    href: "courses",
    ariaLabel: "Explore all courses offered by Jamia Academy",
  },
  secondary: {
    id: "contact-us",
    label: "Contact Us",
    href: "contact",
    ariaLabel: "Contact Jamia Academy",
  },
};

// 8. Stats — "40+ Courses" ko brief ke mutabik "100% Job Assistance" se
//    replace kiya gaya hai. displayFormat batata hai number kaise format
//    hoga (plain percent vs comma-separated plus jaise "2,500+").
export const heroStats = [
  {
    id: "stat-scholarship",
    target: 100,
    suffix: "%",
    displayFormat: "percent",
    label: "Scholarship for Orphans",
    colorClass: "text-yellow-400",
  },
  {
    id: "stat-job-assistance",
    target: 100,
    suffix: "%",
    displayFormat: "percent",
    label: "Job Assistance",
    colorClass: "text-sky-400",
  },
  {
    id: "stat-alumni",
    target: 2500,
    suffix: "+",
    displayFormat: "comma-plus",
    label: "Graduated Alumni",
    colorClass: "text-white",
  },
  {
    id: "stat-success",
    target: 100,
    suffix: "%",
    displayFormat: "percent",
    label: "Job & Freelance Success",
    colorClass: "text-emerald-400",
  },
];

// 9. Academy pillars
export const heroPillars = [
  {
    id: "pillar-projects",
    icon: "⚡",
    title: "Hands-on Live Projects",
    description: "Work on real-world projects and build a job-ready portfolio.",
  },
  {
    id: "pillar-certifications",
    icon: "🎓",
    title: "Recognized Certifications",
    description: "Receive valid credentials to boost your resume worldwide.",
  },
  {
    id: "pillar-placement",
    icon: "🚀",
    title: "Placement & Mentorship",
    description: "Get 1-on-1 resume guidance, mock interviews, and job referrals.",
  },
];
