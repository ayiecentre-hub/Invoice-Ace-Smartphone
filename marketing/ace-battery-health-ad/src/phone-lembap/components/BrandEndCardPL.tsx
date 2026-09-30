import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { CTAButton } from "../../components/CTAButton";
import { prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { ShieldCard } from "./Shield";

/**
 * 0:27–0:30 CTA. Everything on this card is taken verbatim from the poster:
 * logo, "ACE Smartphone, Kepala Batas", shield + "Harga jelas sebelum anda setuju",
 * "WhatsApp Semak Bateri", "One Place. One Trust."
 */
export const BrandEndCardPL: React.FC = () => {
  const frame = useCurrentFrame();
  const logo = prog(frame, 2, 14);
  const rule = prog(frame, 6, 16, EASE.inOut);
  const tag = prog(frame, 24, 12);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 30%, ${COLORS.navySoft} 0%, ${COLORS.navy} 60%, ${COLORS.navyDeep} 100%)`, opacity: prog(frame, 0, 8) }}>
      <div style={{ position: "absolute", left: "50%", top: 180, width: 200, height: 208, transform: `translateX(-50%) scale(${0.9 + 0.1 * logo})`, opacity: logo }}>
        <Img src={staticFile("assets/ace-logo.png")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 410, textAlign: "center", fontFamily: FONTS.body, fontWeight: 600, fontSize: 30, letterSpacing: "0.14em", color: COLORS.greyLight, opacity: logo }}>
        ACE Smartphone, Kepala Batas
      </div>
      <div style={{ position: "absolute", left: "50%", top: 466, width: 140 * rule, height: 3, background: COLORS.gold, transform: "translateX(-50%)" }} />
      <div style={{ position: "absolute", left: CONTENT.left + 110, top: 520, width: CONTENT.width - 220 }}>
        <ShieldCard p={prog(frame, 6, 12)} draw={prog(frame, 14, 12)} dark />
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 760 }}>
        <CTAButton start={12} pulseAt={30} />
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, width: CONTENT.width, top: 966, textAlign: "center", fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 58, color: COLORS.pearl, opacity: tag, transform: `translateY(${tween(frame, 24, 12, 16, 0, EASE.out)}px)` }}>
        One Place. One Trust.
      </div>
    </AbsoluteFill>
  );
};
