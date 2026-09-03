import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(), 
    VitePWA({
        // "generateSW" — Workbox khud SW generate karta hai build ke time,
        // hand-written SW maintain nahi karna padta (kam code, kam bugs).
        strategy: "generateSW",
  
        // autoUpdate: naya deployment aane par SW khud background me update
        // ho jaata hai — user permanently purani cached files pe stuck nahi
        // rehta (requirement #14).
        registerType: "autoUpdate",
  
        // Dev server pe SW register NAHI hota — is se dev workflow safe
        // rehta hai (requirement #13). Sirf production build me active hoga.
        devOptions: {
          enabled: false,
        },
  
        // SW registration khud humara custom script (src/pwa/registerSW.js)
        // karega — is se update-check aur console logging pe control milta hai.
        injectRegister: false,
  
        // public/ folder ki yeh files already static hain — inhe bhi
        // app-shell ke saath precache karo taaki offline pe bhi available rahein.
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
          // Real project branding — SEO.jsx aur index.html se liya gaya,
          // kahin bhi invented/fake data nahi hai.
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
          // Brand colors — src/style/global.css ke real CSS variables se:
          // --color-text-accent (#C45A3C) aur --color-bg-primary (#FFFDF7)
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
          // NOTE: `screenshots` jaanbujh kar add nahi kiya — real screenshots
          // ki zaroorat hoti hai (wide + narrow form factor), fake/placeholder
          // images invent nahi kar sakte. Baad me real screenshots aane par
          // yahan add kar dena (optional, install UI thoda richer ho jaata hai).
        },
  
        workbox: {
          // App-shell + static build assets precache — CSS, JS, fonts, HTML.
          globPatterns: [
            "**/*.{js,css,html,woff,woff2,ttf,otf,svg,ico}",
          ],
  
          // SPA routing: koi bhi navigation jo precache me match na ho,
          // usko cached index.html serve karo — refresh/direct-URL par
          // route error nahi aayega (requirement #16, #19).
          navigateFallback: "/index.html",
          navigateFallbackDenylist: [
            // future me agar koi backend API route add ho, SW usse
            // interfere na kare — abhi is project me koi /api/* route nahi
            // hai (certificate verification bhi fully local hai), lekin
            // yeh safety-net rakhna production-safe practice hai.
            /^\/api\//,
          ],
  
          // Purane precache versions khud-ba-khud clean ho jaate hain —
          // stale cache build-up nahi hota.
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
  
          runtimeCaching: [
            // ---- IMAGES (course thumbnails, gallery photos, etc.) ----
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
            // ---- FONTS (self-hosted @font-face files) ----
            {
              urlPattern: /\.(?:woff2?|ttf|otf)$/i,
              handler: "CacheFirst",
              options: {
                cacheName: "jamia-fonts",
                expiration: {
                  maxEntries: 30,
                  maxAgeSeconds: 365 * 24 * 60 * 60, // 1 saal — fonts kabhi change nahi hote
                },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
            // ---- SENSITIVE: EmailJS form submissions — KABHI cache mat karo ----
            {
              urlPattern: /^https:\/\/api\.emailjs\.com\//,
              handler: "NetworkOnly",
            },
          ],
        },
      }),],
});
