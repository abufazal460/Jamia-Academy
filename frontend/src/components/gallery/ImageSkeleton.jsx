import { memo } from "react";

/**
 * ImageSkeleton.jsx
 * -----------------------------------------------------------------------
 * Hinglish: Image jab tak load ho rahi hoti hai tab tak blank/white
 * background dikhne ke bajaye ye animated shimmer skeleton dikhta hai.
 * `memo` isliye lagaya hai kyunki ye prop-less/static-ish component hai
 * aur parent list ke re-render par isko dobara render karne ki zaroorat
 * nahi hai.
 */
function ImageSkeletonBase() {
  return (
    <div
      className="gg-skeleton absolute inset-0 h-full w-full rounded-2xl"
      aria-hidden="true"
    />
  );
}

export const ImageSkeleton = memo(ImageSkeletonBase);