import React from "react";
import { COLORS } from "../theme";
import { StatusBar } from "../components/PhoneMockup";

/** Deterministic QR-like pattern (decorative; encodes nothing). */
const QR: React.FC<{ size: number }> = ({ size }) => {
  const n = 21;
  const cells: React.ReactNode[] = [];
  const finder = (x: number, y: number) => x >= 0 && x < 7 && y >= 0 && y < 7;
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const inF = finder(x, y) || finder(x - 14, y) || finder(x, y - 14);
      let on: boolean;
      if (inF) {
        const lx = x >= 14 ? x - 14 : x;
        const ly = y >= 14 ? y - 14 : y;
        on = lx === 0 || lx === 6 || ly === 0 || ly === 6 || (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4);
      } else on = ((x * 7 + y * 13 + x * y) % 5) < 2;
      if (on) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} />);
    }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${n} ${n}`} shapeRendering="crispEdges">
      <rect width={n} height={n} fill="#fff" />
      <g fill="#111">{cells}</g>
    </svg>
  );
};

/**
 * Generic "scan to pay" camera screen (no wallet branding). `lock` 0–1 = QR frame locks on;
 * `off` 0–1 = sudden shutdown to black.
 */
export const PayScanScreen: React.FC<{ lock: number; off: number; level: number }> = ({ lock, off, level }) => (
  <div style={{ position: "absolute", inset: 0, background: "#1b1c22", fontFamily: "Inter", color: "#fff", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(80% 50% at 50% 45%, #3a3b44 0%, #16171c 100%)" }} />
    <div style={{ position: "absolute", left: 95, top: 260, transform: `rotate(${-6 + 6 * lock}deg) scale(${0.92 + 0.08 * lock})` }}>
      <QR size={200} />
    </div>
    <div style={{ position: "absolute", left: 80, top: 245, width: 230, height: 230 }}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 44,
            height: 44,
            [i % 2 ? "right" : "left"]: -8 + 8 * lock,
            [i < 2 ? "top" : "bottom"]: -8 + 8 * lock,
            borderColor: lock > 0.9 ? "#34C759" : "#fff",
            borderStyle: "solid",
            borderWidth: `${i < 2 ? 5 : 0}px ${i % 2 ? 5 : 0}px ${i < 2 ? 0 : 5}px ${i % 2 ? 0 : 5}px`,
            borderRadius: 8,
          }}
        />
      ))}
    </div>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 150, background: "linear-gradient(180deg, rgba(0,0,0,0.7), transparent)" }} />
    <StatusBar dark level={level} time="12:41" />
    <div style={{ position: "absolute", top: 70, width: "100%", textAlign: "center", fontSize: 20, fontWeight: 700 }}>Imbas untuk bayar</div>
    <div style={{ position: "absolute", left: 20, right: 20, bottom: 40, borderRadius: 20, background: "rgba(255,255,255,0.96)", color: "#111", padding: "16px 18px" }}>
      <div style={{ fontSize: 14, color: "#666" }}>Kafe · Kepala Batas</div>
      <div style={{ fontSize: 34, fontWeight: 700, marginTop: 2 }}>RM 18.50</div>
      <div style={{ marginTop: 10, height: 44, borderRadius: 12, background: COLORS.blue, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 17 }}>
        {lock > 0.9 ? "Mengesahkan…" : "Mencari kod…"}
      </div>
    </div>
    <div style={{ position: "absolute", inset: 0, background: "#000", opacity: off }} />
  </div>
);
