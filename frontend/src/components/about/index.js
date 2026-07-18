// File: index.js
// Purpose: Central export point for all About page section components
// Responsibility: Baki files sirf "@/components/about" se import karein, individual paths se nahi
// Future Usage: pages/About.jsx aur kahin bhi About sections chahiye hon
// Dependencies: har section component apni respective folder me

// -----------------------------------------------------------------------------
// IMPORTANT NOTE (Hinglish):
// Brief me kaha gaya tha "export every future component, even if not created yet."
// Lekin agar hum yaha un files ko import/export karein jo abhi exist hi nahi karti,
// to build turant fail ho jayega (module not found error) — ye production-breaking hai.
//
// Isliye best-practice approach ye hai: har future component ka export line yaha
// COMMENTED rakha gaya hai, taaki:
//   1) Build kabhi break na ho
//   2) Future developer ko exact pata ho kaunsa component kis path se banega
//   3) Component banate hi sirf comment hatana ho, is file me structure change na karna pade
// -----------------------------------------------------------------------------

export { default as HeroAbout } from "./hero/HeroAbout";
export { default as AboutDescription } from "./description/AboutDescription";
export { default as FounderSection } from "./founder/FounderSection";
export { default as FounderMessage } from "./founder/FounderMessage";
export { default as CoFounderSection } from "./cofounder/CoFounderSection";
export { default as VisionMission } from "./vision/VisionMission";
export { default as ValuesSection } from "./values/ValuesSection";
export { default as StatsSection } from "./stats/StatsSection";
// export { default as FacultyGrid } from "./faculty/FacultyGrid";
// export { default as WhyChooseUs } from "./whychooseus/WhyChooseUs";
// export { default as TimelineSection } from "./timeline/TimelineSection";

// TimelineSection Phase 4+ me banega.
