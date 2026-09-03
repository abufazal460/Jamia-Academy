import { motion } from "motion/react";

const headingVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const badgeVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const headerContainerVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const FAQHeader = () => {
  return (

    <motion.div
      variants={headerContainerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.3 }}
      className="text-center mb-12 sm:mb-16 lg:mb-20"
    >

      <motion.h2
        variants={headingVariant}
        className="
          font-['Inter'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl
          font-black text-white
          leading-tight tracking-wide
          max-w-3xl mx-auto
          px-4
        "
      >
        <span className="bg-gradient-to-r from-orange-400 via-yellow-300 to-red-500 bg-clip-text text-transparent">Frequently</span>
        {" "}
        Asked
        Questions
        From Our
        {" "}
        <span className="bg-gradient-to-r from-orange-400 via-yellow-300 to-red-500 bg-clip-text text-transparent">Students</span>
      </motion.h2>
    </motion.div>
  );
};

export default FAQHeader;