// frontend/src/components/home/BulgeText/BulgeText.jsx

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import BulgeScene from "./Scene";
import { useIsMobile } from "../../../hooks/useismobile";

/**
 * BulgeText
 * ----------------------------------------------------------------------
 * Interactive 3D "bulge" text effect for the Home page.
 */
function BulgeText({
  text = "Jamia Academy",
  className = "",
  heightClassName = "h-[70vh] md:h-[80vh]",
}) {
  const isMobile = useIsMobile();

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
      className={`bulge-text-root relative w-full overflow-hidden bg-[#101014] ${heightClassName} ${className}`}
      aria-label={`${text} — animated section heading`}
    >
      <span className="sr-only">{text}</span>

      <Suspense
        fallback={
          <div
            className={`flex items-center justify-center w-full h-full text-white/40 ${heightClassName}`}
          >
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
          className="!absolute !inset-0"
        >
          <BulgeScene text={text} isMobile={isMobile} />
        </Canvas>
      </Suspense>
    </section>
  );
}

export default BulgeText;