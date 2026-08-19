const CURVE_POINTS = 12;

export function buildCurtainPath(progress, options = {}) {
  const { width = 100, height = 100, waveAmplitude = 6 } = options;

  const clamped = Math.max(0, Math.min(2, progress));
  const topEdge = height - clamped * height;
  const bottomEdge = topEdge + height;

  const amp = Math.sin(Math.min(clamped, 2 - clamped) * Math.PI) * waveAmplitude;

  const topPoints = [];
  const bottomPoints = [];

  for (let i = 0; i <= CURVE_POINTS; i++) {
    const x = (width / CURVE_POINTS) * i;
    const phase = (i / CURVE_POINTS) * Math.PI * 2;
    const topY = topEdge + Math.sin(phase + clamped * Math.PI * 2) * amp;
    const bottomY = bottomEdge + Math.sin(phase + clamped * Math.PI * 2 + Math.PI) * (amp * 0.6);
    topPoints.push([x, topY]);
    bottomPoints.push([x, bottomY]);
  }

  let d = `M ${topPoints[0][0].toFixed(2)} ${topPoints[0][1].toFixed(2)} `;
  for (let i = 1; i < topPoints.length; i++) {
    d += `L ${topPoints[i][0].toFixed(2)} ${topPoints[i][1].toFixed(2)} `;
  }
  for (let i = bottomPoints.length - 1; i >= 0; i--) {
    d += `L ${bottomPoints[i][0].toFixed(2)} ${bottomPoints[i][1].toFixed(2)} `;
  }
  d += "Z";
  return d;
}

// Slower + smoother, with a brief hold at full coverage so the cover
// doesn't feel like it "snaps" straight into navigation.
export const TRANSITION_TIMING = {
  coverDuration: 1.0,
  holdDuration: 0.18,
  revealDuration: 1.0,
  ease: "power4.inOut",
};