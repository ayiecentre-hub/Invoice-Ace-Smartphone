import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { AudioLayer } from "../audio/AudioLayer";
import { Grain } from "../components/Grain";
import { SceneTransition } from "../components/SceneTransition";
import { Subtitle } from "../components/Subtitle";
import { loadFonts } from "../lib/fonts";
import { COLORS } from "../theme";
import { BrandEndCardBM } from "./components/BrandEndCardBM";
import { Scene01Hook } from "./scenes/Scene01Hook";
import { Scene02Interrupt } from "./scenes/Scene02Interrupt";
import { Scene03Education } from "./scenes/Scene03Education";
import { Scene04Impact } from "./scenes/Scene04Impact";
import { BM_SOLUTION_LEAD_IN, Scene05Solution } from "./scenes/Scene05Solution";
import { Scene06Trust } from "./scenes/Scene06Trust";
import { SCENES_BM, SFX_BM, SUBTITLES_BM } from "./timing";

loadFonts();

/** Campaign "Baru Keluar, Bateri Dah Merah?" master timeline. */
export const AceBateriMerah: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.navy }}>
    <Sequence name="01 Hook" from={SCENES_BM.hook.from} durationInFrames={SCENES_BM.hook.duration}>
      <Scene01Hook />
    </Sequence>
    <Sequence name="02 Interrupt" from={SCENES_BM.interrupt.from} durationInFrames={SCENES_BM.interrupt.duration + 14}>
      <Scene02Interrupt />
    </Sequence>
    <Sequence name="03 Education (2 causes)" from={SCENES_BM.education.from} durationInFrames={SCENES_BM.education.duration}>
      <Scene03Education />
    </Sequence>
    <Sequence name="04 Impact" from={SCENES_BM.impact.from} durationInFrames={SCENES_BM.impact.duration}>
      <Scene04Impact />
    </Sequence>
    <Sequence name="05 ACE solution" from={SCENES_BM.solution.from - BM_SOLUTION_LEAD_IN} durationInFrames={SCENES_BM.solution.duration + BM_SOLUTION_LEAD_IN}>
      <Scene05Solution />
    </Sequence>
    <Sequence name="06 Trust" from={SCENES_BM.trust.from} durationInFrames={SCENES_BM.trust.duration + 8}>
      <Scene06Trust />
    </Sequence>
    <Sequence name="07 CTA" from={SCENES_BM.cta.from} durationInFrames={SCENES_BM.cta.duration}>
      <BrandEndCardBM />
    </Sequence>

    <SceneTransition at={SCENES_BM.impact.from} direction="up" />
    <SceneTransition at={SCENES_BM.trust.from} direction="left" />

    <Subtitle cues={SUBTITLES_BM} />
    <Grain />
    <AudioLayer cues={SFX_BM} bedFile="audio/music-bed-v3.wav" voiceoverFile="assets/bateri-merah/voiceover.wav" />
  </AbsoluteFill>
);
