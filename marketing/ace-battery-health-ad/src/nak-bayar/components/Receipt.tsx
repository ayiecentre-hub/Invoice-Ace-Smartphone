import React from "react";
import { COLORS, FONTS } from "../../theme";

type Line = { text: string; p: number; accent?: boolean };

/**
 * Trust line as a printed receipt: fits the payment story, and "harga jelas" literally
 * reads like a line item. Zig-zag torn edge at the bottom.
 */
export const Receipt: React.FC<{ rise: number; lines: Line[]; footer: number }> = ({ rise, lines, footer }) => {
  const W = 800;
  const teeth = Array.from({ length: 20 }).map((_, i) => `${(i * W) / 20},0 ${((i + 0.5) * W) / 20},18`).join(" ");
  return (
    <div style={{ position: "relative", width: W, transform: `translateY(${(1 - rise) * 900}px)` }}>
      <div style={{ background: COLORS.pearl, padding: "40px 48px 34px", borderRadius: "18px 18px 0 0", boxShadow: "0 40px 90px rgba(0,0,0,0.45)" }}>
        <div style={{ textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 24, letterSpacing: "0.3em", color: COLORS.grey }}>ACE SMARTPHONE</div>
        <div style={{ textAlign: "center", fontFamily: FONTS.body, fontSize: 22, color: COLORS.greyLight, marginTop: 4 }}>Kepala Batas</div>
        <div style={{ borderTop: `3px dashed ${COLORS.hairline}`, margin: "26px 0 18px" }} />
        {lines.map((l) => (
          <div key={l.text} style={{ display: "flex", alignItems: "center", gap: 18, padding: "14px 0", opacity: l.p, transform: `translateX(${(1 - l.p) * -30}px)` }}>
            <div style={{ width: 46, height: 46, borderRadius: 23, background: l.accent ? COLORS.blue : COLORS.navy, color: COLORS.pearl, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
              <svg width="26" height="26" viewBox="0 0 26 26"><path d="M6 13.5 L11 18.5 L20 8" fill="none" stroke={COLORS.pearl} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: l.accent ? 58 : 62, letterSpacing: "-0.04em", color: l.accent ? COLORS.blue : COLORS.navy, whiteSpace: "nowrap" }}>{l.text}</div>
          </div>
        ))}
        <div style={{ borderTop: `3px dashed ${COLORS.hairline}`, margin: "18px 0 18px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 24, color: COLORS.navy, opacity: footer }}>
          <span>ANDA SETUJU</span>
          <span style={{ color: COLORS.gold }}>BARU SERVIS ✓</span>
        </div>
      </div>
      <svg width={W} height={18} style={{ display: "block" }}>
        <polygon points={`0,0 ${teeth} ${W},0`} fill={COLORS.pearl} />
      </svg>
    </div>
  );
};
