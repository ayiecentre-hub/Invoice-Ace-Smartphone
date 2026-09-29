# Kempen: "Asyik Cari Plug Setiap Hari?"

Komposisi Remotion: `AceCariPlug` · kod dalam `src/cari-plug/` · render dengan `npm run render:plug`

---

## A. Analisis poster

| Medan | Isi |
|---|---|
| **Tajuk** | Asyik Cari Plug Setiap Hari? ("Plug" berwarna emas) |
| **Masalah pelanggan** | Kerap mencari soket untuk cas telefon, setiap hari |
| **Hook** | "Asyik cari plug…" dengan rasa jemu dan rimas |
| **Servis** | Semakan bateri di ACE Smartphone |
| **Mesej pendidikan (tersirat)** | "Bateri cepat habis? Kami semak dahulu." |
| **Mesej kepercayaan** | "Kami semak dahulu." |
| **Tawaran** | **"Pemeriksaan awal percuma."** (disalin tepat. Bukan "pemeriksaan bateri percuma") |
| **CTA** | WhatsApp Semak Bateri → |
| **Talent** | Wanita muda (≈20–25 tahun, pelajar), rambut panjang gelap tanpa tudung, sweater navy. Ekspresi: jemu dan berkerut, dagu di tangan |
| **Peranti** | iPhone Pro (3 kamera, bingkai perak) terletak menghadap ke bawah, sedang dicas. Model tidak dinyatakan, jadi video guna mockup iPhone 13 **kemasan silver** (boleh ditukar) |
| **Lokasi** | Ruang belajar kampus / perpustakaan, cahaya siang, soket dinding, beg sandang navy, buku, nota, laptop |
| **Mood** | Cerah, akademik. Teks navy + emas |
| **Teks penting (tepat)** | "Asyik Cari Plug Setiap Hari?" · "Bateri cepat habis? Kami semak dahulu." · "Pemeriksaan awal percuma." · "WhatsApp Semak Bateri" · "ONE PLACE. ONE TRUST." · "ACE Smartphone, Kepala Batas" |

### Apa yang poster ini sampaikan

Kalau asyik mencari plug, bateri mungkin ada masalah. ACE akan menyemak dahulu, dan pemeriksaan awal adalah percuma.

### Format pendidikan yang dipilih: 3 TANDA

Senarai semak yang penonton boleh "tanda" sendiri:

1. Cas lebih sekali sehari
2. Peratus jatuh mendadak
3. Mati sendiri walaupun masih ada %

Kesimpulan: *"Ada satu pun? Patut disemak."*

Format ini dipilih kerana tajuk poster ialah soalan diri ("Asyik…?"). Senarai tanda membolehkan penonton membuat diagnosis sendiri, dan ia berbeza daripada format kempen lain (tangki, dua jam, dua punca).

---

## B. Storyboard 20 saat

| # | Masa | Visual & motion | Teks skrin |
|---|---|---|---|
| 1 | 0:00–0:03 | Kad UGC (pelajar di meja). **Punch-in pada 0.4s** ke plug. Soket vektor, kabel dilukis, iPhone silver sedang dicas (21→24%, kilat hijau). Chip menanda cas ke-3 | ASYIK CARI / **PLUG** SETIAP HARI? · "Cas ke-3 hari ni · 11:37 pagi" |
| 2 | 0:03–0:05 | Freeze, telefon dikesan dan diparkir. "NORMAL" mendapat **?** emas, kemudian perkataan itu **digantikan** (roll) | *Ramai ingat itu…* NORMAL? → Sebenarnya, **ada tandanya.** |
| 3 | 0:05–0:09 | Panel pearl naik. **3 baris tanda**, setiap satu dengan bukti animasi kecil (kaunter plug 1→3, graf 30%→8%, skrin mati pada 15%) dan ✓ ditanda ikut VO | *Bateri cepat habis?* 3 tanda bateri **patut disemak.** · Ada satu pun? **Patut disemak.** |
| 4 | 0:09–0:12 | Wipe navy. Montaj kampus: muka → telefon atas meja → group chat. Chip Study / Nota / Group chat menyala ikut beat. **Kaunter "Cari plug hari ni" 1× → 2× → 3×** | *Hari-hari kat kampus…* |
| 5 | 0:12–0:16 | Pearl wipe. Telefon silver diimbas (paparan Battery). Panel juruteknik ACE. **3 tanda yang sama menjadi senarai semak juruteknik** (✓ ✓ ✓). Kad tawaran poster dengan ikon bateri emas. Rel CHECK → DIAGNOSE → EXPLAIN → CUSTOMER DECIDES | DI ACE SMARTPHONE / Kami semak **dahulu.** · **Pemeriksaan awal percuma.** |
| 6 | 0:16–0:18 | Pearl. Setiap frasa didedahkan oleh **bar Trust Blue** yang menyapu masuk dan menarik diri. Garis emas di bawah punchline | CHECK DULU. / TERANG JELAS. / **TAK MENEKAN-NEKAN.** |
| 7 | 0:18–0:20 | End card navy: logo, lokasi, kad tawaran, butang dengan anak panah (seperti poster), denyut dengan chime | Pemeriksaan awal percuma. · **WHATSAPP SEMAK BATERI →** · *One Place. One Trust.* |

