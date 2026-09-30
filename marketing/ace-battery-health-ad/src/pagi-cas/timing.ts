import type { SfxCue, SubtitleCue } from "../timing";
import { VIDEO } from "../theme";

const s = (sec: number) => Math.round(sec * VIDEO.fps);

export const PC_DURATION = s(30);

/**
 * Campaign: "Pagi Cas, Tengah Hari Habis?" (poster 12, 30 s).
 * Format: TIMELINE (one day). Same use, same day: a healthy battery reaches the evening,
 * a worn one is at 1% by lunchtime, because it now stores less energy when "full".
 */
export const SCENES_PC = {
  hook: { from: 0, duration: s(4) },
  interrupt: { from: s(4), duration: s(3) },
  education: { from: s(7), duration: s(6) },
  impact: { from: s(13), duration: s(5) },
  solution: { from: s(18), duration: s(6) },
  trust: { from: s(24), duration: s(3) },
  cta: { from: s(27), duration: s(3) },
} as const;

export const VO_PC = [
  { from: 0.2, to: 3.4, text: "Pagi cas penuh… tengah hari dah habis?" },
  { from: 4.1, to: 6.8, text: "Pagi tadi 100%. Tak sampai lima jam, tinggal 1%." },
  { from: 7.1, to: 12.8, text: "Guna sama, hari sama. Tapi bateri yang dah haus simpan kurang tenaga, jadi habis separuh hari." },
  { from: 13.1, to: 17.7, text: "Padahal petang masih panjang. Meeting, kerja, balik rumah." },
  { from: 18.1, to: 23.6, text: "Di ACE, kami semak bateri dulu. Pemeriksaan awal percuma." },
  { from: 24.1, to: 26.8, text: "Check dulu. Terang jelas. Tak menekan-nekan." },
  { from: 27.1, to: 29.6, text: "WhatsApp ACE untuk semak bateri." },
];

export const SUBTITLES_PC: SubtitleCue[] = [
  { from: s(7.1), to: s(9.95), text: "Guna sama, hari sama." },
  { from: s(10.05), to: s(12.9), text: "Bateri haus [simpan kurang tenaga]{blue}, jadi [habis separuh hari.]{gold}" },
  { from: s(13.1), to: s(17.9), text: "Padahal petang masih panjang. Meeting, kerja, balik rumah." },
  { from: s(18.1), to: s(20.9), text: "Di ACE, kami [semak bateri dulu.]{gold}" },
  { from: s(21.0), to: s(23.9), text: "[Pemeriksaan awal percuma.]{gold}" },
];

export const SFX_PC: SfxCue[] = [
  { at: 12, name: "whoosh-soft", volume: 0.35 }, // punch-in
  { at: 26, name: "low-battery", volume: 0.5 }, //  1%
  { at: 120, name: "whoosh-soft", volume: 0.35 }, // freeze
  { at: 132, name: "scan", volume: 0.3 }, //        rewind to morning
  { at: 160, name: "pop", volume: 0.35 }, //        "5 jam je?"
  { at: 210, name: "whoosh", volume: 0.4 }, //      day timeline opens
  { at: 300, name: "click", volume: 0.4 }, //       noon marker
  { at: 312, name: "impact-soft", volume: 0.4 }, // worn battery hits 1%
  { at: 386, name: "whoosh", volume: 0.4 }, //      wipe to impact
  { at: 420, name: "tick", volume: 0.3 },
  { at: 434, name: "tick", volume: 0.3 },
  { at: 448, name: "tick", volume: 0.3 },
  { at: 470, name: "low-battery", volume: 0.3 }, // afternoon at risk
  { at: 530, name: "whoosh", volume: 0.4 }, //      pearl wipe to ACE
  { at: 580, name: "scan", volume: 0.4 },
  { at: 614, name: "click", volume: 0.35 },
  { at: 632, name: "click", volume: 0.35 },
  { at: 652, name: "pop", volume: 0.4 }, //         free initial check
  { at: 676, name: "click", volume: 0.25 },
  { at: 686, name: "click", volume: 0.25 },
  { at: 696, name: "click", volume: 0.25 },
  { at: 706, name: "click", volume: 0.25 },
  { at: 718, name: "whoosh", volume: 0.4 },
  { at: 728, name: "tick", volume: 0.45 }, //       ring 1/3
  { at: 754, name: "tick", volume: 0.45 }, //       ring 2/3
  { at: 780, name: "chime", volume: 0.3 }, //       ring full
  { at: 840, name: "chime", volume: 0.5 }, //       CTA pulse
];
