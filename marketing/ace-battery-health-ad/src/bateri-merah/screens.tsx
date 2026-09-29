import React from "react";
import { COLORS } from "../theme";
import { StatusBar } from "../components/PhoneMockup";

/** Large battery read-out (as on the poster): red sliver + "9%". */
export const BigBatteryScreen: React.FC<{ level: number; pulse: number }> = ({ level, pulse }) => (
  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(90% 60% at 50% 40%, #16171f 0%, #050507 100%)", fontFamily: "Inter", color: "#fff" }}>
    <StatusBar dark level={level} time="08:42" />
    <div style={{ position: "absolute", left: 95, top: 330, width: 190, height: 88, borderRadius: 20, border: "5px solid rgba(255,255,255,0.85)", padding: 7 }}>
      <div style={{ width: `${Math.max(8, level)}%`, height: "100%", borderRadius: 10, background: COLORS.lowBattery, opacity: 0.6 + 0.4 * pulse }} />
    </div>
    <div style={{ position: "absolute", left: 290, top: 360, width: 10, height: 28, borderRadius: "0 5px 5px 0", background: "rgba(255,255,255,0.85)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 440, textAlign: "center", fontSize: 44, fontWeight: 600, letterSpacing: "-0.02em" }}>{level}%</div>
  </div>
);

/** Generic turn-by-turn navigation (no third-party branding). `p` drives the route. */
export const NavigationScreen: React.FC<{ p: number; level: number }> = ({ p, level }) => {
  const route = "M 70 780 L 70 600 Q 70 560 110 560 L 250 560 Q 290 560 290 520 L 290 330 Q 290 290 250 290 L 170 290 L 170 170";
  const len = 1260;
  return (
    <div style={{ position: "absolute", inset: 0, background: "#EDEEF1", fontFamily: "Inter" }}>
      <svg width="390" height="844" style={{ position: "absolute", inset: 0 }}>
        {[120, 230, 360, 470, 640, 740].map((y) => (
          <rect key={y} x={0} y={y} width={390} height={14} fill="#fff" />
        ))}
        {[40, 140, 250, 330].map((x) => (
          <rect key={x} x={x} y={0} width={14} height={844} fill="#fff" />
        ))}
        <rect x={180} y={380} width={120} height={70} rx={8} fill="#DDE8D9" />
        <rect x={20} y={660} width={100} height={60} rx={8} fill="#DDE8D9" />
        <path d={route} fill="none" stroke="#BFD0EA" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
        <path d={route} fill="none" stroke={COLORS.blue} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${len} ${len}`} strokeDashoffset={len * p} />
        <circle cx={70} cy={780 - 180 * Math.min(1, p * 3)} r={13} fill="#fff" stroke={COLORS.blue} strokeWidth={6} />
      </svg>
      <div style={{ position: "absolute", left: 12, right: 12, top: 52, borderRadius: 18, background: COLORS.navy, color: "#fff", padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
        <svg width="34" height="34" viewBox="0 0 34 34"><path d="M24 30 V14 H10 M16 8 L10 14 L16 20" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>300 m</div>
          <div style={{ fontSize: 15, opacity: 0.8 }}>Belok kiri</div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 96, background: "#fff", borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: "16px 22px", boxShadow: "0 -4px 16px rgba(0,0,0,0.08)" }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#1a7f37" }}>18 min</div>
        <div style={{ fontSize: 14, color: "#666" }}>9.6 km · tiba 09:00</div>
      </div>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 47, background: "#EDEEF1" }} />
      <StatusBar level={level} time="08:42" />
    </div>
  );
};

/** Incoming call. */
export const CallScreen: React.FC<{ ring: number; level: number }> = ({ ring, level }) => (
  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#3a4262 0%,#1b1f33 100%)", fontFamily: "Inter", color: "#fff" }}>
    <StatusBar dark level={level} time="08:43" />
    <div style={{ position: "absolute", top: 120, width: "100%", textAlign: "center", fontSize: 16, opacity: 0.75 }}>mobile</div>
    <div style={{ position: "absolute", top: 142, width: "100%", textAlign: "center", fontSize: 40, fontWeight: 500 }}>Ibu</div>
    <div style={{ position: "absolute", left: "50%", top: 250, width: 110, height: 110, marginLeft: -55, borderRadius: 55, background: "#8a93b3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, fontWeight: 600 }}>I</div>
    <div style={{ position: "absolute", left: "50%", top: 250, width: 110, height: 110, marginLeft: -55, borderRadius: 55, border: "3px solid rgba(255,255,255,0.5)", transform: `scale(${1 + ring * 0.5})`, opacity: 1 - ring }} />
    {[
      { x: 78, c: "#EB4E3D", label: "Decline" },
      { x: 312, c: "#34C759", label: "Accept" },
    ].map((b) => (
      <div key={b.label} style={{ position: "absolute", left: b.x - 38, top: 660, width: 76, textAlign: "center" }}>
        <div style={{ width: 76, height: 76, borderRadius: 38, background: b.c }} />
        <div style={{ marginTop: 8, fontSize: 14 }}>{b.label}</div>
      </div>
    ))}
  </div>
);

/** Settings → Battery with usage by app. Illustrative values ("contoh paparan"). */
export const BatteryUsageScreen: React.FC<{ scan?: number; hiHealth: number; hiApps: number }> = ({ scan, hiHealth, hiApps }) => {
  const apps: [string, string, string][] = [
    ["Maps", "38%", "#34C759"],
    ["Camera", "17%", "#8E8E93"],
    ["Messages", "12%", "#30B94D"],
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: "#F2F2F7", fontFamily: "Inter", color: "#000" }}>
      <StatusBar level={40} time="10:12" />
      <div style={{ position: "absolute", top: 54, left: 12, fontSize: 17, color: "#007AFF" }}>‹ Settings</div>
      <div style={{ position: "absolute", top: 90, left: 16, fontSize: 32, fontWeight: 700 }}>Battery</div>
      <div style={{ position: "absolute", top: 146, left: 16, right: 16, borderRadius: 11, background: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", fontSize: 17, borderBottom: "1px solid #e5e5ea" }}>
          <span>Battery Percentage</span>
          <div style={{ width: 51, height: 31, borderRadius: 16, background: COLORS.iosGreen }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "13px 16px", fontSize: 17, background: `rgba(43,94,167,${0.12 * hiHealth})` }}>
          <span>Battery Health &amp; Charging</span>
          <span style={{ color: "#c7c7cc" }}>›</span>
        </div>
      </div>
      <div style={{ position: "absolute", top: 276, left: 32, fontSize: 13, color: "#6b6b70" }}>LAST 24 HOURS</div>
      <div style={{ position: "absolute", top: 298, left: 16, right: 16, height: 120, borderRadius: 11, background: "#fff", display: "flex", alignItems: "flex-end", gap: 5, padding: "14px 14px 12px" }}>
        {[92, 80, 64, 50, 38, 100, 90, 70, 48, 30, 18, 9].map((v, i) => (
          <div key={i} style={{ flex: 1, height: `${v}%`, borderRadius: 3, background: v < 20 ? COLORS.lowBattery : COLORS.iosGreen }} />
        ))}
      </div>
      <div style={{ position: "absolute", top: 438, left: 32, fontSize: 13, color: "#6b6b70" }}>BATTERY USAGE BY APP</div>
      <div style={{ position: "absolute", top: 460, left: 16, right: 16, borderRadius: 11, background: "#fff", overflow: "hidden" }}>
        {apps.map(([n, v, c], i) => (
          <div key={n} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", fontSize: 17, borderTop: i ? "1px solid #e5e5ea" : undefined, background: `rgba(43,94,167,${0.12 * hiApps})` }}>
            <div style={{ width: 30, height: 30, borderRadius: 7, background: c }} />
            <span style={{ flex: 1 }}>{n}</span>
            <span style={{ color: "#6b6b70" }}>{v}</span>
          </div>
        ))}
      </div>
      {scan !== undefined && scan > 0 && scan < 1 ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: `${scan * 100}%`, height: 90, transform: "translateY(-100%)", background: "linear-gradient(180deg, rgba(43,94,167,0) 0%, rgba(43,94,167,0.16) 85%, rgba(43,94,167,0.9) 100%)" }} />
      ) : null}
    </div>
  );
};
