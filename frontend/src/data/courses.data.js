// src/data/courses.data.js
//
// Ye file Jamia Academy ke poore Course Section ka SINGLE SOURCE OF TRUTH hai.
// UI (card, modal, search, filters, WhatsApp button) sirf is data ko READ karega —
// kabhi bhi course ki koi bhi info JSX ke andar hardcode nahi hogi.
//
// Naya course add karna ho to sirf ek naya object is array me push karo —
// koi component code change karne ki zaroorat nahi padegi.

export const coursesData = [
  {
    // Basic Information
    // id -> internal unique key (React keys, modal lookup, WhatsApp message)
    // slug -> URL-friendly identifier (future course detail page / routing)
    id: "course-001",
    slug: "web-development",
    title: "Web Development",
    shortTitle: "Web Dev",
    description:
      "Learn to design and build modern, responsive websites from scratch using HTML, CSS, and JavaScript.",

    // Image System
    // thumbnail -> card me use hoga (chhota, fast-loading)
    // hero -> modal ke andar bada banner image ke liye
    image: {
      thumbnail: "/images/courses/web-development/thumbnail.webp",
      hero: "/images/courses/web-development/hero.webp",
    },

    // Batch System
    // Ye card pe image ke neeche, right side, title ke upar dikhega
    batch: {
      name: "Batch 2026",
      status: "Admissions Open",
      color: "green",
    },

    // Category System — filter ke liye array (ek course multiple category me fit ho sakta hai)
    category: ["Web Development", "Programming"],

    // Duration System — plain text nahi, object hai taaki future me
    // "3-6 months" jaisa range filter bhi easily ban sake
    duration: {
      value: "4",
      unit: "Months",
    },

    // Level System — poora styling info yahin data me hai,
    // taaki UI ko kahin aur lookup na karna pade
    level: {
      name: "Beginner",
      icon: "seedling",
      color: "green",
      background: "linear-gradient(135deg, #14532d 0%, #16a34a 100%)",
    },

    // Search System Support
    keywords: [
      "web development",
      "html",
      "css",
      "javascript",
      "frontend",
      "website design",
    ],
    hinglishKeywords: [
      "website banana",
      "web banana sikhna",
      "coding sikhna",
      "website design sikhna",
    ],

    // Course Details System — modal khulne par consume hota hai,
    // isliye card render path halka rehta hai
    details: {
      overview:
        "A foundation-level program covering the core building blocks of the modern web, taking you from a blank page to fully responsive, deployed websites.",
      modules: [
        {
          title: "HTML & Semantic Structure",
          topics: ["Tags & Elements", "Forms", "Semantic HTML", "Accessibility Basics"],
        },
        {
          title: "CSS & Responsive Design",
          topics: ["Flexbox", "Grid", "Media Queries", "Animations"],
        },
        {
          title: "JavaScript Fundamentals",
          topics: ["DOM Manipulation", "Events", "ES6+", "APIs & Fetch"],
        },
        {
          title: "Deployment & Tools",
          topics: ["Git & GitHub", "Hosting", "Chrome DevTools"],
        },
      ],
      skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Git"],
      tools: ["VS Code", "Chrome DevTools", "GitHub"],
      projects: ["Portfolio Website", "Landing Page Clone", "Interactive Form App"],
      certificate: "Jamia Academy Certificate of Completion — Web Development",
      careerOptions: ["Junior Web Developer", "Frontend Trainee", "Freelance Web Designer"],
    },

    // Fees & Eligibility
    fees: {
      amount: "12000",
      currency: "INR",
      type: "course",
    },
    eligibility: ["10th Pass", "Basic Computer Knowledge"],

    // Theme System — har course ka apna visual identity,
    // card background, border animation aur glow sab isi se drive hoga
    theme: {
      primary: "#16a34a",
      secondary: "#4ade80",
      gradient: "linear-gradient(135deg, #052e16 0%, #14532d 50%, #16a34a 100%)",
      glow: "0 0 40px rgba(22, 163, 74, 0.45)",
      borderColors: ["#16a34a", "#4ade80", "#bbf7d0"],
    },

    // WhatsApp System — sirf data, message-building logic UI/utils layer me hoga
    whatsapp: {
      enabled: true,
      messageTemplate:
        "Hi Jamia Academy, I want to enroll in {title} ({batch}). Duration: {duration}, Level: {level}, Fees: {fees}. Eligibility: {eligibility}.",
    },

    // SEO Support
    seo: {
      title: "Web Development Course 2026 | Jamia Academy",
      description:
        "Join Jamia Academy's Web Development course and learn HTML, CSS & JavaScript with hands-on projects.",
      keywords: ["web development course", "html css js course", "jamia academy web dev"],
    },
  },

  {
    id: "course-002",
    slug: "mern-stack-development",
    title: "MERN Stack Development",
    shortTitle: "MERN Stack",
    description:
      "Master full stack development using MongoDB, Express, React, and Node.js to build production-grade applications.",
    image: {
      thumbnail: "/images/courses/mern-stack/thumbnail.webp",
      hero: "/images/courses/mern-stack/hero.webp",
    },
    batch: {
      name: "Batch 2026",
      status: "Admissions Open",
      color: "green",
    },
    category: ["Web Development", "Programming", "Full Stack"],
    duration: {
      value: "6",
      unit: "Months",
    },
    level: {
      name: "Intermediate",
      icon: "layers",
      color: "yellow",
      background: "linear-gradient(135deg, #713f12 0%, #eab308 100%)",
    },
    keywords: ["mern", "full stack", "react", "node", "express", "mongodb"],
    hinglishKeywords: [
      "full stack sikhna",
      "web banana",
      "react node sikhna",
      "job wala course",
    ],
    details: {
      overview:
        "A comprehensive full stack program where you build and deploy real-world applications using the MERN stack, from database design to production hosting.",
      modules: [
        { title: "MongoDB", topics: ["Schema Design", "Aggregation", "Indexing"] },
        { title: "Express & Node.js", topics: ["REST APIs", "Middleware", "Authentication"] },
        { title: "React", topics: ["Hooks", "State Management", "React Router"] },
        { title: "Deployment", topics: ["CI/CD Basics", "Cloud Hosting", "Environment Config"] },
      ],
      skills: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs"],
      tools: ["VS Code", "Postman", "MongoDB Atlas", "GitHub"],
      projects: ["E-commerce App", "Job Portal", "Real-time Chat App"],
      certificate: "Jamia Academy Certificate of Completion — MERN Stack Development",
      careerOptions: ["Full Stack Developer", "Backend Developer", "Frontend Developer"],
    },
    fees: {
      amount: "35000",
      currency: "INR",
      type: "course",
    },
    eligibility: ["12th Pass", "Basic Programming Knowledge"],
    theme: {
      primary: "#eab308",
      secondary: "#facc15",
      gradient: "linear-gradient(135deg, #422006 0%, #713f12 50%, #eab308 100%)",
      glow: "0 0 40px rgba(234, 179, 8, 0.45)",
      borderColors: ["#eab308", "#facc15", "#fef08a"],
    },
    whatsapp: {
      enabled: true,
      messageTemplate:
        "Hi Jamia Academy, I want to enroll in {title} ({batch}). Duration: {duration}, Level: {level}, Fees: {fees}. Eligibility: {eligibility}.",
    },
    seo: {
      title: "MERN Stack Development Course 2026 | Jamia Academy",
      description:
        "Become a full stack developer with Jamia Academy's MERN Stack course — MongoDB, Express, React & Node.js.",
      keywords: ["mern stack course", "full stack course", "jamia academy mern"],
    },
  },

  {
    id: "course-003",
    slug: "python-programming",
    title: "Python Programming",
    shortTitle: "Python",
    description:
      "Build a strong programming foundation with Python — from syntax basics to real-world automation and projects.",
    image: {
      thumbnail: "/images/courses/python-programming/thumbnail.webp",
      hero: "/images/courses/python-programming/hero.webp",
    },
    batch: {
      name: "Batch 2026",
      status: "Admissions Open",
      color: "green",
    },
    category: ["Programming"],
    duration: {
      value: "3",
      unit: "Months",
    },
    level: {
      name: "Beginner",
      icon: "seedling",
      color: "green",
      background: "linear-gradient(135deg, #14532d 0%, #16a34a 100%)",
    },
    keywords: ["python", "programming", "coding", "automation", "scripting"],
    hinglishKeywords: ["python sikhna hai", "coding sikhna", "programming sikhna"],
    details: {
      overview:
        "A beginner-friendly program that builds strong programming fundamentals using Python, one of the most in-demand languages today.",
      modules: [
        { title: "Python Basics", topics: ["Variables", "Data Types", "Loops", "Functions"] },
        { title: "Data Structures", topics: ["Lists", "Dictionaries", "Tuples", "Sets"] },
        { title: "OOP in Python", topics: ["Classes", "Objects", "Inheritance"] },
        { title: "Mini Projects", topics: ["File Handling", "Automation Scripts"] },
      ],
      skills: ["Python", "Problem Solving", "OOP", "Automation Basics"],
      tools: ["VS Code", "Jupyter Notebook", "GitHub"],
      projects: ["To-Do App", "Expense Tracker", "Web Scraper"],
      certificate: "Jamia Academy Certificate of Completion — Python Programming",
      careerOptions: ["Junior Python Developer", "Automation Trainee"],
    },
    fees: {
      amount: "9000",
      currency: "INR",
      type: "course",
    },
    eligibility: ["10th Pass"],
    theme: {
      primary: "#16a34a",
      secondary: "#4ade80",
      gradient: "linear-gradient(135deg, #052e16 0%, #14532d 50%, #16a34a 100%)",
      glow: "0 0 40px rgba(22, 163, 74, 0.45)",
      borderColors: ["#16a34a", "#4ade80", "#bbf7d0"],
    },
    whatsapp: {
      enabled: true,
      messageTemplate:
        "Hi Jamia Academy, I want to enroll in {title} ({batch}). Duration: {duration}, Level: {level}, Fees: {fees}. Eligibility: {eligibility}.",
    },
    seo: {
      title: "Python Programming Course 2026 | Jamia Academy",
      description:
        "Learn Python programming from scratch with Jamia Academy — beginner-friendly, project-based learning.",
      keywords: ["python course", "learn python", "jamia academy python"],
    },
  },

  {
    id: "course-004",
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    shortTitle: "AI & ML",
    description:
      "Dive into artificial intelligence and machine learning, building models that learn from real-world data.",
    image: {
      thumbnail: "/images/courses/ai-machine-learning/thumbnail.webp",
      hero: "/images/courses/ai-machine-learning/hero.webp",
    },
    batch: {
      name: "Batch 2026",
      status: "Filling Fast",
      color: "orange",
    },
    category: ["Data", "Programming", "AI"],
    duration: {
      value: "6",
      unit: "Months",
    },
    level: {
      name: "Advanced",
      icon: "crown",
      color: "red",
      background: "linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)",
    },
    keywords: ["ai", "machine learning", "artificial intelligence", "deep learning", "python"],
    hinglishKeywords: ["ai sikhna hai", "machine learning sikhna", "future wala course"],
    details: {
      overview:
        "An advanced program covering machine learning algorithms, neural networks, and real-world AI model deployment.",
      modules: [
        { title: "Python for ML", topics: ["NumPy", "Pandas", "Data Cleaning"] },
        { title: "Machine Learning", topics: ["Regression", "Classification", "Clustering"] },
        { title: "Deep Learning", topics: ["Neural Networks", "CNNs", "RNNs"] },
        { title: "Deployment", topics: ["Model Serving", "APIs for ML Models"] },
      ],
      skills: ["Python", "Machine Learning", "Deep Learning", "Data Analysis"],
      tools: ["Jupyter Notebook", "TensorFlow", "Scikit-learn", "Pandas"],
      projects: ["Spam Classifier", "Image Recognition Model", "Recommendation System"],
      certificate: "Jamia Academy Certificate of Completion — AI & Machine Learning",
      careerOptions: ["ML Engineer Trainee", "Data Analyst", "AI Research Assistant"],
    },
    fees: {
      amount: "45000",
      currency: "INR",
      type: "course",
    },
    eligibility: ["12th Pass", "Basic Python Knowledge"],
    theme: {
      primary: "#dc2626",
      secondary: "#f87171",
      gradient: "linear-gradient(135deg, #450a0a 0%, #7f1d1d 50%, #dc2626 100%)",
      glow: "0 0 40px rgba(220, 38, 38, 0.45)",
      borderColors: ["#dc2626", "#f87171", "#fecaca"],
    },
    whatsapp: {
      enabled: true,
      messageTemplate:
        "Hi Jamia Academy, I want to enroll in {title} ({batch}). Duration: {duration}, Level: {level}, Fees: {fees}. Eligibility: {eligibility}.",
    },
    seo: {
      title: "AI & Machine Learning Course 2026 | Jamia Academy",
      description:
        "Master AI & Machine Learning with Jamia Academy — hands-on projects in Python, ML and Deep Learning.",
      keywords: ["ai course", "machine learning course", "jamia academy ai"],
    },
  },

  {
    id: "course-005",
    slug: "data-science",
    title: "Data Science",
    shortTitle: "Data Science",
    description:
      "Learn to analyze, visualize, and extract insights from data using Python, statistics, and modern data tools.",
    image: {
      thumbnail: "/images/courses/data-science/thumbnail.webp",
      hero: "/images/courses/data-science/hero.webp",
    },
    batch: {
      name: "Batch 2026",
      status: "Admissions Open",
      color: "green",
    },
    category: ["Data", "Programming"],
    duration: {
      value: "5",
      unit: "Months",
    },
    level: {
      name: "Intermediate",
      icon: "layers",
      color: "yellow",
      background: "linear-gradient(135deg, #713f12 0%, #eab308 100%)",
    },
    keywords: ["data science", "data analysis", "statistics", "python", "visualization"],
    hinglishKeywords: ["data science sikhna", "data analysis sikhna", "job wala course"],
    details: {
      overview:
        "A hands-on program in data science covering statistics, data wrangling, visualization, and predictive modeling.",
      modules: [
        { title: "Statistics Foundations", topics: ["Probability", "Distributions", "Hypothesis Testing"] },
        { title: "Data Wrangling", topics: ["Pandas", "Data Cleaning", "Feature Engineering"] },
        { title: "Data Visualization", topics: ["Matplotlib", "Seaborn", "Power BI Basics"] },
        { title: "Predictive Modeling", topics: ["Regression", "Classification"] },
      ],
      skills: ["Python", "Statistics", "Data Visualization", "SQL"],
      tools: ["Jupyter Notebook", "Pandas", "Power BI", "SQL"],
      projects: ["Sales Data Dashboard", "Customer Churn Analysis", "Stock Price Trend Analysis"],
      certificate: "Jamia Academy Certificate of Completion — Data Science",
      careerOptions: ["Data Analyst", "Junior Data Scientist", "BI Analyst"],
    },
    fees: {
      amount: "32000",
      currency: "INR",
      type: "course",
    },
    eligibility: ["12th Pass", "Basic Math Knowledge"],
    theme: {
      primary: "#eab308",
      secondary: "#facc15",
      gradient: "linear-gradient(135deg, #422006 0%, #713f12 50%, #eab308 100%)",
      glow: "0 0 40px rgba(234, 179, 8, 0.45)",
      borderColors: ["#eab308", "#facc15", "#fef08a"],
    },
    whatsapp: {
      enabled: true,
      messageTemplate:
        "Hi Jamia Academy, I want to enroll in {title} ({batch}). Duration: {duration}, Level: {level}, Fees: {fees}. Eligibility: {eligibility}.",
    },
    seo: {
      title: "Data Science Course 2026 | Jamia Academy",
      description:
        "Learn Data Science with Jamia Academy — Python, statistics, visualization and predictive modeling.",
      keywords: ["data science course", "learn data science", "jamia academy data science"],
    },
  },

  {
    id: "course-006",
    slug: "cyber-security",
    title: "Cyber Security",
    shortTitle: "Cyber Security",
    description:
      "Learn to protect systems and networks from cyber threats with hands-on ethical hacking and security practices.",
    image: {
      thumbnail: "/images/courses/cyber-security/thumbnail.webp",
      hero: "/images/courses/cyber-security/hero.webp",
    },
    batch: {
      name: "Batch 2026",
      status: "Admissions Open",
      color: "green",
    },
    category: ["Security", "Programming"],
    duration: {
      value: "5",
      unit: "Months",
    },
    level: {
      name: "Advanced",
      icon: "crown",
      color: "red",
      background: "linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)",
    },
    keywords: ["cyber security", "ethical hacking", "network security", "penetration testing"],
    hinglishKeywords: ["hacking sikhna", "security sikhna", "cyber security sikhna hai"],
    details: {
      overview:
        "An advanced, hands-on program covering network security, ethical hacking techniques, and defense strategies against real-world cyber threats.",
      modules: [
        { title: "Networking Fundamentals", topics: ["TCP/IP", "Firewalls", "VPNs"] },
        { title: "Ethical Hacking", topics: ["Reconnaissance", "Vulnerability Scanning", "Exploitation Basics"] },
        { title: "Web Security", topics: ["OWASP Top 10", "SQL Injection", "XSS"] },
        { title: "Security Operations", topics: ["Incident Response", "Security Auditing"] },
      ],
      skills: ["Network Security", "Ethical Hacking", "Risk Assessment"],
      tools: ["Kali Linux", "Wireshark", "Burp Suite", "Nmap"],
      projects: ["Network Vulnerability Report", "Web App Penetration Test", "Security Audit Report"],
      certificate: "Jamia Academy Certificate of Completion — Cyber Security",
      careerOptions: ["Security Analyst Trainee", "SOC Analyst", "Junior Penetration Tester"],
    },
    fees: {
      amount: "38000",
      currency: "INR",
      type: "course",
    },
    eligibility: ["12th Pass", "Basic Networking Knowledge"],
    theme: {
      primary: "#dc2626",
      secondary: "#f87171",
      gradient: "linear-gradient(135deg, #450a0a 0%, #7f1d1d 50%, #dc2626 100%)",
      glow: "0 0 40px rgba(220, 38, 38, 0.45)",
      borderColors: ["#dc2626", "#f87171", "#fecaca"],
    },
    whatsapp: {
      enabled: true,
      messageTemplate:
        "Hi Jamia Academy, I want to enroll in {title} ({batch}). Duration: {duration}, Level: {level}, Fees: {fees}. Eligibility: {eligibility}.",
    },
    seo: {
      title: "Cyber Security Course 2026 | Jamia Academy",
      description:
        "Learn ethical hacking and cyber security with Jamia Academy — hands-on labs and real-world tools.",
      keywords: ["cyber security course", "ethical hacking course", "jamia academy cyber security"],
    },
  },

  {
    id: "course-007",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortTitle: "UI/UX",
    description:
      "Learn to design intuitive, beautiful digital products through user research, wireframing, and prototyping.",
    image: {
      thumbnail: "/images/courses/ui-ux-design/thumbnail.webp",
      hero: "/images/courses/ui-ux-design/hero.webp",
    },
    batch: {
      name: "Batch 2026",
      status: "Admissions Open",
      color: "green",
    },
    category: ["Design"],
    duration: {
      value: "3",
      unit: "Months",
    },
    level: {
      name: "Beginner",
      icon: "seedling",
      color: "green",
      background: "linear-gradient(135deg, #14532d 0%, #16a34a 100%)",
    },
    keywords: ["ui design", "ux design", "figma", "product design", "wireframing"],
    hinglishKeywords: ["design sikhna", "ui ux sikhna hai", "figma sikhna"],
    details: {
      overview:
        "A design-focused program covering the full UI/UX process — from user research to high-fidelity, interactive prototypes.",
      modules: [
        { title: "Design Fundamentals", topics: ["Color Theory", "Typography", "Layout"] },
        { title: "User Research", topics: ["Personas", "User Journeys", "Usability Testing"] },
        { title: "Wireframing & Prototyping", topics: ["Low-fi Wireframes", "Figma Prototyping"] },
        { title: "Design Systems", topics: ["Components", "Design Tokens"] },
      ],
      skills: ["UI Design", "UX Research", "Prototyping", "Figma"],
      tools: ["Figma", "Adobe XD"],
      projects: ["Mobile App Redesign", "E-commerce UX Case Study", "Design System"],
      certificate: "Jamia Academy Certificate of Completion — UI/UX Design",
      careerOptions: ["Junior UI Designer", "UX Design Trainee", "Product Design Intern"],
    },
    fees: {
      amount: "18000",
      currency: "INR",
      type: "course",
    },
    eligibility: ["12th Pass"],
    theme: {
      primary: "#16a34a",
      secondary: "#4ade80",
      gradient: "linear-gradient(135deg, #052e16 0%, #14532d 50%, #16a34a 100%)",
      glow: "0 0 40px rgba(22, 163, 74, 0.45)",
      borderColors: ["#16a34a", "#4ade80", "#bbf7d0"],
    },
    whatsapp: {
      enabled: true,
      messageTemplate:
        "Hi Jamia Academy, I want to enroll in {title} ({batch}). Duration: {duration}, Level: {level}, Fees: {fees}. Eligibility: {eligibility}.",
    },
    seo: {
      title: "UI/UX Design Course 2026 | Jamia Academy",
      description:
        "Learn UI/UX Design with Jamia Academy — user research, wireframing and Figma prototyping.",
      keywords: ["ui ux course", "figma course", "jamia academy design"],
    },
  },

  {
    id: "course-008",
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortTitle: "Digital Marketing",
    description:
      "Master SEO, social media, and paid advertising to grow brands and businesses online.",
    image: {
      thumbnail: "/images/courses/digital-marketing/thumbnail.webp",
      hero: "/images/courses/digital-marketing/hero.webp",
    },
    batch: {
      name: "Batch 2026",
      status: "Admissions Open",
      color: "green",
    },
    category: ["Marketing"],
    duration: {
      value: "3",
      unit: "Months",
    },
    level: {
      name: "Beginner",
      icon: "seedling",
      color: "green",
      background: "linear-gradient(135deg, #14532d 0%, #16a34a 100%)",
    },
    keywords: ["digital marketing", "seo", "social media marketing", "google ads"],
    hinglishKeywords: ["marketing sikhna", "digital marketing sikhna hai", "seo sikhna"],
    details: {
      overview:
        "A practical program covering SEO, social media marketing, and paid ad campaigns to help you market products and services online.",
      modules: [
        { title: "SEO Fundamentals", topics: ["On-page SEO", "Off-page SEO", "Keyword Research"] },
        { title: "Social Media Marketing", topics: ["Content Strategy", "Instagram & Facebook Ads"] },
        { title: "Google Ads", topics: ["Search Ads", "Display Ads", "Campaign Analytics"] },
        { title: "Analytics", topics: ["Google Analytics", "Performance Reporting"] },
      ],
      skills: ["SEO", "Social Media Marketing", "Google Ads", "Analytics"],
      tools: ["Google Ads", "Google Analytics", "Meta Business Suite"],
      projects: ["SEO Audit Report", "Social Media Campaign", "Ad Campaign Case Study"],
      certificate: "Jamia Academy Certificate of Completion — Digital Marketing",
      careerOptions: ["Digital Marketing Executive", "SEO Trainee", "Social Media Executive"],
    },
    fees: {
      amount: "15000",
      currency: "INR",
      type: "course",
    },
    eligibility: ["12th Pass"],
    theme: {
      primary: "#16a34a",
      secondary: "#4ade80",
      gradient: "linear-gradient(135deg, #052e16 0%, #14532d 50%, #16a34a 100%)",
      glow: "0 0 40px rgba(22, 163, 74, 0.45)",
      borderColors: ["#16a34a", "#4ade80", "#bbf7d0"],
    },
    whatsapp: {
      enabled: true,
      messageTemplate:
        "Hi Jamia Academy, I want to enroll in {title} ({batch}). Duration: {duration}, Level: {level}, Fees: {fees}. Eligibility: {eligibility}.",
    },
    seo: {
      title: "Digital Marketing Course 2026 | Jamia Academy",
      description:
        "Learn Digital Marketing with Jamia Academy — SEO, social media and Google Ads, hands-on.",
      keywords: ["digital marketing course", "seo course", "jamia academy digital marketing"],
    },
  },
];

// Note: yeh array abhi static hai, lekin structure aisa rakha gaya hai ki
// future me backend API se fetch kiya gaya JSON isi shape me easily map ho sake —
// UI components ko sirf "coursesData" ka source badalna hoga, koi component
// dobara likhne ki zaroorat nahi padegi.
