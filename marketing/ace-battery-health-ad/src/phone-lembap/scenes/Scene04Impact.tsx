import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { KineticHeadline } from "../../components/KineticHeadline";
import { MediaSlot } from "../../components/MediaSlot";
import { prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { LoadingTasks } from "../components/LoadingTasks";

/** 0:13–0:18 IMPACT (150 frames). Study night in the library: every task crawls, then stalls. */
export const Scene04Impact: React.FC = () => {
  const frame = useCurrentFrame();
  const inP = [0, 1, 2].map((i) => prog(frame, 40 + i * 12, 10));
  const load = [0, 1, 2].map((i) => tween(frame, 46 + i * 12, 70, 0.02, [0.38, 0.22, 0.3][i], EASE.out));
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 60%, ${COLORS.navySoft} 0%, ${COLORS.navy} 60%, ${COLORS.navyDeep} 100%)` }}>
      <div style={{ position: "absolute", left: CONTENT.left, top: 176, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 62, color: COLORS.pearl, opacity: prog(frame, 2, 10) }}>Tengah nak study…</div>
      <KineticHeadline start={6} size={100} color={COLORS.pearl} lines={[{ text: "Semua" }, { text: "tersekat.", color: COLORS.gold }]} style={{ position: "absolute", left: CONTENT.left, top: 256, width: CONTENT.width }} />
      <div style={{ position: "absolute", left: CONTENT.left, top: 520, width: CONTENT.width, height: 340, borderRadius: 36, overflow: "hidden", boxShadow: "0 40px 90px rgba(0,0,0,0.45)", clipPath: `inset(${(1 - prog(frame, 14, 12, EASE.out)) * 100}% 0 0 0 round 36px)` }}>
        <div style={{ position: "absolute", inset: 0, transform: `scale(${1.06 + frame * 0.0012})` }}>
          <MediaSlot still="assets/phone-lembap/library.jpg" video="assets/phone-lembap/library-broll.mp4" label="Library / study desk b-roll" objectPosition="50% 55%" />
        </div>
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 900 }}>
        <LoadingTasks frame={frame} inP={inP} load={load} />
      </div>
    </AbsoluteFill>
  );
};
