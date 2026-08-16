import { Helmet } from "react-helmet-async";
import Hero from "../components/home/hero/Hero";
import AccreditationSection from "../components/home/AccreditationSection/AccreditationSection";
import FeatureSection from "../components/home/FeatureSection/FeatureSection";
import FAQ from "../components/faq/FAQ";
import CourseGallerySection from "../components/home/CourseGallery/CourseGallerySection";
import WhyChooseUs from "../components/home/whyChooseUs/WhyChooseUs";
import Testimonials from "../components/home/testimonials";

const PAGE_TITLE = "Jamia Academy | Computer, Web Development, AI & Skill Courses in Delhi";
const PAGE_DESCRIPTION =
  "Jamia Academy, Jamia Nagar Delhi — offline, instructor-led computer, web development, data analytics, design, and AI courses with individual student attention.";
const CANONICAL_URL = "https://www.jamiaacademy.in/";

const Home = () => {
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
      </Helmet>
      <main className="w-full min-h-screen">
        <Hero />

        <WhyChooseUs />

        <Testimonials />

        <FAQ />

        <AccreditationSection />

        <FeatureSection />

        <CourseGallerySection />
      </main>
    </>
  );
};

export default Home;
