"use client"; // Agar Next.js App Router use kar rahe hain to ye line zaroori hai —
// Canvas ek browser-only API hai (server pe exist nahi karta), isliye is
// component ko client-side pe hi render hone ke liye "use client" likha hai.
// Agar aap plain React (Vite/CRA) use kar rahe hain to ye line safely
// ignore ho jayegi (koi error nahi degi), isliye hata na bhi to chalega.

import { useEffect, useRef, useState } from "react";

/**
 * SpaceBackground
 * -----------------------------------------------------------------------
 * Ye ek PURE BACKGROUND component hai — iska kaam sirf ek realistic,
 * static (non-moving) night-sky jaisa deep-space canvas render karna hai.
 *
 * IMPORTANT (parent section ke liye):
 * Ye component APNE PARENT CONTAINER ke andar fit hota hai — poore page
 * (viewport) ko cover nahi karta jaise pehle wala version karta tha.
 * Isiliye jis bhi section (jaise Contact Form section) ke peeche ye
 * background chahiye, us section ko `position: relative` dena hoga, aur
 * is component ko us section ke sabse pehle child ke roop mein daalna
 * hoga (Contact Form us ke baad, taaki form background ke UPAR dikhe).
 *
 * USAGE EXAMPLE (Contact Section ke andar):
 * -----------------------------------------------------------------------
 *   <section className="relative min-h-screen overflow-hidden">
 *     <SpaceBackground />
 *     <div className="relative z-10">
 *       <ContactForm />
 *     </div>
 *   </section>
 * -----------------------------------------------------------------------
 *
 * NOTE ON TAILWIND:
 * Canvas ke andar star/glow/nebula draw karna Tailwind se possible nahi
 * hai (Tailwind sirf CSS classes deta hai, pixel-by-pixel drawing nahi
 * kar sakta) — is wajah se drawing logic JavaScript/Canvas API mein hi
 * hai (jaisa pehle tha). Lekin component ka WRAPPER + CANVAS ELEMENT ka
 * layout, positioning, aur fade-in transition — sab Tailwind utility
 * classes se kiya gaya hai (koi bhi inline `style={{...}}` object nahi
 * bacha hai layout ke liye).
 */
