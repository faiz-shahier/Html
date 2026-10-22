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

function makeDots(ctx) {
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
  return dots;
}

// color: "r, g, b" — indigo by default; use a light colour on dark backgrounds
export default function BrainNetwork({ className = "", color = "88, 64, 230" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dots = makeDots(ctx);
    const glow = new Array(dots.length).fill(0); // how bright each dot is (0–1)
    let signals = []; // { from, to, progress }
    let frame;
    let lastSpark = 0;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const draw = (time) => {
      const size = Math.min(canvas.width, canvas.height);
      const scale = size / 100;
      const offsetX = (canvas.width - size) / 2;
      const offsetY = (canvas.height - size) / 2;
      // Dots float gently
      const pos = dots.map((d) => ({
        x: offsetX + (d.x + Math.sin(time / 1400 + d.phase) * 0.6) * scale,
        y: offsetY + (d.y + Math.cos(time / 1700 + d.phase) * 0.6) * scale,
      }));

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Head outline: join the outline dots in order
      ctx.strokeStyle = `rgba(${color}, 0.18)`;
      ctx.lineWidth = scale * 0.15;
      ctx.beginPath();
      dots.forEach((d, i) => d.edge && (dots[i - 1]?.edge ? ctx.lineTo(pos[i].x, pos[i].y) : ctx.moveTo(pos[i].x, pos[i].y)));
      ctx.stroke();

      // Faint lines between neighbours
      ctx.lineWidth = scale * 0.12;
      dots.forEach((d, i) =>
        d.links.forEach((j) => {
          if (j < i) return;
          const light = Math.max(glow[i], glow[j]);
          ctx.strokeStyle = `rgba(${color}, ${0.07 + light * 0.6})`;
          ctx.beginPath();
          ctx.moveTo(pos[i].x, pos[i].y);
          ctx.lineTo(pos[j].x, pos[j].y);
          ctx.stroke();
        })
      );

      // Dots
      dots.forEach((_, i) => {
        ctx.fillStyle = `rgba(${color}, ${0.25 + glow[i] * 0.75})`;
        ctx.beginPath();
        ctx.arc(pos[i].x, pos[i].y, scale * (0.45 + glow[i] * 0.55), 0, Math.PI * 2);
        ctx.fill();
      });

      // Signals: a bright point moving along a line
      signals.forEach((s) => {
        const a = pos[s.from];
        const b = pos[s.to];
        ctx.fillStyle = `rgba(${color}, 1)`;
        ctx.beginPath();
        ctx.arc(a.x + (b.x - a.x) * s.progress, a.y + (b.y - a.y) * s.progress, scale * 0.6, 0, Math.PI * 2);
        ctx.fill();
      });
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

    if (still) draw(0);
    else frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [color]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
