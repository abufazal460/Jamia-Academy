import { useEffect, useRef } from "react";

/**
 * useLockBodyScroll
 *
 * Modal open hote hi background page ka scroll freeze karna zaroori hai —
 * warna user modal ke peeche wali page ko scroll kar sakta hai jabki modal
 * fixed hai, jo UX ko broken feel karata hai (page "jump" karti dikhti hai).
 *
 * @param {boolean} isLocked - true hone par body scroll lock ho jaata hai
 */
export function useLockBodyScroll(isLocked) {
  // Original overflow value ko ref me store karte hain (state nahi) kyunki
  // isse re-render trigger nahi hota — ye sirf ek "remember for later" value hai.
  const originalOverflow = useRef(null);

  useEffect(() => {
    if (!isLocked) return;

    // Pehli baar lock hone par hi original value save karo. Agar effect
    // multiple baar re-run ho (re-renders ki wajah se), purani saved value
    // "hidden" se overwrite nahi honi chahiye — warna restore karte waqt
    // galat (locked) state hi wapas mil jaayegi.
    if (originalOverflow.current === null) {
      originalOverflow.current = document.body.style.overflow;
    }

    document.body.style.overflow = "hidden";

    // Cleanup — modal close ho ya component hi unmount ho jaaye, dono cases
    // me original overflow value wapas restore hoti hai, safely.
    return () => {
      document.body.style.overflow = originalOverflow.current ?? "";
      originalOverflow.current = null;
    };
  }, [isLocked]);
}
