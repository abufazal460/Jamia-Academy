// File: aboutData.js
// Purpose: Jamia Academy About page ka SAARA editable content — ek hi jagah centralized
// Responsibility: Har section (hero, founder, timeline, etc.) ka data yaha se milega
// Future Usage: Har section component ye file import karke apna data render karega
// Dependencies: Koi nahi (pure static data file)
// IMPORTANT: Future developers ko content change karne ke liye kabhi bhi .jsx files edit
// karne ki zaroorat nahi — sirf isi file me values update karni hain.

// import all images 
import img1 from "../assets/images/about/hero/img-1.jpeg"
// ---------------------------------------------------------------------------
// HERO SECTION
// ---------------------------------------------------------------------------
export const hero = {
  // TODO:
  // Replace Dummy Data with Official Jamia Academy Content.
  eyebrow: "Since 2022",
  title: "Preparing Gen Alpha With AI-Powered Skills for the Future of the Digital Era",
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
  image: img1,
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
  name: "Dr. Qasim Chaudhary",
  designation: "Founder & Director",
  title: "Founder & CEO",
  quote: "Education is not just about degrees, it's about building character and vision for the future.",
  bio: "Dr. Qasim Chaudhary founded Jamia Academy in 2022 with a mission to provide accessible, high-quality education rooted in strong values. Under his leadership, the institution has grown from a single classroom into a full-fledged campus serving thousands of students.",
  // TODO:
  // Replace placeholder image with optimized WebP image.
  image: "/assets/about/founder-placeholder.webp",
  experience: "23+ Years in Education",
  position: "Former Advisor, State Education Board",
  qualifications: [
    { id: "qual-1", degree: "Ph.D", field: "HR Analytics & Technology", university: "Jamia Millia Islamia" },
    { id: "qual-2", degree: "MBA", field: "Human Resource Management", university: "AKTU Lucknow" },
    { id: "qual-3", degree: "BBA", field: "International Business", university: "University of Lucknow" },
  ],
 
  // Founder Message section content — used by FounderMessage.jsx
  message: {
    label: "Founder's Message",
    heading: "A Message From Our Founder",
    body: "When I started Jamia Academy, my vision was to make quality digital and AI education accessible to every learner,regardless of their financial background or circumstances. We’re here to give young minds the skills, guidance, and confidence to thrive in a digital-first world — from essential computer skills to emerging AI technologies. Our goal is to empower India’s youth to become creators, innovators, and future technology leaders who don’t just follow the world, but help shape it.",
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
  experience: "10+ Years in Academic Leadership",
  qualifications: [
    { id: "cf-qual-1", degree: "Ph.D.", field: "Educational Technology & Artificial Intelligence", university: "Jamia Millia Islamia" },
    { id: "cf-qual-2", degree: "M.A.", field: "Education", university: "Jawaharlal Nehru University" },
    { id: "cf-qual-3", degree: "B.A.", field: "Elementary Education", university: "University of Delhi" },
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
  heading: "Our Vision",

  subtitle:
    "Empowering Minds. Advancing Technology. Building the Nation.",

  description:
    "To emerge as a nationally and globally recognized education group that empowers individuals through technology-driven, affordable, and future-oriented education, enabling inclusive growth and contributing meaningfully to India’s digital and economic transformation. We envision an India where talent is not limited by socio-economic background, and where education acts as a catalyst for innovation, employment, and national progress.",

  image: "/assets/about/vision-placeholder.webp",
};


export const mission = {
  heading: "Our Mission",

  description:
    "To provide affordable, industry-focused education that equips students with practical skills, ethical values, and technological competence for a successful future.",

  points: [
    {
      id: "mission-point-1",
      text: "Deliver high-quality education in Computer Science, IT, and creative digital fields.",
    },
    {
      id: "mission-point-2",
      text: "Make quality education accessible to students from diverse backgrounds.",
    },
    {
      id: "mission-point-3",
      text: "Develop practical skills, innovation, and technological competence.",
    },
    {
      id: "mission-point-4",
      text: "Prepare skilled professionals who contribute to India’s digital and economic growth.",
    },
    {
      id: "mission-point-5",
      text: "Promote lifelong learning, ethical values, and social responsibility.",
    },
  ],
};

// ---------------------------------------------------------------------------
// COMMITMENT SECTION
// ---------------------------------------------------------------------------

export const commitment = {
  heading: "Our Commitment",

  description:
    "At Jamia Academy, we are committed to building institutions that educate with purpose, innovate with responsibility, and grow with integrity. Our focus remains on shaping individuals who not only succeed professionally but also contribute to a more equitable, skilled, and resilient society.",
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
  { id: "stat-years", label: "Years of Excellence", value: 4, suffix: "+", icon: "Sparkles" },
  { id: "stat-students", label: "Students Enrolled", value: 2000, suffix: "+", icon: "Users" },
  { id: "stat-faculty", label: "Programs Offered", value: 35, suffix: "+", icon: "BookOpen" },
  { id: "stat-placements", label: "Placements assistance", value: 1000, suffix: "+", icon: "Briefcase" },
];

// ---------------------------------------------------------------------------
// FACULTY SECTION
// ---------------------------------------------------------------------------
export const faculty = [
  // TODO:
  // Replace Dummy Data with Official Jamia Academy Content.
  {
    id: "faculty-1",
    name: "Dr. Qasim Chaudhary",
    designation: "Founder & CEO",
    title: "Founder & CEO",
    bio: "Over 15 years of experience in science education and curriculum design.",
    image: "/assets/about/team-placeholder.webp",
    qualification: "Ph.D HR Analytics & Technology (JMI) MBA (AKTU Lucknow)",
    experience: "15+ Years",
    expertise: ["Physics", "Curriculum Design", "Lab Pedagogy"],
  },
  {
    id: "faculty-2",
    name: "Dr. Saba Rizwi",
    designation: "Co-founder/Director",
    title: "Co-founder/Director",
    bio: "Passionate about making mathematics accessible and engaging for all students.",
    image: "/assets/about/team-placeholder.webp",
    qualification: "M.Sc. in Mathematics",
    experience: "12+ Years",
    expertise: ["Algebra", "Applied Math", "Olympiad Training"],
  },
  {
    id: "faculty-3",
    name: "Mr. Mohd Saad",
    designation: "Head of  Computer Science & IT Industry",
    title: "Head of  Computer Science & IT Industry",
    bio: "Dedicated to building strong communication skills in every student.",
    image: "/assets/about/team-placeholder.webp",
    qualification: "M.A. in English Literature",
    experience: "Masters in Computer Application (JMI) M.Sc (Mathematics) O Level (NIELIT)",
    expertise: ["English", "Public Speaking", "Creative Writing"],
  },
  {
    id: "faculty-4",
    name: "Mr. Shahid Khan",
    designation: "Head of Graphics Designer",
    title: "Head of Graphics Designer",
    bio: "Focused on preparing students for a technology-driven future.",
    image: "/assets/about/team-placeholder.webp",
    qualification: "Diploma in Animation (MAAC Animation Academy) Professional 3D Designer & Graphics Expert",
    experience: "8+ Years Experience in the Graphic and Animation Industry",
    expertise: ["Programming", "Robotics", "AI Fundamentals"],
  },
];

// ---------------------------------------------------------------------------
// TIMELINE SECTION
// ---------------------------------------------------------------------------
export const timeline = [
  // TODO:
  // Replace Dummy Data with Official Jamia Academy Content.
  { id: "timeline-2022", year: "2022", title: "Foundation", description: "Jamia Academy was established with a single classroom and a big vision." },
  { id: "timeline-2024", year: "2024", title: "First Campus Expansion", description: "Opened our first dedicated academic campus." },
  { id: "timeline-2024", year: "2024", title: "Digital Learning Introduced", description: "Integrated technology-driven learning across all grades." },
  { id: "timeline-2026", year: "2026", title: "5000+ Alumni Milestone", description: "Celebrated over five thousand successful graduates." },
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
