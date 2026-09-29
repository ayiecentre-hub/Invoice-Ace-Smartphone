import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { KineticHeadline } from "../../components/KineticHeadline";
import { PhoneMockup } from "../../components/PhoneMockup";
import { prog, tween } from "../../lib/anim";
import { COLORS, EASE, FONTS } from "../../theme";
import { BigBatteryScreen } from "../screens";
import { HOOK_PHONE, HOOK_PHONE_H } from "./Scene01Hook";

export const FROZEN = { left: 72, top: 560, width: 290 } as const;

/**
 * 0:03–0:05 PATTERN INTERRUPT. Freeze: the phone is traced, lifted out and parked left.
 * The common reflex appears ("tukar bateri"), then steps back for "Tapi, tunggu dulu."
 */
export const Scene02Interrupt: React.FC = () => {
  const frame = useCurrentFrame();
  const k = prog(frame, 2, 14, EASE.inOut);
  const scale = 1 + (FROZEN.width / HOOK_PHONE.width - 1) * k;
  const x = (FROZEN.left - HOOK_PHONE.left) * k;
  const y = (FROZEN.top - HOOK_PHONE.top) * k;
  const trace = prog(frame, 0, 10, EASE.inOut);
  const perim = 2 * (HOOK_PHONE.width + HOOK_PHONE_H);
  const dim = tween(frame, 34, 8, 1, 0.32);
  const pill = prog(frame, 36, 10, EASE.back);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 60% 50%, ${COLORS.navySoft} 0%, ${COLORS.navy} 55%, ${COLORS.navyDeep} 100%)` }}>
      <div
        style={{
          position: "absolute",
          left: HOOK_PHONE.left,
          top: HOOK_PHONE.top,
          transformOrigin: "0 0",
          transform: `translate(${x}px,${y}px) scale(${scale}) rotate(${-4 * (1 - k)}deg)`,
          filter: `grayscale(${0.5 * trace})`,
        }}
      >
        <PhoneMockup width={HOOK_PHONE.width}>
          <BigBatteryScreen level={9} pulse={0.5} />
        </PhoneMockup>
        <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={HOOK_PHONE.width} height={HOOK_PHONE_H}>
          <rect x={-10} y={-10} width={HOOK_PHONE.width + 20} height={HOOK_PHONE_H + 20} rx={HOOK_PHONE.width * 0.17} fill="none" stroke={COLORS.pearl} strokeWidth={5 / Math.max(scale, 0.3)} strokeDasharray={`${perim} ${perim}`} strokeDashoffset={perim * (1 - trace)} />
        </svg>
      </div>
      <div style={{ position: "absolute", left: 420, top: 600, width: 540 }}>
        <div style={{ opacity: dim }}>
          <div style={{ fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 58, color: COLORS.pearl, opacity: prog(frame, 8, 10), transform: `translateY(${(1 - prog(frame, 8, 10)) * 16}px)` }}>Ramai terus nak…</div>
          <KineticHeadline start={12} gap={5} size={108} color={COLORS.pearl} lines={[{ text: "TUKAR" }, { text: "BATERI." }]} style={{ marginTop: 18 }} />
        </div>
        <div
          style={{
            marginTop: 44,
            display: "inline-block",
            padding: "18px 30px",
            borderRadius: 999,
            background: COLORS.pearl,
            fontFamily: FONTS.body,
            fontWeight: 700,
            fontSize: 44,
            color: COLORS.navy,
            transform: `scale(${pill})`,
            transformOrigin: "0 50%",
            opacity: pill > 0 ? 1 : 0,
          }}
        >
          Tapi, tunggu dulu.
        </div>
      </div>
    </AbsoluteFill>
  );
};