export default function SpaceBackground({ className = "" }) {
  // containerRef -> parent wrapper div, jiska size hum track karte hain
  // canvasRef    -> actual <canvas> jahan sab kuch draw hota hai
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // mounted state sirf fade-in transition ke liye hai — jab component
  // mount hota hai to canvas opacity 0 se 100 tak smoothly transition
  // hoti hai (Tailwind ki transition-opacity class ke through).
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Fade-in trigger — ek chhota sa delay taaki browser ko pehla frame
    // paint karne ka time mil jaye, phir opacity transition start ho.
    const fadeInId = requestAnimationFrame(() => setMounted(true));

    let animationId;
    let lastTime = 0;
    // W/H ab window ke bajaye PARENT CONTAINER ke actual size se aate
    // hain — isse ye component kisi bhi section ke andar (chhota ya bada)
    // sahi tarah se fit ho jata hai, chahe wo mobile ho ya large desktop.
    let W = 0;
    let H = 0;

    // ─── UTILS ───────────────────────────────────────────────
    // Chhote helper functions — random number generate karne ke liye.
    const rand = (a, b) => Math.random() * (b - a) + a;
    const randInt = (a, b) => Math.floor(rand(a, b));

    // ─── RESIZE (container-based, window-based nahi) ──────────
    // Pehle ye window.innerWidth/innerHeight use karta tha (poori screen
    // ke liye). Ab hum container ki actual rendered size use karte hain,
    // taaki ye component kisi bhi section ke andar fit baithe — chahe
    // wo section full-page ho ya bas ek chhota contact-form wrapper.
    function resize() {
      const rect = container.getBoundingClientRect();
      // devicePixelRatio ko max 2 tak cap kiya hai — 3x/4x DPR screens
      // (jaise kuch high-end phones) pe bhi canvas resolution reasonable
      // rahe, warna bahut zyada pixels render karne se performance girti.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      W = Math.max(1, Math.floor(rect.width));
      H = Math.max(1, Math.floor(rect.height));

      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";

      // Context ko dpr ke hisaab se scale karna zaroori hai, warna high-DPI
      // screens pe drawing coordinates aur actual pixels mismatch ho jayenge.
      ctx.setTransform(1, 0, 0, 1, 0, 0); // resize par pehle transform reset
      ctx.scale(dpr, dpr);

      buildNebulas();
    }

    // ─── STAR DENSITY (responsive: chhote section mein kam stars) ────
    // Fixed star count rakhne ke bajaye hum AREA ke hisaab se star count
    // nikalte hain — isse chhoti mobile screen (kam area) par kam stars
    // banenge (better performance) aur bade desktop screen par zyada
    // stars (achha visual density), dono jagah natural dikhega.
    const STAR_DENSITY_PER_PX = 0.00028; // ise tune karke density kam/zyada kar sakte hain
    const MIN_STARS = 120; // bahut chhoti screen (jaise mobile) ke liye minimum
    const MAX_STARS = 1100; // bahut badi screen (jaise 4K desktop) ke liye maximum cap

    // Distribution ratio: 70% tiny / 25% medium / ~4.5% bright / ~0.5% standout
    const LAYER_RATIOS = [0.7, 0.25, 0.045, 0.005];

    // Har layer ka size range aur glow range — isi se star ka "type" decide
    // hota hai (tiny / medium / bright / standout).
    const LAYER_CONFIG = [
      { sMin: 0.15, sMax: 0.55, gMax: 0.35 }, // tiny — glow bilkul na ke barabar
      { sMin: 0.6, sMax: 1.1, gMax: 1.1 },    // medium — halka sa glow
      { sMin: 1.2, sMax: 1.8, gMax: 3.2 },    // bright — soft glow
      { sMin: 1.9, sMax: 2.4, gMax: 6 },      // standout — sabse zyada glow (par giant nahi)
    ];

    // Stars hamesha pure white honge — koi bhi blue/yellow/colored star nahi.
    const STAR_COLOR = "255,255,255";

    // ─── BLINK CONFIG ──────────────────────────────────────────
    // Ye wahi settings hain jo control karti hain ki kitne % stars blink
    // karenge, aur unka blink kitni der tak chalega + kitni der baad
    // dobara blink hoga. Future mein tuning karni ho to bas yahan values
    // change karein.
    const BLINK_CHANCE = 0.18;        // ~18% stars hi blink karenge, baaki fixed brightness pe rahenge
    const BLINK_GAP_MIN_MS = 3000;    // do blink ke beech minimum gap
    const BLINK_GAP_MAX_MS = 12000;   // do blink ke beech maximum gap
    const BLINK_DURATION_MIN_MS = 700;  // ek blink kitni jaldi ho sakta hai
    const BLINK_DURATION_MAX_MS = 1600; // ek blink kitna slow ho sakta hai

    // ─── STAR CLASS ──────────────────────────────────────────
    class Star {
      constructor(layerIndex) {
        this.layerIndex = layerIndex;
        this.cfg = LAYER_CONFIG[layerIndex];
        this.init();
      }

      init() {
        // Position ek baar set hoti hai aur FIXED rehti hai — star kabhi
        // move nahi karega (jaisa aapne bola tha: "sare star apni jagah
        // par honge").
        this.x = rand(0, W);
        this.y = rand(0, H);

        this.baseRadius = rand(this.cfg.sMin, this.cfg.sMax);
        this.radius = this.baseRadius;

        // Cross-spike (bright star ke chaaron taraf ki halki lakeerein)
        // sirf bright/standout tier ke kuch stars pe dikhti hai.
        this.hasSpike = this.layerIndex >= 2 && Math.random() < 0.55;
        // BUG FIX: pehle spike ki length draw() ke andar HAR FRAME nayi
        // random value se calculate hoti thi — jisse spike har frame
        // thoda "jitter/flicker" karta tha. Ab length sirf ek baar yahan
        // fix ho jati hai, taaki spike stable rahe aur sirf ghoome (rotate)
        // smoothly, flicker na kare.
        this.spikeLengthFactor = rand(3.5, 5.5);
        this.spikeRotationSpeed = rand(0.00002, 0.00006);
        this.spikeRotationOffset = rand(0, Math.PI * 2);

        this.glowRadius = rand(this.cfg.gMax * 0.3, this.cfg.gMax);

        // Base brightness — ye wahi opacity hai jispe star hamesha rehta
        // hai jab wo blink nahi kar raha.
        this.baseOpacity = rand(0.45, 1.0);
        this.opacity = this.baseOpacity;

        // ── BLINK STATE MACHINE ──
        // Har star decide karta hai (ek baar, spawn ke time) ki wo kabhi
        // blink karega ya nahi. Agar karega, to uska pehla blink kab
        // start hoga wo bhi random hai — isse sab stars alag-alag time
        // pe blink karte hain, ek saath nahi (natural feel ke liye).
        this.willBlink = Math.random() < BLINK_CHANCE;
        this.isBlinking = false;
        this.blinkStartTime = 0;
        this.blinkDuration = rand(BLINK_DURATION_MIN_MS, BLINK_DURATION_MAX_MS);
        this.nextBlinkAt = this.willBlink
          ? rand(500, BLINK_GAP_MAX_MS) // pehla blink thoda jaldi ho sakta hai
          : Infinity; // jo star kabhi blink nahi karega, uske liye Infinity
      }

      // `now` = requestAnimationFrame se aaya hua current timestamp (ms)
      update(now) {
        if (!this.willBlink) {
          // Ye star kabhi blink nahi karega — hamesha apni base
          // brightness pe fixed rahega.
          this.opacity = this.baseOpacity;
          this.radius = this.baseRadius;
          return;
        }

        if (!this.isBlinking && now >= this.nextBlinkAt) {
          // Blink shuru karo.
          this.isBlinking = true;
          this.blinkStartTime = now;
        }

        if (this.isBlinking) {
          const elapsed = now - this.blinkStartTime;
          const progress = elapsed / this.blinkDuration; // 0 → 1

          if (progress >= 1) {
            // Blink khatam — wapas normal brightness pe aa jao, aur
            // agla blink kab hoga wo naye random gap ke saath decide karo.
            this.isBlinking = false;
            this.opacity = this.baseOpacity;
            this.radius = this.baseRadius;
            this.nextBlinkAt = now + rand(BLINK_GAP_MIN_MS, BLINK_GAP_MAX_MS);
          } else {
            // SMOOTH EASE: Math.sin(progress * PI) curve 0 → 1 → 0 jaati
            // hai — matlab blink dheere se shuru hota hai, beech mein
            // sabse bright hota hai, phir dheere se wapas fade ho jata
            // hai. Isse koi "sudden flash" nahi lagta, sab kuch smooth
            // transition jaisa dikhta hai.
            const ease = Math.sin(progress * Math.PI);
            this.opacity = this.baseOpacity + ease * (1 - this.baseOpacity);
            this.radius = this.baseRadius * (1 + ease * 0.35);
          }
        } else {
          // Blink ke intezaar mein — normal brightness pe fixed.
          this.opacity = this.baseOpacity;
          this.radius = this.baseRadius;
        }
      }

      draw(now) {
        const op = Math.min(1, this.opacity);

        // Outer glow — sirf bright/standout tier ke stars pe meaningfully
        // dikhta hai (chhote stars ka glowRadius itna kam hai ki ye block
        // effectively skip ho jata hai).
        if (this.glowRadius > 1) {
          const gr = this.radius + this.glowRadius;
          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, gr);
          gradient.addColorStop(0, `rgba(${STAR_COLOR},${op * 0.22})`);
          gradient.addColorStop(0.5, `rgba(${STAR_COLOR},${op * 0.07})`);
          gradient.addColorStop(1, `rgba(${STAR_COLOR},0)`);
          ctx.beginPath();
          ctx.arc(this.x, this.y, gr, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Cross spikes — sirf bright tier ke chuninda stars pe, ab stable
        // length ke saath (flicker fix), sirf rotation animate hoti hai.
        if (this.hasSpike) {
          const spikeLen = this.radius * this.spikeLengthFactor;
          const rotation = now * this.spikeRotationSpeed + this.spikeRotationOffset;

          ctx.save();
          ctx.globalAlpha = op * 0.5;
          ctx.translate(this.x, this.y);
          ctx.rotate(rotation);

          for (let i = 0; i < 2; i++) {
            ctx.rotate((Math.PI / 2) * i);
            const spikeGradient = ctx.createLinearGradient(-spikeLen, 0, spikeLen, 0);
            spikeGradient.addColorStop(0, `rgba(${STAR_COLOR},0)`);
            spikeGradient.addColorStop(0.5, `rgba(${STAR_COLOR},${op})`);
            spikeGradient.addColorStop(1, `rgba(${STAR_COLOR},0)`);
            ctx.beginPath();
            ctx.moveTo(-spikeLen, 0);
            ctx.lineTo(spikeLen, 0);
            ctx.lineWidth = this.radius * 0.3;
            ctx.strokeStyle = spikeGradient;
            ctx.stroke();
          }
          ctx.restore();
        }

        // Star ka core — pure white, center se edge tak soft fade.
        const coreGradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        coreGradient.addColorStop(0, `rgba(${STAR_COLOR},${op})`);
        coreGradient.addColorStop(0.55, `rgba(${STAR_COLOR},${op * 0.7})`);
        coreGradient.addColorStop(1, `rgba(${STAR_COLOR},0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = coreGradient;
        ctx.fill();
      }
    }

    // ─── NEBULA (bahut halka background haze — koi bright color nahi) ──
    // Neutral charcoal color use kiya hai, koi blue/purple tint nahi,
    // taaki background "colorful nebula" na lage, bas thodi depth de.
    const NEBULA_PALETTE = [
      [14, 14, 18],
      [12, 12, 16],
      [16, 16, 20],
    ];

    let nebulas = [];

    function buildNebulas() {
      nebulas = [];
      // Container jitna bada hoga, utne hi zyada nebula blobs — chhote
      // section mein 3, bade page-level section mein 5.
      const count = W * H > 900 * 600 ? 5 : 3;
      for (let i = 0; i < count; i++) {
        const [r, g, b] = NEBULA_PALETTE[randInt(0, NEBULA_PALETTE.length)];
        nebulas.push({
          x: rand(0, W),
          y: rand(0, H),
          rx: rand(W * 0.22, W * 0.55),
          ry: rand(H * 0.18, H * 0.42),
          r, g, b,
          baseOpacity: rand(0.005, 0.012), // near-invisible — sirf depth ke liye
          phase: rand(0, Math.PI * 2),
          pulseSpeed: rand(0.00003, 0.0001),
        });
      }
    }

    function drawNebulas(now) {
      nebulas.forEach((n) => {
        // Nebula bhi static hai (move nahi karta) — sirf opacity mein
        // bahut halka sa "breathing" pulse hota hai, jo almost invisible hai.
        const pulse = 1 + Math.sin(now * n.pulseSpeed + n.phase) * 0.1;
        const opacity = n.baseOpacity * pulse;

        ctx.save();
        ctx.translate(n.x, n.y);
        ctx.scale(1, n.ry / n.rx);
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, n.rx * pulse);
        gradient.addColorStop(0, `rgba(${n.r},${n.g},${n.b},${opacity})`);
        gradient.addColorStop(0.42, `rgba(${n.r},${n.g},${n.b},${opacity * 0.5})`);
        gradient.addColorStop(0.75, `rgba(${n.r},${n.g},${n.b},${opacity * 0.18})`);
        gradient.addColorStop(1, `rgba(${n.r},${n.g},${n.b},0)`);
        ctx.beginPath();
        ctx.arc(0, 0, n.rx * pulse, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      });
    }

    // ─── SHOOTING STARS ──────────────────────────────────────
    // Ye ek chhoti "extra" cinematic detail hai — occasional shooting
    // star jo kisi bhi random edge/corner se spawn hoti hai, random
    // angle/speed/length/brightness ke saath, aur naturally fade
    // in/out hoti hai (koi sudden appear/disappear nahi).
    let shooters = [];
    let nextShootAt = 0; // niche animate() ke pehle call mein set hoga
    const MAX_CONCURRENT_SHOOTERS = 2; // ek saath max 2 hi — spam nahi

    function spawnShooter() {
      if (shooters.length >= MAX_CONCURRENT_SHOOTERS) return;

      // 8 possible spawn zones: left, right, top, bottom + 4 corners.
      const zone = randInt(0, 8);
      const margin = 40; // viewport ke bahar se thoda spawn taaki edge par turant na dikhe
      let x, y, angle;

      switch (zone) {
        case 0: x = -margin; y = rand(0, H); angle = rand(-0.5, 0.5); break; // left
        case 1: x = W + margin; y = rand(0, H); angle = Math.PI + rand(-0.5, 0.5); break; // right
        case 2: x = rand(0, W); y = -margin; angle = Math.PI / 2 + rand(-0.5, 0.5); break; // top
        case 3: x = rand(0, W); y = H + margin; angle = -Math.PI / 2 + rand(-0.5, 0.5); break; // bottom
        case 4: x = -margin; y = -margin; angle = rand(0.15, 1.2); break; // top-left
        case 5: x = W + margin; y = -margin; angle = Math.PI - rand(0.15, 1.2); break; // top-right
        case 6: x = -margin; y = H + margin; angle = -rand(0.15, 1.2); break; // bottom-left
        default: x = W + margin; y = H + margin; angle = Math.PI + rand(0.15, 1.2); break; // bottom-right
      }

      const speed = rand(3, 14);
      const length = rand(60, 320);
      const brightness = rand(0.5, 1);
      const lifeMs = rand(700, 2200);

      shooters.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length,
        brightness,
        width: rand(0.7, 2),
        age: 0,
        lifeMs,
        fadeInMs: Math.min(250, lifeMs * 0.25),
      });
    }

    function updateAndDrawShooters(deltaTime, now) {
      // Random interval pe agla shooting star spawn karo (3s se 20s tak).
      if (now >= nextShootAt) {
        spawnShooter();
        nextShootAt = now + rand(3000, 20000);
      }

      shooters = shooters.filter((s) => {
        s.age += deltaTime;
        s.x += s.vx * deltaTime * 0.06;
        s.y += s.vy * deltaTime * 0.06;

        const lifeRatio = s.age / s.lifeMs;
        const outOfBounds = s.x < -400 || s.x > W + 400 || s.y < -400 || s.y > H + 400;
        if (lifeRatio >= 1 || outOfBounds) return false; // remove — life khatam

        // Smooth fade-in, phir smooth fade-out (life ke aakhri 45% mein).
        let opacity;
        if (s.age < s.fadeInMs) {
          opacity = s.age / s.fadeInMs;
        } else {
          const fadeOutStart = 0.55;
          opacity = lifeRatio < fadeOutStart
            ? 1
            : Math.max(0, 1 - (lifeRatio - fadeOutStart) / (1 - fadeOutStart));
        }
        opacity *= s.brightness;

        const magnitude = Math.hypot(s.vx, s.vy) || 1;
        const dirX = s.vx / magnitude;
        const dirY = s.vy / magnitude;
        const tailX = s.x - dirX * s.length;
        const tailY = s.y - dirY * s.length;

        // Trail
        const trailGradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        trailGradient.addColorStop(0, `rgba(${STAR_COLOR},0)`);
        trailGradient.addColorStop(0.55, `rgba(${STAR_COLOR},${opacity * 0.35})`);
        trailGradient.addColorStop(1, `rgba(${STAR_COLOR},${opacity})`);
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.lineWidth = s.width;
        ctx.strokeStyle = trailGradient;
        ctx.stroke();

        // Head glow
        const headGradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.width * 5);
        headGradient.addColorStop(0, `rgba(${STAR_COLOR},${opacity})`);
        headGradient.addColorStop(0.5, `rgba(${STAR_COLOR},${opacity * 0.4})`);
        headGradient.addColorStop(1, `rgba(${STAR_COLOR},0)`);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.width * 5, 0, Math.PI * 2);
        ctx.fillStyle = headGradient;
        ctx.fill();

        return true; // still alive, rakho array mein
      });
    }

    // ─── BACKGROUND (solid clear + soft vignette) ──────────────
    // NOTE: Pehle yahan ek "semi-transparent overlay" tha (motion-trail
    // effect ke liye, jab stars move karte the). Ab stars fully static
    // hain, isliye trail ki zaroorat nahi — har frame ek CLEAN solid
    // clear karte hain. Isse koi ghosting/accumulation bug nahi hoga,
    // aur result hamesha predictable rahega (production ke liye zyada safe).
    function drawBackground() {
      ctx.clearRect(0, 0, W, H);

      // Pure black base
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, W, H);

      // Bahut halka vignette — sirf grayscale (koi color tint nahi),
      // edges thodi si darker taaki depth ka feel aaye.
      const vignette = ctx.createRadialGradient(
        W / 2, H / 2, 0,
        W / 2, H / 2, Math.max(W, H) * 0.75
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(0.6, "rgba(2,2,2,0.1)");
      vignette.addColorStop(1, "rgba(0,0,0,0.45)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);
    }

    // ─── BUILD STARS (density se count nikal ke banate hain) ──────
    let stars = [];

    function buildStars() {
      const targetCount = Math.round(
        Math.min(MAX_STARS, Math.max(MIN_STARS, W * H * STAR_DENSITY_PER_PX))
      );

      stars = [];
      LAYER_RATIOS.forEach((ratio, layerIndex) => {
        const countForLayer = Math.max(1, Math.round(targetCount * ratio));
        for (let i = 0; i < countForLayer; i++) {
          stars.push(new Star(layerIndex));
        }
      });
    }

    // ─── INITIAL SETUP ──────────────────────────────────────────
    resize();
    buildStars();

    // ─── ANIMATION LOOP ──────────────────────────────────────────
    function animate(now) {
      // Delta time nikaalte hain taaki animation frame-rate independent
      // rahe (chahe device 60fps de ya kabhi 30fps).
      const deltaTime = Math.min(now - lastTime, 50); // 50ms cap — tab-switch ke baad ek hi bada jump na aaye
      lastTime = now;

      drawBackground();
      drawNebulas(now);

      // Har star ko update (blink-check) + draw karo.
      for (let i = 0; i < stars.length; i++) {
        stars[i].update(now);
        stars[i].draw(now);
      }

      updateAndDrawShooters(deltaTime, now);

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    // ─── RESPONSIVE RESIZE HANDLING ──────────────────────────────
    // ResizeObserver use kiya hai (window resize event ke bajaye) kyunki
    // ye component ab ek PARENT SECTION ke andar embed hota hai — agar
    // parent section ka size kisi aur reason se change ho (jaise layout
    // shift, sidebar open/close, orientation change), tab bhi ye turant
    // sahi size le lega. Ye large desktop se lekar chhoti mobile screen
    // tak, har jagah sahi tarah kaam karta hai.
    const resizeObserver = new ResizeObserver(() => {
      resize();
      buildStars();
    });
    resizeObserver.observe(container);

    // ─── CLEANUP (memory leak se bachne ke liye) ──────────────────
    return () => {
      cancelAnimationFrame(animationId);
      cancelAnimationFrame(fadeInId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    // Wrapper: parent section ke bilkul andar fit ho jata hai
    // (absolute inset-0). `-z-10` isse peeche rakhta hai taaki upar
    // wala content (jaise Contact Form) hamesha isse UPAR dikhe.
    // `overflow-hidden` zaroori hai taaki shooting stars edges ke thoda
    // bahar spawn hone par bhi section ke bahar visually leak na karein.
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-black ${className}`}
      aria-hidden="true" // Ye purely decorative hai — screen readers ke liye skip
    >
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-[1500ms] ease-out ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}