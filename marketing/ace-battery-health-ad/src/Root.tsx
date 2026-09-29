import React from "react";
import { Composition } from "remotion";
import { AceBatteryHealth } from "./AceBatteryHealth";
import { AceBatteryHealthV2 } from "./v2/AceBatteryHealthV2";
import { VIDEO } from "./theme";

export const RemotionRoot: React.FC = () => (
  <>
    {/* Variation A: "the tank" metaphor */}
    <Composition
      id="AceBatteryHealth"
      component={AceBatteryHealth}
      width={VIDEO.width}
      height={VIDEO.height}
      fps={VIDEO.fps}
      durationInFrames={VIDEO.durationInFrames}
    />
    {/* Variation B: "two clocks" (hour vs years) */}
    <Composition
      id="AceBatteryHealthV2"
      component={AceBatteryHealthV2}
      width={VIDEO.width}
      height={VIDEO.height}
      fps={VIDEO.fps}
      durationInFrames={VIDEO.durationInFrames}
    />
  </>
);
