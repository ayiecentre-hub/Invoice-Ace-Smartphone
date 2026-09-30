import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { AudioLayer } from "../audio/AudioLayer";
import { BrandEndCardCP } from "../cari-plug/components/BrandEndCardCP";
import { Grain } from "../components/Grain";
import { SceneTransition } from "../components/SceneTransition";
import { Subtitle } from "../components/Subtitle";
import { loadFonts } from "../lib/fonts";
import { COLORS } from "../theme";
import { Scene01Hook } from "./scenes/Scene01Hook";
import { Scene02Interrupt } from "./scenes/Scene02Interrupt";
import { Scene03Education } from "./scenes/Scene03Education";
import { Scene04Impact } from "./scenes/Scene04Impact";
import { PC_SOLUTION_LEAD_IN, Scene05Solution } from "./scenes/Scene05Solution";
import { Scene06Trust } from "./scenes/Scene06Trust";
import { SCENES_PC, SFX_PC, SUBTITLES_PC } from "./timing";

loadFonts();

/**
 * Campaign "Pagi Cas, Tengah Hari Habis?" (30 s) master timeline.
 * The end card reuses BrandEndCardCP: same poster offer ("Pemeriksaan awal percuma."),
 * with the CTA label exactly as on this poster (no arrow).
 */
export const AcePagiCas: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.navy }}>
    <Sequence name="01 Hook" from={SCENES_PC.hook.from} durationInFrames={SCENES_PC.hook.duration}>
      <Scene01Hook />
    </Sequence>
    <Sequence name="02 Rewind" from={SCENES_PC.interrupt.from} durationInFrames={SCENES_PC.interrupt.duration + 12}>
      <Scene02Interrupt />
    </Sequence>
    <Sequence name="03 Day timeline" from={SCENES_PC.education.from} durationInFrames={SCENES_PC.education.duration}>
      <Scene03Education />
    </Sequence>
    <Sequence name="04 Afternoon" from={SCENES_PC.impact.from} durationInFrames={SCENES_PC.impact.duration}>
      <Scene04Impact />
    </Sequence>
    <Sequence name="05 ACE solution" from={SCENES_PC.solution.from - PC_SOLUTION_LEAD_IN} durationInFrames={SCENES_PC.solution.duration + PC_SOLUTION_LEAD_IN}>
      <Scene05Solution />
    </Sequence>
    <Sequence name="06 Trust ring" from={SCENES_PC.trust.from} durationInFrames={SCENES_PC.trust.duration + 8}>
      <Scene06Trust />
    </Sequence>
    <Sequence name="07 CTA" from={SCENES_PC.cta.from} durationInFrames={SCENES_PC.cta.duration}>
      <BrandEndCardCP ctaLabel="WHATSAPP SEMAK BATERI" />
    </Sequence>

    <SceneTransition at={SCENES_PC.impact.from} direction="up" />
    <SceneTransition at={SCENES_PC.trust.from} direction="left" />

    <Subtitle cues={SUBTITLES_PC} />
    <Grain />
    <AudioLayer cues={SFX_PC} bedFile="audio/music-bed-30s.wav" voiceoverFile="assets/pagi-cas/voiceover.wav" />
  </AbsoluteFill>
);
