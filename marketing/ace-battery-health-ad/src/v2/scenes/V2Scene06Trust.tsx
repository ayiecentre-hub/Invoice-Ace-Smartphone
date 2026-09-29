import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { motionBlur, prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";

/** A line that lands centre-stage, then steps back (moves up, shrinks, dims) for the next. */
const Beat: React.FC<{ text: string; start: number; retireAt?: number; restTop: number }> = ({ text, start, retireAt, restTop }) => {
  const frame = useCurrentFrame();
  const y = (f: number) => tween(f, start, 12, 110, 0, EASE.out);
  const retire = retireAt === undefined ? 0 : prog(frame, retireAt, 8, EASE.inOut);
  const top = tween(retire, 0, 1, 690, restTop, EASE.linear);
  const scale = 1 - 0.45 * retire;
  return (
    <div style={{ position: "absolute", left: CONTENT.left, top, transformOrigin: "0 0", transform: `scale(${scale})`, opacity: 1 - 0.55 * retire }}>
      <div style={{ overflow: "hidden", paddingBottom: 14, marginBottom: -14 }}>
        <div
          style={{
            transform: `translateY(${y(frame)}%)`,
            filter: `blur(${motionBlur(y, frame, 0.08)}px)`,
            fontFamily: FONTS.heading,
            fontWeight: 700,
            fontSize: 124,
            letterSpacing: "-0.045em",
            lineHeight: 1,
            color: COLORS.pearl,
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

/**
 * VARIATION B · 0:16–0:18. Tight tracking reads as tension; the punchline starts squeezed
 * (letters crowded, "pressure") and exhales to relaxed spacing: "tak menekan-nekan".
 */
export const V2Scene06Trust: React.FC = () => {
  const frame = useCurrentFrame();
  const band = prog(frame, 32, 8, EASE.inOut);
  const text = prog(frame, 39, 6);
  const exhale = prog(frame, 42, 13, EASE.inOut);
  const tracking = tween(exhale, 0, 1, -0.14, -0.03, EASE.linear);
  const squeeze = 0.9 + 0.1 * exhale;
  const gold = prog(frame, 50, 10, EASE.inOut);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 40% 45%, ${COLORS.navySoft} 0%, ${COLORS.navy} 60%, ${COLORS.navyDeep} 100%)` }}>
      <Beat text="CHECK DULU." start={3} retireAt={15} restTop={420} />
      <Beat text="HARGA JELAS." start={19} retireAt={31} restTop={512} />
      <div
        style={{
          position: "absolute",
          left: CONTENT.left - 24,
          top: 650,
          width: CONTENT.width + 48,
          height: 290,
          borderRadius: 34,
          background: COLORS.blue,
          transform: `scaleX(${band})`,
          transformOrigin: "0 50%",
          boxShadow: "0 30px 70px rgba(0,0,0,0.3)",
        }}
      />
      <div style={{ position: "absolute", left: CONTENT.left + 10, top: 684, opacity: text, transform: `translateY(${(1 - text) * 30}px)` }}>
        <div style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 78, letterSpacing: "-0.03em", color: COLORS.pearl, lineHeight: 1 }}>TAK</div>
        <div
          style={{
            marginTop: 12,
            fontFamily: FONTS.heading,
            fontWeight: 700,
            fontSize: 94,
            lineHeight: 1,
            color: COLORS.pearl,
            letterSpacing: `${tracking}em`,
            transform: `scaleX(${squeeze})`,
            transformOrigin: "0 50%",
            whiteSpace: "nowrap",
          }}
        >
          MENEKAN-NEKAN.
        </div>
      </div>
      <div style={{ position: "absolute", left: CONTENT.left + 10, top: 968, width: 200 * gold, height: 5, borderRadius: 3, background: COLORS.gold }} />
    </AbsoluteFill>
  );
};
