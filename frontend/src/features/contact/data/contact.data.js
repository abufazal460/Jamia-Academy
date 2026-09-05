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
    { id: "twitter", platform: "Twitter / X", icon: "Twitter", color: "hover:text-slate-900 hover:bg-slate-200", href: "https://x.com/AcademyJamia", ariaLabel: "Follow Jamia Academy on X" },
    { id: "whatsapp", platform: "WhatsApp", icon: "MessageCircle", color: "hover:text-emerald-600 hover:bg-emerald-100", href: "https://wa.me/919621555551", ariaLabel: "Message Jamia Academy on WhatsApp" },
  ],
};

// ---------------- COURSE OPTIONS ----------------
export const courseOptions = [
  { value: "advanced-computer-concepts", label: "Advanced Computer Concepts" },
  { value: "basic-computer-concepts", label: "Basic Computer Concepts" },
  { value: "ms-office", label: "MS Office" },
  { value: "ms-office-with-ai-automation", label: "MS Office with AI Automation" },
  { value: "advance-excel-with-ai", label: "Advanced Excel with AI" },
  { value: "tally-prime-with-gst-tds-e-way-bill", label: "Tally Prime with GST, TDS & E-Way Bill" },
  { value: "tally-prime-with-ai-automation", label: "Tally Prime with AI Automation" },
  { value: "diploma-in-financial-accounting-dfa", label: "Diploma in Financial Accounting (DFA)" },
  { value: "advanced-diploma-in-financial-accounting-adfa", label: "Advanced Diploma in Financial Accounting (ADFA)" },
  { value: "diploma-in-computer-applications", label: "Diploma in Computer Applications" },
  { value: "diploma-in-data-analytics", label: "Diploma in Data Analytics" },
  { value: "diploma-in-data-science", label: "Diploma in Data Science" },
  { value: "full-stack-web-development", label: "Full Stack Web Development" },
  { value: "python-basic-to-advanced", label: "Python (Basic to Advanced)" },
  { value: "java-basic-to-advanced", label: "Java (Basic to Advanced)" },
  { value: "java-with-dsa", label: "Java with DSA" },
  { value: "c-cpp", label: "C & C++" },
  { value: "c-cpp-with-dsa", label: "C & C++ with DSA" },
  { value: "artificial-intelligence-machine-learning", label: "Artificial Intelligence & Machine Learning (AI & ML)" },
  { value: "cyber-security-ethical-hacking-network-security", label: "Cyber Security, Ethical Hacking, Network Security" },
  { value: "wordpress-basic-to-advanced", label: "WordPress (Basic to Advanced)" },
  { value: "autocad-2d-3d-mep-interior-architecture-civil-hvac", label: "AutoCAD 2D & 3D - MEP, Interior, Architecture, Civil, HVAC" },
  { value: "autocad-revit-interior-civil-mep-architecture", label: "AutoCAD + Revit (Interior, Civil, MEP, Architecture)" },
  { value: "diploma-in-interior-design", label: "Diploma in Interior Design" },
  { value: "diploma-in-graphic-design-with-ai-automation", label: "Diploma in Graphic Design with AI Automation" },
  { value: "video-editing-with-adobe-photoshop", label: "Video Editing with Adobe Photoshop" },
  { value: "digital-marketing-for-beginners", label: "Digital Marketing (For Beginners)" },
  { value: "advanced-diploma-in-interior-design", label: "Advanced Diploma in Interior Design" },
  { value: "autocad-sketchup-vray-interior-architecture", label: "AutoCAD with SketchUp + V-Ray (Interior, Architecture)" },
  { value: "autocad-3ds-max-vray-interior-architecture", label: "AutoCAD with 3ds Max + V-Ray (Interior, Architecture)" },
  { value: "certificate-in-graphic-design", label: "Certificate in Graphic Design" },
  { value: "adobe-animate-with-adobe-illustrator", label: "Adobe Animate with Adobe Illustrator" },
  { value: "adobe-animation-2d", label: "Adobe Animation 2D" },
  { value: "python-basic", label: "Python (Basic)" },
  { value: "cloud-computing-for-beginners", label: "Cloud Computing (For Beginners)" },
  { value: "wordpress-basic-for-beginners", label: "WordPress (Basic for Beginners)" },
  { value: "app-development-kotlin-or-java", label: "App Development (Kotlin or Java)" },
  { value: "mern-stack-web-development", label: "MERN Stack Web Development" },
  { value: "power-bi", label: "Power BI" },
  { value: "certificate-in-sql-advanced", label: "Certificate in SQL (Advanced)" },
  { value: "r-language", label: "R Language" },
  { value: "r-language-advanced", label: "R Language Advanced" },
  { value: "ms-azure", label: "MS Azure" },
  { value: "advanced-azure", label: "Advanced Azure" },
  { value: "software-testing", label: "Software Testing" },
  { value: "gen-ai-prompt-engineering", label: "Gen AI & Prompt Engineering" },
  { value: "spss", label: "SPSS" },
  { value: "nvivo", label: "NVivo" },
  { value: "pcs-sem", label: "PCS - SEM" },
  { value: "reels-shooting", label: "Reels Shooting" },
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
