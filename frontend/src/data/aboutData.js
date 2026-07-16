// File: aboutData.js
// Purpose: Jamia Academy About page ka SAARA editable content — ek hi jagah centralized
// Responsibility: Har section (hero, founder, timeline, etc.) ka data yaha se milega
// Future Usage: Har section component ye file import karke apna data render karega
// Dependencies: Koi nahi (pure static data file)
// IMPORTANT: Future developers ko content change karne ke liye kabhi bhi .jsx files edit
// karne ki zaroorat nahi — sirf isi file me values update karni hain.

import cardImg from  "../assets/images/about/hero/img-1.jpeg"

// ---------------------------------------------------------------------------
// HERO SECTION
// ---------------------------------------------------------------------------
export const hero = {
  // TODO:
  // Replace Dummy Data with Official Jamia Academy Content.
  eyebrow: "Since 2001",
  title: "Shaping Futures Through Knowledge & Character",
  subtitle: "Welcome to Jamia Academy",
  description:
    "For over two decades, Jamia Academy has been committed to academic excellence, character building, and holistic student development.",
  primaryCta: { label: "Explore Our Journey", href: "#timeline" },
  secondaryCta: { label: "Meet Our Founder", href: "#founder" },
  // TODO:
  // Replace placeholder image with optimized WebP image.
  image: "/assets/about/hero-placeholder.webp",
};

// ---------------------------------------------------------------------------
// ABOUT DESCRIPTION SECTION
// ---------------------------------------------------------------------------
export const aboutDescription = {
  // TODO:
  // Replace Dummy Data with Official Jamia Academy Content.
  heading: "Building Future Through Technology Driven Education",
  established: "Established 2022",
  location: "Near Jamia Millia Islamia University",
  quote: "A future-focused education group built on trust, technology, and affordability.",
  paragraphs: [
    "Jamia Academy is a multi-branch, future-focused education group founded near Jamia Millia Islamia University, dedicated to nurturing young minds through a balanced blend of academic rigor and moral values.",
    "Our approach combines technology-focused learning with time-tested principles, delivering affordable, high-quality education so every student graduates as a confident, capable, and compassionate individual.",
  ],
  badges: [
    { id: "badge-established", label: "Established 2022" },
    { id: "badge-location", label: "Near Jamia Millia Islamia" },
    { id: "badge-tech", label: "Technology Focused Education" },
  ],
  // TODO:
  // Replace placeholder image with optimized WebP image.
  image: cardImg,
};

// ---------------------------------------------------------------------------
// FEATURES SECTION (used by AboutDescription feature cards)
// ---------------------------------------------------------------------------
export const features = [
  // TODO:
  // Replace Dummy Data with Official Jamia Academy Content.
  {
    id: "feature-quality-education",
    title: "Quality Education",
    description: "A curriculum designed for academic excellence and real-world readiness.",
    icon: "GraduationCap",
  },
  {
    id: "feature-digital-focus",
    title: "Digital Focus",
    description: "Technology-integrated classrooms that prepare students for a digital future.",
    icon: "MonitorSmartphone",
  },
  {
    id: "feature-iso-certified",
    title: "ISO Certified",
    description: "Recognized quality standards across teaching, operations, and administration.",
    icon: "ShieldCheck",
  },
];

// ---------------------------------------------------------------------------
// FOUNDER SECTION
// ---------------------------------------------------------------------------
export const founder = {
  // TODO:
  // Replace Dummy Data with Official Jamia Academy Content.
  name: "Dr. Ahmed Khan",
  designation: "Founder & Director",
  quote: "Education is not just about degrees, it's about building character and vision for the future.",
  bio: "Dr. Ahmed Khan founded Jamia Academy in 2001 with a mission to provide accessible, high-quality education rooted in strong values. Under his leadership, the institution has grown from a single classroom into a full-fledged campus serving thousands of students.",
  // TODO:
  // Replace placeholder image with optimized WebP image.
  image: "/assets/about/founder-placeholder.webp",
};

// ---------------------------------------------------------------------------
// FOUNDER MESSAGE (separate from bio — a direct address/message block)
// ---------------------------------------------------------------------------
export const founderMessage = {
  // TODO:
  // Replace Dummy Data with Official Jamia Academy Content.
  heading: "A Message From Our Founder",
  message:
    "When I started Jamia Academy, my vision was simple: create a place where every child feels seen, supported, and inspired to become their best self. Today, that vision continues to guide everything we do.",
  signatureName: "Dr. Ahmed Khan",
};

// ---------------------------------------------------------------------------
// CO-FOUNDER SECTION
// ---------------------------------------------------------------------------
export const coFounder = {
  // TODO:
  // Replace Dummy Data with Official Jamia Academy Content.
  name: "Mrs. Fatima Khan",
  designation: "Co-Founder & Academic Director",
  bio: "Mrs. Fatima Khan has been instrumental in shaping the academic curriculum and pastoral care systems that define the Jamia Academy experience.",
  // TODO:
  // Replace placeholder image with optimized WebP image.
  image: "/assets/about/cofounder-placeholder.webp",
};

