# Kempen: "Pagi Cas, Tengah Hari Habis?"

Komposisi Remotion: `AcePagiCas` (30 s, 900 frame) · kod dalam `src/pagi-cas/` · render dengan `npm run render:pagi` → `out/ace-pagi-cas-30s.mp4`

---

## A. Analisis poster

| Medan | Isi |
|---|---|
| **Tajuk poster** | Pagi Cas, / Tengah Hari Habis? |
| **Masalah pelanggan** | Cas penuh waktu pagi, tetapi telefon tinggal **1%** sebelum tengah hari |
| **Hook** | Kontras masa: "pagi cas" lawan "tengah hari habis" |
| **Produk / servis** | Semakan bateri di ACE Smartphone |
| **Mesej pendidikan** | "Semak bateri sebelum rutin terganggu." |
| **Tawaran** | **"Pemeriksaan awal percuma."** Disalin tepat. Tiada harga, waranti atau masa servis direka |
| **CTA** | WhatsApp Semak Bateri (tanpa anak panah, ikut poster) |
| **Talent** | Wanita muda ~22–30 tahun, rambut panjang gelap beralun, blaus navy, jam tangan. Ekspresi berkerut, tangan di pipi (risau, bukan panik) |
| **Peranti** | iPhone ber-notch, bingkai keperakan, paparan **1%**. Video guna mockup iPhone 13 finish `silver` |
| **Lokasi** | Kafe, cahaya matahari pagi, MacBook, buku nota + pen, cawan kopi "Good Ideas Better Days" |
| **Mood** | Navy + emas, hangat, premium, tenang |
| **Teks penting (tepat)** | "Pagi Cas," · "Tengah Hari Habis?" · "Semak bateri sebelum rutin terganggu." · "Pemeriksaan awal percuma." · "WhatsApp Semak Bateri" · "ACE Smartphone, Kepala Batas" · "ONE PLACE. ONE TRUST." |

### Angle pendidikan yang dipilih: GARIS MASA SATU HARI

> Guna sama, hari sama. Bateri sihat masih ada tenaga sampai petang. Bateri yang dah haus **simpan kurang tenaga walaupun tertulis 100%**, jadi habis separuh hari.

Format ini belum digunakan dalam kempen lain (sebelum ini: tangki, dua jam, mitos→fakta, 3 tanda, meter beban, lonjakan kuasa). Ia terus menjawab tajuk poster yang memang berasaskan masa.

---

## B. Storyboard 30 saat

| # | Masa | Tujuan | Visual & motion | Teks skrin |
|---|---|---|---|---|
| 1 | 0:00–0:04 | Hook | Kad UGC (crop poster: tangan + telefon 1% + laptop) dengan rasa handheld → **punch-in** ke iPhone perak, bateri merah berdenyut. Inset reaksi talent + cip "1% · 12:15" | PAGI CAS, / **TENGAH HARI HABIS?** (emas) |
| 2 | 0:04–0:07 | Pattern interrupt | Freeze + garisan pearl mengesan telefon. **REWIND**: jam 12:15 → 07:30, bateri 1% → 100% (hijau) | *Pagi tadi 100%…* / Kurang **5 jam** je? |
| 3 | 0:07–0:13 | Pendidikan | Pearl naik dari bawah. Lengkung matahari 7 pagi → 7 malam; matahari bergerak, jam digital berjalan. Dua pil bateri susut serentak. Pada 12:15: sihat **64%**, haus **1%**, penanda merah pada lengkung | *Satu hari, guna sama…* Dua bateri. → *Sebabnya…* Bateri haus / **habis separuh hari.** · \*Ilustrasi |
| 4 | 0:13–0:18 | Kesan harian | Wipe navy. B-roll kafe (cawan kopi). Agenda petang masuk satu-satu: 2:00 Meeting online, 3:30 Hantar kerja, 5:30 Balik rumah · GPS. Setiap item dapat tag merah "perlu cas" | *Baru 12:15…* Petang masih / **panjang.** |
| 5 | 0:18–0:24 | Penyelesaian ACE | Pearl wipe. Telefon diimbas (skrin Battery "\*Contoh paparan"), panel juruteknik, semakan ✓ Kesihatan bateri, ✓ Corak penggunaan harian, kad **Pemeriksaan awal percuma.**, rel CHECK → DIAGNOSE → EXPLAIN → CUSTOMER DECIDES | DI ACE SMARTPHONE / Kami semak **bateri dulu.** |
| 6 | 0:24–0:27 | Kepercayaan | **Cincin cas**: setiap janji mengecas 1/3 (33 → 67 → 100%), bertukar emas dan muncul ikon kilat | CHECK DULU. / TERANG JELAS. / **TAK MENEKAN-NEKAN.** |
| 7 | 0:27–0:30 | CTA | End card navy: logo, "ACE Smartphone, Kepala Batas", kad tawaran poster, butang Trust Blue berdenyut + chime | Pemeriksaan awal percuma. · **WHATSAPP SEMAK BATERI** · *One Place. One Trust.* |

