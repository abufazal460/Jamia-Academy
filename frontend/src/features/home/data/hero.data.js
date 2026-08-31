// Hero slider ka poora content yahan se control hota hai
// Content team bina UI/JSX touch kiye yahan se sab kuch badal sakti hai
import img1 from "../../../assets/images/home/hero/boys.png"
import img2 from "../../../assets/images/home/hero/girls.png"
// import img3 from "../../../assets/images/gallery/classroom/3.jpg"
// import img4 from "../../../assets/images/gallery/classroom/4.jpg"
export const heroSlides = [
  {
    id: "hero-slide-1",
    image: img1,
    alt: "Students learning to code together in Jamia Academy's computer lab",
    eyebrow: "Learn. Create. Grow.",
    title: "Build Your Future With Practical Tech Skills",
    description:
      "Explore career-focused computer courses designed by industry experts, taught with real hands-on projects.",
    primaryAction: {
      label: "Explore Courses",
      href: "/course",
    },
    secondaryAction: {
      label: "Verify Certificate",
      href: "/certificate",
    },
  },
  {
    id: "hero-slide-2",
    image: img2,
    alt: "Jamia Academy graduates celebrating on convocation day",
    eyebrow: "Trusted Since Day One",
    title: "Certified Learning That Actually Gets You Hired",
    description:
      "Join thousands of students who turned classroom skills into real jobs with our industry-recognized certification.",
    primaryAction: {
      label: "View Certifications",
      href: "/certificate",
    },
  },
  // {
  //   id: "hero-slide-3",
  //   image: img3,
  //   alt: "Instructor mentoring a small group of students at Jamia Academy",
  //   eyebrow: "Small Batches, Real Attention",
  //   title: "Mentorship That Feels Personal, Not Crowded",
  //   description:
  //     "Our instructors work closely with every student — doubt-clearing sessions, project reviews, and career guidance included.",
  //   primaryAction: {
  //     label: "Meet Our Instructors",
  //     href: "/about",
  //   },
  //   secondaryAction: {
  //     label: "Contact Us",
  //     href: "/contact",
  //   },
  // },
  // {
  //   id: "hero-slide-4",
  //   image: img4,
  //   alt: "Jamia Academy campus building exterior view",
  //   eyebrow: "A Campus Built For Learning",
  //   title: "Modern Classrooms, Real-World Curriculum",
  //   description:
  //     "State-of-the-art labs and an updated curriculum that keeps pace with what the tech industry actually needs.",
  //   primaryAction: {
  //     label: "Take A Tour",
  //     href: "/about",
  //   },
  // },
];