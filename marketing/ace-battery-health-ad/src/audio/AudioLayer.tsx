import React from "react";
import { Audio, interpolate, Sequence, staticFile } from "remotion";
import { CONFIG } from "../config";
import { SFX } from "../timing";
import { VIDEO } from "../theme";

/**
 * Music bed + cue-sheet SFX (src/timing.ts → SFX). When a voice-over is enabled the bed
 * ducks so speech sits on top. Replace files in public/audio/ with licensed audio of the same name.
 */
export const AudioLayer: React.FC = () => {
  const bed = CONFIG.ENABLE_VOICEOVER ? 0.3 : 0.62;
  return (
    <>
      <Audio
        src={staticFile("audio/music-bed.wav")}
        volume={(f) =>
          interpolate(f, [0, 10, VIDEO.durationInFrames - 20, VIDEO.durationInFrames], [0, bed, bed, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      {CONFIG.ENABLE_VOICEOVER ? <Audio src={staticFile("assets/voiceover.wav")} volume={1} /> : null}
      {SFX.map((c, i) => (
        <Sequence key={i} from={c.at} durationInFrames={60} layout="none" name={`sfx:${c.name}`}>
          <Audio src={staticFile(`audio/${c.name}.wav`)} volume={c.volume} />
        </Sequence>
      ))}
    </>
  );
};
