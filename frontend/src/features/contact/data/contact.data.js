// Jamia Academy — Contact Page Content
// Sab content yahin se aata hai, kahin bhi JSX mein hardcoded string nahi honi chahiye

// ---------------- HERO ----------------
export const contactHero = {
  icon: "GraduationCap",
  badge: "Contact Jamia Academy",
  headingPrefix: "Start Your Learning Journey With Us",
  highlightWord: "Learn. Grow. Achieve.",
  description:
    "Help students with course queries, admissions, certificates and career guidance.",
  buttons: {
    primary: { label: "Explore Courses", href: "/course" },
    secondary: { label: "Contact Support", href: "#contact-form" },
  },
  // Right-side visual — education themed floating cards
  visualCards: [
    { id: "card-cert", icon: "Award", label: "Certified Courses", accent: "teal" },
    { id: "card-grad", icon: "GraduationCap", label: "2000+ Certified", accent: "orange" },
    { id: "card-book", icon: "BookOpen", label: "Expert Curriculum", accent: "primary" },
    { id: "card-laptop", icon: "Laptop", label: "Offline Only", accent: "darkTeal" },
  ],
};


// ---------------- SOCIAL CONNECT ----------------
export const socialConnect = {
  heading: "Stay Connected With Jamia Academy",
  description: "Follow us for updates on admissions, events and student success stories.",
  links: [
    { id: "instagram", platform: "Instagram", icon: "Instagram", color: "hover:text-pink-600 hover:bg-pink-100", href: "https://instagram.com/jamiaacademy", ariaLabel: "Follow Jamia Academy on Instagram" },
    { id: "facebook", platform: "Facebook", icon: "Facebook", color: "hover:text-blue-600 hover:bg-blue-100", href: "https://facebook.com/jamiaacademy", ariaLabel: "Follow Jamia Academy on Facebook" },
    { id: "youtube", platform: "YouTube", icon: "Youtube", color: "hover:text-red-600 hover:bg-red-100", href: "https://youtube.com/@jamiaacademy", ariaLabel: "Subscribe to Jamia Academy on YouTube" },
    { id: "twitter", platform: "Twitter / X", icon: "Twitter", color: "hover:text-slate-900 hover:bg-slate-200", href: "https://x.com/jamiaacademy", ariaLabel: "Follow Jamia Academy on X" },
    { id: "whatsapp", platform: "WhatsApp", icon: "MessageCircle", color: "hover:text-emerald-600 hover:bg-emerald-100", href: "https://wa.me/919621555551", ariaLabel: "Message Jamia Academy on WhatsApp" },
  ],
};


// ---------------- COURSE OPTIONS ----------------
// Data-driven — dropdown JSX mein koi option hardcode nahi, sab yahin se aata hai
export const courseOptions = [
  { value: "basic-computer-course", label: "Basic Computer Course" },
  { value: "advanced-computer-course", label: "Advanced Computer Course" },
  { value: "computer-fundamentals", label: "Computer Fundamentals" },
  { value: "ms-office", label: "MS Office" },
  { value: "ms-word", label: "MS Word" },
  { value: "ms-excel", label: "MS Excel" },
  { value: "advanced-excel", label: "Advanced Excel" },
  { value: "ms-powerpoint", label: "MS PowerPoint" },
  { value: "internet-computer-applications", label: "Internet & Computer Applications" },
  { value: "typing", label: "Typing" },
  { value: "tally-prime", label: "Tally Prime" },
  { value: "tally-with-gst", label: "Tally with GST" },
  { value: "computerized-accounting", label: "Computerized Accounting" },
  { value: "financial-accounting", label: "Financial Accounting" },
  { value: "data-entry", label: "Data Entry" },
  { value: "python-programming", label: "Python Programming" },
  { value: "advanced-python", label: "Advanced Python" },
  { value: "python-for-data-analytics", label: "Python for Data Analytics" },
  { value: "data-analytics", label: "Data Analytics" },
  { value: "data-science", label: "Data Science" },
  { value: "artificial-intelligence", label: "Artificial Intelligence" },
  { value: "machine-learning", label: "Machine Learning" },
  { value: "ai-ml", label: "AI & ML" },
  { value: "generative-ai", label: "Generative AI" },
  { value: "web-development", label: "Web Development" },
  { value: "frontend-development", label: "Frontend Development" },
  { value: "backend-development", label: "Backend Development" },
  { value: "full-stack-development", label: "Full Stack Development" },
  { value: "mern-stack-development", label: "MERN Stack Development" },
  { value: "html-css", label: "HTML & CSS" },
  { value: "javascript", label: "JavaScript" },
  { value: "react-js", label: "React JS" },
  { value: "node-js", label: "Node.js" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "seo", label: "SEO" },
  { value: "social-media-marketing", label: "Social Media Marketing" },
  { value: "content-marketing", label: "Content Marketing" },
  { value: "graphic-design", label: "Graphic Design" },
  { value: "photoshop", label: "Photoshop" },
  { value: "coreldraw", label: "CorelDRAW" },
  { value: "canva-design", label: "Canva Design" },
  { value: "ui-ux-design", label: "UI/UX Design" },
  { value: "autocad", label: "AutoCAD" },
  { value: "autocad-2d-3d", label: "AutoCAD 2D & 3D" },
  { value: "revit-architecture", label: "Revit Architecture" },
  { value: "3d-design", label: "3D Design" },
  { value: "web-design", label: "Web Design" },
  { value: "computer-hardware-networking", label: "Computer Hardware & Networking" },
  { value: "cyber-security", label: "Cyber Security" },
  { value: "cloud-computing", label: "Cloud Computing" },
  { value: "git-github", label: "Git & GitHub" },
  { value: "spoken-english", label: "Spoken English" },
  { value: "other", label: "Other / Not Sure" },
];

