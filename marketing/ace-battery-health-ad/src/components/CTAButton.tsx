import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, EASE, FONTS } from "../theme";
import { prog, tween } from "../lib/anim";

type Props = { start: number; pulseAt: number; label?: string };

/** Chat bubble with typing dots: a WhatsApp-style cue without using a generic logo sticker. */
const ChatCue: React.FC<{ frame: number; start: number }> = ({ frame, start }) => (
  <div style={{ position: "relative", width: 76, height: 66 }}>
    <svg width="76" height="66" viewBox="0 0 76 66">
      <path
        d="M14 4 H62 A12 12 0 0 1 74 16 V40 A12 12 0 0 1 62 52 H30 L14 64 V52 A12 12 0 0 1 2 40 V16 A12 12 0 0 1 14 4 Z"
        fill={COLORS.pearl}
      />
    </svg>
    <div style={{ position: "absolute", left: 0, right: 0, top: 22, display: "flex", justifyContent: "center", gap: 7 }}>
      {[0, 1, 2].map((i) => {
        const t = (frame - start - i * 3) / 7;
        const y = t > 0 ? -Math.max(0, Math.sin(t * Math.PI)) * 5 * (Math.floor(t) % 3 === 0 ? 1 : 0.35) : 0;
        return <div key={i} style={{ width: 10, height: 10, borderRadius: 5, background: COLORS.blue, transform: `translateY(${y}px)` }} />;
      })}
    </div>
  </div>
);

export const CTAButton: React.FC<Props> = ({ start, pulseAt, label = "WHATSAPP SEMAK BATERI" }) => {
  const frame = useCurrentFrame();
  const inP = prog(frame, start, 16);
  const pulseUp = tween(frame, pulseAt, 7, 0, 1, EASE.out);
  const pulseDown = tween(frame, pulseAt + 7, 12, 0, 1, EASE.inOut);
  const pulse = 1 + 0.035 * (pulseUp - pulseDown);
  const ring = tween(frame, pulseAt, 22, 0, 1, EASE.out);
  const sweep = tween(frame, start + 10, 26, -30, 130, EASE.inOut);
  return (
    <div style={{ position: "relative", width: 888, height: 160, transform: `translateY(${(1 - inP) * 60}px)`, opacity: inP }}>
      {/* soft expanding ring on the pulse, not a neon glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 80,
          border: `3px solid ${COLORS.blue}`,
          transform: `scale(${1 + ring * 0.12}, ${1 + ring * 0.35})`,
          opacity: ring > 0 && ring < 1 ? (1 - ring) * 0.8 : 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 80,
          background: COLORS.blue,
          transform: `scale(${pulse})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(43,94,167,0.35), inset 0 1px 0 rgba(255,255,255,0.18)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${sweep}%`,
            width: "18%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)",
            transform: "skewX(-18deg)",
          }}
        />
        <ChatCue frame={frame} start={start + 8} />
        <div style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 50, letterSpacing: "-0.01em", color: COLORS.pearl }}>
          {label}
        </div>
      </div>
    </div>
  );
};
