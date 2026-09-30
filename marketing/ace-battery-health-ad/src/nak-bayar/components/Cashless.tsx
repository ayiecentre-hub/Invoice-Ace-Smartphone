import React from "react";
import { COLORS, FONTS } from "../../theme";

type K = "shop" | "parking" | "wallet" | "bank";
const Glyph: React.FC<{ k: K; c: string }> = ({ k, c }) => (
  <svg width="54" height="54" viewBox="0 0 54 54" fill="none" stroke={c} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
    {k === "shop" ? <path d="M8 20 L12 10 H42 L46 20 Z M10 20 V44 H44 V20 M22 44 V32 H32 V44" /> : null}
    {k === "parking" ? (
      <g>
        <rect x="9" y="9" width="36" height="36" rx="8" />
        <path d="M22 38 V16 H29 A6 6 0 0 1 29 28 H22" />
      </g>
    ) : null}
    {k === "wallet" ? (
      <g>
        <rect x="7" y="14" width="40" height="28" rx="6" />
        <path d="M35 28 H47" />
        <circle cx="37" cy="28" r="1.5" fill={c} />
      </g>
    ) : null}
    {k === "bank" ? <path d="M8 20 L27 9 L46 20 Z M12 24 V38 M22 24 V38 M32 24 V38 M42 24 V38 M8 42 H46" /> : null}
  </svg>
);

const ITEMS: { k: K; label: string }[] = [
  { k: "shop", label: "Bayar kedai" },
  { k: "parking", label: "Parking" },
  { k: "wallet", label: "E-wallet" },
  { k: "bank", label: "Kod TAC bank" },
];

/** Four daily cashless tasks; when the phone dies each one greys out with a ✕, one by one. */
export const CashlessTiles: React.FC<{ inP: number[]; off: number[] }> = ({ inP, off }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, width: 888 }}>
    {ITEMS.map((it, i) => {
      const dead = off[i] > 0.5;
      return (
        <div key={it.k} style={{ position: "relative", height: 150, borderRadius: 24, background: dead ? "rgba(247,247,248,0.04)" : "rgba(247,247,248,0.10)", border: `1.5px solid ${dead ? COLORS.hairlineOnNavy : "rgba(247,247,248,0.28)"}`, display: "flex", alignItems: "center", gap: 18, padding: "0 26px", opacity: inP[i], transform: `translateY(${(1 - inP[i]) * 30}px)` }}>
          <Glyph k={it.k} c={dead ? COLORS.greyLight : COLORS.pearl} />
          <div style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 34, color: dead ? COLORS.greyLight : COLORS.pearl }}>{it.label}</div>
          <div style={{ position: "absolute", right: 22, top: "50%", width: 40, height: 40, marginTop: -20, borderRadius: 20, background: COLORS.alertText, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.heading, fontWeight: 700, fontSize: 24, transform: `scale(${off[i]})` }}>✕</div>
        </div>
      );
    })}
  </div>
);
