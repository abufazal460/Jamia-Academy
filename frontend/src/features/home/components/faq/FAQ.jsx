import { Helmet } from "react-helmet-async";
import { useState, useCallback } from "react";
import { motion } from "motion/react";
import FAQHeader from "./FAQHeader";
import FAQItem from "./FAQItem";
import faqData from "../../data/faq.data";

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const FAQ = () => {
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqData.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      })}
    </script>
  </Helmet>

  const [activeId, setActiveId] = useState(null);

  const handleToggle = useCallback((id) => {

    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  return (

    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="
        bg-[#0a0f1f] relative
        py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32
        px-4 sm:px-6 md:px-8 lg:px-12
        overflow-hidden
      "
    >

      <div
        aria-hidden="true"
        className="
          absolute top-0 left-1/2 -translate-x-1/2
          w-[600px] h-[400px]
          bg-cyan-500/5 rounded-full blur-3xl
          pointer-events-none
        "
      />

      {/* Max width container — content ek jagah centered rahe */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* -- Section Header (Badge + Heading) -- */}
        <FAQHeader />

        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          // flex-col + gap — cards ke beech spacing
          className="flex flex-col gap-3 sm:gap-4"
          // ul/div — ye list hai isliye role="list" add karna better practice hai
          role="list"
        >
          {faqData.map((faq, index) => (
            // role="listitem" — har card ek list item hai
            <div key={faq.id} role="listitem">
              <FAQItem
                faq={faq}
                // isOpen — kya ye particular card open hai?
                isOpen={activeId === faq.id}
                // onToggle — is card ka toggle handler
                onToggle={() => handleToggle(faq.id)}
                // index — stagger delay calculate karne ke liye
                index={index}
              />
            </div>
          ))}
        </motion.div>

        {/* -- Bottom CTA (optional, premium touch) -- */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="
            text-center mt-10 sm:mt-12
            text-sm sm:text-base text-slate-500
          "
        ></motion.p>
      </div>
    </section>
  );
};

export default FAQ;
