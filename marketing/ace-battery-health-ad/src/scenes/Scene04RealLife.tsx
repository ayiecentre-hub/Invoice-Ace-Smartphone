import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { KineticHeadline } from "../components/KineticHeadline";
import { MediaSlot } from "../components/MediaSlot";
import { handheld, motionBlur, prog, tween } from "../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../theme";

/** Montage cut points (local frames). A cut every ~0.7s keeps momentum without chaos. */
const CUTS = { face: 0, terminal: 22, battery: 42, cable: 60, whip: 80 } as const;

const Face: React.FC<{ f: number }> = ({ f }) => {
  const h = handheld(f + 90, 0.9);
  return (
    <AbsoluteFill
      style={{
        transform: `translate(${h.x}px,${h.y}px) scale(${1.32 + f * 0.004})`,
        filter: `blur(${tween(f, 0, 9, 10, 0, EASE.out)}px)`,
      }}
    >
      <MediaSlot still="assets/customer-payment.jpg" video="assets/customer-payment.mp4" videoStartFrom={90} label="Customer reaction" objectPosition="22% 30%" />
    </AbsoluteFill>
  );
};

const Terminal: React.FC<{ f: number }> = ({ f }) => (
  <AbsoluteFill style={{ background: COLORS.navy }}>
    <div
      style={{
        position: "absolute",
        left: CONTENT.left,
        top: 640,
        width: CONTENT.width,
        height: 520,
        borderRadius: 36,
        overflow: "hidden",
        transform: `scale(${1.04 - f * 0.0015})`,
        boxShadow: "0 40px 90px rgba(0,0,0,0.45)",
      }}
    >
      <Img
        src={staticFile("assets/payment-terminal.jpg")}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "40% 60%", transform: `translateX(${-f * 1.4}px) scale(1.08)` }}
      />
      <div
        style={{
          position: "absolute",
          left: 28,
          top: 28,
          padding: "12px 20px",
          borderRadius: 14,
          background: COLORS.pearl,
          fontFamily: FONTS.body,
          fontWeight: 700,
          fontSize: 28,
          color: COLORS.navy,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ width: 12, height: 12, borderRadius: 6, background: COLORS.blue, opacity: 0.4 + 0.6 * Math.abs(Math.sin(f * 0.35)) }} />
        Menunggu bayaran…
      </div>
    </div>
  </AbsoluteFill>
);

const BatteryMacro: React.FC<{ f: number }> = ({ f }) => {
  const zoom = tween(f, 0, 18, 1.25, 1, EASE.out);
  const blink = 0.55 + 0.45 * Math.abs(Math.cos(f * 0.22));
  return (
    <AbsoluteFill style={{ background: "radial-gradient(80% 60% at 50% 55%, #20223a 0%, #0d0e18 100%)" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 740, display: "flex", justifyContent: "center", transform: `scale(${zoom})` }}>
        <div style={{ position: "relative", width: 560, height: 260, borderRadius: 64, border: "14px solid rgba(247,247,248,0.55)", padding: 20 }}>
          <div style={{ width: "6%", height: "100%", borderRadius: 26, background: COLORS.lowBattery, opacity: blink }} />
          <div style={{ position: "absolute", right: -46, top: 78, width: 22, height: 76, borderRadius: "0 14px 14px 0", background: "rgba(247,247,248,0.55)" }} />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1052,
          textAlign: "center",
          fontFamily: FONTS.heading,
          fontWeight: 600,
          fontSize: 64,
          color: COLORS.pearl,
          opacity: 0.85,
          letterSpacing: "-0.02em",
        }}
      >
        3%
      </div>
    </AbsoluteFill>
  );
};

