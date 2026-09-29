import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { KineticHeadline } from "../../components/KineticHeadline";
import { prog } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { PlugCounter, SignRow, SteepDrop, SuddenOff } from "../components/Signs";

/** 0:05–0:09 EDUCATION: 3 SIGNS. Each row lands, animates its own evidence, then gets ticked as the VO names it. */
export const Scene03Education: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = prog(frame, 0, 12, EASE.inOut);
  return (
    <AbsoluteFill style={{ clipPath: `inset(${(1 - rise) * 100}% 0 0 0)` }}>
      <AbsoluteFill style={{ background: COLORS.pearl }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: `${(1 - rise) * 100}%`, height: 8, background: COLORS.blue, opacity: rise < 1 ? 1 : 0 }} />
      <div style={{ position: "absolute", left: CONTENT.left, top: 176, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 58, color: COLORS.navy, opacity: prog(frame, 4, 10) }}>Bateri cepat habis?</div>
      <KineticHeadline start={6} gap={5} size={92} lines={[{ text: "3 tanda bateri" }, { text: "patut disemak.", color: COLORS.blue }]} style={{ position: "absolute", left: CONTENT.left, top: 250, width: CONTENT.width }} />
      <div style={{ position: "absolute", left: CONTENT.left, top: 480 }}>
        <SignRow n={1} title={"Cas lebih\nsekali sehari"} p={prog(frame, 4, 12)} tick={prog(frame, 12, 8)}>
          <PlugCounter count={1 + Math.floor(prog(frame, 8, 14, EASE.linear) * 2.99)} />
        </SignRow>
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 700 }}>
        <SignRow n={2} title={"Peratus jatuh\nmendadak"} p={prog(frame, 26, 12)} tick={prog(frame, 46, 8)}>
          <SteepDrop p={prog(frame, 32, 14, EASE.inOut)} />
        </SignRow>
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 920 }}>
        <SignRow n={3} title={"Mati sendiri,\nmasih ada %"} p={prog(frame, 58, 12)} tick={prog(frame, 78, 8)}>
          <SuddenOff off={prog(frame, 66, 8, EASE.inOut)} />
        </SignRow>
      </div>
      <div
        style={{
          position: "absolute",
          left: CONTENT.left,
          top: 1146,
          width: CONTENT.width,
          padding: "24px 32px",
          borderRadius: 26,
          background: COLORS.navy,
          clipPath: `inset(0 ${(1 - prog(frame, 94, 12, EASE.out)) * 100}% 0 0 round 26px)`,
          fontFamily: FONTS.body,
          fontWeight: 700,
          fontSize: 40,
          color: COLORS.pearl,
        }}
      >
        Ada satu pun? <span style={{ color: COLORS.gold }}>Patut disemak.</span>
      </div>
    </AbsoluteFill>
  );
};
