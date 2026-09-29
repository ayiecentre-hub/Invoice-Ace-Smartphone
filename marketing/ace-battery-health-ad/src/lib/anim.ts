import { interpolate, spring, type EasingFunction } from "remotion";
import { EASE } from "../theme";

/** Clamped tween between two frames. */
export const tween = (
  frame: number,
  start: number,
  duration: number,
  from = 0,
  to = 1,
  easing: EasingFunction = EASE.out,
) =>
  interpolate(frame, [start, start + Math.max(1, duration)], [from, to], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** 0→1 progress helper. */
export const prog = (frame: number, start: number, duration: number, easing: EasingFunction = EASE.out) =>
  tween(frame, start, duration, 0, 1, easing);

/**
 * Velocity-driven blur: approximates shutter motion blur by measuring how far a value
 * moves between neighbouring frames. Cheap enough to use on every entrance.
 */
export const motionBlur = (fn: (f: number) => number, frame: number, strength = 0.06, max = 14) =>
  Math.min(max, Math.abs(fn(frame + 0.5) - fn(frame - 0.5)) * strength);

/** Damped spring with a settle we like for UI cards. */
export const settle = (frame: number, fps: number, delay = 0, stiffness = 170, damping = 22) =>
  spring({ frame: frame - delay, fps, config: { stiffness, damping, mass: 0.9 } });

/** Deterministic handheld-camera drift (no randomness between renders). */
export const handheld = (frame: number, amp = 1) => ({
  x: (Math.sin(frame * 0.21) * 3.2 + Math.sin(frame * 0.057 + 1.3) * 5) * amp,
  y: (Math.cos(frame * 0.17) * 2.6 + Math.sin(frame * 0.043 + 0.4) * 4) * amp,
  r: (Math.sin(frame * 0.09 + 0.7) * 0.22) * amp,
});

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
