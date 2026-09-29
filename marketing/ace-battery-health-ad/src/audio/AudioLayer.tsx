import React from "react";
import { Audio, interpolate, Sequence, staticFile, useVideoConfig } from "remotion";
import { CONFIG } from "../config";
import { SFX, type SfxCue } from "../timing";

/**
 * Music bed + cue-sheet SFX (src/timing.ts → SFX). When a voice-over is enabled the bed
 * ducks so speech sits on top. Replace files in public/audio/ with licensed audio of the same name.
 */
export const AudioLayer: React.FC<{ cues?: SfxCue[]; bedFile?: string; voiceoverFile?: string }> = ({
  cues = SFX,
  bedFile = "audio/music-bed.wav",
  voiceoverFile = "assets/voiceover.wav",
}) => {
  const { durationInFrames } = useVideoConfig();
  const bed = CONFIG.ENABLE_VOICEOVER ? 0.3 : 0.62;
  return (
    <>
      <Audio
        src={staticFile(bedFile)}
        volume={(f) =>
          interpolate(f, [0, 10, durationInFrames - 20, durationInFrames], [0, bed, bed, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      {CONFIG.ENABLE_VOICEOVER ? <Audio src={staticFile(voiceoverFile)} volume={1} /> : null}
      {cues.map((c, i) => (
        <Sequence key={i} from={c.at} durationInFrames={60} layout="none" name={`sfx:${c.name}`}>
          <Audio src={staticFile(`audio/${c.name}.wav`)} volume={c.volume} />
        </Sequence>
      ))}
    </>
  );
};
