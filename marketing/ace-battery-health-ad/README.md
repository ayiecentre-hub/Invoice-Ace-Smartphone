# ACE Smartphone: "Battery % ≠ Battery Health" (20s TikTok ad)

Two variations of the same brief live in one project:

| Composition | Creative argument | Render |
|---|---|---|
| `AceBatteryHealth` (A) | **The tank.** % = how full the tank is; Health = how big the tank still is | `npm run render` |
| `AceBatteryHealthV2` (B) | **Two clocks.** % moves by the *hour*; Health moves over the *years* | `npm run render:v2` |

Both use the same script, scene slots, colours, iPhone 13 and 76%, so they can be A/B tested fairly.

The project also holds poster-driven campaigns that reuse the same component library:

| Composition | Source poster | Render | Campaign doc |
|---|---|---|---|
| `AceBateriMerah` | "Baru Keluar, Bateri Dah Merah?" | `npm run render:merah` | [`docs/CAMPAIGN-bateri-merah.md`](docs/CAMPAIGN-bateri-merah.md): poster analysis, storyboard, VO, asset guide, QC |

`npm run render:all` renders every composition.

A coded motion-graphics project built with **Remotion 4 + React + TypeScript**.
Output: 1080×1920, 9:16, 30 fps, 20 s (600 frames), H.264 + AAC.

The project renders end to end as-is. Where real footage or voice-over is missing, it
falls back to stills cut from ACE's existing posters, and the music and SFX are
placeholders generated in code. See **Asset replacement** below.

---

## 1. Install

```bash
cd marketing/ace-battery-health-ad
npm install
```

Needs Node 18+. Remotion downloads its own headless Chrome on the first render. If your
machine cannot download it (for example, behind a locked-down proxy), point it at a local
Chromium:

```bash
export REMOTION_BROWSER_EXECUTABLE=/path/to/chrome-or-headless_shell
```

## 2. Preview (Remotion Studio)

```bash
npm run dev
```

This opens the Studio in your browser. Each scene appears as a named `<Sequence>` on the timeline.

## 3. Render

```bash
npm run render
# → out/ace-battery-health-20s.mp4
```

Useful variants:

```bash
npx remotion still AceBatteryHealth out/still.png --frame=235   # single frame
npx remotion render AceBatteryHealth out/draft.mp4 --scale=0.5   # fast 540×960 draft
npm run typecheck                                                # tsc --noEmit
```

## 4. Export settings (in `remotion.config.ts`)

| Setting | Value |
|---|---|
| Codec | H.264 (`h264`), CRF 18 |
| Pixel format / colour | `yuv420p`, BT.709 |
| Audio | AAC, 48 kHz stereo |
| Resolution / fps | 1080×1920 @ 30 fps |
| Duration | 600 frames (20.0 s) |

These settings suit TikTok, Instagram Reels and Facebook Reels. Upload the MP4 directly and don't re-encode it in CapCut.

---

## 5. Scene timing map

| # | Time | Frames | Purpose | What happens |
|---|---|---|---|---|
| 01 | 0:00.0–0:02.5 | 0–74 | Hook | UGC counter shot → punch-in at 0.4 s to the iPhone 13 → "Low Battery" alert. Type: *NAK BAYAR… / **BATERI** PULA / NAK HABIS.* The frame locks with focus brackets |
| 02 | 0:02.5–0:05.0 | 75–149 | Pattern interrupt | Freeze. The phone is lifted out of the footage, the world drops to ACE Navy, grid lines draw in. The cards **Battery %** and **Battery Health** arrive, then **≠** lands |
| 03 | 0:05.0–0:09.0 | 150–269 | Explain | Split screen opens from the centre. **Left:** same tank, charge drops 100 → **30%** ("baki caj sekarang"). **Right:** full charge, the *tank itself* shrinks 100 → **76%**, with a dashed ghost of the original size. UI zoom of *Maximum Capacity 76%*, with a focus ring, a tracking line and an underline |
| 04 | 0:09.0–0:12.0 | 270–359 | Real life | Navy wipe. Montage cut every ~0.7 s: face → payment terminal → 3% battery → Lightning cable plugs in. Anchored type: *BILA BATTERY DAH TAK SIHAT…* |
| 05 | 0:12.0–0:16.0 | 350–479 | Solution + trust | Match cut: the same phone pushes in onto the ACE counter. Scan line → focus brackets → callout "Maximum Capacity 76%, diterangkan depan anda" → CHECK → DIAGNOSE → EXPLAIN → **CUSTOMER DECIDES** → *Pemeriksaan bateri percuma.* (tiny gold check and rule) |
| 06 | 0:16.0–0:18.0 | 480–539 | Trust line | Circle reveal. *CHECK DULU.* → *HARGA JELAS.* → ***TAK MENEKAN-NEKAN.*** Each letter is gently "pressed" and released, a visual pun on "no pressure" |
| 07 | 0:18.0–0:20.0 | 540–599 | CTA | Navy end card rises: logo, *Pemeriksaan Bateri Percuma*, Trust-Blue **WHATSAPP SEMAK BATERI** button with a typing-dots chat cue, a 3.5% pulse with a chime, and *One Place. One Trust.* |

