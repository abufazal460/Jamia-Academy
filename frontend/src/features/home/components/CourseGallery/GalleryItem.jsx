import { forwardRef, memo } from "react";

const GalleryItem = forwardRef(function GalleryItem(
  { image, alt, title, height, isClone, index, onImageClick },
  ref
) {

  const handleActivate = () => {
    onImageClick?.({ src: image, alt, title });
  };

  const handleKeyDown = (event) => {
    if (isClone) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleActivate();
    }
  };

  return (
    <figure
      ref={ref}
      aria-hidden={isClone || undefined}
      data-index={index}
      className={[
        "gallery-item",
        "relative w-full shrink-0 overflow-hidden",
        "rounded-2xl shadow-xl shadow-black/25 ring-1 ring-white/5",
        "bg-neutral-950",
        "[transform-style:preserve-3d] [transform-origin:center_center]",
        height,
      ].join(" ")}
    >
      <img
        src={image}
        alt={isClone ? "" : alt || title || ""}
        loading={index < 3 && !isClone ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        tabIndex={isClone ? -1 : 0}
        role="button"
        aria-label={`Open image preview: ${title || alt || "gallery image"}`}
        onClick={handleActivate}
        onKeyDown={handleKeyDown}
        className="h-full w-full cursor-pointer object-contain object-center select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
      />

      {title ? (
        <figcaption className="pointer-events-none absolute bottom-4 left-4 text-sm font-medium text-white/90 drop-shadow-md sm:text-base">
          {title}
        </figcaption>
      ) : null}
    </figure>
  );
});

export default memo(GalleryItem);