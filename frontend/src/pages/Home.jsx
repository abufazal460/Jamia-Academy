import AccreditationSection from "../components/home/AccreditationSection";
import FeatureSection from "../components/home/FeatureSection";
import LiquidEther from "../components/home/LiquidEther";
import FAQ from "../components/faq/FAQ";
import CourseGallerySection from "../components/home/CourseGallery/CourseGallerySection";
// import BulgeText from "../components/home/BulgeText/BulgeText";
import { lazy, Suspense } from "react";
const BulgeText = lazy(() => import("../components/home/BulgeText/BulgeText"));

const Home = () => {
  return (
    <main className="h-full w-full">
      {/* <img className="w-full h-screen object-cover" src="hero-1.jpg" alt="" /> */}

      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          background: `url(https://cdn.prod.website-files.com/696f172efacb311f86007ec0/69784fed37d6652a77f2bd2a_Background.svg)`,
        }}
      >
        <LiquidEther
          colors={["#ffffff", "#ffffff", "#ffffff"]}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          color0="#5227FF"
          color1="#FF9FFC"
          color2="#B497CF"
        />
      </div>

      {/* Hero ke turant neeche — Section 01 */}
      <AccreditationSection />

      {/* Section 01 ke neeche — Section 02 */}
      <FeatureSection />

      {/* section 3 section 2 ke neeche  */}
      <FAQ />

      {/* section 4  */}
      <CourseGallerySection />

      {/* section 5  */}
      <Suspense fallback={<div className="h-[70vh]" />}>
        <BulgeText text="Jamia Academy" />
      </Suspense>
    </main>
  );
};

export default Home;
