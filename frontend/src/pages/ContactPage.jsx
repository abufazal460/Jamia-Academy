import ContactBackground from "../features/contact/components/ContactBackground";
import ContactHero from "../features/contact/components/ContactHero";
import ContactInfoGrid from "../features/contact/components/ContactInfoGrid";
import SocialLinks from "../features/contact/components/SocialLinks";
import ContactForm from "../features/contact/components/ContactForm";
import WhyContactSection from "../features/contact/components/WhyContactSection";
import MapSection from "../features/contact/components/MapSection";
import { Helmet } from "react-helmet-async";
import { contactHero, mapConfig } from "../features/contact/data/contact.data";



const PAGE_TITLE = "Contact Us | Jamia Academy";
const PAGE_DESCRIPTION = contactHero.description;

const Contact = () => {

  const canonicalUrl = "https://www.jamiaacademy.in/course";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    mainEntity: {
      "@type": "EducationalOrganization",
      name: "Jamia Academy",
      address: mapConfig.address,
    },
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
      <main className="relative min-h-screen overflow-x-hidden bg-[#F7F3E9]">
        <ContactBackground />

        <ContactHero />

        <SocialLinks />

        <section
          className="mx-auto max-w-[900px] px-6 py-16 sm:px-10 lg:py-24"
          aria-labelledby="contact-form-heading"
        >
          <h2 id="contact-form-heading" className="sr-only">
            Course Inquiry Form
          </h2>
          <ContactForm />
        </section>

        <WhyContactSection />

        <MapSection />
      </main>
    </>
  );
};

export default Contact;
