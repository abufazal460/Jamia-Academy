// ===============================
// CUSTOMIZE SHADER SETTINGS HERE
// ===============================
// uBulgeRadius:
// Cursor ke around kitna area bulge hoga.
//
// uBulgeIntensity:
// Bulge kitna bahar niklega.
//
// Dono values BulgeText component ke props
// (bulgeRadius aur bulgeStrength) se control hoti hain.

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