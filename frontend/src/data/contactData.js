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
    { id: "card-grad", icon: "GraduationCap", label: "5000+ Graduates", accent: "orange" },
    { id: "card-book", icon: "BookOpen", label: "Expert Curriculum", accent: "primary" },
    { id: "card-laptop", icon: "Laptop", label: "Online & Offline", accent: "darkTeal" },
  ],
};

// ---------------- CONTACT INFO CARDS ----------------
export const contactInfoCards = [
  {
    id: "admission-support",
    icon: "GraduationCap",
    title: "Admission Support",
    description: "Get guidance on courses, eligibility and enrollment process.",
    actions: [
      { type: "call", label: "Call Admissions", value: "+919876543210", href: "tel:+919876543210" },
      { type: "whatsapp", label: "WhatsApp Us", value: "+919876543210", href: "https://wa.me/919876543210" },
    ],
    ariaLabel: "Admission support contact card",
  },
  {
    id: "call-us",
    icon: "Phone",
    title: "Call Us",
    description: "Reach our team directly for quick assistance.",
    numbers: [
      { id: "primary-number", label: "Primary", value: "+91 98765 43210", raw: "+919876543210" },
      { id: "secondary-number", label: "Alternate", value: "+91 91234 56789", raw: "+919123456789" },
    ],
    actions: [
      { type: "call", label: "Call Now", href: "tel:+919876543210" },
      { type: "copy", label: "Copy Number" },
    ],
    ariaLabel: "Call us contact card",
  },
  {
    id: "visit-campus",
    icon: "MapPin",
    title: "Visit Campus",
    description: "Jamia Academy Campus, Sector 21, Gurugram, Haryana, India",
    actions: [
      { type: "map", label: "Get Directions", href: "https://maps.google.com/?q=Jamia+Academy+Gurugram" },
    ],
    ariaLabel: "Visit campus contact card",
  },
];

// ---------------- SOCIAL CONNECT ----------------
export const socialConnect = {
  heading: "Stay Connected With Jamia Academy",
  description: "Follow us for updates on admissions, events and student success stories.",
  links: [
    { id: "instagram", platform: "Instagram", icon: "Instagram", href: "https://instagram.com/jamiaacademy", ariaLabel: "Follow Jamia Academy on Instagram" },
    { id: "facebook", platform: "Facebook", icon: "Facebook", href: "https://facebook.com/jamiaacademy", ariaLabel: "Follow Jamia Academy on Facebook" },
    { id: "youtube", platform: "YouTube", icon: "Youtube", href: "https://youtube.com/@jamiaacademy", ariaLabel: "Subscribe to Jamia Academy on YouTube" },
    { id: "linkedin", platform: "LinkedIn", icon: "Linkedin", href: "https://linkedin.com/company/jamiaacademy", ariaLabel: "Follow Jamia Academy on LinkedIn" },
    { id: "twitter", platform: "Twitter / X", icon: "Twitter", href: "https://x.com/jamiaacademy", ariaLabel: "Follow Jamia Academy on X" },
    { id: "whatsapp", platform: "WhatsApp", icon: "MessageCircle", href: "https://wa.me/919876543210", ariaLabel: "Message Jamia Academy on WhatsApp" },
  ],
};

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
    options: [
      { value: "web-development", label: "Web Development" },
      { value: "data-science", label: "Data Science" },
      { value: "ui-ux-design", label: "UI/UX Design" },
      { value: "digital-marketing", label: "Digital Marketing" },
      { value: "spoken-english", label: "Spoken English" },
      { value: "other", label: "Other / Not Sure" },
    ],
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
