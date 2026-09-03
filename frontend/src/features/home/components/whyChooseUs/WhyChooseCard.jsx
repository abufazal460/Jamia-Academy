import React, { memo } from 'react';
import { motion } from 'motion/react';
import { cardVariants } from '../../motion/why-choose-us.motion';

const WhyChooseCard = memo(({ card, index }) => {
  const Icon = card.icon;

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      className={`
        group relative p-8 rounded-2xl 
        bg-white/80 backdrop-blur-sm
        border ${card.borderColor}
        shadow-sm hover:shadow-2xl
        transition-all duration-500 ease-out
        hover:-translate-y-2
        hover:bg-white/95
        hover:border-transparent
        overflow-hidden
      `}
      whileHover={{
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
        transition: { duration: 0.3 }
      }}
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        initial={false}
      />

      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
        initial={false}
      />

      <div className="relative z-10">
        <motion.div
          className={`
            w-14 h-14 rounded-2xl 
            ${card.iconBg} border ${card.borderColor}
            flex items-center justify-center mb-6
          `}
          whileHover={{
            scale: 1.1,
            rotate: 3,
            transition: { duration: 0.3 }
          }}
        >
          <Icon className={`w-7 h-7 ${card.iconColor}`} />
        </motion.div>

        <motion.h3
          className="font-['Poppins']  font-bold text-xltext-[#2B2D42] mb-2"
          whileHover={{
            x: 4,
            transition: { duration: 0.2 }
          }}
        >
          {card.title}
        </motion.h3>

        <p className="text-slate-600 text-sm leading-relaxed">
          {card.description}
        </p>
      </div>

      <motion.div
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${card.lineGradient} rounded-full`}
        initial={{ width: "0%" }}
        whileHover={{
          width: "100%",
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        }}
      />
    </motion.div>
  );
});

WhyChooseCard.displayName = 'WhyChooseCard';

export default WhyChooseCard;