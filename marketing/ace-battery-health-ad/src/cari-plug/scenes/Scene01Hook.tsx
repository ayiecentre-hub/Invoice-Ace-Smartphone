import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { AnimatedText } from "../../components/AnimatedText";
import { MediaSlot } from "../../components/MediaSlot";
import { PhoneMockup } from "../../components/PhoneMockup";
import { handheld, motionBlur, prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { ChargingScreen } from "../screens";

export const CP_PHONE = { left: 300, top: 560, width: 480 } as const;
export const CP_PHONE_H = CP_PHONE.width * (146.7 / 71.5);

/** Wall socket + cable drawn in vector so the "plug" is always crisp. */
const Socket: React.FC<{ plug: number }> = ({ plug }) => (
  <div style={{ position: "absolute", left: CONTENT.left, top: 640, width: 150, height: 170 }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 22, background: "#F2F2F4", boxShadow: "0 10px 30px rgba(0,0,0,0.35)" }} />
    <div style={{ position: "absolute", left: 20, top: 20, right: 20, bottom: 20, borderRadius: 14, border: "2px solid #d8d8de" }} />
    <div style={{ position: "absolute", left: 38, top: 40 + (1 - plug) * 40, width: 74, height: 64, borderRadius: 12, background: "linear-gradient(180deg,#fff,#e6e6ea)", boxShadow: "0 6px 16px rgba(0,0,0,0.25)", opacity: plug }} />
    <svg style={{ position: "absolute", left: 75, top: 100, overflow: "visible" }} width="1" height="1">
      <path d="M0 0 C 0 120, 160 200, 230 150" fill="none" stroke="#f4f4f6" strokeWidth="10" strokeLinecap="round" strokeDasharray="420" strokeDashoffset={420 * (1 - plug)} />
    </svg>
  </div>
);

/** 0:00–0:03 HOOK. The poster's study-desk moment → punch-in → the phone is charging (again). */
export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const h = handheld(frame, 1);
  const punch = (f: number) => tween(f, 12, 9, 1, 2.2, EASE.in);
  const photoOut = prog(frame, 19, 5, EASE.linear);
  const phoneScale = (f: number) => tween(f, 19, 12, 1.3, 1, EASE.out);
  const hp = handheld(frame + 40, frame < 62 ? 0.5 : 0);
  const plug = prog(frame, 18, 12, EASE.out);
  const chip = prog(frame, 38, 10, EASE.back);
  const exit = prog(frame, 82, 8, EASE.in);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 55%, ${COLORS.navySoft} 0%, ${COLORS.navy} 60%, ${COLORS.navyDeep} 100%)` }}>
      <div style={{ position: "absolute", left: CONTENT.left, top: 560, width: CONTENT.width, height: 820, borderRadius: 40, overflow: "hidden", opacity: 1 - photoOut, boxShadow: "0 40px 90px rgba(0,0,0,0.45)" }}>
        <div style={{ position: "absolute", inset: 0, transformOrigin: "30% 88%", transform: `translate(${h.x}px,${h.y}px) rotate(${h.r}deg) scale(${1.04 + frame * 0.002}) scale(${punch(frame)})`, filter: `blur(${motionBlur(punch, frame, 9)}px)` }}>
          <MediaSlot still="assets/cari-plug/ugc-hook.jpg" video="assets/cari-plug/ugc-hook.mp4" label="UGC hook: student at desk, phone charging" objectPosition="45% 40%" />
        </div>
      </div>
      <div style={{ opacity: prog(frame, 19, 4, EASE.linear) }}>
        <Socket plug={plug} />
        <div style={{ position: "absolute", left: CP_PHONE.left, top: CP_PHONE.top, transform: `translate(${hp.x}px,${hp.y}px) rotate(${hp.r + 3}deg) scale(${phoneScale(frame)})`, transformOrigin: "50% 30%", filter: `blur(${motionBlur(phoneScale, frame, 10)}px)` }}>
          <PhoneMockup width={CP_PHONE.width} finish="silver">
            <ChargingScreen level={tween(frame, 20, 60, 21, 24, EASE.linear)} bolt={prog(frame, 22, 8, EASE.back)} />
          </PhoneMockup>
        </div>
        <div style={{ position: "absolute", left: CONTENT.left, top: 1290, padding: "12px 20px", borderRadius: 14, background: COLORS.pearl, fontFamily: FONTS.body, fontWeight: 700, fontSize: 30, color: COLORS.navy, transform: `scale(${chip})`, transformOrigin: "0 50%", opacity: chip > 0 ? 1 : 0 }}>
          Cas ke-3 hari ni · 11:37 pagi
        </div>
      </div>
      <AbsoluteFill style={{ opacity: 1 - exit, transform: `translateY(${-exit * 100}px)` }}>
        <div style={{ position: "absolute", left: CONTENT.left, top: 178, width: CONTENT.width }}>
          <AnimatedText text="ASYIK CARI" start={3} stagger={4} fontSize={112} weight={700} color={COLORS.pearl} letterSpacing="-0.04em" mode="punch" />
        </div>
        <div style={{ position: "absolute", left: CONTENT.left, top: 296, width: CONTENT.width }}>
          <AnimatedText text="[PLUG]{gold} SETIAP HARI?" start={14} stagger={5} mode="punch" emphasisScale={1.06} fontSize={96} color={COLORS.pearl} letterSpacing="-0.04em" />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
