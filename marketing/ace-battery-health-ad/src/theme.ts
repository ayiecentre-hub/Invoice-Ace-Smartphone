import { Easing } from "remotion";

/** ACE brand system. Navy + Pearl dominate; Trust Blue = interactive/education; Gold = tiny accents only. */
export const COLORS = {
  navy: "#1A1A2E",
  navyDeep: "#12121F",
  navySoft: "#26263F",
  pearl: "#F7F7F8",
  pearlDim: "#E9E9EE",
  blue: "#2B5EA7",
  blueSoft: "#DCE6F4",
  gold: "#C8860A",
  grey: "#5C5C5C",
  greyLight: "#8C8C96",
  hairline: "rgba(26,26,46,0.14)",
  hairlineOnNavy: "rgba(247,247,248,0.18)",
  /** Muted (not neon) red, used ONLY for the literal low-battery indicator. */
  lowBattery: "#C9463D",
  iosGreen: "#34C759",
} as const;

export const FONTS = {
  heading: "Inter, 'Helvetica Neue', Arial, sans-serif",
  body: "'DM Sans', Inter, Arial, sans-serif",
  serif: "'Instrument Serif', Georgia, serif",
  ios: "Inter, -apple-system, 'SF Pro Text', Arial, sans-serif",
} as const;

export const VIDEO = { width: 1080, height: 1920, fps: 30, durationInFrames: 600 } as const;

/** TikTok UI safe area. Critical content stays inside. */
export const SAFE = { top: 150, bottom: 300, right: 120, left: 72 } as const;
export const CONTENT = {
  left: SAFE.left,
  right: VIDEO.width - SAFE.right,
  width: VIDEO.width - SAFE.left - SAFE.right,
  top: SAFE.top,
  bottom: VIDEO.height - SAFE.bottom,
  /** Subtitles live in this band; scene layouts keep it clear. */
  subtitleBandTop: 1440,
} as const;

/** Hand-tuned curves (no default presets). */
export const EASE = {
  /** Fast departure, long silky settle: primary entrances. */
  out: Easing.bezier(0.16, 1, 0.3, 1),
  /** Editorial symmetric move: camera pushes, wipes. */
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  /** Anticipation-free accelerate: exits, whips. */
  in: Easing.bezier(0.55, 0, 0.9, 0.35),
  /** Controlled overshoot for small punctuation marks only. */
  back: Easing.bezier(0.34, 1.45, 0.64, 1),
  linear: Easing.linear,
} as const;
