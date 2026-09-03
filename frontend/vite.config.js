import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      strategy: "generateSW",
      registerType: "autoUpdate",
      devOptions: {
        enabled: false,
      },
      injectRegister: false,
      includeAssets: [
        "favicon.png",
        "robots.txt",
        "sitemap.xml",
        "apple-touch-icon.png",
        "icons/icon-192.png",
        "icons/icon-512.png",
        "icons/maskable-icon-512.png",
      ],
      manifest: {
        id: "/",
        name: "Jamia Academy - Computer, Web Development & AI Courses",
        short_name: "Jamia Academy",
        description:
          "Offline, instructor-led computer courses in Jamia Nagar, Delhi — Web Development, Data Analytics, Graphic Design, AI/ML, Tally, AutoCAD and more.",
        lang: "en-IN",
        dir: "ltr",
        start_url: "/",
        scope: "/",
        display: "standalone",
        display_override: ["standalone", "minimal-ui", "browser"],
        orientation: "any",
        theme_color: "#C45A3C",
        background_color: "#FFFDF7",
        categories: ["education", "business"],
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/maskable-icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        shortcuts: [
          {
            name: "Courses",
            short_name: "Courses",
            description: "Browse all courses",
            url: "/course",
            icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
          },
          {
            name: "Gallery",
            short_name: "Gallery",
            description: "View campus gallery",
            url: "/gallery",
            icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
          },
          {
            name: "Verify Certificate",
            short_name: "Certificate",
            description: "Verify a Jamia Academy certificate",
            url: "/certificate",
            icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
          },
          {
            name: "Contact",
            short_name: "Contact",
            description: "Get in touch",
            url: "/contact",
            icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
          },
        ],
      },

      workbox: {
        globPatterns: [
          "**/*.{js,css,html,woff,woff2,ttf,otf,svg,ico}",
        ],
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [
          /^\/api\//,
        ],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,

        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|webp|avif|gif|svg)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "jamia-images",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 din
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /\.(?:woff2?|ttf|otf)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "jamia-fonts",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 365 * 24 * 60 * 60,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/api\.emailjs\.com\//,
            handler: "NetworkOnly",
          },
        ],
      },
    }),],
});
