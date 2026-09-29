import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { PhoneMockup } from "../../components/PhoneMockup";
import { prog, tween } from "../../lib/anim";
import { COLORS, EASE, FONTS } from "../../theme";
import { ChargingScreen } from "../screens";
import { CP_PHONE, CP_PHONE_H } from "./Scene01Hook";

export const CP_PARK = { left: 72, top: 560, width: 290 } as const;

/**
 * 0:03–0:05 PATTERN INTERRUPT. Freeze, trace, park the phone. "NORMAL." gains a
 * question mark, then the word is replaced: "Sebenarnya, ada tandanya."
 */
export const Scene02Interrupt: React.FC = () => {
  const frame = useCurrentFrame();
  const k = prog(frame, 2, 14, EASE.inOut);
  const scale = 1 + (CP_PARK.width / CP_PHONE.width - 1) * k;
  const x = (CP_PARK.left - CP_PHONE.left) * k;
  const y = (CP_PARK.top - CP_PHONE.top) * k;
  const trace = prog(frame, 0, 10, EASE.inOut);
  const perim = 2 * (CP_PHONE.width + CP_PHONE_H);
  const normal = prog(frame, 12, 10);
  const q = prog(frame, 24, 8, EASE.back);
  const swap = prog(frame, 32, 10, EASE.inOut);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 60% 50%, ${COLORS.navySoft} 0%, ${COLORS.navy} 55%, ${COLORS.navyDeep} 100%)` }}>
      <div style={{ position: "absolute", left: CP_PHONE.left, top: CP_PHONE.top, transformOrigin: "0 0", transform: `translate(${x}px,${y}px) scale(${scale}) rotate(${3 * (1 - k)}deg)`, filter: `grayscale(${0.5 * trace})` }}>
        <PhoneMockup width={CP_PHONE.width} finish="silver">
          <ChargingScreen level={24} bolt={1} />
        </PhoneMockup>
        <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={CP_PHONE.width} height={CP_PHONE_H}>
          <rect x={-10} y={-10} width={CP_PHONE.width + 20} height={CP_PHONE_H + 20} rx={CP_PHONE.width * 0.17} fill="none" stroke={COLORS.pearl} strokeWidth={5 / Math.max(scale, 0.3)} strokeDasharray={`${perim} ${perim}`} strokeDashoffset={perim * (1 - trace)} />
        </svg>
      </div>
      <div style={{ position: "absolute", left: 420, top: 600, width: 540 }}>
        <div style={{ fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 58, color: COLORS.pearl, opacity: prog(frame, 13, 8) }}>Ramai ingat itu…</div>
        <div style={{ position: "relative", height: 150, marginTop: 14, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: tween(swap, 0, 1, 0, -150, EASE.linear), fontFamily: FONTS.heading, fontWeight: 700, fontSize: 120, letterSpacing: "-0.045em", color: COLORS.pearl, transform: `translateY(${(1 - normal) * 100}%)` }}>
            NORMAL<span style={{ display: "inline-block", color: COLORS.gold, transform: `scale(${q})`, opacity: q > 0 ? 1 : 0 }}>?</span>
          </div>
          <div style={{ position: "absolute", left: 0, top: tween(swap, 0, 1, 150, 12, EASE.linear), fontFamily: FONTS.heading, fontWeight: 700, fontSize: 64, lineHeight: 1.05, letterSpacing: "-0.03em", color: COLORS.pearl }}>
            Sebenarnya,
            <br />
            <span style={{ background: COLORS.blue, borderRadius: 12, padding: "0 12px" }}>ada tandanya.</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
