import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { CTAButton } from "../../components/CTAButton";
import { prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { FreeCheckCard } from "./Signs";

/** 0:18–0:20 CTA: poster offer "Pemeriksaan awal percuma." + "WhatsApp Semak Bateri →" + sign-off. */
export const BrandEndCardCP: React.FC<{ ctaLabel?: string }> = ({ ctaLabel = "WHATSAPP SEMAK BATERI →" }) => {
  const frame = useCurrentFrame();
  const logo = prog(frame, 2, 14);
  const tag = prog(frame, 24, 12);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 30%, ${COLORS.navySoft} 0%, ${COLORS.navy} 60%, ${COLORS.navyDeep} 100%)`, opacity: prog(frame, 0, 8) }}>
      <div style={{ position: "absolute", left: "50%", top: 180, width: 200, height: 208, transform: `translateX(-50%) scale(${0.9 + 0.1 * logo})`, opacity: logo }}>
        <Img src={staticFile("assets/ace-logo.png")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 410, textAlign: "center", fontFamily: FONTS.body, fontWeight: 600, fontSize: 30, letterSpacing: "0.14em", color: COLORS.greyLight, opacity: logo }}>ACE Smartphone, Kepala Batas</div>
      <div style={{ position: "absolute", left: "50%", top: 466, width: 140 * prog(frame, 6, 16, EASE.inOut), height: 3, background: COLORS.gold, transform: "translateX(-50%)" }} />
      <div style={{ position: "absolute", left: CONTENT.left + 130, top: 520, width: CONTENT.width - 260 }}>
        <FreeCheckCard p={prog(frame, 6, 12)} draw={prog(frame, 8, 16)} dark />
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 760 }}>
        <CTAButton start={12} pulseAt={30} label={ctaLabel} />
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, width: CONTENT.width, top: 966, textAlign: "center", fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 58, color: COLORS.pearl, opacity: tag, transform: `translateY(${tween(frame, 24, 12, 16, 0, EASE.out)}px)` }}>
        One Place. One Trust.
      </div>
    </AbsoluteFill>
  );
};
