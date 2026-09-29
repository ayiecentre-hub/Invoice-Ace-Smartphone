import React from "react";
import { COLORS, FONTS } from "../../theme";

/** Sign row: numbered, tickable, with its own tiny explanatory animation on the right. */
export const SignRow: React.FC<{ n: number; title: string; p: number; tick: number; children: React.ReactNode }> = ({ n, title, p, tick, children }) => (
  <div
    style={{
      position: "relative",
      width: 888,
      height: 200,
      borderRadius: 30,
      background: "#fff",
      boxShadow: tick > 0.5 ? "0 22px 50px rgba(43,94,167,0.16)" : "0 16px 40px rgba(26,26,46,0.08)",
      border: `2px solid ${tick > 0.5 ? COLORS.blue : "transparent"}`,
      opacity: Math.min(1, p * 2),
      transform: `translateY(${(1 - p) * 60}px)`,
      display: "flex",
      alignItems: "center",
      padding: "0 30px",
      gap: 26,
    }}
  >
    <div style={{ width: 68, height: 68, borderRadius: 18, border: `4px solid ${tick > 0.5 ? COLORS.blue : COLORS.pearlDim}`, background: tick > 0.5 ? COLORS.blue : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
      {tick > 0.02 ? (
        <svg width="40" height="40" viewBox="0 0 40 40">
          <path d="M9 21 L17 29 L31 12" fill="none" stroke={COLORS.pearl} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="36" strokeDashoffset={36 * (1 - tick)} />
        </svg>
      ) : (
        <span style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 30, color: COLORS.greyLight }}>{n}</span>
      )}
    </div>
    <div style={{ flex: 1, fontFamily: FONTS.heading, fontWeight: 700, fontSize: 44, lineHeight: 1.08, letterSpacing: "-0.03em", color: COLORS.navy, whiteSpace: "pre-line" }}>{title}</div>
    <div style={{ width: 250, height: 150, position: "relative", flex: "none" }}>{children}</div>
  </div>
);

/** Sign 1: plug counter 1 → 3 */
export const PlugCounter: React.FC<{ count: number }> = ({ count }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10, height: "100%" }}>
    {[1, 2, 3].map((i) => (
      <svg key={i} width="64" height="84" viewBox="0 0 64 84" style={{ opacity: count >= i ? 1 : 0.18, transform: `translateY(${count >= i ? 0 : 10}px)` }}>
        <rect x="10" y="22" width="44" height="36" rx="8" fill={count >= i ? COLORS.blue : COLORS.greyLight} />
        <rect x="20" y="6" width="6" height="18" rx="3" fill={count >= i ? COLORS.blue : COLORS.greyLight} />
        <rect x="38" y="6" width="6" height="18" rx="3" fill={count >= i ? COLORS.blue : COLORS.greyLight} />
        <rect x="28" y="58" width="8" height="24" rx="3" fill={count >= i ? COLORS.blue : COLORS.greyLight} />
      </svg>
    ))}
  </div>
);

/** Sign 2: a steep drop, 30% → 8% */
export const SteepDrop: React.FC<{ p: number }> = ({ p }) => {
  const len = 260;
  const v = Math.round(30 - 22 * p);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <svg width="250" height="150" style={{ position: "absolute", inset: 0 }}>
        <line x1="0" y1="140" x2="250" y2="140" stroke={COLORS.hairline} strokeWidth="2" />
        <path d="M 6 30 L 120 38 L 150 120 L 244 128" fill="none" stroke={p > 0.6 ? COLORS.lowBattery : COLORS.blue} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${len} ${len}`} strokeDashoffset={len * (1 - p)} />
      </svg>
      <div style={{ position: "absolute", right: 0, top: 0, fontFamily: FONTS.heading, fontWeight: 700, fontSize: 44, color: p > 0.6 ? COLORS.lowBattery : COLORS.navy, fontVariantNumeric: "tabular-nums" }}>{v}%</div>
    </div>
  );
};

/** Sign 3: screen goes dark while a % is still showing */
export const SuddenOff: React.FC<{ off: number }> = ({ off }) => (
  <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", height: "100%" }}>
    <div style={{ position: "relative", width: 90, height: 150, borderRadius: 18, background: "#111", border: "4px solid #2a2b30", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#3a4470,#1a1d30)", opacity: 1 - off }} />
      <div style={{ position: "absolute", top: 8, right: 8, fontFamily: FONTS.heading, fontWeight: 700, fontSize: 18, color: "#fff", opacity: 1 - off }}>15%</div>
    </div>
    <div style={{ marginLeft: 14, fontFamily: FONTS.heading, fontWeight: 700, fontSize: 30, color: COLORS.lowBattery, opacity: off }}>15%</div>
  </div>
);

/** Poster offer, verbatim, with the poster's gold battery icon. */
export const FreeCheckCard: React.FC<{ p: number; dark?: boolean; draw: number }> = ({ p, dark, draw }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 22,
      padding: "22px 26px",
      borderRadius: 24,
      background: dark ? "rgba(247,247,248,0.06)" : COLORS.navy,
      border: dark ? `1.5px solid ${COLORS.hairlineOnNavy}` : "none",
      opacity: p,
      transform: `translateY(${(1 - p) * 30}px) scale(${0.96 + 0.04 * p})`,
    }}
  >
    <svg width="76" height="76" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="29" fill="none" stroke={COLORS.gold} strokeWidth="3" strokeDasharray="183" strokeDashoffset={183 * (1 - draw)} />
      <rect x="24" y="17" width="16" height="31" rx="3" fill="none" stroke={COLORS.gold} strokeWidth="2.6" />
      <rect x="28.5" y="13" width="7" height="4" rx="1" fill={COLORS.gold} />
      <rect x="27" y="36" width="10" height="9" rx="1.5" fill={COLORS.gold} />
    </svg>
    <div style={{ fontFamily: FONTS.heading, fontWeight: 500, fontSize: 36, lineHeight: 1.12, letterSpacing: "-0.02em", color: COLORS.pearl }}>
      Pemeriksaan
      <br />
      awal <b style={{ fontWeight: 700 }}>percuma.</b>
    </div>
  </div>
);
