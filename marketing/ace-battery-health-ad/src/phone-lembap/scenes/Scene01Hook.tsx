import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { AnimatedText } from "../../components/AnimatedText";
import { MediaSlot } from "../../components/MediaSlot";
import { PhoneMockup } from "../../components/PhoneMockup";
import { handheld, motionBlur, prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { LoadingScreen } from "../screens";

export const PL_PHONE = { left: 305, top: 520, width: 470 } as const;
export const PL_PHONE_H = PL_PHONE.width * (146.7 / 71.5);

/** 0:00–0:04 HOOK. Library, study night: tap an app → it just keeps loading. Her reaction; a timer counts the wait. */
export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const h = handheld(frame, 1);
  const punch = (f: number) => tween(f, 12, 9, 1, 2.1, EASE.in);
  const photoOut = prog(frame, 19, 5, EASE.linear);
  const phoneScale = (f: number) => tween(f, 19, 12, 1.3, 1, EASE.out);
  const hp = handheld(frame + 30, 0.5);
  const face = prog(frame, 64, 12, EASE.out);
  const waited = Math.max(0, Math.floor((frame - 40) / 10));
  const exit = prog(frame, 110, 10, EASE.in);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 55%, ${COLORS.navySoft} 0%, ${COLORS.navy} 60%, ${COLORS.navyDeep} 100%)` }}>
      <div style={{ position: "absolute", left: CONTENT.left, top: 520, width: CONTENT.width, height: 860, borderRadius: 40, overflow: "hidden", opacity: 1 - photoOut, boxShadow: "0 40px 90px rgba(0,0,0,0.45)" }}>
        <div style={{ position: "absolute", inset: 0, transformOrigin: "26% 45%", transform: `translate(${h.x}px,${h.y}px) rotate(${h.r}deg) scale(${1.04 + frame * 0.002}) scale(${punch(frame)})`, filter: `blur(${motionBlur(punch, frame, 9)}px)` }}>
          <MediaSlot still="assets/phone-lembap/ugc-hook.jpg" video="assets/phone-lembap/ugc-hook.mp4" label="UGC hook: library, phone loading" objectPosition="30% 40%" />
        </div>
      </div>
      <div style={{ position: "absolute", left: PL_PHONE.left, top: PL_PHONE.top, opacity: prog(frame, 19, 3, EASE.linear), transform: `translate(${hp.x}px,${hp.y}px) rotate(${hp.r - 3}deg) scale(${phoneScale(frame)})`, transformOrigin: "50% 30%", filter: `blur(${motionBlur(phoneScale, frame, 10)}px)` }}>
        <PhoneMockup width={PL_PHONE.width} finish="silver">
          <LoadingScreen frame={frame} tap={prog(frame, 28, 8, EASE.linear)} open={prog(frame, 34, 10, EASE.out)} />
        </PhoneMockup>
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 1150, width: 250, height: 300, borderRadius: 28, overflow: "hidden", border: `4px solid ${COLORS.pearl}`, boxShadow: "0 24px 60px rgba(0,0,0,0.5)", opacity: face, transform: `translateY(${(1 - face) * 40}px) rotate(${-4 + 2 * face}deg)` }}>
        <MediaSlot still="assets/phone-lembap/face.jpg" video="assets/phone-lembap/reaction.mp4" label="Reaction close-up" objectPosition="50% 40%" />
      </div>
      <div style={{ position: "absolute", left: 700, top: 1330, padding: "12px 20px", borderRadius: 14, background: COLORS.pearl, color: COLORS.navy, fontFamily: FONTS.body, fontWeight: 700, fontSize: 30, fontVariantNumeric: "tabular-nums", opacity: prog(frame, 46, 8), transform: `scale(${0.8 + 0.2 * prog(frame, 46, 8, EASE.back)})`, transformOrigin: "0 50%" }}>
        Loading… {waited}s
      </div>
      <AbsoluteFill style={{ opacity: 1 - exit, transform: `translateY(${-exit * 100}px)` }}>
        <div style={{ position: "absolute", left: CONTENT.left, top: 176, width: CONTENT.width }}>
          <AnimatedText text="PHONE LEMBAP?" start={3} stagger={4} mode="punch" fontSize={110} color={COLORS.pearl} letterSpacing="-0.04em" />
        </div>
        <div style={{ position: "absolute", left: CONTENT.left, top: 300, width: CONTENT.width }}>
          <AnimatedText text="BUKA APP PUN LOADING…" start={40} stagger={4} mode="punch" fontSize={72} color={COLORS.gold} letterSpacing="-0.04em" />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
