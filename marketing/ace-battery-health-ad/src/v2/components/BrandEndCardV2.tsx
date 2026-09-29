import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { CTAButton } from "../../components/CTAButton";
import { KineticHeadline } from "../../components/KineticHeadline";
import { prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { ChatPreview } from "./ChatPreview";

/**
 * Variation B end card: horizontal brand lockup, then the actual message to send,
 * then the button. Local frame 0 = 0:18.0.
 */
export const BrandEndCardV2: React.FC = () => {
  const frame = useCurrentFrame();
  const lock = prog(frame, 0, 14);
  const rule = prog(frame, 4, 18, EASE.inOut);
  const tag = prog(frame, 26, 14);
  const drift = tween(frame, 0, 60, 0, -10, EASE.linear);
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(90% 60% at 50% 30%, ${COLORS.navySoft} 0%, ${COLORS.navy} 60%, ${COLORS.navyDeep} 100%)`,
        opacity: prog(frame, 0, 8),
      }}
    >
      <div style={{ position: "absolute", left: CONTENT.left, width: CONTENT.width, top: 190, display: "flex", alignItems: "center", gap: 26, opacity: lock, transform: `translateY(${(1 - lock) * 20}px)` }}>
        <Img src={staticFile("assets/ace-logo.png")} style={{ width: 132, height: 138, objectFit: "contain" }} />
        <div style={{ width: 2, height: 104, background: COLORS.hairlineOnNavy }} />
        <div>
          <div style={{ fontFamily: FONTS.heading, fontWeight: 600, fontSize: 44, color: COLORS.pearl, letterSpacing: "-0.01em" }}>ACE Smartphone</div>
          <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 28, color: COLORS.greyLight, letterSpacing: "0.12em", marginTop: 4 }}>KEPALA BATAS</div>
        </div>
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 372, width: 140 * rule, height: 3, background: COLORS.gold }} />
      <div style={{ transform: `translateY(${drift}px)` }}>
        <KineticHeadline
          start={6}
          gap={5}
          size={96}
          color={COLORS.pearl}
          lines={[{ text: "Pemeriksaan" }, { text: "Bateri Percuma." }]}
          style={{ position: "absolute", left: CONTENT.left, width: CONTENT.width, top: 420 }}
        />
        <div style={{ position: "absolute", left: CONTENT.left, width: CONTENT.width, top: 690 }}>
          <ChatPreview start={4} deliveredAt={28} />
        </div>
        <div style={{ position: "absolute", left: CONTENT.left, top: 900 }}>
          <CTAButton start={14} pulseAt={34} />
        </div>
        <div
          style={{
            position: "absolute",
            left: CONTENT.left,
            width: CONTENT.width,
            top: 1102,
            textAlign: "center",
            fontFamily: FONTS.serif,
            fontStyle: "italic",
            fontSize: 56,
            color: COLORS.pearl,
            opacity: tag,
          }}
        >
          One Place. One Trust.
        </div>
      </div>
    </AbsoluteFill>
  );
};
