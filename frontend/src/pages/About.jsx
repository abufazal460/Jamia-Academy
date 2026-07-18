// File: About.jsx
// Purpose: Jamia Academy About page ka composition root — sirf layout arrange karta hai
// Responsibility: Future sections ko sahi order me import + render karna, koi UI/business logic nahi
// Future Usage: Phase 2 me har section (Hero, Founder, Timeline, etc.) yaha ek-ek karke plug hogi
// Dependencies: react, framer-motion, react-helmet-async, @/animations/aboutAnimations, @/components/about

// 1. React
import React from "react";

// 2. Third-party Libraries
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

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
  FacultyGrid,
  WhyChooseUs,
  TimelineSection,
} from "../components/about";
// import {
//   TimelineSection,
// } from "@/components/about";

// 4. Hooks
// (Is page-level file me abhi koi hook zaroori nahi — sections apne hooks khud use karenge)

// 5. Utilities
// (Abhi zaroorat nahi)

// 6. Constants
import { pageTransition } from "../animations/aboutAnimations";

// 7. Styles
// (Tailwind utility classes hi use hongi, koi separate CSS file nahi)

/**
 * About
 * Ye component kya karta hai: About page ka top-level skeleton render karta hai
 * Kyu banaya gaya: taaki Phase 2 me har section ko sirf yaha "plug-in" karna ho
 * Kab call hoga: jab bhi "/about" route visit hoga
 * Kya return karega: semantic <main> wrapper jisme sections order me honge
 */
const About = () => {
  return (
    <>
      {/* SEO architecture Phase 1 Part 3 me sirf planned hai — actual meta tags Phase 2/3 me aayenge */}
      <Helmet>
        <title>About Us | Jamia Academy</title>
        <meta
          name="description"
          content="Learn about Jamia Academy's history, mission, founders, and commitment to academic excellence."
        />
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
        <FacultyGrid />
        <WhyChooseUs />
        <TimelineSection />
      </motion.main>
    </>
  );
};

export default About;
