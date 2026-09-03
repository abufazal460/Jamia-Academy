import { useMemo } from "react";
import { shuffleArray } from "../../../shared/utils/array";

export function useGalleryImages() {
  const modules = useMemo(
    () =>
      import.meta.glob(
        "/src/assets/images/gallery/**/*.{webp,jpg,jpeg,png,JPG,JPEG,PNG}",
        { eager: true, import: "default" }
      ),
    []
  );

  return useMemo(() => {
    const buckets = { classroom: [], event: [], tour: [] };
    Object.entries(modules).forEach(([path, url]) => {
      const match = path.match(/\/gallery\/(classroom|event|tour)\/(\d+)\.\w+$/i);
      if (!match) return;
      const [, category, numberStr] = match;
      buckets[category].push({ url, order: Number(numberStr) });
    });
    const sortAndExtract = (items) =>
      items.sort((a, b) => a.order - b.order).map((item) => item.url);
    const classroom = sortAndExtract(buckets.classroom);
    const event = sortAndExtract(buckets.event);
    const tour = sortAndExtract(buckets.tour);
    const all = shuffleArray([...classroom, ...event, ...tour]);
    return { all, classroom, event, tour };
  }, [modules]);

}