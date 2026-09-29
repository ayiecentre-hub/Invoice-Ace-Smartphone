import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { AudioLayer } from "../audio/AudioLayer";
import { Grain } from "../components/Grain";
import { SceneTransition } from "../components/SceneTransition";
import { Subtitle } from "../components/Subtitle";
import { loadFonts } from "../lib/fonts";
import { COLORS } from "../theme";
import { BrandEndCardTL } from "./components/BrandEndCardTL";
import { Scene01Hook } from "./scenes/Scene01Hook";
import { Scene02Interrupt } from "./scenes/Scene02Interrupt";
import { Scene03CauseEffect } from "./scenes/Scene03CauseEffect";
import { Scene04Impact } from "./scenes/Scene04Impact";
import { Scene05Solution, TL_SOLUTION_LEAD_IN } from "./scenes/Scene05Solution";
import { Scene06Trust } from "./scenes/Scene06Trust";
import { SCENES_TL, SFX_TL, SUBTITLES_TL } from "./timing";

loadFonts();

/** Campaign "Tengah Live, Bateri Buat Hal?" (30 s) master timeline. */
export const AceTengahLive: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.navy }}>
    <Sequence name="01 Hook" from={SCENES_TL.hook.from} durationInFrames={SCENES_TL.hook.duration}>
      <Scene01Hook />
    </Sequence>
    <Sequence name="02 Interrupt" from={SCENES_TL.interrupt.from} durationInFrames={SCENES_TL.interrupt.duration + 12}>
      <Scene02Interrupt />
    </Sequence>
    <Sequence name="03 Cause → effect" from={SCENES_TL.cause.from} durationInFrames={SCENES_TL.cause.duration + SCENES_TL.effect.duration}>
      <Scene03CauseEffect />
    </Sequence>
    <Sequence name="04 Impact" from={SCENES_TL.impact.from} durationInFrames={SCENES_TL.impact.duration}>
      <Scene04Impact />
    </Sequence>
    <Sequence name="05 ACE solution" from={SCENES_TL.solution.from - TL_SOLUTION_LEAD_IN} durationInFrames={SCENES_TL.solution.duration + TL_SOLUTION_LEAD_IN}>
      <Scene05Solution />
    </Sequence>
    <Sequence name="06 Trust" from={SCENES_TL.trust.from} durationInFrames={SCENES_TL.trust.duration + 8}>
      <Scene06Trust />
    </Sequence>
    <Sequence name="07 CTA" from={SCENES_TL.cta.from} durationInFrames={SCENES_TL.cta.duration}>
      <BrandEndCardTL />
    </Sequence>

    <SceneTransition at={SCENES_TL.impact.from} direction="up" />
    <SceneTransition at={SCENES_TL.trust.from} direction="left" />

    <Subtitle cues={SUBTITLES_TL} />
    <Grain />
    <AudioLayer cues={SFX_TL} bedFile="audio/music-bed-30s.wav" voiceoverFile="assets/tengah-live/voiceover.wav" />
  </AbsoluteFill>
);
