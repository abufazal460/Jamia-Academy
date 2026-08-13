import { memo, useRef, useEffect } from "react";
import { motion } from "motion/react";


function GalleryCardBase({ src, index, variants, onOpen, categoryLabel }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current?.complete) {
      imageRef.current.style.opacity = "1";
      cardRef.current?.setAttribute("data-loaded", "true");
    }
  }, []);
  return (
    <motion.button
      ref={cardRef}
      type="button"
      variants={variants}
      onClick={() => onOpen(index)}
      /* Premium card container: */
      /* rounded corners + soft shadow + glass border + clean overflow */
      /* Hover: sirf border width/glow/scale — kuch aur nahi */
      className="group relative block aspect-[4/3] w-full  overflow-hidden rounded-4xl bg-slate-100 text-left shadow-md shadow-black/10 outline-none transition-[border-color,box-shadow,transform,scale] duration-200 ease-out  hover:shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.05] focus:outline-none focus-visible:outline-none active:scale-[0.99]"
      aria-label={`Open image ${index + 1} in full screen`}
    >
      {/* border animation  */}
      <div className="animate-gradient pointer-events-none p-[5px]  absolute inset-0 z-0 rounded-4xl overflow-hidden"></div>
      {/* inner card  */}
      <div className="gallery-inner relative z-10 rounded-[inherit] h-full w-full p-[3px] overflow-hidden">
        {/* Image: load hote hi simple opacity fade, kuch aur nahi */}
        <img
          src={src}
          ref={imageRef}
          loading="lazy"
          decoding="async"
          fetchPriority={index < 4 ? "high" : "auto"}
         
          alt={`Jamia Academy ${categoryLabel} photo ${index + 1}`}
          onLoad={(e) => {
            // Image ko smoothly visible karo
            e.currentTarget.style.opacity = "1";

            // Card ko inform karo image ready hai
            // Iske baad hi border aur wrapper activate honge

            cardRef.current?.setAttribute("data-loaded", "true");
          }}
          // style={{ opacity: 0, transition: "opacity 0.35s ease-out" }}
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
