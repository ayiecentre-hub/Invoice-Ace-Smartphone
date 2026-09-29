import type { Emphasis } from "../timing";

export type Token = { text: string; emphasis?: Emphasis };

/** Parses "plain [phrase]{blue} plain" into tokens. */
export const parseMarkup = (src: string): Token[] => {
  const out: Token[] = [];
  const re = /\[([^\]]+)\]\{(blue|gold|serif)\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    if (m.index > last) out.push({ text: src.slice(last, m.index) });
    out.push({ text: m[1], emphasis: m[2] as Emphasis });
    last = m.index + m[0].length;
  }
  if (last < src.length) out.push({ text: src.slice(last) });
  return out;
};

/** Splits tokens into words while keeping each word's emphasis. */
export const toWords = (tokens: Token[]) =>
  tokens.flatMap((t) =>
    t.text
      .split(/(\s+)/)
      .filter((w) => w.trim().length > 0)
      .map((w) => ({ text: w, emphasis: t.emphasis })),
  );

