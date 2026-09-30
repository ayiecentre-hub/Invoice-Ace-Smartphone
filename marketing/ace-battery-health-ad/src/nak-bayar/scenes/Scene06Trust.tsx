import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { prog } from "../../lib/anim";
import { COLORS, EASE } from "../../theme";
import { Receipt } from "../components/Receipt";

/** 0:24–0:27 TRUST (90 frames). The promise prints like a receipt, line by line. */
export const Scene06Trust: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 45%, ${COLORS.navySoft} 0%, ${COLORS.navy} 60%, ${COLORS.navyDeep} 100%)` }}>
      <div style={{ position: "absolute", left: 140, top: 380 }}>
        <Receipt
          rise={prog(frame, 0, 14, EASE.out)}
          lines={[
            { text: "CHECK DULU.", p: prog(frame, 6, 8) },
            { text: "HARGA JELAS.", p: prog(frame, 32, 8) },
            { text: "TAK MENEKAN-NEKAN.", p: prog(frame, 58, 8), accent: true },
          ]}
          footer={prog(frame, 70, 10)}
        />
      </div>
    </AbsoluteFill>
  );
};
