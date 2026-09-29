import React from "react";
import { Composition } from "remotion";
import { AceBatteryHealth } from "./AceBatteryHealth";
import { VIDEO } from "./theme";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="AceBatteryHealth"
    component={AceBatteryHealth}
    width={VIDEO.width}
    height={VIDEO.height}
    fps={VIDEO.fps}
    durationInFrames={VIDEO.durationInFrames}
  />
);
