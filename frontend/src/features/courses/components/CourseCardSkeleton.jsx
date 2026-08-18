import { memo } from "react";

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

export default memo(CourseCardSkeleton);
