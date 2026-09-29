import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, EASE, FONTS } from "../theme";
import { motionBlur, tween } from "../lib/anim";
import { parseMarkup, toWords } from "../lib/markup";

type Props = {
  /** Supports [phrase]{blue|gold|serif} markup. */
  text: string;
  start: number;
  /** Frames between words. */
  stagger?: number;
  /** Frames each word takes to arrive. */
  duration?: number;
  fontSize: number;
  color?: string;
  weight?: number;
  lineHeight?: number;
  letterSpacing?: string;
  align?: "left" | "center";
  /** "mask": word rises out of an invisible slot. "punch": word scales down into place. */
  mode?: "mask" | "punch";
  emphasisScale?: number;
  style?: React.CSSProperties;
  uppercase?: boolean;
};

const emphasisStyle = (e: string | undefined, base: string): React.CSSProperties => {
  if (e === "gold") return { color: COLORS.gold };
  if (e === "blue") return { color: COLORS.blue };
  if (e === "serif")
    return { fontFamily: FONTS.serif, fontStyle: "italic", fontWeight: 400, letterSpacing: "0", color: base };
  return {};
};

/** Word-by-word kinetic text with velocity blur. Every word lands on its own beat. */
export const AnimatedText: React.FC<Props> = ({
  text,
  start,
  stagger = 3,
  duration = 14,
  fontSize,
  color = COLORS.navy,
  weight = 700,
  lineHeight = 1.02,
  letterSpacing = "-0.03em",
  align = "left",
  mode = "mask",
  emphasisScale = 1,
  style,
  uppercase,
}) => {
  const frame = useCurrentFrame();
  const words = toWords(parseMarkup(text));
  return (
    <div
      style={{
        fontFamily: FONTS.heading,
        fontSize,
        fontWeight: weight,
        lineHeight,
        letterSpacing,
        color,
        textAlign: align,
        textTransform: uppercase ? "uppercase" : undefined,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : "flex-start",
        columnGap: fontSize * 0.26,
        ...style,
      }}
    >
      {words.map((w, i) => {
        const s = start + i * stagger;
        const isEm = Boolean(w.emphasis);
        const ey = (f: number) => tween(f, s, duration, 105, 0, EASE.out);
        const scale = (f: number) => tween(f, s, duration, 1.35, 1, EASE.out);
        const blur =
          mode === "mask" ? motionBlur(ey, frame, 0.09) : motionBlur((f) => scale(f) * 100, frame, 0.25);
        const opacity = tween(frame, s, Math.max(4, duration * 0.45), 0, 1, EASE.linear);
        const inner: React.CSSProperties =
          mode === "mask"
            ? { transform: `translateY(${ey(frame)}%)` }
            : { transform: `scale(${scale(frame) * (isEm ? emphasisScale : 1)})`, opacity };
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              overflow: mode === "mask" ? "hidden" : "visible",
              paddingBottom: mode === "mask" ? fontSize * 0.12 : 0,
              marginBottom: mode === "mask" ? -fontSize * 0.12 : 0,
            }}
          >
            <span
              style={{
                display: "inline-block",
                transformOrigin: "50% 70%",
                filter: blur > 0.2 ? `blur(${blur}px)` : undefined,
                ...inner,
                ...emphasisStyle(w.emphasis, color),
              }}
            >
              {w.text}
            </span>
          </span>
        );
      })}
    </div>
  );
};
