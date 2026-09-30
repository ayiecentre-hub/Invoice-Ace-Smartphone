import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { KineticHeadline } from "../../components/KineticHeadline";
import { prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { PerformanceGauge } from "../components/PerformanceGauge";

const CAP = 0.58;

/**
 * 0:07–0:13 1 THING MOST PEOPLE DON'T KNOW (180 frames).
 * Part 1: healthy battery → the needle sweeps to full performance.
 * Part 2: the battery wears, a limiter appears and the needle falls back and bumps against it.
 */
export const Scene03Education: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = prog(frame, 0, 12, EASE.inOut);
  const out1 = prog(frame, 80, 8, EASE.in);
  const in2 = prog(frame, 92, 8, EASE.out);
  const up = tween(frame, 36, 26, 0.05, 0.96, EASE.out);
  const down = prog(frame, 112, 14, EASE.inOut);
  const bump = frame > 126 ? Math.max(0, Math.sin((frame - 126) / 4)) * 0.03 * Math.exp(-(frame - 126) / 30) : 0;
  const value = up + (CAP - up) * down - bump;
  const wear = prog(frame, 96, 14, EASE.inOut);
  const limited = frame >= 118;
  return (
    <AbsoluteFill style={{ clipPath: `inset(${(1 - rise) * 100}% 0 0 0)` }}>
      <AbsoluteFill style={{ background: COLORS.pearl }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: `${(1 - rise) * 100}%`, height: 8, background: COLORS.blue, opacity: rise < 1 ? 1 : 0 }} />
      <AbsoluteFill style={{ opacity: 1 - out1, transform: `translateY(${-out1 * 60}px)` }}>
        <div style={{ position: "absolute", left: CONTENT.left, top: 176, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 58, color: COLORS.navy, opacity: prog(frame, 4, 10) }}>Ramai tak tahu…</div>
        <KineticHeadline start={8} gap={5} size={84} lines={[{ text: "Bateri sihat," }, { text: "prestasi penuh.", color: COLORS.blue }]} style={{ position: "absolute", left: CONTENT.left, top: 250, width: CONTENT.width }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: in2, transform: `translateY(${(1 - in2) * 60}px)` }}>
        <div style={{ position: "absolute", left: CONTENT.left, top: 176, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 58, color: COLORS.navy }}>Tapi bila bateri haus…</div>
        <KineticHeadline start={92} gap={5} size={84} lines={[{ text: "Sistem boleh" }, { text: "perlahankan phone.", color: COLORS.lowBattery }]} style={{ position: "absolute", left: CONTENT.left, top: 250, width: CONTENT.width }} />
      </AbsoluteFill>
      <div style={{ position: "absolute", left: CONTENT.left, top: 560, opacity: prog(frame, 14, 10), transform: `translateY(${(1 - prog(frame, 14, 12)) * 40}px)` }}>
        <PerformanceGauge
          value={value}
          cap={prog(frame, 104, 10, EASE.back)}
          capAt={CAP}
          wear={wear}
          status={limited ? "Supaya tak tutup sendiri" : "Prestasi penuh"}
          statusColor={limited ? COLORS.lowBattery : COLORS.blue}
          statusP={limited ? prog(frame, 118, 8, EASE.back) : prog(frame, 58, 8, EASE.back) * (1 - prog(frame, 100, 6))}
        />
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 1262, width: CONTENT.width, fontFamily: FONTS.body, fontSize: 32, lineHeight: 1.35, color: COLORS.grey, opacity: prog(frame, 124, 10) }}>
        Punca lain pun ada. Sebab itu <b style={{ color: COLORS.navy }}>kena check dulu.</b>
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 1380, fontFamily: FONTS.body, fontSize: 22, letterSpacing: "0.05em", color: COLORS.greyLight, opacity: prog(frame, 20, 10) }}>*Ilustrasi. Berlaku pada sesetengah telefon.</div>
    </AbsoluteFill>
  );
};
