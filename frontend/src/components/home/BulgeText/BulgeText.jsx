// frontend/src/components/home/BulgeText/BulgeText.jsx

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import BulgeScene from "./BulgeScene";
import useIsMobile from "../../../hooks/useIsMobile";

/**
 * BulgeText
 * ----------------------------------------------------------------------
 * Interactive 3D "bulge" text effect for the Home page.
 * Renders a DOM text string as a canvas texture (via html2canvas inside
 * BulgeScene), maps it onto a displaced plane mesh, and bulges the mesh
 * toward the cursor using a custom GLSL shader.
 *
 * This component only owns:
 *   - The section wrapper (layout, sizing, positioning in the page flow)
 *   - The <Canvas> (R3F root) + responsive quality settings
 *   - Suspense boundary so heavy 3D deps don't block the rest of Home.jsx
 *
 * All 3D/shader logic lives in BulgeScene.jsx (kept separate on purpose,
 * so this file stays a thin, reusable "host" component).
 *
 * @param {Object} props
 * @param {string} [props.text="Jamia Academy"] - Text rendered inside the effect.
 * @param {string} [props.className=""] - Extra classes for the outer section wrapper.
 * @param {string} [props.heightClassName="h-[70vh] md:h-[80vh]"] - Tailwind height classes.
 *        Kept as a prop (not hardcoded) so different pages/sections can reuse this
 *        component with different vertical space without editing this file.
 */
function BulgeText({
  text = "Jamia Academy",
  className = "",
  heightClassName = "h-[70vh] md:h-[80vh]",
}) {
  const isMobile = useIsMobile();

  // Lower DPR + disable preserveDrawingBuffer on mobile to save GPU/battery.
  // preserveDrawingBuffer is only needed if we ever need to screenshot the
  // WebGL canvas itself; the DOM->texture capture (html2canvas) does NOT
  // need it, so we keep it off by default and only enable on desktop where
  // the perf cost is negligible and it avoids any edge-case blank-frame issues.
  const glSettings = useMemo(
    () => ({
      antialias: true,
      preserveDrawingBuffer: !isMobile,
      alpha: true,
    }),
    [isMobile]
  );

  const dpr = isMobile ? [1, 1.5] : [1, 2];

  return (
    <section
      className={`relative w-full overflow-hidden bg-[#101014] ${heightClassName} ${className}`}
      aria-label={`${text} — animated section heading`}
    >
      {/*
        Real, accessible text kept in the DOM (visually hidden) so screen
        readers / SEO see it even though the visible version is a WebGL
        canvas texture. BulgeScene renders its own DOM copy for html2canvas
        to capture, but that copy is not guaranteed to stay accessible after
        being pushed off-screen via the Html zIndexRange trick — so we keep
        one clean, always-accessible source of truth here.
      */}
      <span className="sr-only">{text}</span>

      <Suspense
        fallback={
          <div
            className={`flex items-center justify-center w-full h-full text-white/40 ${heightClassName}`}
          >
            {/* Lightweight, layout-matching fallback avoids CLS while
                three/fiber + drei + shaders chunk is being fetched. */}
            <span className="text-sm tracking-wide">Loading…</span>
          </div>
        }
      >
        <Canvas
          dpr={dpr}
          gl={glSettings}
          camera={{
            fov: 55,
            near: 0.1,
            far: 200,
          }}
          // Keep the canvas transparent so it composites with the section
          // background above, instead of forcing its own opaque backdrop.
          className="!absolute !inset-0"
        >
          <BulgeScene text={text} isMobile={isMobile} />
        </Canvas>
      </Suspense>
    </section>
  );
}

export default BulgeText;