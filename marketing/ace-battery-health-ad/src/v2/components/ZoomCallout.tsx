import React from "react";
import { COLORS } from "../../theme";

type Rect = { x: number; y: number; w: number; h: number };

/**
 * Editorial magnifier: outlines the source region, then draws the two outer
 * projection lines to the enlarged target. Tells the eye "this is the same thing, bigger".
 */
export const ZoomCallout: React.FC<{ from: Rect; to: Rect; progress: number; color?: string }> = ({ from, to, progress, color = COLORS.blue }) => {
  const p1 = Math.min(1, progress * 2); // source outline
  const p2 = Math.max(0, progress * 2 - 1); // projection lines
  const perim = 2 * (from.w + from.h);
  const lines: [number, number, number, number][] = [
    [from.x, from.y + from.h, to.x, to.y],
    [from.x + from.w, from.y + from.h, to.x + to.w, to.y],
  ];
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none" }} width="1" height="1">
      <rect
        x={from.x}
        y={from.y}
        width={from.w}
        height={from.h}
        rx={8}
        fill="rgba(43,94,167,0.08)"
        stroke={color}
        strokeWidth={3}
        strokeDasharray={`${perim} ${perim}`}
        strokeDashoffset={perim * (1 - p1)}
      />
      {lines.map(([x1, y1, x2, y2], i) => {
        const len = Math.hypot(x2 - x1, y2 - y1);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth={2}
            opacity={0.55}
            strokeDasharray={`${len} ${len}`}
            strokeDashoffset={len * (1 - p2)}
          />
        );
      })}
    </svg>
  );
};
