import AccreditationSection from "../components/home/AccreditationSection/AccreditationSection";
import FeatureSection from "../components/home/FeatureSection/FeatureSection";
import FAQ from "../components/faq/FAQ";
import CourseGallerySection from "../components/home/CourseGallery/CourseGallerySection";
import WhyChooseUs from "../components/home/whyChooseUs/WhyChooseUs";
import Testimonials from "../components/home/testimonials";

const Home = () => {
  return (
    <main className="w-full min-h-screen">
    
       <WhyChooseUs />

      <Testimonials />

      <FAQ />

      <AccreditationSection />

      <FeatureSection />

      <CourseGallerySection />
    </main>
  );
};

export default Home;
