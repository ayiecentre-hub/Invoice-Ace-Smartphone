import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { AnimatedText } from "../../components/AnimatedText";
import { Connector } from "../../components/Connector";
import { FocusBrackets } from "../../components/DiagnosticOverlay";
import { MediaSlot } from "../../components/MediaSlot";
import { PhoneMockup } from "../../components/PhoneMockup";
import { handheld, motionBlur, prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { BigBatteryScreen } from "../screens";

export const HOOK_PHONE = { left: 300, top: 560, width: 480 } as const;
export const HOOK_PHONE_H = HOOK_PHONE.width * (146.7 / 71.5);

/**
 * 0:00–0:03 HOOK. The poster moment as UGC: she checks her phone beside the car.
 * At 0.4 s the frame punches into the phone; the same 9% as the poster, now crisp.
 */
export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const h = handheld(frame, 1);
  const punch = (f: number) => tween(f, 12, 9, 1, 2.3, EASE.in);
  const photoOut = prog(frame, 19, 5, EASE.linear);
  const phoneScale = (f: number) => tween(f, 19, 12, 1.35, 1, EASE.out);
  const phoneIn = prog(frame, 19, 3, EASE.linear);
  const hp = handheld(frame + 50, frame < 62 ? 0.55 : 0);
  const pulse = Math.abs(Math.sin(frame * 0.16));
  const callout = prog(frame, 44, 12, EASE.inOut);
  const lock = prog(frame, 64, 8, EASE.back);
  const exit = tween(frame, 82, 8, 0, -120, EASE.in);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 55%, ${COLORS.navySoft} 0%, ${COLORS.navy} 60%, ${COLORS.navyDeep} 100%)` }}>
      {/* UGC card (replace with ugc-hook.mp4) */}
      <div
        style={{
          position: "absolute",
          left: CONTENT.left,
          top: 560,
          width: CONTENT.width,
          height: 652,
          borderRadius: 40,
          overflow: "hidden",
          opacity: 1 - photoOut,
          boxShadow: "0 40px 90px rgba(0,0,0,0.45)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformOrigin: "10% 55%",
            transform: `translate(${h.x}px,${h.y}px) rotate(${h.r}deg) scale(${1.04 + frame * 0.002}) scale(${punch(frame)})`,
            filter: `blur(${motionBlur(punch, frame, 9)}px)`,
          }}
        >
          <MediaSlot still="assets/bateri-merah/ugc-hook.jpg" video="assets/bateri-merah/ugc-hook.mp4" label="UGC hook: woman by the car" objectPosition="30% 40%" />
        </div>
      </div>

      {/* crisp macro of the same phone */}
      <div
        style={{
          position: "absolute",
          left: HOOK_PHONE.left,
          top: HOOK_PHONE.top,
          opacity: phoneIn,
          transform: `translate(${hp.x}px,${hp.y}px) rotate(${hp.r - 4}deg) scale(${phoneScale(frame)})`,
          transformOrigin: "50% 30%",
          filter: `blur(${motionBlur(phoneScale, frame, 10)}px)`,
        }}
      >
        <PhoneMockup width={HOOK_PHONE.width}>
          <BigBatteryScreen level={9} pulse={pulse} />
        </PhoneMockup>
        <FocusBrackets w={HOOK_PHONE.width} h={HOOK_PHONE_H} p={lock} color={COLORS.pearl} />
      </div>

      {/* editorial callout pinned to the battery */}
      <Connector points={[[HOOK_PHONE.left + 70, HOOK_PHONE.top + 330], [150, HOOK_PHONE.top + 330], [150, HOOK_PHONE.top + 420]]} progress={callout} color={COLORS.pearl} width={3} />
      <div
        style={{
          position: "absolute",
          left: CONTENT.left,
          top: HOOK_PHONE.top + 430,
          padding: "12px 18px",
          borderRadius: 14,
          background: COLORS.pearl,
          fontFamily: FONTS.body,
          fontWeight: 700,
          fontSize: 28,
          color: COLORS.navy,
          opacity: prog(frame, 52, 8),
          transform: `translateY(${(1 - prog(frame, 52, 8)) * 14}px)`,
        }}
      >
        9% · baru keluar
      </div>

      <AbsoluteFill style={{ transform: `translateY(${exit}px)`, opacity: 1 - prog(frame, 84, 6) }}>
        <div style={{ position: "absolute", left: CONTENT.left, top: 176, width: CONTENT.width }}>
          <AnimatedText text="BARU KELUAR…" start={3} stagger={4} fontSize={62} weight={600} color={COLORS.pearl} letterSpacing="0.02em" />
        </div>
        <div style={{ position: "absolute", left: CONTENT.left, top: 258, width: CONTENT.width }}>
          <AnimatedText text="BATERI DAH" start={16} stagger={5} mode="punch" fontSize={116} color={COLORS.pearl} letterSpacing="-0.04em" />
        </div>
        <div style={{ position: "absolute", left: CONTENT.left, top: 376, width: CONTENT.width }}>
          <AnimatedText text="MERAH?" start={27} mode="punch" fontSize={116} color={COLORS.alertText} letterSpacing="-0.04em" />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
