import React from "react";
import { BatteryIndicator } from "../../components/BatteryIndicator";
import { COLORS, FONTS } from "../../theme";

/** Cause 01: the tank itself got smaller, so "100%" holds less. No health number is claimed. */
export const WornBatteryGraphic: React.FC<{ capacity: number; labelP: number }> = ({ capacity, labelP }) => (
  <div style={{ position: "relative", width: 150, height: 280 }}>
    <BatteryIndicator width={150} height={280} level={100} capacity={capacity} showGhost ghostLabel="masa baru" />
    <div
      style={{
        position: "absolute",
        left: 20,
        right: 20,
        bottom: (280 - 280 * 0.06) * (capacity / 100) * 0.5 - 22,
        textAlign: "center",
        fontFamily: FONTS.heading,
        fontWeight: 700,
        fontSize: 36,
        color: COLORS.pearl,
        opacity: labelP,
      }}
    >
      100%
    </div>
  </div>
);

const Icon: React.FC<{ kind: "pin" | "camera" | "signal"; lit: number }> = ({ kind, lit }) => {
  const c = lit > 0.5 ? COLORS.blue : COLORS.greyLight;
  return (
    <div style={{ width: 64, height: 64, borderRadius: 18, border: `3px solid ${c}`, display: "flex", alignItems: "center", justifyContent: "center", background: lit > 0.5 ? COLORS.blueSoft : "#fff" }}>
      <svg width="34" height="34" viewBox="0 0 34 34">
        {kind === "pin" ? <path d="M17 31 C 9 21 7 17 7 13 A10 10 0 0 1 27 13 C 27 17 25 21 17 31 Z M17 9 A4 4 0 1 0 17.01 9 Z" fill="none" stroke={c} strokeWidth="3" strokeLinejoin="round" /> : null}
        {kind === "camera" ? (
          <g fill="none" stroke={c} strokeWidth="3" strokeLinejoin="round">
            <path d="M4 11 H10 L13 7 H21 L24 11 H30 V27 H4 Z" />
            <circle cx="17" cy="19" r="5" />
          </g>
        ) : null}
        {kind === "signal" ? (
          <g fill={c}>
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={5 + i * 7} y={24 - i * 6} width={5} height={6 + i * 6} rx={1.5} />
            ))}
          </g>
        ) : null}
      </svg>
    </div>
  );
};

/** Cause 02: same healthy tank, but heavy use pulls energy out fast (animated flow lines). */
export const DrainGraphic: React.FC<{ level: number; flow: number; frame: number }> = ({ level, flow, frame }) => {
  const kinds: ("pin" | "camera" | "signal")[] = ["pin", "camera", "signal"];
  return (
    <div style={{ position: "relative", width: 330, height: 280 }}>
      <div style={{ position: "absolute", left: 20, top: 0 }}>
        <BatteryIndicator width={130} height={280} level={level} fill={level < 25 ? COLORS.lowBattery : COLORS.blue} />
      </div>
      <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={330} height={280}>
        {kinds.map((k, i) => {
          const y = 50 + i * 95;
          return (
            <path
              key={k}
              d={`M 158 ${140} C 200 ${140}, 200 ${y}, 240 ${y}`}
              fill="none"
              stroke={COLORS.blue}
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray="4 12"
              strokeDashoffset={-frame * 2.2}
              opacity={flow}
            />
          );
        })}
      </svg>
      {kinds.map((k, i) => (
        <div key={k} style={{ position: "absolute", left: 244, top: 18 + i * 95 }}>
          <Icon kind={k} lit={flow} />
        </div>
      ))}
    </div>
  );
};
