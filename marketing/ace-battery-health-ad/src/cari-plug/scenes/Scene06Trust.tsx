import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { prog } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";

/** A Trust-Blue bar sweeps in, the words appear under it, the bar retracts: an editorial reveal per phrase. */
const BarLine: React.FC<{ start: number; top: number; size: number; color: string; lines: string[] }> = ({ start, top, size, color, lines }) => {
  const frame = useCurrentFrame();
  const cover = prog(frame, start, 6, EASE.inOut);
  const uncover = prog(frame, start + 6, 7, EASE.inOut);
  const h = lines.length * size * 1.02 + 10;
  return (
    <div style={{ position: "absolute", left: CONTENT.left, top, height: h }}>
      <div style={{ opacity: cover >= 1 ? 1 : 0, fontFamily: FONTS.heading, fontWeight: 700, fontSize: size, lineHeight: 1.02, letterSpacing: "-0.045em", color, whiteSpace: "pre" }}>{lines.join("\n")}</div>
      <div
        style={{
          position: "absolute",
          left: -8,
          top: 0,
          width: size * 0.62 * Math.max(...lines.map((l) => l.length)) + 16,
          height: h,
          background: COLORS.blue,
          borderRadius: 10,
          transformOrigin: uncover > 0 ? "100% 50%" : "0 50%",
          transform: `scaleX(${uncover > 0 ? 1 - uncover : cover})`,
        }}
      />
    </div>
  );
};

/** 0:16–0:18 TRUST. "Check dulu. Terang jelas. Tak menekan-nekan." ("harga jelas" is not used: this poster makes no pricing claim.) */
export const Scene06Trust: React.FC = () => {
  const frame = useCurrentFrame();
  const gold = prog(frame, 50, 10, EASE.inOut);
  return (
    <AbsoluteFill style={{ background: COLORS.pearl }}>
      <BarLine start={1} top={520} size={112} color={COLORS.navy} lines={["CHECK DULU."]} />
      <BarLine start={17} top={660} size={112} color={COLORS.navy} lines={["TERANG JELAS."]} />
      <BarLine start={33} top={830} size={92} color={COLORS.blue} lines={["TAK", "MENEKAN-NEKAN."]} />
      <div style={{ position: "absolute", left: CONTENT.left, top: 1040, width: 240 * gold, height: 5, borderRadius: 3, background: COLORS.gold }} />
    </AbsoluteFill>
  );
};
