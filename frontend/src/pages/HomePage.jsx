import SEO from "../shared/seo/SEO";
import Hero from "../features/home/components/hero/Hero";
import AccreditationSection from "../features/home/components/accreditations/AccreditationSection";
import FeatureSection from "../features/home/components/features/FeatureSection";
import FAQ from "../features/home/components/faq/FAQ";
import CourseGallerySection from "../features/home/components/CourseGallery/CourseGallerySection";
import WhyChooseUs from "../features/home/components/whyChooseUs/WhyChooseUs";
import Testimonials from "../features/home/components/testimonials/Testimonials";

const PAGE_TITLE = "Jamia Academy | Computer, Web Development, AI & Skill Courses in Delhi";
const PAGE_DESCRIPTION = "Jamia Academy, Jamia Nagar Delhi — offline, instructor-led computer, web development, data analytics, design, and AI courses with individual student attention.";
const CANONICAL_URL = "https://www.jamiaacademy.in/";

const HomePage = () => {
  return (
    <>
      <SEO
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        path="/"
        imageAlt="Jamia Academy courses and learning environment"
      />
      <main className="w-full min-h-screen">
        <Hero />

        {/* <AccreditationSection /> */}

        {/* <FeatureSection /> */}

        <WhyChooseUs />

        <Testimonials />

        <FAQ />

        <CourseGallerySection />
      </main>
    </>
  );
};

export default HomePage;
