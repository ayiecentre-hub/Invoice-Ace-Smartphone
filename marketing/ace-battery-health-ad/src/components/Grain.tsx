import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 1.1 -0.2'/></filter><rect width='256' height='256' filter='url(#n)'/></svg>`,
  );

/** Film grain (re-positioned every 2 frames) + a very soft vignette. Keeps flat vector scenes feeling filmed. */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.075 }) => {
  const frame = useCurrentFrame();
  const k = Math.floor(frame / 2);
  const x = (k * 73) % 256;
  const y = (k * 151) % 256;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{
          backgroundImage: `url("${NOISE}")`,
          backgroundPosition: `${x}px ${y}px`,
          opacity,
          mixBlendMode: "overlay",
        }}
      />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 62%, rgba(18,18,31,0.12) 100%)" }} />
    </AbsoluteFill>
  );
};
