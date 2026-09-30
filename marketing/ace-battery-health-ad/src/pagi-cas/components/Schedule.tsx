import React from "react";
import { COLORS, FONTS } from "../../theme";

const ITEMS = [
  { t: "2:00 PM", title: "Meeting online" },
  { t: "3:30 PM", title: "Hantar kerja" },
  { t: "5:30 PM", title: "Balik rumah · GPS" },
];

/** Afternoon agenda (calendar-style). Each item gets a "perlu cas" tag once the phone is at 1%. */
export const Schedule: React.FC<{ inP: number[]; flag: number[] }> = ({ inP, flag }) => (
  <div style={{ width: 888, display: "flex", flexDirection: "column", gap: 16 }}>
    {ITEMS.map((it, i) => (
      <div key={it.t} style={{ display: "flex", alignItems: "stretch", gap: 20, opacity: inP[i], transform: `translateX(${(1 - inP[i]) * 60}px)` }}>
        <div style={{ width: 150, paddingTop: 22, fontFamily: FONTS.heading, fontWeight: 700, fontSize: 30, color: COLORS.greyLight, fontVariantNumeric: "tabular-nums" }}>{it.t}</div>
        <div style={{ flex: 1, position: "relative", padding: "22px 26px", borderRadius: 22, background: "rgba(247,247,248,0.08)", borderLeft: `6px solid ${flag[i] > 0.5 ? COLORS.alertText : COLORS.blue}` }}>
          <div style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 40, letterSpacing: "-0.02em", color: COLORS.pearl }}>{it.title}</div>
          <div style={{ position: "absolute", right: 20, top: "50%", marginTop: -22, height: 44, padding: "0 16px", borderRadius: 22, background: COLORS.alertText, color: "#fff", display: "flex", alignItems: "center", fontFamily: FONTS.body, fontWeight: 700, fontSize: 24, transform: `scale(${flag[i]})`, transformOrigin: "100% 50%" }}>perlu cas</div>
        </div>
      </div>
    ))}
  </div>
);
