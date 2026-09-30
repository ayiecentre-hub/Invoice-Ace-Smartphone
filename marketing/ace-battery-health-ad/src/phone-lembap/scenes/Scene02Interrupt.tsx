import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { PhoneMockup } from "../../components/PhoneMockup";
import { prog } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { LoadingScreen } from "../screens";
import { PL_PHONE, PL_PHONE_H } from "./Scene01Hook";

const PARK = { left: 390, top: 760, width: 300 };

/**
 * 0:04–0:07 PATTERN INTERRUPT. Freeze. The reflex ("terus beli telefon baharu?") is struck through
 * and replaced by the poster's idea: tunggu dulu, kenal pasti punca.
 */
export const Scene02Interrupt: React.FC = () => {
  const frame = useCurrentFrame();
  const k = prog(frame, 0, 16, EASE.inOut);
  const scale = 1 + (PARK.width / PL_PHONE.width - 1) * k;
  const x = (PARK.left - PL_PHONE.left) * k;
  const y = (PARK.top - PL_PHONE.top) * k;
  const perim = 2 * (PL_PHONE.width + PL_PHONE_H);
  const trace = prog(frame, 0, 12, EASE.inOut);
  const strike = prog(frame, 50, 8, EASE.inOut);
  const q = prog(frame, 60, 10, EASE.back);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 60%, ${COLORS.navySoft} 0%, ${COLORS.navy} 55%, ${COLORS.navyDeep} 100%)` }}>
      <div style={{ position: "absolute", left: PL_PHONE.left, top: PL_PHONE.top, transformOrigin: "0 0", transform: `translate(${x}px,${y}px) scale(${scale})` }}>
        <PhoneMockup width={PL_PHONE.width} finish="silver">
          <LoadingScreen frame={120} tap={1} open={1} />
        </PhoneMockup>
        <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={PL_PHONE.width} height={PL_PHONE_H}>
          <rect x={-10} y={-10} width={PL_PHONE.width + 20} height={PL_PHONE_H + 20} rx={PL_PHONE.width * 0.17} fill="none" stroke={COLORS.pearl} strokeWidth={5} strokeDasharray={`${perim} ${perim}`} strokeDashoffset={perim * (1 - trace)} />
        </svg>
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 176, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 62, color: COLORS.pearl, opacity: prog(frame, 8, 10) }}>Ramai terus fikir…</div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 262, fontFamily: FONTS.heading, fontWeight: 700, fontSize: 96, lineHeight: 1.05, letterSpacing: "-0.045em", color: COLORS.pearl, opacity: (1 - 0.55 * strike) * prog(frame, 14, 8), transform: `translateY(${(1 - prog(frame, 14, 10)) * 30}px)` }}>
        <div>Terus beli</div>
        <div style={{ position: "relative", display: "inline-block" }}>
          telefon baharu?
          <div style={{ position: "absolute", left: -6, top: "52%", height: 10, width: `${strike * 104}%`, borderRadius: 5, background: COLORS.lowBattery }} />
        </div>
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 530, padding: "14px 30px", borderRadius: 18, background: COLORS.blue, fontFamily: FONTS.heading, fontWeight: 700, fontSize: 64, letterSpacing: "-0.03em", color: COLORS.pearl, transform: `scale(${q})`, transformOrigin: "0 50%", opacity: q > 0 ? 1 : 0 }}>
        Tunggu dulu.
      </div>
    </AbsoluteFill>
  );
};
