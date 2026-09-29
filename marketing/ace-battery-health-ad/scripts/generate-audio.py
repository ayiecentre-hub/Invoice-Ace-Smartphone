"""Generates the placeholder music bed + SFX library used by src/audio/AudioLayer.tsx.

Run:  python3 scripts/generate-audio.py   (needs numpy)
Replace any file in public/audio/ with a licensed track/SFX of the same name to upgrade.
"""
import numpy as np, wave, os

SR = 48000
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "audio")
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(7)


def write(name, sig, peak=0.9):
    sig = np.asarray(sig, dtype=float)
    if sig.ndim == 1:
        sig = np.stack([sig, sig], 1)
    m = np.max(np.abs(sig)) or 1
    sig = sig / m * peak
    with wave.open(os.path.join(OUT, name), "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((sig * 32767).astype("<i2").tobytes())


def t_(d): return np.arange(int(d * SR)) / SR
def lp(x, k): return np.convolve(x, np.ones(k) / k, "same")
def env(t, a, d): return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t * d)


# ---------------- music bed (20s, 96 BPM, editorial / documentary) ----------------
T = 20.0; N = int(T * SR); L = np.zeros(N); R = np.zeros(N)
bpm = 96; beat = 60 / bpm


def put(sig, t, g=1.0, pan=0.0):
    i = int(t * SR); j = min(N, i + len(sig))
    if i >= N: return
    L[i:j] += sig[: j - i] * g * (1 - max(0, pan)); R[i:j] += sig[: j - i] * g * (1 + min(0, pan))


def pluck(f, d=0.6, dec=7):
    t = t_(d); s = np.sin(2 * np.pi * f * t) + 0.25 * np.sin(2 * np.pi * 2 * f * t) + 0.08 * np.sin(2 * np.pi * 3 * f * t)
    return lp(s * env(t, 0.004, dec), 3)


def pad(freqs, d, a=0.8):
    t = t_(d); s = sum(np.sin(2 * np.pi * f * t) + 0.6 * np.sin(2 * np.pi * f * 1.003 * t) for f in freqs)
    e = np.minimum(1, t / a) * np.minimum(1, (d - t) / 0.6)
    return s * e / len(freqs)


def pulse(f=55, d=0.4):
    t = t_(d); return np.sin(2 * np.pi * (f + 25 * np.exp(-t * 30)) * t) * np.exp(-t * 7)


Dm = [146.83, 174.61, 220.0, 261.63]; Bb = [116.54, 146.83, 174.61, 233.08]
F = [174.61, 220.0, 261.63, 349.23]; C = [130.81, 164.81, 196.0, 261.63]
prog = [(0, Dm), (4 * beat, Bb), (8 * beat, Dm), (12 * beat, Bb), (16 * beat, F), (20 * beat, C), (24 * beat, F), (28 * beat, F)]
for i, (st, ch) in enumerate(prog):
    if st >= T: break
    d = min(4 * beat, T - st)
    put(pad([c / 2 for c in ch], d + 0.4), st, 0.10)
arp_pat = [0, 2, 1, 3, 2, 1, 3, 2]
k = 0; t = 0.0
while t < T - 0.1:
    ch = [c for s, c in prog if s <= t][-1]
    build = 1.0 if t > 2.5 else 0.5
    put(pluck(ch[arp_pat[k % 8]] * 2, 0.5, 8), t, 0.07 * build, pan=0.35 if k % 2 else -0.35)
    if k % 2 == 0 and 2.4 < t < 17.9: put(pulse(), t, 0.22)
    if k % 4 == 2 and 2.4 < t < 17.9:
        n = int(0.05 * SR); put(lp(rng.standard_normal(n), 2) * np.exp(-np.arange(n) / SR * 90), t, 0.035)
    t += beat / 2; k += 1
# breath at the trust line (16-18s): drop pulse, keep pad, tail at end
fade = np.ones(N); fi = int(19.0 * SR); fade[fi:] = np.linspace(1, 0.0, N - fi)
L *= fade; R *= fade
write("music-bed.wav", np.stack([L, R], 1), 0.8)

# ---------------- SFX ----------------
t = t_(0.9)
beep = np.zeros(len(t))
for s in (0.0, 0.18):  # iOS-like double low-battery chirp, soft
    tt = t - s; m = (tt >= 0) & (tt < 0.14)
    beep[m] += np.sin(2 * np.pi * 1318.5 * tt[m]) * np.exp(-tt[m] * 18) + 0.4 * np.sin(2 * np.pi * 659.25 * tt[m]) * np.exp(-tt[m] * 14)
write("low-battery.wav", beep, 0.7)


def whoosh(d, bright=1.0):
    n = int(d * SR); x = rng.standard_normal(n); tt = np.linspace(0, 1, n); out = np.zeros(n)
    for a, b, kk in [(0, .55, 60), (.25, .8, 20), (.5, 1, int(8 / bright))]:
        out += lp(x, kk) * np.clip(1 - np.abs((tt - (a + b) / 2) / ((b - a) / 2)), 0, 1)
    return out * np.sin(np.pi * tt) ** 2


write("whoosh.wav", whoosh(0.45), 0.6)
write("whoosh-soft.wav", lp(whoosh(0.6, 0.5), 6), 0.45)
t = t_(0.05); write("tick.wav", lp(rng.standard_normal(len(t)), 2) * np.exp(-t * 220), 0.35)
t = t_(0.09); write("click.wav", (np.sin(2 * np.pi * 2200 * t) * 0.5 + lp(rng.standard_normal(len(t)), 3)) * np.exp(-t * 120), 0.4)
t = t_(1.2)
imp = np.sin(2 * np.pi * (48 + 60 * np.exp(-t * 25)) * t) * np.exp(-t * 5) + lp(rng.standard_normal(len(t)), 40) * np.exp(-t * 9) * 0.6
write("impact-soft.wav", imp, 0.75)
t = t_(1.6)
scan = (np.sin(2 * np.pi * (600 + 900 * t / 1.6) * t) * 0.25 + lp(rng.standard_normal(len(t)), 14) * 0.5) * np.sin(np.pi * t / 1.6) ** 1.5
scan *= 0.6 + 0.4 * np.sin(2 * np.pi * 12 * t)
write("scan.wav", scan, 0.35)
t = t_(1.8)
chime = sum(g * np.sin(2 * np.pi * f * t) * np.exp(-t * dd) for f, g, dd in [(880, 1, 2.2), (1318.5, .5, 2.8), (1760, .25, 3.5)])
chime[: int(0.07 * SR)] *= 0.0; chime += np.pad(np.sin(2 * np.pi * 659.25 * t_(1.7)) * np.exp(-t_(1.7) * 2.4), (0, len(t) - len(t_(1.7)))) * 0.8
write("chime.wav", chime * np.minimum(1, t / 0.004), 0.55)
t = t_(0.12); write("pop.wav", np.sin(2 * np.pi * (900 - 500 * t / 0.12) * t) * np.exp(-t * 35), 0.4)
print("audio written to", os.path.abspath(OUT))
