import { lazy, Suspense, useEffect, useState } from "react";

// three.js is a heavy dependency - load it only after the page has
// something to show, instead of blocking the initial bundle.
const Fish3D = lazy(() => import("./Fish3D"));

// Rising bubbles: fixed set of pseudo-random positions/timings so the
// layout is stable across renders.
const bubbles = [
  { left: 6, size: 10, duration: 14, delay: 0 },
  { left: 16, size: 6, duration: 11, delay: 2.4 },
  { left: 27, size: 14, duration: 17, delay: 5 },
  { left: 38, size: 7, duration: 12, delay: 1.2 },
  { left: 49, size: 9, duration: 15, delay: 6.5 },
  { left: 61, size: 5, duration: 10, delay: 3.6 },
  { left: 72, size: 12, duration: 16, delay: 0.8 },
  { left: 83, size: 8, duration: 13, delay: 4.4 },
  { left: 91, size: 6, duration: 11.5, delay: 8 },
  { left: 20, size: 5, duration: 9, delay: 9.2 },
  { left: 55, size: 11, duration: 18, delay: 2 },
  { left: 68, size: 6, duration: 12.5, delay: 7.1 },
];

export default function AquariumBackground() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAnimate(!mq.matches);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* deep water gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, oklch(38% 0.09 235) 0%, oklch(18% 0.07 255) 45%, oklch(9% 0.04 264) 100%)",
        }}
      />

      {/* light rays filtering down from the surface */}
      <svg className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(90% 0.08 220)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="oklch(90% 0.08 220)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points="10%,0 22%,0 8%,100% -10%,100%" fill="url(#ray)" />
        <polygon points="35%,0 50%,0 55%,100% 30%,100%" fill="url(#ray)" />
        <polygon points="68%,0 80%,0 92%,100% 62%,100%" fill="url(#ray)" />
      </svg>

      {/* rising bubbles */}
      <div className="absolute inset-0">
        {bubbles.map((b, i) => (
          <span
            key={i}
            className={animate ? "aquarium-bubble" : ""}
            style={{
              left: `${b.left}%`,
              width: b.size,
              height: b.size,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      {/* swimming 3D fish */}
      <Suspense fallback={null}>
        <Fish3D />
      </Suspense>
    </div>
  );
}
