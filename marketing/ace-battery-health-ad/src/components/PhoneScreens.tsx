import React from "react";
import { COLORS } from "../theme";
import { StatusBar } from "./PhoneMockup";

/** Lock screen with the low-battery alert. `alert` 0–1 drives the alert entrance. */
export const LowBatteryScreen: React.FC<{ alert: number; level?: number }> = ({ alert, level = 5 }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "radial-gradient(120% 80% at 30% 20%, #2a2f4f 0%, #15172a 55%, #0b0c16 100%)",
      fontFamily: "Inter",
      color: "#fff",
    }}
  >
    <StatusBar dark level={level} />
    <div style={{ position: "absolute", top: 108, width: "100%", textAlign: "center", fontSize: 19, fontWeight: 500, opacity: 0.9 }}>
      Tuesday, 29 September
    </div>
    <div style={{ position: "absolute", top: 128, width: "100%", textAlign: "center", fontSize: 92, fontWeight: 600, letterSpacing: "-0.03em" }}>
      10:24
    </div>
    {/* Low Battery alert (iOS style, English system language) */}
    <div
      style={{
        position: "absolute",
        left: 58,
        right: 58,
        top: 330,
        borderRadius: 16,
        background: "rgba(38,38,44,0.94)",
        overflow: "hidden",
        textAlign: "center",
        transform: `scale(${1.12 - 0.12 * alert})`,
        opacity: alert,
      }}
    >
      <div style={{ padding: "20px 18px 16px" }}>
        <div style={{ fontSize: 17, fontWeight: 600 }}>Low Battery</div>
        <div style={{ fontSize: 13.5, marginTop: 4, opacity: 0.85 }}>5% of battery remaining</div>
      </div>
      <div style={{ display: "flex", borderTop: "1px solid rgba(255,255,255,0.14)", fontSize: 17, color: "#4d9bff" }}>
        <div style={{ flex: 1, padding: "11px 0", borderRight: "1px solid rgba(255,255,255,0.14)" }}>Close</div>
        <div style={{ flex: 1, padding: "11px 0", fontWeight: 600 }}>Low Power Mode</div>
      </div>
    </div>
    <div style={{ position: "absolute", bottom: 10, left: "50%", width: 134, height: 5, borderRadius: 3, background: "#fff", transform: "translateX(-50%)", opacity: 0.9 }} />
  </div>
);

type HealthProps = {
  /** 0–1 focus highlight on the Maximum Capacity row. */
  focus?: number;
  /** 0–1 position of the diagnostic scan line, or undefined. */
  scan?: number;
};

/** Settings → Battery → Battery Health & Charging. Maximum Capacity is always 76%. */
export const BatteryHealthScreen: React.FC<HealthProps> = ({ focus = 0, scan }) => (
  <div style={{ position: "absolute", inset: 0, background: "#F2F2F7", fontFamily: "Inter", color: "#000" }}>
    <StatusBar level={62} />
    <div style={{ position: "absolute", top: 54, left: 12, fontSize: 17, color: "#007AFF", display: "flex", alignItems: "center", gap: 4 }}>
      <svg width="12" height="20" viewBox="0 0 12 20">
        <path d="M10 2 L2 10 L10 18" stroke="#007AFF" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Battery
    </div>
    <div style={{ position: "absolute", top: 92, left: 16, right: 16, fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
      Battery Health &amp; Charging
    </div>
    <div style={{ position: "absolute", top: 172, left: 32, right: 28, fontSize: 12.5, color: "#6b6b70", lineHeight: 1.35 }}>
      iPhone batteries, like all rechargeable batteries, are consumable components that become less effective as they age.
    </div>
    {/* Maximum Capacity group */}
    <div style={{ position: "absolute", top: 246, left: 16, right: 16, borderRadius: 11, background: "#fff", overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "13px 16px",
          fontSize: 17,
          background: `rgba(43,94,167,${0.1 * focus})`,
        }}
      >
        <span>Maximum Capacity</span>
        <span style={{ fontWeight: focus > 0.5 ? 700 : 400, color: focus > 0.5 ? COLORS.blue : "#000" }}>76%</span>
      </div>
    </div>
    <div style={{ position: "absolute", top: 300, left: 32, right: 28, fontSize: 12.5, color: "#6b6b70", lineHeight: 1.35 }}>
      This is a measure of battery capacity relative to when it was new. Lower capacity may result in fewer hours of usage
      between charges.
    </div>
    <div style={{ position: "absolute", top: 376, left: 16, right: 16, borderRadius: 11, background: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 16px", fontSize: 17 }}>
        <span>Optimised Battery Charging</span>
        <div style={{ width: 51, height: 31, borderRadius: 16, background: COLORS.iosGreen, position: "relative" }}>
          <div style={{ position: "absolute", right: 2, top: 2, width: 27, height: 27, borderRadius: "50%", background: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,.2)" }} />
        </div>
      </div>
    </div>
    <div style={{ position: "absolute", top: 434, left: 32, right: 28, fontSize: 12.5, color: "#6b6b70", lineHeight: 1.35 }}>
      To reduce battery ageing, iPhone learns from your daily charging routine.
    </div>
    {scan !== undefined && scan > 0 && scan < 1 ? (
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: `${scan * 100}%`,
          height: 90,
          transform: "translateY(-100%)",
          background: "linear-gradient(180deg, rgba(43,94,167,0) 0%, rgba(43,94,167,0.16) 85%, rgba(43,94,167,0.9) 100%)",
        }}
      />
    ) : null}
    <div style={{ position: "absolute", bottom: 8, left: "50%", width: 134, height: 5, borderRadius: 3, background: "#000", transform: "translateX(-50%)" }} />
  </div>
);
