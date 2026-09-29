import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { PhoneMockup } from "../../components/PhoneMockup";
import { LowBatteryScreen } from "../../components/PhoneScreens";
import { motionBlur, prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { CounterPhoto, MACRO } from "./V2Scene01Hook";

const CARD = { top: 440, h: 560, w: 420 };
const A_X = CONTENT.left;
const B_X = CONTENT.right - CARD.w;
const ICON = { left: A_X + 40, top: CARD.top + 44, width: 92 };

const HealthIcon: React.FC = () => (
  <svg width="92" height="140" viewBox="0 0 92 140">
    <rect x="10" y="12" width="72" height="122" rx="16" fill="none" stroke={COLORS.pearl} strokeWidth="6" />
    <rect x="32" y="2" width="28" height="10" rx="4" fill={COLORS.pearl} />
    <rect x="10" y="12" width="72" height="30" rx="0" fill="none" stroke={COLORS.pearl} strokeWidth="4" strokeDasharray="6 7" opacity="0.55" />
    <rect x="20" y="48" width="52" height="76" rx="8" fill={COLORS.pearl} opacity="0.9" />
  </svg>
);

const Card: React.FC<{ x: number; bg: string; title: string[]; sub: string; start: number; icon?: React.ReactNode }> = ({ x, bg, title, sub, start, icon }) => {
  const frame = useCurrentFrame();
  const open = prog(frame, start, 14, EASE.out);
  const textY = (i: number) => tween(frame, start + 6 + i * 3, 14, 110, 0, EASE.out);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: CARD.top,
        width: CARD.w,
        height: CARD.h,
        borderRadius: 36,
        background: bg,
        clipPath: `inset(${(1 - open) * 100}% 0 0 0 round 36px)`,
        boxShadow: "0 30px 70px rgba(0,0,0,0.3)",
        padding: "40px 34px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {icon ? <div style={{ position: "absolute", right: 40, top: 44 }}>{icon}</div> : null}
      {title.map((t, i) => (
        <div key={t} style={{ overflow: "hidden", paddingBottom: 10, marginBottom: -10 }}>
          <div style={{ transform: `translateY(${textY(i)}%)`, fontFamily: FONTS.heading, fontWeight: 700, fontSize: 72, letterSpacing: "-0.045em", lineHeight: 1.0, color: COLORS.pearl }}>{t}</div>
        </div>
      ))}
      <div style={{ marginTop: 18, height: 3, width: `${prog(frame, start + 14, 12, EASE.inOut) * 100}%`, background: "rgba(247,247,248,0.35)" }} />
      <div style={{ marginTop: 14, fontFamily: FONTS.body, fontWeight: 500, fontSize: 30, color: COLORS.pearl, opacity: 0.8 * prog(frame, start + 16, 10) }}>{sub}</div>
    </div>
  );
};

/**
 * VARIATION B · 0:02.5–0:05. Freeze → a pearl outline traces the phone (mask separation) →
 * the phone shrinks INTO card A (it literally becomes "Battery %") → card B → the ≠ badge.
 */
export const V2Scene02Interrupt: React.FC = () => {
  const frame = useCurrentFrame();
  const trace = prog(frame, 0, 10, EASE.inOut);
  const navy = prog(frame, 4, 10, EASE.inOut);
  const shrink = (f: number) => prog(f, 12, 16, EASE.inOut);
  const k = shrink(frame);
  const scale = 1 + (ICON.width / MACRO.width - 1) * k;
  const x = (ICON.left - MACRO.left) * k;
  const y = (ICON.top - MACRO.top) * k;
  const badge = prog(frame, 38, 12, EASE.back);
  const eyebrow = prog(frame, 8, 12);
  const push = tween(frame, 50, 40, 1, 1.03, EASE.inOut);
  const phoneH = MACRO.width * (146.7 / 71.5);
  const perim = 2 * (MACRO.width + phoneH);
  return (
    <AbsoluteFill style={{ background: COLORS.navy }}>
      <CounterPhoto blur={18} dim={0.55} />
      <AbsoluteFill style={{ background: `radial-gradient(80% 55% at 50% 45%, ${COLORS.navySoft} 0%, ${COLORS.navy} 55%, ${COLORS.navyDeep} 100%)`, opacity: navy }} />
      <AbsoluteFill style={{ transform: `scale(${push})`, transformOrigin: "50% 45%" }}>
        <div style={{ position: "absolute", left: CONTENT.left, top: 190, width: CONTENT.width, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 64, color: COLORS.pearl, opacity: eyebrow, transform: `translateY(${(1 - eyebrow) * 18}px)` }}>
          Ramai tak tahu…
        </div>
        <div style={{ position: "absolute", left: CONTENT.left, top: 290, width: CONTENT.width * prog(frame, 10, 20, EASE.inOut), height: 2, background: COLORS.hairlineOnNavy }} />
        <Card x={A_X} bg={COLORS.navySoft} title={["BATTERY", "%"]} sub="baki caj · sekarang" start={16} />
        <Card x={B_X} bg={COLORS.blue} title={["BATTERY", "HEALTH"]} sub="kapasiti · sepanjang masa" start={24} icon={<HealthIcon />} />
        {/* ≠ badge bridging the two cards */}
        <div
          style={{
            position: "absolute",
            left: 540 - 78,
            top: CARD.top + 70,
            width: 156,
            height: 156,
            borderRadius: 78,
            background: COLORS.pearl,
            boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${badge}) rotate(${(1 - badge) * -40}deg)`,
            fontFamily: FONTS.heading,
            fontWeight: 500,
            fontSize: 110,
            lineHeight: 1,
            color: COLORS.navy,
            paddingBottom: 8,
          }}
        >
          ≠
        </div>
      </AbsoluteFill>
      {/* the separated phone travels into card A's icon slot */}
      <div
        style={{
          position: "absolute",
          left: MACRO.left,
          top: MACRO.top,
          transformOrigin: "0 0",
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
          filter: `grayscale(${0.6 * (1 - k)}) blur(${motionBlur((f) => shrink(f) * 600, frame, 0.02)}px)`,
          opacity: 1,
        }}
      >
        <PhoneMockup width={MACRO.width} shadow={k < 0.5}>
          <LowBatteryScreen alert={1 - k} level={4} />
        </PhoneMockup>
        <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={MACRO.width} height={phoneH}>
          <rect
            x={-10}
            y={-10}
            width={MACRO.width + 20}
            height={phoneH + 20}
            rx={MACRO.width * 0.17}
            fill="none"
            stroke={COLORS.pearl}
            strokeWidth={6 / Math.max(scale, 0.2)}
            strokeDasharray={`${perim} ${perim}`}
            strokeDashoffset={perim * (1 - trace)}
            opacity={1 - k}
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
