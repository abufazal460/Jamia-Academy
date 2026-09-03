import SEO from "../shared/seo/SEO";
import { motion } from "motion/react";
import { Suspense, lazy } from "react";
import {
  HeroAbout,
  AboutDescription,
  FounderSection,
  FounderMessage,
  CoFounderSection,
  VisionMission,
  ValuesSection,
  StatsSection,
} from "../features/about/components";
import { founder, coFounder } from "../features/about/data/about.data";
import { pageTransition } from "../features/about/motion/about.motion";

const FacultyGrid = lazy(() => import("../features/about/components/FacultyGrid"));
const TimelineSection = lazy(() => import("../features/about/components/TimelineSection"));

const About = () => {
  return (
    <>
      <SEO
        title="About Us | Jamia Academy"
        description="Learn about Jamia Academy's history, mission, founders, and commitment to academic excellence."
        path="/about"
        imageAlt="About Jamia Academy"
      />
      <motion.main
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full overflow-x-hidden"
      >
        <HeroAbout />
        <AboutDescription />
        <FounderSection />
        <FounderMessage data={founder} />
        <CoFounderSection />
        <FounderMessage data={coFounder} />
        <ValuesSection />
        <StatsSection />
        <VisionMission />
        <Suspense fallback={null}>
          <FacultyGrid />
          <TimelineSection />
        </Suspense>
      </motion.main>
    </>
  );
};

export default About;
