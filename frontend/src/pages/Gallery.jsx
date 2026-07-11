import { useCallback, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { GalleryTabs } from "../components/gallery/GalleryTabs";
import { GalleryGrid } from "../components/gallery/GalleryGrid";
import { Lightbox } from "../components/gallery/Lightbox";
import { useGalleryImages } from "../hooks/useGalleryImages";
// Hinglish: `gallery.css` import HATA diya gaya hai — pehle usme
// gg-border-frame (rotating conic-gradient) aur gg-skeleton (shimmer)
// classes thi, dono ab optimize karke plain Tailwind classes me convert
// ho chuki hain GalleryCard.jsx ke andar. Ab koi custom CSS file ki
// zaroorat nahi.

/**
 * Gallery.jsx
 * -----------------------------------------------------------------------
 * Hinglish: Ye component UNCHANGED hai (naam, structure, state, props
 * sab same) — sirf ek import line hati hai (upar dekhein). Baaki poora
 * orchestration logic bilkul waisa hi hai jaisa pehle tha.
 */
export default function Gallery() {
  const { all, classroom, event, tour } = useGalleryImages();

  const [activeTab, setActiveTab] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null); // null = closed

  // Active tab ke hisaab se sahi image array select karo. useMemo isliye
  // taaki har render par naya array reference na bane (GalleryGrid/GalleryCard
  // ke memo comparisons is wajah se bekaar na ho jayein).
  const activeImages = useMemo(() => {
    switch (activeTab) {
      case "classroom":
        return classroom;
      case "event":
        return event;
      case "tour":
        return tour;
      case "all":
      default:
        return all;
    }
  }, [activeTab, all, classroom, event, tour]);

  // Tab change hote hi lightbox band kar do (agar khula ho) — kyunki
  // lightboxIndex purani array ke context me tha, naye tab me invalid hoga.
  const handleTabChange = useCallback((nextTab) => {
    setActiveTab(nextTab);
    setLightboxIndex(null);
  }, []);

  const handleOpenImage = useCallback((index) => {
    setLightboxIndex(index);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handleNavigateLightbox = useCallback((nextIndex) => {
    setLightboxIndex(nextIndex);
  }, []);

  const isLightboxOpen = lightboxIndex !== null;

  return (
    <section className="mx-auto w-full max-w-[1920px] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 2xl:px-16">
      {/* Page heading */}
      <header className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-500">
          Jamia Academy
        </p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
          Gallery
        </h1>
        <p className="mt-3 text-base text-slate-500 sm:text-lg">
          A look inside our classrooms, events, and learning tours.
        </p>
      </header>

      {/* Tabs */}
      <div className="mb-8 flex justify-center sm:mb-10">
        <GalleryTabs activeTab={activeTab} onChange={handleTabChange} />
      </div>

      {/* Grid — key forces remount of the animation on tab switch */}
      <GalleryGrid
        key={activeTab}
        images={activeImages}
        onOpenImage={handleOpenImage}
      />

      {/* Empty state, defensive coding in case a category has 0 images */}
      {activeImages.length === 0 && (
        <p className="mt-16 text-center text-slate-400">
          No photos in this category yet.
        </p>
      )}

      {/* Fullscreen viewer */}
      <AnimatePresence>
        {isLightboxOpen && (
          <Lightbox
            images={activeImages}
            currentIndex={lightboxIndex}
            onClose={handleCloseLightbox}
            onNavigate={handleNavigateLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  );
}