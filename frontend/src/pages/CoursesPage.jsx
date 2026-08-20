import SEO from "../shared/seo/SEO";
import CourseSection from "../features/courses/components/CourseSection";
import { coursesData } from "../features/courses/data/courses.data";

const PAGE_TITLE = "Courses | Jamia Academy";
const PAGE_DESCRIPTION = "Explore Jamia Academy's courses — check duration, level, fees and eligibility, then enroll directly on WhatsApp.";

const Course = () => {

  const courseListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: coursesData.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: course.title,
        description: course.description,
        provider: {
          "@type": "EducationalOrganization",
          name: "Jamia Academy",
          url: "https://www.jamiaacademy.in/"
        }
      }
    }))
  };

  return (
    <>
      <SEO
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        path="/course"
        imageAlt="Computer, web development, AI and skill courses at Jamia Academy"
        structuredData={courseListSchema}
      />
      <main>
        <h1 className="sr-only">Computer Courses at Jamia Academy — Web Development, Data Analytics, AI & More</h1>
        <CourseSection />
      </main>
    </>
  );
};

export default Course;