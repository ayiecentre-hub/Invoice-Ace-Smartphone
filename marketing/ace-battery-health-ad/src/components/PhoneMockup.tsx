import React from "react";
import { COLORS } from "../theme";

/** iPhone 13 logical screen (points). Screen content is authored at this size and scaled. */
export const IOS_W = 390;
export const IOS_H = 844;

type Props = {
  width: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  /** 0–1 extra glass reflection sweep position (for the diagnostic scene). */
  sheen?: number;
  shadow?: boolean;
  /** Band finish. "silver" matches the stainless/silver Pro models seen on some posters. */
  finish?: "midnight" | "silver";
};

/**
 * Vector iPhone 13 (Midnight): flat aluminium band, wide notch (no Dynamic Island),
 * left silent switch + volume buttons, right side button. Proportions from 71.5 × 146.7 mm.
 */
export const PhoneMockup: React.FC<Props> = ({ width, children, style, sheen, shadow = true, finish = "midnight" }) => {
  const silver = finish === "silver";
  const h = width * (146.7 / 71.5);
  const bezel = width * 0.036;
  const radius = width * 0.158;
  const screenW = width - bezel * 2;
  const screenH = h - bezel * 2;
  const scale = screenW / IOS_W;
  const btn = (side: "l" | "r", top: number, len: number): React.CSSProperties => ({
    position: "absolute",
    [side === "l" ? "left" : "right"]: -width * 0.012,
    top: h * top,
    width: width * 0.014,
    height: h * len,
    borderRadius: width * 0.01,
    background: silver ? "linear-gradient(90deg,#9a9ca3,#e9eaee,#9a9ca3)" : "linear-gradient(90deg,#15161b,#3a3c44,#15161b)",
  });
  return (
    <div style={{ position: "relative", width, height: h, ...style }}>
      <div style={btn("l", 0.155, 0.04)} />
      <div style={btn("l", 0.225, 0.075)} />
      <div style={btn("l", 0.315, 0.075)} />
      <div style={btn("r", 0.245, 0.11)} />
      {/* aluminium band */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          background: silver
            ? "linear-gradient(135deg,#f2f3f5 0%,#a9abb2 36%,#e4e5e9 64%,#8d9097 100%)"
            : "linear-gradient(135deg,#3b3d45 0%,#191a1f 38%,#2c2e35 70%,#101114 100%)",
          boxShadow: shadow
            ? "0 60px 120px rgba(18,18,31,0.45), 0 18px 40px rgba(18,18,31,0.35), inset 0 0 0 1.5px rgba(255,255,255,0.08)"
            : "inset 0 0 0 1.5px rgba(255,255,255,0.08)",
        }}
      />
      {/* black glass border */}
      <div
        style={{
          position: "absolute",
          inset: width * 0.012,
          borderRadius: radius * 0.93,
          background: "#050506",
        }}
      />
      {/* screen */}
      <div
        style={{
          position: "absolute",
          left: bezel,
          top: bezel,
          width: screenW,
          height: screenH,
          borderRadius: radius * 0.8,
          overflow: "hidden",
          background: "#000",
        }}
      >
        <div
          style={{
            width: IOS_W,
            height: IOS_H,
            transform: `scale(${scale}, ${screenH / IOS_H})`,
            transformOrigin: "0 0",
            position: "relative",
          }}
        >
          {children}
        </div>
        {/* notch: iPhone 13 (narrower than 12, still a notch) */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: screenW * 0.41,
            height: screenH * 0.036,
            transform: "translateX(-50%)",
            background: "#000",
            borderBottomLeftRadius: screenW * 0.055,
            borderBottomRightRadius: screenW * 0.055,
          }}
        >
          <div
            style={{
              position: "absolute",
              right: "24%",
              top: "34%",
              width: screenW * 0.028,
              height: screenW * 0.028,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%,#2a3550,#07080c 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "18%",
              width: screenW * 0.13,
              height: screenW * 0.012,
              transform: "translateX(-50%)",
              borderRadius: 99,
              background: "#16171b",
            }}
          />
        </div>
        {/* glass reflection */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(115deg, transparent ${(sheen ?? 0.2) * 100 - 20}%, rgba(255,255,255,0.10) ${(sheen ?? 0.2) * 100}%, transparent ${(sheen ?? 0.2) * 100 + 14}%)`,
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
};

/** iOS-style status bar used inside screens. */
export const StatusBar: React.FC<{ dark?: boolean; level: number; time?: string }> = ({ dark, level, time = "10:24" }) => {
  const fg = dark ? "#fff" : "#000";
  const low = level <= 20;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 47,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 30px 0 44px",
        fontFamily: "Inter",
        fontWeight: 600,
        fontSize: 16,
        color: fg,
      }}
    >
      <span>{time}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="18" height="12" viewBox="0 0 18 12">
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={i * 4.6} y={9 - i * 2.8} width="3.2" height={3 + i * 2.8} rx="0.8" fill={fg} />
          ))}
        </svg>
        <div style={{ position: "relative", width: 25, height: 12, borderRadius: 3.5, border: `1px solid ${dark ? "rgba(255,255,255,.45)" : "rgba(0,0,0,.4)"}`, padding: 1 }}>
          <div style={{ width: `${Math.max(6, level)}%`, height: "100%", borderRadius: 2, background: low ? COLORS.lowBattery : fg }} />
          <div style={{ position: "absolute", right: -3.5, top: 3.5, width: 2, height: 4, borderRadius: 1, background: dark ? "rgba(255,255,255,.45)" : "rgba(0,0,0,.4)" }} />
        </div>
      </div>
    </div>
  );
};
