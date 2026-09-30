import type { SfxCue, SubtitleCue } from "../timing";
import { VIDEO } from "../theme";

const s = (sec: number) => Math.round(sec * VIDEO.fps);

export const NB_DURATION = s(30);

/**
 * Campaign: "Nak Bayar, Bateri Pula Habis." (poster 11, 30 s).
 * Format: WHAT YOU SEE → WHAT IT ACTUALLY MEANS. "It still said 18%", yet the phone died at
 * the counter: scanning a QR makes camera + bright screen + data work at once (a power spike),
 * and a worn battery cannot hold that spike, so the phone shuts down with charge left.
 */
export const SCENES_NB = {
  hook: { from: 0, duration: s(4) },
  interrupt: { from: s(4), duration: s(3) },
  education: { from: s(7), duration: s(6) },
  impact: { from: s(13), duration: s(5) },
  solution: { from: s(18), duration: s(6) },
  trust: { from: s(24), duration: s(3) },
  cta: { from: s(27), duration: s(3) },
} as const;

export const VO_NB = [
  { from: 0.2, to: 3.4, text: "Nak bayar… bateri pula habis." },
  { from: 4.1, to: 6.8, text: "Padahal tadi masih 18%. Kenapa boleh mati?" },
  { from: 7.1, to: 12.8, text: "Masa scan QR, kamera, skrin dan data kerja serentak. Bateri yang dah haus tak mampu tampung, terus tutup." },
  { from: 13.1, to: 17.7, text: "Zaman cashless, telefon mati, urusan pun tergendala." },
  { from: 18.1, to: 23.6, text: "Di ACE, kami check dulu punca sebenar. Harga disahkan sebelum servis." },
  { from: 24.1, to: 26.8, text: "Check dulu. Harga jelas. Tak menekan-nekan." },
  { from: 27.1, to: 29.6, text: "WhatsApp ACE untuk semak bateri." },
];

export const SUBTITLES_NB: SubtitleCue[] = [
  { from: s(7.1), to: s(9.95), text: "Masa scan QR, [kamera]{blue}, [skrin]{blue} dan [data]{blue} kerja serentak." },
  { from: s(10.05), to: s(12.9), text: "Bateri yang dah haus [tak mampu tampung]{gold}, terus tutup." },
  { from: s(13.1), to: s(17.9), text: "Zaman cashless, telefon mati, urusan pun tergendala." },
  { from: s(18.1), to: s(20.9), text: "Di ACE, kami [check dulu punca sebenar.]{gold}" },
  { from: s(21.0), to: s(23.9), text: "[Harga disahkan]{blue} sebelum servis." },
];

export const SFX_NB: SfxCue[] = [
  { at: 12, name: "whoosh-soft", volume: 0.35 }, // punch-in
  { at: 40, name: "tick", volume: 0.3 }, //         QR frame locks
  { at: 62, name: "impact-soft", volume: 0.6 }, //  sudden shutdown
  { at: 120, name: "whoosh-soft", volume: 0.4 }, // freeze
  { at: 138, name: "tick", volume: 0.4 }, //        "18%" callout
  { at: 162, name: "pop", volume: 0.35 }, //        KENAPA MATI?
  { at: 210, name: "whoosh", volume: 0.4 }, //      explainer opens
  { at: 226, name: "tick", volume: 0.4 }, //        camera
  { at: 238, name: "tick", volume: 0.4 }, //        screen
  { at: 250, name: "tick", volume: 0.4 }, //        data
  { at: 262, name: "scan", volume: 0.3 }, //        power spike draws
  { at: 312, name: "click", volume: 0.4 }, //       ceilings draw
  { at: 350, name: "impact-soft", volume: 0.45 }, // spike crosses the worn ceiling
  { at: 386, name: "whoosh", volume: 0.4 }, //      wipe to impact
  { at: 410, name: "tick", volume: 0.25 },
  { at: 420, name: "tick", volume: 0.25 },
  { at: 430, name: "tick", volume: 0.25 },
  { at: 440, name: "tick", volume: 0.25 },
  { at: 456, name: "low-battery", volume: 0.35 }, // phone goes off
  { at: 486, name: "impact-soft", volume: 0.3 }, // payment failed
  { at: 530, name: "whoosh", volume: 0.4 }, //      pearl wipe to ACE
  { at: 580, name: "scan", volume: 0.4 },
  { at: 614, name: "click", volume: 0.35 },
  { at: 632, name: "click", volume: 0.35 },
  { at: 652, name: "pop", volume: 0.4 }, //         price-confirmed card
  { at: 676, name: "click", volume: 0.25 },
  { at: 686, name: "click", volume: 0.25 },
  { at: 696, name: "click", volume: 0.25 },
  { at: 706, name: "click", volume: 0.25 },
  { at: 718, name: "whoosh", volume: 0.4 },
  { at: 726, name: "tick", volume: 0.45 }, //       receipt line 1
  { at: 752, name: "tick", volume: 0.45 }, //       receipt line 2
  { at: 778, name: "impact-soft", volume: 0.35 }, // receipt line 3
  { at: 840, name: "chime", volume: 0.5 }, //       CTA pulse
];
