import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { AnimatedText } from "../../components/AnimatedText";
import { MediaSlot } from "../../components/MediaSlot";
import { PhoneMockup } from "../../components/PhoneMockup";
import { LowBatteryScreen } from "../../components/PhoneScreens";
import { handheld, motionBlur, prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";

/** Macro framing of the phone shared by scenes 01 and 02. */
export const MACRO = { left: 110, top: 560, width: 860 } as const;

export const CounterPhoto: React.FC<{ blur: number; dim: number }> = ({ blur, dim }) => {
  const frame = useCurrentFrame();
  const h = handheld(frame, 1);
  return (
    <AbsoluteFill style={{ transform: `translate(${h.x}px,${h.y}px) rotate(${h.r}deg) scale(${1.08 + frame * 0.0015})`, filter: `blur(${blur}px) brightness(${1 - dim})` }}>
      <MediaSlot still="assets/customer-payment.jpg" video="assets/customer-payment.mp4" label="Customer at payment counter" objectPosition="30% 40%" />
    </AbsoluteFill>
  );
};

/** Word sitting on a Trust-Blue marker block that wipes in behind it. */
const MarkedWord: React.FC<{ text: string; start: number; size: number }> = ({ text, start, size }) => {
  const frame = useCurrentFrame();
  const block = prog(frame, start, 9, EASE.inOut);
  const word = (f: number) => tween(f, start + 2, 10, 1.4, 1, EASE.out);
  return (
    <div style={{ position: "relative", display: "inline-block", padding: `0 ${size * 0.12}px` }}>
      <div style={{ position: "absolute", inset: `${size * 0.06}px 0 ${size * 0.02}px`, background: COLORS.blue, borderRadius: size * 0.1, transform: `scaleX(${block})`, transformOrigin: "0 50%" }} />
      <div
        style={{
          position: "relative",
          fontFamily: FONTS.heading,
          fontWeight: 700,
          fontSize: size,
          letterSpacing: "-0.04em",
          lineHeight: 1.02,
          color: COLORS.pearl,
          transform: `scale(${word(frame)})`,
          opacity: prog(frame, start + 2, 4, EASE.linear),
          filter: `blur(${motionBlur((f) => word(f) * 100, frame, 0.25)}px)`,
        }}
      >
        {text}
      </div>
    </div>
  );
};

/**
 * VARIATION B · 0:00–0:02.5. Counter footage, then a "lens" opens at 0.4 s: a rounded mask
 * punches from the phone's position to full frame, revealing a macro of the lock screen.
 */
export const V2Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const lens = prog(frame, 12, 10, EASE.out);
  const inset = { t: tween(lens, 0, 1, 1020, 0, EASE.linear), b: tween(lens, 0, 1, 1920 - 1270, 0, EASE.linear), l: tween(lens, 0, 1, 380, 0, EASE.linear), r: tween(lens, 0, 1, 1080 - 700, 0, EASE.linear) };
  const macroScale = (f: number) => tween(f, 12, 14, 1.5, 1, EASE.out);
  const h = handheld(frame + 30, 0.5);
  const alert = prog(frame, 26, 12);
  return (
    <AbsoluteFill style={{ background: COLORS.navyDeep }}>
      <CounterPhoto blur={0} dim={0} />
      {/* lens: macro close-up of the same phone */}
      <AbsoluteFill style={{ clipPath: `inset(${inset.t}px ${inset.r}px ${inset.b}px ${inset.l}px round ${48 * (1 - lens) + 0}px)`, opacity: frame >= 12 ? 1 : 0 }}>
        <CounterPhoto blur={18} dim={0.55} />
        <div
          style={{
            position: "absolute",
            left: MACRO.left,
            top: MACRO.top,
            transform: `translate(${h.x}px,${h.y}px) rotate(${h.r - 1.5}deg) scale(${macroScale(frame)})`,
            transformOrigin: "50% 20%",
            filter: `blur(${motionBlur(macroScale, frame, 8)}px)`,
          }}
        >
          <PhoneMockup width={MACRO.width}>
            <LowBatteryScreen alert={alert} level={4} />
          </PhoneMockup>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(18,18,31,0.85) 0%, rgba(18,18,31,0.4) 26%, rgba(18,18,31,0) 40%)" }} />
      <div style={{ position: "absolute", left: CONTENT.left, top: 178, width: CONTENT.width }}>
        <AnimatedText text="NAK BAYAR…" start={3} stagger={4} fontSize={62} weight={600} color={COLORS.pearl} letterSpacing="0.02em" />
      </div>
      <div style={{ position: "absolute", left: CONTENT.left - 14, top: 262, width: CONTENT.width + 14, display: "flex", alignItems: "center", gap: 22 }}>
        <MarkedWord text="BATERI" start={18} size={112} />
        <AnimatedText text="PULA" start={25} mode="punch" fontSize={112} color={COLORS.pearl} letterSpacing="-0.04em" />
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 386, width: CONTENT.width }}>
        <AnimatedText text="NAK HABIS." start={30} stagger={5} mode="punch" fontSize={112} color={COLORS.pearl} letterSpacing="-0.04em" />
      </div>
    </AbsoluteFill>
  );
};
