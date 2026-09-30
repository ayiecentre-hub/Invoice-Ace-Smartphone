import React from "react";
import { Composition } from "remotion";
import { AceBatteryHealth } from "./AceBatteryHealth";
import { AceBatteryHealthV2 } from "./v2/AceBatteryHealthV2";
import { AceBateriMerah } from "./bateri-merah/AceBateriMerah";
import { AceCariPlug } from "./cari-plug/AceCariPlug";
import { AceTengahLive } from "./tengah-live/AceTengahLive";
import { TL_DURATION } from "./tengah-live/timing";
import { AceNakBayar } from "./nak-bayar/AceNakBayar";
import { NB_DURATION } from "./nak-bayar/timing";
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
    {/* Campaign: "Baru Keluar, Bateri Dah Merah?" (poster-driven) */}
    <Composition
      id="AceBateriMerah"
      component={AceBateriMerah}
      width={VIDEO.width}
      height={VIDEO.height}
      fps={VIDEO.fps}
      durationInFrames={VIDEO.durationInFrames}
    />
    {/* Campaign: "Asyik Cari Plug Setiap Hari?" (poster-driven) */}
    <Composition
      id="AceCariPlug"
      component={AceCariPlug}
      width={VIDEO.width}
      height={VIDEO.height}
      fps={VIDEO.fps}
      durationInFrames={VIDEO.durationInFrames}
    />
    {/* Campaign: "Tengah Live, Bateri Buat Hal?" (poster-driven, 30 s) */}
    <Composition
      id="AceTengahLive"
      component={AceTengahLive}
      width={VIDEO.width}
      height={VIDEO.height}
      fps={VIDEO.fps}
      durationInFrames={TL_DURATION}
    />
    {/* Campaign: "Nak Bayar, Bateri Pula Habis." (poster-driven, 30 s) */}
    <Composition
      id="AceNakBayar"
      component={AceNakBayar}
      width={VIDEO.width}
      height={VIDEO.height}
      fps={VIDEO.fps}
      durationInFrames={NB_DURATION}
    />
  </>
);
