import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import CustomShaderMaterial from "three-custom-shader-material";
import html2canvas from "html2canvas-pro";

import { debounce } from "../../../utils/debounce";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

/**
 * useDomToCanvas
 * -----------------------------------------------------------------------
 * Captures a DOM node into a THREE.CanvasTexture via html2canvas.
 *
 * KEY FIXES vs original implementation:
 * 1. `foreignObjectRendering: true` — delegates rendering to the browser's
 *    native <foreignObject> pipeline instead of html2canvas's own CSS
 *    parser. Fixes the "oklch parsing error" that occurs when the
 *    captured node inherits Tailwind v4 / shadcn `oklch()` color tokens.
 *    (We also avoid the issue at the source — see domTextStyle in Scene —
 *    by only ever giving this node plain inline hex/rgba values, never
 *    Tailwind utility classes.)
 * 2. `scale` explicitly capped to devicePixelRatio (max 2) — fixes blurry
 *    text on retina screens without over-rendering on 3x/4x displays.
 * 3. ResizeObserver instead of a window `resize` listener — catches
 *    layout-driven size changes too, and is scoped/cleaned up per-node.
 * 4. Previous CanvasTexture is explicitly `.dispose()`d before creating a
 *    new one — fixes the GPU memory leak on every resize/regeneration.
 * 5. `captureKey` param — lets the caller force regeneration when the
 *    *content* of the node changes (e.g. `text` prop), not just when the
 *    DOM ref itself changes (which never happens for a stable node).
 */
function useDomToCanvas(domEl, captureKey) {
  const [texture, setTexture] = useState(null);
  const textureRef = useRef(null);

  useEffect(() => {
    if (!domEl) return undefined;

    let cancelled = false;

    const disposePrevious = () => {
      if (textureRef.current) {
        textureRef.current.dispose();
        textureRef.current = null;
      }
    };

    const convertDomToCanvas = async () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      const options = { backgroundColor: null, scale, logging: false };

      let canvas;
      try {
        canvas = await html2canvas(domEl, {
          ...options,
          foreignObjectRendering: true,
        });
      } catch {
        // Fallback for the rare browser where foreignObject capture fails.
        // Safe because domTextStyle (in Scene) never uses oklch-producing
        // Tailwind classes on this node — only plain inline values.
        canvas = await html2canvas(domEl, options);
      }

      if (cancelled) return;

      disposePrevious();
      const newTexture = new THREE.CanvasTexture(canvas);
      newTexture.colorSpace = THREE.SRGBColorSpace;
      newTexture.needsUpdate = true;
      textureRef.current = newTexture;
      setTexture(newTexture);
    };

    convertDomToCanvas();

    const debouncedConvert = debounce(convertDomToCanvas, 150);
    const resizeObserver = new ResizeObserver(debouncedConvert);
    resizeObserver.observe(domEl);

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      debouncedConvert.cancel();
      disposePrevious();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domEl, captureKey]);

  return texture;
}

