import img1 from "../../../assets/images/home/hero/boys.png"
import img2 from "../../../assets/images/home/hero/girls.png"

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

];