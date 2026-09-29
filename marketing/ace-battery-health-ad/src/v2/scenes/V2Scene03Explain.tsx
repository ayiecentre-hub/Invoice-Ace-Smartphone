import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Connector } from "../../components/Connector";
import { PhoneMockup } from "../../components/PhoneMockup";
import { BatteryHealthScreen } from "../../components/PhoneScreens";
import { prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { MiniChart } from "../components/MiniChart";
import { SegmentBattery } from "../components/SegmentBattery";
import { ZoomCallout } from "../components/ZoomCallout";

const COL_W = 420;
const LX = CONTENT.left; // 72
const RX = CONTENT.right - COL_W; // 540
const CARD_TOP = 668;
const CARD_H = 206;
const PHONE = { left: RX + (COL_W - 300) / 2, top: 262, width: 300, cropH: 372 };

const Chip: React.FC<{ text: string; bg: string; p: number }> = ({ text, bg, p }) => (
  <div style={{ display: "inline-block", padding: "12px 22px", borderRadius: 14, background: bg, color: COLORS.pearl, fontFamily: FONTS.heading, fontWeight: 700, fontSize: 32, letterSpacing: "0.02em", opacity: p, transform: `translateY(${(1 - p) * 18}px)` }}>
    {text}
  </div>
);

const ValueCard: React.FC<{ x: number; label: string; value: string; color: string; p: number; labelRef?: React.ReactNode }> = ({ x, label, value, color, p, labelRef }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: CARD_TOP,
      width: COL_W,
      height: CARD_H,
      borderRadius: 28,
      background: "#fff",
      boxShadow: "0 24px 56px rgba(26,26,46,0.12)",
      opacity: p,
      transform: `translateY(${(1 - p) * 30}px) scale(${0.96 + 0.04 * p})`,
    }}
  >
    <div style={{ position: "absolute", left: 28, top: 22, fontFamily: FONTS.ios, fontSize: 32, color: "#000" }}>
      {label}
      {labelRef}
    </div>
    <div style={{ position: "absolute", right: 28, bottom: 8, fontFamily: FONTS.heading, fontWeight: 700, fontSize: 128, letterSpacing: "-0.05em", lineHeight: 1, color, fontVariantNumeric: "tabular-nums" }}>{value}</div>
  </div>
);

const SubLabel: React.FC<{ x: number; text: string; p: number }> = ({ x, text, p }) => (
  <div style={{ position: "absolute", left: x, top: CARD_TOP + CARD_H + 20, width: COL_W, textAlign: "center", fontFamily: FONTS.body, fontWeight: 700, fontSize: 26, letterSpacing: "0.1em", color: COLORS.grey, opacity: p }}>
    {text}
  </div>
);

/**
 * VARIATION B · 0:05–0:09. "Two clocks": left number moves by the HOUR, right number
 * moves over the YEARS. Magnifier pulls "Maximum Capacity 76%" out of the real screen.
 */
