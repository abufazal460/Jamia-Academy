// File: useParallax.js
// Purpose: Mouse movement ke basis par ek lightweight parallax offset calculate karna
// Responsibility: Hero background layers, floating icons, decorative cards ke liye reusable logic
// Future Usage: FloatingIcon, GlassCard magnetic/tilt effect, Hero decorative layers
// Dependencies: react

import { useEffect, useRef, useState } from "react";

/**
 * useParallax
 * Ye hook kya karta hai: mouse position ke basis par { x, y } offset return karta hai
 * Kyu banaya gaya: taaki har component apna alag mousemove listener na likhe
 * Kab call hoga: jab kisi element ko subtle mouse-follow / parallax movement chahiye
 * Kya return karega: { ref, offset } — ref container pe lagani hai, offset transform me use karna hai
 *
 * @param {number} strength - kitna zyada offset move karega (default halka rakha gaya hai)
 */
const useParallax = (strength = 20) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const frame = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const handleMouseMove = (e) => {
      // requestAnimationFrame se throttle karke performance maintain ki gayi hai
      if (frame.current) cancelAnimationFrame(frame.current);

      frame.current = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const x = ((e.clientX - centerX) / rect.width) * strength;
        const y = ((e.clientY - centerY) / rect.height) * strength;

        setOffset({ x, y });
      });
    };

    const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

    node.addEventListener("mousemove", handleMouseMove);
    node.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      node.removeEventListener("mousemove", handleMouseMove);
      node.removeEventListener("mouseleave", handleMouseLeave);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [strength]);

  return { ref, offset };
};

export default useParallax;
