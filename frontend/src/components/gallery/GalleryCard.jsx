import { memo, useRef } from "react";
import { motion } from "framer-motion";

/**
 * GalleryCard.jsx
 * -----------------------------------------------------------------------
 * Hinglish — YE FILE OPTIMIZE HUI HAI (design/layout same, sirf weight kam):
 *
 * 1. Skeleton HATA diya gaya — brief: "No skeletons, no shimmer, no blur
 *    loading". Ab image sirf simple fade karti hai: opacity 0 -> 1 jab
 *    `onLoad` fire ho. Isse ek extra absolutely-positioned div + uska
 *    shimmer animation (jo continuously CPU/paint use kar raha tha)
 *    completely hata diya — real perf win.
 *
 * 2. Hover ab sirf lightweight hai: border-width 2px->3px, subtle
 *    box-shadow glow, aur max scale 1.01 — koi spring physics wala
 *    `whileHover={{scale:1.035}}` nahi, koi image-internal `scale-[1.06]`
 *    zoom nahi. Pure CSS transition use kiya hai — Framer Motion
 *    whileHover ki jagah, kyunki itne simple hover ke liye JS-driven
 *    spring animation overkill/heavy tha.
 *
 * 3. `.gg-border-frame` (rotating conic-gradient pseudo-element) style
 *    HATA diya — wo continuously ek GPU layer rotate kar raha tha jab
 *    tak hover ho. Ab border sirf ek static-but-smooth-transitioning
 *    Tailwind border hai — "Border glow" requirement CSS box-shadow se
 *    poora hota hai, bina kisi keyframe animation ke.
 *
 * 4. Focus ring / focus animation completely hataya gaya:
 *    `outline-none focus-visible:outline-none` — koi ring class nahi,
 *    koi focus par shadow-pulse nahi (brief point 7 & 8).
 *
 * 5. "Premium card" look Tailwind classes se: rounded corners, soft
 *    shadow, translucent glass-ish border, clean overflow-hidden — sab
 *    plain CSS file (`gallery.css`) hata ke ab yahin Tailwind me hai.
 *
 * 6. `memo` + custom comparator waisa hi rakha — 139 items ke liye zaroori
 *    hai ki unrelated parent re-render (jaise lightbox open/close) is
 *    card ko dobara render na kare.
 *
 * 7. Entry animation ab bahut halki hai — variants prop GalleryGrid se
 *    aata hai (mobile par sirf fade, desktop par fade + halka translateY).
 *    Koi rotate/x/y-throw/scale-0.85 wala "shuffle fly-in" nahi bacha —
 *    wahi sabse CPU-heavy part tha, GalleryGrid.jsx me hata diya gaya hai.
 */
function GalleryCardBase({ src, index, variants, onOpen }) {
  const cardRef = useRef(null);
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
          loading="lazy"
          decoding="async"
          fetchPriority={index < 4 ? "high" : "auto"}
          /* Pehli visible row ki images ko high priority di gayi hai —
           isse LCP (Largest Contentful Paint) fast hota hai, baaki
           sab default/auto par lazy hi rehti hain. */
          alt={`Jamia Academy gallery photo ${index + 1}`}
          onLoad={(e) => {
            // Image ko smoothly visible karo
            e.currentTarget.style.opacity = "1";

            // Card ko inform karo image ready hai
            // Iske baad hi border aur wrapper activate honge

            cardRef.current?.setAttribute("data-loaded", "true");
          }}
          style={{ opacity: 0, transition: "opacity 0.35s ease-out" }}
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
