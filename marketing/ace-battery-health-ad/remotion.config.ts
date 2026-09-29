import { Config } from "@remotion/cli/config";

// Export settings for TikTok / Reels: H.264, yuv420p, high quality.
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(92);
Config.setCodec("h264");
Config.setCrf(18);
Config.setPixelFormat("yuv420p");
Config.setColorSpace("bt709");
Config.setAudioCodec("aac");
Config.setOverwriteOutput(true);
// Chromium path can be supplied with --browser-executable or REMOTION_BROWSER_EXECUTABLE.
if (process.env.REMOTION_BROWSER_EXECUTABLE) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE);
}
