uniform sampler2D uTexture;

// ===============================
// CUSTOMIZE TEXT HERE (opacity)
// ===============================
// Driven by the `textOpacity` prop, and also used internally for a smooth
// GPU-side fade-in once the DOM->texture capture is ready (see Scene.jsx),
// instead of an abrupt pop-in.
uniform float uOpacity;

varying vec2 vUv;

void main() {
  vec4 finalTexture = texture2D(uTexture, vUv);
  csm_DiffuseColor = vec4(finalTexture.rgb, finalTexture.a * uOpacity);
}