import { Helmet } from "react-helmet-async";
import CourseSection from "../components/course/CourseSection";
import { coursesData } from "../data/courses.data";

const PAGE_TITLE = "Courses | Jamia Academy";
const PAGE_DESCRIPTION =
  "Explore Jamia Academy's courses — check duration, level, fees and eligibility, then enroll directly on WhatsApp.";

const Course = () => {
  const canonicalUrl =
    typeof window !== "undefined" ? `${window.location.origin}/course` : "/course";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: coursesData.map((course, index) => ({
      "@type": "Course",
      position: index + 1,
      name: course.title,
      description: course.description,
      provider: { "@type": "Organization", name: "Jamia Academy" },
    })),
  };

  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <main>
        <CourseSection />
      </main>
    </>
  );
};

export default Course;