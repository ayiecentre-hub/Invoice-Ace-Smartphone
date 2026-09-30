import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { KineticHeadline } from "../../components/KineticHeadline";
import { prog } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { LoadTiles, PowerSpike } from "../components/PowerSpike";

/**
 * 0:07–0:13 WHAT YOU SEE → WHAT IT MEANS (180 frames).
 * Part 1: scanning a QR lights three loads at once and the demand line spikes.
 * Part 2: two ceilings: the healthy battery clears the spike, the worn one does not → shutdown.
 */
export const Scene03Education: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = prog(frame, 0, 12, EASE.inOut);
  const on = [0, 1, 2].map((i) => prog(frame, 14 + i * 12, 8));
  const out1 = prog(frame, 78, 8, EASE.in);
  const in2 = prog(frame, 88, 8, EASE.out);
  return (
    <AbsoluteFill style={{ clipPath: `inset(${(1 - rise) * 100}% 0 0 0)` }}>
      <AbsoluteFill style={{ background: COLORS.pearl }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: `${(1 - rise) * 100}%`, height: 8, background: COLORS.blue, opacity: rise < 1 ? 1 : 0 }} />
      <AbsoluteFill style={{ opacity: 1 - out1, transform: `translateY(${-out1 * 60}px)` }}>
        <div style={{ position: "absolute", left: CONTENT.left, top: 176, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 58, color: COLORS.navy, opacity: prog(frame, 4, 10) }}>Masa scan QR…</div>
        <KineticHeadline start={6} size={96} lines={[{ text: "3 benda serentak." }]} style={{ position: "absolute", left: CONTENT.left, top: 250, width: CONTENT.width }} />
        <div style={{ position: "absolute", left: CONTENT.left, top: 440 }}>
          <LoadTiles on={on} />
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: in2, transform: `translateY(${(1 - in2) * 60}px)` }}>
        <div style={{ position: "absolute", left: CONTENT.left, top: 176, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 58, color: COLORS.navy }}>Yang sebenarnya berlaku…</div>
        <KineticHeadline start={88} gap={5} size={76} lines={[{ text: "Bateri haus" }, { text: "tak mampu tampung.", color: COLORS.lowBattery }]} style={{ position: "absolute", left: CONTENT.left, top: 250, width: CONTENT.width }} />
      </AbsoluteFill>
      <div style={{ position: "absolute", left: CONTENT.left, top: 640 }}>
        <PowerSpike draw={prog(frame, 50, 30, EASE.inOut)} ceilings={prog(frame, 100, 16, EASE.inOut)} cross={prog(frame, 140, 10, EASE.out)} />
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 1200, fontFamily: FONTS.body, fontSize: 22, letterSpacing: "0.05em", color: COLORS.greyLight, opacity: prog(frame, 100, 10) }}>*Ilustrasi dipermudahkan.</div>
    </AbsoluteFill>
  );
};
