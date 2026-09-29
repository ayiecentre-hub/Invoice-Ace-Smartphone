import React from "react";
import { COLORS, FONTS } from "../../theme";

/** A checklist row whose tick draws on when its item has been checked. */
export const CheckRow: React.FC<{ label: string; p: number; done: number }> = ({ label, p, done }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 18,
      padding: "18px 22px",
      borderRadius: 20,
      background: "#fff",
      boxShadow: "0 12px 30px rgba(26,26,46,0.08)",
      opacity: p,
      transform: `translateX(${(1 - p) * 40}px)`,
    }}
  >
    <div style={{ width: 44, height: 44, borderRadius: 22, border: `3px solid ${done > 0.5 ? COLORS.blue : COLORS.pearlDim}`, background: done > 0.5 ? COLORS.blue : "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="26" height="26" viewBox="0 0 26 26">
        <path d="M6 13.5 L11 18.5 L20 8" fill="none" stroke={COLORS.pearl} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="24" strokeDashoffset={24 * (1 - done)} />
      </svg>
    </div>
    <div style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: 31, color: COLORS.navy, lineHeight: 1.15 }}>{label}</div>
  </div>
);

/** Document + check icon (as on the poster) with the poster's trust line, verbatim. */
export const DocCheckIcon: React.FC<{ size: number; draw: number; color?: string }> = ({ size, draw, color = COLORS.gold }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="29" fill="none" stroke={color} strokeWidth="3" />
    <path d="M22 16 H36 L43 23 V44 H22 Z M36 16 V23 H43" fill="none" stroke={color} strokeWidth="2.6" strokeLinejoin="round" />
    <path d="M26 29 H38 M26 34 H35" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="42" cy="43" r="8" fill={color} />
    <path d="M38.5 43 L41 45.5 L45.5 40.5" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="10" strokeDashoffset={10 * (1 - draw)} />
  </svg>
);

export const OfferCard: React.FC<{ p: number; draw: number; dark?: boolean }> = ({ p, draw, dark }) => (
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
    <DocCheckIcon size={76} draw={draw} />
    <div style={{ fontFamily: FONTS.heading, fontWeight: 600, fontSize: 36, lineHeight: 1.12, letterSpacing: "-0.02em", color: COLORS.pearl }}>
      Harga disahkan
      <br />
      sebelum servis.
    </div>
  </div>
);
