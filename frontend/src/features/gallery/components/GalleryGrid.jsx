import { useMemo } from "react";
import { motion } from "motion/react";
import { GalleryCard } from "./GalleryCard";
import { useIsMobile } from "../../../shared/hooks/useismobile";

export function GalleryGrid({ images, onOpenImage, categoryLabel }) {
  const isMobile = useIsMobile();

  const { containerVariants, itemVariant } = useMemo(() => {
    if (isMobile) {

      return {
        containerVariants: { hidden: {}, show: {} },
        itemVariant: { hidden: { opacity: 1 }, show: { opacity: 1 } },
      };
    }

    return {
      containerVariants: {
        hidden: {},
        show: { transition: { staggerChildren: 0.015 } },
      },
      itemVariant: {
        hidden: { opacity: 0, y: 6 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: "easeOut" },
        },
      },
    };
  }, [isMobile]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05 }}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6"
    >
      {images.map((src, index) => (
        <GalleryCard
          key={src}
          src={src}
          index={index}
          variants={itemVariant}
          onOpen={onOpenImage}
          categoryLabel={categoryLabel}
        />
      ))}
    </motion.div>
  );
}