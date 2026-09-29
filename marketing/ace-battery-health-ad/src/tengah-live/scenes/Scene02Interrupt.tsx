import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { KineticHeadline } from "../../components/KineticHeadline";
import { PhoneMockup } from "../../components/PhoneMockup";
import { prog } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { LiveScreen } from "../screens";
import { TL_PHONE, TL_PHONE_H } from "./Scene01Hook";

const PARK = { left: 390, top: 640, width: 300 };

/** 0:04–0:07 PATTERN INTERRUPT. Freeze on the dead live, trace and shrink the phone; the headline reframes the problem. */
export const Scene02Interrupt: React.FC = () => {
  const frame = useCurrentFrame();
  const k = prog(frame, 2, 16, EASE.inOut);
  const scale = 1 + (PARK.width / TL_PHONE.width - 1) * k;
  const x = (PARK.left - TL_PHONE.left) * k;
  const y = (PARK.top - TL_PHONE.top) * k;
  const trace = prog(frame, 0, 12, EASE.inOut);
  const perim = 2 * (TL_PHONE.width + TL_PHONE_H);
  const heat = prog(frame, 40, 20);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 60%, ${COLORS.navySoft} 0%, ${COLORS.navy} 55%, ${COLORS.navyDeep} 100%)` }}>
      <div style={{ position: "absolute", left: TL_PHONE.left, top: TL_PHONE.top, transformOrigin: "0 0", transform: `translate(${x}px,${y}px) scale(${scale})` }}>
        <div style={{ position: "absolute", inset: -60, borderRadius: 120, background: `radial-gradient(closest-side, rgba(200,134,10,${0.28 * heat}), transparent)` }} />
        <PhoneMockup width={TL_PHONE.width} finish="silver">
          <LiveScreen t={120} viewers={1514} level={3} alert={0} ended={1} />
        </PhoneMockup>
        <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={TL_PHONE.width} height={TL_PHONE_H}>
          <rect x={-10} y={-10} width={TL_PHONE.width + 20} height={TL_PHONE_H + 20} rx={TL_PHONE.width * 0.17} fill="none" stroke={COLORS.pearl} strokeWidth={5 / Math.max(scale, 0.3)} strokeDasharray={`${perim} ${perim}`} strokeDashoffset={perim * (1 - trace)} />
        </svg>
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 176, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 60, color: COLORS.pearl, opacity: prog(frame, 10, 10) }}>Ramai tak tahu…</div>
      <KineticHeadline start={16} gap={8} size={96} color={COLORS.pearl} lines={[{ text: "LIVE NI KERJA" }]} style={{ position: "absolute", left: CONTENT.left, top: 256, width: CONTENT.width }} />
      <div style={{ position: "absolute", left: CONTENT.left - 12, top: 362, padding: "0 12px", borderRadius: 14, background: COLORS.blue, transformOrigin: "0 50%", transform: `scaleX(${prog(frame, 30, 10, EASE.inOut)})` }}>
        <div style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 96, letterSpacing: "-0.045em", color: COLORS.pearl, lineHeight: 1.05, opacity: prog(frame, 34, 6) }}>PALING BERAT</div>
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 490, fontFamily: FONTS.body, fontWeight: 600, fontSize: 52, color: COLORS.pearl, opacity: prog(frame, 44, 10), transform: `translateY(${(1 - prog(frame, 44, 10)) * 16}px)` }}>untuk bateri.</div>
    </AbsoluteFill>
  );
};