/** iPhone 13 bottom edge (Lightning port) + cable plugging in. */
const Cable: React.FC<{ f: number }> = ({ f }) => {
  const plug = (x: number) => tween(x, 0, 7, 420, 0, EASE.out);
  const phoneY = tween(f, 0, 14, 40, 0, EASE.out);
  return (
    <AbsoluteFill style={{ background: "radial-gradient(90% 60% at 50% 40%, #EDEDF1 0%, #D9D9E0 100%)" }}>
      {/* phone bottom */}
      <div
        style={{
          position: "absolute",
          left: 90,
          width: 900,
          top: 560 + phoneY,
          height: 420,
          borderRadius: "0 0 150px 150px",
          background: "linear-gradient(180deg,#26272d,#15161a 60%,#2b2d34)",
          boxShadow: "0 50px 90px rgba(26,26,46,0.35)",
        }}
      >
        <div style={{ position: "absolute", left: 18, right: 18, top: 0, bottom: 18, borderRadius: "0 0 134px 134px", background: "#050506" }} />
        {/* speaker + mic holes */}
        {[-1, 1].map((side) => (
          <div key={side} style={{ position: "absolute", top: 404, left: 450 + side * 170 - 70, display: "flex", gap: 12 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ width: 12, height: 12, borderRadius: 6, background: "#0a0a0c" }} />
            ))}
          </div>
        ))}
      </div>
      {/* Lightning port on the bottom edge */}
      <div style={{ position: "absolute", left: 540 - 52, top: 976 + phoneY, width: 104, height: 22, borderRadius: 11, background: "#0a0a0c" }} />
      {/* cable */}
      <div style={{ position: "absolute", left: 540 - 44, top: 996 + phoneY + plug(f), width: 88 }}>
        <div style={{ width: 40, height: 26, margin: "0 auto", borderRadius: 4, background: "linear-gradient(90deg,#c9c9ce,#f4f4f6,#c9c9ce)" }} />
        <div style={{ width: 88, height: 150, borderRadius: 18, background: "linear-gradient(90deg,#e8e8ec,#ffffff,#e0e0e6)", boxShadow: "0 12px 30px rgba(0,0,0,0.18)" }} />
        <div style={{ width: 34, height: 600, margin: "0 auto", background: "linear-gradient(90deg,#e4e4e8,#fafafa,#dcdce2)" }} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 540 - 60,
          top: 940 + phoneY,
          width: 120,
          height: 120,
          borderRadius: 60,
          border: `4px solid ${COLORS.blue}`,
          opacity: f > 6 ? 1 - prog(f, 6, 14) : 0,
          transform: `scale(${0.5 + prog(f, 6, 14)})`,
        }}
      />
    </AbsoluteFill>
  );
};

/** 0:09–0:12 — Back to real life. Calm montage; the headline stays anchored while shots change. */
export const Scene04RealLife: React.FC = () => {
  const frame = useCurrentFrame();
  const shot =
    frame < CUTS.terminal ? "face" : frame < CUTS.battery ? "terminal" : frame < CUTS.cable ? "battery" : "cable";
  const local = frame - CUTS[shot];
  const whip = (f: number) => tween(f, CUTS.whip, 10, 0, -1080, EASE.in);
  const scrimDark = shot === "cable" ? 0.0 : 1;
  return (
    <AbsoluteFill style={{ background: COLORS.navy }}>
      <AbsoluteFill style={{ transform: `translateX(${whip(frame)}px)`, filter: `blur(${motionBlur(whip, frame, 0.05)}px)` }}>
        {shot === "face" && <Face f={local} />}
        {shot === "terminal" && <Terminal f={local} />}
        {shot === "battery" && <BatteryMacro f={local} />}
        {shot === "cable" && <Cable f={local} />}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(18,18,31,${0.86 * scrimDark}) 0%, rgba(18,18,31,${0.5 * scrimDark}) 26%, rgba(18,18,31,0) 44%)`,
        }}
      />
      <KineticHeadline
        start={3}
        gap={6}
        size={100}
        color={shot === "cable" ? COLORS.navy : COLORS.pearl}
        lines={[{ text: "BILA BATTERY" }, { text: "DAH TAK SIHAT…" }]}
        style={{ position: "absolute", left: CONTENT.left, top: 186, width: CONTENT.width }}
      />
      <div style={{ position: "absolute", left: CONTENT.left, top: 420, width: CONTENT.width }}>
        <AnimatedText
          text="urusan harian boleh mula terganggu."
          start={22}
          stagger={2}
          fontSize={46}
          weight={500}
          letterSpacing="-0.01em"
          color={shot === "cable" ? COLORS.grey : "rgba(247,247,248,0.86)"}
          style={{ fontFamily: FONTS.body }}
        />
      </div>
    </AbsoluteFill>
  );
};
