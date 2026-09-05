import img2 from "../../../assets/images/about/faculty/saba mam.jpg"
import img3 from "../../../assets/images/about/faculty/saad sir.jpeg"
import img4 from "../../../assets/images/about/faculty/shahid sir.jpeg"
import founderImg from "../../../assets/images/about/founder.jpeg"
import coFounderImg from "../../../assets/images/about/co-founder.jpeg"

import video from "../../../assets/images/common/aboutDescription.mp4"
// ---------------------------------------------------------------------------
// HERO SECTION
// ---------------------------------------------------------------------------
export const hero = {
  eyebrow: "Since 2022",
  title: "Preparing Gen Alpha With AI-Powered Skills for the Future of the Digital Era",
  subtitle: "Welcome to Jamia Academy",
  description:
    "For over two decades, Jamia Academy has been committed to academic excellence, character building, and holistic student development.",
  primaryCta: { label: "Explore Our Journey", href: "#timeline" },
  secondaryCta: { label: "Meet Our Founder", href: "#founder" },

  image: "/assets/about/hero-placeholder.webp",
};

// ---------------------------------------------------------------------------
// ABOUT DESCRIPTION SECTION
// ---------------------------------------------------------------------------
export const aboutDescription = {

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

  image: video,
};

// ---------------------------------------------------------------------------
// FEATURES SECTION (used by AboutDescription feature cards)
// ---------------------------------------------------------------------------
export const features = [
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

  name: "Dr. Qasim Chaudhary",
  designation: "Founder & Director",
  title: "Founder & CEO",
  quote: "Education is not just about degrees, it's about building character and vision for the future.",
  bio: "Dr. Qasim Chaudhary founded Jamia Academy in 2022 with a mission to provide accessible, high-quality education rooted in strong values. Under his leadership, the institution has grown from a single classroom into a full-fledged campus serving thousands of students.",

  image: founderImg,
  experience: "23+ Years in Education",
  position: "Former Advisor, State Education Board",
  qualifications: [
    { id: "qual-1", degree: "Ph.D", field: "HR Analytics & Technology", university: "Jamia Millia Islamia" },
    { id: "qual-2", degree: "MBA", field: "Human Resource Management", university: "AKTU Lucknow" },
    // { id: "qual-3", degree: "BBA", field: "International Business", university: "University of Lucknow" },
  ],

  // Founder Message section content — used by FounderMessage.jsx
  message: {
    id: "founder",
    label: "Founder's Message",
    heading: "A Message From Our Founder",
    body: [
      "Every big change starts with a small, stubborn belief. Mine was this: education should build futures, not just distribute degrees. Years ago, when I looked around, I saw a system that was rewarding privilege more than potential. Students with resources kept moving forward, while equally sometimes more talented students were left waiting for a chance that never came. That imbalance didn't sit right with me. It became the reason Jamia Academy exists today. We didn't want to build just another academy. We wanted to build a bridge between ambition and opportunity, between where a student starts and where their talent can actually take them. That's why everything at Jamia Academy, from the courses we design to the mentors we choose, is built around one non-negotiable principle: quality education should never be a privilege reserved for the few. I've always believed that India's real strength lies in its youth in the coder sitting in a small town dreaming of building the next big app, in the young girl who wants to design digital experiences but has never been told she can. Our job is to find these dreams and give them the tools, training, and confidence to become reality. As we expand across regions and reach more students every day, my vision remains rooted in the same idea we started with: build an India where skill speaks louder than background, and opportunity is earned through passion, not privilege. To every learner who chooses Jamia Academy know that you are not just a student to us. You are the reason this institution exists, and you are the future we are building for. Our Dream is to create a super powerful India that doesn't just consume technology but leads it. Warm regards, Dr.Qasim Chaudhary."
    ],

    signatureImage: "",
  },
};

