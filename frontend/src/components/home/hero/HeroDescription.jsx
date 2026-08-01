import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useLetterHover } from "../../../hooks/useLetterHover";

/**
 * HeroDescription.jsx
 * --------------------
 * Ek paragraph text leke uske har letter ko individually motion.span mein
 * wrap karta hai, taaki hover pe har letter alag se react kare (scale up +
 * halka upar uthna, jaisa brief mein maanga gaya tha).
 *
 * REUSABLE: Ye component "text" aur "tone" props leta hai, isliye Hero.jsx
 * mein dono description paragraphs (primary + secondary) ke liye SAME
 * component reuse hota hai — koi duplicate JSX nahi likhna padta
 * (heroData.js ke array pe bas .map() chal raha hai).
 *
 * PERFORMANCE: text.split("") ko useMemo mein rakha hai taaki har
 * re-render pe letters array dobara na bane (text prop change na ho tab tak).
 */
function HeroDescription({ text, tone }) {
  const { variants } = useLetterHover();

  const letters = useMemo(() => text.split(""), [text]);
  const toneClass = tone === "primary" ? "text-slate-300" : "text-slate-400";

  return (
    // clamp() font-size — mini phones pe readable rehta hai (bahut chhota
    // nahi hota), aur large desktops pe body-text jaisa hi proportionate
    // rehta hai (heading jitna dominant kabhi nahi hota — visual hierarchy
    // maintain rehti hai)
    <p className={`text-[clamp(0.8125rem,2.1vw,1rem)] leading-relaxed ${toneClass}`}>
      {letters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial="rest"
          whileHover="hover"
          variants={variants}
          // inline-block zaroori hai taaki scale/translateY transforms apply
          // ho sakein (plain inline text pe transform kaam nahi karta).
          // whiteSpace: "pre" spaces ko preserve karta hai taaki words ke
          // beech ka gap collapse na ho jaaye.
          className="inline-block will-change-transform"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </p>
  );
}

export default memo(HeroDescription);
