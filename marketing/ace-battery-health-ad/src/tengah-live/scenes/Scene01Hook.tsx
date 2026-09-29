import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { AnimatedText } from "../../components/AnimatedText";
import { MediaSlot } from "../../components/MediaSlot";
import { PhoneMockup } from "../../components/PhoneMockup";
import { handheld, motionBlur, prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { LiveScreen } from "../screens";

export const TL_PHONE = { left: 305, top: 520, width: 470 } as const;
export const TL_PHONE_H = TL_PHONE.width * (146.7 / 71.5);

/** 0:00–0:04 HOOK. The poster's live set-up → punch into her phone: comments flowing, 3% alert, the live cuts out. */
export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const h = handheld(frame, 1);
  const punch = (f: number) => tween(f, 12, 9, 1, 2.1, EASE.in);
  const photoOut = prog(frame, 19, 5, EASE.linear);
  const phoneScale = (f: number) => tween(f, 19, 12, 1.3, 1, EASE.out);
  const shake = frame > 86 && frame < 96 ? Math.sin(frame * 3.1) * 10 : 0;
  const hp = handheld(frame + 30, frame < 100 ? 0.5 : 0);
  const exit = prog(frame, 110, 10, EASE.in);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 55%, ${COLORS.navySoft} 0%, ${COLORS.navy} 60%, ${COLORS.navyDeep} 100%)` }}>
      <div style={{ position: "absolute", left: CONTENT.left, top: 520, width: CONTENT.width, height: 800, borderRadius: 40, overflow: "hidden", opacity: 1 - photoOut, boxShadow: "0 40px 90px rgba(0,0,0,0.45)" }}>
        <div style={{ position: "absolute", inset: 0, transformOrigin: "12% 35%", transform: `translate(${h.x}px,${h.y}px) rotate(${h.r}deg) scale(${1.04 + frame * 0.002}) scale(${punch(frame)})`, filter: `blur(${motionBlur(punch, frame, 9)}px)` }}>
          <MediaSlot still="assets/tengah-live/ugc-hook.jpg" video="assets/tengah-live/ugc-hook.mp4" label="UGC hook: seller live-streaming tudung" objectPosition="30% 40%" />
        </div>
        <div style={{ position: "absolute", left: 24, top: 24, display: "flex", gap: 10, opacity: 1 - photoOut }}>
          <div style={{ background: "#E5484D", color: "#fff", borderRadius: 8, padding: "6px 14px", fontFamily: FONTS.heading, fontWeight: 800, fontSize: 28 }}>LIVE</div>
        </div>
      </div>
      <div style={{ position: "absolute", left: TL_PHONE.left, top: TL_PHONE.top, opacity: prog(frame, 19, 3, EASE.linear), transform: `translate(${hp.x + shake}px,${hp.y}px) rotate(${hp.r - 2}deg) scale(${phoneScale(frame)})`, transformOrigin: "50% 30%", filter: `blur(${motionBlur(phoneScale, frame, 10)}px)` }}>
        <PhoneMockup width={TL_PHONE.width} finish="silver">
          <LiveScreen t={frame} viewers={1248 + Math.floor(Math.min(frame, 86) * 3.1)} level={3} alert={prog(frame, 64, 8) * (1 - prog(frame, 86, 4))} ended={prog(frame, 86, 6, EASE.linear)} />
        </PhoneMockup>
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 1300, padding: "12px 20px", borderRadius: 14, background: COLORS.pearl, fontFamily: FONTS.body, fontWeight: 700, fontSize: 30, color: COLORS.navy, transform: `scale(${prog(frame, 38, 10, EASE.back) * (1 - prog(frame, 84, 6))})`, transformOrigin: "0 50%" }}>
        Order tengah masuk…
      </div>
      <AbsoluteFill style={{ opacity: 1 - exit, transform: `translateY(${-exit * 100}px)` }}>
        <div style={{ position: "absolute", left: CONTENT.left, top: 176, width: CONTENT.width }}>
          <AnimatedText text="TENGAH LIVE," start={3} stagger={4} mode="punch" fontSize={96} color={COLORS.pearl} letterSpacing="-0.04em" />
        </div>
        <div style={{ position: "absolute", left: CONTENT.left, top: 280, width: CONTENT.width }}>
          <AnimatedText text="BATERI BUAT" start={16} stagger={5} mode="punch" fontSize={96} color={COLORS.gold} letterSpacing="-0.04em" />
        </div>
        <div style={{ position: "absolute", left: CONTENT.left, top: 384, width: CONTENT.width }}>
          <AnimatedText text="HAL?" start={27} mode="punch" fontSize={96} color={COLORS.gold} letterSpacing="-0.04em" />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
