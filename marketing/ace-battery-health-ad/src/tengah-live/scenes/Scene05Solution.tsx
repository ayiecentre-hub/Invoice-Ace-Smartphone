import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FocusBrackets } from "../../components/DiagnosticOverlay";
import { KineticHeadline } from "../../components/KineticHeadline";
import { MediaSlot } from "../../components/MediaSlot";
import { PhoneMockup } from "../../components/PhoneMockup";
import { motionBlur, prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { Stepper } from "../../v2/components/Stepper";
import { CheckRow } from "../../bateri-merah/components/ServicePanels";
import { BatteryUsageScreen } from "../../bateri-merah/screens";
import { SameDayCard } from "../components/LiveGraphics";

export const TL_SOLUTION_LEAD_IN = 10;
const PHONE = { left: 72, top: 492, width: 340 };

/** 0:18–0:24 ACE SOLUTION (180 frames). Scan, explain options, then the poster's same-day promise with its condition intact. */
export const Scene05Solution: React.FC = () => {
  const raw = useCurrentFrame();
  const f = raw - TL_SOLUTION_LEAD_IN;
  const wipe = prog(raw, 0, TL_SOLUTION_LEAD_IN + 2, EASE.inOut);
  const phoneX = (x: number) => tween(x, 10, 16, -520, 0, EASE.out);
  const scan = f >= 40 && f <= 66 ? tween(f, 40, 26, 0, 1.12, EASE.inOut) : undefined;
  return (
    <AbsoluteFill style={{ clipPath: `inset(0 0 0 ${(1 - wipe) * 100}%)` }}>
      <AbsoluteFill style={{ background: COLORS.pearl }} />
      <div style={{ position: "absolute", left: CONTENT.left, top: 176, display: "flex", alignItems: "center", gap: 12, opacity: prog(f, 0, 10) }}>
        <div style={{ width: 10, height: 10, borderRadius: 5, background: COLORS.blue }} />
        <span style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: 30, letterSpacing: "0.18em", color: COLORS.navy }}>DI ACE SMARTPHONE</span>
      </div>
      <KineticHeadline start={TL_SOLUTION_LEAD_IN + 4} gap={6} size={96} lines={[{ text: "Kami semak" }, { text: "bateri dulu.", color: COLORS.blue }]} style={{ position: "absolute", left: CONTENT.left, top: 236, width: CONTENT.width }} />
      <div style={{ position: "absolute", left: PHONE.left, top: PHONE.top, transform: `translateX(${phoneX(f)}px) rotate(${tween(f, 10, 18, -6, -1, EASE.out)}deg)`, filter: `blur(${motionBlur(phoneX, f, 0.03)}px)` }}>
        <PhoneMockup width={PHONE.width} finish="silver" sheen={tween(f, 36, 34, -0.2, 1.2, EASE.inOut)}>
          <BatteryUsageScreen scan={scan} hiHealth={prog(f, 56, 8)} hiApps={prog(f, 66, 8)} />
        </PhoneMockup>
        <FocusBrackets w={PHONE.width} h={PHONE.width * (146.7 / 71.5)} p={prog(f, 36, 10, EASE.back)} />
      </div>
      <div style={{ position: "absolute", left: PHONE.left + 16, top: PHONE.top + PHONE.width * (146.7 / 71.5) + 8, fontFamily: FONTS.body, fontSize: 20, color: COLORS.greyLight, opacity: prog(f, 40, 8) }}>*Contoh paparan</div>
      <div style={{ position: "absolute", left: 452, top: 492, width: 508, height: 270, borderRadius: 30, overflow: "hidden", boxShadow: "0 24px 60px rgba(26,26,46,0.16)", clipPath: `inset(0 0 ${(1 - prog(f, 6, 12)) * 100}% 0 round 30px)` }}>
        <div style={{ position: "absolute", inset: 0, transform: `scale(${1.05 + f * 0.0008})` }}>
          <MediaSlot still="assets/ace-technician.jpg" video="assets/tengah-live/service-check.mp4" label="ACE technician checking the phone" objectPosition="50% 90%" />
        </div>
        <div style={{ position: "absolute", left: 16, bottom: 16, padding: "8px 14px", borderRadius: 10, background: "rgba(26,26,46,0.88)", color: COLORS.pearl, fontFamily: FONTS.body, fontWeight: 600, fontSize: 22 }}>Semakan depan anda</div>
      </div>
      <div style={{ position: "absolute", left: 452, top: 786, width: 508, display: "flex", flexDirection: "column", gap: 12 }}>
        <CheckRow label="Semak kesihatan bateri" p={prog(f, 50, 10)} done={prog(f, 74, 8)} />
        <CheckRow label="Terangkan pilihan" p={prog(f, 60, 10)} done={prog(f, 92, 8)} />
      </div>
      <div style={{ position: "absolute", left: 452, top: 990, width: 508 }}>
        <SameDayCard p={prog(f, 110, 12)} draw={prog(f, 112, 16)} />
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 1250 }}>
        <Stepper start={TL_SOLUTION_LEAD_IN + 136} gap={10} width={CONTENT.width} />
      </div>
    </AbsoluteFill>
  );
};
