import { memo } from "react";
import { motion } from "motion/react";
import { PAGE_CONTENT } from "../../data/certificateData";
import { headingVariants } from "../../utils/animationVariants";

function PageHeadingBase() {
  return (
    <motion.header
      className="mb-8 flex flex-col items-center text-center"
      variants={headingVariants}
      initial="hidden"
      animate="visible"
    >
      <span className="mb-3 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#F4A261] backdrop-blur-md">
        {PAGE_CONTENT.eyebrow}
      </span>
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {PAGE_CONTENT.title}
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
        {PAGE_CONTENT.subtitle}
      </p>
    </motion.header>
  );
}

export const PageHeading = memo(PageHeadingBase);