The scene frames live in `src/timing.ts → SCENES`. Scenes 02, 05 and 06 are held a few frames
past their slot so the next scene can reveal over them.

### Variation B scene map (`src/v2/`)

| # | Time | What is different from A |
|---|---|---|
| 01 | 0:00–0:02.5 | A rounded **lens mask** punches from the phone's spot to full frame, revealing a macro of the lock screen. "BATERI" sits on a Trust-Blue marker block that wipes in |
| 02 | 0:02.5–0:05 | A pearl outline **traces the phone** (mask separation), then the phone **shrinks into card A**: it literally becomes "Battery %". Side-by-side cards, with the ≠ badge bridging them |
| 03 | 0:05–0:09 | Panel drops from the top. **Left:** segmented gauge 100 → 30, card "Status bar 30%", chart *BERUBAH SETIAP JAM*. **Right:** cropped real screen → **magnifier** pulls "Maximum Capacity" out into a card (100 → 76%), a tracking line runs 76% → label, chart *BERUBAH BERTAHUN* |
| 04 | 0:09–0:12 | Editorial **triptych**: three strips open one by one (face, terminal, 3% + Lightning cable), then whip out |
| 05 | 0:12–0:16 | Pearl wipes in from the right as the phone **crosses the frame** and lands beside a technician panel. Scan sweep, pinned 76% tag, progress rail CHECK → DIAGNOSE → EXPLAIN → CUSTOMER DECIDES (gold ✓ on the last node only) |
| 06 | 0:16–0:18 | Navy sweep. Each line lands centre, then steps back. The punchline starts **squeezed** (tight tracking = pressure) and **exhales** to relaxed spacing = *tak menekan-nekan* |
| 07 | 0:18–0:20 | Horizontal brand lockup; a chat bubble **types "SEMAK BATERI" and is delivered ✓✓** (it shows exactly what to send), then the CTA pulse and chime |

Variation B uses its own cue sheet (`src/v2/timing.ts → SFX_V2`), its own music bed
(`public/audio/music-bed-v2.wav`: 100 BPM felt piano) and an optional `public/assets/voiceover-v2.wav`.
The VO script and windows are identical to A, so one recording can serve both: copy it to both file names.

## 6. Voice-over timing map (record to picture)

Female Malaysian voice, late 20s to late 30s, calm and warm. The windows below come from
`src/timing.ts → VO_LINES`. The script is tightened slightly so it fits 20 s without speeding up.

| Window | Line |
|---|---|
| 0.15–2.40 s | Nak bayar… bateri pula dah nak habis. |
| 2.55–4.95 s | Tapi ramai tak tahu, battery percentage dengan battery health bukan benda yang sama. |
| 5.05–8.90 s | Battery percentage cuma tunjuk baki caj. Battery health pula tunjuk keadaan kapasiti bateri. |
| 9.05–11.90 s | Sebab tu elok check dulu, sebelum ia ganggu urusan harian. |
| 12.10–14.60 s | Di ACE, pemeriksaan bateri percuma. |
| 16.00–17.90 s | Check dulu. Harga jelas. Tak menekan-nekan. |
| 18.05–19.70 s | WhatsApp ACE untuk semak bateri. |

Line 2 is the tightest. If it runs long, drop "Tapi" and "yang" (the subtitles already do).

## 7. Asset replacement

