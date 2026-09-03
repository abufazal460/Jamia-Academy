export function buildGalleryData() {
  const modules = import.meta.glob("../../../assets/images/home/empower-course/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
  });

  return Object.entries(modules).map(([path, image], index) => ({
    id: index + 1,
    image,
    title: "",
    alt: `Gallery image ${index + 1}`,
  }));
}

export const galleryData = buildGalleryData();
