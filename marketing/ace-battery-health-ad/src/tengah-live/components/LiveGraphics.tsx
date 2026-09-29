import React from "react";
import { COLORS, FONTS } from "../../theme";

type LoadKind = "screen" | "camera" | "upload" | "heat";

const LoadIcon: React.FC<{ kind: LoadKind; c: string }> = ({ kind, c }) => (
  <svg width="54" height="54" viewBox="0 0 54 54" fill="none" stroke={c} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
    {kind === "screen" ? (
      <g>
        <circle cx="27" cy="27" r="9" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
          const r = (a * Math.PI) / 180;
          return <line key={a} x1={27 + Math.cos(r) * 15} y1={27 + Math.sin(r) * 15} x2={27 + Math.cos(r) * 21} y2={27 + Math.sin(r) * 21} />;
        })}
      </g>
    ) : null}
    {kind === "camera" ? (
      <g>
        <path d="M7 17 H16 L20 11 H34 L38 17 H47 V43 H7 Z" />
        <circle cx="27" cy="29" r="8" />
      </g>
    ) : null}
    {kind === "upload" ? (
      <g>
        <path d="M27 38 V12 M17 22 L27 12 L37 22" />
        <path d="M10 36 V44 H44 V36" />
      </g>
    ) : null}
    {kind === "heat" ? (
      <g>
        <path d="M23 32 V11 A4 4 0 0 1 31 11 V32 A9 9 0 1 1 23 32 Z" />
        <circle cx="27" cy="40" r="4" fill={c} />
      </g>
    ) : null}
  </svg>
);

const LOADS: { kind: LoadKind; label: string }[] = [
  { kind: "screen", label: "Skrin terang" },
  { kind: "camera", label: "Kamera" },
  { kind: "upload", label: "Upload video" },
  { kind: "heat", label: "Panas" },
];

/** Four load tiles; each adds a segment to the "beban bateri" meter. `step` is 0–4 (fractional). */
export const LoadMeter: React.FC<{ step: number }> = ({ step }) => {
  const level = Math.min(4, step) / 4;
  const color = level > 0.74 ? COLORS.lowBattery : level > 0.49 ? COLORS.gold : COLORS.blue;
  return (
    <div style={{ width: 888 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {LOADS.map((l, i) => {
          const on = Math.max(0, Math.min(1, step - i));
          return (
            <div
              key={l.kind}
              style={{
                height: 150,
                borderRadius: 26,
                background: "#fff",
                border: `2px solid ${on > 0.5 ? COLORS.blue : "transparent"}`,
                boxShadow: "0 16px 40px rgba(26,26,46,0.08)",
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "0 26px",
                opacity: 0.25 + 0.75 * on,
                transform: `scale(${0.94 + 0.06 * on})`,
              }}
            >
              <LoadIcon kind={l.kind} c={on > 0.5 ? COLORS.blue : COLORS.greyLight} />
              <div style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 38, letterSpacing: "-0.02em", color: COLORS.navy }}>{l.label}</div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 40, display: "flex", justifyContent: "space-between", fontFamily: FONTS.body, fontWeight: 700, fontSize: 26, letterSpacing: "0.1em", color: COLORS.grey }}>
        <span>BEBAN BATERI</span>
        <span style={{ color, opacity: level > 0.99 ? 1 : 0 }}>BEBAN TINGGI</span>
      </div>
      <div style={{ marginTop: 14, height: 44, borderRadius: 22, background: COLORS.pearlDim, overflow: "hidden", display: "flex", gap: 6, padding: 6 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ flex: 1, borderRadius: 16, background: color, transformOrigin: "0 50%", transform: `scaleX(${Math.max(0, Math.min(1, step - i))})` }} />
        ))}
      </div>
    </div>
  );
};