| Slot | Current placeholder | Replace with | Then |
|---|---|---|---|
| Customer at counter (scenes 01, 02, 04) | `public/assets/customer-payment.jpg` (crop from the "Nak Bayar" poster) | `public/assets/customer-payment.mp4`: hijabi woman, 28–35, at a counter, subtle "alamak" reaction, 9:16 or larger | set `USE_FOOTAGE: true` in `src/config.ts` |
| Technician at ACE counter (scene 05) | `public/assets/ace-technician.jpg` (crop from the "Nampak Service" poster) | `public/assets/ace-diagnostic.mp4`: technician's hands checking the iPhone 13 in front of the customer | same flag |
| Payment terminal (scene 04) | `public/assets/payment-terminal.jpg` | a sharper still of the same name | none |
| Logo | `public/assets/ace-logo.png` (extracted from a poster; low resolution) | **official high-res ACE logo**, white on transparent PNG, same file name | none |
| Voice-over | none | `public/assets/voiceover.wav` recorded to the map above | set `ENABLE_VOICEOVER: true` (the music bed ducks automatically) |
| Music + SFX | `public/audio/*.wav` generated by `scripts/generate-audio.py` | licensed tracks/SFX with the **same file names** | none |

Footage is always drawn with `object-fit: cover` and is never stretched. Adjust framing with the
`objectPosition` prop on each `MediaSlot`. To review placeholders with a client, set
`SHOW_PLACEHOLDER_LABELS: true`.

**Continuity rules for the shoot:** the same talent, hijab, clothing and **black iPhone 13**
throughout. Every close-up phone shot in this project is a vector iPhone 13 (notch, not a
Dynamic Island), so real footage should also use an iPhone 13. Battery Health must read
**Maximum Capacity 76%** everywhere.

## 8. Fonts

Self-hosted in `public/fonts/` and loaded by `src/lib/fonts.ts`, so renders never depend on a font CDN:

| Role | Font | File |
|---|---|---|
| Headings | Inter (variable 400–800) | `Inter-normal.woff2` |
| Body / captions | DM Sans (variable 400–700) | `DMSans-normal.woff2` |
| Editorial accent | Instrument Serif Italic | `InstrumentSerif-italic.woff2` |

All three are open-source Google Fonts (SIL OFL).

## 9. Project structure

```
src/
  index.ts / Root.tsx         composition registration (1080×1920, 30fps, 600f)
  AceBatteryHealth.tsx        master timeline: scenes, transition, subtitles, grain, audio
  config.ts                   footage / voice-over / placeholder switches
  theme.ts                    brand colours, fonts, safe area, easing curves
  timing.ts                   scene map, subtitles, VO windows, SFX cue sheet
  lib/                        anim helpers (tween, velocity motion blur, handheld), fonts, markup
  components/
    AnimatedText  KineticHeadline  Subtitle  PhoneMockup (+StatusBar)  PhoneScreens
    BatteryIndicator  BatteryHealthCard  ComparisonGraphic  DiagnosticOverlay (+FocusBrackets)
    Connector  CTAButton  BrandEndCard  SceneTransition  MediaSlot  Grain
  scenes/Scene01Hook … Scene07CTA
  audio/AudioLayer.tsx        music bed + cue-sheet SFX (+ optional VO)
scripts/generate-audio.py     rebuilds the placeholder music bed and SFX
```

## 10. Design notes

- **Safe area:** nothing critical sits in the top 150 px, bottom 300 px or right 120 px. Subtitles use the band starting at y = 1440.
- **Subtitles:** burned in, with Trust-Blue chips for *Battery % / Battery Health* and Warm Gold for *check dulu / pemeriksaan bateri percuma*. Scenes 01, 06 and 07 have no subtitle, because their kinetic type already says the VO line and doubling it would clutter the frame.
- **Motion blur:** each entrance gets a blur driven by its own velocity (`lib/anim.ts → motionBlur`). This is cheaper than multi-sample blur and stays deterministic.
- **Colour discipline:** Navy and Pearl dominate. Trust Blue covers education and the CTA. Gold appears only in the hook word, the tiny check, the rules and the underline. A muted red is used only for the literal low-battery indicator.

## 11. Before going live

- Confirm the **"Pemeriksaan bateri percuma"** offer is real and has no hidden conditions.
- Replace the logo with the official file.
- Remotion is free for individuals and companies of up to 3 people. Larger companies need a Remotion company licence (see remotion.dev/license).
