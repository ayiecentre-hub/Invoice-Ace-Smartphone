import React from "react";
import { COLORS, FONTS } from "../../theme";

const W = 888;
const R = 360;
const CX = W / 2;
const CY = 400;

const pt = (frac: number, r = R) => {
  const a = Math.PI * (1 - frac);
  return [CX + Math.cos(a) * r, CY - Math.sin(a) * r] as const;
};
const arc = (a: number, b: number, r = R) => {
  const [x1, y1] = pt(a, r);
  const [x2, y2] = pt(b, r);
  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
};

/**
 * Performance meter (illustrative). `value` 0–1 drives the needle; `cap` (0–1 visibility) shows the
 * limiter band from `capAt` upward; `wear` 0–1 shrinks and warms the battery in the hub.
 */
export const PerformanceGauge: React.FC<{ value: number; cap: number; capAt: number; wear: number; status: string; statusColor: string; statusP: number }> = ({ value, cap, capAt, wear, status, statusColor, statusP }) => {
  const [nx, ny] = pt(value, R - 70);
  const battFill = 1 - 0.28 * wear;
  const battColor = wear > 0.5 ? COLORS.gold : COLORS.iosGreen;
  return (
    <div style={{ position: "relative", width: W, height: 560 }}>
      <svg width={W} height={470} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        <path d={arc(0, 1)} fill="none" stroke={COLORS.pearlDim} strokeWidth={34} strokeLinecap="round" />
        <path d={arc(0, Math.max(0.001, value))} fill="none" stroke={COLORS.blue} strokeWidth={34} strokeLinecap="round" />
        {cap > 0 ? (
          <g opacity={cap}>
            <path d={arc(capAt, 1, R + 40)} fill="none" stroke={COLORS.lowBattery} strokeWidth={8} strokeDasharray="4 10" />
            <line x1={pt(capAt, R - 30)[0]} y1={pt(capAt, R - 30)[1]} x2={pt(capAt, R + 56)[0]} y2={pt(capAt, R + 56)[1]} stroke={COLORS.lowBattery} strokeWidth={8} strokeLinecap="round" />
          </g>
        ) : null}
        {Array.from({ length: 11 }).map((_, i) => {
          const [x1, y1] = pt(i / 10, R - 34);
          const [x2, y2] = pt(i / 10, R - 52);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={COLORS.hairline} strokeWidth={4} strokeLinecap="round" />;
        })}
        <line x1={CX} y1={CY} x2={nx} y2={ny} stroke={COLORS.navy} strokeWidth={10} strokeLinecap="round" />
        <circle cx={CX} cy={CY} r={62} fill={COLORS.navy} />
      </svg>
      {/* battery in the hub */}
      <div style={{ position: "absolute", left: CX - 30, top: CY - 18, width: 52, height: 36, borderRadius: 8, border: `3px solid ${COLORS.pearl}`, padding: 3, boxSizing: "border-box" }}>
        <div style={{ width: `${battFill * 100}%`, height: "100%", borderRadius: 3, background: battColor }} />
        <div style={{ position: "absolute", right: -9, top: 9, width: 5, height: 12, borderRadius: "0 3px 3px 0", background: COLORS.pearl }} />
      </div>
      <div style={{ position: "absolute", left: CX - R - 30, top: CY + 30, fontFamily: FONTS.body, fontWeight: 600, fontSize: 26, color: COLORS.greyLight }}>Perlahan</div>
      <div style={{ position: "absolute", left: CX + R - 40, top: CY + 30, fontFamily: FONTS.body, fontWeight: 600, fontSize: 26, color: COLORS.greyLight }}>Laju</div>
      {cap > 0 ? (
        <div style={{ position: "absolute", left: pt(capAt, R + 70)[0] - 20, top: pt(capAt, R + 70)[1] - 52, padding: "6px 14px", borderRadius: 10, background: COLORS.lowBattery, color: "#fff", fontFamily: FONTS.body, fontWeight: 700, fontSize: 24, opacity: cap, transform: `scale(${0.8 + 0.2 * cap})` }}>DIHADKAN</div>
      ) : null}
      <div style={{ position: "absolute", left: 0, right: 0, top: CY + 90, display: "flex", justifyContent: "center" }}>
        <div style={{ padding: "12px 26px", borderRadius: 999, background: statusColor, color: "#fff", fontFamily: FONTS.heading, fontWeight: 700, fontSize: 34, letterSpacing: "-0.01em", opacity: statusP, transform: `scale(${0.9 + 0.1 * statusP})` }}>{status}</div>
      </div>
    </div>
  );
};
