import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, EASE, FONTS } from "../../theme";
import { prog, tween } from "../../lib/anim";

const MESSAGE = "SEMAK BATERI";

/**
 * Shows exactly what to send: the message types itself, is delivered (✓✓), and hands off
 * to the CTA. A chat cue with a job to do, rather than a generic logo sticker.
 */
export const ChatPreview: React.FC<{ start: number; deliveredAt: number }> = ({ start, deliveredAt }) => {
  const frame = useCurrentFrame();
  const inP = prog(frame, start, 10);
  const chars = Math.floor(tween(frame, start + 4, 16, 0, MESSAGE.length, EASE.linear));
  const delivered = frame >= deliveredAt;
  const caret = !delivered && Math.floor(frame / 8) % 2 === 0;
  const tickP = prog(frame, deliveredAt, 6);
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", opacity: inP, transform: `translateY(${(1 - inP) * 24}px)` }}>
      <div
        style={{
          position: "relative",
          background: COLORS.pearl,
          borderRadius: "30px 30px 8px 30px",
          padding: "20px 28px 16px",
          minWidth: 360,
          boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 44, letterSpacing: "0.01em", color: COLORS.navy }}>
          {MESSAGE.slice(0, chars)}
          <span style={{ opacity: caret ? 1 : 0, color: COLORS.blue }}>|</span>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8, marginTop: 2, fontFamily: FONTS.body, fontSize: 22, color: COLORS.greyLight }}>
          <span>10:26</span>
          <svg width="30" height="18" viewBox="0 0 30 18" style={{ opacity: tickP }}>
            <path d="M2 10 L7 15 L16 4" fill="none" stroke={delivered ? COLORS.blue : COLORS.greyLight} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 13 L13 15 L22 4" fill="none" stroke={delivered ? COLORS.blue : COLORS.greyLight} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};
