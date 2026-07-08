import AccreditationSection from "../components/home/AccreditationSection";
import FeatureSection from "../components/home/FeatureSection";

const Home = () => {
  return (
    <main className="h-screen w-full">
      <img className="w-full h-full object-cover" src="hero-1.jpg" alt="" />

      {/* Hero ke turant neeche — Section 01 */}
      <AccreditationSection />

      {/* Section 01 ke neeche — Section 02 */}
      <FeatureSection />
    </main>
  );
};

export default Home;
