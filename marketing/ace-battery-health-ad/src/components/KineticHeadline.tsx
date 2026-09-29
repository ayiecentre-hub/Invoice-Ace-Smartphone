import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, EASE, FONTS } from "../theme";
import { motionBlur, tween } from "../lib/anim";

type Line = { text: string; color?: string; size?: number; font?: "heading" | "serif"; weight?: number };

type Props = {
  lines: Line[];
  start: number;
  /** Frames between lines. */
  gap?: number;
  size?: number;
  align?: "left" | "center";
  color?: string;
  /** Letter-spacing tightens as the line lands (typographic tracking animation). */
  track?: boolean;
  style?: React.CSSProperties;
};

/** Line-by-line mask reveal: each line slides up from behind a hard edge. */
export const KineticHeadline: React.FC<Props> = ({
  lines,
  start,
  gap = 6,
  size = 96,
  align = "left",
  color = COLORS.navy,
  track = true,
  style,
}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ textAlign: align, ...style }}>
      {lines.map((l, i) => {
        const s = start + i * gap;
        const y = (f: number) => tween(f, s, 16, 110, 0, EASE.out);
        const ls = track ? tween(frame, s, 22, 0.06, -0.035, EASE.out) : -0.035;
        const fs = l.size ?? size;
        const serif = l.font === "serif";
        return (
          <div key={i} style={{ overflow: "hidden", paddingBottom: fs * 0.1, marginBottom: -fs * 0.1 }}>
            <div
              style={{
                transform: `translateY(${y(frame)}%)`,
                filter: `blur(${motionBlur(y, frame, 0.08)}px)`,
                fontFamily: serif ? FONTS.serif : FONTS.heading,
                fontStyle: serif ? "italic" : "normal",
                fontWeight: serif ? 400 : l.weight ?? 700,
                fontSize: fs,
                lineHeight: 1.0,
                letterSpacing: serif ? "-0.01em" : `${ls}em`,
                color: l.color ?? color,
                whiteSpace: "nowrap",
              }}
            >
              {l.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};
