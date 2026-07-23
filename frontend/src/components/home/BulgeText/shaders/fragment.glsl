uniform sampler2D uTexture;

// ===============================
// CUSTOMIZE TEXT HERE (Opacity)
// ===============================
// Text ki transparency yahan se control hoti hai.
// Ye BulgeText component ke `textOpacity` prop se aati hai.
// Jab DOM se texture ready hota hai tab text achanak show hone ke
// bajaye smoothly fade-in hota hai.

uniform float uOpacity;

varying vec2 vUv;

void main() {
  vec4 finalTexture = texture2D(uTexture, vUv);
  csm_DiffuseColor = vec4(finalTexture.rgb, finalTexture.a * uOpacity);

}