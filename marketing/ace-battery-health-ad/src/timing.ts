import { VIDEO } from "./theme";

const s = (sec: number) => Math.round(sec * VIDEO.fps);

/** Scene map (frames @30fps). Keep in sync with README "Scene timing map". */
export const SCENES = {
  hook: { from: 0, duration: s(2.5) }, //            0:00.0 – 0:02.5
  interrupt: { from: s(2.5), duration: s(2.5) }, //  0:02.5 – 0:05.0
  explain: { from: s(5), duration: s(4) }, //        0:05.0 – 0:09.0
  reallife: { from: s(9), duration: s(3) }, //       0:09.0 – 0:12.0
  solution: { from: s(12), duration: s(4) }, //      0:12.0 – 0:16.0
  trust: { from: s(16), duration: s(2) }, //         0:16.0 – 0:18.0
  cta: { from: s(18), duration: s(2) }, //           0:18.0 – 0:20.0
} as const;

export type Emphasis = "blue" | "gold" | "serif";

/**
 * Burned-in subtitles. Markup: [text]{blue|gold|serif} marks an emphasised phrase.
 * Scenes whose kinetic headline already says the VO line (hook, trust, CTA) carry no
 * subtitle, so the same words never appear twice on screen.
 */
export type SubtitleCue = { from: number; to: number; text: string };

export const SUBTITLES: SubtitleCue[] = [
  { from: s(2.55), to: s(4.95), text: "Ramai tak tahu, [Battery %]{blue} dengan [Battery Health]{blue} bukan benda sama." },
  { from: s(5.05), to: s(6.95), text: "[Battery %]{blue} cuma tunjuk baki caj." },
  { from: s(7.0), to: s(8.95), text: "[Battery Health]{blue} tunjuk keadaan kapasiti bateri." },
  { from: s(9.05), to: s(11.95), text: "Sebab tu elok [check dulu]{gold}, sebelum ia ganggu urusan harian." },
  { from: s(12.05), to: s(15.9), text: "Di ACE, [pemeriksaan bateri percuma.]{gold}" },
];

/** Voice-over script with target windows (for recording to picture). */
export const VO_LINES = [
  { from: 0.15, to: 2.4, text: "Nak bayar… bateri pula dah nak habis." },
  { from: 2.55, to: 4.95, text: "Tapi ramai tak tahu, battery percentage dengan battery health bukan benda yang sama." },
  { from: 5.05, to: 8.9, text: "Battery percentage cuma tunjuk baki caj. Battery health pula tunjuk keadaan kapasiti bateri." },
  { from: 9.05, to: 11.9, text: "Sebab tu elok check dulu, sebelum ia ganggu urusan harian." },
  { from: 12.1, to: 14.6, text: "Di ACE, pemeriksaan bateri percuma." },
  { from: 16.0, to: 17.9, text: "Check dulu. Harga jelas. Tak menekan-nekan." },
  { from: 18.05, to: 19.7, text: "WhatsApp ACE untuk semak bateri." },
];

export type SfxName =
  | "low-battery" | "whoosh" | "whoosh-soft" | "tick" | "click"
  | "impact-soft" | "scan" | "chime" | "pop";

/** Sound design cue sheet: every cue is tied to a visual event (frame numbers are absolute). */
export type SfxCue = { at: number; name: SfxName; volume: number };

export const SFX: SfxCue[] = [
  { at: 12, name: "whoosh-soft", volume: 0.35 }, //  punch-in to phone
  { at: 30, name: "low-battery", volume: 0.55 }, //  alert appears on screen
  { at: 71, name: "whoosh", volume: 0.45 }, //       freeze → explainer
  { at: 92, name: "tick", volume: 0.5 }, //          card A
  { at: 104, name: "tick", volume: 0.5 }, //         card B
  { at: 116, name: "impact-soft", volume: 0.5 }, //  ≠ lands
  { at: 147, name: "whoosh-soft", volume: 0.4 }, //  split screen opens
  { at: 172, name: "tick", volume: 0.35 }, //        30% settles
  { at: 212, name: "click", volume: 0.45 }, //       capacity shrinks
  { at: 236, name: "click", volume: 0.45 }, //       focus ring on 76%
  { at: 266, name: "whoosh", volume: 0.4 }, //       wipe to real life
  { at: 292, name: "tick", volume: 0.35 }, //        montage cut
  { at: 312, name: "tick", volume: 0.35 }, //        montage cut
  { at: 337, name: "click", volume: 0.4 }, //        cable plugs in
  { at: 348, name: "whoosh", volume: 0.45 }, //      phone match-cut (push)
  { at: 368, name: "scan", volume: 0.45 }, //        diagnostic scan
  { at: 386, name: "click", volume: 0.3 }, //        CHECK
  { at: 396, name: "click", volume: 0.3 }, //        DIAGNOSE
  { at: 406, name: "click", volume: 0.3 }, //        EXPLAIN
  { at: 416, name: "click", volume: 0.3 }, //        CUSTOMER DECIDES
  { at: 418, name: "pop", volume: 0.4 }, //          "percuma" headline
  { at: 482, name: "tick", volume: 0.45 }, //        CHECK DULU
  { at: 499, name: "tick", volume: 0.45 }, //        HARGA JELAS
  { at: 515, name: "impact-soft", volume: 0.35 }, // TAK MENEKAN-NEKAN
  { at: 538, name: "whoosh-soft", volume: 0.4 }, //  end card rises
  { at: 566, name: "chime", volume: 0.5 }, //        CTA pulse
];
