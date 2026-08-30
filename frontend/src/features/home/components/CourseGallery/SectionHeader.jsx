import { motion } from "motion/react";

export default function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      className="mx-auto mb-16 flex max-w-5xl flex-col items-center text-center"
    >

      {/* Heading */}

      <h2 className="font-['Inter'] text-balance text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
        Empower Your{" "}
        <span className="bg-gradient-to-r from-orange-400 via-yellow-300 to-red-500 bg-clip-text text-transparent">
          Future
        </span>
      </h2>

      {/* Description */}

      <p className="mt-8 max-w-3xl  text-base leading-8 text-zinc-400 sm:text-lg">
        Learn practical skills through industry-focused programs designed to
        help you build confidence, grow faster, and prepare for a successful
        career in today's digital world.
      </p>
    </motion.div>
  );
}