// ---------------------------------------------------------------------------
// CO-FOUNDER SECTION
// ---------------------------------------------------------------------------
export const coFounder = {

  name: "Dr. Saba Rizwi",
  designation: "Co-Founder & Academic Director",
  title: "Co-Founder & CMD",
  bio: "Dr. Saba Rizwi has been instrumental in shaping the academic curriculum and pastoral care systems that define the Jamia Academy experience.",

  image: coFounderImg,
  experience: "12+ Years in Academic Leadership",
  qualifications: [
    { id: "cf-qual-1", degree: "Ph.D.", field: "Educational Technology & Artificial Intelligence", university: "Jamia Millia Islamia" },
    // { id: "cf-qual-2", degree: "M.A.", field: "Education", university: "Jawaharlal Nehru University" },
    // { id: "cf-qual-3", degree: "B.A.", field: "Elementary Education", university: "University of Delhi" },
  ],
  note: {
    label: "A Note From Our Co-Founder",
    notes: "I believe every child carries a spark of potential waiting to be nurtured. My work here is about building the systems, the culture, and the everyday moments that let that spark grow into something lasting.",
  },

  message: {
    id: "co-founder",
    label: "Co-Founder & CMD",
    heading: "Co-Founder & CMD",
    body: [
      "Bridging the widening gap between what colleges teach and what industries actually need has been the very reason behind starting Jamia Academy a gap that academia rarely talks about. For years, I watched brilliant graduates step out with certificates in hand, yet struggle to find their footing in the job market because the job market had already moved several steps ahead. The world was shifting toward AI, automation, and digital-first everything, but our education system was still teaching yesterday's syllabus for today's jobs. This disconnect became the spark behind Jamia Academy. My vision has never been to complete with traditional education, but to complete it to build an institution that moves at the same speed as technology itself, one that constantly evolves and constantly asks whether what we teach today will still hold value tomorrow. Alongside producing skilled individuals, we want to build professionals who walk into interview rooms and boardrooms already speaking the language of the industry. What excites me most isn't where Jamia Academy stands today, but where we're headed next- new domains, emerging technologies like Artificial Intelligence (AI), smarter learning formats, and a growing community of learners who refuse to settle for outdated knowledge. This is just the beginning of a much bigger blueprint. Here's the one lesson I want every student to carry with them: the world doesn't need more people who simply adapt to change it needs people who create it. Don't just keep up. Learn to Lead It. Together, let's build an environment that doesn't chase industry trends it sets them. Join the Movement. Become the Trendsetter. Warm regards, Dr. Saba Rizwi.",
    ],

    signatureImage: "",
  },
};

// ---------------------------------------------------------------------------
// VISION & MISSION SECTION
// ---------------------------------------------------------------------------

export const vision = {
  heading: "Our Vision",
  description:
    "We're not just an institute we're a movement that connects raw talent with the power of technology, opening doors to unlimited possibilities for every student who walks through them. Our vision is to build a “Societal environment recognized across India and the world” one where affordable, future-ready, and skill-driven education reaches every student, regardless of their background. Contributing to India's race in technology is our ultimate mission. We dream of a New India where: Talent knows no boundaries-socio-economic background is never a barrier Education is more than a degree- it's a gateway to innovation and employment Every student becomes a driving force in India's digital and economic transformation “Enrol today”, “Lead tomorrow” Your Skill, Your Future, It All Starts Here",

  image: "/assets/about/vision-placeholder.webp",
};


export const mission = {
  heading: "Our Mission",
  description:
    "We provide top-quality education in Computer Science, Information Technology, and Creative Digital Fields, matching global standards and real industry demands, so you're job-ready from day one. We break down financial barriers and deliver affordable, accessible education to students from economically weaker, marginalized, and underrepresented communities we believe talent should never be held back by circumstance. Every program we offer combines practical skills, strong ethical values, and cutting-edge technological competence because true professionals aren't just taught, they're built. We nurture a culture of curiosity, lifelong learning, and social responsibility.",

};

