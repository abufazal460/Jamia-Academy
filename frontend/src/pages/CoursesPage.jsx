import { Helmet } from "react-helmet-async";
import CourseSection from "../features/courses/components/CourseSection";
import { coursesData } from "../features/courses/data/courses.data";

const PAGE_TITLE = "Courses | Jamia Academy";
const PAGE_DESCRIPTION =
  "Explore Jamia Academy's courses — check duration, level, fees and eligibility, then enroll directly on WhatsApp.";

const Course = () => {
  const canonicalUrl = "https://www.jamiaacademy.in/course";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": coursesData.map((course, index) => ({
      "@type": "Course",
      "position": index + 1,
      "name": course.title,
      "description": course.description,
      "provider": {
        "@type": "Organization",
        "name": "Jamia Academy",
        "sameAs": "https://www.jamiaacademy.in/"
      }
    }))
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
        <meta property="og:image" content="https://www.jamiaacademy.in/og/home.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://www.jamiaacademy.in/og/home.jpg" />
        <meta property="og:site_name" content="Jamia Academy" />
        <meta property="og:locale" content="en_IN" />
      </Helmet>
      <main>
        <h1 className="sr-only">Computer Courses at Jamia Academy — Web Development, Data Analytics, AI & More</h1>
        <CourseSection />
      </main>
    </>
  );
};

export default Course;