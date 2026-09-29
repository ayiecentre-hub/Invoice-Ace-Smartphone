import React from "react";

type Props = {
  /** Polyline points in the parent's coordinate space. */
  points: [number, number][];
  progress: number;
  color: string;
  width?: number;
  dot?: boolean;
  dash?: boolean;
};

/** Animated tracking line (draws on from the first point) with an optional landing dot. */
export const Connector: React.FC<Props> = ({ points, progress, color, width = 4, dot = true, dash }) => {
  const segs = points.slice(1).map((p, i) => Math.hypot(p[0] - points[i][0], p[1] - points[i][1]));
  const total = segs.reduce((a, b) => a + b, 0);
  const d = points.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  // position of the travelling head
  let remaining = total * progress;
  let head = points[0];
  for (let i = 0; i < segs.length; i++) {
    if (remaining <= segs[i]) {
      const t = segs[i] ? remaining / segs[i] : 0;
      head = [points[i][0] + (points[i + 1][0] - points[i][0]) * t, points[i][1] + (points[i + 1][1] - points[i][1]) * t];
      break;
    }
    remaining -= segs[i];
    head = points[i + 1];
  }
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none" }} width="1" height="1">
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dash ? `${width * 2.5} ${width * 2.5}` : `${total} ${total}`}
        strokeDashoffset={dash ? 0 : total * (1 - progress)}
        opacity={dash ? progress : 1}
      />
      {progress > 0.02 ? <circle cx={points[0][0]} cy={points[0][1]} r={width * 1.6} fill={color} /> : null}
      {dot && progress > 0.02 ? <circle cx={head[0]} cy={head[1]} r={width * 1.9} fill={color} /> : null}
    </svg>
  );
};
