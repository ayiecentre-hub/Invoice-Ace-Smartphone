import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { KineticHeadline } from "../components/KineticHeadline";
import { prog, tween } from "../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../theme";

const PUNCH = "MENEKAN-NEKAN.";

/**
 * "Tak menekan-nekan" literally means "no pressing". Each letter is gently pressed down
 * and released: a quiet visual pun for "no pressure", timed to the spoken phrase.
 */
const PressedWord: React.FC<{ start: number; frame: number }> = ({ start, frame }) => (
  <div style={{ display: "flex", fontFamily: FONTS.heading, fontWeight: 700, fontSize: 92, letterSpacing: "-0.04em", color: COLORS.blue, lineHeight: 1 }}>
    {PUNCH.split("").map((ch, i) => {
      const s = start + i * 0.7;
      const inP = prog(frame, s, 10);
      const press = tween(frame, s + 6, 4, 0, 1, EASE.out) - tween(frame, s + 10, 6, 0, 1, EASE.out);
      return (
        <span
          key={i}
          style={{
            display: "inline-block",
            transformOrigin: "50% 100%",
            opacity: inP,
            transform: `translateY(${(1 - inP) * 40 + press * 6}px) scaleY(${1 - press * 0.16}) scaleX(${1 + press * 0.05})`,
          }}
        >
          {ch}
        </span>
      );
    })}
  </div>
);

/** 0:16–0:18 — The trust line, one phrase per beat. */
export const Scene06Trust: React.FC = () => {
  const frame = useCurrentFrame();
  const reveal = prog(frame, 0, 12, EASE.inOut);
  const dim1 = tween(frame, 17, 8, 1, 0.28);
  const dim2 = tween(frame, 33, 8, 1, 0.28);
  const underline = prog(frame, 46, 10, EASE.inOut);
  const push = tween(frame, 0, 72, 1, 1.04, EASE.linear);
  return (
    <AbsoluteFill style={{ clipPath: `circle(${reveal * 130}% at 50% 52%)` }}>
      <AbsoluteFill style={{ background: COLORS.pearl }} />
      <AbsoluteFill style={{ transform: `scale(${push})`, transformOrigin: "30% 50%" }}>
        <div style={{ position: "absolute", left: CONTENT.left, top: 500, width: CONTENT.width }}>
          <div style={{ opacity: dim1 }}>
            <KineticHeadline start={2} size={112} lines={[{ text: "CHECK DULU." }]} />
          </div>
          <div style={{ opacity: dim2, marginTop: 34 }}>
            <KineticHeadline start={19} size={112} lines={[{ text: "HARGA JELAS." }]} />
          </div>
          <div style={{ marginTop: 58 }}>
            <KineticHeadline start={35} size={92} color={COLORS.blue} lines={[{ text: "TAK" }]} />
            <div style={{ marginTop: 6 }}>
              <PressedWord start={36} frame={frame} />
            </div>
            <div style={{ marginTop: 22, width: 220 * underline, height: 5, borderRadius: 3, background: COLORS.gold }} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
