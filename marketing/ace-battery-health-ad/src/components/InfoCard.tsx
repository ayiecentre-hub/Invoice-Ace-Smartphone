import React from "react";
import { COLORS, FONTS } from "../theme";

type Props = {
  number: string;
  title: string;
  caption: string;
  /** 0–1 entrance. */
  p: number;
  width: number;
  height: number;
  children?: React.ReactNode;
};

/** Numbered editorial card: index + title, a graphic slot, one-line caption. */
export const InfoCard: React.FC<Props> = ({ number, title, caption, p, width, height, children }) => (
  <div
    style={{
      position: "relative",
      width,
      height,
      borderRadius: 32,
      background: "#fff",
      boxShadow: "0 26px 60px rgba(26,26,46,0.12), 0 2px 0 rgba(26,26,46,0.04)",
      opacity: Math.min(1, p * 2),
      transform: `translateY(${(1 - p) * 70}px)`,
      overflow: "hidden",
    }}
  >
    <div style={{ position: "absolute", left: 32, top: 30, fontFamily: FONTS.heading, fontWeight: 700, fontSize: 26, letterSpacing: "0.06em", color: COLORS.gold }}>{number}</div>
    <div style={{ position: "absolute", left: 32, right: 28, top: 68, fontFamily: FONTS.heading, fontWeight: 700, fontSize: 44, lineHeight: 1.05, letterSpacing: "-0.03em", color: COLORS.navy }}>{title}</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 190, bottom: 130, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>
    <div style={{ position: "absolute", left: 32, right: 28, bottom: 30, fontFamily: FONTS.body, fontWeight: 500, fontSize: 29, lineHeight: 1.25, color: COLORS.grey }}>{caption}</div>
  </div>
);
