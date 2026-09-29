import React from "react";
import { COLORS } from "../../theme";

type Props = { width: number; level: number; segments?: number };

/** Horizontal segmented battery: reads like a gauge, each segment = 10%. */
export const SegmentBattery: React.FC<Props> = ({ width, level, segments = 10 }) => {
  const h = width * 0.42;
  const stroke = Math.max(6, width * 0.022);
  const pad = stroke * 1.6;
  const gap = width * 0.012;
  const innerW = width - pad * 2 - stroke * 2;
  const segW = (innerW - gap * (segments - 1)) / segments;
  return (
    <div style={{ position: "relative", width: width + width * 0.06, height: h }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width,
          height: h,
          borderRadius: h * 0.2,
          border: `${stroke}px solid ${COLORS.navy}`,
          boxSizing: "border-box",
          padding: pad,
          display: "flex",
          gap,
        }}
      >
        {Array.from({ length: segments }).map((_, i) => {
          const fill = Math.max(0, Math.min(1, level / 10 - i));
          return (
            <div key={i} style={{ width: segW, height: "100%", borderRadius: 6, background: COLORS.pearlDim, overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${fill * 100}%`, background: COLORS.blue }} />
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          left: width - 1,
          top: h * 0.3,
          width: width * 0.05,
          height: h * 0.4,
          borderRadius: `0 ${h * 0.08}px ${h * 0.08}px 0`,
          background: COLORS.navy,
        }}
      />
    </div>
  );
};
