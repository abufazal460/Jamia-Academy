import { useCallback, useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import { GalleryTabs } from "../features/gallery/components/GalleryTabs";
import { GalleryGrid } from "../features/gallery/components/GalleryGrid";
import { Lightbox } from "../features/gallery/components/Lightbox";
import { useGalleryImages } from "../features/gallery/hooks/useGalleryImages";
import { Helmet } from "react-helmet-async";



export default function Gallery() {
  const { all, classroom, event, tour } = useGalleryImages();

  const [activeTab, setActiveTab] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null); // null = closed


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
    <main className="mx-auto w-full max-w-[1920px] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 2xl:px-16">
      <Helmet>
        <title>Gallery | Jamia Academy</title>
        <meta
          name="description"
          content="Explore photos from Jamia Academy's classrooms, events, and learning tours."
        />
        <link rel="canonical" href="https://www.jamiaacademy.in/gallery" />
        <meta property="og:title" content="Gallery | Jamia Academy" />
        <meta
          property="og:description"
          content="Explore photos from Jamia Academy's classrooms, events, and learning tours."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.jamiaacademy.in/gallery" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gallery | Jamia Academy" />
        <meta property="og:image" content="https://www.jamiaacademy.in/og/home.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://www.jamiaacademy.in/og/home.jpg" />
        <meta name="robots" content="index, follow" />
        <meta property="og:site_name" content="Jamia Academy" />
        <meta property="og:locale" content="en_IN" />
      </Helmet>

      {/* Page heading */}
      <header className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">

        <h1 className="pt-5 mt-5 text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">
          Gallery
        </h1>

      </header>

      {/* Tabs */}
      <div className="mb-4 flex justify-center sm:mb-6">
        <GalleryTabs activeTab={activeTab} onChange={handleTabChange} />
      </div>

      {/* Grid — key forces remount of the animation on tab switch */}
      <GalleryGrid
        key={activeTab}
        images={activeImages}
        onOpenImage={handleOpenImage}
        categoryLabel={activeTab === "all" ? "Gallery" : activeTab}
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
    </main>
  );
}