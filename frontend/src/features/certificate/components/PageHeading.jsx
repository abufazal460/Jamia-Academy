import { memo } from "react";
import { motion } from "motion/react";
import { PAGE_CONTENT } from "../data/certificate.data";
import { certHeadingVariants } from "../motion/certificate.motion";

function PageHeadingBase() {
  return (
    <motion.header
      className="mb-4 flex flex-col items-center text-center"
      variants={certHeadingVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-3xl font-[Poppins] font-extrabold tracking-wide text-white sm:text-4xl">
        {PAGE_CONTENT.title}
      </h1>
      <p className="mt-3 max-w-md text-sm leading-normal text-white/60 sm:text-base">
        {PAGE_CONTENT.subtitle}
      </p>
    </motion.header>
  );
}

export const PageHeading = memo(PageHeadingBase);
