/**
 * Project switches. Flip these when real media is delivered (see README → "Asset replacement").
 */
export const CONFIG = {
  /** Set true once public/assets/voiceover.wav exists (recorded to the VO timing map). */
  ENABLE_VOICEOVER: false,
  /** Set true once real footage is placed in public/assets/*.mp4. Otherwise the poster stills are used. */
  USE_FOOTAGE: false,
  /** Draw labelled boxes over every placeholder media slot (for review with the client). */
  SHOW_PLACEHOLDER_LABELS: false,
} as const;
