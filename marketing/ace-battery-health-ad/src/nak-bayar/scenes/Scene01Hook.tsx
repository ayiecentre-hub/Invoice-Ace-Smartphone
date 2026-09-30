import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { AnimatedText } from "../../components/AnimatedText";
import { MediaSlot } from "../../components/MediaSlot";
import { PhoneMockup } from "../../components/PhoneMockup";
import { handheld, motionBlur, prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE } from "../../theme";
import { PayScanScreen } from "../screens";

export const NB_PHONE = { left: 305, top: 540, width: 470 } as const;
export const NB_PHONE_H = NB_PHONE.width * (146.7 / 71.5);

/** 0:00–0:04 HOOK. At the café counter → punch into the scan-to-pay screen → it locks on… and the phone dies. */
export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const h = handheld(frame, 1);
  const punch = (f: number) => tween(f, 12, 9, 1, 2.1, EASE.in);
  const photoOut = prog(frame, 19, 5, EASE.linear);
  const phoneScale = (f: number) => tween(f, 19, 12, 1.3, 1, EASE.out);
  const shake = frame > 60 && frame < 70 ? Math.sin(frame * 3.1) * 10 : 0;
  const hp = handheld(frame + 30, frame < 90 ? 0.5 : 0);
  const exit = prog(frame, 110, 10, EASE.in);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 55%, ${COLORS.navySoft} 0%, ${COLORS.navy} 60%, ${COLORS.navyDeep} 100%)` }}>
      <div style={{ position: "absolute", left: CONTENT.left, top: 520, width: CONTENT.width, height: 860, borderRadius: 40, overflow: "hidden", opacity: 1 - photoOut, boxShadow: "0 40px 90px rgba(0,0,0,0.45)" }}>
        <div style={{ position: "absolute", inset: 0, transformOrigin: "15% 80%", transform: `translate(${h.x}px,${h.y}px) rotate(${h.r}deg) scale(${1.04 + frame * 0.002}) scale(${punch(frame)})`, filter: `blur(${motionBlur(punch, frame, 9)}px)` }}>
          <MediaSlot still="assets/nak-bayar/ugc-hook.jpg" video="assets/nak-bayar/ugc-hook.mp4" label="UGC hook: paying at the café counter" objectPosition="50% 45%" />
        </div>
      </div>
      <div style={{ position: "absolute", left: NB_PHONE.left, top: NB_PHONE.top, opacity: prog(frame, 19, 3, EASE.linear), transform: `translate(${hp.x + shake}px,${hp.y}px) rotate(${hp.r - 3}deg) scale(${phoneScale(frame)})`, transformOrigin: "50% 30%", filter: `blur(${motionBlur(phoneScale, frame, 10)}px)` }}>
        <PhoneMockup width={NB_PHONE.width}>
          <PayScanScreen lock={prog(frame, 34, 10, EASE.out)} off={prog(frame, 60, 3, EASE.linear)} level={18} />
        </PhoneMockup>
      </div>
      <AbsoluteFill style={{ opacity: 1 - exit, transform: `translateY(${-exit * 100}px)` }}>
        <div style={{ position: "absolute", left: CONTENT.left, top: 176, width: CONTENT.width }}>
          <AnimatedText text="NAK BAYAR," start={3} stagger={4} mode="punch" fontSize={104} color={COLORS.pearl} letterSpacing="-0.04em" />
        </div>
        <div style={{ position: "absolute", left: CONTENT.left, top: 290, width: CONTENT.width }}>
          <AnimatedText text="BATERI PULA HABIS." start={62} stagger={4} mode="punch" fontSize={84} color={COLORS.gold} letterSpacing="-0.04em" />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
