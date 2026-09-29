import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { motionBlur, prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";

const LINES = ["CHECK DULU.", "HARGA JELAS.", "TAK\nMENEKAN-NEKAN."];
const ROW = 170;

/**
 * 0:16–0:18 TRUST. One slot, three promises: each phrase rolls up and replaces the last
 * (text-replacement animation); three pips count the promises; the last one holds.
 */
export const Scene06Trust: React.FC = () => {
  const frame = useCurrentFrame();
  const stage = (f: number) => tween(f, 16, 6, 0, 1, EASE.inOut) + tween(f, 32, 6, 0, 1, EASE.inOut);
  const st = stage(frame);
  const blur = motionBlur((f) => stage(f) * ROW, frame, 0.05);
  const slotH = tween(frame, 32, 8, 150, 212, EASE.inOut);
  const intro = prog(frame, 2, 10);
  const gold = prog(frame, 46, 10, EASE.inOut);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 40% 45%, ${COLORS.navySoft} 0%, ${COLORS.navy} 60%, ${COLORS.navyDeep} 100%)` }}>
      <div style={{ position: "absolute", left: CONTENT.left, top: 640, width: CONTENT.width, height: slotH, overflow: "hidden" }}>
        {LINES.map((t, i) => {
          const last = i === LINES.length - 1;
          return (
            <div
              key={t}
              style={{
                position: "absolute",
                left: 0,
                top: (i - st) * ROW + (i === 0 ? (1 - intro) * ROW : 0),
                fontFamily: FONTS.heading,
                fontWeight: 700,
                fontSize: last ? 92 : 128,
                letterSpacing: "-0.045em",
                lineHeight: 1.0,
                color: COLORS.pearl,
                whiteSpace: "pre",
                filter: blur > 0.3 ? `blur(${blur}px)` : undefined,
              }}
            >
              {t}
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: CONTENT.left + 2, top: 640 + slotH + 24, width: 240 * gold, height: 5, borderRadius: 3, background: COLORS.gold }} />
      <div style={{ position: "absolute", left: CONTENT.left, top: 560, display: "flex", gap: 14 }}>
        {[0, 1, 2].map((i) => {
          const on = st >= i - 0.5 ? 1 : 0;
          return <div key={i} style={{ width: on ? 46 : 14, height: 14, borderRadius: 7, background: on ? COLORS.blue : COLORS.hairlineOnNavy, transition: "none" }} />;
        })}
      </div>
    </AbsoluteFill>
  );
};
