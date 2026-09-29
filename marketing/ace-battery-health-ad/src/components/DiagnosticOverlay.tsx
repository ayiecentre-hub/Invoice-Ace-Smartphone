import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, EASE, FONTS } from "../theme";
import { prog, tween } from "../lib/anim";

const STEPS = ["CHECK", "DIAGNOSE", "EXPLAIN", "CUSTOMER DECIDES"];

type Props = { start: number; stepGap?: number };

/**
 * The ACE process as a calm, linear flow. Each step lights up in order; the connector
 * between steps fills like a progress bar so the eye travels left → right.
 */
export const DiagnosticOverlay: React.FC<Props> = ({ start, stepGap = 12 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", alignItems: "stretch", width: 888, gap: 0 }}>
      {STEPS.map((label, i) => {
        const s = start + i * stepGap;
        const p = prog(frame, s, 12);
        const lit = prog(frame, s + 4, 8);
        const bar = prog(frame, s + 6, stepGap, EASE.inOut);
        const last = i === STEPS.length - 1;
        return (
          <React.Fragment key={label}>
            <div
              style={{
                flex: last ? 1.25 : 1,
                minHeight: 118,
                borderRadius: 22,
                background: last ? `rgba(43,94,167,${lit})` : "#fff",
                border: `2px solid ${last ? COLORS.blue : lit > 0.5 ? COLORS.blue : COLORS.hairline}`,
                boxShadow: "0 14px 34px rgba(26,26,46,0.10)",
                opacity: p,
                transform: `translateY(${tween(frame, s, 12, 26, 0, EASE.out)}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "10px 6px",
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: last ? COLORS.pearl : lit > 0.5 ? COLORS.blue : COLORS.pearlDim,
                  color: last ? COLORS.blue : COLORS.pearl,
                  fontFamily: FONTS.heading,
                  fontSize: 17,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  fontFamily: FONTS.heading,
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: "0.04em",
                  textAlign: "center",
                  lineHeight: 1.1,
                  color: last ? (lit > 0.5 ? COLORS.pearl : COLORS.blue) : COLORS.navy,
                }}
              >
                {label}
              </div>
            </div>
            {!last ? (
              <div style={{ width: 22, display: "flex", alignItems: "center" }}>
                <div style={{ width: "100%", height: 3, background: COLORS.hairline, position: "relative" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${bar * 100}%`, background: COLORS.blue }} />
                </div>
              </div>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/** Corner brackets that lock onto a target (focus frame). */
export const FocusBrackets: React.FC<{ w: number; h: number; p: number; color?: string }> = ({ w, h, p, color = COLORS.blue }) => {
  const len = 54;
  const off = (1 - p) * 40;
  const c = (x: number, y: number, rot: number) => (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: len,
        height: len,
        borderLeft: `5px solid ${color}`,
        borderTop: `5px solid ${color}`,
        borderTopLeftRadius: 18,
        transform: `rotate(${rot}deg)`,
        opacity: p,
      }}
    />
  );
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {c(-off, -off, 0)}
      {c(w - len + off, -off, 90)}
      {c(w - len + off, h - len + off, 180)}
      {c(-off, h - len + off, 270)}
    </div>
  );
};
