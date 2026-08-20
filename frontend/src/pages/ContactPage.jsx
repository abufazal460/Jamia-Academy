import SEO from "../shared/seo/SEO";
import ContactBackground from "../features/contact/components/ContactBackground";
import ContactHero from "../features/contact/components/ContactHero";
import ContactInfoGrid from "../features/contact/components/ContactInfoGrid";
import SocialLinks from "../features/contact/components/SocialLinks";
import ContactForm from "../features/contact/components/ContactForm";
import WhyContactSection from "../features/contact/components/WhyContactSection";
import MapSection from "../features/contact/components/MapSection";
import { contactHero, mapConfig } from "../features/contact/data/contact.data";


const PAGE_TITLE = "Contact Us | Jamia Academy";
const PAGE_DESCRIPTION = contactHero.description;

const Contact = () => {

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "https://www.jamiaacademy.in/contact",
    mainEntity: {
      "@type": "EducationalOrganization",
      name: "Jamia Academy",
      address: mapConfig.address,
    },
  };
  return (
    <>
      <SEO
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        path="/contact"
        imageAlt="Contact Jamia Academy in Jamia Nagar, New Delhi"
        structuredData={contactSchema}
      />
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
