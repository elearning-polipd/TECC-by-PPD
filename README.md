# POLIPD TECC 2026 — Editorial Website v4 (BM / EN)

## What changed from v3
- **Single data pool:** `data/site-data.js`. Monthly usage, activities, evidence counts, status of the 4 components and the register of evidence/letters/attachments all live here. Every page reads from it. Edit this file only.
- **New pages:** `lampiran.html` (register of evidence, surat and lampiran + month x evidence matrix) and `arkib2025.html` (2025 reference links).
- **Navigation:** current-page indicator, section scroll-spy on the 01-04 bar, status strip per room, next/previous room card, mobile menu closes on link/Esc/outside tap, back-to-top, `?lang=` kept on `#section` links.
- **Fixed:** hero headings lost their second line after the language script ran (data-i18n on elements that had child elements).
- **Data:** TECC 4.0 hours, departments, monthly view; TECC 2.0 16 booked hours, 21 Jan course, ~13 Apr MUET test, weekly PdP hours, Wednesday overlap rule; TECC 4.0 start year (SPP 30 Sep 2025) and layout size.
- Images converted to WebP. Style unchanged (light editorial cards).

## How to pool, then connect
1. Put the booking export (without names, e-mails, booking IDs) in Drive and compute bookings/hours per month.
2. In `data/site-data.js` set each month under `tecc4.monthly` to `{"m":2,"state":"known","bookings":N,"hours":"Xj Ym"}`. The remaining-hours note updates from `tecc4.residual`.
3. Add each letter/attachment to `register` (status: ready / internal / hold / missing) and reference its `id` in an activity's `evidence` list.
4. Local files go in `assets/lampiran/`; use WebP for images.

## Do not publish (faces are OK per site owner; these are for other reasons)
Items with status **hold** in the register (Wi-Fi password slide, SPP certificate, staff-name letters). `lampiran.html` is an internal working page; remove it from the final public build if not needed.

## Still to verify before submission
TECC 4.0 location and capacity; TECC 2.0 start year; participant counts; officer names and SOP versions; dissemination links; actual 2026 session timetables after January; the POLYCC guide requires Google Sites, so confirm coordinator approval for this custom site.

## v5 (baru)
- Peta konsep ikut Google Sites anda (Gambaran Kemudahan, Reka Bentuk P&P, Pengurusan Ruang, Perkongsian Ilmu, TECCgogy, Laporan) dipetakan kepada 4 komponen wajib.
- Interaktif: penjelajah 4 zon, jadual waktu interaktif (Jan 2026 / Ogos 2025), garis masa 2026 boleh ditapis, modul PdP, lightbox gambar, animasi scroll dan kiraan nombor (hormati "reduced motion").
- Data konsep ada dalam data/site-data.js (concept, cmap, timetable). Jadual dibaca daripada imej dengan mengira slot: sahkan dengan fail aSc. Skema zon ialah konsep, bukan pelan lantai sebenar.
- Kandungan konsep (visi, misi, objektif, modul) daripada laporan 2025 anda; tiada angka 2025 dipaparkan sebagai data 2026.

## Tambahan (garis panduan BIPD 2024)
- Rubrik penarafan bintang interaktif: TECC 2.0 (3 elemen 50/30/20) dan DigitalEyez (4 elemen 50/20/20/10, termasuk Elemen 4 Inovasi, Penyelidikan & Kolaborasi).
- Dasar pusat TECC (utiliti 75–80%, 2–4 aktiviti bukan P&P, 1–4 kursus setiap program) dan empat jenis Immersive Investigation (I2).
- Status dalam rubrik ialah anggaran kesediaan bukti, bukan markah. Kemas kini dalam data/site-data.js (rubric).

## ARCHI-SPACE (TECC 4.0, Elemen 4)
Dirujuk daripada repo/laman GitHub ARCHI-SPACE-by-PPD: CORR DCA40462, kajian ARCHI-KIT 2026, MyIPO CRDV2025M07544, laporan POLYCCOM 2025 (ada nombor KP: jangan terbit awam), gambar sesi VR. Pautan menuju ke laman GitHub Pages anda.
