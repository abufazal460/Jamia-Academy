import { Helmet } from "react-helmet-async";

const OrganizationSchema = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Jamia Academy",
    "url": "https://www.jamiaacademy.in/",
    "logo": "https://www.jamiaacademy.in/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "A-29, above J&K Bank, Batla House",
      "addressLocality": "Jamia Nagar, Okhla, New Delhi",
      "postalCode": "110025",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.instagram.com/jamiaacademy",
      "https://www.facebook.com/JamiaAcademyDelhi",
      "https://www.youtube.com/@JamiaAcademy",
      "https://x.com/AcademyJamia"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Jamia Academy",
    "url": "https://www.jamiaacademy.in/"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
};

export default OrganizationSchema;