**Kenapa "Terang jelas" dan bukan "Harga jelas":** poster ini tiada kenyataan harga. Guna "harga jelas" akan memberi janji yang tidak ada dalam poster.

---

## C. VO akhir (BM, ≈58 patah perkataan)

| Masa | Baris |
|---|---|
| 0.2–3.4s | Pagi cas penuh… tengah hari dah habis? |
| 4.1–6.8s | Pagi tadi 100%. Tak sampai lima jam, tinggal 1%. |
| 7.1–12.8s | Guna sama, hari sama. Tapi bateri yang dah haus simpan kurang tenaga, jadi habis separuh hari. |
| 13.1–17.7s | Padahal petang masih panjang. Meeting, kerja, balik rumah. |
| 18.1–23.6s | Di ACE, kami semak bateri dulu. Pemeriksaan awal percuma. |
| 24.1–26.8s | Check dulu. Terang jelas. Tak menekan-nekan. |
| 27.1–29.6s | WhatsApp ACE untuk semak bateri. |

**Nada:** perempuan Malaysia, 20-an, tenang dan mesra, macam kawan yang faham teknikal.

**Fail:** `public/assets/pagi-cas/voiceover.wav`, kemudian set `ENABLE_VOICEOVER: true` dalam `src/config.ts` (muzik turun automatik ke 0.3).

---

## D. Sari kata

Dibakar untuk babak 3, 4 dan 5 (`SUBTITLES_PC` dalam `src/pagi-cas/timing.ts`). Babak 1, 2, 6 dan 7 tiada sari kata kerana teks kinetik sudah menyebut baris VO.

---

## E. Penggantian aset

| Slot | Placeholder sekarang | Ganti dengan |
|---|---|---|
| UGC hook | `assets/pagi-cas/ugc-hook.jpg` (crop poster) | `assets/pagi-cas/ugc-hook.mp4`: tangan pegang telefon 1% di kafe |
| Reaksi | `assets/pagi-cas/face.jpg` | `assets/pagi-cas/reaction.mp4`: talent berkerut, tangan di pipi (1–2 s) |
| B-roll kafe | `assets/pagi-cas/coffee.jpg` | `assets/pagi-cas/cafe-broll.mp4`: meja kerja, laptop, kopi |
| Semakan juruteknik | `assets/ace-technician.jpg` | `assets/pagi-cas/service-check.mp4` |
| VO | tiada | `assets/pagi-cas/voiceover.wav` |
| Muzik | `audio/music-bed-30s.wav` (dijana kod) | Trek berlesen, nama fail sama |

Selepas letak footage `.mp4`, set `USE_FOOTAGE: true`. Rujukan poster: `assets/pagi-cas/poster-reference.jpg`.

---

## F. Laporan QC akhir

| # | Semakan | Keputusan |
|---|---|---|
| 1 | Masalah difahami dalam 2 saat? | ✅ "PAGI CAS," + telefon 1% sebelum 1.2 s |
| 2 | Mesej pendidikan jelas tanpa bunyi? | ✅ Garis masa + dua pil + nombor 64% lawan 1% + sari kata |
| 3 | Terasa diilhamkan dari poster? | ✅ Talent, 1%, kafe, cawan kopi, iPhone perak, semua teks poster |
| 4 | Terasa seperti ACE? | ✅ Navy/Pearl, Trust Blue, emas hanya aksen |
| 5 | Pakar, tenang, dipercayai? | ✅ Tiada fearmongering, tiada serangan pesaing |
| 6 | CTA jelas? | ✅ Butang penuh lebar, denyut + chime pada 28 s |
| 7 | Teks boleh dibaca? | ✅ Tajuk ≥ 76 px, dalam kawasan selamat |
| 8 | Motion bertujuan? | ✅ Rewind, matahari, tag "perlu cas", cincin cas semuanya menerangkan mesej |
| 9 | Terlalu sesak? | ⚠️ Babak 5 paling padat, elemen masuk berperingkat |
| 10 | Maklumat poster diputar belit? | ✅ Tidak |
| 11 | Tawaran/tuntutan direka? | ✅ Tiada. Nilai 64%/1% dilabel "\*Ilustrasi", skrin app "\*Contoh paparan" |
| 12 | Tepat 30 saat? | ✅ 900 frame @ 30 fps |
| 13 | 1080 × 1920? | ✅ H.264, yuv420p, BT.709, AAC 48 kHz; muzik hidup sampai hujung (−22 dB selepas 22 s) |
| 14 | Frame akhir ada ACE + CTA + "One Place. One Trust."? | ✅ |

**Perlu disahkan oleh ACE:**

1. "Pemeriksaan awal percuma" masih aktif dan skopnya (apa yang termasuk).
2. Staf memang menyemak kesihatan bateri **dan** corak penggunaan.