export const V2Scene03Explain: React.FC = () => {
  const frame = useCurrentFrame();
  const drop = prog(frame, 0, 12, EASE.inOut);
  const leftLevel = tween(frame, 4, 22, 100, 30, EASE.inOut);
  const leftFocus = frame < 46 ? 1 : 1 - 0.62 * prog(frame, 46, 10);
  const rightOn = prog(frame, 44, 12);
  const zoom = prog(frame, 50, 20, EASE.inOut);
  const rCard = prog(frame, 60, 12);
  const cap = tween(frame, 62, 16, 100, 76, EASE.inOut);
  const track = prog(frame, 76, 12, EASE.inOut);
  const underline = prog(frame, 86, 10, EASE.inOut);
  const ring = prog(frame, 70, 10, EASE.back);

  // Maximum Capacity row inside the cropped phone (screen 0.704 vertical / 0.714 horizontal scale)
  const bez = PHONE.width * 0.036;
  const rowSrc = { x: PHONE.left + bez + 16 * 0.714, y: PHONE.top + bez + 246 * 0.704, w: 358 * 0.714, h: 46 * 0.704 };

  return (
    <AbsoluteFill style={{ clipPath: `inset(0 0 ${(1 - drop) * 100}% 0)` }}>
      <AbsoluteFill style={{ background: COLORS.pearl }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: `${drop * 100}%`, height: 8, marginTop: -8, background: COLORS.blue, opacity: drop < 1 ? 1 : 0 }} />
      <div style={{ position: "absolute", left: 515, top: 186, width: 2, height: 1000 * prog(frame, 6, 20, EASE.inOut), background: COLORS.hairline }} />

      {/* LEFT: Battery % (changes by the hour) */}
      <div style={{ opacity: leftFocus }}>
        <div style={{ position: "absolute", left: LX, top: 186 }}>
          <Chip text="BATTERY %" bg={COLORS.navy} p={prog(frame, 2, 12)} />
        </div>
        <div style={{ position: "absolute", left: LX + (COL_W - 350) / 2, top: 380 }}>
          <SegmentBattery width={330} level={leftLevel} />
        </div>
        <ValueCard x={LX} label="Status bar" value={`${Math.round(leftLevel)}%`} color={COLORS.navy} p={prog(frame, 6, 12)} />
        <SubLabel x={LX} text="BAKI CAJ SEKARANG" p={prog(frame, 18, 12)} />
        <div style={{ position: "absolute", left: LX + 10, top: 960 }}>
          <MiniChart
            width={COL_W - 20}
            height={210}
            title="BERUBAH SETIAP JAM"
            points={[[0, 1], [0.34, 0.58], [0.42, 0.95], [1, 0.3]]}
            progress={prog(frame, 14, 26, EASE.inOut)}
            color={COLORS.navy}
            startLabel="7 pagi"
            endLabel="sekarang"
            markerLabel="30%"
          />
        </div>
      </div>

      {/* RIGHT: Battery Health (changes over the years) */}
      <div style={{ opacity: 0.3 + 0.7 * rightOn }}>
        <div style={{ position: "absolute", left: RX, top: 186 }}>
          <Chip text="BATTERY HEALTH" bg={COLORS.blue} p={prog(frame, 6, 12)} />
        </div>
        <div style={{ position: "absolute", left: PHONE.left, top: PHONE.top, width: PHONE.width, height: PHONE.cropH, overflow: "hidden", WebkitMaskImage: "linear-gradient(180deg,#000 72%,transparent 100%)", maskImage: "linear-gradient(180deg,#000 72%,transparent 100%)" }}>
          <PhoneMockup width={PHONE.width} shadow={false}>
            <BatteryHealthScreen focus={ring} />
          </PhoneMockup>
        </div>
        <ZoomCallout from={rowSrc} to={{ x: RX, y: CARD_TOP, w: COL_W, h: CARD_H }} progress={zoom} />
        <ValueCard
          x={RX}
          label="Maximum Capacity"
          value={`${Math.round(cap)}%`}
          color={COLORS.blue}
          p={rCard}
          labelRef={<div style={{ position: "absolute", left: 0, top: 44, height: 5, borderRadius: 3, width: `${underline * 100}%`, background: COLORS.blue }} />}
        />
        {/* tracking line: 76% → "Maximum Capacity" */}
        <Connector
          points={[
            [RX + 200, CARD_TOP + 150],
            [RX + 30, CARD_TOP + 150],
            [RX + 30, CARD_TOP + 76],
          ]}
          progress={track}
          color={COLORS.blue}
          width={3.5}
        />
        <SubLabel x={RX} text="KEADAAN KAPASITI BATERI" p={prog(frame, 72, 12)} />
        <div style={{ position: "absolute", left: RX + 10, top: 960 }}>
          <MiniChart
            width={COL_W - 20}
            height={210}
            title="BERUBAH BERTAHUN"
            points={[[0, 1], [0.25, 0.95], [0.5, 0.89], [0.75, 0.83], [1, 0.76]]}
            progress={prog(frame, 72, 26, EASE.inOut)}
            color={COLORS.blue}
            startLabel="baru"
            endLabel="sekarang"
            markerLabel="76%"
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