**Nota:** "Harga jelas" **tidak** digunakan kerana poster ini tidak membuat sebarang tuntutan harga. Ia diganti dengan "**Terang jelas**".

---

## C. VO akhir (≈54 patah perkataan)

| Masa | Baris |
|---|---|
| 0.20–2.60s | Asyik cari plug… setiap hari? |
| 3.05–4.90s | Ramai ingat itu normal. Sebenarnya, ada tandanya. |
| 5.05–8.90s | Cas lebih sekali sehari, peratus jatuh mendadak, atau mati sendiri. Itu tanda bateri patut disemak. |
| 9.05–11.80s | Nak study, nota, group chat, semua perlukan telefon. |
| 12.05–15.90s | Di ACE, kami semak dahulu. Pemeriksaan awal percuma. |
| 16.00–17.90s | Check dulu. Terang jelas. Tak menekan-nekan. |
| 18.05–19.70s | WhatsApp ACE untuk semak bateri. |

**Fail:** `public/assets/cari-plug/voiceover.wav`, kemudian set `ENABLE_VOICEOVER: true`.

---

## D. Penggantian aset

| Slot | Placeholder | Ganti dengan |
|---|---|---|
| Hook UGC | `assets/cari-plug/ugc-hook.jpg` | `assets/cari-plug/ugc-hook.mp4`: pelajar di meja, telefon dicas di soket |
| B-roll belajar | `assets/cari-plug/face.jpg` | `assets/cari-plug/study-broll.mp4` |
| Telefon atas meja | `assets/cari-plug/desk.jpg` | `assets/cari-plug/device-closeup.mp4` |
| Semakan juruteknik | `assets/ace-technician.jpg` (staf ACE dari poster lain) | `assets/cari-plug/service-check.mp4` |
| Logo | `assets/ace-logo.png` | Logo rasmi resolusi tinggi |
| Muzik | `audio/music-bed-v2.wav` | Trek berlesen, nama fail sama |

---

## E. Laporan QC

| # | Semakan | Keputusan |
|---|---|---|
| 1 | Masalah difahami dalam 2 saat | ✅ Tajuk + plug + cas sebelum 1.2s |
| 2 | Faham tanpa bunyi | ✅ 3 baris tanda dengan bukti visual + sari kata |
| 3 | Diilhamkan poster | ✅ Talent, meja belajar, soket, iPhone silver, "Plug" emas, tawaran dan CTA berserta anak panah |
| 4–5 | Rasa ACE: pakar, tenang | ✅ Tiada fearmongering. Tanda disemak, bukan terus jual |
| 6 | CTA jelas | ✅ |
| 7 | Boleh dibaca | ✅ Group chat dibesarkan supaya mesej jelas |
| 8 | Motion bertujuan | ✅ Kaunter, tick dan bar-wipe semuanya membawa maklumat |
| 9 | Kesesakan | ⚠️ Babak 5 padat tetapi berperingkat |
| 10–11 | Tiada tuntutan direka | ✅ Tawaran disalin tepat. Nilai UI dilabel "\*Contoh paparan". "Harga jelas" tidak digunakan |
| 12–13 | 20.0s, 1080×1920 | ✅ |
| 14 | Frame akhir lengkap | ✅ ACE Smartphone + CTA + One Place. One Trust. |

**Perlu disahkan oleh ACE:**

1. Apa yang termasuk dalam "pemeriksaan awal" (sebelum tawaran berjalan).
2. Staf memang menyemak ketiga-tiga tanda tersebut.
