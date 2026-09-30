import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { AudioLayer } from "../audio/AudioLayer";
import { BrandEndCardPL } from "./components/BrandEndCardPL";
import { Grain } from "../components/Grain";
import { SceneTransition } from "../components/SceneTransition";
import { Subtitle } from "../components/Subtitle";
import { loadFonts } from "../lib/fonts";
import { COLORS } from "../theme";
import { Scene01Hook } from "./scenes/Scene01Hook";
import { Scene02Interrupt } from "./scenes/Scene02Interrupt";
import { Scene03Education } from "./scenes/Scene03Education";
import { Scene04Impact } from "./scenes/Scene04Impact";
import { PL_SOLUTION_LEAD_IN, Scene05Solution } from "./scenes/Scene05Solution";
import { Scene06Trust } from "./scenes/Scene06Trust";
import { SCENES_PL, SFX_PL, SUBTITLES_PL } from "./timing";

loadFonts();

/**
 * Campaign "Phone Lembap? Semak Bateri Dulu." (30 s) master timeline.
 * The end card carries the poster's trust line ("Harga jelas sebelum anda setuju") and CTA verbatim.
 */
export const AcePhoneLembap: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.navy }}>
    <Sequence name="01 Hook" from={SCENES_PL.hook.from} durationInFrames={SCENES_PL.hook.duration}>
      <Scene01Hook />
    </Sequence>
    <Sequence name="02 Interrupt" from={SCENES_PL.interrupt.from} durationInFrames={SCENES_PL.interrupt.duration + 12}>
      <Scene02Interrupt />
    </Sequence>
    <Sequence name="03 Performance limit" from={SCENES_PL.education.from} durationInFrames={SCENES_PL.education.duration}>
      <Scene03Education />
    </Sequence>
    <Sequence name="04 Study night" from={SCENES_PL.impact.from} durationInFrames={SCENES_PL.impact.duration}>
      <Scene04Impact />
    </Sequence>
    <Sequence name="05 ACE solution" from={SCENES_PL.solution.from - PL_SOLUTION_LEAD_IN} durationInFrames={SCENES_PL.solution.duration + PL_SOLUTION_LEAD_IN}>
      <Scene05Solution />
    </Sequence>
    <Sequence name="06 Trust shield" from={SCENES_PL.trust.from} durationInFrames={SCENES_PL.trust.duration + 8}>
      <Scene06Trust />
    </Sequence>
    <Sequence name="07 CTA" from={SCENES_PL.cta.from} durationInFrames={SCENES_PL.cta.duration}>
      <BrandEndCardPL />
    </Sequence>

    <SceneTransition at={SCENES_PL.impact.from} direction="up" />
    <SceneTransition at={SCENES_PL.trust.from} direction="left" />

    <Subtitle cues={SUBTITLES_PL} />
    <Grain />
    <AudioLayer cues={SFX_PL} bedFile="audio/music-bed-30s.wav" voiceoverFile="assets/phone-lembap/voiceover.wav" />
  </AbsoluteFill>
);
