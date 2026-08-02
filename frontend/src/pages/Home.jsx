import AccreditationSection from "../components/home/AccreditationSection/AccreditationSection";
import FeatureSection from "../components/home/FeatureSection/FeatureSection";
import FAQ from "../components/faq/FAQ";
import CourseGallerySection from "../components/home/CourseGallery/CourseGallerySection";
import Hero from "../components/home/hero/Hero";
import TextPressure from "../components/home/TextPressure";
import WhyChooseUs from "../components/home/whyChooseUs/WhyChooseUs";
import Marquee  from "../components/home/marquee";
import Testimonials from "../components/home/testimonials";

const Home = () => {
  return (
    <main className="w-full min-h-screen">
      <Hero />

      <Testimonials />


      <Marquee />

       <WhyChooseUs />


      <section className="w-full h-screen overflow-hidden">
        <div className="mx-auto w-full h-full">
          <div className="h-full">
            <TextPressure text="JAMIA ACADEMY" minFontSize={28} />
          </div>
        </div>
      </section>

      <AccreditationSection />

      <FeatureSection />

      <FAQ />

      <CourseGallerySection />
    </main>
  );
};

export default Home;
