// src/components/home/TextPressure/TextPressure.jsx
import {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  memo,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/* Pure math helpers (kept identical to the original CodePen physics)          */
/* -------------------------------------------------------------------------- */

const dist = (a, b) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (distance, maxDist, minVal, maxVal) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

/* -------------------------------------------------------------------------- */
/* Shared, page-level variable-font loader.                                    */
/* A stylesheet is a page resource, not a component-owned side effect, so it   */
/* is loaded once and cached by URL — never removed on unmount (that would     */
/* just force a refetch + FOUT on every remount for no benefit).               */
/* -------------------------------------------------------------------------- */

const loadedFontLinks = new Map();

function ensureFontLoaded(href) {
  if (typeof document === "undefined" || !href) return Promise.resolve();
  if (loadedFontLinks.has(href)) return loadedFontLinks.get(href);

  const promise = new Promise((resolve) => {
    const existing = document.querySelector(
      `link[data-text-pressure-font="${href}"]`
    );
    if (existing) {
      resolve();
      return;
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.textPressureFont = href;
    link.onload = () => resolve();
    link.onerror = () => resolve();
    document.head.appendChild(link);
  });

  loadedFontLinks.set(href, promise);
  return promise;
}

const DEFAULT_FONT_URL =
  "https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap";

/* -------------------------------------------------------------------------- */

const TextPressure = ({
  text = "JAMIA ACADEMY",
  fontFamily = "Roboto Flex",
  fontUrl = DEFAULT_FONT_URL,

  width = true,
  weight = true,
  italic = true,
  alpha = false,

  flex = true,
  stroke = false,
  scale = false,

  textColor = "#FDF6E9",
  strokeColor = "#FF6B5E",
  strokeWidth = 2,
  className = "",

  minFontSize = 32,
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);
  const [fontReady, setFontReady] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  const chars = useMemo(() => text.split(""), [text]);

  /* Trim stale refs if `text` length shrinks between renders. */
  useEffect(() => {
    spansRef.current = spansRef.current.slice(0, chars.length);
  }, [chars]);

  /* Load the variable font once (shared across mounts). */
  useEffect(() => {
    let cancelled = false;
    ensureFontLoaded(fontUrl).then(() => {
      if (!cancelled) setFontReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [fontUrl]);

  /* Pointer tracking. */
  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = (e) => {
      const t = e.touches[0];
      if (!t) return;
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    if (containerRef.current) {
      const { left, top, width: w, height: h } =
        containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + w / 2;
      mouseRef.current.y = top + h / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  /* Sizing: recompute font size / scale-Y ratio on layout change. */
  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;
    const { width: containerW, height: containerH } =
      containerRef.current.getBoundingClientRect();
    if (containerW === 0) return;

    let newFontSize = containerW / (chars.length / 2 || 1);
    newFontSize = Math.max(newFontSize, minFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();
      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    setSize();

    let timeoutId;
    const debouncedSetSize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(setSize, 100);
    };

    window.addEventListener("resize", debouncedSetSize);

    let resizeObserver;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      resizeObserver = new ResizeObserver(debouncedSetSize);
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedSetSize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [setSize]);

  /* Core pressure animation loop — DOM writes only, no React state per char. */
  useEffect(() => {
    if (prefersReducedMotion) {
      spansRef.current.forEach((span) => {
        if (!span) return;
        span.style.fontVariationSettings = `'wght' 500, 'wdth' 100, 'ital' 0`;
        if (alpha) span.style.opacity = "1";
      });
      return undefined;
    }

    let isVisible = false;
    const io = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    if (containerRef.current) io.observe(containerRef.current);

    const animate = () => {
        if (isVisible && !document.hidden) {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2 || 1;

        spansRef.current.forEach((span) => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
          };
          const d = dist(mouseRef.current, charCenter);

          const wdth = width ? Math.floor(getAttr(d, maxDist, 5, 200)) : 100;
          const wght = weight
            ? Math.floor(getAttr(d, maxDist, 100, 900))
            : 400;
          const italVal = italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : 0;
          const alphaVal = alpha ? getAttr(d, maxDist, 0, 1).toFixed(2) : 1;

          const newSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
          if (span.style.fontVariationSettings !== newSettings) {
            span.style.fontVariationSettings = newSettings;
          }
          if (alpha && span.style.opacity !== String(alphaVal)) {
            span.style.opacity = alphaVal;
          }
        });
      }

    }
      
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      io.disconnect();
    };
  }, [width, weight, italic, alpha, prefersReducedMotion]);

  const handleActivate = useCallback(() => setIsActive(true), []);
  const handleDeactivate = useCallback(() => setIsActive(false), []);

  const strokeStyleTag = useMemo(() => {
    if (!stroke) return null;
    return (
      <style>{`
        .text-pressure-stroke span { position: relative; }
        .text-pressure-stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: ${strokeWidth}px;
          -webkit-text-stroke-color: ${strokeColor};
        }
      `}</style>
    );
  }, [stroke, strokeWidth, strokeColor]);

  const hoverMotionProps = prefersReducedMotion
    ? {}
    : {
      whileHover: { scale: 1.012, y: -4 },
      whileFocus: { scale: 1.012, y: -4 },
      transition: { type: "spring", stiffness: 220, damping: 22 },
    };

  return (
    <motion.div
      ref={containerRef}
      tabIndex={0}
      onMouseEnter={handleActivate}
      onMouseLeave={handleDeactivate}
      onFocus={handleActivate}
      onBlur={handleDeactivate}
      onTouchStart={handleActivate}
      onTouchEnd={handleDeactivate}
      className={`group relative w-full h-full flex items-center justify-center overflow-hidden  outline-none
        focus-visible:ring-2 focus-visible:ring-jamia-coral/70
        bg-[linear-gradient(135deg,#0b1120_0%,#131a2e_45%,#0b1120_100%)]
        ${className}`}
      style={{ willChange: "transform" }}
      {...hoverMotionProps}
    >
      {/* gradient border (mask trick — ring only, no layout impact) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl p-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{
          background:
            "linear-gradient(120deg, #ff6b5e, #7c3aed, #14b8a6, #ff9f45, #ff6b5e)",
          WebkitMask:
            "linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* animated hover background wash */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{
          background:
            "linear-gradient(115deg, #0b1120 0%, #3b2a5c 30%, #123b3c 55%, #4a1f3d 80%, #0b1120 100%)",
          backgroundSize: "200% 200%",
        }}
        animate={
          !prefersReducedMotion && isActive
            ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
            : { backgroundPosition: "0% 50%" }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* soft glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60 group-focus-visible:opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,107,94,0.35), rgba(124,58,237,0.25), transparent 70%)",
        }}
      />

      {/* diagonal shine sweep */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-[-60%] w-1/3 rounded-3xl opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
          style={{
            background:
              "linear-gradient(75deg, transparent 0%, rgba(255,255,255,0.22) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.22) 55%, transparent 100%)",
            transform: "skewX(-20deg)",
          }}
          animate={
            isActive ? { left: ["-60%", "160%"] } : { left: "-60%" }
          }
          transition={{
            duration: 1.1,
            ease: "easeInOut",
            repeat: isActive ? Infinity : 0,
            repeatDelay: 0.6,
          }}
        />
      )}

      {strokeStyleTag}

      <p
        ref={titleRef}
        className={`text-pressure-title relative z-10 m-0 w-full select-none uppercase text-center
          px-4 sm:px-6 md:px-10
          ${flex ? "flex justify-between" : ""}
          ${stroke ? "text-pressure-stroke" : ""}`}
        style={{
          fontFamily: fontReady ? `"${fontFamily}", sans-serif` : "sans-serif",
          fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: "center top",
          fontWeight: 100,
          color: stroke ? undefined : textColor,
        }}
        aria-hidden="true"
      >
        {chars.map((char, i) => (
          <span
            key={`${char}-${i}`}
            ref={(el) => {
              spansRef.current[i] = el;
            }}
            data-char={char}
            className="inline-block bg-clip-text transition-colors duration-500 group-hover:text-transparent group-focus-visible:text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(180deg, #fdf6e9 0%, #ff9f45 50%, #14b8a6 100%)",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </p>
    </motion.div>
  );
};

export default memo(TextPressure);