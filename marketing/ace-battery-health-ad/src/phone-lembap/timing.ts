import type { SfxCue, SubtitleCue } from "../timing";
import { VIDEO } from "../theme";

const s = (sec: number) => Math.round(sec * VIDEO.fps);

export const PL_DURATION = s(30);

/**
 * Campaign: "Phone Lembap? Semak Bateri Dulu." (poster 13, 30 s).
 * Format: 1 THING MOST PEOPLE DON'T KNOW. A slow phone is not always an old phone: on some phones a worn
 * battery makes the system limit peak performance so the phone doesn't shut down. Identify the cause first.
 */
export const SCENES_PL = {
  hook: { from: 0, duration: s(4) },
  interrupt: { from: s(4), duration: s(3) },
  education: { from: s(7), duration: s(6) },
  impact: { from: s(13), duration: s(5) },
  solution: { from: s(18), duration: s(6) },
  trust: { from: s(24), duration: s(3) },
  cta: { from: s(27), duration: s(3) },
} as const;

export const VO_PL = [
  { from: 0.2, to: 3.2, text: "Phone lembap, buka app pun loading?" },
  { from: 4.1, to: 6.8, text: "Terus nak beli telefon baharu? Tunggu dulu." },
  { from: 7.1, to: 12.8, text: "Kadang-kadang puncanya bateri haus. Sistem perlahankan telefon supaya tak tutup sendiri." },
  { from: 13.1, to: 17.6, text: "Nak buka nota, hantar assignment, semua tersekat." },
  { from: 18.1, to: 23.6, text: "Di ACE, kami kenal pasti punca dulu. Harga jelas sebelum anda setuju." },
  { from: 24.1, to: 26.8, text: "Check dulu. Harga jelas. Tak menekan-nekan." },
  { from: 27.1, to: 29.6, text: "WhatsApp ACE untuk semak bateri." },
];

export const SUBTITLES_PL: SubtitleCue[] = [
  { from: s(7.1), to: s(9.6), text: "Kadang-kadang puncanya [bateri haus.]{blue}" },
  { from: s(9.7), to: s(12.9), text: "Sistem [perlahankan telefon]{blue} supaya tak tutup sendiri." },
  { from: s(13.1), to: s(17.9), text: "Nak buka nota, hantar assignment, [semua tersekat.]{gold}" },
  { from: s(18.1), to: s(20.9), text: "Di ACE, kami [kenal pasti punca dulu.]{gold}" },
  { from: s(21.0), to: s(23.9), text: "[Harga jelas]{blue} sebelum anda setuju." },
];

export const SFX_PL: SfxCue[] = [
  { at: 12, name: "whoosh-soft", volume: 0.35 }, // punch-in
  { at: 30, name: "click", volume: 0.35 }, //       app tap
  { at: 60, name: "tick", volume: 0.2 }, //         still loading
  { at: 75, name: "tick", volume: 0.2 },
  { at: 90, name: "tick", volume: 0.2 },
  { at: 122, name: "whoosh-soft", volume: 0.35 }, // freeze
  { at: 170, name: "impact-soft", volume: 0.35 }, // strike-through
  { at: 180, name: "pop", volume: 0.35 }, //        "Tunggu dulu."
  { at: 210, name: "whoosh", volume: 0.4 }, //      pearl rise
  { at: 250, name: "scan", volume: 0.3 }, //        needle sweeps up
  { at: 314, name: "click", volume: 0.4 }, //       limiter appears
  { at: 330, name: "impact-soft", volume: 0.4 }, // needle hits the cap
  { at: 386, name: "whoosh", volume: 0.4 }, //      wipe to impact
  { at: 440, name: "tick", volume: 0.3 },
  { at: 452, name: "tick", volume: 0.3 },
  { at: 464, name: "tick", volume: 0.3 },
  { at: 530, name: "whoosh", volume: 0.4 }, //      pearl wipe to ACE
  { at: 580, name: "scan", volume: 0.4 },
  { at: 614, name: "click", volume: 0.35 },
  { at: 632, name: "click", volume: 0.35 },
  { at: 652, name: "pop", volume: 0.4 }, //         "Harga jelas sebelum anda setuju."
  { at: 676, name: "click", volume: 0.25 },
  { at: 686, name: "click", volume: 0.25 },
  { at: 696, name: "click", volume: 0.25 },
  { at: 706, name: "click", volume: 0.25 },
  { at: 718, name: "whoosh", volume: 0.4 },
  { at: 728, name: "tick", volume: 0.45 }, //       shield 1/3
  { at: 754, name: "tick", volume: 0.45 }, //       shield 2/3
  { at: 780, name: "chime", volume: 0.3 }, //       shield sealed
  { at: 840, name: "chime", volume: 0.5 }, //       CTA pulse
];
