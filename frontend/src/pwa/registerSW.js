// src/pwa/registerSW.js
//
// Production build me hi chalta hai (vite-plugin-pwa devOptions.enabled:false
// hai, isliye `npm run dev` is file ko silently no-op treat karega kyunki
// "virtual:pwa-register" module dev mode me register() ko empty function
// return karta hai — dev workflow break nahi hota).
//
// registerType: "autoUpdate" hone ke bawajood browser sirf navigation ke
// time SW update check karta hai by default — poori tab open rakhne wale
// users (jaise ek institute site pe kaafi der browse karne wale) ko naya
// deployment turant nahi milta. Isliye yahan explicit periodic check bhi
// add kiya hai.

import { registerSW } from "virtual:pwa-register";

const UPDATE_CHECK_INTERVAL = 60 * 60 * 1000; // har 1 ghante me check

export function initServiceWorker() {
  const updateSW = registerSW({
    immediate: true,

    onRegisteredSW(swUrl, registration) {
      if (!registration) return;

      // Tab khuli rehne par bhi naye deployment ka pata chale, isliye
      // periodic background update-check.
      setInterval(() => {
        registration.update();
      }, UPDATE_CHECK_INTERVAL);
    },

    onNeedRefresh() {
      // autoUpdate mode me Workbox naye SW ko khud activate + reload
      // trigger kar deta hai — yahan sirf visibility ke liye console log,
      // koi UI blocking prompt nahi (jaisa production master prompt me
      // "seamless update" maanga gaya hai).
      if (import.meta.env.DEV) {
        console.info("[PWA] Naya version mil gaya, apply ho raha hai...");
      }
    },

    onOfflineReady() {
      if (import.meta.env.DEV) {
        console.info("[PWA] Offline use ke liye ready hai.");
      }
    },

    onRegisterError(error) {
      // Registration fail hone par bhi site normally kaam karti rahe —
      // sirf log karo, kabhi bhi app ko crash/block mat karo.
      console.error("[PWA] Service worker register nahi ho paya:", error);
    },
  });

  return updateSW;
}