/** "Live 2 jam": healthy battery lasts, weak battery hits 0 at ~45 min. Illustrative. */
export const LiveTimeline: React.FC<{ p: number }> = ({ p }) => {
  const W = 888;
  const H = 520;
  const top = 40;
  const bottom = 440;
  const x = (m: number) => (m / 120) * (W - 40) + 20;
  const y = (v: number) => bottom - (v / 100) * (bottom - top);
  const healthy: [number, number][] = [[0, 100], [30, 82], [60, 62], [90, 40], [120, 18]];
  const weak: [number, number][] = [[0, 100], [15, 60], [30, 30], [45, 0]];
  const path = (pts: [number, number][]) => pts.map(([m, v], i) => `${i ? "L" : "M"}${x(m).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const lenH = 1000;
  const lenW = 700;
  const weakDone = p > 0.55;
  return (
    <div style={{ position: "relative", width: W, height: H }}>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        {[0, 30, 60, 90, 120].map((m) => (
          <g key={m}>
            <line x1={x(m)} x2={x(m)} y1={top} y2={bottom} stroke={COLORS.hairline} strokeWidth={1.5} strokeDasharray="4 8" />
            <text x={x(m)} y={bottom + 42} textAnchor="middle" fontFamily="DM Sans" fontSize="24" fill={COLORS.greyLight}>{m === 0 ? "mula" : m % 60 === 0 ? `${m / 60} jam` : `${m} min`}</text>
          </g>
        ))}
        <line x1={20} x2={W - 20} y1={bottom} y2={bottom} stroke={COLORS.hairline} strokeWidth={2} />
        <path d={path(healthy)} fill="none" stroke={COLORS.blue} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${lenH} ${lenH}`} strokeDashoffset={lenH * (1 - p)} />
        <path d={path(weak)} fill="none" stroke={COLORS.lowBattery} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${lenW} ${lenW}`} strokeDashoffset={lenW * (1 - Math.min(1, p / 0.55))} />
        {weakDone ? <circle cx={x(45)} cy={y(0)} r={12} fill={COLORS.lowBattery} stroke={COLORS.pearl} strokeWidth={4} /> : null}
        {p > 0.98 ? <circle cx={x(120)} cy={y(18)} r={12} fill={COLORS.blue} stroke={COLORS.pearl} strokeWidth={4} /> : null}
      </svg>
      <div style={{ position: "absolute", left: x(45) - 30, top: y(0) - 96, padding: "8px 14px", borderRadius: 12, background: COLORS.lowBattery, color: "#fff", fontFamily: FONTS.heading, fontWeight: 700, fontSize: 26, opacity: weakDone ? 1 : 0, whiteSpace: "nowrap" }}>
        Live terputus
      </div>
      <div style={{ position: "absolute", right: 10, top: y(18) - 80, padding: "8px 14px", borderRadius: 12, background: COLORS.blue, color: "#fff", fontFamily: FONTS.heading, fontWeight: 700, fontSize: 26, opacity: p > 0.98 ? 1 : 0 }}>
        Sampai habis
      </div>
    </div>
  );
};

/** Poster offer verbatim, with its clock icon. */
export const SameDayCard: React.FC<{ p: number; draw: number; dark?: boolean }> = ({ p, draw, dark }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 22, padding: "22px 26px", borderRadius: 24, background: dark ? "rgba(247,247,248,0.06)" : COLORS.navy, border: dark ? `1.5px solid ${COLORS.hairlineOnNavy}` : "none", opacity: p, transform: `translateY(${(1 - p) * 30}px) scale(${0.96 + 0.04 * p})` }}>
    <svg width="80" height="70" viewBox="0 0 80 70" fill="none" stroke={COLORS.gold} strokeWidth="3.4" strokeLinecap="round">
      <circle cx="46" cy="35" r="26" strokeDasharray="164" strokeDashoffset={164 * (1 - draw)} />
      <path d={`M46 20 V35 L${46 + 10 * draw} ${35 + 8 * draw}`} />
      <path d="M4 26 H16 M8 35 H18 M4 44 H16" />
    </svg>
    <div style={{ fontFamily: FONTS.heading, fontSize: 36, lineHeight: 1.12, letterSpacing: "-0.02em", color: COLORS.pearl }}>
      <b style={{ fontWeight: 700 }}>Servis hari sama,</b>
      <br />
      <span style={{ fontWeight: 400, opacity: 0.85 }}>tertakluk stok.</span>
    </div>
  </div>
);

/** Card stack: each promise is dealt on top of the last, slightly rotated, the deck tidies up. */
export const TrustCard: React.FC<{ text: string; p: number; settle: number; index: number; accent?: boolean }> = ({ text, p, settle, index, accent }) => {
  const rot = [-4, 3, -1][index] * (1 - settle);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: index * 150,
        width: 888,
        height: 190,
        borderRadius: 30,
        background: accent ? COLORS.blue : COLORS.pearl,
        boxShadow: "0 30px 70px rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        padding: "0 44px",
        fontFamily: FONTS.heading,
        fontWeight: 700,
        fontSize: accent ? 70 : 92,
        letterSpacing: "-0.045em",
        color: accent ? COLORS.pearl : COLORS.navy,
        whiteSpace: "nowrap",
        opacity: p > 0 ? 1 : 0,
        transform: `translateY(${(1 - p) * 700}px) rotate(${rot + (1 - p) * 8}deg)`,
      }}
    >
      {text}
    </div>
  );
};
