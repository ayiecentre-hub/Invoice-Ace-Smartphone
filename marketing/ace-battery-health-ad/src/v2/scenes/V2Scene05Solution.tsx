import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Connector } from "../../components/Connector";
import { FocusBrackets } from "../../components/DiagnosticOverlay";
import { KineticHeadline } from "../../components/KineticHeadline";
import { MediaSlot } from "../../components/MediaSlot";
import { PhoneMockup } from "../../components/PhoneMockup";
import { BatteryHealthScreen } from "../../components/PhoneScreens";
import { motionBlur, prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { Stepper } from "../components/Stepper";

export const V2_SOLUTION_LEAD_IN = 10;
const PHONE = { left: 92, top: 540, width: 320 };
const PANEL = { left: 470, top: 520, w: 490, h: 610 };

/**
 * VARIATION B · 0:12–0:16. The phone crosses the frame (match cut) and lands next to the
 * technician panel; a sweep scans it, a data tag pins 76%, the rail fills to the customer's ✓.
 */
export const V2Scene05Solution: React.FC = () => {
  const raw = useCurrentFrame();
  const f = raw - V2_SOLUTION_LEAD_IN;
  const wipe = prog(raw, 0, V2_SOLUTION_LEAD_IN + 2, EASE.inOut);
  const phoneX = (x: number) => tween(x, -V2_SOLUTION_LEAD_IN, 16, -620, 0, EASE.out);
  const panel = prog(f, 2, 14);
  const brackets = prog(f, 6, 10, EASE.back);
  const sweep = f >= 8 && f <= 32 ? tween(f, 8, 24, 0, 1.15, EASE.inOut) : undefined;
  const tag = prog(f, 30, 12);
  const pin = prog(f, 26, 12, EASE.inOut);
  const rule = prog(f, 66, 14, EASE.inOut);

  const sx = (PHONE.width * 0.928) / 390;
  const sy = (PHONE.width * (146.7 / 71.5) - PHONE.width * 0.072) / 844;
  const bez = PHONE.width * 0.036;
  const rowY = PHONE.top + bez + 269 * sy;
  const rowX = PHONE.left + bez + 360 * sx;

  return (
    <AbsoluteFill style={{ clipPath: `inset(0 0 0 ${(1 - wipe) * 100}%)` }}>
      <AbsoluteFill style={{ background: COLORS.pearl }} />
      <div style={{ position: "absolute", left: CONTENT.left, top: 184, display: "flex", alignItems: "center", gap: 12, opacity: prog(f, 0, 12) }}>
        <div style={{ width: 10, height: 10, borderRadius: 5, background: COLORS.blue }} />
        <span style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: 30, letterSpacing: "0.18em", color: COLORS.navy }}>DI ACE SMARTPHONE</span>
      </div>
      <KineticHeadline
        start={V2_SOLUTION_LEAD_IN + 54}
        gap={6}
        size={96}
        lines={[{ text: "Pemeriksaan bateri" }, { text: "percuma.", color: COLORS.blue }]}
        style={{ position: "absolute", left: CONTENT.left, top: 244, width: CONTENT.width }}
      />
      <div style={{ position: "absolute", left: CONTENT.left, top: 468, width: 150 * rule, height: 4, borderRadius: 2, background: COLORS.gold }} />

      {/* technician panel (replace with ace-diagnostic.mp4) */}
      <div
        style={{
          position: "absolute",
          left: PANEL.left,
          top: PANEL.top,
          width: PANEL.w,
          height: PANEL.h,
          borderRadius: 36,
          overflow: "hidden",
          clipPath: `inset(0 0 ${(1 - panel) * 100}% 0 round 36px)`,
          boxShadow: "0 30px 70px rgba(26,26,46,0.18)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, transform: `scale(${1.06 + f * 0.0008})` }}>
          <MediaSlot still="assets/ace-technician.jpg" video="assets/ace-diagnostic.mp4" label="ACE technician checking phone" objectPosition="50% 18%" />
        </div>
        <div style={{ position: "absolute", left: 22, bottom: 22, padding: "10px 16px", borderRadius: 12, background: "rgba(26,26,46,0.88)", color: COLORS.pearl, fontFamily: FONTS.body, fontWeight: 600, fontSize: 24 }}>
          Semakan depan pelanggan
        </div>
      </div>

      {/* the same iPhone 13 */}
      <div style={{ position: "absolute", left: PHONE.left, top: PHONE.top, transform: `translateX(${phoneX(f)}px) rotate(${tween(f, -6, 18, -8, -1.5, EASE.out)}deg)`, filter: `blur(${motionBlur(phoneX, f, 0.03)}px)` }}>
        <PhoneMockup width={PHONE.width} sheen={tween(f, 0, 40, -0.2, 1.2, EASE.inOut)}>
          <BatteryHealthScreen focus={prog(f, 28, 10)} scan={sweep} />
        </PhoneMockup>
        <FocusBrackets w={PHONE.width} h={PHONE.width * (146.7 / 71.5)} p={brackets} />
      </div>

      {/* pinned data tag over the panel */}
      <Connector points={[[rowX, rowY], [PANEL.left + 40, rowY]]} progress={pin} color={COLORS.blue} width={3.5} />
      <div
        style={{
          position: "absolute",
          left: PANEL.left + 40,
          top: rowY - 70,
          padding: "16px 24px",
          borderRadius: 22,
          background: "#fff",
          boxShadow: "0 20px 50px rgba(26,26,46,0.22)",
          opacity: tag,
          transform: `translateX(${(1 - tag) * 24}px)`,
        }}
      >
        <div style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: 22, letterSpacing: "0.12em", color: COLORS.grey }}>MAXIMUM CAPACITY</div>
        <div style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 76, letterSpacing: "-0.04em", lineHeight: 1.05, color: COLORS.blue }}>76%</div>
      </div>

      <div style={{ position: "absolute", left: CONTENT.left, top: 1236 }}>
        <Stepper start={V2_SOLUTION_LEAD_IN + 24} gap={12} width={CONTENT.width} />
      </div>
    </AbsoluteFill>
  );
};
