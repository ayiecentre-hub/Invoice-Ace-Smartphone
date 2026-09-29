import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Connector } from "../components/Connector";
import { DiagnosticOverlay, FocusBrackets } from "../components/DiagnosticOverlay";
import { KineticHeadline } from "../components/KineticHeadline";
import { MediaSlot } from "../components/MediaSlot";
import { PhoneMockup } from "../components/PhoneMockup";
import { BatteryHealthScreen } from "../components/PhoneScreens";
import { motionBlur, prog, tween } from "../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../theme";

/** Frames the scene starts early so it can push in while scene 4 whips out (match cut). */
export const SOLUTION_LEAD_IN = 10;

const PHONE = { width: 330, left: 96, top: 548 };
const PHONE_H = PHONE.width * (146.7 / 71.5);

/**
 * 0:12–0:16 — ACE solution. The same iPhone 13 lands on the ACE counter, is scanned in
 * front of the customer, and the four-step process reads left → right. Then: free check.
 */
export const Scene05Solution: React.FC = () => {
  const raw = useCurrentFrame();
  const f = raw - SOLUTION_LEAD_IN; // content timeline: 0 = 0:12.0
  const push = (x: number) => tween(x, 0, SOLUTION_LEAD_IN, 1080, 0, EASE.out);
  const phoneX = (x: number) => tween(x, -SOLUTION_LEAD_IN + 2, 16, 560, 0, EASE.out);
  const brackets = prog(f, 6, 10, EASE.back);
  const scan = f >= 8 && f <= 34 ? tween(f, 8, 26, 0, 1.15, EASE.inOut) : undefined;
  const focus = prog(f, 30, 10);
  const callout = prog(f, 32, 14);
  const connector = prog(f, 30, 14, EASE.inOut);
  const eyebrow = prog(f, 2, 12);
  const rule = prog(f, 72, 16, EASE.inOut);
  const bgPush = tween(f, 0, 120, 1.0, 1.06, EASE.linear);

  // Maximum Capacity row position on the phone (iOS y≈269pt of 844)
  const screenScale = (PHONE.width * (1 - 0.072)) / 390;
  const rowY = PHONE.top + PHONE.width * 0.036 + 269 * screenScale * 1.0;
  const rowX = PHONE.left + PHONE.width - 30;

  return (
    <AbsoluteFill style={{ transform: `translateX(${push(raw)}px)`, filter: `blur(${motionBlur(push, raw, 0.03)}px)` }}>
      <AbsoluteFill style={{ background: COLORS.pearl }} />
      {/* ACE counter: technician footage behind, pearl fades top and bottom for the type */}
      <AbsoluteFill style={{ transform: `scale(${bgPush})`, filter: "blur(2.5px) saturate(0.9)" }}>
        <MediaSlot
          still="assets/ace-technician.jpg"
          video="assets/ace-diagnostic.mp4"
          label="ACE technician checking phone"
          objectPosition="50% 12%"
          style={{ left: 280, width: 800 }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, #F7F7F8 0%, rgba(247,247,248,0.94) 26%, rgba(247,247,248,0.25) 42%, rgba(247,247,248,0.25) 58%, rgba(247,247,248,0.96) 70%, #F7F7F8 100%), linear-gradient(90deg, #F7F7F8 0%, rgba(247,247,248,0.6) 30%, rgba(247,247,248,0) 55%)",
        }}
      />
      {/* eyebrow with gold check (tiny accent) */}
      <div
        style={{
          position: "absolute",
          left: CONTENT.left,
          top: 184,
          display: "flex",
          alignItems: "center",
          gap: 14,
          opacity: eyebrow,
          transform: `translateY(${(1 - eyebrow) * 14}px)`,
        }}
      >
        <svg width="34" height="34" viewBox="0 0 34 34">
          <circle cx="17" cy="17" r="15" fill="none" stroke={COLORS.gold} strokeWidth="2.5" />
          <path d="M10 17.5 L15 22 L24 12.5" fill="none" stroke={COLORS.gold} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: 30, letterSpacing: "0.18em", color: COLORS.navy }}>
          DI ACE SMARTPHONE
        </span>
      </div>
      <KineticHeadline
        start={SOLUTION_LEAD_IN + 56}
        gap={6}
        size={96}
        lines={[{ text: "Pemeriksaan bateri" }, { text: "percuma.", color: COLORS.blue }]}
        style={{ position: "absolute", left: CONTENT.left, top: 246, width: CONTENT.width }}
      />
      <div style={{ position: "absolute", left: CONTENT.left, top: 470, width: 150 * rule, height: 4, background: COLORS.gold, borderRadius: 2 }} />

      {/* the same iPhone 13 */}
      <div
        style={{
          position: "absolute",
          left: PHONE.left,
          top: PHONE.top,
          transform: `translateX(${phoneX(f)}px) rotate(${tween(f, -8, 18, 6, -2, EASE.out)}deg)`,
        }}
      >
        <PhoneMockup width={PHONE.width} sheen={tween(f, 0, 40, -0.2, 1.2, EASE.inOut)}>
          <BatteryHealthScreen focus={focus} scan={scan} />
        </PhoneMockup>
        <FocusBrackets w={PHONE.width} h={PHONE_H} p={brackets} />
      </div>

      {/* diagnostic callout */}
      <Connector
        points={[
          [rowX, rowY],
          [590, rowY],
          [590, 760],
          [616, 760],
        ]}
        progress={connector}
        color={COLORS.blue}
        width={3.5}
      />
      <div
        style={{
          position: "absolute",
          left: 616,
          top: 692,
          width: 344,
          padding: "22px 26px",
          borderRadius: 24,
          background: "rgba(255,255,255,0.97)",
          boxShadow: "0 24px 60px rgba(26,26,46,0.16)",
          opacity: callout,
          transform: `translateX(${(1 - callout) * 30}px)`,
        }}
      >
        <div style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: 22, letterSpacing: "0.12em", color: COLORS.grey }}>
          MAXIMUM CAPACITY
        </div>
        <div style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 84, letterSpacing: "-0.04em", color: COLORS.blue, lineHeight: 1.05 }}>
          76%
        </div>
        <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 26, color: COLORS.navy, lineHeight: 1.25 }}>
          Diterangkan depan anda.
        </div>
      </div>

      <div style={{ position: "absolute", left: CONTENT.left, top: 1276 }}>
        <DiagnosticOverlay start={SOLUTION_LEAD_IN + 22} stepGap={10} />
      </div>
    </AbsoluteFill>
  );
};
