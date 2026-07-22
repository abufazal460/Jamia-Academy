import SectionHeader from "./SectionHeader";
import InfiniteGallery from "./InfiniteGallery";
import BrowseCoursesCTA from "./BrowseCoursesCTA";

import { galleryData } from "../../../data/galleryData";

export default function CourseGallerySection() {
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
          columns={{
            desktop: 3,
            tablet: 2,
            mobile: 1,
          }}
          gap="2rem"
          desktopHeight="80vh"
          tabletHeight="65vh"
          mobileHeight="55vh"
          perspective={1000}
          scrub={1}
          speed={1}
          animationEnabled
        />

        {/* Bottom CTA */}
        <BrowseCoursesCTA />
      </div>
    </section>
  );
}