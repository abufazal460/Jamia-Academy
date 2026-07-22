// ===============================
// CUSTOMIZE SHADER SETTINGS HERE
// ===============================
// uBulgeRadius   -> how large the bulge circle is around the cursor (0–1, UV space)
// uBulgeIntensity -> how far the mesh pushes toward the camera (Z displacement)
// Both are now React-controllable via the `bulgeRadius` / `bulgeStrength` props
// on <BulgeText />, instead of being hardcoded here.

uniform vec2 uMouse;
uniform float uBulgeRadius;
uniform float uBulgeIntensity;

varying vec2 vUv;

float circle(vec2 uv, vec2 circlePosition, float radius) {
  float dist = distance(circlePosition, uv);
  return 1.0 - smoothstep(0.0, radius, dist);
}

float elevation(vec2 uv, float radius, float intensity) {
  float circleShape = circle(uv, (uMouse * 0.5) + 0.5, radius);
  return circleShape * intensity;
}

void main() {
  vec3 newPosition = position;
  newPosition.z += elevation(uv, uBulgeRadius, uBulgeIntensity);

  csm_Position = newPosition;
  vUv = uv;
}