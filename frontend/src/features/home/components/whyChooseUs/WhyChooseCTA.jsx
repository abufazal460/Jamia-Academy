// src/components/home/whyChooseUs/WhyChooseCTA.jsx

import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ctaVariants, textButtonVariants } from "../../motion/why-choose-us.motion";
import TransitionLink from "../../../../app/providers/page-transition/TransitionLink";

const WhyChooseCTA = memo(({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [buttonKey, setButtonKey] = useState(0);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      setButtonKey((prev) => prev + 1);
    }, 600);
  };

  const ButtonContent = memo(() => (
    <motion.div className="relative overflow-hidden flex items-center gap-2">
      <AnimatePresence mode="wait">
        <motion.span
          key={buttonKey}
          variants={textButtonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex items-center gap-2"
        >
          {data.buttonText}
          {<data.buttonIcon className="w-5 h-5" />}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  ));

  return (
    <motion.div
      variants={ctaVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative overflow-hidden rounded-3xl p-12 md:p-16"
      style={{
        background:
          "linear-gradient(135deg, #1A1A2E 0%, #264653 25%, #2A9D8F 50%, #F4A261 75%, #E63946 100%)",
        backgroundSize: "400% 400%",
      }}
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%"],
        transition: {
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        },
      }}
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />

      {/* Floating glow effects */}
      <motion.div
        className="absolute -top-24 -left-24 w-96 h-96 bg-[#E63946]/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#2A9D8F]/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Text Content */}
        <motion.div
          className="flex-1 max-w-2xl"
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4"
            variants={ctaVariants}
          >
            {data.title}
          </motion.h3>
          <motion.p
            className="text-white/80 text-base leading-relaxed"
            variants={ctaVariants}
          >
            {data.description}
          </motion.p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 flex-shrink-0"
          variants={ctaVariants}
        >
          <TransitionLink to="/course" className="block">

            <motion.button
              onClick={handleClick}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              whileHover={{
                y: -3,
                scale: 1.02,
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)",
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #E63946 0%, #C1121F 100%)",
                boxShadow: "0 10px 20px -5px rgba(230, 57, 70, 0.4)",
              }}
            >
              <ButtonContent />
            </motion.button>
          </TransitionLink>
          <TransitionLink to="/contact" className="block">
            <motion.button
              whileHover={{
                y: -3,
                scale: 1.02,
                boxShadow: "0 20px 40px -10px rgba(42, 157, 143, 0.3)",
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="px-8 py-4 rounded-2xl font-semibold text-white backdrop-blur-sm border border-white/30 bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </TransitionLink>
        </motion.div>
      </div>
    </motion.div>
  );
});

WhyChooseCTA.displayName = "WhyChooseCTA";

export default WhyChooseCTA;
