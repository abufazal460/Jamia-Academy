import { motion } from "motion/react";
import { contactInfoCards } from "../data/contact.data";
import { staggerContainer, viewportOnce } from "../motion/contact.motion";
import ContactInfoCard from "./ContactInfoCard";

const ContactInfoGrid = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(0.15)}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {contactInfoCards.map((card) => (
        <ContactInfoCard key={card.id} card={card} />
      ))}
    </motion.div>
  );
};

export default ContactInfoGrid;