// ---------------------------------------------------------------------------
// VISION & MISSION SECTION
// ---------------------------------------------------------------------------
export const vision = {
  // TODO:
  // Replace Dummy Data with Official Jamia Academy Content.
  heading: "Our Vision",
  description: "To be a leading educational institution recognized for academic excellence and character development.",
  // TODO:
  // Replace placeholder image with optimized WebP image.
  image: "/assets/about/vision-placeholder.webp",
};

export const mission = {
  // TODO:
  // Replace Dummy Data with Official Jamia Academy Content.
  heading: "Our Mission",
  description: "To provide holistic, values-driven education that empowers every student to reach their full potential.",
};

// ---------------------------------------------------------------------------
// COMMITMENT SECTION
// ---------------------------------------------------------------------------
export const commitment = {
  // TODO:
  // Replace Dummy Data with Official Jamia Academy Content.
  heading: "Our Commitment",
  description:
    "We are committed to fostering an inclusive, safe, and inspiring environment where every student can thrive academically, socially, and emotionally.",
};

// ---------------------------------------------------------------------------
// VALUES SECTION
// ---------------------------------------------------------------------------
export const values = [
  // TODO:
  // Replace Dummy Data with Official Jamia Academy Content.
  { id: "value-integrity", title: "Integrity", description: "We uphold honesty and strong moral principles in everything we do." },
  { id: "value-excellence", title: "Excellence", description: "We strive for the highest standards in academics and character." },
  { id: "value-innovation", title: "Innovation", description: "We embrace modern teaching methods and technology." },
  { id: "value-community", title: "Community", description: "We build strong bonds among students, staff, and families." },
  { id: "value-compassion", title: "Compassion", description: "We nurture empathy and kindness in every student." },
];

// ---------------------------------------------------------------------------
// STATS SECTION
// ---------------------------------------------------------------------------
export const stats = [
  // TODO:
  // Replace Dummy Data with Official Jamia Academy Content.
  { id: "stat-years", label: "Years of Excellence", value: 23, suffix: "+" },
  { id: "stat-students", label: "Students Enrolled", value: 5200, suffix: "+" },
  { id: "stat-faculty", label: "Expert Faculty", value: 180, suffix: "+" },
  { id: "stat-courses", label: "Courses Offered", value: 45, suffix: "+" },
];

// ---------------------------------------------------------------------------
// FACULTY SECTION
// ---------------------------------------------------------------------------
export const faculty = [
  // TODO:
  // Replace Dummy Data with Official Jamia Academy Content.
  {
    id: "faculty-1",
    name: "Dr. Sana Malik",
    designation: "Head of Sciences",
    bio: "Over 15 years of experience in science education and curriculum design.",
    image: "/assets/about/team-placeholder.webp",
  },
  {
    id: "faculty-2",
    name: "Mr. Imran Sheikh",
    designation: "Head of Mathematics",
    bio: "Passionate about making mathematics accessible and engaging for all students.",
    image: "/assets/about/team-placeholder.webp",
  },
  {
    id: "faculty-3",
    name: "Ms. Ayesha Siddiqui",
    designation: "Head of Languages",
    bio: "Dedicated to building strong communication skills in every student.",
    image: "/assets/about/team-placeholder.webp",
  },
];

// ---------------------------------------------------------------------------
// TIMELINE SECTION
// ---------------------------------------------------------------------------
export const timeline = [
  // TODO:
  // Replace Dummy Data with Official Jamia Academy Content.
  { id: "timeline-2001", year: "2001", title: "Foundation", description: "Jamia Academy was established with a single classroom and a big vision." },
  { id: "timeline-2008", year: "2008", title: "First Campus Expansion", description: "Opened our first dedicated academic campus." },
  { id: "timeline-2015", year: "2015", title: "Digital Learning Introduced", description: "Integrated technology-driven learning across all grades." },
  { id: "timeline-2023", year: "2023", title: "5000+ Alumni Milestone", description: "Celebrated over five thousand successful graduates." },
];

// ---------------------------------------------------------------------------
// WHY CHOOSE US SECTION
// ---------------------------------------------------------------------------
export const whyChooseUs = [
  // TODO:
  // Replace Dummy Data with Official Jamia Academy Content.
  { id: "why-1", title: "Experienced Faculty", description: "Learn from educators with decades of combined teaching experience." },
  { id: "why-2", title: "Modern Curriculum", description: "A curriculum that blends academic rigor with real-world skills." },
  { id: "why-3", title: "Safe Environment", description: "A nurturing, secure campus where students feel they belong." },
  { id: "why-4", title: "Holistic Development", description: "Focus on academics, sports, arts, and character together." },
];

// ---------------------------------------------------------------------------
// SINGLE EXPORT — future components isse bhi import kar sakte hain agar poora
// data object ek saath chahiye ho (e.g. SEO structured data generation ke liye)
// ---------------------------------------------------------------------------
const aboutData = {
  hero,
  aboutDescription,
  features,
  founder,
  founderMessage,
  coFounder,
  vision,
  mission,
  commitment,
  values,
  stats,
  faculty,
  timeline,
  whyChooseUs,
};

export default aboutData;
