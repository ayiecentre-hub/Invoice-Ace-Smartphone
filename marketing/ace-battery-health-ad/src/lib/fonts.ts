import { continueRender, delayRender, staticFile } from "remotion";

/** Self-hosted fonts (public/fonts) so renders never depend on a network font CDN. */
const FACES: { family: string; file: string; weight: string; style: string }[] = [
  { family: "Inter", file: "fonts/Inter-normal.woff2", weight: "400 800", style: "normal" },
  { family: "DM Sans", file: "fonts/DMSans-normal.woff2", weight: "400 700", style: "normal" },
  { family: "Instrument Serif", file: "fonts/InstrumentSerif-italic.woff2", weight: "400", style: "italic" },
];

let started = false;

export const loadFonts = () => {
  if (started || typeof document === "undefined") return;
  started = true;
  const handle = delayRender("Loading brand fonts");
  Promise.all(
    FACES.map((f) =>
      new FontFace(f.family, `url(${staticFile(f.file)}) format('woff2')`, {
        weight: f.weight,
        style: f.style,
      })
        .load()
        .then((face) => (document.fonts as unknown as { add: (f: FontFace) => void }).add(face)),
    ),
  )
    .then(() => continueRender(handle))
    .catch((err) => {
      console.error("Font load failed", err);
      continueRender(handle);
    });
};
