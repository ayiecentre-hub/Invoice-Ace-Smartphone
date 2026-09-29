import React from "react";
import { Img, staticFile } from "remotion";
import { StatusBar } from "../components/PhoneMockup";

const COMMENTS = ["nak 2 helai warna pink", "kak berapa harga?", "ada warna nude?", "checkout dah!", "nak 3 helai kak"];

/**
 * Live-selling screen (generic, no platform branding). `t` = frames since the live started.
 * `alert` 0–1 shows the low-battery alert; `ended` 0–1 cuts to "Live telah tamat".
 */
export const LiveScreen: React.FC<{ t: number; viewers: number; level: number; alert: number; ended: number }> = ({ t, viewers, level, alert, ended }) => (
  <div style={{ position: "absolute", inset: 0, background: "#000", fontFamily: "Inter", color: "#fff", overflow: "hidden" }}>
    <Img src={staticFile("assets/tengah-live/face.jpg")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "45% 40%" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 22%, transparent 55%, rgba(0,0,0,0.6) 100%)" }} />
    <StatusBar dark level={level} time="21:08" />
    <div style={{ position: "absolute", top: 56, left: 14, display: "flex", gap: 8 }}>
      <div style={{ background: "#E5484D", borderRadius: 6, padding: "3px 10px", fontWeight: 800, fontSize: 14 }}>LIVE</div>
      <div style={{ background: "rgba(0,0,0,0.5)", borderRadius: 6, padding: "3px 10px", fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 5 }}>
        <svg width="16" height="12" viewBox="0 0 16 12"><path d="M1 6 C4 1 12 1 15 6 C12 11 4 11 1 6 Z" fill="none" stroke="#fff" strokeWidth="1.6" /><circle cx="8" cy="6" r="2.2" fill="#fff" /></svg>
        {viewers.toLocaleString("en")}
      </div>
    </div>
    <div style={{ position: "absolute", left: 12, right: 90, bottom: 90, height: 220, overflow: "hidden" }}>
      {COMMENTS.map((c, i) => {
        const k = t - 8 - i * 14;
        const y = 200 - Math.max(0, k) * 3.2;
        return (
          <div key={c} style={{ position: "absolute", left: 0, top: y, background: "rgba(0,0,0,0.42)", borderRadius: 14, padding: "6px 12px", fontSize: 14, fontWeight: 600, opacity: k < 0 ? 0 : Math.min(1, k / 4) * Math.max(0, Math.min(1, y / 40)) }}>
            {c}
          </div>
        );
      })}
    </div>
    <div style={{ position: "absolute", left: 58, right: 58, top: 330, borderRadius: 16, background: "rgba(38,38,44,0.94)", textAlign: "center", overflow: "hidden", opacity: alert, transform: `scale(${1.1 - 0.1 * alert})` }}>
      <div style={{ padding: "18px 16px 14px" }}>
        <div style={{ fontSize: 17, fontWeight: 600 }}>Low Battery</div>
        <div style={{ fontSize: 13.5, marginTop: 4, opacity: 0.85 }}>{level}% of battery remaining</div>
      </div>
      <div style={{ display: "flex", borderTop: "1px solid rgba(255,255,255,0.14)", fontSize: 17, color: "#4d9bff" }}>
        <div style={{ flex: 1, padding: "10px 0", borderRight: "1px solid rgba(255,255,255,0.14)" }}>Close</div>
        <div style={{ flex: 1, padding: "10px 0", fontWeight: 600 }}>Low Power Mode</div>
      </div>
    </div>
    <div style={{ position: "absolute", inset: 0, background: "#050507", opacity: ended, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
      <div style={{ fontSize: 22, fontWeight: 700 }}>Live telah tamat</div>
      <div style={{ fontSize: 14, color: "#9a9aa3" }}>Sambungan terputus</div>
    </div>
  </div>
);
