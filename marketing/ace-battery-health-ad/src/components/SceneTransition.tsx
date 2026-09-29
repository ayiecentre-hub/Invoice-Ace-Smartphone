import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, EASE } from "../theme";
import { tween } from "../lib/anim";

type Props = {
  /** Absolute frame where the panel fully covers the screen (the cut happens here). */
  at: number;
  color?: string;
  /** Frames to cover / uncover. */
  half?: number;
  direction?: "up" | "left";
};

/**
 * Editorial mask wipe: a solid panel with a thin Trust-Blue leading edge sweeps across,
 * the cut happens underneath, then the panel exits the other side.
 */
export const SceneTransition: React.FC<Props> = ({ at, color = COLORS.navy, half = 8, direction = "up" }) => {
  const frame = useCurrentFrame();
  if (frame < at - half || frame > at + half) return null;
  const enter = tween(frame, at - half, half, 100, 0, EASE.in);
  const exit = tween(frame, at, half, 0, -100, EASE.out);
  const pos = frame < at ? enter : exit;
  const axis = direction === "up" ? "Y" : "X";
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill style={{ background: color, transform: `translate${axis}(${pos}%)` }}>
        <div
          style={
            direction === "up"
              ? { position: "absolute", left: 0, right: 0, top: frame < at ? 0 : undefined, bottom: frame < at ? undefined : 0, height: 8, background: COLORS.blue }
              : { position: "absolute", top: 0, bottom: 0, left: frame < at ? 0 : undefined, right: frame < at ? undefined : 0, width: 8, background: COLORS.blue }
          }
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
