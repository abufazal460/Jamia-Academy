import { useCallback, useState } from "react";
import SectionHeader from "./SectionHeader";
import InfiniteGallery from "./InfiniteGallery";
import BrowseCoursesCTA from "./BrowseCoursesCTA";
import ImagePreviewModal from "./ImagePreviewModal";

import { galleryData } from "../../data/gallery.data";

export default function CourseGallerySection() {
  const GALLERY_COLUMNS = { desktop: 3, tablet: 2, mobile: 1 };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = useCallback((image) => {
    setSelectedImage(image);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <section
      id="courses-gallery"
      className="relative w-full overflow-hidden bg-neutral-950"
    >
      <div className="mx-auto flex w-full max-w-[1800px] flex-col px-4 py-12 sm:px-6 md:py-16 lg:px-10 lg:py-20 2xl:px-16">

        {/* Heading */}
        <SectionHeader />

        {/* Infinite Gallery */}
        <InfiniteGallery
          images={galleryData}
          columns={GALLERY_COLUMNS}
          gap="2rem"
          desktopHeight="80vh"
          tabletHeight="65vh"
          mobileHeight="55vh"
          perspective={1000}
          scrub={1}
          speed={1}
          animationEnabled
          onImageClick={handleImageClick}
        />

        {/* Bottom CTA */}
        <BrowseCoursesCTA />
      </div>

      {/* Full-screen image preview modal — portaled to document.body */}
      <ImagePreviewModal image={selectedImage} onClose={handleCloseModal} />
    </section>
  );
}