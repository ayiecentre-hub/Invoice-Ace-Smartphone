import React from "react";
import { COLORS, FONTS } from "../../theme";

type Props = {
  width: number;
  height: number;
  /** Points in 0–1 space (x → time, y → value 0..1). */
  points: [number, number][];
  progress: number;
  color: string;
  title: string;
  startLabel: string;
  endLabel: string;
  markerLabel: string;
};

/** Minimal line chart: baseline, draw-on line, end marker with label. */
export const MiniChart: React.FC<Props> = ({ width, height, points, progress, color, title, startLabel, endLabel, markerLabel }) => {
  const top = 46;
  const ch = height - top - 34;
  const px = (p: [number, number]): [number, number] => [p[0] * width, top + (1 - p[1]) * ch];
  const pts = points.map(px);
  const segs = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
  const total = segs.reduce((a, b) => a + b, 0);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const end = pts[pts.length - 1];
  const done = progress > 0.98;
  return (
    <div style={{ position: "relative", width, height }}>
      <div style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: 24, letterSpacing: "0.1em", color: COLORS.grey }}>{title}</div>
      <svg width={width} height={height} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        <line x1={0} x2={width} y1={top + ch} y2={top + ch} stroke={COLORS.hairline} strokeWidth={2} />
        <line x1={0} x2={width} y1={top} y2={top} stroke={COLORS.hairline} strokeWidth={1.5} strokeDasharray="6 8" />
        <path d={d} fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${total} ${total}`} strokeDashoffset={total * (1 - progress)} />
        {done ? <circle cx={end[0]} cy={end[1]} r={9} fill={color} stroke={COLORS.pearl} strokeWidth={3} /> : null}
      </svg>
      <div style={{ position: "absolute", left: 0, top: top + ch + 6, fontFamily: FONTS.body, fontSize: 22, color: COLORS.greyLight }}>{startLabel}</div>
      <div style={{ position: "absolute", right: 0, top: top + ch + 6, fontFamily: FONTS.body, fontSize: 22, color: COLORS.greyLight }}>{endLabel}</div>
      <div
        style={{
          position: "absolute",
          left: Math.min(end[0] - 20, width - 150),
          top: end[1] - 50,
          padding: "4px 12px",
          borderRadius: 8,
          background: color,
          color: COLORS.pearl,
          fontFamily: FONTS.heading,
          fontWeight: 700,
          fontSize: 22,
          opacity: done ? 1 : 0,
          whiteSpace: "nowrap",
        }}
      >
        {markerLabel}
      </div>
    </div>
  );
};
