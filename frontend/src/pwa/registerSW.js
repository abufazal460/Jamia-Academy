import { registerSW } from "virtual:pwa-register";

const UPDATE_CHECK_INTERVAL = 60 * 60 * 1000;

export function initServiceWorker() {
  const updateSW = registerSW({
    immediate: true,
    onRegisteredSW(swUrl, registration) {
      if (!registration) return;
      setInterval(() => {
        registration.update();
      }, UPDATE_CHECK_INTERVAL);
    },
    onNeedRefresh() {
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
      console.error("[PWA] Service worker register nahi ho paya:", error);
    },
  });

  return updateSW;
}
