import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { ChargeRing } from "../components/ChargeRing";

const LINES = ["CHECK DULU.", "TERANG JELAS.", "TAK MENEKAN-NEKAN."];

/**
 * 0:24–0:27 TRUST (90 frames). Each promise charges the ring by a third; at 100% it turns gold.
 * "Terang jelas" (not "harga jelas") because this poster makes no pricing statement.
 */
export const Scene06Trust: React.FC = () => {
  const frame = useCurrentFrame();
  const at = [4, 30, 56];
  const level = at.reduce((acc, a) => acc + tween(frame, a, 10, 0, 1 / 3, EASE.out), 0);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 45%, ${COLORS.navySoft} 0%, ${COLORS.navy} 60%, ${COLORS.navyDeep} 100%)` }}>
      <div style={{ position: "absolute", left: 390, top: 330, opacity: prog(frame, 0, 10), transform: `scale(${0.9 + 0.1 * prog(frame, 0, 12, EASE.back)})` }}>
        <ChargeRing level={level} bolt={prog(frame, 66, 8, EASE.back)} />
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 760, width: CONTENT.width, display: "flex", flexDirection: "column", gap: 26 }}>
        {LINES.map((t, i) => {
          const p = prog(frame, at[i], 10);
          const last = i === LINES.length - 1;
          return (
            <div key={t} style={{ overflow: "hidden", paddingBottom: 8 }}>
              <div style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: last ? 76 : 96, letterSpacing: "-0.04em", color: last ? COLORS.gold : COLORS.pearl, transform: `translateY(${(1 - p) * 110}%)`, whiteSpace: "nowrap" }}>{t}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
