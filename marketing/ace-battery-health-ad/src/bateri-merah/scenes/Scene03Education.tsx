import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { InfoCard } from "../../components/InfoCard";
import { KineticHeadline } from "../../components/KineticHeadline";
import { prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { DrainGraphic, WornBatteryGraphic } from "../components/CauseGraphics";
import { FROZEN } from "./Scene02Interrupt";

/**
 * 0:05–0:09 EDUCATION (myth → fact). An iris opens from the parked phone onto two
 * numbered causes; the takeaway lands last: it's not automatically a battery swap.
 */
export const Scene03Education: React.FC = () => {
  const frame = useCurrentFrame();
  const iris = prog(frame, 0, 14, EASE.inOut);
  const cx = FROZEN.left + FROZEN.width / 2;
  const cy = FROZEN.top + 300;
  const card1 = prog(frame, 14, 16);
  const card2 = prog(frame, 32, 16);
  const cap = tween(frame, 26, 22, 100, 72, EASE.inOut);
  const drain = tween(frame, 46, 36, 100, 18, EASE.inOut);
  const flow = prog(frame, 44, 8);
  const strip = prog(frame, 86, 14);
  return (
    <AbsoluteFill style={{ clipPath: `circle(${iris * 150}% at ${cx}px ${cy}px)` }}>
      <AbsoluteFill style={{ background: COLORS.pearl }} />
      <div style={{ position: "absolute", left: CONTENT.left, top: 176, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 58, color: COLORS.navy, opacity: prog(frame, 6, 10) }}>Cepat merah?</div>
      <KineticHeadline start={9} size={108} lines={[{ text: "2 punca biasa." }]} style={{ position: "absolute", left: CONTENT.left, top: 250, width: CONTENT.width }} />
      <div style={{ position: "absolute", left: CONTENT.left, top: 420 }}>
        <InfoCard number="01" title="Bateri dah haus" caption="100% pun simpan tenaga lebih sikit." p={card1} width={420} height={650}>
          <WornBatteryGraphic capacity={cap} labelP={prog(frame, 30, 8)} />
        </InfoCard>
      </div>
      <div style={{ position: "absolute", left: CONTENT.right - 420, top: 420 }}>
        <InfoCard number="02" title="App & GPS berat" caption="Guna berat cepat habiskan caj." p={card2} width={420} height={650}>
          <DrainGraphic level={drain} flow={flow} frame={frame} />
        </InfoCard>
      </div>
      <div
        style={{
          position: "absolute",
          left: CONTENT.left,
          top: 1110,
          width: CONTENT.width,
          padding: "26px 32px",
          borderRadius: 26,
          background: COLORS.navy,
          clipPath: `inset(0 ${(1 - strip) * 100}% 0 0 round 26px)`,
          fontFamily: FONTS.body,
          fontWeight: 700,
          fontSize: 38,
          lineHeight: 1.25,
          color: COLORS.pearl,
        }}
      >
        Tak semestinya kena tukar bateri.
        <br />
        <span style={{ color: COLORS.gold }}>Check dulu, baru tahu.</span>
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 1310, fontFamily: FONTS.body, fontSize: 22, letterSpacing: "0.06em", color: COLORS.greyLight, opacity: prog(frame, 40, 10) }}>
        *Ilustrasi. Punca sebenar hanya diketahui selepas semakan.
      </div>
    </AbsoluteFill>
  );
};
