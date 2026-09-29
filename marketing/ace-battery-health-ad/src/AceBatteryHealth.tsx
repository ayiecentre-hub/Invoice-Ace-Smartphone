import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { AudioLayer } from "./audio/AudioLayer";
import { Grain } from "./components/Grain";
import { SceneTransition } from "./components/SceneTransition";
import { Subtitle } from "./components/Subtitle";
import { loadFonts } from "./lib/fonts";
import { Scene01Hook } from "./scenes/Scene01Hook";
import { Scene02Interrupt } from "./scenes/Scene02Interrupt";
import { Scene03Explain } from "./scenes/Scene03Explain";
import { Scene04RealLife } from "./scenes/Scene04RealLife";
import { Scene05Solution, SOLUTION_LEAD_IN } from "./scenes/Scene05Solution";
import { Scene06Trust } from "./scenes/Scene06Trust";
import { Scene07CTA } from "./scenes/Scene07CTA";
import { COLORS } from "./theme";
import { SCENES } from "./timing";

loadFonts();

/**
 * Master timeline. Later scenes sit on top; some scenes are held a few frames past their
 * slot so the next scene can reveal over them (split open, push, circle mask, rise).
 */
export const AceBatteryHealth: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.navy }}>
    <Sequence name="01 Hook" from={SCENES.hook.from} durationInFrames={SCENES.hook.duration}>
      <Scene01Hook />
    </Sequence>
    <Sequence name="02 Interrupt" from={SCENES.interrupt.from} durationInFrames={SCENES.interrupt.duration + 12}>
      <Scene02Interrupt />
    </Sequence>
    <Sequence name="03 Explain" from={SCENES.explain.from} durationInFrames={SCENES.explain.duration}>
      <Scene03Explain />
    </Sequence>
    <Sequence name="04 Real life" from={SCENES.reallife.from} durationInFrames={SCENES.reallife.duration}>
      <Scene04RealLife />
    </Sequence>
    <Sequence
      name="05 Solution"
      from={SCENES.solution.from - SOLUTION_LEAD_IN}
      durationInFrames={SCENES.solution.duration + SOLUTION_LEAD_IN + 12}
    >
      <Scene05Solution />
    </Sequence>
    <Sequence name="06 Trust" from={SCENES.trust.from} durationInFrames={SCENES.trust.duration + 14}>
      <Scene06Trust />
    </Sequence>
    <Sequence name="07 CTA" from={SCENES.cta.from} durationInFrames={SCENES.cta.duration}>
      <Scene07CTA />
    </Sequence>

    <SceneTransition at={SCENES.reallife.from} direction="up" />

    <Subtitle />
    <Grain />
    <AudioLayer />
  </AbsoluteFill>
);
