import { useEffect, useRef, useState } from "react";

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
  const fishTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAnimate(!mq.matches);
  }, []);

  useEffect(() => {
    if (!animate) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const node = fishTrackRef.current;
        if (!node) return;
        // Fish sinks gently with the page, then settles so it never
        // swims off the bottom of a long page.
        const offset = Math.min(window.scrollY * 0.25, 260);
        node.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [animate]);

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

      {/* swimming fish */}
      <div ref={fishTrackRef} className="absolute inset-0" style={{ willChange: "transform" }}>
        <div className={animate ? "aquarium-fish-swim" : "absolute left-[20%] top-[38%]"}>
          <svg
            width="220"
            height="140"
            viewBox="0 0 300 190"
            className={animate ? "aquarium-fish-bob" : undefined}
          >
            <defs>
              <radialGradient id="fish-body" cx="35%" cy="30%" r="80%">
                <stop offset="0%" stopColor="oklch(88% 0.09 200)" />
                <stop offset="45%" stopColor="oklch(72% 0.14 210)" />
                <stop offset="100%" stopColor="oklch(48% 0.14 240)" />
              </radialGradient>
              <linearGradient id="fish-fin" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(80% 0.15 60)" />
                <stop offset="100%" stopColor="oklch(62% 0.19 40)" />
              </linearGradient>
              <linearGradient id="fish-tail" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="oklch(75% 0.17 150)" />
                <stop offset="55%" stopColor="oklch(78% 0.16 90)" />
                <stop offset="100%" stopColor="oklch(68% 0.2 45)" />
              </linearGradient>
              <clipPath id="fish-body-clip">
                <path d="M45,95 C45,58 78,30 122,28 C168,25 208,46 226,72 C236,84 236,102 226,114 C208,140 168,158 122,155 C78,153 45,130 45,95 Z" />
              </clipPath>
            </defs>

            {/* tail fin */}
            <g className={animate ? "aquarium-fish-tail" : undefined} style={{ transformOrigin: "228px 93px" }}>
              <path
                d="M226,80 C255,60 282,42 298,36 C286,62 276,82 273,93 C276,104 286,124 298,150 C282,144 255,126 226,106 Z"
                fill="url(#fish-tail)"
                opacity="0.95"
              />
            </g>

            {/* pectoral fin */}
            <path
              d="M148,118 C165,122 182,136 186,156 C168,152 150,142 140,126 Z"
              fill="oklch(66% 0.12 190)"
              opacity="0.7"
            />

            {/* ventral thread fins */}
            <path
              d="M92,150 C86,168 78,186 68,196 C74,178 78,162 82,148 Z"
              fill="url(#fish-fin)"
              opacity="0.9"
            />
            <path
              d="M118,152 C116,172 112,190 104,202 C108,182 110,164 112,150 Z"
              fill="url(#fish-fin)"
              opacity="0.9"
            />

            {/* dorsal fin, ribbed */}
            <path
              d="M96,32 C104,4 118,-16 138,-22 C150,-25 158,-18 154,-6 C168,-12 180,-8 178,4 C176,14 166,20 155,22 C160,30 158,38 148,38 C132,40 112,38 96,32 Z"
              fill="url(#fish-fin)"
            />
            <g stroke="oklch(40% 0.1 40)" strokeWidth="1.2" opacity="0.5">
              <line x1="112" y1="30" x2="122" y2="-4" />
              <line x1="128" y1="34" x2="138" y2="-10" />
              <line x1="144" y1="35" x2="154" y2="-8" />
              <line x1="160" y1="30" x2="168" y2="2" />
            </g>

            {/* body */}
            <path
              d="M45,95 C45,58 78,30 122,28 C168,25 208,46 226,72 C236,84 236,102 226,114 C208,140 168,158 122,155 C78,153 45,130 45,95 Z"
              fill="url(#fish-body)"
              stroke="oklch(40% 0.12 240)"
              strokeWidth="1.5"
            />

            {/* scale sheen */}
            <g clipPath="url(#fish-body-clip)" stroke="oklch(95% 0.03 210)" strokeWidth="1" opacity="0.25" fill="none">
              {Array.from({ length: 5 }).map((_, row) =>
                Array.from({ length: 6 }).map((_, col) => (
                  <path
                    key={`${row}-${col}`}
                    d={`M${80 + col * 26},${55 + row * 20} q13,-8 26,0`}
                  />
                )),
              )}
            </g>

            {/* mouth */}
            <path d="M46,90 C50,100 60,106 70,102 C60,110 46,108 42,96 Z" fill="oklch(25% 0.08 250)" />

            {/* eye */}
            <circle cx="80" cy="63" r="19" fill="oklch(97% 0.01 240)" />
            <circle cx="80" cy="63" r="13.5" fill="oklch(55% 0.14 320)" />
            <circle cx="81" cy="64" r="7.5" fill="oklch(15% 0.02 264)" />
            <circle cx="76" cy="58" r="3" fill="oklch(99% 0 0)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
