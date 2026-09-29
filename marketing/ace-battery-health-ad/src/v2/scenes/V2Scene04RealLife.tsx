import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { AnimatedText } from "../../components/AnimatedText";
import { KineticHeadline } from "../../components/KineticHeadline";
import { MediaSlot } from "../../components/MediaSlot";
import { motionBlur, prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";

const STRIP = { top: 548, h: 272, gap: 18 };

/** A horizontal strip that wipes open left→right and later whips out to the left. */
const Strip: React.FC<{ i: number; open: number; exitAt: number; children: React.ReactNode }> = ({ i, open, exitAt, children }) => {
  const frame = useCurrentFrame();
  const reveal = prog(frame, open, 10, EASE.out);
  const out = (f: number) => tween(f, exitAt + i * 2, 9, 0, -1150, EASE.in);
  return (
    <div
      style={{
        position: "absolute",
        left: CONTENT.left,
        top: STRIP.top + i * (STRIP.h + STRIP.gap),
        width: CONTENT.width,
        height: STRIP.h,
        borderRadius: 28,
        overflow: "hidden",
        clipPath: `inset(0 ${(1 - reveal) * 100}% 0 0 round 28px)`,
        transform: `translateX(${out(frame)}px)`,
        filter: `blur(${motionBlur(out, frame, 0.04)}px)`,
        boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
      }}
    >
      {children}
    </div>
  );
};

const LowAndCable: React.FC = () => {
  const frame = useCurrentFrame();
  const plug = tween(frame, 42, 10, 420, 0, EASE.out);
  const blink = 0.55 + 0.45 * Math.abs(Math.cos(frame * 0.22));
  return (
    <AbsoluteFill style={{ background: "radial-gradient(90% 90% at 35% 50%, #23253d 0%, #0f101b 100%)" }}>
      <div style={{ position: "absolute", left: 90, top: 76, width: 300, height: 120, borderRadius: 30, border: "9px solid rgba(247,247,248,0.6)", padding: 11 }}>
        <div style={{ width: "7%", height: "100%", borderRadius: 12, background: COLORS.lowBattery, opacity: blink }} />
      </div>
      <div style={{ position: "absolute", left: 399, top: 116, width: 14, height: 40, borderRadius: "0 8px 8px 0", background: "rgba(247,247,248,0.6)" }} />
      <div style={{ position: "absolute", left: 96, top: 206, fontFamily: FONTS.heading, fontWeight: 600, fontSize: 40, color: COLORS.pearl, opacity: 0.85 }}>3%</div>
      {/* Lightning cable reaching in from the right */}
      <div style={{ position: "absolute", left: 426 + plug, top: 118, display: "flex", alignItems: "center" }}>
        <div style={{ width: 30, height: 20, borderRadius: 3, background: "linear-gradient(180deg,#c9c9ce,#f4f4f6,#c9c9ce)" }} />
        <div style={{ width: 110, height: 58, borderRadius: 14, background: "linear-gradient(180deg,#e8e8ec,#ffffff,#e0e0e6)" }} />
        <div style={{ width: 600, height: 24, background: "linear-gradient(180deg,#e4e4e8,#fafafa,#dcdce2)" }} />
      </div>
      <div style={{ position: "absolute", left: 360, top: 96, width: 80, height: 80, borderRadius: 40, border: `3px solid ${COLORS.blue}`, opacity: frame > 50 ? 1 - prog(frame, 50, 14) : 0, transform: `scale(${0.6 + prog(frame, 50, 14)})` }} />
    </AbsoluteFill>
  );
};

/**
 * VARIATION B · 0:09–0:12. Editorial triptych: three strips open one by one (face,
 * terminal, low battery + charger), headline anchored above, then the strips whip out.
 */
export const V2Scene04RealLife: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.navy }}>
      <KineticHeadline
        start={2}
        gap={6}
        size={100}
        color={COLORS.pearl}
        lines={[{ text: "BILA BATTERY" }, { text: "DAH TAK SIHAT…" }]}
        style={{ position: "absolute", left: CONTENT.left, top: 186, width: CONTENT.width }}
      />
      <div style={{ position: "absolute", left: CONTENT.left, top: 420, width: CONTENT.width }}>
        <AnimatedText text="urusan harian boleh mula terganggu." start={20} stagger={2} fontSize={46} weight={500} letterSpacing="-0.01em" color="rgba(247,247,248,0.86)" style={{ fontFamily: FONTS.body }} />
      </div>
      <Strip i={0} open={6} exitAt={70}>
        <div style={{ position: "absolute", inset: 0, transform: `scale(${1.12 + frame * 0.002})` }}>
          <MediaSlot still="assets/customer-payment.jpg" video="assets/customer-payment.mp4" videoStartFrom={90} label="Customer reaction" objectPosition="30% 32%" />
        </div>
      </Strip>
      <Strip i={1} open={18} exitAt={70}>
        <Img src={staticFile("assets/payment-terminal.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "40% 60%", transform: `translateX(${-frame * 0.8}px) scale(1.12)` }} />
        <div style={{ position: "absolute", left: 24, top: 22, padding: "10px 18px", borderRadius: 12, background: COLORS.pearl, fontFamily: FONTS.body, fontWeight: 700, fontSize: 26, color: COLORS.navy }}>Menunggu bayaran…</div>
      </Strip>
      <Strip i={2} open={30} exitAt={70}>
        <LowAndCable />
      </Strip>
    </AbsoluteFill>
  );
};
