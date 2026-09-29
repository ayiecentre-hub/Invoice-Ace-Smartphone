import type { SfxCue, SubtitleCue } from "../timing";
import { VIDEO } from "../theme";

const s = (sec: number) => Math.round(sec * VIDEO.fps);

/** 30-second cut (900 frames). The 7-scene structure is stretched proportionally. */
export const TL_DURATION = s(30);

/**
 * Campaign: "Tengah Live, Bateri Buat Hal?" (poster 10).
 * Format: CAUSE → EFFECT. Going live is one of the heaviest jobs a phone does
 * (bright screen + camera + upload + heat at once) → a weak battery gives out mid-live.
 */
export const SCENES_TL = {
  hook: { from: 0, duration: s(4) }, //            0:00–0:04
  interrupt: { from: s(4), duration: s(3) }, //    0:04–0:07
  cause: { from: s(7), duration: s(3) }, //        0:07–0:10  4 loads at once
  effect: { from: s(10), duration: s(3) }, //      0:10–0:13  2-hour live, two batteries
  impact: { from: s(13), duration: s(5) }, //      0:13–0:18
  solution: { from: s(18), duration: s(6) }, //    0:18–0:24
  trust: { from: s(24), duration: s(3) }, //       0:24–0:27
  cta: { from: s(27), duration: s(3) }, //         0:27–0:30
} as const;

export const VO_TL = [
  { from: 0.2, to: 3.6, text: "Tengah live, order tengah masuk… bateri pula buat hal." },
  { from: 4.1, to: 6.8, text: "Ramai tak tahu, live ni kerja paling berat untuk bateri." },
  { from: 7.1, to: 12.8, text: "Skrin terang, kamera, upload dan panas, serentak. Bateri yang dah lemah, cepat tewas." },
  { from: 13.1, to: 17.7, text: "Live terputus, penonton lari, jualan pun tergendala." },
  { from: 18.1, to: 23.6, text: "Di ACE, kami semak bateri dulu dan terangkan pilihan. Servis hari sama, tertakluk stok." },
  { from: 24.1, to: 26.8, text: "Check dulu. Terang jelas. Tak menekan-nekan." },
  { from: 27.1, to: 29.6, text: "WhatsApp ACE untuk semak bateri." },
];

export const SUBTITLES_TL: SubtitleCue[] = [
  { from: s(7.1), to: s(9.95), text: "[Skrin terang]{blue}, [kamera]{blue}, [upload]{blue} dan [panas]{blue}, serentak." },
  { from: s(10.05), to: s(12.9), text: "Bateri yang dah lemah, [cepat tewas.]{gold}" },
  { from: s(13.1), to: s(17.9), text: "Live terputus, penonton lari, jualan pun tergendala." },
  { from: s(18.1), to: s(20.9), text: "Di ACE, kami [semak bateri dulu]{gold} dan terangkan pilihan." },
  { from: s(21.0), to: s(23.9), text: "[Servis hari sama,]{blue} tertakluk stok." },
];

export const SFX_TL: SfxCue[] = [
  { at: 12, name: "whoosh-soft", volume: 0.35 }, // punch-in
  { at: 40, name: "tick", volume: 0.25 }, //        comments
  { at: 56, name: "tick", volume: 0.25 },
  { at: 66, name: "low-battery", volume: 0.55 }, // alert
  { at: 88, name: "impact-soft", volume: 0.6 }, //  live ends
  { at: 120, name: "whoosh-soft", volume: 0.4 }, // freeze & park
  { at: 150, name: "tick", volume: 0.4 },
  { at: 172, name: "click", volume: 0.4 }, //       KERJA PALING BERAT
  { at: 210, name: "whoosh", volume: 0.4 }, //      explainer opens
  { at: 226, name: "tick", volume: 0.4 }, //        load 1
  { at: 240, name: "tick", volume: 0.4 }, //        load 2
  { at: 254, name: "tick", volume: 0.4 }, //        load 3
  { at: 268, name: "tick", volume: 0.4 }, //        load 4
  { at: 280, name: "impact-soft", volume: 0.3 }, // BEBAN TINGGI
  { at: 300, name: "whoosh-soft", volume: 0.35 }, // chart swap
  { at: 346, name: "click", volume: 0.4 }, //       weak battery hits 0
  { at: 386, name: "whoosh", volume: 0.4 }, //      wipe to impact
  { at: 436, name: "impact-soft", volume: 0.35 }, // live ended
  { at: 450, name: "tick", volume: 0.3 }, //        beat: unsold stock
  { at: 495, name: "tick", volume: 0.3 }, //        beat: her reaction
  { at: 530, name: "whoosh", volume: 0.4 }, //      pearl wipe to ACE
  { at: 580, name: "scan", volume: 0.4 },
  { at: 614, name: "click", volume: 0.35 },
  { at: 632, name: "click", volume: 0.35 },
  { at: 652, name: "pop", volume: 0.4 }, //         same-day card
  { at: 676, name: "click", volume: 0.25 },
  { at: 686, name: "click", volume: 0.25 },
  { at: 696, name: "click", volume: 0.25 },
  { at: 706, name: "click", volume: 0.25 },
  { at: 718, name: "whoosh", volume: 0.4 },
  { at: 726, name: "tick", volume: 0.45 }, //       card 1
  { at: 752, name: "tick", volume: 0.45 }, //       card 2
  { at: 778, name: "impact-soft", volume: 0.35 }, // card 3
  { at: 846, name: "chime", volume: 0.5 },
];
