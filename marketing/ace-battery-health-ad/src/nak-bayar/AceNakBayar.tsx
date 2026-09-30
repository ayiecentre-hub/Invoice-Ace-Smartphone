import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { AudioLayer } from "../audio/AudioLayer";
import { BrandEndCardBM } from "../bateri-merah/components/BrandEndCardBM";
import { Grain } from "../components/Grain";
import { SceneTransition } from "../components/SceneTransition";
import { Subtitle } from "../components/Subtitle";
import { loadFonts } from "../lib/fonts";
import { COLORS } from "../theme";
import { Scene01Hook } from "./scenes/Scene01Hook";
import { Scene02Interrupt } from "./scenes/Scene02Interrupt";
import { Scene03Education } from "./scenes/Scene03Education";
import { Scene04Impact } from "./scenes/Scene04Impact";
import { NB_SOLUTION_LEAD_IN, Scene05Solution } from "./scenes/Scene05Solution";
import { Scene06Trust } from "./scenes/Scene06Trust";
import { SCENES_NB, SFX_NB, SUBTITLES_NB } from "./timing";

loadFonts();

/**
 * Campaign "Nak Bayar, Bateri Pula Habis." (30 s) master timeline.
 * The end card reuses BrandEndCardBM: same poster offer ("Harga disahkan sebelum servis.") and CTA.
 */
export const AceNakBayar: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.navy }}>
    <Sequence name="01 Hook" from={SCENES_NB.hook.from} durationInFrames={SCENES_NB.hook.duration}>
      <Scene01Hook />
    </Sequence>
    <Sequence name="02 Interrupt" from={SCENES_NB.interrupt.from} durationInFrames={SCENES_NB.interrupt.duration + 12}>
      <Scene02Interrupt />
    </Sequence>
    <Sequence name="03 What it means" from={SCENES_NB.education.from} durationInFrames={SCENES_NB.education.duration}>
      <Scene03Education />
    </Sequence>
    <Sequence name="04 Impact" from={SCENES_NB.impact.from} durationInFrames={SCENES_NB.impact.duration}>
      <Scene04Impact />
    </Sequence>
    <Sequence name="05 ACE solution" from={SCENES_NB.solution.from - NB_SOLUTION_LEAD_IN} durationInFrames={SCENES_NB.solution.duration + NB_SOLUTION_LEAD_IN}>
      <Scene05Solution />
    </Sequence>
    <Sequence name="06 Trust receipt" from={SCENES_NB.trust.from} durationInFrames={SCENES_NB.trust.duration + 8}>
      <Scene06Trust />
    </Sequence>
    <Sequence name="07 CTA" from={SCENES_NB.cta.from} durationInFrames={SCENES_NB.cta.duration}>
      <BrandEndCardBM />
    </Sequence>

    <SceneTransition at={SCENES_NB.impact.from} direction="up" />
    <SceneTransition at={SCENES_NB.trust.from} direction="left" />

    <Subtitle cues={SUBTITLES_NB} />
    <Grain />
    <AudioLayer cues={SFX_NB} bedFile="audio/music-bed-30s.wav" voiceoverFile="assets/nak-bayar/voiceover.wav" />
  </AbsoluteFill>
);
