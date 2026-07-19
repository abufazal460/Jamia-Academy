import { memo } from "react";

/**
 * CourseCardSkeleton.jsx
 * -----------------------------------------------------------------------
 * Kyu chahiye: Jab courses.data.js se data load ho raha ho (ya future me
 * API se aaye), tab layout shift (CLS) rokne ke liye skeleton dikhate hain.
 * Low-end devices par bhi "kuch ho raha hai" feel milta hai — real content
 * jaisa hi size/shape rakha hai taaki swap smooth lage.
 *
 * Performance note: Yeh pure CSS animation (Tailwind's animate-pulse) use
 * karta hai, JS-driven animation nahi — GSAP/Motion ka overhead yahan
 * avoid kiya gaya hai kyunki skeleton loop me repeated animation cheap
 * rehni chahiye 60fps ke liye, especially low-end mobiles par.
 * -----------------------------------------------------------------------
 */

const CourseCardSkeleton = () => {
  return (
    <div
      className="
        relative w-full rounded-2xl overflow-hidden
        border border-white/10
        bg-white/[0.03] backdrop-blur-sm
        animate-pulse
      "
      aria-hidden="true"
    >
      {/* Thumbnail placeholder - card ke real image area jitna hi aspect ratio */}
      <div className="w-full aspect-[16/10] bg-gradient-to-br from-white/[0.06] to-white/[0.02]" />

      <div className="p-4 sm:p-5 space-y-3">
        {/* Badge/tag line */}
        <div className="h-4 w-20 rounded-full bg-white/10" />

        {/* Title */}
        <div className="h-5 w-3/4 rounded-md bg-white/10" />

        {/* Sub text */}
        <div className="h-3.5 w-full rounded-md bg-white/[0.07]" />
        <div className="h-3.5 w-5/6 rounded-md bg-white/[0.07]" />

        {/* Footer row - price + button jaisa layout */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-16 rounded-md bg-white/10" />
          <div className="h-9 w-24 rounded-lg bg-white/10" />
        </div>
      </div>

      {/* Neon shimmer sweep - gaming theme ke hisaab se subtle glow pass */}
      <div
        className="
          absolute inset-0 -translate-x-full
          bg-gradient-to-r from-transparent via-fuchsia-500/10 to-transparent
          animate-[shimmer_1.8s_infinite]
        "
      />
    </div>
  );
};

/* memo lagaya kyunki grid me 6-12 skeletons ek saath render honge,
   re-render se bachne ke liye is component ko pure rakha */
export default memo(CourseCardSkeleton);
