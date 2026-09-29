import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, staticFile } from "remotion";
import { CONFIG } from "../config";
import { COLORS, FONTS } from "../theme";

type Props = {
  /** Still used until real footage is delivered (always object-fit: cover, never stretched). */
  still: string;
  /** Footage path used when CONFIG.USE_FOOTAGE is true. */
  video?: string;
  /** Frame offset into the footage. */
  videoStartFrom?: number;
  label: string;
  objectPosition?: string;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
};

/** A replaceable media slot. See README → "Asset replacement". */
export const MediaSlot: React.FC<Props> = ({ still, video, videoStartFrom = 0, label, objectPosition = "50% 50%", style, imgStyle }) => {
  const common: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover", objectPosition, ...imgStyle };
  return (
    <AbsoluteFill style={{ overflow: "hidden", ...style }}>
      {CONFIG.USE_FOOTAGE && video ? (
        <OffthreadVideo src={staticFile(video)} startFrom={videoStartFrom} muted style={common} />
      ) : (
        <Img src={staticFile(still)} style={common} />
      )}
      {CONFIG.SHOW_PLACEHOLDER_LABELS ? (
        <div
          style={{
            position: "absolute",
            left: 24,
            top: 170,
            padding: "10px 16px",
            borderRadius: 10,
            background: "rgba(200,134,10,0.92)",
            color: "#fff",
            fontFamily: FONTS.body,
            fontSize: 24,
            fontWeight: 700,
            border: `2px dashed ${COLORS.pearl}`,
          }}
        >
          PLACEHOLDER · {label} → {video ?? still}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
