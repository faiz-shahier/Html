import { useEffect, useRef } from "react";

/*
 * Animated "brain network": dots inside a head shape, joined by thin lines.
 * Purple signals travel from dot to dot, lighting up the lines they pass.
 * People who turn on "reduce motion" see a still picture.
 */

// Side view of a head, facing right, drawn in a 100 x 100 box
const HEAD_SHAPE = "M38 95 L38 80 C26 76 16 64 16 48 C16 26 32 10 52 10 C72 10 86 25 86 43 C86 48 85 51 87 55 L92 63 C93 65 91 66 89 66 L86 66 L87 71 C87 74 85 75 83 75 L84 78 C84 82 81 84 76 83 L68 82 L66 95";
const HEAD = new Path2D(HEAD_SHAPE + " Z");

const LINK_DISTANCE = 12; // dots closer than this get a line
const DOT_COUNT = 110; // dots inside the head
const EDGE_COUNT = 70; // dots on the outline of the head

// Same "random" numbers every time, so the shape never jumps
function seeded(seed) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
}

// The head is always the same, so the dots are worked out once and reused on every page
let cachedDots = null;

function makeDots(ctx) {
  if (cachedDots) return cachedDots;
  const random = seeded(7);
  const dots = [];
  while (dots.length < DOT_COUNT) {
    const x = 8 + random() * 88;
    const y = 4 + random() * 90;
    if (ctx.isPointInPath(HEAD, x, y)) dots.push({ x, y, phase: random() * Math.PI * 2 });
  }
  // Outline dots: evenly spaced along the head shape
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", HEAD_SHAPE);
  const length = path.getTotalLength();
  for (let i = 0; i < EDGE_COUNT; i++) {
    const point = path.getPointAtLength((length * i) / (EDGE_COUNT - 1));
    dots.push({ x: point.x, y: point.y, phase: random() * Math.PI * 2, edge: true });
  }
  // Each dot remembers its close neighbours (the lines it can send a signal along)
  dots.forEach((a, i) => {
    a.links = dots
      .map((b, j) => ({ j, d: Math.hypot(a.x - b.x, a.y - b.y) }))
      .filter(({ j, d }) => j !== i && d < LINK_DISTANCE)
      .map(({ j }) => j);
  });
  cachedDots = dots;
  return dots;
}

// color: "r, g, b" — indigo by default; use a light colour on dark backgrounds
export default function BrainNetwork({ className = "", color = "88, 64, 230" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dots = makeDots(ctx);
    // Every line once (i < j), worked out a single time
    const lines = dots.flatMap((d, i) => d.links.filter((j) => j > i).map((j) => [i, j]));
    const glow = new Array(dots.length).fill(0); // how bright each dot is (0–1)
    let signals = []; // { from, to, progress }
    let frame = null;
    let lastSpark = 0;
    let onScreen = false;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // clientWidth ignores CSS transforms (e.g. a scale animation on a parent)
    const resize = () => {
      const ratio = Math.min(devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      if (!frame) draw(performance.now()); // redraw once when the size changes (the animation redraws itself)
    };

    const draw = (time) => {
      const size = Math.min(canvas.width, canvas.height);
      const scale = size / 100;
      const offsetX = (canvas.width - size) / 2;
      const offsetY = (canvas.height - size) / 2;
      // Dots float gently
      const pos = dots.map((d) => [
        offsetX + (d.x + Math.sin(time / 1400 + d.phase) * 0.6) * scale,
        offsetY + (d.y + Math.cos(time / 1700 + d.phase) * 0.6) * scale,
      ]);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Head outline: join the outline dots in order (one stroke)
      ctx.strokeStyle = `rgba(${color}, 0.18)`;
      ctx.lineWidth = scale * 0.15;
      ctx.beginPath();
      dots.forEach((d, i) => d.edge && (dots[i - 1]?.edge ? ctx.lineTo(...pos[i]) : ctx.moveTo(...pos[i])));
      ctx.stroke();

      // All faint lines in ONE stroke (much faster than one stroke per line)
      ctx.strokeStyle = `rgba(${color}, 0.07)`;
      ctx.lineWidth = scale * 0.12;
      ctx.beginPath();
      for (const [i, j] of lines) {
        ctx.moveTo(...pos[i]);
        ctx.lineTo(...pos[j]);
      }
      ctx.stroke();

      // Only the few lit lines are drawn one by one
      for (const [i, j] of lines) {
        const light = Math.max(glow[i], glow[j]);
        if (light < 0.05) continue;
        ctx.strokeStyle = `rgba(${color}, ${light * 0.6})`;
        ctx.beginPath();
        ctx.moveTo(...pos[i]);
        ctx.lineTo(...pos[j]);
        ctx.stroke();
      }

      // All plain dots in ONE fill
      ctx.fillStyle = `rgba(${color}, 0.25)`;
      ctx.beginPath();
      dots.forEach((_, i) => {
        if (glow[i] >= 0.05) return;
        ctx.moveTo(pos[i][0] + scale * 0.45, pos[i][1]);
        ctx.arc(pos[i][0], pos[i][1], scale * 0.45, 0, Math.PI * 2);
      });
      ctx.fill();

      // Lit dots + travelling signals
      dots.forEach((_, i) => {
        if (glow[i] < 0.05) return;
        ctx.fillStyle = `rgba(${color}, ${0.25 + glow[i] * 0.75})`;
        ctx.beginPath();
        ctx.arc(pos[i][0], pos[i][1], scale * (0.45 + glow[i] * 0.55), 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.fillStyle = `rgba(${color}, 1)`;
      for (const s of signals) {
        const [ax, ay] = pos[s.from];
        const [bx, by] = pos[s.to];
        ctx.beginPath();
        ctx.arc(ax + (bx - ax) * s.progress, ay + (by - ay) * s.progress, scale * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = (time) => {
      // Start a new signal about every 0.7 seconds
      if (time - lastSpark > 700) {
        lastSpark = time;
        const from = Math.floor(Math.random() * dots.length);
        const to = dots[from].links[Math.floor(Math.random() * dots[from].links.length)];
        if (to !== undefined) signals.push({ from, to, progress: 0, hops: 6 });
        glow[from] = 1;
      }

      // Move signals; when one arrives, light the dot and pass it on
      signals = signals.flatMap((s) => {
        s.progress += 0.03;
        if (s.progress < 1) return [s];
        glow[s.to] = 1;
        const next = dots[s.to].links.filter((j) => j !== s.from);
        if (s.hops === 0 || next.length === 0) return [];
        return [{ from: s.to, to: next[Math.floor(Math.random() * next.length)], progress: 0, hops: s.hops - 1 }];
      });

      // Lit dots fade slowly
      glow.forEach((g, i) => (glow[i] = Math.max(0, g - 0.012)));

      draw(time);
      frame = requestAnimationFrame(tick);
    };

    // Only animate while the brain is on screen and the tab is open — saves the processor
    const start = () => {
      if (!still && !frame && onScreen && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = null;
    };
    const watch = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      onScreen ? start() : stop();
    });
    const onTab = () => (document.hidden ? stop() : start());

    const sizeWatch = new ResizeObserver(resize); // also runs once at the start
    sizeWatch.observe(canvas);
    watch.observe(canvas);
    document.addEventListener("visibilitychange", onTab);

    return () => {
      stop();
      sizeWatch.disconnect();
      watch.disconnect();
      document.removeEventListener("visibilitychange", onTab);
    };
  }, [color]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