// ---------------- COURSE INQUIRY FORM ----------------
export const formConfig = {
  heading: "Course Inquiry",
  description: "Fill the form below and our admission team will get back to you within 24 hours.",
  fields: [
    {
      id: "fullName",
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      required: true,
      validation: "name",
      errorMessage: "Please enter a valid name (min 2 characters).",
    },
    {
      id: "email",
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
      required: true,
      validation: "email",
      errorMessage: "Please enter a valid email address.",
    },
    {
      id: "phone",
      name: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "10-digit mobile number",
      required: true,
      validation: "phone",
      errorMessage: "Please enter a valid 10-digit mobile number.",
    },
  ],
  selectField: {
    id: "course",
    name: "course",
    label: "Select Course",
    placeholder: "Choose a course",
    required: true,
    errorMessage: "Please select a course.",
    options: courseOptions,
  },
  messageField: {
    id: "message",
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Tell us about your query...",
    required: true,
    validation: "message",
    errorMessage: "Message should be at least 10 characters long.",
  },
  submitButton: {
    idleText: "Submit Inquiry",
    loadingText: "Submitting...",
    successText: "Inquiry Sent!",
    errorText: "Failed, Try Again",
  },
};

// ---------------- WHY CONTACT SECTION ----------------
export const whyContactSection = {
  heading: "Why Contact Jamia Academy?",
  description: "We're here to support every step of your learning journey.",
  cards: [
    {
      id: "expert-faculty",
      icon: "Users",
      title: "Expert Faculty Support",
      description: "Get answers directly from experienced instructors and mentors.",
    },
    {
      id: "career-guidance",
      icon: "Compass",
      title: "Career Guidance",
      description: "Personalized guidance to help you choose the right learning path.",
    },
    {
      id: "certificate-assistance",
      icon: "Award",
      title: "Certificate Assistance",
      description: "Quick support for certificate issuance and verification.",
    },
    {
      id: "flexible-learning",
      icon: "Clock",
      title: "Flexible Learning",
      description: "Online and offline options that fit your schedule.",
    },
  ],
};

// ---------------- LOCATION / MAP SECTION ----------------
export const mapConfig = {
  heading: "Visit Jamia Academy",
 address: "A-29, above J&K Bank, Batla House, Jamia Nagar, Okhla, New Delhi 110025",
  embedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.131341055989!2d77.28248707495429!3d28.565818487108086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce38a6449cb73%3A0x51eeffb8f9b1108a!2sA-29%2C%20above%20J%26K%20Bank%2C%20Batla%20House%2C%20Jamia%20Nagar%2C%20Okhla%2C%20New%20Delhi%2C%20Delhi%20110025!5e0!3m2!1sen!2sin!4v1785414693012!5m2!1sen!2sin",
  ctaLabel: "Get Directions",
 ctaHref: "https://maps.google.com/?q=A-29+Batla+House+Jamia+Nagar+Okhla+New+Delhi",
  workingHours: [
    { day: "Monday – Friday", time: "9:00 AM – 9:00 PM" },
    { day: "Saturday", time: "Closed" },
    { day: "Sunday", time: "Closed" },
  ],
};
