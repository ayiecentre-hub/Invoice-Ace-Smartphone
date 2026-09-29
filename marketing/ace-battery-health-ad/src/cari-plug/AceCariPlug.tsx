import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { AudioLayer } from "../audio/AudioLayer";
import { Grain } from "../components/Grain";
import { SceneTransition } from "../components/SceneTransition";
import { Subtitle } from "../components/Subtitle";
import { loadFonts } from "../lib/fonts";
import { COLORS } from "../theme";
import { BrandEndCardCP } from "./components/BrandEndCardCP";
import { Scene01Hook } from "./scenes/Scene01Hook";
import { Scene02Interrupt } from "./scenes/Scene02Interrupt";
import { Scene03Education } from "./scenes/Scene03Education";
import { Scene04Impact } from "./scenes/Scene04Impact";
import { CP_SOLUTION_LEAD_IN, Scene05Solution } from "./scenes/Scene05Solution";
import { Scene06Trust } from "./scenes/Scene06Trust";
import { SCENES_CP, SFX_CP, SUBTITLES_CP } from "./timing";

loadFonts();

/** Campaign "Asyik Cari Plug Setiap Hari?" master timeline. */
export const AceCariPlug: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.navy }}>
    <Sequence name="01 Hook" from={SCENES_CP.hook.from} durationInFrames={SCENES_CP.hook.duration}>
      <Scene01Hook />
    </Sequence>
    <Sequence name="02 Interrupt" from={SCENES_CP.interrupt.from} durationInFrames={SCENES_CP.interrupt.duration + 12}>
      <Scene02Interrupt />
    </Sequence>
    <Sequence name="03 Three signs" from={SCENES_CP.education.from} durationInFrames={SCENES_CP.education.duration}>
      <Scene03Education />
    </Sequence>
    <Sequence name="04 Campus day" from={SCENES_CP.impact.from} durationInFrames={SCENES_CP.impact.duration}>
      <Scene04Impact />
    </Sequence>
    <Sequence name="05 ACE check" from={SCENES_CP.solution.from - CP_SOLUTION_LEAD_IN} durationInFrames={SCENES_CP.solution.duration + CP_SOLUTION_LEAD_IN}>
      <Scene05Solution />
    </Sequence>
    <Sequence name="06 Trust" from={SCENES_CP.trust.from} durationInFrames={SCENES_CP.trust.duration + 8}>
      <Scene06Trust />
    </Sequence>
    <Sequence name="07 CTA" from={SCENES_CP.cta.from} durationInFrames={SCENES_CP.cta.duration}>
      <BrandEndCardCP />
    </Sequence>

    <SceneTransition at={SCENES_CP.impact.from} direction="up" />
    <SceneTransition at={SCENES_CP.trust.from} direction="left" />

    <Subtitle cues={SUBTITLES_CP} />
    <Grain />
    <AudioLayer cues={SFX_CP} bedFile="audio/music-bed-v2.wav" voiceoverFile="assets/cari-plug/voiceover.wav" />
  </AbsoluteFill>
);
