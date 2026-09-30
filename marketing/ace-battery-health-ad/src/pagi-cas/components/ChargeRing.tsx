import React from "react";
import { COLORS, FONTS } from "../../theme";

/** Trust "charges up": each promise adds a third to the ring; at 100% a bolt appears. */
export const ChargeRing: React.FC<{ level: number; bolt: number }> = ({ level, bolt }) => {
  const R = 120;
  const C = 2 * Math.PI * R;
  return (
    <div style={{ position: "relative", width: 300, height: 300 }}>
      <svg width={300} height={300} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={150} cy={150} r={R} fill="none" stroke={COLORS.hairlineOnNavy} strokeWidth={22} />
        <circle cx={150} cy={150} r={R} fill="none" stroke={level > 0.99 ? COLORS.gold : COLORS.blue} strokeWidth={22} strokeLinecap="round" strokeDasharray={`${C} ${C}`} strokeDashoffset={C * (1 - level)} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.heading, fontWeight: 700, fontSize: 72, color: COLORS.pearl, fontVariantNumeric: "tabular-nums" }}>
        {bolt > 0.5 ? (
          <svg width="90" height="120" viewBox="0 0 64 96" style={{ transform: `scale(${0.6 + 0.4 * bolt})` }}>
            <path d="M38 4 L8 54 H30 L24 92 L56 38 H34 Z" fill={COLORS.gold} />
          </svg>
        ) : (
          `${Math.round(level * 100)}%`
        )}
      </div>
    </div>
  );
};
