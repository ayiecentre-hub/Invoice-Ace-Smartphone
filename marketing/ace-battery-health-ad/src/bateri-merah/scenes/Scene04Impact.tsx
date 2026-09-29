import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { MediaSlot } from "../../components/MediaSlot";
import { PhoneMockup } from "../../components/PhoneMockup";
import { motionBlur, prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { CallScreen, NavigationScreen } from "../screens";

const WIN = { top: 470, h: 930 };
const BEATS = { car: 0, nav: 26, call: 56 } as const;

const Chip: React.FC<{ label: string; on: number }> = ({ label, on }) => (
  <div
    style={{
      padding: "12px 24px",
      borderRadius: 999,
      border: `2px solid ${on > 0.5 ? COLORS.blue : COLORS.hairlineOnNavy}`,
      background: on > 0.5 ? COLORS.blue : "transparent",
      fontFamily: FONTS.heading,
      fontWeight: 700,
      fontSize: 32,
      color: COLORS.pearl,
      opacity: 0.45 + 0.55 * on,
    }}
  >
    {label}
  </div>
);

/** A beat enters by sliding a mask in from the right (a controlled editorial cut). */
const Beat: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const frame = useCurrentFrame();
  const r = prog(frame, at, 7, EASE.out);
  return <AbsoluteFill style={{ clipPath: `inset(0 0 0 ${(1 - r) * 100}%)` }}>{children}</AbsoluteFill>;
};

/** 0:09–0:12 REAL-LIFE IMPACT. Car → navigation → a call from Ibu; the chips track what the phone is doing. */
export const Scene04Impact: React.FC = () => {
  const frame = useCurrentFrame();
  const out = (f: number) => tween(f, 80, 10, 0, -1100, EASE.in);
  const navOn = frame >= BEATS.nav && frame < BEATS.call ? 1 : 0;
  const callOn = frame >= BEATS.call ? 1 : 0;
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 60%, ${COLORS.navySoft} 0%, ${COLORS.navy} 60%, ${COLORS.navyDeep} 100%)` }}>
      <div style={{ position: "absolute", left: CONTENT.left, top: 176, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 66, color: COLORS.pearl, opacity: prog(frame, 2, 10), transform: `translateY(${(1 - prog(frame, 2, 10)) * 16}px)` }}>
        Tengah jalan…
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 272, display: "flex", gap: 16, opacity: prog(frame, 8, 10) }}>
        <Chip label="GPS" on={navOn} />
        <Chip label="Call" on={callOn} />
      </div>
      <div
        style={{
          position: "absolute",
          left: CONTENT.left,
          top: WIN.top,
          width: CONTENT.width,
          height: WIN.h,
          borderRadius: 40,
          overflow: "hidden",
          background: COLORS.navyDeep,
          boxShadow: "0 40px 90px rgba(0,0,0,0.45)",
          transform: `translateX(${out(frame)}px)`,
          filter: `blur(${motionBlur(out, frame, 0.04)}px)`,
          clipPath: `inset(0 0 ${(1 - prog(frame, 0, 10)) * 100}% 0 round 40px)`,
        }}
      >
        {/* A: the car (replace with device-closeup / b-roll) */}
        <AbsoluteFill style={{ transform: `scale(${1.1 + frame * 0.004}) translateX(${-frame * 0.8}px)` }}>
          <MediaSlot still="assets/bateri-merah/car.jpg" video="assets/bateri-merah/car-broll.mp4" label="Car / leaving home" objectPosition="60% 40%" />
        </AbsoluteFill>
        <div style={{ position: "absolute", right: 30, bottom: 30, width: 210, height: 238, borderRadius: 20, overflow: "hidden", border: `4px solid ${COLORS.pearl}`, opacity: frame < BEATS.nav ? prog(frame, 8, 8) : 0 }}>
          <Img src={staticFile("assets/bateri-merah/keys.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        {/* B: navigation */}
        <Beat at={BEATS.nav}>
          <AbsoluteFill style={{ background: "radial-gradient(80% 60% at 50% 45%, #2a2d48 0%, #0f101b 100%)" }} />
          <div style={{ position: "absolute", left: (CONTENT.width - 420) / 2, top: 40, transform: `scale(${tween(frame, BEATS.nav, 20, 1.08, 1, EASE.out)})` }}>
            <PhoneMockup width={420}>
              <NavigationScreen p={prog(frame, BEATS.nav, 40, EASE.linear)} level={8} />
            </PhoneMockup>
          </div>
        </Beat>
        {/* C: incoming call */}
        <Beat at={BEATS.call}>
          <AbsoluteFill style={{ background: "radial-gradient(80% 60% at 50% 45%, #2a2d48 0%, #0f101b 100%)" }} />
          <div style={{ position: "absolute", left: (CONTENT.width - 420) / 2, top: 40, transform: `scale(${tween(frame, BEATS.call, 20, 1.08, 1, EASE.out)}) rotate(${tween(frame, BEATS.call, 20, 2, 0, EASE.out)}deg)` }}>
            <PhoneMockup width={420}>
              <CallScreen ring={((frame - BEATS.call) % 18) / 18} level={7} />
            </PhoneMockup>
          </div>
        </Beat>
      </div>
    </AbsoluteFill>
  );
};
