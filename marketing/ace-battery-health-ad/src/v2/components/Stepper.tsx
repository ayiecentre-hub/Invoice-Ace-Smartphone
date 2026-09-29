import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, EASE, FONTS } from "../../theme";
import { prog } from "../../lib/anim";

const STEPS = ["CHECK", "DIAGNOSE", "EXPLAIN", "CUSTOMER\nDECIDES"];

/**
 * Progress-rail version of the ACE process: the rail fills node to node; the final node
 * (the customer's decision) earns the only gold check mark.
 */
export const Stepper: React.FC<{ start: number; gap?: number; width: number }> = ({ start, gap = 12, width }) => {
  const frame = useCurrentFrame();
  const nodeX = (i: number) => 40 + (i * (width - 80)) / (STEPS.length - 1);
  const rail = prog(frame, start, gap * (STEPS.length - 1), EASE.inOut);
  const appear = prog(frame, start - 8, 10);
  return (
    <div style={{ position: "relative", width, height: 170, opacity: appear }}>
      <div style={{ position: "absolute", left: nodeX(0), right: width - nodeX(3), top: 38, height: 4, borderRadius: 2, background: COLORS.hairline }} />
      <div style={{ position: "absolute", left: nodeX(0), top: 38, height: 4, borderRadius: 2, width: (nodeX(3) - nodeX(0)) * rail, background: COLORS.blue }} />
      {STEPS.map((label, i) => {
        const lit = prog(frame, start + i * gap, 8, EASE.back);
        const last = i === STEPS.length - 1;
        return (
          <div key={label} style={{ position: "absolute", left: nodeX(i) - 90, top: 0, width: 180, textAlign: "center" }}>
            <div
              style={{
                margin: "0 auto",
                width: 80,
                height: 80,
                borderRadius: 40,
                background: lit > 0.5 ? (last ? COLORS.blue : COLORS.pearl) : COLORS.pearl,
                border: `4px solid ${lit > 0.5 ? COLORS.blue : COLORS.pearlDim}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${0.85 + 0.15 * lit})`,
                boxShadow: lit > 0.5 ? "0 10px 26px rgba(43,94,167,0.22)" : "none",
                fontFamily: FONTS.heading,
                fontWeight: 700,
                fontSize: 30,
                color: lit > 0.5 ? (last ? COLORS.pearl : COLORS.blue) : COLORS.greyLight,
              }}
            >
              {last && lit > 0.5 ? (
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <path
                    d="M10 21 L17 28 L30 13"
                    fill="none"
                    stroke={COLORS.gold}
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="34"
                    strokeDashoffset={34 * (1 - prog(frame, start + i * gap + 2, 8))}
                  />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <div
              style={{
                marginTop: 12,
                fontFamily: FONTS.heading,
                fontWeight: 700,
                fontSize: 23,
                letterSpacing: "0.05em",
                lineHeight: 1.1,
                whiteSpace: "pre-line",
                color: lit > 0.5 ? COLORS.navy : COLORS.greyLight,
              }}
            >
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
