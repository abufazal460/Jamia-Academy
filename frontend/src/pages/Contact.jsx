import ContactBackground from "../components/contact/ContactBackground";
import ContactHero from "../components/contact/ContactHero";
import ContactInfoGrid from "../components/contact/ContactInfoGrid";
import SocialLinks from "../components/contact/SocialLinks";
import ContactForm from "../components/contact/ContactForm";
import WhyContactSection from "../components/contact/WhyContactSection";
import MapSection from "../components/contact/MapSection";

const Contact = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7F3E9]">
      <ContactBackground />

      <ContactHero />

      <section
        className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:py-24"
        aria-labelledby="contact-info-heading"
      >
        <h2 id="contact-info-heading" className="sr-only">
          Contact Information
        </h2>
        <ContactInfoGrid />
      </section>

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
  );
};

export default Contact;
