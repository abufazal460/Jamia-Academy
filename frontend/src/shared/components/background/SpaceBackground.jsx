import { useEffect, useRef, useState } from "react";

export default function SpaceBackground({ className = "" }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const fadeInId = requestAnimationFrame(() => setMounted(true));

    let animationId;
    let lastTime = 0;

    let W = 0;
    let H = 0;

    const rand = (a, b) => Math.random() * (b - a) + a;
    const randInt = (a, b) => Math.floor(rand(a, b));

    function resize() {
      const rect = container.getBoundingClientRect();

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      W = Math.max(1, Math.floor(rect.width));
      H = Math.max(1, Math.floor(rect.height));

      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";

      ctx.scale(dpr, dpr);

      buildNebulas();
    }

    const STAR_DENSITY_PER_PX = 0.00028;
    const MIN_STARS = 120;
    const MAX_STARS = 1100;

    const LAYER_RATIOS = [0.7, 0.25, 0.045, 0.005];

    const LAYER_CONFIG = [
      { sMin: 0.15, sMax: 0.55, gMax: 0.35 },
      { sMin: 0.6, sMax: 1.1, gMax: 1.1 },
      { sMin: 1.2, sMax: 1.8, gMax: 3.2 },
      { sMin: 1.9, sMax: 2.4, gMax: 6 },
    ];

    const STAR_COLOR = "255,255,255";

    const BLINK_CHANCE = 0.18;
    const BLINK_GAP_MIN_MS = 3000;
    const BLINK_GAP_MAX_MS = 12000;
    const BLINK_DURATION_MIN_MS = 700;
    const BLINK_DURATION_MAX_MS = 1600;

    class Star {
      constructor(layerIndex) {
        this.layerIndex = layerIndex;
        this.cfg = LAYER_CONFIG[layerIndex];
        this.init();
      }

      init() {

        this.x = rand(0, W);
        this.y = rand(0, H);

        this.baseRadius = rand(this.cfg.sMin, this.cfg.sMax);
        this.radius = this.baseRadius;

        this.hasSpike = this.layerIndex >= 2 && Math.random() < 0.55;
        this.spikeLengthFactor = rand(3.5, 5.5);
        this.spikeRotationSpeed = rand(0.00002, 0.00006);
        this.spikeRotationOffset = rand(0, Math.PI * 2);

        this.glowRadius = rand(this.cfg.gMax * 0.3, this.cfg.gMax);

        this.baseOpacity = rand(0.45, 1.0);
        this.opacity = this.baseOpacity;

        this.willBlink = Math.random() < BLINK_CHANCE;
        this.isBlinking = false;
        this.blinkStartTime = 0;
        this.blinkDuration = rand(BLINK_DURATION_MIN_MS, BLINK_DURATION_MAX_MS);
        this.nextBlinkAt = this.willBlink
          ? rand(500, BLINK_GAP_MAX_MS)
          : Infinity;
      }

      update(now) {
        if (!this.willBlink) {
          this.opacity = this.baseOpacity;
          this.radius = this.baseRadius;
          return;
        }

        if (!this.isBlinking && now >= this.nextBlinkAt) {
          this.isBlinking = true;
          this.blinkStartTime = now;
        }

        if (this.isBlinking) {
          const elapsed = now - this.blinkStartTime;
          const progress = elapsed / this.blinkDuration; // 0 → 1

          if (progress >= 1) {
            this.isBlinking = false;
            this.opacity = this.baseOpacity;
            this.radius = this.baseRadius;
            this.nextBlinkAt = now + rand(BLINK_GAP_MIN_MS, BLINK_GAP_MAX_MS);
          } else {
            const ease = Math.sin(progress * Math.PI);
            this.opacity = this.baseOpacity + ease * (1 - this.baseOpacity);
            this.radius = this.baseRadius * (1 + ease * 0.35);
          }
        } else {
          this.opacity = this.baseOpacity;
          this.radius = this.baseRadius;
        }
      }

      draw(now) {
        const op = Math.min(1, this.opacity);
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

    const NEBULA_PALETTE = [
      [14, 14, 18],
      [12, 12, 16],
      [16, 16, 20],
    ];

    let nebulas = [];

    function buildNebulas() {
      nebulas = [];
      const count = W * H > 900 * 600 ? 5 : 3;
      for (let i = 0; i < count; i++) {
        const [r, g, b] = NEBULA_PALETTE[randInt(0, NEBULA_PALETTE.length)];
        nebulas.push({
          x: rand(0, W),
          y: rand(0, H),
          rx: rand(W * 0.22, W * 0.55),
          ry: rand(H * 0.18, H * 0.42),
          r, g, b,
          baseOpacity: rand(0.005, 0.012),
          phase: rand(0, Math.PI * 2),
          pulseSpeed: rand(0.00003, 0.0001),
        });
      }
    }

    function drawNebulas(now) {
      nebulas.forEach((n) => {
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

    let shooters = [];
    let nextShootAt = 0;
    const MAX_CONCURRENT_SHOOTERS = 2;

    function spawnShooter() {
      if (shooters.length >= MAX_CONCURRENT_SHOOTERS) return;

      const zone = randInt(0, 8);
      const margin = 40;
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
        if (lifeRatio >= 1 || outOfBounds) return false;

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

        const headGradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.width * 5);
        headGradient.addColorStop(0, `rgba(${STAR_COLOR},${opacity})`);
        headGradient.addColorStop(0.5, `rgba(${STAR_COLOR},${opacity * 0.4})`);
        headGradient.addColorStop(1, `rgba(${STAR_COLOR},0)`);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.width * 5, 0, Math.PI * 2);
        ctx.fillStyle = headGradient;
        ctx.fill();

        return true;
      });
    }

    function drawBackground() {
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, W, H);

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

    resize();
    buildStars();

    function animate(now) {
      const deltaTime = Math.min(now - lastTime, 50);
      lastTime = now;

      drawBackground();
      drawNebulas(now);

      for (let i = 0; i < stars.length; i++) {
        stars[i].update(now);
        stars[i].draw(now);
      }

      updateAndDrawShooters(deltaTime, now);

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      animationId = requestAnimationFrame(animate);
    } else {
      drawBackground();
      drawNebulas(0);
      stars.forEach((s) => { s.update(0); s.draw(0); });
    }

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else if (!prefersReducedMotion) {
        lastTime = 0;
        animationId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      buildStars();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationId);
      cancelAnimationFrame(fadeInId);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-black ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-[1.5s] ease-out ${mounted ? "opacity-100" : "opacity-0"
          }`}
      />
    </div>
  );
}