function Scene({
  text,
  fontSize,
  fontWeight,
  fontFamily,
  letterSpacing,
  lineHeight,
  textTransform,
  textColor,
  textOpacity,
  bulgeRadius,
  bulgeStrength,
  animationSpeed,
  lightColor,
  lightIntensity,
  isMobile,
}) {
  // Selector-based useThree subscriptions: only re-render when the actual
  // width/height value changes (viewport resize), not on every internal
  // R3F store update (pointer, invalidate, etc.) like a bare useThree() does.
  const width = useThree((state) => state.viewport.width);
  const height = useThree((state) => state.viewport.height);

  const [domEl, setDomEl] = useState(null);
  const materialRef = useRef();
  const mouseLerped = useRef({ x: 0, y: 0 });
  const opacityRef = useRef(0);

  // Regenerate the captured texture whenever the visible text/style
  // actually changes (not just once at mount) — see useDomToCanvas docs.
  const captureKey = `${text}|${fontSize}|${fontWeight}|${fontFamily}|${letterSpacing}|${lineHeight}|${textTransform}|${textColor}`;

  const textureDOM = useDomToCanvas(domEl, captureKey);

  // Uniforms object created ONCE and mutated in place afterwards. This is
  // the officially recommended pattern for three-custom-shader-material
  // v6: passing a new object reference every render forces CSM to rebuild
  // the shader program on every render, which is expensive. Mutating
  // `.value` in place (below, via effects/useFrame) keeps the reference
  // stable so CSM never rebuilds after the initial mount.
  const uniforms = useMemo(
    () => ({
      uTexture: { value: null },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uBulgeRadius: { value: bulgeRadius },
      uBulgeIntensity: { value: bulgeStrength },
      uOpacity: { value: 0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    uniforms.uTexture.value = textureDOM;
  }, [textureDOM, uniforms]);

  useEffect(() => {
    uniforms.uBulgeRadius.value = bulgeRadius;
  }, [bulgeRadius, uniforms]);

  useEffect(() => {
    uniforms.uBulgeIntensity.value = bulgeStrength;
  }, [bulgeStrength, uniforms]);

  useFrame((state) => {
    if (!materialRef.current) return;

    const mouse = state.mouse;
    const lerpFactor = 0.1 * animationSpeed;
    mouseLerped.current.x = THREE.MathUtils.lerp(mouseLerped.current.x, mouse.x, lerpFactor);
    mouseLerped.current.y = THREE.MathUtils.lerp(mouseLerped.current.y, mouse.y, lerpFactor);

    uniforms.uMouse.value.x = mouseLerped.current.x;
    uniforms.uMouse.value.y = mouseLerped.current.y;

    // Smooth GPU-side fade-in once texture is ready; fades back out to 0
    // if texture briefly becomes null (e.g. mid-regeneration on resize).
    const targetOpacity = textureDOM ? textOpacity : 0;
    opacityRef.current = THREE.MathUtils.lerp(opacityRef.current, targetOpacity, 0.08);
    uniforms.uOpacity.value = opacityRef.current;
  });

  // ===============================
  // CUSTOMIZE SHADER SETTINGS HERE
  // ===============================
  // Plane subdivision count. Higher = smoother bulge curvature but more
  // GPU/CPU cost. Automatically reduced on mobile.
  const segments = isMobile ? 80 : 200;

  // ===============================
  // CUSTOMIZE TEXT HERE
  // ===============================
  // IMPORTANT: every value here is a PLAIN inline value (hex color,
  // px/rem/vw string, keyword) — never a Tailwind class. This is
  // intentional: Tailwind v4 / shadcn resolve many color utilities
  // through `oklch()` CSS variables, which html2canvas's parser cannot
  // read and throws on. Keeping this node's styling 100% inline avoids
  // that failure mode entirely.
  const domTextStyle = useMemo(
    () => ({
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center", // always centered, no legacy padding-left
      textAlign: "center",
      color: textColor,
      fontWeight,
      fontFamily,
      letterSpacing,
      lineHeight,
      textTransform,
      whiteSpace: "pre-line", // supports \n for multi-line text
      fontSize: fontSize || "clamp(2.5rem, 10vw, 10rem)",
      padding: "0 4vw",
      backgroundColor: "transparent",
    }),
    [textColor, fontWeight, fontFamily, letterSpacing, lineHeight, textTransform, fontSize]
  );

  return (
    <>
      <Html zIndexRange={[-1, -10]} prepend fullscreen>
        <div
          ref={setDomEl}
          style={{ ...domTextStyle, pointerEvents: "none", userSelect: "none" }}
          // Hidden from assistive tech: the real accessible text lives in
          // BulgeText.jsx as a permanent <span className="sr-only">. This
          // node exists only to be rasterized into a texture.
          aria-hidden="true"
        >
          {text}
        </div>
      </Html>

      <mesh>
        <planeGeometry args={[width, height, segments, segments]} />
        <CustomShaderMaterial
          ref={materialRef}
          baseMaterial={THREE.MeshStandardMaterial}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          flatShading
          transparent

        />

        {/* ===============================
            CUSTOMIZE LIGHT SETTINGS HERE
            =============================== */}
        <pointLight
          color={lightColor}
          intensity={lightIntensity}
          distance={12}
          decay={1}
          position={[2, 4, 6]}
        />
      </mesh>
    </>
  );
}

export default Scene;