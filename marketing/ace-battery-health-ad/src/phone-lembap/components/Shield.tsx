import React from "react";
import { COLORS, FONTS } from "../../theme";

const SHIELD = "M32 4 L56 12 V30 C56 46 45 56 32 60 C19 56 8 46 8 30 V12 Z";

/** The poster's gold shield + tick. `draw` strokes the outline, `fill` rises from the bottom, `tick` draws the check. */
export const ShieldIcon: React.FC<{ size: number; draw: number; fill?: number; tick: number; id: string }> = ({ size, draw, fill = 0, tick, id }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <defs>
      <clipPath id={id}>
        <rect x="0" y={64 - 64 * fill} width="64" height="64" />
      </clipPath>
    </defs>
    <path d={SHIELD} fill={COLORS.gold} opacity={0.22} clipPath={`url(#${id})`} />
    <path d={SHIELD} fill="none" stroke={COLORS.gold} strokeWidth={3.2} strokeLinejoin="round" strokeDasharray="190" strokeDashoffset={190 * (1 - draw)} />
    <path d="M21 32 L29 40 L44 24" fill="none" stroke={COLORS.gold} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="36" strokeDashoffset={36 * (1 - tick)} />
  </svg>
);

/** Poster trust line, verbatim: "Harga jelas / sebelum anda setuju". */
export const ShieldCard: React.FC<{ p: number; draw: number; dark?: boolean }> = ({ p, draw, dark }) => (
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
    <ShieldIcon size={76} draw={draw} tick={Math.max(0, draw * 1.4 - 0.4)} id={dark ? "shield-card-dark" : "shield-card"} />
    <div style={{ fontFamily: FONTS.heading, fontWeight: 500, fontSize: 36, lineHeight: 1.12, letterSpacing: "-0.02em", color: COLORS.pearl }}>
      <b style={{ fontWeight: 700 }}>Harga jelas</b>
      <br />
      sebelum anda setuju
    </div>
  </div>
);
