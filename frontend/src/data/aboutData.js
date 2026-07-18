// File: aboutData.js
// Purpose: Jamia Academy About page ka SAARA editable content — ek hi jagah centralized
// Responsibility: Har section (hero, founder, timeline, etc.) ka data yaha se milega
// Future Usage: Har section component ye file import karke apna data render karega
// Dependencies: Koi nahi (pure static data file)
// IMPORTANT: Future developers ko content change karne ke liye kabhi bhi .jsx files edit
// karne ki zaroorat nahi — sirf isi file me values update karni hain.

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
  image: "/images/about/about-placeholder.webp",
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
  title: "Founder & Director",
  quote: "Education is not just about degrees, it's about building character and vision for the future.",
  bio: "Dr. Ahmed Khan founded Jamia Academy in 2001 with a mission to provide accessible, high-quality education rooted in strong values. Under his leadership, the institution has grown from a single classroom into a full-fledged campus serving thousands of students.",
  // TODO:
  // Replace placeholder image with optimized WebP image.
  image: "/assets/about/founder-placeholder.webp",
  experience: "23+ Years in Education",
  position: "Former Advisor, State Education Board",
  qualifications: [
    { id: "qual-1", degree: "Ph.D.", field: "Educational Leadership", university: "Jamia Millia Islamia" },
    { id: "qual-2", degree: "M.Ed.", field: "Curriculum & Instruction", university: "Aligarh Muslim University" },
    { id: "qual-3", degree: "B.Ed.", field: "Secondary Education", university: "University of Delhi" },
  ],
  social: {
    linkedin: "https://linkedin.com/in/example",
    twitter: "https://twitter.com/example",
    facebook: "",
  },
  // Founder Message section content — used by FounderMessage.jsx
  message: {
    label: "Founder's Message",
    heading: "A Message From Our Founder",
    body: "When I started Jamia Academy, my vision was simple: create a place where every child feels seen, supported, and inspired to become their best self. Today, that vision continues to guide everything we do — every classroom, every teacher, every student we welcome through our doors.",
    // TODO:
    // Replace placeholder signature with an official scanned signature image if available.
    signatureImage: "",
  },
};

// ---------------------------------------------------------------------------
// CO-FOUNDER SECTION
// ---------------------------------------------------------------------------
export const coFounder = {
  // TODO:
  // Replace Dummy Data with Official Jamia Academy Content.
  name: "Dr. Saba Rizwi",
  designation: "Co-Founder & Academic Director",
  title: "Co-Founder & MD",
  bio: "Dr. Saba Rizwi has been instrumental in shaping the academic curriculum and pastoral care systems that define the Jamia Academy experience.",
  // TODO:
  // Replace placeholder image with optimized WebP image.
  image: "/assets/about/cofounder-placeholder.webp",
  experience: "18+ Years in Academic Leadership",
  qualifications: [
    { id: "cf-qual-1", degree: "Ph.D.", field: "Educational Psychology", university: "Jamia Millia Islamia" },
    { id: "cf-qual-2", degree: "M.A.", field: "Curriculum Design", university: "Jawaharlal Nehru University" },
    { id: "cf-qual-3", degree: "B.Ed.", field: "Elementary Education", university: "University of Delhi" },
  ],
  message: {
    label: "A Note From Our Co-Founder",
    body: "I believe every child carries a spark of potential waiting to be nurtured. My work here is about building the systems, the culture, and the everyday moments that let that spark grow into something lasting.",
  },
};

// ---------------------------------------------------------------------------
// VISION & MISSION SECTION
// ---------------------------------------------------------------------------
export const vision = {
  // TODO:
  // Replace Dummy Data with Official Jamia Academy Content.
  heading: "Our Vision",
  subtitle: "Looking Ahead",
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
  points: [
    { id: "mission-point-1", text: "Deliver a curriculum that balances academics with real-world skills." },
    { id: "mission-point-2", text: "Nurture character, empathy, and integrity in every student." },
    { id: "mission-point-3", text: "Integrate technology meaningfully into everyday learning." },
    { id: "mission-point-4", text: "Keep quality education accessible and affordable for all families." },
  ],
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
  { id: "value-integrity", title: "Integrity", description: "We uphold honesty and strong moral principles in everything we do.", icon: "ShieldCheck" },
  { id: "value-excellence", title: "Excellence", description: "We strive for the highest standards in academics and character.", icon: "Award" },
  { id: "value-innovation", title: "Innovation", description: "We embrace modern teaching methods and technology.", icon: "Lightbulb" },
  { id: "value-community", title: "Community", description: "We build strong bonds among students, staff, and families.", icon: "Users" },
  { id: "value-compassion", title: "Compassion", description: "We nurture empathy and kindness in every student.", icon: "HeartHandshake" },
];

// ---------------------------------------------------------------------------
// STATS SECTION
// ---------------------------------------------------------------------------
export const stats = [
  // TODO:
  // Replace Dummy Data with Official Jamia Academy Content.
  { id: "stat-years", label: "Years of Excellence", value: 23, suffix: "+", icon: "Sparkles" },
  { id: "stat-students", label: "Students Enrolled", value: 5200, suffix: "+", icon: "Users" },
  { id: "stat-faculty", label: "Programs Offered", value: 45, suffix: "+", icon: "BookOpen" },
  { id: "stat-placements", label: "Placements", value: 180, suffix: "+", icon: "Briefcase" },
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
    title: "Head of Sciences",
    bio: "Over 15 years of experience in science education and curriculum design.",
    image: "/assets/about/team-placeholder.webp",
    qualification: "Ph.D. in Physics",
    experience: "15+ Years",
    expertise: ["Physics", "Curriculum Design", "Lab Pedagogy"],
  },
  {
    id: "faculty-2",
    name: "Mr. Imran Sheikh",
    designation: "Head of Mathematics",
    title: "Head of Mathematics",
    bio: "Passionate about making mathematics accessible and engaging for all students.",
    image: "/assets/about/team-placeholder.webp",
    qualification: "M.Sc. in Mathematics",
    experience: "12+ Years",
    expertise: ["Algebra", "Applied Math", "Olympiad Training"],
  },
  {
    id: "faculty-3",
    name: "Ms. Ayesha Siddiqui",
    designation: "Head of Languages",
    title: "Head of Languages",
    bio: "Dedicated to building strong communication skills in every student.",
    image: "/assets/about/team-placeholder.webp",
    qualification: "M.A. in English Literature",
    experience: "10+ Years",
    expertise: ["English", "Public Speaking", "Creative Writing"],
  },
  {
    id: "faculty-4",
    name: "Mr. Rehan Qureshi",
    designation: "Head of Computer Science",
    title: "Head of Computer Science",
    bio: "Focused on preparing students for a technology-driven future.",
    image: "/assets/about/team-placeholder.webp",
    qualification: "M.Tech in Computer Science",
    experience: "9+ Years",
    expertise: ["Programming", "Robotics", "AI Fundamentals"],
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
  {
    id: "why-1",
    title: "Proven Credibility",
    description: "ISO-certified, multi-branch institution trusted by thousands of families since 2022.",
    icon: "BadgeCheck",
  },
  {
    id: "why-2",
    title: "Quality Teaching",
    description: "Experienced faculty delivering a curriculum that blends academic rigor with real-world skills.",
    icon: "GraduationCap",
  },
  {
    id: "why-3",
    title: "Career Support",
    description: "Dedicated guidance and placement assistance to help every student plan their future with confidence.",
    icon: "Briefcase",
  },
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
