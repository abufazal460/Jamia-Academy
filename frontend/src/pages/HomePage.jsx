import { Helmet } from "react-helmet-async";
import Hero from "../features/home/components/hero/Hero";
import AccreditationSection from "../features/home/components/accreditations/AccreditationSection";
import FeatureSection from "../features/home/components/features/FeatureSection";
import FAQ from "../components/faq/FAQ";
import CourseGallerySection from "../features/home/components/CourseGallery/CourseGallerySection";
import WhyChooseUs from "../features/home/components/whyChooseUs/WhyChooseUs";
import Testimonials from "../features/home/components/testimonials/Testimonials";

const PAGE_TITLE = "Jamia Academy | Computer, Web Development, AI & Skill Courses in Delhi";
const PAGE_DESCRIPTION =
  "Jamia Academy, Jamia Nagar Delhi — offline, instructor-led computer, web development, data analytics, design, and AI courses with individual student attention.";
const CANONICAL_URL = "https://www.jamiaacademy.in/";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content="https://www.jamiaacademy.in/og/home.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://www.jamiaacademy.in/og/home.jpg" />
        <meta property="og:site_name" content="Jamia Academy" />
        <meta property="og:locale" content="en_IN" />
      </Helmet>
      <main className="w-full min-h-screen">
        <Hero />

        <AccreditationSection />

        <FeatureSection />

        <Testimonials />

        <WhyChooseUs />

        <FAQ />

        <CourseGallerySection />
      </main>
    </>
  );
};

export default HomePage;
