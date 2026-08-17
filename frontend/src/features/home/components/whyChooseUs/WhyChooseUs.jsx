// src/components/home/whyChooseUs/WhyChooseUs.jsx

import React, { memo } from 'react';
import { motion } from 'motion/react';
import WhyChooseCard from './WhyChooseCard';
import WhyChooseCTA from './WhyChooseCTA';
import { whyChooseData, ctaData, sectionData } from '../../data/why-choose-us.data';
import { containerVariants, headingVariants, paragraphVariants } from '../../hooks/animations';

const WhyChooseUs = memo(() => {
  return (
    <section className="relative w-full py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F7F3E9] via-white to-[#F7F3E9]/50 overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        className="absolute -top-40  -left-40 w-96 h-96 bg-[#E63946]/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute -bottom-40  -right-40 w-96 h-96 bg-[#2A9D8F]/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="text-center max-w-4xl mx-auto mb-16 md:mb-20"
        >
          <motion.h2
            variants={headingVariants}
            className="font-['Orbitron'] text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6"
          >
            <span className="text-[#2B2D42]">Why Students </span>
            <span className="bg-gradient-to-r from-[#E63946] to-[#F4A261] bg-clip-text text-transparent">Choose </span>
            <span className="bg-gradient-to-r from-[#2A9D8F] to-[#264653] bg-clip-text text-transparent">Jamia Academy</span>
          </motion.h2>

          <motion.p
            variants={paragraphVariants}
            className="font-normal text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            {sectionData.description}
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-24"
        >
          {whyChooseData.map((card) => (
            <WhyChooseCard key={card.id} card={card} index={card.id} />
          ))}
        </motion.div>

        {/* CTA Section */}
        <WhyChooseCTA data={ctaData} />
      </div>
    </section>
  );
});

WhyChooseUs.displayName = 'WhyChooseUs';

export default WhyChooseUs;