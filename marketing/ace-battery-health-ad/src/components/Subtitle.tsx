import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, CONTENT, EASE, FONTS } from "../theme";
import { tween } from "../lib/anim";
import { parseMarkup } from "../lib/markup";
import { SUBTITLES, type SubtitleCue } from "../timing";

/**
 * Editorial burned-in captions. Blue phrases become solid Trust-Blue chips (legible on the
 * navy plate); gold phrases are set in Warm Gold. Kept above the TikTok bottom UI band.
 */
export const Subtitle: React.FC<{ cues?: SubtitleCue[] }> = ({ cues = SUBTITLES }) => {
  const frame = useCurrentFrame();
  const cue = cues.find((c) => frame >= c.from && frame < c.to);
  if (!cue) return null;
  const inP = tween(frame, cue.from, 8, 0, 1, EASE.out);
  const outP = tween(frame, cue.to - 5, 5, 0, 1, EASE.in);
  const tokens = parseMarkup(cue.text);
  return (
    <div
      style={{
        position: "absolute",
        left: CONTENT.left,
        width: CONTENT.width,
        top: CONTENT.subtitleBandTop,
        height: 180,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        opacity: inP * (1 - outP),
        transform: `translateY(${(1 - inP) * 18}px)`,
      }}
    >
      <div
        style={{
          background: "rgba(26,26,46,0.9)",
          borderRadius: 22,
          padding: "16px 28px 18px",
          maxWidth: CONTENT.width,
          fontFamily: FONTS.body,
          fontWeight: 500,
          fontSize: 42,
          lineHeight: 1.32,
          color: COLORS.pearl,
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(18,18,31,0.25)",
        }}
      >
        {tokens.map((t, i) => {
          if (t.emphasis === "blue")
            return (
              <span
                key={i}
                style={{
                  background: COLORS.blue,
                  borderRadius: 10,
                  padding: "0 10px 2px",
                  margin: "0 2px",
                  fontWeight: 700,
                  boxDecorationBreak: "clone",
                  WebkitBoxDecorationBreak: "clone",
                }}
              >
                {t.text}
              </span>
            );
          if (t.emphasis === "gold")
            return (
              <span key={i} style={{ color: COLORS.gold, fontWeight: 700 }}>
                {t.text}
              </span>
            );
          return <span key={i}>{t.text}</span>;
        })}
      </div>
    </div>
  );
};
