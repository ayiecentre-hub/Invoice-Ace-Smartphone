import React from "react";
import { COLORS, FONTS } from "../theme";

type Props = {
  width: number;
  /** 0–1 focus ring around the 76% value. */
  focus: number;
  /** 0–1 underline under "Maximum Capacity". */
  underline: number;
};

export const CARD_ROW_H = 118;

/**
 * UI zoom of the iOS "Battery Health & Charging" group, enlarged so it reads on a phone feed.
 * Same copy as the on-device screen; value is always 76%.
 */
export const BatteryHealthCard: React.FC<Props> = ({ width, focus, underline }) => (
  <div style={{ width, fontFamily: "Inter" }}>
    <div
      style={{
        fontSize: 24,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: COLORS.grey,
        margin: "0 0 12px 8px",
        fontFamily: FONTS.body,
      }}
    >
      Settings › Battery › Battery Health &amp; Charging
    </div>
    <div
      style={{
        background: "#fff",
        borderRadius: 28,
        boxShadow: "0 24px 60px rgba(26,26,46,0.14), 0 2px 0 rgba(26,26,46,0.04)",
        height: CARD_ROW_H,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        position: "relative",
      }}
    >
      <span style={{ fontSize: 44, color: "#000", position: "relative" }}>
        Maximum Capacity
        <span
          style={{
            position: "absolute",
            left: 0,
            bottom: -8,
            height: 5,
            width: `${underline * 100}%`,
            background: COLORS.blue,
            borderRadius: 3,
          }}
        />
      </span>
      <span style={{ position: "relative", fontSize: 52, fontWeight: 700, color: focus > 0.4 ? COLORS.blue : "#000" }}>
        76%
        <span
          style={{
            position: "absolute",
            left: -22,
            top: -16,
            right: -22,
            bottom: -16,
            borderRadius: 999,
            border: `4px solid ${COLORS.blue}`,
            opacity: focus,
            transform: `scale(${1.35 - 0.35 * focus})`,
          }}
        />
      </span>
    </div>
  </div>
);
