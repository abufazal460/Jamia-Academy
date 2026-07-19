import CourseSection from "../components/course/CourseSection";

/**
 * Course.jsx
 * -----------------------------------------------------------------------
 * Yeh file jaan-bujhkar minimal rakhi hai — iska sirf ek kaam hai:
 * <main> ke andar CourseSection ko render karna. Koi state, koi data
 * fetching, koi business logic yahan nahi hai (SRP - Single
 * Responsibility Principle follow kiya hai).
 *
 * <main> semantic tag kyu: Screen readers aur SEO crawlers page ke
 * "primary content" ko identify karne ke liye <main> use karte hain.
 * Page-level route component me yeh landmark hona chahiye taaki
 * accessibility tree clean rahe (ek page me sirf ek <main> hona chahiye).
 *
 * CourseSection khud apna <section id="courses"> aur heading hierarchy
 * (h2) manage karta hai, isliye is page component ko uske internals
 * se koi matlab nahi — clean separation maintain hai.
 * -----------------------------------------------------------------------
 */

const Course = () => {
  return (
    <main>
      <CourseSection />
    </main>
  );
};

export default Course;
