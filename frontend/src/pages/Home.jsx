import AccreditationSection from "../components/home/AccreditationSection/AccreditationSection";
import FeatureSection from "../components/home/FeatureSection/FeatureSection";
import FAQ from "../components/faq/FAQ";
import CourseGallerySection from "../components/home/CourseGallery/CourseGallerySection";
import Hero from "../components/home/hero/Hero";

const Home = () => {
  return (
    <main className="w-full min-h-screen">
      <Hero />

      <AccreditationSection />

      <FeatureSection />

      <FAQ />

      <CourseGallerySection />
    </main>
  );
};

export default Home;
