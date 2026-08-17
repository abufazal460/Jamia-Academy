

// 1. React
import React from "react";


// 2. Third-party Libraries
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
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
} from "../components/about";

import { pageTransition } from "../animations/aboutAnimations";

const FacultyGrid = lazy(() => import("../components/about/faculty/FacultyGrid"));
const WhyChooseUs = lazy(() => import("../components/about/whychooseus/WhyChooseUs"));
const TimelineSection = lazy(() => import("../components/about/timeline/TimelineSection"));


const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Jamia Academy</title>
        <meta
          name="description"
          content="Learn about Jamia Academy's history, mission, founders, and commitment to academic excellence."
        />
        <link rel="canonical" href="https://www.jamiaacademy.in/about" />
        <meta property="og:title" content="About Us | Jamia Academy" />
        <meta
          property="og:description"
          content="Learn about Jamia Academy's history, mission, founders, and commitment to academic excellence."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.jamiaacademy.in/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Jamia Academy" />
        <meta property="og:image" content="https://www.jamiaacademy.in/og/home.jpg" />
        <meta name="robots" content="index, follow" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://www.jamiaacademy.in/og/home.jpg" />
        <meta property="og:site_name" content="Jamia Academy" />
        <meta property="og:locale" content="en_IN" />
      </Helmet>

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
