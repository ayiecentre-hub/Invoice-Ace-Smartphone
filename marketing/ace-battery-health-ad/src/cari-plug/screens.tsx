import React from "react";
import { COLORS } from "../theme";
import { StatusBar } from "../components/PhoneMockup";

/** Lock screen while charging: big percentage + bolt. `level` animates. */
export const ChargingScreen: React.FC<{ level: number; bolt: number }> = ({ level, bolt }) => (
  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(100% 70% at 40% 20%, #2b3252 0%, #121525 60%, #07080e 100%)", fontFamily: "Inter", color: "#fff" }}>
    <StatusBar dark level={level} time="11:37" />
    <div style={{ position: "absolute", top: 108, width: "100%", textAlign: "center", fontSize: 19, fontWeight: 500, opacity: 0.85 }}>Monday, 5 October</div>
    <div style={{ position: "absolute", top: 128, width: "100%", textAlign: "center", fontSize: 92, fontWeight: 600, letterSpacing: "-0.03em" }}>11:37</div>
    <div style={{ position: "absolute", left: 95, top: 400, width: 200, textAlign: "center" }}>
      <svg width="64" height="96" viewBox="0 0 64 96" style={{ opacity: bolt, transform: `scale(${0.6 + 0.4 * bolt})` }}>
        <path d="M38 4 L8 54 H30 L24 92 L56 38 H34 Z" fill={COLORS.iosGreen} />
      </svg>
      <div style={{ fontSize: 30, fontWeight: 600, marginTop: 8 }}>{Math.round(level)}%</div>
      <div style={{ fontSize: 14, opacity: 0.7, marginTop: 2 }}>Charging</div>
    </div>
    <div style={{ position: "absolute", bottom: 10, left: "50%", width: 134, height: 5, borderRadius: 3, background: "#fff", transform: "translateX(-50%)", opacity: 0.9 }} />
  </div>
);

/** Study group chat with arriving messages (`n` visible). Illustrative. */
export const GroupChatScreen: React.FC<{ n: number; level: number }> = ({ n, level }) => {
  const msgs: [string, string, boolean][] = [
    ["Aina", "Slide tutorial dah upload", false],
    ["Wei Ling", "Jumpa kat library 3pm?", false],
    ["You", "On! Tapi phone aku nak habis", true],
    ["Hafiz", "Nota lecture 4 ada sesiapa?", false],
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: "#EFEAE2", fontFamily: "Inter" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 110, background: "#F7F7F8", borderBottom: "1px solid #ddd" }} />
      <StatusBar level={level} time="14:52" />
      <div style={{ position: "absolute", top: 58, left: 16, right: 16, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 18, background: COLORS.blue, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15 }}>GS</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Group Study BM2</div>
          <div style={{ fontSize: 12, color: "#777" }}>Aina, Hafiz, Wei Ling, You</div>
        </div>
      </div>
      <div style={{ position: "absolute", top: 130, left: 12, right: 12, display: "flex", flexDirection: "column", gap: 10 }}>
        {msgs.map(([who, t, me], i) => (
          <div
            key={i}
            style={{
              alignSelf: me ? "flex-end" : "flex-start",
              maxWidth: "78%",
              background: me ? "#D9FDD3" : "#fff",
              borderRadius: 12,
              padding: "8px 12px",
              fontSize: 15,
              boxShadow: "0 1px 1px rgba(0,0,0,0.08)",
              opacity: Math.max(0, Math.min(1, n - i)),
              transform: `translateY(${(1 - Math.max(0, Math.min(1, n - i))) * 12}px)`,
            }}
          >
            {!me ? <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.blue }}>{who}</div> : null}
            {t}
          </div>
        ))}
      </div>
    </div>
  );
};
