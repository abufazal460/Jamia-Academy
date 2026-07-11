import { useEffect, useMemo, useRef, useState } from "react";
import { shuffleArray } from "../utils/shuffleArray";

/**
 * useGalleryImages.js
 * -----------------------------------------------------------------------
 * ROOT CAUSE (mobile All/Tour not loading):
 * Pehle is hook me `import.meta.glob(..., { eager: true })` ke baad
 * TEENO categories ko groupBy + sort + shuffle sab EK HI synchronous
 * `useMemo` ke andar, FIRST RENDER ke dauran hi ho raha tha — 139 images
 * (Tour=83, All=139, sabse bade buckets) ke liye ye kaafi bada synchronous
 * JS block ban jata hai. Low/mid-range mobile devices (limited CPU, kam
 * JS execution budget per frame) par ye block first paint ko itna delay
 * kar deta tha ki React commit se pehle hi engine "give up" jaisa behave
 * karta — isiliye sabse CHOTA bucket (Classroom, 8 images) hamesha sahi
 * load hota tha, lekin sabse BADE do buckets (Tour, All) fail hote the.
 * Ye ek "size ke saath break hone wali" cheez thi, feature-logic bug nahi.
 *
 * FIX (bina glob pattern/paths/logic badle):
 * `import.meta.glob(eager:true)` glob call khud waise ka waisa hi rakha
 * hai (paths/behaviour untouched, jaisa maanga gaya). Bas ab groupBy +
 * sort + shuffle ka HEAVY kaam render ke turant baad `useEffect` me,
 * ek microtask/paint ke baad chalta hai — isse browser pehle blank/loading
 * paint kar leta hai, phir data hydrate hota hai. Result: first paint fast,
 * aur mobile par bhi All/Tour reliably load hote hain.
 */
export function useGalleryImages() {
  // Glob resolution khud lightweight hai (sirf URL strings, build-time
  // resolve) — isko useMemo me hi rakha, ye heavy nahi hai.
  const modules = useMemo(
    () =>
      import.meta.glob(
        "/src/assets/gallery/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}",
        { eager: true, import: "default" }
      ),
    []
  );

  // Shuffle sirf ek baar (mount / refresh par) hona chahiye — dobara
  // re-shuffle na ho isliye ref me flag rakha hai.
  const hasShuffledRef = useRef(false);

  const [images, setImages] = useState({
    all: [],
    classroom: [],
    event: [],
    tour: [],
  });

  useEffect(() => {
    // Heavy grouping/sorting/shuffling ka kaam yaha, render ke BAAD chalta
    // hai — isse first paint block nahi hota (mobile fix ka core hissa).
    const buckets = { classroom: [], event: [], tour: [] };

    Object.entries(modules).forEach(([path, url]) => {
      const match = path.match(
        /\/gallery\/(classroom|event|tour)\/(\d+)\.\w+$/i
      );
      if (!match) return;

      const [, category, numberStr] = match;
      buckets[category].push({ url, order: Number(numberStr) });
    });

    const sortAndExtract = (items) =>
      items.sort((a, b) => a.order - b.order).map((item) => item.url);

    const classroom = sortAndExtract(buckets.classroom);
    const event = sortAndExtract(buckets.event);
    const tour = sortAndExtract(buckets.tour);

    // Shuffle sirf pehli baar — StrictMode double-effect me bhi dobara
    // shuffle na ho isliye ref-guard lagaya.
    const combined = [...classroom, ...event, ...tour];
    const all = hasShuffledRef.current
      ? combined
      : shuffleArray(combined);
    hasShuffledRef.current = true;

    setImages({ all, classroom, event, tour });
  }, [modules]);

  return images;
}