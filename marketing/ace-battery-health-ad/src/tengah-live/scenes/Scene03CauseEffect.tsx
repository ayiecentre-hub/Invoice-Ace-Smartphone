import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { KineticHeadline } from "../../components/KineticHeadline";
import { prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { LiveTimeline, LoadMeter } from "../components/LiveGraphics";

/**
 * 0:07–0:13 CAUSE → EFFECT (180 frames).
 * Part 1 (0–90): four loads land at once and fill the meter to "BEBAN TINGGI".
 * Part 2 (90–180): a 2-hour live, two batteries: the weak one cuts out at ~45 min.
 */
export const Scene03CauseEffect: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = prog(frame, 0, 12, EASE.inOut);
  const step = [0, 1, 2, 3].reduce((a, i) => a + prog(frame, 14 + i * 14, 8, EASE.out), 0);
  const swap = prog(frame, 84, 10, EASE.inOut);
  const f2 = frame - 90;
  return (
    <AbsoluteFill style={{ clipPath: `inset(${(1 - rise) * 100}% 0 0 0)` }}>
      <AbsoluteFill style={{ background: COLORS.pearl }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: `${(1 - rise) * 100}%`, height: 8, background: COLORS.blue, opacity: rise < 1 ? 1 : 0 }} />
      {/* part 1: cause */}
      <AbsoluteFill style={{ opacity: 1 - swap, transform: `translateY(${-swap * 80}px)` }}>
        <div style={{ position: "absolute", left: CONTENT.left, top: 176, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 58, color: COLORS.navy, opacity: prog(frame, 4, 10) }}>Masa live…</div>
        <KineticHeadline start={6} size={100} lines={[{ text: "4 benda serentak." }]} style={{ position: "absolute", left: CONTENT.left, top: 250, width: CONTENT.width }} />
        <div style={{ position: "absolute", left: CONTENT.left, top: 440 }}>
          <LoadMeter step={step} />
        </div>
      </AbsoluteFill>
      {/* part 2: effect */}
      <AbsoluteFill style={{ opacity: swap, transform: `translateY(${(1 - swap) * 80}px)` }}>
        <div style={{ position: "absolute", left: CONTENT.left, top: 176, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 58, color: COLORS.navy }}>Live 2 jam…</div>
        <KineticHeadline start={92} gap={5} size={92} lines={[{ text: "Bateri lemah" }, { text: "cepat tewas.", color: COLORS.lowBattery }]} style={{ position: "absolute", left: CONTENT.left, top: 250, width: CONTENT.width }} />
        <div style={{ position: "absolute", left: CONTENT.left, top: 520 }}>
          <LiveTimeline p={tween(f2, 8, 70, 0, 1, EASE.inOut)} />
        </div>
        <div style={{ position: "absolute", left: CONTENT.left, top: 1090, display: "flex", gap: 30, fontFamily: FONTS.body, fontWeight: 700, fontSize: 30, color: COLORS.navy }}>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ width: 28, height: 8, borderRadius: 4, background: COLORS.blue }} />Bateri sihat</span>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ width: 28, height: 8, borderRadius: 4, background: COLORS.lowBattery }} />Bateri dah lemah</span>
        </div>
        <div style={{ position: "absolute", left: CONTENT.left, top: 1160, fontFamily: FONTS.body, fontSize: 22, letterSpacing: "0.05em", color: COLORS.greyLight }}>*Ilustrasi. Tempoh sebenar bergantung pada telefon dan tetapan live.</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
