import { useEffect, useState } from "react";

// A handful of right-angled "trace" paths spanning the viewport, like a
// printed circuit board. Pulses travel along these same paths.
const traces = [
  "M-100,120 H360 V280 H840 V70 H1720",
  "M-100,340 H220 V180 H620 V420 H1080 V240 H1720",
  "M-100,560 H300 V700 H760 V620 H1180 V780 H1720",
  "M-100,820 H420 V860 H900 V760 H1720",
  "M160,-100 V160 H520 V40 H520",
  "M980,-100 V120 H1300 V380 H1600 V-100",
  "M1420,-100 V260 H1140 V520 H1420 V900",
];

// Junction / via points sit at the corners of the traces above.
const vias: [number, number][] = [
  [360, 120], [360, 280], [840, 280], [840, 70],
  [220, 340], [220, 180], [620, 180], [620, 420], [1080, 420], [1080, 240],
  [300, 560], [300, 700], [760, 700], [760, 620], [1180, 620], [1180, 780],
  [420, 820], [420, 860], [900, 860], [900, 760],
  [160, 160], [520, 160], [520, 40],
  [980, 120], [1300, 120], [1300, 380], [1600, 380],
  [1420, 260], [1140, 260], [1140, 520], [1420, 520],
];

export default function CircuitBackground() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAnimate(!mq.matches);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <svg
        className="h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="pulse-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(98% 0.02 240)" stopOpacity="1" />
            <stop offset="45%" stopColor="oklch(80% 0.18 264)" stopOpacity="1" />
            <stop offset="100%" stopColor="oklch(65% 0.18 264)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="pulse-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(70% 0.2 264)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(70% 0.2 264)" stopOpacity="0" />
          </radialGradient>
          <filter id="pulse-blur" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        {/* faint base grid */}
        <g stroke="oklch(28% 0.05 264)" strokeWidth="1" opacity="0.35">
          {Array.from({ length: 33 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 50} y1={0} x2={i * 50} y2={900} />
          ))}
          {Array.from({ length: 19 }).map((_, i) => (
            <line key={`h${i}`} x1={0} y1={i * 50} x2={1600} y2={i * 50} />
          ))}
        </g>

        {/* circuit traces */}
        <g fill="none" stroke="oklch(55% 0.18 264)" strokeWidth="1.5" opacity="0.4">
          {traces.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>

        {/* via nodes */}
        <g fill="oklch(70% 0.16 264)" opacity="0.55">
          {vias.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={2.5} />
          ))}
        </g>

        {/* traveling pulses: soft blurred halo + bright core, per trace */}
        {animate &&
          traces.map((d, i) => (
            <g key={i}>
              <g filter="url(#pulse-blur)">
                <circle r="9" fill="url(#pulse-halo)">
                  <animateMotion
                    dur={`${6 + i * 1.1}s`}
                    begin={`${i * 0.9}s`}
                    repeatCount="indefinite"
                    path={d}
                  />
                </circle>
              </g>
              <circle r="3.5" fill="url(#pulse-core)">
                <animateMotion
                  dur={`${6 + i * 1.1}s`}
                  begin={`${i * 0.9}s`}
                  repeatCount="indefinite"
                  path={d}
                />
              </circle>
            </g>
          ))}
      </svg>
    </div>
  );
}
