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
  newPosition.z += 2.0; // abhi ke liye TEMP-DEBUG line rehne do, test ke baad hatayenge

  csm_PositionRaw = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  vUv = uv;
}