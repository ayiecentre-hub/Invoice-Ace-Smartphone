import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { MediaSlot } from "../../components/MediaSlot";
import { PhoneMockup } from "../../components/PhoneMockup";
import { motionBlur, prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { LiveScreen } from "../screens";

const B = { live: 0, stock: 60, face: 105 } as const;

const Beat: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const frame = useCurrentFrame();
  const r = prog(frame, at, 7, EASE.out);
  return <AbsoluteFill style={{ clipPath: `inset(0 0 0 ${(1 - r) * 100}%)` }}>{children}</AbsoluteFill>;
};

const Stat: React.FC<{ label: string; value: string; alert: number }> = ({ label, value, alert }) => (
  <div style={{ flex: 1, padding: "16px 22px", borderRadius: 20, background: "rgba(247,247,248,0.06)", border: `1.5px solid ${alert > 0.5 ? COLORS.alertText : COLORS.hairlineOnNavy}` }}>
    <div style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: 22, letterSpacing: "0.12em", color: COLORS.greyLight }}>{label}</div>
    <div style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 52, letterSpacing: "-0.03em", color: alert > 0.5 ? COLORS.alertText : COLORS.pearl, fontVariantNumeric: "tabular-nums" }}>{value}</div>
  </div>
);

/** 0:13–0:18 IMPACT (150 frames). The live cuts, the counters fall, the stock waits: stated calmly, no drama. */
export const Scene04Impact: React.FC = () => {
  const frame = useCurrentFrame();
  const drop = prog(frame, 48, 22, EASE.inOut);
  const viewers = Math.round(1514 * (1 - drop));
  const out = (f: number) => tween(f, 140, 10, 0, -1100, EASE.in);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 60%, ${COLORS.navySoft} 0%, ${COLORS.navy} 60%, ${COLORS.navyDeep} 100%)` }}>
      <div style={{ position: "absolute", left: CONTENT.left, top: 176, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 66, color: COLORS.pearl, opacity: prog(frame, 2, 10) }}>Bila live terputus…</div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 280, width: CONTENT.width, display: "flex", gap: 18, opacity: prog(frame, 8, 10) }}>
        <Stat label="PENONTON" value={viewers.toLocaleString("en")} alert={drop} />
        <Stat label="ORDER" value={frame > 60 ? "Tergendala" : "Masuk…"} alert={frame > 60 ? 1 : 0} />
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 470, width: CONTENT.width, height: 900, borderRadius: 40, overflow: "hidden", background: COLORS.navyDeep, boxShadow: "0 40px 90px rgba(0,0,0,0.45)", transform: `translateX(${out(frame)}px)`, filter: `blur(${motionBlur(out, frame, 0.04)}px)`, clipPath: `inset(0 0 ${(1 - prog(frame, 0, 10)) * 100}% 0 round 40px)` }}>
        <AbsoluteFill style={{ background: "radial-gradient(80% 60% at 50% 45%, #2a2d48 0%, #0f101b 100%)" }} />
        <div style={{ position: "absolute", left: (CONTENT.width - 440) / 2, top: 20 }}>
          <PhoneMockup width={440} finish="silver">
            <LiveScreen t={frame + 20} viewers={viewers || 1514} level={1} alert={0} ended={prog(frame, 44, 6, EASE.linear)} />
          </PhoneMockup>
        </div>
        <Beat at={B.stock}>
          <AbsoluteFill style={{ background: COLORS.navyDeep }} />
          <AbsoluteFill style={{ transform: `scale(${1.08 + (frame - B.stock) * 0.003})` }}>
            <MediaSlot still="assets/tengah-live/stock.jpg" video="assets/tengah-live/stock-broll.mp4" label="Folded stock waiting" objectPosition="50% 50%" />
          </AbsoluteFill>
          <div style={{ position: "absolute", left: 28, top: 28, padding: "10px 18px", borderRadius: 12, background: COLORS.pearl, fontFamily: FONTS.body, fontWeight: 700, fontSize: 28, color: COLORS.navy }}>Stok menunggu</div>
        </Beat>
        <Beat at={B.face}>
          <AbsoluteFill style={{ transform: `scale(${1.1 + (frame - B.face) * 0.003})` }}>
            <MediaSlot still="assets/tengah-live/face.jpg" video="assets/tengah-live/reaction.mp4" label="Seller's reaction" objectPosition="50% 30%" />
          </AbsoluteFill>
        </Beat>
      </div>
    </AbsoluteFill>
  );
};
