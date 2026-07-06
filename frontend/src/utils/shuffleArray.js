/**
 * shuffleArray.js
 * -----------------------------------------------------------------------
 * Hinglish: Ye ek pure utility function hai jo Fisher-Yates algorithm use
 * karke kisi bhi array ko randomly shuffle karta hai.
 *
 * WHY: "All" tab me images har page-refresh par random order me dikhani
 * hain. Fisher-Yates isliye use kiya kyunki ye O(n) hai aur truly uniform
 * random permutation deta hai (naive `.sort(() => Math.random() - 0.5)`
 * biased hota hai, isliye use nahi kiya).
 *
 * WHAT: Original array ko mutate nahi karta — ek naya shuffled array
 * return karta hai (immutability = predictable React state updates).
 */
export function shuffleArray(sourceArray) {
  const array = [...sourceArray];

  for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
    // Random index 0..currentIndex ke beech
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

    // Swap current <-> random (destructuring swap, no temp variable needed)
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}