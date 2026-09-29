import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { prog } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { TrustCard } from "../components/LiveGraphics";

/** 0:24–0:27 TRUST. Three promises dealt as a card stack; the deck squares up once the last card lands. */
export const Scene06Trust: React.FC = () => {
  const frame = useCurrentFrame();
  const settle = prog(frame, 66, 16, EASE.inOut);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 40% 45%, ${COLORS.navySoft} 0%, ${COLORS.navy} 60%, ${COLORS.navyDeep} 100%)` }}>
      <div style={{ position: "absolute", left: CONTENT.left, top: 430, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 60, color: COLORS.pearl, opacity: prog(frame, 2, 10) }}>Cara ACE:</div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 540 }}>
        <TrustCard index={0} text="CHECK DULU." p={prog(frame, 4, 12, EASE.out)} settle={settle} />
        <TrustCard index={1} text="TERANG JELAS." p={prog(frame, 30, 12, EASE.out)} settle={settle} />
        <TrustCard index={2} text="TAK MENEKAN-NEKAN." p={prog(frame, 56, 12, EASE.out)} settle={settle} accent />
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 1050, width: 240 * prog(frame, 72, 12, EASE.inOut), height: 5, borderRadius: 3, background: COLORS.gold }} />
    </AbsoluteFill>
  );
};
