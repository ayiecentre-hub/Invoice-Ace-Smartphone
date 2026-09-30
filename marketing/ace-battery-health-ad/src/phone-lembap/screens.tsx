import React from "react";
import { StatusBar } from "../components/PhoneMockup";

/** iOS-style activity spinner: 12 spokes, stepping one spoke every 3 frames. */
export const Spinner: React.FC<{ frame: number; size?: number; color?: string }> = ({ frame, size = 64, color = "#fff" }) => {
  const step = Math.floor(frame / 3) % 12;
  return (
    <svg width={size} height={size} viewBox="-32 -32 64 64">
      {Array.from({ length: 12 }).map((_, i) => {
        const age = (step - i + 12) % 12;
        return <rect key={i} x={-3} y={-28} width={6} height={15} rx={3} fill={color} opacity={1 - age * 0.07} transform={`rotate(${i * 30})`} />;
      })}
    </svg>
  );
};

/**
 * The poster's screen: an app that just keeps loading. `tap` (0–1) shows the touch ripple on the icon,
 * `open` (0–1) zooms the app open, after which only the spinner remains.
 */
export const LoadingScreen: React.FC<{ frame: number; tap: number; open: number }> = ({ frame, tap, open }) => (
  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(90% 60% at 50% 40%, #1b1c26 0%, #07070a 100%)", fontFamily: "Inter", color: "#fff", overflow: "hidden" }}>
    <StatusBar dark level={54} time="21:40" />
    {/* home-screen icon row, fades as the app opens */}
    <div style={{ position: "absolute", left: 28, right: 28, top: 120, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", rowGap: 30, opacity: 1 - open }}>
      {["#2B5EA7", "#C8860A", "#5C5C5C", "#34C759", "#8C8C96", "#26263F", "#DCE6F4", "#C9463D"].map((c, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ width: 62, height: 62, borderRadius: 15, background: c, transform: i === 0 ? `scale(${1 - 0.12 * Math.sin(Math.PI * tap)})` : undefined, boxShadow: i === 0 && tap > 0 && tap < 1 ? "0 0 0 6px rgba(255,255,255,0.25)" : undefined }} />
          <div style={{ width: 44, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.35)" }} />
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, background: "#0d0e14", opacity: open, transform: `scale(${0.3 + 0.7 * open})`, transformOrigin: "20% 18%", borderRadius: 40 * (1 - open) }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", justifyContent: "center" }}>
        <Spinner frame={frame} size={72} color="rgba(255,255,255,0.85)" />
      </div>
    </div>
  </div>
);
