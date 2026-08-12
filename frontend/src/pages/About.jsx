// File: About.jsx
// Purpose: Jamia Academy About page ka composition root — sirf layout arrange karta hai
// Responsibility: Future sections ko sahi order me import + render karna, koi UI/business logic nahi
// Future Usage: Phase 2 me har section (Hero, Founder, Timeline, etc.) yaha ek-ek karke plug hogi
// Dependencies: react, motion/react, react-helmet-async, @/animations/aboutAnimations, @/components/about

// 1. React
import React from "react";


// 2. Third-party Libraries
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Suspense, lazy } from "react";


// 3. Internal Components
// NOTE: Ye saare imports abhi commented hain kyunki respective components
// Phase 2/3 me banenge. Component banते hi yaha uncomment karna hai.

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
