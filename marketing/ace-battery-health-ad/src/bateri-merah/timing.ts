import type { SfxCue, SubtitleCue } from "../timing";
import { VIDEO } from "../theme";

const s = (sec: number) => Math.round(sec * VIDEO.fps);

/**
 * Campaign: "Baru Keluar, Bateri Dah Merah?" (poster 8).
 * Format chosen: MYTH → FACT / two causes. "Cepat merah" does not automatically
 * mean "tukar bateri": it can be a worn battery OR heavy app/GPS use, so ACE checks first.
 */
export const SCENES_BM = {
  hook: { from: 0, duration: s(3) }, //          0:00–0:03
  interrupt: { from: s(3), duration: s(2) }, //  0:03–0:05
  education: { from: s(5), duration: s(4) }, //  0:05–0:09
  impact: { from: s(9), duration: s(3) }, //     0:09–0:12
  solution: { from: s(12), duration: s(4) }, //  0:12–0:16
  trust: { from: s(16), duration: s(2) }, //     0:16–0:18
  cta: { from: s(18), duration: s(2) }, //       0:18–0:20
} as const;

/** Final VO (≈55 words). Windows are for recording to picture. */
export const VO_BM = [
  { from: 0.2, to: 2.7, text: "Baru keluar rumah… bateri dah merah?" },
  { from: 3.05, to: 4.9, text: "Ramai terus nak tukar bateri. Tapi tunggu dulu." },
  { from: 5.05, to: 8.9, text: "Punca biasa ada dua: bateri dah haus, atau app dan GPS makan bateri." },
  { from: 9.05, to: 11.8, text: "Tengah jalan, kita perlukan GPS dan call." },
  { from: 12.05, to: 15.9, text: "Di ACE, kami check dulu punca sebenar. Harga disahkan sebelum servis." },
  { from: 16.0, to: 17.9, text: "Check dulu. Harga jelas. Tak menekan-nekan." },
  { from: 18.05, to: 19.7, text: "WhatsApp ACE untuk semak bateri." },
];

/** Hook, interrupt, trust and CTA carry their VO line as kinetic type, so they have no subtitle. */
export const SUBTITLES_BM: SubtitleCue[] = [
  { from: s(5.05), to: s(8.95), text: "Punca biasa ada dua: [bateri dah haus]{blue}, atau [app dan GPS]{blue} makan bateri." },
  { from: s(9.05), to: s(11.95), text: "Tengah jalan, kita perlukan [GPS dan call.]{blue}" },
  { from: s(12.05), to: s(13.9), text: "Di ACE, kami [check dulu punca sebenar.]{gold}" },
  { from: s(13.95), to: s(15.95), text: "[Harga disahkan]{blue} sebelum servis." },
];

export const SFX_BM: SfxCue[] = [
  { at: 12, name: "whoosh-soft", volume: 0.35 }, // punch-in to the phone
  { at: 24, name: "low-battery", volume: 0.55 }, // 9% battery
  { at: 46, name: "tick", volume: 0.35 }, //        "9% · baru keluar" callout
  { at: 66, name: "click", volume: 0.3 }, //        focus brackets lock
  { at: 90, name: "whoosh-soft", volume: 0.4 }, //  freeze + isolate
  { at: 104, name: "tick", volume: 0.4 }, //        TUKAR BATERI
  { at: 126, name: "pop", volume: 0.35 }, //        "Tapi, tunggu dulu."
  { at: 150, name: "whoosh", volume: 0.4 }, //      iris opens on the explainer
  { at: 166, name: "tick", volume: 0.35 }, //       card 01
  { at: 184, name: "tick", volume: 0.35 }, //       card 02
  { at: 196, name: "scan", volume: 0.25 }, //       energy drains through the lines
  { at: 238, name: "impact-soft", volume: 0.35 }, // conclusion strip
  { at: 263, name: "whoosh", volume: 0.4 }, //      wipe to real life
  { at: 296, name: "tick", volume: 0.35 }, //       beat: navigation
  { at: 326, name: "tick", volume: 0.35 }, //       beat: incoming call
  { at: 350, name: "whoosh", volume: 0.4 }, //      pearl wipe to ACE
  { at: 384, name: "whoosh-soft", volume: 0.3 }, // storefront collapses into layout
  { at: 392, name: "scan", volume: 0.4 }, //        diagnostic scan
  { at: 412, name: "click", volume: 0.35 }, //      ✓ battery health
  { at: 420, name: "click", volume: 0.35 }, //      ✓ app & GPS usage
  { at: 432, name: "pop", volume: 0.4 }, //         price-confirmed card
  { at: 442, name: "click", volume: 0.25 }, //      stepper
  { at: 450, name: "click", volume: 0.25 },
  { at: 458, name: "click", volume: 0.25 },
  { at: 466, name: "click", volume: 0.25 },
  { at: 478, name: "whoosh", volume: 0.4 }, //      navy sweep
  { at: 482, name: "tick", volume: 0.45 }, //       CHECK DULU
  { at: 498, name: "tick", volume: 0.45 }, //       HARGA JELAS
  { at: 514, name: "impact-soft", volume: 0.3 }, // TAK MENEKAN-NEKAN
  { at: 570, name: "chime", volume: 0.5 }, //       CTA pulse
];
