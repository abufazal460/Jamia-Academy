import React from "react";
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

import { pageTransition } from "../features/about/motion/about.motion";

const FacultyGrid = lazy(() => import("../features/about/components/FacultyGrid"));
const WhyChooseUs = lazy(() => import("../features/about/components/WhyChooseUs"));
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

      {/* Page-level transition wrapper — sirf entrance/exit fade, koi section animation nahi */}
      <motion.main
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full overflow-x-hidden"
      >
        {/*
          Section order (Phase 2/3 me actual components yaha render honge):
          1. HeroAbout
          2. AboutDescription
          3. FounderSection
          4. FounderMessage
          5. CoFounderSection
          6. VisionMission
          7. ValuesSection
          8. StatsSection
          9. FacultyGrid
          10. WhyChooseUs
          11. TimelineSection
        */}

        <HeroAbout />
        <AboutDescription />
        <FounderSection />
        <FounderMessage />
        <CoFounderSection />
        <VisionMission />
        <ValuesSection />
        <StatsSection />
        <Suspense fallback={null}>
          <FacultyGrid />
          <WhyChooseUs />
          <TimelineSection />
        </Suspense>
      </motion.main>
    </>
  );
};

export default About;
