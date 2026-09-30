import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { PhoneMockup } from "../../components/PhoneMockup";
import { prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { BigBatteryScreen } from "../../bateri-merah/screens";
import { PC_PHONE, PC_PHONE_H } from "./Scene01Hook";

const PARK = { left: 330, top: 640, width: 420 };

/**
 * 0:04–0:07 PATTERN INTERRUPT. The phone rewinds: clock 12:15 → 7:30, battery 1% → 100%.
 * Then the real question: kurang 5 jam je?
 */
export const Scene02Interrupt: React.FC = () => {
  const frame = useCurrentFrame();
  const k = prog(frame, 0, 14, EASE.inOut);
  const scale = 1 + (PARK.width / PC_PHONE.width - 1) * k;
  const x = (PARK.left - PC_PHONE.left) * k;
  const y = (PARK.top - PC_PHONE.top) * k;
  const rw = prog(frame, 8, 22, EASE.inOut);
  const level = Math.round(1 + 99 * rw);
  const mins = Math.round(12 * 60 + 15 - rw * (4 * 60 + 45));
  const time = `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
  const perim = 2 * (PC_PHONE.width + PC_PHONE_H);
  const trace = prog(frame, 0, 12, EASE.inOut);
  const q = prog(frame, 42, 10, EASE.back);
  const spin = tween(frame, 8, 22, 0, -720, EASE.inOut);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 60%, ${COLORS.navySoft} 0%, ${COLORS.navy} 55%, ${COLORS.navyDeep} 100%)` }}>
      <div style={{ position: "absolute", left: PC_PHONE.left, top: PC_PHONE.top, transformOrigin: "0 0", transform: `translate(${x}px,${y}px) scale(${scale})` }}>
        <PhoneMockup width={PC_PHONE.width} finish="silver">
          <BigBatteryScreen level={level} pulse={1} time={time} />
        </PhoneMockup>
        <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={PC_PHONE.width} height={PC_PHONE_H}>
          <rect x={-10} y={-10} width={PC_PHONE.width + 20} height={PC_PHONE_H + 20} rx={PC_PHONE.width * 0.17} fill="none" stroke={COLORS.pearl} strokeWidth={5} strokeDasharray={`${perim} ${perim}`} strokeDashoffset={perim * (1 - trace)} />
        </svg>
      </div>
      {/* rewind glyph */}
      <div style={{ position: "absolute", left: CONTENT.right - 150, top: 560, width: 130, height: 130, opacity: prog(frame, 6, 6) * (1 - prog(frame, 34, 8)) }}>
        <svg width="130" height="130" viewBox="0 0 130 130" style={{ transform: `rotate(${spin}deg)` }}>
          <circle cx="65" cy="65" r="56" fill="none" stroke={COLORS.pearl} strokeWidth="5" strokeDasharray="300 52" />
          <path d="M65 9 l-18 -2 l12 14 z" fill={COLORS.pearl} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.body, fontWeight: 700, fontSize: 22, color: COLORS.pearl, letterSpacing: "0.1em" }}>REWIND</div>
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 176, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 62, color: COLORS.pearl, opacity: prog(frame, 10, 10) }}>Pagi tadi 100%…</div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 262, fontFamily: FONTS.heading, fontWeight: 700, fontSize: 104, letterSpacing: "-0.045em", color: COLORS.pearl, transform: `scale(${q})`, transformOrigin: "0 60%", opacity: q > 0 ? 1 : 0 }}>
        Kurang <span style={{ background: COLORS.blue, borderRadius: 14, padding: "0 14px" }}>5 jam</span> je?
      </div>
    </AbsoluteFill>
  );
};
