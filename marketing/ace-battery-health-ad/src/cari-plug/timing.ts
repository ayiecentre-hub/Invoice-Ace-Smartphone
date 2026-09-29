import type { SfxCue, SubtitleCue } from "../timing";
import { VIDEO } from "../theme";

const s = (sec: number) => Math.round(sec * VIDEO.fps);

/**
 * Campaign: "Asyik Cari Plug Setiap Hari?" (poster 9).
 * Format chosen: 3 SIGNS. A self-check the viewer can tick along with, so that
 * "charging all day" stops feeling normal and "semak dahulu" feels like the obvious step.
 */
export const SCENES_CP = {
  hook: { from: 0, duration: s(3) },
  interrupt: { from: s(3), duration: s(2) },
  education: { from: s(5), duration: s(4) },
  impact: { from: s(9), duration: s(3) },
  solution: { from: s(12), duration: s(4) },
  trust: { from: s(16), duration: s(2) },
  cta: { from: s(18), duration: s(2) },
} as const;

export const VO_CP = [
  { from: 0.2, to: 2.6, text: "Asyik cari plug… setiap hari?" },
  { from: 3.05, to: 4.9, text: "Ramai ingat itu normal. Sebenarnya, ada tandanya." },
  { from: 5.05, to: 8.9, text: "Cas lebih sekali sehari, peratus jatuh mendadak, atau mati sendiri. Itu tanda bateri patut disemak." },
  { from: 9.05, to: 11.8, text: "Nak study, nota, group chat, semua perlukan telefon." },
  { from: 12.05, to: 15.9, text: "Di ACE, kami semak dahulu. Pemeriksaan awal percuma." },
  { from: 16.0, to: 17.9, text: "Check dulu. Terang jelas. Tak menekan-nekan." },
  { from: 18.05, to: 19.7, text: "WhatsApp ACE untuk semak bateri." },
];

export const SUBTITLES_CP: SubtitleCue[] = [
  { from: s(5.05), to: s(8.95), text: "[Cas lebih sekali sehari]{blue}, [peratus jatuh mendadak]{blue}, atau [mati sendiri]{blue}." },
  { from: s(9.05), to: s(11.95), text: "Nak study, nota, group chat, semua perlukan telefon." },
  { from: s(12.05), to: s(13.9), text: "Di ACE, kami [semak dahulu.]{gold}" },
  { from: s(13.95), to: s(15.95), text: "[Pemeriksaan awal percuma.]{gold}" },
];

export const SFX_CP: SfxCue[] = [
  { at: 12, name: "whoosh-soft", volume: 0.35 }, // punch-in to the plug
  { at: 24, name: "pop", volume: 0.35 }, //         charging bolt
  { at: 40, name: "tick", volume: 0.35 }, //        "cas #3 hari ni"
  { at: 90, name: "whoosh-soft", volume: 0.35 }, // freeze
  { at: 104, name: "tick", volume: 0.4 }, //        NORMAL
  { at: 122, name: "click", volume: 0.4 }, //       ? → ada tandanya
  { at: 150, name: "whoosh", volume: 0.4 }, //      card stack opens
  { at: 162, name: "click", volume: 0.4 }, //       sign 1 ✓
  { at: 196, name: "click", volume: 0.4 }, //       sign 2 ✓
  { at: 228, name: "click", volume: 0.4 }, //       sign 3 ✓
  { at: 246, name: "impact-soft", volume: 0.3 }, // "ada satu pun?"
  { at: 266, name: "whoosh", volume: 0.4 }, //      wipe to real life
  { at: 276, name: "pop", volume: 0.3 }, //         plug counter 1
  { at: 302, name: "pop", volume: 0.3 }, //         plug counter 2
  { at: 328, name: "pop", volume: 0.3 }, //         plug counter 3
  { at: 350, name: "whoosh", volume: 0.4 }, //      pearl wipe to ACE
  { at: 376, name: "scan", volume: 0.4 },
  { at: 394, name: "click", volume: 0.3 },
  { at: 404, name: "click", volume: 0.3 },
  { at: 414, name: "click", volume: 0.3 },
  { at: 424, name: "pop", volume: 0.4 }, //         free initial check card
  { at: 440, name: "click", volume: 0.25 },
  { at: 448, name: "click", volume: 0.25 },
  { at: 456, name: "click", volume: 0.25 },
  { at: 464, name: "click", volume: 0.25 },
  { at: 482, name: "tick", volume: 0.4 }, //        CHECK DULU
  { at: 498, name: "tick", volume: 0.4 }, //        TERANG JELAS
  { at: 514, name: "impact-soft", volume: 0.3 }, // TAK MENEKAN-NEKAN
  { at: 570, name: "chime", volume: 0.5 },
];
