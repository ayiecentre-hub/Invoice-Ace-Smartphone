import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ComparisonGraphic } from "../components/ComparisonGraphic";
import { FocusBrackets } from "../components/DiagnosticOverlay";
import { PhoneMockup } from "../components/PhoneMockup";
import { LowBatteryScreen } from "../components/PhoneScreens";
import { motionBlur, prog, tween } from "../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../theme";
import { CounterBackdrop, PHONE_1 } from "./Scene01Hook";

/**
 * 0:02.5–0:05 — Pattern interrupt. The frame freezes, the phone is lifted out of the
 * footage (mask separation), the world drops to ACE Navy and the explainer takes over.
 */
export const Scene02Interrupt: React.FC = () => {
  const frame = useCurrentFrame();
  const navy = prog(frame, 0, 10, EASE.inOut);
  const lift = (f: number) => tween(f, 5, 12, 0, -1500, EASE.in);
  const phoneScale = tween(frame, 0, 8, 1, 1.04, EASE.out);
  const eyebrow = prog(frame, 12, 12);
  const push = tween(frame, 44, 40, 1, 1.035, EASE.inOut);
  return (
    <AbsoluteFill style={{ background: COLORS.navy }}>
      <CounterBackdrop focusPull={1} sway={0} />
      <AbsoluteFill
        style={{
          background: `radial-gradient(80% 55% at 50% 45%, ${COLORS.navySoft} 0%, ${COLORS.navy} 55%, ${COLORS.navyDeep} 100%)`,
          opacity: navy,
        }}
      />
      {/* fine editorial grid lines draw in */}
      <AbsoluteFill style={{ opacity: 0.5 * navy }}>
        {[CONTENT.left, 540, CONTENT.right].map((x, i) => (
          <div
            key={x}
            style={{
              position: "absolute",
              left: x,
              top: 0,
              width: 1.5,
              height: `${prog(frame, 6 + i * 3, 20, EASE.inOut) * 100}%`,
              background: COLORS.hairlineOnNavy,
            }}
          />
        ))}
      </AbsoluteFill>
      {/* the separated phone leaves the frame */}
      <div
        style={{
          position: "absolute",
          left: (1080 - PHONE_1.width) / 2,
          top: PHONE_1.top,
          transform: `translateY(${lift(frame)}px) scale(${phoneScale})`,
          filter: `blur(${motionBlur(lift, frame, 0.09)}px) drop-shadow(0 0 0 transparent)`,
          transformOrigin: "50% 40%",
        }}
      >
        <PhoneMockup width={PHONE_1.width}>
          <LowBatteryScreen alert={1} />
        </PhoneMockup>
        <FocusBrackets w={PHONE_1.width} h={PHONE_1.width * (146.7 / 71.5)} p={1} color={COLORS.pearl} />
      </div>
      <AbsoluteFill style={{ transform: `scale(${push})`, transformOrigin: "50% 45%" }}>
        <div
          style={{
            position: "absolute",
            left: CONTENT.left,
            top: 222,
            width: CONTENT.width,
            fontFamily: FONTS.serif,
            fontStyle: "italic",
            fontSize: 64,
            color: COLORS.pearl,
            opacity: eyebrow,
            transform: `translateY(${(1 - eyebrow) * 20}px)`,
          }}
        >
          Ramai tak tahu…
        </div>
        <div style={{ position: "absolute", left: CONTENT.left, top: 360 }}>
          <ComparisonGraphic start={16} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
