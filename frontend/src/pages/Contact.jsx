import ContactBackground from "../components/contact/ContactBackground";
import ContactHero from "../components/contact/ContactHero";
import ContactInfoGrid from "../components/contact/ContactInfoGrid";
import SocialLinks from "../components/contact/SocialLinks";
import ContactForm from "../components/contact/ContactForm";
import WhyContactSection from "../components/contact/WhyContactSection";
import MapSection from "../components/contact/MapSection";
import { Helmet } from "react-helmet-async";
import { contactHero, mapConfig } from "../data/contactData";



const PAGE_TITLE = "Contact Us | Jamia Academy";
const PAGE_DESCRIPTION = contactHero.description;

const Contact = () => {

  const canonicalUrl =
    typeof window !== "undefined" ? `${window.location.origin}/contact` : "/contact";

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
