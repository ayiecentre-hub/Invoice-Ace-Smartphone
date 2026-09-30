import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { KineticHeadline } from "../../components/KineticHeadline";
import { prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { DayArc } from "../components/DayArc";

/**
 * 0:07–0:13 TIMELINE (180 frames). One day, same use. The sun travels 7 AM → noon and both
 * batteries drain side by side; the worn one hits 1% around 12:15 while the healthy one still has plenty.
 * Part 2 names the reason: a worn battery stores less energy at "100%".
 */
export const Scene03Education: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = prog(frame, 0, 12, EASE.inOut);
  const hour = tween(frame, 20, 84, 7, 12.25, EASE.inOut);
  const out1 = prog(frame, 80, 8, EASE.in);
  const in2 = prog(frame, 92, 8, EASE.out);
  return (
    <AbsoluteFill style={{ clipPath: `inset(${(1 - rise) * 100}% 0 0 0)` }}>
      <AbsoluteFill style={{ background: COLORS.pearl }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: `${(1 - rise) * 100}%`, height: 8, background: COLORS.blue, opacity: rise < 1 ? 1 : 0 }} />
      <AbsoluteFill style={{ opacity: 1 - out1, transform: `translateY(${-out1 * 60}px)` }}>
        <div style={{ position: "absolute", left: CONTENT.left, top: 176, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 58, color: COLORS.navy, opacity: prog(frame, 4, 10) }}>Satu hari, guna sama…</div>
        <KineticHeadline start={8} size={92} lines={[{ text: "Dua bateri." }]} style={{ position: "absolute", left: CONTENT.left, top: 250, width: CONTENT.width }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: in2, transform: `translateY(${(1 - in2) * 60}px)` }}>
        <div style={{ position: "absolute", left: CONTENT.left, top: 176, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 58, color: COLORS.navy }}>Sebabnya…</div>
        <KineticHeadline start={92} gap={5} size={76} lines={[{ text: "Bateri haus" }, { text: "habis separuh hari.", color: COLORS.lowBattery }]} style={{ position: "absolute", left: CONTENT.left, top: 250, width: CONTENT.width }} />
      </AbsoluteFill>
      <div style={{ position: "absolute", left: CONTENT.left, top: 440, opacity: prog(frame, 12, 10), transform: `translateY(${(1 - prog(frame, 12, 12)) * 40}px)` }}>
        <DayArc hour={hour} arcP={prog(frame, 14, 10)} noonMark={prog(frame, 100, 12, EASE.out)} />
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 1380, fontFamily: FONTS.body, fontSize: 22, letterSpacing: "0.05em", color: COLORS.greyLight, opacity: prog(frame, 20, 10) }}>*Ilustrasi, corak penggunaan sama.</div>
    </AbsoluteFill>
  );
};
