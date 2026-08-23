import { memo, useRef, useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "motion/react";

const BORDER_COLORS = [
  "#ec4899",
  "#a855f7",
  "#6366f1",
  "#22d3ee",
  "#2dd4bf",
  "#eab308",
  "#f97316",
  "#ec4899",
];

function GalleryCardBase({ src, index, variants, onOpen, categoryLabel }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const rotate = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (imageRef.current?.complete) {
      imageRef.current.style.opacity = "1";
      cardRef.current?.setAttribute("data-loaded", "true");
    }
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    animate(rotate, rotate.get() + 360, {
      duration: 3,
      repeat: Infinity,
      ease: "linear",
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const gradient = `conic-gradient(from 0deg, ${BORDER_COLORS.join(", ")})`;

  return (
    <motion.button
      ref={cardRef}
      type="button"
      variants={variants}
      onClick={() => onOpen(index)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative block aspect-[4/3] w-full  overflow-hidden rounded-4xl bg-slate-100 text-left shadow-md shadow-black/10 outline-none transition-[border-color,box-shadow,transform,scale] duration-200 ease-out  hover:shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.05] focus:outline-none focus-visible:outline-none active:scale-[0.99]"
      aria-label={`Open image ${index + 1} in full screen`}
    >
      {/* border animation — sirf edge, background par koi effect nahi */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-4xl p-[2px]"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.25s ease-out",
        }}
      >
        <motion.div
          aria-hidden="true"
          className="absolute -inset-[60%]"
          style={{
            background: gradient,
            rotate,
            willChange: "transform",
          }}
        />
        {/* center ko dhak do — sirf padding jitni ring bachegi */}
        <div className="relative h-full w-full rounded-[inherit] bg-slate-100" />
      </div>

      {/* inner card — bilkul same jaisa pehle tha */}
      <div className="gallery-inner relative z-10 rounded-[inherit] h-full w-full p-[3px] overflow-hidden">
        <img
          src={src}
          ref={imageRef}
          loading="lazy"
          decoding="async"
          fetchPriority={index < 4 ? "high" : "auto"}
          alt={`Jamia Academy ${categoryLabel} photo ${index + 1}`}
          onLoad={(e) => {
            e.currentTarget.style.opacity = "1";
            cardRef.current?.setAttribute("data-loaded", "true");
          }}
          className="gallery-image h-full w-full object-cover rounded-4xl"
        />
      </div>
    </motion.button>
  );
}

function areEqual(prevProps, nextProps) {
  return prevProps.src === nextProps.src && prevProps.index === nextProps.index;
}

export const GalleryCard = memo(GalleryCardBase, areEqual);