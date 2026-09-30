import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { KineticHeadline } from "../../components/KineticHeadline";
import { MediaSlot } from "../../components/MediaSlot";
import { prog } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { Schedule } from "../components/Schedule";

/** 0:13–0:18 IMPACT (150 frames). It's only 12:15, the afternoon is still full, and each item needs a charger. */
export const Scene04Impact: React.FC = () => {
  const frame = useCurrentFrame();
  const inP = [0, 1, 2].map((i) => prog(frame, 30 + i * 14, 10));
  const flag = [0, 1, 2].map((i) => prog(frame, 84 + i * 8, 8, EASE.back));
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 60%, ${COLORS.navySoft} 0%, ${COLORS.navy} 60%, ${COLORS.navyDeep} 100%)` }}>
      <div style={{ position: "absolute", left: CONTENT.left, top: 176, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 62, color: COLORS.pearl, opacity: prog(frame, 2, 10) }}>Baru 12:15…</div>
      <KineticHeadline start={6} size={96} color={COLORS.pearl} lines={[{ text: "Petang masih" }, { text: "panjang.", color: COLORS.gold }]} style={{ position: "absolute", left: CONTENT.left, top: 256, width: CONTENT.width }} />
      <div style={{ position: "absolute", left: CONTENT.left, top: 520, width: CONTENT.width, height: 340, borderRadius: 36, overflow: "hidden", boxShadow: "0 40px 90px rgba(0,0,0,0.45)", clipPath: `inset(${(1 - prog(frame, 14, 12, EASE.out)) * 100}% 0 0 0 round 36px)` }}>
        <div style={{ position: "absolute", inset: 0, transform: `scale(${1.06 + frame * 0.0012})` }}>
          <MediaSlot still="assets/pagi-cas/coffee.jpg" video="assets/pagi-cas/cafe-broll.mp4" label="Café / work desk b-roll" objectPosition="50% 55%" />
        </div>
        <div style={{ position: "absolute", left: 22, top: 22, display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", borderRadius: 14, background: COLORS.lowBattery, fontFamily: FONTS.body, fontWeight: 700, fontSize: 28, color: "#fff", opacity: prog(frame, 70, 8) }}>1% · 12:15</div>
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 910 }}>
        <Schedule inP={inP} flag={flag} />
      </div>
    </AbsoluteFill>
  );
};
