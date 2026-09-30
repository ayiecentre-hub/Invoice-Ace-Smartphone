import React from "react";
import { COLORS, FONTS } from "../../theme";

const W = 888;
const H = 470;
/** Power demand while scanning a QR: idle → spike (camera+screen+data) → stays elevated. */
const PTS: [number, number][] = [[0, 400], [330, 392], [400, 170], [440, 118], [500, 250], [560, 318], [888, 328]];
const WORN_Y = 232;
const HEALTHY_Y = 78;
/** x where the spike crosses the worn-battery ceiling (on the rising edge). */
const CROSS_X = 330 + ((392 - WORN_Y) / (392 - 170)) * 70;

type Props = {
  /** 0–1 draw-on of the demand line. */
  draw: number;
  /** 0–1 ceilings appear. */
  ceilings: number;
  /** 0–1 crossing marker. */
  cross: number;
};

/**
 * Simplified illustration: a healthy battery can supply the spike (ceiling above it);
 * a worn one cannot (ceiling below it), so the phone shuts down even with % left.
 */
export const PowerSpike: React.FC<Props> = ({ draw, ceilings, cross }) => {
  const d = PTS.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");
  const len = 1300;
  return (
    <div style={{ position: "relative", width: W, height: H + 60 }}>
      <div style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: 24, letterSpacing: "0.12em", color: COLORS.grey }}>PERMINTAAN KUASA</div>
      <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 44, overflow: "visible" }}>
        <line x1={0} x2={W} y1={H - 30} y2={H - 30} stroke={COLORS.hairline} strokeWidth={2} />
        {/* ceilings */}
        <line x1={0} x2={W * ceilings} y1={HEALTHY_Y} y2={HEALTHY_Y} stroke={COLORS.blue} strokeWidth={4} strokeDasharray="14 10" />
        <line x1={0} x2={W * ceilings} y1={WORN_Y} y2={WORN_Y} stroke={COLORS.lowBattery} strokeWidth={4} strokeDasharray="14 10" />
        {/* demand */}
        <path d={`${d} L ${W},${H - 30} L 0,${H - 30} Z`} fill="rgba(43,94,167,0.08)" opacity={draw > 0.98 ? 1 : 0} />
        <path d={d} fill="none" stroke={COLORS.navy} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${len} ${len}`} strokeDashoffset={len * (1 - draw)} />
        {cross > 0 ? (
          <g opacity={cross}>
            <circle cx={CROSS_X} cy={WORN_Y} r={16 + 22 * (1 - cross)} fill="none" stroke={COLORS.lowBattery} strokeWidth={4} opacity={1 - cross * 0.6} />
            <circle cx={CROSS_X} cy={WORN_Y} r={11} fill={COLORS.lowBattery} stroke={COLORS.pearl} strokeWidth={4} />
          </g>
        ) : null}
      </svg>
      <div style={{ position: "absolute", right: 0, top: 44 + HEALTHY_Y - 48, padding: "6px 12px", borderRadius: 10, background: COLORS.blue, color: "#fff", fontFamily: FONTS.heading, fontWeight: 700, fontSize: 24, opacity: ceilings }}>Had bateri sihat</div>
      <div style={{ position: "absolute", right: 0, top: 44 + WORN_Y + 12, padding: "6px 12px", borderRadius: 10, background: COLORS.lowBattery, color: "#fff", fontFamily: FONTS.heading, fontWeight: 700, fontSize: 24, opacity: ceilings }}>Had bateri haus</div>
      <div style={{ position: "absolute", left: CROSS_X - 250, top: 44 + WORN_Y - 70, padding: "8px 14px", borderRadius: 12, background: COLORS.navy, color: COLORS.pearl, fontFamily: FONTS.heading, fontWeight: 700, fontSize: 26, opacity: cross, whiteSpace: "nowrap" }}>
        Telefon tutup sendiri
      </div>
      <div style={{ position: "absolute", left: 360, top: 44 + H - 22, fontFamily: FONTS.body, fontWeight: 600, fontSize: 24, color: COLORS.greyLight }}>↑ buka kamera, scan QR</div>
    </div>
  );
};

type LoadKind = "camera" | "screen" | "data";
const Icon: React.FC<{ kind: LoadKind; c: string }> = ({ kind, c }) => (
  <svg width="50" height="50" viewBox="0 0 54 54" fill="none" stroke={c} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
    {kind === "camera" ? (
      <g>
        <path d="M7 17 H16 L20 11 H34 L38 17 H47 V43 H7 Z" />
        <circle cx="27" cy="29" r="8" />
      </g>
    ) : null}
    {kind === "screen" ? (
      <g>
        <circle cx="27" cy="27" r="9" />
        {[0, 60, 120, 180, 240, 300].map((a) => {
          const r = (a * Math.PI) / 180;
          return <line key={a} x1={27 + Math.cos(r) * 15} y1={27 + Math.sin(r) * 15} x2={27 + Math.cos(r) * 21} y2={27 + Math.sin(r) * 21} />;
        })}
      </g>
    ) : null}
    {kind === "data" ? (
      <g>
        <path d="M18 40 V14 M10 22 L18 14 L26 22" />
        <path d="M36 14 V40 M28 32 L36 40 L44 32" />
      </g>
    ) : null}
  </svg>
);

export const LoadTiles: React.FC<{ on: number[] }> = ({ on }) => {
  const items: { k: LoadKind; label: string }[] = [
    { k: "camera", label: "Kamera" },
    { k: "screen", label: "Skrin terang" },
    { k: "data", label: "Data" },
  ];
  return (
    <div style={{ display: "flex", gap: 18, width: 888 }}>
      {items.map((it, i) => (
        <div key={it.k} style={{ flex: 1, height: 150, borderRadius: 24, background: "#fff", border: `2px solid ${on[i] > 0.5 ? COLORS.blue : "transparent"}`, boxShadow: "0 16px 40px rgba(26,26,46,0.08)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, opacity: 0.25 + 0.75 * on[i], transform: `scale(${0.92 + 0.08 * on[i]})` }}>
          <Icon kind={it.k} c={on[i] > 0.5 ? COLORS.blue : COLORS.greyLight} />
          <div style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 32, color: COLORS.navy }}>{it.label}</div>
        </div>
      ))}
    </div>
  );
};
