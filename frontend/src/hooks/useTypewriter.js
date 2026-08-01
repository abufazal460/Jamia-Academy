import { useEffect, useState } from "react";

/**
 * useTypewriter
 * -------------
 * Ek text ko baar baar type + delete karta hai (infinite loop), bina
 * kisi external library (jaise typed.js) ke — pure setTimeout logic hai.
 *
 * Phases:
 *  - "typing"      -> letter by letter text add ho raha hai
 *  - "pausedFull"  -> pura text likha hua thodi der ruka hua hai
 *  - "deleting"    -> letter by letter text remove ho raha hai
 *  - "pausedEmpty" -> khaali text pe thodi der ruka hua hai, phir dobara
 *                     typing shuru — isse infinite loop ban jaata hai
 */
export function useTypewriter(
  text = "",
  {
    typingSpeed = 45,
    deletingSpeed = 25,
    pauseAfterTyping = 2000,
    pauseAfterDeleting = 500,
  } = {}
) {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    let timeoutId;

    if (phase === "typing") {
      if (displayText.length < text.length) {
        // Agla letter add karo (natural typing speed ke saath)
        timeoutId = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Pura text ho gaya — thodi der pause karo padhne ke liye
        timeoutId = setTimeout(() => setPhase("pausedFull"), pauseAfterTyping);
      }
    } else if (phase === "pausedFull") {
      timeoutId = setTimeout(() => setPhase("deleting"), 0);
    } else if (phase === "deleting") {
      if (displayText.length > 0) {
        // Last letter hatao (natural deleting speed ke saath)
        timeoutId = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        // Poora delete ho gaya — thodi der khaali rehne do
        timeoutId = setTimeout(() => setPhase("pausedEmpty"), pauseAfterDeleting);
      }
    } else if (phase === "pausedEmpty") {
      // Wapas typing phase pe jao — loop yahin se repeat hota hai
      timeoutId = setTimeout(() => setPhase("typing"), 0);
    }

    // Cleanup — agar text/speed props change ho ya component unmount ho
    // to purana pending timeout cancel karo (double-typing bug se bachne ke liye)
    return () => clearTimeout(timeoutId);
  }, [displayText, phase, text, typingSpeed, deletingSpeed, pauseAfterTyping, pauseAfterDeleting]);

  return displayText;
}
