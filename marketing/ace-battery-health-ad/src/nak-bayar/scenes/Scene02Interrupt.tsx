import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Connector } from "../../components/Connector";
import { PhoneMockup } from "../../components/PhoneMockup";
import { prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { PayScanScreen } from "../screens";
import { NB_PHONE, NB_PHONE_H } from "./Scene01Hook";

const PARK = { left: 390, top: 700, width: 300 };

/**
 * 0:04–0:07 PATTERN INTERRUPT. Freeze on the black screen. A "rewind" callout shows what the
 * status bar said a moment ago (18%), then the real question lands: kenapa boleh mati?
 */
export const Scene02Interrupt: React.FC = () => {
  const frame = useCurrentFrame();
  const k = prog(frame, 2, 16, EASE.inOut);
  const scale = 1 + (PARK.width / NB_PHONE.width - 1) * k;
  const x = (PARK.left - NB_PHONE.left) * k;
  const y = (PARK.top - NB_PHONE.top) * k;
  const trace = prog(frame, 0, 12, EASE.inOut);
  const perim = 2 * (NB_PHONE.width + NB_PHONE_H);
  const ghost = prog(frame, 16, 10);
  const q = prog(frame, 42, 10, EASE.back);
  // status bar battery on the parked phone (right side of the notch row)
  const batX = PARK.left + PARK.width * 0.84;
  const batY = PARK.top + 26;
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 60%, ${COLORS.navySoft} 0%, ${COLORS.navy} 55%, ${COLORS.navyDeep} 100%)` }}>
      <div style={{ position: "absolute", left: NB_PHONE.left, top: NB_PHONE.top, transformOrigin: "0 0", transform: `translate(${x}px,${y}px) scale(${scale})` }}>
        <PhoneMockup width={NB_PHONE.width}>
          <PayScanScreen lock={1} off={1 - ghost * 0.55} level={18} />
        </PhoneMockup>
        <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={NB_PHONE.width} height={NB_PHONE_H}>
          <rect x={-10} y={-10} width={NB_PHONE.width + 20} height={NB_PHONE_H + 20} rx={NB_PHONE.width * 0.17} fill="none" stroke={COLORS.pearl} strokeWidth={5 / Math.max(scale, 0.3)} strokeDasharray={`${perim} ${perim}`} strokeDashoffset={perim * (1 - trace)} />
        </svg>
      </div>
      <Connector points={[[batX, batY], [batX, 560], [CONTENT.right - 180, 560]]} progress={prog(frame, 18, 10, EASE.inOut)} color={COLORS.pearl} width={3} />
      <div style={{ position: "absolute", left: CONTENT.right - 330, top: 470, padding: "14px 22px", borderRadius: 16, background: COLORS.pearl, fontFamily: FONTS.body, fontWeight: 700, fontSize: 30, color: COLORS.navy, opacity: prog(frame, 24, 8), transform: `translateY(${(1 - prog(frame, 24, 8)) * 14}px)` }}>
        Tadi masih <span style={{ color: COLORS.blue, fontVariantNumeric: "tabular-nums" }}>{Math.round(tween(frame, 24, 12, 0, 18, EASE.out))}%</span>
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 176, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 62, color: COLORS.pearl, opacity: prog(frame, 10, 10) }}>Padahal tadi masih 18%…</div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 262, fontFamily: FONTS.heading, fontWeight: 700, fontSize: 112, letterSpacing: "-0.045em", color: COLORS.pearl, transform: `scale(${q})`, transformOrigin: "0 60%", opacity: q > 0 ? 1 : 0 }}>
        Kenapa <span style={{ background: COLORS.blue, borderRadius: 14, padding: "0 14px" }}>mati?</span>
      </div>
    </AbsoluteFill>
  );
};