// ---------------------------------------------------------------------------
// COMMITMENT SECTION
// ---------------------------------------------------------------------------
export const commitment = {
  heading: "Our Commitment",
  description:
    "We are committed to standing by every student's journey from their first day in the classroom to their first day on the job because your success is not a checkbox for us, it's our purpose. We continuously upgrade our curriculum, tools, and teaching methods to match evolving global industry standards, because settling for good enough is not in our DNA. We keep education affordable and accessible, ensuring that no student is left behind due to financial or social barriers, because merit and passion not background should define who gets a seat at the table. Alongside technical expertise, we instil integrity, discipline, and ethical responsibility in every student, because we're not just creating employees, we're shaping responsible citizens and future leaders. We remain an active contributor to India's digital transformation, training a workforce that is skilled, adaptable, and ready to complete on the global stage. And our relationship with students doesn't end at graduation we continue to offer mentorship, placement support, and lifelong learning opportunities long after the certificate is handed over.",
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
  { id: "stat-years", label: "Years of Excellence", value: 4, suffix: "+", icon: "Sparkles" },
  { id: "stat-students", label: "Students Enrolled", value: 2000, suffix: "+", icon: "Users" },
  { id: "stat-faculty", label: "Programs Offered", value: 50, suffix: "+", icon: "BookOpen" },
  { id: "stat-placements", label: "Placements assistance", value: 1000, suffix: "+", icon: "Briefcase" },
];

// ---------------------------------------------------------------------------
// FACULTY SECTION
// ---------------------------------------------------------------------------
export const faculty = [
  {
    id: "faculty-1",
    name: "Dr. Qasim Chaudhary",
    designation: "Founder & CEO",
    title: "Founder & CEO",
    bio: "Over 15 years of experience in science education and curriculum design.",
    image: founderImg,
    qualification: "Ph.D HR Analytics & Technology (JMI) MBA (AKTU Lucknow)",
    experience: "23+ Years",

  },
  {
    id: "faculty-2",
    name: "Dr. Saba Rizwi",
    designation: "Co-founder/Director",
    title: "Co-founder/Director",
    bio: "Passionate about making mathematics accessible and engaging for all students.",
    image: img2,
    qualification: "Ph.D. in Educational Technology & Artificial Intelligence (JMI)",
    experience: "10+ Years",

  },
  {
    id: "faculty-3",
    name: "Mr. Mohd Saad",
    designation: "Head of  Computer Science & IT Industry",
    title: "Head of  Computer Science & IT Industry",
    bio: "Dedicated to building strong communication skills in every student.",
    image: img3,
    qualification: "M.A. in English Literature",
    experience: "Masters in Computer Application (JMI) M.Sc (Mathematics) O Level (NIELIT)",

  },
  {
    id: "faculty-4",
    name: "Mr. Shahid Khan",
    designation: "Head of Graphics Designer",
    title: "Head of Graphic Design and Animation",
    bio: "Focused on preparing students for a technology-driven future.",
    image: img4,
    qualification: "Diploma in Animation (MAAC Animation Academy) Professional 3D Designer & Graphics Expert",
    experience: "8+ Years Experience in the Graphic and Animation Industry",

  },
];

// ---------------------------------------------------------------------------
// TIMELINE SECTION
// ---------------------------------------------------------------------------
export const timeline = [
  { id: "timeline-2022", year: "2022", title: "Foundation", description: "Jamia Academy was established with a single classroom and big vision." },
  { id: "timeline-2023", year: "2023", title: "First Campus Expansion", description: "Opened our first dedicated academic campus." },
  { id: "timeline-2024", year: "2024", title: "Courses & Branch Expansion", description: "Added new courses and expanded our learning reach with a new branch." },
  { id: "timeline-2025", year: "2025", title: "AI & Machine Learning", description: "Introduced AI and Machine Learning while expanding our faculty and programs." },
  { id: "timeline-2026", year: "2026", title: "2000+ Alumni Milestone", description: "Celebrated over five thousand successful Certifications." },
];

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
};

export default aboutData;
