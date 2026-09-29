import type { SfxCue, SubtitleCue } from "../timing";
import { VIDEO } from "../theme";

const s = (sec: number) => Math.round(sec * VIDEO.fps);

/**
 * VARIATION B: "Dua jam berbeza" (two clocks).
 * Same brief, script and scene slots as variation A; a different visual argument:
 * Battery % moves by the HOUR, Battery Health moves over the YEARS.
 */
export const SCENES_V2 = {
  hook: { from: 0, duration: s(2.5) },
  interrupt: { from: s(2.5), duration: s(2.5) },
  explain: { from: s(5), duration: s(4) },
  reallife: { from: s(9), duration: s(3) },
  solution: { from: s(12), duration: s(4) },
  trust: { from: s(16), duration: s(2) },
  cta: { from: s(18), duration: s(2) },
} as const;

export const SUBTITLES_V2: SubtitleCue[] = [
  { from: s(2.55), to: s(4.95), text: "Ramai tak tahu, [Battery %]{blue} dengan [Battery Health]{blue} bukan benda sama." },
  { from: s(5.05), to: s(6.95), text: "[Battery %]{blue} cuma tunjuk baki caj." },
  { from: s(7.0), to: s(8.95), text: "[Battery Health]{blue} tunjuk keadaan kapasiti bateri." },
  { from: s(9.05), to: s(11.95), text: "Sebab tu elok [check dulu]{gold}, sebelum ia ganggu urusan harian." },
  { from: s(12.05), to: s(15.9), text: "Di ACE, [pemeriksaan bateri percuma.]{gold}" },
];

export const SFX_V2: SfxCue[] = [
  { at: 13, name: "whoosh-soft", volume: 0.35 }, //  lens punch-in
  { at: 26, name: "low-battery", volume: 0.55 }, //  alert
  { at: 76, name: "tick", volume: 0.35 }, //         outline traces the phone (mask)
  { at: 92, name: "whoosh-soft", volume: 0.35 }, //  phone shrinks into card A
  { at: 101, name: "tick", volume: 0.45 }, //        card B
  { at: 114, name: "impact-soft", volume: 0.5 }, //  ≠ badge lands
  { at: 152, name: "whoosh-soft", volume: 0.35 }, // panel drops open
  { at: 160, name: "tick", volume: 0.3 }, //         segments drain
  { at: 166, name: "tick", volume: 0.3 },
  { at: 172, name: "tick", volume: 0.3 },
  { at: 208, name: "click", volume: 0.4 }, //        magnifier lines
  { at: 234, name: "click", volume: 0.4 }, //        tracking line lands on label
  { at: 276, name: "tick", volume: 0.35 }, //        strip 1
  { at: 288, name: "tick", volume: 0.35 }, //        strip 2
  { at: 300, name: "tick", volume: 0.35 }, //        strip 3
  { at: 322, name: "click", volume: 0.4 }, //        cable seats
  { at: 348, name: "whoosh", volume: 0.45 }, //      phone crosses the frame
  { at: 368, name: "scan", volume: 0.45 }, //        diagnostic sweep
  { at: 384, name: "click", volume: 0.3 }, //        stepper nodes
  { at: 396, name: "click", volume: 0.3 },
  { at: 408, name: "click", volume: 0.3 },
  { at: 420, name: "pop", volume: 0.4 }, //          customer decides ✓ + headline
  { at: 478, name: "whoosh", volume: 0.4 }, //       navy sweep
  { at: 483, name: "tick", volume: 0.45 }, //        CHECK DULU
  { at: 499, name: "tick", volume: 0.45 }, //        HARGA JELAS
  { at: 516, name: "impact-soft", volume: 0.3 }, //  punchline band
  { at: 546, name: "tick", volume: 0.3 }, //         typing starts
  { at: 568, name: "pop", volume: 0.3 }, //          message delivered
  { at: 574, name: "chime", volume: 0.5 }, //        CTA pulse
];
