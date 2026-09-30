import React from "react";
import { COLORS, FONTS } from "../../theme";
import { Spinner } from "../screens";

const TASKS = ["Buka nota kuliah", "Hantar assignment", "Masuk kelas online"];

/** Study tasks that crawl and stall. `inP` slides each row in; `load` is each bar's progress (0–1). */
export const LoadingTasks: React.FC<{ frame: number; inP: number[]; load: number[] }> = ({ frame, inP, load }) => (
  <div style={{ width: 888, display: "flex", flexDirection: "column", gap: 18 }}>
    {TASKS.map((t, i) => (
      <div key={t} style={{ padding: "22px 26px", borderRadius: 22, background: "rgba(247,247,248,0.08)", opacity: inP[i], transform: `translateX(${(1 - inP[i]) * 60}px)` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 38, letterSpacing: "-0.02em", color: COLORS.pearl }}>{t}</span>
          <Spinner frame={frame + i * 4} size={40} color={COLORS.pearl} />
        </div>
        <div style={{ marginTop: 14, height: 10, borderRadius: 5, background: COLORS.hairlineOnNavy }}>
          <div style={{ width: `${load[i] * 100}%`, height: "100%", borderRadius: 5, background: COLORS.blue }} />
        </div>
      </div>
    ))}
  </div>
);
