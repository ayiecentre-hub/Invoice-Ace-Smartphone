import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { AudioLayer } from "../audio/AudioLayer";
import { Grain } from "../components/Grain";
import { SceneTransition } from "../components/SceneTransition";
import { Subtitle } from "../components/Subtitle";
import { loadFonts } from "../lib/fonts";
import { COLORS } from "../theme";
import { BrandEndCardV2 } from "./components/BrandEndCardV2";
import { V2Scene01Hook } from "./scenes/V2Scene01Hook";
import { V2Scene02Interrupt } from "./scenes/V2Scene02Interrupt";
import { V2Scene03Explain } from "./scenes/V2Scene03Explain";
import { V2Scene04RealLife } from "./scenes/V2Scene04RealLife";
import { V2Scene05Solution, V2_SOLUTION_LEAD_IN } from "./scenes/V2Scene05Solution";
import { V2Scene06Trust } from "./scenes/V2Scene06Trust";
import { SCENES_V2, SFX_V2, SUBTITLES_V2 } from "./timing";

loadFonts();

/** VARIATION B master timeline ("Dua jam berbeza"). */
export const AceBatteryHealthV2: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.navy }}>
    <Sequence name="01 Hook (lens)" from={SCENES_V2.hook.from} durationInFrames={SCENES_V2.hook.duration}>
      <V2Scene01Hook />
    </Sequence>
    <Sequence name="02 Interrupt (phone → card)" from={SCENES_V2.interrupt.from} durationInFrames={SCENES_V2.interrupt.duration + 12}>
      <V2Scene02Interrupt />
    </Sequence>
    <Sequence name="03 Two clocks" from={SCENES_V2.explain.from} durationInFrames={SCENES_V2.explain.duration}>
      <V2Scene03Explain />
    </Sequence>
    <Sequence name="04 Triptych" from={SCENES_V2.reallife.from} durationInFrames={SCENES_V2.reallife.duration}>
      <V2Scene04RealLife />
    </Sequence>
    <Sequence
      name="05 ACE counter"
      from={SCENES_V2.solution.from - V2_SOLUTION_LEAD_IN}
      durationInFrames={SCENES_V2.solution.duration + V2_SOLUTION_LEAD_IN}
    >
      <V2Scene05Solution />
    </Sequence>
    <Sequence name="06 Trust line" from={SCENES_V2.trust.from} durationInFrames={SCENES_V2.trust.duration + 8}>
      <V2Scene06Trust />
    </Sequence>
    <Sequence name="07 End card" from={SCENES_V2.cta.from} durationInFrames={SCENES_V2.cta.duration}>
      <BrandEndCardV2 />
    </Sequence>

    <SceneTransition at={SCENES_V2.reallife.from} direction="up" />
    <SceneTransition at={SCENES_V2.trust.from} direction="left" />

    <Subtitle cues={SUBTITLES_V2} />
    <Grain />
    <AudioLayer cues={SFX_V2} bedFile="audio/music-bed-v2.wav" voiceoverFile="assets/voiceover-v2.wav" />
  </AbsoluteFill>
);
