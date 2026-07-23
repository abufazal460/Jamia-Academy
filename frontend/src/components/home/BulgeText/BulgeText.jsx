import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { useIsMobile } from "../../../hooks/useismobile";

// Static GL settings
// Ye settings kabhi change nahi hoti,
// isliye component ke bahar rakhi gayi hain.
// Isse unnecessary re-render aur useMemo ki need nahi padti.
//
// preserveDrawingBuffer intentionally use nahi kiya gaya,
// kyunki hum WebGL canvas ka screenshot nahi le rahe.
// Hum sirf DOM ko texture me convert kar rahe hain.
const GL_SETTINGS = { antialias: true, alpha: true };

/**
 * useDomToCanvas
 * -------------------------------------------------------
 * Ye hook DOM element ko html2canvas ki help se
 * THREE.CanvasTexture me convert karta hai.
 *
 * Is version me improvements:
 *
 * 1.
 * foreignObjectRendering enable hai.
 * Isse Tailwind CSS v4 ke color issues
 * (oklch error) avoid hote hain.
 *
 * 2.
 * Retina display ke liye text sharp rahe
 * isliye DPR max 2 rakha gaya hai.
 *
 * 3.
 * Window resize listener ki jagah
 * ResizeObserver use hua hai.
 *
 * 4.
 * Purani texture ko dispose karte hain
 * taaki GPU memory leak na ho.
 *
 * 5.
 * Agar text ya style change ho
 * to texture dobara generate ho jaye.
 */
function BulgeText({
  // ===============================
  // CUSTOMIZE TEXT HERE
  // ===============================
  text = "Jamia Academy",
  fontSize, // e.g. "8rem" — if omitted, a responsive clamp() is used
  fontWeight = 700,
  fontFamily = "inherit",
  letterSpacing = "-0.02em",
  lineHeight = 0.9,
  textTransform = "none", // "none" | "uppercase" | "lowercase"

  // ===============================
  // CUSTOMIZE COLORS HERE
  // ===============================
  textColor = "#f0f0f0",
  textOpacity = 1,

  // ===============================
  // CUSTOMIZE BACKGROUND HERE
  // ===============================
  backgroundColor = "#101014",
  backgroundImage, // e.g. "/images/hero-bg.jpg"
  backgroundGradient, // e.g. "linear-gradient(180deg, #101014 0%, #1c1c24 100%)"
  backgroundVideo, // e.g. "/videos/hero-loop.mp4"

  // ===============================
  // CUSTOMIZE SHADER SETTINGS HERE
  // ===============================
  bulgeRadius = 0.2,
  bulgeStrength = 0.7,
  animationSpeed = 1, // multiplies mouse-follow responsiveness

  // ===============================
  // CUSTOMIZE LIGHT SETTINGS HERE
  // ===============================
  lightColor = "#ffffff",
  lightIntensity = 30,

  height = "clamp(420px, 70vh, 900px)",
  width = "100%",
  className = "",
  style,
}) {
  const isMobile = useIsMobile();

  // dpr is a plain array literal recalculated per render — deliberately
  // NOT wrapped in useMemo. It's a 2-element array creation, cheaper than
  // the memoization bookkeeping itself would be.
  const dpr = isMobile ? [1, 1.5] : [1, 2];

  let backgroundStyle;
  if (backgroundGradient) {
    backgroundStyle = { background: backgroundGradient };
  } else if (backgroundImage) {
    backgroundStyle = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  } else {
    backgroundStyle = { backgroundColor };
  }

  return (
    <section
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height, width, ...style }}
      aria-label={`${text} — animated heading`}
    >
      {/* Background layer — swappable without touching shader logic */}
      <div className="absolute inset-0 z-0" style={backgroundStyle} aria-hidden="true">
        {backgroundVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={backgroundVideo}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        )}
      </div>

      {/* Real, permanent, accessible text — the single source of truth
          for screen readers / SEO. The WebGL canvas below is decorative. */}
      <span className="sr-only">{text}</span>

      <Canvas
        dpr={dpr}
        gl={GL_SETTINGS}
        camera={{ fov: 55, near: 0.1, far: 200 }}
        className="!absolute !inset-0 z-10"
      >
        <Scene
          text={text}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontFamily={fontFamily}
          letterSpacing={letterSpacing}
          lineHeight={lineHeight}
          textTransform={textTransform}
          textColor={textColor}
          textOpacity={textOpacity}
          bulgeRadius={bulgeRadius}
          bulgeStrength={bulgeStrength}
          animationSpeed={animationSpeed}
          lightColor={lightColor}
          lightIntensity={lightIntensity}
          isMobile={isMobile}
        />
      </Canvas>
    </section>
  );
}

export default BulgeText;