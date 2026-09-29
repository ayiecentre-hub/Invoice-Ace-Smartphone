import React from "react";
import { COLORS, FONTS } from "../theme";

type Props = {
  width: number;
  height: number;
  /** Charge level 0–100 (fill height). */
  level: number;
  /** Container capacity 0–100: the solid outline shrinks from the top, a dashed ghost keeps the "new" size. */
  capacity?: number;
  fill?: string;
  showGhost?: boolean;
  ghostLabel?: string;
};

/**
 * Vertical battery. Two separate ideas, drawn separately on purpose:
 *  - level    = how full it is right now (the liquid)
 *  - capacity = how big the tank still is (the outline)
 */
export const BatteryIndicator: React.FC<Props> = ({
  width,
  height,
  level,
  capacity = 100,
  fill = COLORS.blue,
  showGhost = false,
  ghostLabel,
}) => {
  const stroke = Math.max(6, width * 0.045);
  const capH = height * 0.06;
  const bodyH = height - capH;
  const solidH = bodyH * (capacity / 100);
  const r = width * 0.16;
  const inset = stroke * 1.9;
  const innerH = Math.max(0, solidH - inset * 2);
  return (
    <div style={{ position: "relative", width, height }}>
      {showGhost ? (
        <>
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width,
              height: bodyH,
              borderRadius: r,
              border: `${stroke * 0.55}px dashed ${COLORS.greyLight}`,
              boxSizing: "border-box",
              opacity: 0.8,
            }}
          />
          {ghostLabel ? (
            <div
              style={{
                position: "absolute",
                left: width + 14,
                top: capH,
                fontFamily: FONTS.body,
                fontSize: 24,
                fontWeight: 500,
                color: COLORS.greyLight,
                whiteSpace: "nowrap",
              }}
            >
              {ghostLabel}
            </div>
          ) : null}
        </>
      ) : null}
      {/* terminal cap follows the top of the solid body */}
      <div
        style={{
          position: "absolute",
          left: width * 0.32,
          width: width * 0.36,
          height: capH,
          bottom: solidH - 1,
          borderRadius: `${capH * 0.5}px ${capH * 0.5}px 0 0`,
          background: COLORS.navy,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width,
          height: solidH,
          borderRadius: r,
          border: `${stroke}px solid ${COLORS.navy}`,
          boxSizing: "border-box",
          background: COLORS.pearl,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: inset,
          right: inset,
          bottom: inset,
          height: innerH * (level / 100),
          borderRadius: r * 0.55,
          background: fill,
        }}
      />
    </div>
  );
};
