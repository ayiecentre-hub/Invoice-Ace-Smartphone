import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Connector } from "../../components/Connector";
import { FocusBrackets } from "../../components/DiagnosticOverlay";
import { KineticHeadline } from "../../components/KineticHeadline";
import { MediaSlot } from "../../components/MediaSlot";
import { PhoneMockup } from "../../components/PhoneMockup";
import { lerp, motionBlur, prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { Stepper } from "../../v2/components/Stepper";
import { CheckRow, OfferCard } from "../components/ServicePanels";
import { BatteryUsageScreen } from "../screens";

export const BM_SOLUTION_LEAD_IN = 10;
const PHONE = { left: 72, top: 500, width: 340 };
const PANEL_BIG = { x: 72, y: 520, w: 888, h: 536 };
const PANEL_SMALL = { x: 452, y: 500, w: 508, h: 306 };

/**
 * 0:12–0:16 ACE SOLUTION. Storefront establishes "where", then collapses into a clinic-style
 * report: the phone is scanned, both possible causes are checked, the poster's promise lands.
 */
export const Scene05Solution: React.FC = () => {
  const raw = useCurrentFrame();
  const f = raw - BM_SOLUTION_LEAD_IN;
  const wipe = prog(raw, 0, BM_SOLUTION_LEAD_IN + 2, EASE.inOut);
  const collapse = prog(f, 22, 14, EASE.inOut);
  const panel = {
    x: lerp(PANEL_BIG.x, PANEL_SMALL.x, collapse),
    y: lerp(PANEL_BIG.y, PANEL_SMALL.y, collapse),
    w: lerp(PANEL_BIG.w, PANEL_SMALL.w, collapse),
    h: lerp(PANEL_BIG.h, PANEL_SMALL.h, collapse),
  };
  const phoneX = (x: number) => tween(x, 24, 14, -520, 0, EASE.out);
  const scan = f >= 32 && f <= 56 ? tween(f, 32, 24, 0, 1.12, EASE.inOut) : undefined;
  const hiHealth = prog(f, 40, 8);
  const hiApps = prog(f, 48, 8);
  const sy = (PHONE.width * (146.7 / 71.5) - PHONE.width * 0.072) / 844;
  const bez = PHONE.width * 0.036;
  const healthY = PHONE.top + bez + 226 * sy;
  const appsY = PHONE.top + bez + 540 * sy;
  const edgeX = PHONE.left + PHONE.width - 8;
  return (
    <AbsoluteFill style={{ clipPath: `inset(0 0 0 ${(1 - wipe) * 100}%)` }}>
      <AbsoluteFill style={{ background: COLORS.pearl }} />
      <div style={{ position: "absolute", left: CONTENT.left, top: 176, display: "flex", alignItems: "center", gap: 12, opacity: prog(f, 0, 10) }}>
        <div style={{ width: 10, height: 10, borderRadius: 5, background: COLORS.blue }} />
        <span style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: 30, letterSpacing: "0.18em", color: COLORS.navy }}>DI ACE SMARTPHONE</span>
      </div>
      <KineticHeadline start={BM_SOLUTION_LEAD_IN + 4} gap={6} size={96} lines={[{ text: "Kami check" }, { text: "punca dulu.", color: COLORS.blue }]} style={{ position: "absolute", left: CONTENT.left, top: 236, width: CONTENT.width }} />

      {/* storefront: establishes the place, then becomes a panel in the report */}
      <div style={{ position: "absolute", left: panel.x, top: panel.y, width: panel.w, height: panel.h, borderRadius: 32, overflow: "hidden", boxShadow: "0 30px 70px rgba(26,26,46,0.18)", clipPath: `inset(0 0 ${(1 - prog(f, 0, 12)) * 100}% 0 round 32px)` }}>
        <div style={{ position: "absolute", inset: 0, transform: `scale(${1.05 + f * 0.001})` }}>
          <MediaSlot still="assets/bateri-merah/storefront.jpg" video="assets/bateri-merah/service-check.mp4" label="ACE storefront / service counter" objectPosition="40% 45%" />
        </div>
        <div style={{ position: "absolute", left: 18, bottom: 18, padding: "8px 14px", borderRadius: 10, background: "rgba(26,26,46,0.88)", color: COLORS.pearl, fontFamily: FONTS.body, fontWeight: 600, fontSize: 22 }}>ACE Smartphone, Kepala Batas</div>
      </div>

      {/* the phone being checked */}
      <div style={{ position: "absolute", left: PHONE.left, top: PHONE.top, transform: `translateX(${phoneX(f)}px) rotate(${tween(f, 24, 16, -6, -1, EASE.out)}deg)`, filter: `blur(${motionBlur(phoneX, f, 0.03)}px)`, opacity: f >= 24 ? 1 : 0 }}>
        <PhoneMockup width={PHONE.width} sheen={tween(f, 30, 30, -0.2, 1.2, EASE.inOut)}>
          <BatteryUsageScreen scan={scan} hiHealth={hiHealth} hiApps={hiApps} />
        </PhoneMockup>
        <FocusBrackets w={PHONE.width} h={PHONE.width * (146.7 / 71.5)} p={prog(f, 30, 10, EASE.back)} />
      </div>
      <div style={{ position: "absolute", left: PHONE.left + 18, top: PHONE.top + PHONE.width * (146.7 / 71.5) + 10, fontFamily: FONTS.body, fontSize: 20, color: COLORS.greyLight, opacity: prog(f, 36, 8) }}>*Contoh paparan</div>

      <Connector points={[[edgeX, healthY], [430, healthY], [430, 868], [452, 868]]} progress={prog(f, 40, 10, EASE.inOut)} color={COLORS.blue} width={3} />
      <Connector points={[[edgeX, appsY], [436, appsY], [436, 972], [452, 972]]} progress={prog(f, 48, 10, EASE.inOut)} color={COLORS.blue} width={3} />
      <div style={{ position: "absolute", left: 452, top: 830, width: 508, display: "flex", flexDirection: "column", gap: 20 }}>
        <CheckRow label="Kesihatan bateri" p={prog(f, 38, 10)} done={prog(f, 50, 8)} />
        <CheckRow label="Penggunaan app & GPS" p={prog(f, 44, 10)} done={prog(f, 58, 8)} />
      </div>
      <div style={{ position: "absolute", left: 452, top: 1052, width: 508 }}>
        <OfferCard p={prog(f, 70, 12, EASE.out)} draw={prog(f, 78, 8)} />
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 1236 }}>
        <Stepper start={BM_SOLUTION_LEAD_IN + 82} gap={8} width={CONTENT.width} />
      </div>
    </AbsoluteFill>
  );
};
