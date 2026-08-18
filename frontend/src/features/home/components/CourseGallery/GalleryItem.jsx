// src/components/InfiniteGallery/GalleryItem.jsx
//
// EK single image card. Yeh component "dumb" hai — koi animation
// logic isme nahi hai, sirf markup + ref forward karta hai taaki
// parent (InfiniteGallery) GSAP se isko target kar sake.
//
// React.memo lagaya hai taaki jab parent re-render ho (e.g. resize
// se activeColumns badle), to un items ka DOM unnecessarily
// re-render na ho jinke props change hi nahi hue — performance ke
// liye zaroori hai jab 50-100 items ho.

import { forwardRef, memo } from "react";

const GalleryItem = forwardRef(function GalleryItem(
  { image, alt, title, height, isClone, index },
  ref
) {
  return (
    <figure
      ref={ref}
      // aria-hidden clones ke liye — screen readers ko duplicate
      // content dobara padhne ki zaroorat nahi (accessibility).
      aria-hidden={isClone || undefined}
      data-index={index}
      className={[
        "gallery-item",
        "relative w-full shrink-0 overflow-hidden",
        // Premium rounded corners + soft shadow — card ko "floating" feel
        // deta hai instead of raw edge-to-edge image blocks.
        "rounded-2xl shadow-xl shadow-black/25 ring-1 ring-white/5",
        // object-contain letterbox-fit hone par jo empty space bachti
        // hai wahan flat background chahiye — warna gap "broken" dikhta
        // hai. Card ke rounded corners/shadow ke saath yeh intentional
        // "matte" lagta hai.
        "bg-neutral-950",
        "will-change-transform",
        // GSAP transform-origin/3d ke liye Tailwind v4 arbitrary utilities
        "[transform-style:preserve-3d] [transform-origin:center_center]",
        height,
      ].join(" ")}
    >
      <img
        src={image}
        alt={isClone ? "" : alt || title || ""}
        // Pehla set of items (jo "above the fold" ho sakte hain) eager
        // load karna behtar hai, baaki sab lazy — layout shift bhi
        // isse kam hota hai kyunki dimensions pehle se fixed hain
        // (parent container height already Tailwind classes se set hai).
        loading={index < 3 && !isClone ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        tabIndex={isClone ? -1 : 0}
        // object-cover pehle image ko crop karta tha taaki container
        // poora bhar jaaye — ab object-contain use hota hai taaki POORI
        // image hamesha visible rahe, aspect ratio preserve ho, koi
        // cropping/stretching na ho. Container (figure) apni fixed
        // height/width waisi hi rakhta hai — bacha hua space (letterbox)
        // upar wale `bg-neutral-950` se fill hota hai aur image
        // automatically center mein rehti hai (object-position: center).
        className="h-full w-full object-contain object-center select-none"
      />

      {title ? (
        <figcaption className="pointer-events-none absolute bottom-4 left-4 text-sm font-medium text-white/90 drop-shadow-md sm:text-base">
          {title}
        </figcaption>
      ) : null}
    </figure>
  );
});

// Custom comparison — sirf image/alt/title/height badalne par
// re-render ho, ref ya function identity changes pe nahi.
export default memo(GalleryItem);