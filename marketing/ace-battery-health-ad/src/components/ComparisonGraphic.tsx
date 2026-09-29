import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, EASE, FONTS } from "../theme";
import { motionBlur, prog, tween } from "../lib/anim";

type Props = { start: number };

const Card: React.FC<{
  label: string;
  caption: string;
  bg: string;
  fg: string;
  p: number;
  fromX: number;
  frame: number;
  start: number;
}> = ({ label, caption, bg, fg, p, fromX, frame, start }) => {
  const x = (f: number) => tween(f, start, 16, fromX, 0, EASE.out);
  const textY = tween(frame, start + 5, 14, 100, 0, EASE.out);
  return (
    <div
      style={{
        width: 888,
        height: 250,
        borderRadius: 34,
        background: bg,
        transform: `translateX(${x(frame)}px) scale(${0.96 + 0.04 * p})`,
        filter: `blur(${motionBlur(x, frame, 0.04)}px)`,
        opacity: Math.min(1, p * 2.5),
        padding: "0 56px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxShadow: "0 30px 70px rgba(0,0,0,0.25)",
        overflow: "hidden",
      }}
    >
      <div style={{ overflow: "hidden", paddingBottom: 18, marginBottom: -18 }}>
        <div
          style={{
            transform: `translateY(${textY}%)`,
            fontFamily: FONTS.heading,
            fontWeight: 700,
            fontSize: 104,
            letterSpacing: "-0.045em",
            color: fg,
            lineHeight: 1.02,
          }}
        >
          {label}
        </div>
      </div>
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: 32,
          fontWeight: 500,
          color: fg,
          opacity: 0.72 * prog(frame, start + 12, 10),
          marginTop: 8,
        }}
      >
        {caption}
      </div>
    </div>
  );
};

/** BATTERY % ≠ BATTERY HEALTH — two cards, drawn connectors, the ≠ lands last. */
export const ComparisonGraphic: React.FC<Props> = ({ start }) => {
  const frame = useCurrentFrame();
  const a = prog(frame, start, 16);
  const b = prog(frame, start + 12, 16);
  const ne = prog(frame, start + 26, 12, EASE.back);
  const line = prog(frame, start + 20, 12, EASE.inOut);
  return (
    <div style={{ position: "relative", width: 888 }}>
      <Card label="Battery %" caption="baki caj sekarang" bg={COLORS.pearl} fg={COLORS.navy} p={a} fromX={-420} frame={frame} start={start} />
      <div style={{ position: "relative", height: 200 }}>
        {/* connectors: two hairlines draw toward the symbol */}
        <div style={{ position: "absolute", left: 444 - 1.5, top: 0, width: 3, height: 60 * line, background: COLORS.hairlineOnNavy }} />
        <div style={{ position: "absolute", left: 444 - 1.5, bottom: 0, width: 3, height: 60 * line, background: COLORS.hairlineOnNavy }} />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 36,
            textAlign: "center",
            fontFamily: FONTS.heading,
            fontWeight: 500,
            fontSize: 150,
            lineHeight: 1,
            color: COLORS.pearl,
            opacity: ne,
            transform: `scale(${0.4 + 0.6 * ne}) rotate(${(1 - ne) * -25}deg)`,
          }}
        >
          ≠
        </div>
      </div>
      <Card
        label="Battery Health"
        caption="keadaan kapasiti bateri"
        bg={COLORS.blue}
        fg={COLORS.pearl}
        p={b}
        fromX={420}
        frame={frame}
        start={start + 12}
      />
    </div>
  );
};
