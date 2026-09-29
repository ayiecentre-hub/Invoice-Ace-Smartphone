import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { MediaSlot } from "../../components/MediaSlot";
import { PhoneMockup } from "../../components/PhoneMockup";
import { motionBlur, prog, tween } from "../../lib/anim";
import { COLORS, CONTENT, EASE, FONTS } from "../../theme";
import { GroupChatScreen } from "../screens";

const BEATS = [0, 26, 52] as const;
const LABELS = ["Study", "Nota", "Group chat"];

const Beat: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const frame = useCurrentFrame();
  const r = prog(frame, at, 7, EASE.out);
  return <AbsoluteFill style={{ clipPath: `inset(0 0 0 ${(1 - r) * 100}%)` }}>{children}</AbsoluteFill>;
};

/** 0:09–0:12 REAL-LIFE IMPACT. A campus day: each beat lights its chip and adds one more "cari plug". */
export const Scene04Impact: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = frame >= BEATS[2] ? 2 : frame >= BEATS[1] ? 1 : 0;
  const count = frame >= BEATS[2] + 6 ? 3 : frame >= BEATS[1] + 6 ? 2 : frame >= 6 ? 1 : 0;
  const bump = count ? 1 + 0.12 * (1 - prog(frame, [6, 32, 58][count - 1], 8)) : 1;
  const out = (f: number) => tween(f, 80, 10, 0, -1100, EASE.in);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 60%, ${COLORS.navySoft} 0%, ${COLORS.navy} 60%, ${COLORS.navyDeep} 100%)` }}>
      <div style={{ position: "absolute", left: CONTENT.left, top: 176, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 66, color: COLORS.pearl, opacity: prog(frame, 2, 10) }}>Hari-hari kat kampus…</div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 272, display: "flex", gap: 14, opacity: prog(frame, 6, 10) }}>
        {LABELS.map((l, i) => (
          <div key={l} style={{ padding: "12px 22px", borderRadius: 999, border: `2px solid ${beat === i ? COLORS.blue : COLORS.hairlineOnNavy}`, background: beat === i ? COLORS.blue : "transparent", fontFamily: FONTS.heading, fontWeight: 700, fontSize: 30, color: COLORS.pearl, opacity: beat === i ? 1 : 0.5 }}>
            {l}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 370, display: "flex", alignItems: "center", gap: 14, padding: "12px 20px", borderRadius: 16, background: COLORS.pearl, opacity: prog(frame, 4, 8), transform: `scale(${bump})`, transformOrigin: "0 50%" }}>
        <svg width="30" height="40" viewBox="0 0 64 84"><rect x="10" y="22" width="44" height="36" rx="8" fill={COLORS.blue} /><rect x="20" y="6" width="6" height="18" rx="3" fill={COLORS.blue} /><rect x="38" y="6" width="6" height="18" rx="3" fill={COLORS.blue} /><rect x="28" y="58" width="8" height="24" rx="3" fill={COLORS.blue} /></svg>
        <span style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: 30, color: COLORS.navy }}>Cari plug hari ni: <span style={{ color: COLORS.blue, fontVariantNumeric: "tabular-nums" }}>{count}×</span></span>
      </div>
      <div style={{ position: "absolute", left: CONTENT.left, top: 480, width: CONTENT.width, height: 900, borderRadius: 40, overflow: "hidden", background: COLORS.navyDeep, boxShadow: "0 40px 90px rgba(0,0,0,0.45)", transform: `translateX(${out(frame)}px)`, filter: `blur(${motionBlur(out, frame, 0.04)}px)`, clipPath: `inset(0 0 ${(1 - prog(frame, 0, 10)) * 100}% 0 round 40px)` }}>
        <AbsoluteFill style={{ transform: `scale(${1.08 + frame * 0.003})` }}>
          <MediaSlot still="assets/cari-plug/face.jpg" video="assets/cari-plug/study-broll.mp4" label="Student studying (b-roll)" objectPosition="50% 30%" />
        </AbsoluteFill>
        <Beat at={BEATS[1]}>
          <AbsoluteFill style={{ background: COLORS.navyDeep }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 300, height: 290, overflow: "hidden", transform: `scale(${1.02 + (frame - BEATS[1]) * 0.003})` }}>
            <MediaSlot still="assets/cari-plug/desk.jpg" video="assets/cari-plug/device-closeup.mp4" label="Phone charging on the desk" objectPosition="50% 60%" />
          </div>
          <div style={{ position: "absolute", left: 40, top: 640, fontFamily: FONTS.body, fontWeight: 600, fontSize: 34, color: "rgba(247,247,248,0.8)" }}>Telefon atas meja, <span style={{ color: COLORS.pearl }}>cas lagi.</span></div>
        </Beat>
        <Beat at={BEATS[2]}>
          <AbsoluteFill style={{ background: "radial-gradient(80% 60% at 50% 45%, #2a2d48 0%, #0f101b 100%)" }} />
          <div style={{ position: "absolute", left: (CONTENT.width - 640) / 2, top: -60, transform: `scale(${tween(frame, BEATS[2], 20, 1.08, 1, EASE.out)})`, transformOrigin: "50% 20%" }}>
            <PhoneMockup width={640} finish="silver">
              <GroupChatScreen n={tween(frame, BEATS[2] + 4, 24, 0, 4, EASE.linear)} level={14} />
            </PhoneMockup>
          </div>
        </Beat>
      </div>
    </AbsoluteFill>
  );
};
