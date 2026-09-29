import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { FocusBrackets } from "../components/DiagnosticOverlay";
import { MediaSlot } from "../components/MediaSlot";
import { PhoneMockup } from "../components/PhoneMockup";
import { LowBatteryScreen } from "../components/PhoneScreens";
import { handheld, motionBlur, prog, tween } from "../lib/anim";
import { COLORS, CONTENT, EASE } from "../theme";

export const PHONE_1 = { width: 430, top: 520 } as const;

/** Background used by scenes 1 and 2 (blurred, darkened counter footage). */
export const CounterBackdrop: React.FC<{ focusPull: number; sway: number }> = ({ focusPull, sway }) => {
  const frame = useCurrentFrame();
  const h = handheld(frame, sway);
  return (
    <AbsoluteFill
      style={{
        transform: `translate(${h.x}px, ${h.y}px) rotate(${h.r}deg) scale(${1.1 + frame * 0.0012})`,
        filter: `blur(${focusPull * 12}px) brightness(${1 - focusPull * 0.42})`,
      }}
    >
      <MediaSlot
        still="assets/customer-payment.jpg"
        video="assets/customer-payment.mp4"
        label="Customer at payment counter"
        objectPosition="30% 40%"
      />
    </AbsoluteFill>
  );
};

/** 0:00–0:02.5 — Hook. UGC counter shot, editorial punch-in to the phone, low battery. */
export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const punch = (f: number) => tween(f, 12, 11, 2.3, 1, EASE.out);
  const phoneIn = prog(frame, 12, 6, EASE.linear);
  const focusPull = prog(frame, 10, 10, EASE.inOut);
  const sway = frame < 60 ? 1 : tween(frame, 60, 6, 1, 0);
  const h = handheld(frame + 40, 0.55 * sway);
  const alert = prog(frame, 28, 12);
  const lock = prog(frame, 62, 8);
  return (
    <AbsoluteFill style={{ background: COLORS.navy }}>
      <CounterBackdrop focusPull={focusPull} sway={sway} />
      {/* top scrim keeps headline legible over footage */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(18,18,31,0.82) 0%, rgba(18,18,31,0.35) 32%, rgba(18,18,31,0) 50%)" }} />
      <div
        style={{
          position: "absolute",
          left: (1080 - PHONE_1.width) / 2,
          top: PHONE_1.top,
          opacity: phoneIn,
          transform: `translate(${h.x}px, ${h.y}px) rotate(${h.r}deg) scale(${punch(frame)})`,
          transformOrigin: "50% 40%",
          filter: `blur(${motionBlur(punch, frame, 9)}px)`,
        }}
      >
        <PhoneMockup width={PHONE_1.width}>
          <LowBatteryScreen alert={alert} />
        </PhoneMockup>
        <FocusBrackets w={PHONE_1.width} h={PHONE_1.width * (146.7 / 71.5)} p={lock} color={COLORS.pearl} />
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 178, width: CONTENT.width }}>
        <AnimatedText text="NAK BAYAR…" start={3} stagger={4} fontSize={62} weight={600} color={COLORS.pearl} letterSpacing="0.02em" />
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 262, width: CONTENT.width }}>
        <AnimatedText
          text="[BATERI]{gold} PULA"
          start={20}
          stagger={5}
          mode="punch"
          emphasisScale={1.05}
          fontSize={112}
          color={COLORS.pearl}
          letterSpacing="-0.04em"
        />
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 378, width: CONTENT.width }}>
        <AnimatedText text="NAK HABIS." start={31} stagger={5} mode="punch" fontSize={112} color={COLORS.pearl} letterSpacing="-0.04em" />
      </div>
    </AbsoluteFill>
  );
};
