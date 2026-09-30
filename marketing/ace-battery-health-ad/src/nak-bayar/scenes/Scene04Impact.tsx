import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { KineticHeadline } from "../../components/KineticHeadline";
import { MediaSlot } from "../../components/MediaSlot";
import { prog } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { CashlessTiles } from "../components/Cashless";

/** 0:13–0:18 IMPACT (150 frames). Phone = wallet; when it dies, each daily task greys out, and the counter says so. */
export const Scene04Impact: React.FC = () => {
  const frame = useCurrentFrame();
  const inP = [0, 1, 2, 3].map((i) => prog(frame, 20 + i * 10, 10));
  const off = [0, 1, 2, 3].map((i) => prog(frame, 70 + i * 6, 8, EASE.back));
  const failed = frame >= 96;
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 60%, ${COLORS.navySoft} 0%, ${COLORS.navy} 60%, ${COLORS.navyDeep} 100%)` }}>
      <div style={{ position: "absolute", left: CONTENT.left, top: 176, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 62, color: COLORS.pearl, opacity: prog(frame, 2, 10) }}>Zaman cashless…</div>
      <KineticHeadline start={6} size={100} color={COLORS.pearl} lines={[{ text: "Telefon = dompet." }]} style={{ position: "absolute", left: CONTENT.left, top: 256, width: CONTENT.width }} />
      <div style={{ position: "absolute", left: CONTENT.left, top: 420 }}>
        <CashlessTiles inP={inP} off={off} />
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 790, width: CONTENT.width, height: 520, borderRadius: 36, overflow: "hidden", boxShadow: "0 40px 90px rgba(0,0,0,0.45)", clipPath: `inset(${(1 - prog(frame, 40, 12, EASE.out)) * 100}% 0 0 0 round 36px)` }}>
        <div style={{ position: "absolute", inset: 0, transform: `scale(${1.06 + frame * 0.0012})` }}>
          <MediaSlot still="assets/nak-bayar/counter.jpg" video="assets/nak-bayar/counter-broll.mp4" label="Payment counter / terminal" objectPosition="45% 60%" />
        </div>
        <div style={{ position: "absolute", left: 26, top: 26, display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderRadius: 14, background: failed ? COLORS.alertText : COLORS.pearl, fontFamily: FONTS.body, fontWeight: 700, fontSize: 30, color: failed ? "#fff" : COLORS.navy, transform: `scale(${failed ? 1 + 0.08 * (1 - prog(frame, 96, 8)) : 1})`, transformOrigin: "0 50%" }}>
          {failed ? "✕ Bayaran tak berjaya" : "Menunggu bayaran…"}
        </div>
      </div>
    </AbsoluteFill>
  );
};
