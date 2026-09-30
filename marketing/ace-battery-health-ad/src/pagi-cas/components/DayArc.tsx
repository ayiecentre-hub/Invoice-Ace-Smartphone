import React from "react";
import { COLORS, FONTS } from "../../theme";

const W = 888;
/** Hours on the arc, 7 AM → 7 PM. */
const H0 = 7;
const H1 = 19;

/** Battery level at hour h for each battery (illustrative, same use). */
export const healthyAt = (h: number) => Math.max(18, 100 - (h - H0) * 6.9);
export const wornAt = (h: number) => Math.max(1, 100 - (h - H0) * 19.5);

const Pill: React.FC<{ label: string; level: number; color: string; note?: string; noteP?: number }> = ({ label, level, color, note, noteP = 0 }) => (
  <div style={{ width: W }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontFamily: FONTS.body, fontWeight: 700, fontSize: 30, color: COLORS.navy }}>
      <span>{label}</span>
      <span style={{ fontFamily: FONTS.heading, fontSize: 52, letterSpacing: "-0.03em", color: level < 10 ? COLORS.lowBattery : color, fontVariantNumeric: "tabular-nums" }}>{Math.round(level)}%</span>
    </div>
    <div style={{ position: "relative", marginTop: 10, height: 58, borderRadius: 29, border: `4px solid ${COLORS.navy}`, padding: 6, boxSizing: "border-box" }}>
      <div style={{ height: "100%", width: `${Math.max(2.5, level)}%`, borderRadius: 22, background: level < 10 ? COLORS.lowBattery : color }} />
      <div style={{ position: "absolute", right: -16, top: 14, width: 10, height: 22, borderRadius: "0 5px 5px 0", background: COLORS.navy }} />
    </div>
    {note ? <div style={{ marginTop: 10, fontFamily: FONTS.heading, fontWeight: 700, fontSize: 28, color: COLORS.lowBattery, opacity: noteP }}>{note}</div> : null}
  </div>
);

/**
 * A day as a sun arc (7 AM → 7 PM). `hour` drives the sun and both battery pills.
 * The worn battery is at 1% around noon, matching the poster's 1%.
 */
export const DayArc: React.FC<{ hour: number; arcP: number; noonMark: number }> = ({ hour, arcP, noonMark }) => {
  const R = 380;
  const cx = W / 2;
  const cy = 440;
  const t = (hour - H0) / (H1 - H0);
  const ang = Math.PI * (1 - t);
  const sx = cx + Math.cos(ang) * R;
  const sy = cy - Math.sin(ang) * R;
  const arcLen = Math.PI * R;
  const noonAng = Math.PI * (1 - (12.2 - H0) / (H1 - H0));
  const nx = cx + Math.cos(noonAng) * R;
  const ny = cy - Math.sin(noonAng) * R;
  const hh = Math.floor(hour);
  const mm = Math.floor((hour - hh) * 60);
  const clock = `${((hh + 11) % 12) + 1}:${String(mm).padStart(2, "0")} ${hh < 12 ? "pagi" : hh < 14 ? "tgh hari" : hh < 19 ? "petang" : "malam"}`;
  return (
    <div style={{ position: "relative", width: W }}>
      <div style={{ position: "relative", width: W, height: 470 }}>
        <svg width={W} height={470} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`} fill="none" stroke={COLORS.hairline} strokeWidth={4} strokeDasharray="6 12" />
          <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`} fill="none" stroke={COLORS.gold} strokeWidth={6} strokeLinecap="round" strokeDasharray={`${arcLen} ${arcLen}`} strokeDashoffset={arcLen * (1 - Math.min(t, 1) * arcP)} />
          <line x1={cx - R - 20} x2={cx + R + 20} y1={cy} y2={cy} stroke={COLORS.hairline} strokeWidth={2} />
          {noonMark > 0 ? (
            <g opacity={noonMark}>
              <line x1={nx} y1={ny + 14} x2={nx} y2={cy - 185} stroke={COLORS.lowBattery} strokeWidth={3} strokeDasharray="6 8" />
              <circle cx={nx} cy={ny} r={12 + 18 * (1 - noonMark)} fill="none" stroke={COLORS.lowBattery} strokeWidth={4} />
            </g>
          ) : null}
          <circle cx={sx} cy={sy} r={26} fill={COLORS.gold} opacity={arcP} />
          <circle cx={sx} cy={sy} r={40} fill="none" stroke={COLORS.gold} strokeWidth={2} opacity={0.4 * arcP} />
        </svg>
        <div style={{ position: "absolute", left: cx - R - 40, top: cy + 14, fontFamily: FONTS.body, fontSize: 24, color: COLORS.greyLight }}>7 pagi</div>
        <div style={{ position: "absolute", left: cx - 40, top: cy - R - 60, fontFamily: FONTS.body, fontSize: 24, color: COLORS.greyLight }}>12 tgh hari</div>
        <div style={{ position: "absolute", left: cx + R - 30, top: cy + 14, fontFamily: FONTS.body, fontSize: 24, color: COLORS.greyLight }}>7 malam</div>
        <div style={{ position: "absolute", left: 0, right: 0, top: cy - 170, textAlign: "center", fontFamily: FONTS.heading, fontWeight: 700, fontSize: 88, letterSpacing: "-0.04em", color: COLORS.navy, fontVariantNumeric: "tabular-nums", opacity: arcP }}>{clock}</div>
      </div>
      <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 22 }}>
        <Pill label="Bateri sihat" level={healthyAt(hour)} color={COLORS.blue} />
        <Pill label="Bateri dah haus" level={wornAt(hour)} color={COLORS.gold} note="Tinggal 1% seawal 12:15" noteP={noonMark} />
      </div>
    </div>
  );
};
