import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { COLORS, CONTENT, EASE, FONTS } from "../theme";
import { prog, tween } from "../lib/anim";
import { CTAButton } from "./CTAButton";
import { KineticHeadline } from "./KineticHeadline";

/** Scene 07 end card. Local frame 0 = scene start. */
export const BrandEndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = tween(frame, 0, 12, 100, 0, EASE.out);
  const logo = prog(frame, 4, 16);
  const tag = prog(frame, 30, 14);
  const rule = prog(frame, 8, 20, EASE.inOut);
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `radial-gradient(90% 60% at 50% 35%, ${COLORS.navySoft} 0%, ${COLORS.navy} 60%, ${COLORS.navyDeep} 100%)`,
          clipPath: `inset(${rise}% 0 0 0 round 48px 48px 0 0)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 196,
            width: 230,
            height: 240,
            transform: `translateX(-50%) scale(${0.9 + 0.1 * logo})`,
            opacity: logo,
          }}
        >
          <Img src={staticFile("assets/ace-logo.png")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 468,
            textAlign: "center",
            fontFamily: FONTS.body,
            fontWeight: 600,
            fontSize: 30,
            letterSpacing: "0.22em",
            color: COLORS.greyLight,
            opacity: logo,
          }}
        >
          ACE SMARTPHONE · KEPALA BATAS
        </div>
        <div style={{ position: "absolute", left: "50%", top: 530, width: 120 * rule, height: 3, background: COLORS.gold, transform: "translateX(-50%)" }} />
        <KineticHeadline
          start={8}
          gap={5}
          size={92}
          align="center"
          color={COLORS.pearl}
          lines={[{ text: "Pemeriksaan" }, { text: "Bateri Percuma" }]}
          style={{ position: "absolute", left: CONTENT.left, width: CONTENT.width, top: 580 }}
        />
        <div style={{ position: "absolute", left: CONTENT.left, top: 830 }}>
          <CTAButton start={16} pulseAt={26} />
        </div>
        <div
          style={{
            position: "absolute",
            left: CONTENT.left,
            width: CONTENT.width,
            top: 1036,
            textAlign: "center",
            fontFamily: FONTS.serif,
            fontStyle: "italic",
            fontSize: 56,
            color: COLORS.pearl,
            opacity: tag,
            transform: `translateY(${(1 - tag) * 16}px)`,
          }}
        >
          One Place. One Trust.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
