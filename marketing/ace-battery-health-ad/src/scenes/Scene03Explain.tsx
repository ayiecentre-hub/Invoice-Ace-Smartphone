import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BatteryHealthCard, CARD_ROW_H } from "../components/BatteryHealthCard";
import { BatteryIndicator } from "../components/BatteryIndicator";
import { Connector } from "../components/Connector";
import { prog, tween } from "../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../theme";

const COL_W = 420;
const LEFT_X = CONTENT.left; // 72
const RIGHT_X = CONTENT.right - COL_W; // 540
const DIVIDER_X = 516;

const Chip: React.FC<{ text: string; bg: string; p: number }> = ({ text, bg, p }) => (
  <div
    style={{
      display: "inline-block",
      padding: "12px 22px",
      borderRadius: 14,
      background: bg,
      color: COLORS.pearl,
      fontFamily: FONTS.heading,
      fontWeight: 700,
      fontSize: 32,
      letterSpacing: "0.02em",
      opacity: p,
      transform: `translateY(${(1 - p) * 20}px)`,
    }}
  >
    {text}
  </div>
);

const Column: React.FC<{
  x: number;
  chip: React.ReactNode;
  graphic: React.ReactNode;
  value: string;
  valueColor: string;
  label: string;
  body: string;
  focus: number;
  labelP: number;
}> = ({ x, chip, graphic, value, valueColor, label, body, focus, labelP }) => (
  <div style={{ position: "absolute", left: x, top: 186, width: COL_W, opacity: 0.32 + 0.68 * focus }}>
    <div style={{ height: 80 }}>{chip}</div>
    <div style={{ height: 380, display: "flex", justifyContent: "center", alignItems: "flex-end" }}>{graphic}</div>
    <div
      style={{
        marginTop: 22,
        textAlign: "center",
        fontFamily: FONTS.heading,
        fontWeight: 700,
        fontSize: 164,
        letterSpacing: "-0.05em",
        lineHeight: 1,
        color: valueColor,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {value}
    </div>
    <div
      style={{
        marginTop: 16,
        textAlign: "center",
        fontFamily: FONTS.body,
        fontWeight: 700,
        fontSize: 26,
        letterSpacing: "0.1em",
        color: COLORS.grey,
        opacity: labelP,
      }}
    >
      {label}
    </div>
    <div
      style={{
        marginTop: 14,
        textAlign: "center",
        fontFamily: FONTS.body,
        fontWeight: 500,
        fontSize: 33,
        lineHeight: 1.25,
        color: COLORS.navy,
        opacity: labelP,
        transform: `translateY(${(1 - labelP) * 14}px)`,
      }}
    >
      {body}
    </div>
  </div>
);

/**
 * 0:05–0:09 — The difference. Left: the SAME tank, less charge (100 → 30).
 * Right: FULL charge, SMALLER tank (capacity 100 → 76). Then a UI zoom proves where 76% lives.
 */
export const Scene03Explain: React.FC = () => {
  const frame = useCurrentFrame();
  const open = prog(frame, 0, 12, EASE.inOut);
  const divider = prog(frame, 4, 18, EASE.inOut);
  const leftLevel = tween(frame, 6, 18, 100, 30, EASE.inOut);
  const rightCap = tween(frame, 56, 16, 100, 76, EASE.inOut);
  const leftFocus = frame < 50 ? 1 : 1 - prog(frame, 50, 10);
  const rightFocus = frame < 50 ? 0 : prog(frame, 50, 10);
  const leftLabel = prog(frame, 22, 12);
  const rightLabel = prog(frame, 70, 12);
  const card = prog(frame, 66, 14);
  const line = prog(frame, 76, 16, EASE.inOut);
  const ring = prog(frame, 84, 10, EASE.back);
  const underline = prog(frame, 92, 12, EASE.inOut);

  const cardTop = 1112;
  const valueX = CONTENT.right - 40 - 62; // centre of "76%" in the zoomed row
  const rowMid = cardTop + 48 + CARD_ROW_H / 2;

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: COLORS.pearl,
          clipPath: `inset(0 ${(1 - open) * 50}% 0 ${(1 - open) * 50}%)`,
        }}
      >
        {/* split-screen divider */}
        <div
          style={{
            position: "absolute",
            left: DIVIDER_X,
            top: 190,
            width: 2,
            height: 830 * divider,
            background: COLORS.hairline,
          }}
        />
        <Column
          x={LEFT_X}
          chip={<Chip text="BATTERY %" bg={COLORS.navy} p={prog(frame, 4, 12)} />}
          graphic={<BatteryIndicator width={180} height={340} level={leftLevel} />}
          value={`${Math.round(leftLevel)}%`}
          valueColor={COLORS.navy}
          label="BAKI CAJ SEKARANG"
          body="Berapa banyak caj ada sekarang."
          focus={leftFocus}
          labelP={leftLabel}
        />
        <Column
          x={RIGHT_X}
          chip={<Chip text="BATTERY HEALTH" bg={COLORS.blue} p={prog(frame, 8, 12)} />}
          graphic={
            <BatteryIndicator width={180} height={340} level={100} capacity={rightCap} showGhost={rightFocus > 0.5} ghostLabel="asal" />
          }
          value={`${Math.round(rightCap)}%`}
          valueColor={COLORS.blue}
          label="KEADAAN KAPASITI BATERI"
          body="Berapa banyak caj bateri mampu simpan."
          focus={Math.max(0.35, rightFocus)}
          labelP={rightLabel}
        />
        {/* UI zoom of the iPhone screen */}
        <div
          style={{
            position: "absolute",
            left: CONTENT.left,
            top: cardTop,
            opacity: card,
            transform: `translateY(${(1 - card) * 60}px)`,
          }}
        >
          <BatteryHealthCard width={CONTENT.width} focus={ring} underline={underline} />
        </div>
        {/* tracking line: big 76% → the 76% on the iPhone screen */}
        <Connector
          points={[
            [RIGHT_X + COL_W / 2 + 156, 752],
            [992, 752],
            [992, rowMid],
            [valueX + 96, rowMid],
          ]}
          progress={line}
          color={COLORS.blue}
          width={4}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
