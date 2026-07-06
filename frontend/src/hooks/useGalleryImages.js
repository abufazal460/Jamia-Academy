import { useMemo } from "react";
import { shuffleArray } from "../utils/shuffleArray";

/**
 * useGalleryImages.js
 * -----------------------------------------------------------------------
 * Hinglish: Ye hook Vite ke `import.meta.glob` feature ka use karke
 * src/assets/gallery/{classroom,event,tour}/ folder ke andar ki SAARI
 * images ko automatically (bina kisi filename hardcode kiye) load karta
 * hai.
 *
 * WHY import.meta.glob:
 * - Classroom me 8 images hain, event me 48, tour me 83 — agar hum
 *   `1.jpg`, `2.jpg`... har ek ko manually import karte to ye 139 import
 *   lines ban jaati aur naya photo add/remove karne par code change karna
 *   padta. glob() build-time par folder scan karke khud hi sab kuch
 *   resolve kar deta hai — future-proof aur maintainable.
 * - `eager: true` isliye kyunki hume sirf resolved asset URL (string)
 *   chahiye synchronously, actual image bytes browser me tabhi fetch
 *   honge jab <img loading="lazy" /> viewport ke paas aayega. Isliye
 *   `eager: true` performance ko nuksaan nahi pahunchata.
 *
 * WHAT it returns:
 * {
 *   all:       string[] of ALL images, shuffled once per mount (= per refresh)
 *   classroom: string[] of classroom images (natural numeric order)
 *   event:     string[] of event images
 *   tour:      string[] of tour images
 * }
 */
export function useGalleryImages() {
  return useMemo(() => {
    // Glob pattern teeno extensions (.jpg/.jpeg/.png) ko cover karta hai
    // kyunki tour folder me .jpeg use hua hai jabki baaki me .jpg.
    const modules = import.meta.glob(
      "/src/assets/gallery/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}",
      { eager: true, import: "default" }
    );

    // Har path se category nikaal ke ek object me group karte hain, saath
    // hi filename se numeric index nikaal ke natural sort ke liye rakhte hain.
    const buckets = { classroom: [], event: [], tour: [] };

    Object.entries(modules).forEach(([path, url]) => {
      const match = path.match(
        /\/gallery\/(classroom|event|tour)\/(\d+)\.\w+$/i
      );
      if (!match) return; // koi unexpected file ho to silently skip

      const [, category, numberStr] = match;
      buckets[category].push({ url, order: Number(numberStr) });
    });

    // Numeric (natural) order me sort karna zaroori hai kyunki string sort
    // "10.jpg" ko "2.jpg" se pehle rakh deta — jo galat hai.
    const sortAndExtract = (items) =>
      items.sort((a, b) => a.order - b.order).map((item) => item.url);

    const classroom = sortAndExtract(buckets.classroom);
    const event = sortAndExtract(buckets.event);
    const tour = sortAndExtract(buckets.tour);

    // "All" tab ke liye teeno categories combine karke ek baar shuffle.
    // useMemo ki empty dependency array ki wajah se ye sirf component
    // mount (= browser refresh) par chalta hai, re-render par nahi —
    // isse tab switch karne par images baar baar shuffle nahi hoti.
    const all = shuffleArray([...classroom, ...event, ...tour]);

    return { all, classroom, event, tour };
  }, []);
}