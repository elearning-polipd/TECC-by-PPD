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

## V6 phase 1 — continuity narrative (25 Nov 2026)
- Homepage journey (2024–2026) and proposed future direction; links to both previous reports.
- Existing archive expanded to 2024–2025 without changing its URL.
- 2025 scheduled PdP: 532 h, source TECC Annual Report 2025; 2026 scheduled PdP: 633 h, provisional from existing site data.
- No changes to underlying utilisation calculations or evidence permissions; reconcile master spreadsheet and confirm official reporting methodology before final submission.
- Previous website content and external links have not been independently browser-tested.

### V6.1 visual polish
- Aligned chapter numbers, icons and left-aligned labels on both room pages; preserved horizontal mobile tabs.
- Applied distinct mint/teal and lavender/violet homepage room-card panels, badges, arrows and subtle photo overlays. Original photos and reporting figures unchanged.

## V6.2
- Explicit room-specific classes preserve teal/violet identity after BM/EN link rewriting.
- Homepage: single room title, feature tags, labelled calls to action, bilingual future-direction banner. Original photos and reporting data retained.

## V6.3 — 26 November 2026
- Snapshot of the master Google Sheet. Complete anonymised booking registers (21 TECC 2.0, 63 Digital EyeZ), all approved Digital EyeZ monthly/department allocations, activity updates, and searchable tables.
- Reported TECC 2.0 totals retained. Digital EyeZ 25.75 additional hours; AKRI 10.75 additional after overlap deduction; Raya 2 h already booked. Dashboard 163.06 h includes pending 1 h and rounding; not physical utilisation. Approved resource hours plus additional activities 162 h 04 m, further overlap review required.
- Restricted/internal register URLs removed; newly identified evidence listed without publishing unverified access links. Original master sheet remains the source for reviewer evidence.

## V7.0 — Immersive Digital Experience
- Editorial hero with expandable authentic photo panels, keyboard and touch controls.
- Homepage impact bento, coloured journey and future chapters; figures drawn from unchanged V6.3 data.
- Room-specific introduction galleries, coloured dashboard tiles and animated chart reveals; original reporting navigation and registers retained.
- Reduced-motion support. No external animation dependencies. V6.3 data snapshot preserved, no live data sync or new verification implied.

## V7.1 — Submission build (26 November 2026)
- Data checked against the master Sheet (modified 26 Nov): TECC 2.0 816.5 h / 999 h = 81.7% (Session II 86.7%, Session I 77.1% with all use counted); Digital EyeZ 63 bookings, 25.75 h additional activities, dashboard 163.06 h. Site data matches.
- Photos: 6 new WebP images added (TECC 2.0 room layout, JPA staff in the room; Digital EyeZ green-screen recording, closing ceremony and certificate of the RMI Future workshop, 2 Jul 2026). Filterable gallery now on both room pages (Highlights tab).
- Not used: photos with identifiable pupils, signed key-log sheets, WhatsApp screenshots, a slide showing a personal phone number.
- Draft wording ("perlu disahkan", "lampirkan", "belum diisi") replaced by final text on all pages. Status badges updated. Register page now lists only publishable evidence documents; files with personal data (Wi-Fi password slide, SPP contract, staff-name letter, IC-number report, MyIPO certificate) are removed.
- Fixed: translation keys x201–x206 were defined twice (evidence page and room page); room-page keys renamed x301–x308. Undated items no longer appear as "undefined" in the Digital EyeZ timeline. Desktop side-menu labels no longer break mid-word.

## V8.0 — Motion layer (26 November 2026)
- `motion-v8.css` / `motion-v8.js` (no dependencies, removable): kinetic headings (lines rise with blur and a colour sweep on line 2; section headings reveal word by word), Ken Burns drift on the active hero photo, hero gallery autoplay (pauses on hover, focus, touch, hidden tab), parallax on room photos, staggered gallery reveal, pointer tilt on cards, infinite photo ribbon on the homepage, scroll-progress bar.
- All motion is off under `prefers-reduced-motion`. Re-applies after BM/EN switch.

## V9.0 — 3D animated dashboard (26 November 2026)
- `d3-dashboard.js` / `d3-dashboard.css` (pure CSS 3D, no libraries) on the Dashboard tab of both room pages: bars grow in when scrolled into view, gentle sway, drag to rotate, tap or hover a bar for details, view switcher (TECC 2.0: Full year / Semester / Categories; TECC 4.0: Monthly / Full year), BM/EN aware, auto-fits phones, reduced-motion safe.
- Added `tecc2.semesters` (Session II 417.25/481 h = 86.7%, Session I 399.25/518 h = 77.1%) to the data, taken from the master Sheet Dashboard.

## V9.1
- TECC 4.0: Bengkel Pengenalan (28–29 Jan, 18 j) dan Bengkel RMI Future (2 Jul, 9 j) dikira. Jam aktiviti tambahan 117.75; jumlah 190.06 j; faktor guna 19.0%.
- Item penambahbaikan (tinted, portal, pemasangan, Video AI, lawatan) ditanda tidak dikira.

## V9.2
- TECC 4.0: BIPD (8 j), TikTok Tutor (16 j) dan Finalis AKRI (45 j) dikira ikut hari normal (8 j; Jumaat 5 j). Aktiviti 117.75 j; jumlah 255.06 j; faktor 25.9%.

## V9.3
- PSH (12 Nov, 09:00–13:00, 4 j) dikira; ditolak daripada Finalis AKRI (41 j) bagi elak gandaan. Jumlah kekal 255.06 j.

## V9.4
- PSH dipecahkan: Web Wizard (11 Nov, 4 j) dan Canvas (12 Nov, 4 j); Finalis AKRI 37 j. Jumlah kekal 255.06 j.

## V9.5
- BIPD 29 Apr dibetulkan kepada 4 j (nama folder: 9.00–1.00). Aktiviti 117.75 j; jumlah 255.06 j; faktor 25.5%.
- ARCHI-SPACE (DCA40462, 14 minggu) dipadankan dengan tempahan JKA; tiada jam tambahan.

## V9.6
- ARCHI-SPACE: 7 sesi Khamis tanpa tempahan dikira 21 j (zon berbeza). Aktiviti 138.75 j; jumlah 276.06 j; faktor 27.6%.

## V9.7
- Web Wizard 11 Nov ikut log Meet 08:56-12:46 (3.83 j); AKRI 37.17 j. Jumlah kekal.

## V9.8
- Sync folder Drive yg dikemas kini: Ramadan 4j, SOLS 2j, Kolaborasi 8j, Raya AMP 2j, Raya JPA +1j; AKRI 31.17j (9-5). Aktiviti 149.75j, jumlah 287.06j (28.7
## V9.8
- Sync folder Drive dikemas kini: Ramadan 4j, SOLS 2j, Kolaborasi 8j, Raya AMP 2j, Raya JPA +1j; AKRI 31.17j (9-5). Aktiviti 149.75j, jumlah 287.06j (28.7 peratus).

## V9.9
- JK Fotografi Konvo 5-15 Okt di TECC 4.0: 69j. Aktiviti 218.75j, jumlah 356.06j (35.6 peratus).

## V9.10
- Konvo 11 hari termasuk hujung minggu: 85j. Aktiviti 234.75j, jumlah 372.06j (37.2 peratus).

## V9.11
- GENACITY persediaan 9-13 Feb dan 27 Mac-2 Apr, 37j setiap satu. Aktiviti 308.75j, jumlah 446.06j (44.7 peratus).

## V9.12
- Seksyen baharu #equip (tecc4): pelan susun atur 13.30x7.10 m (2 gambar WebP), 3 zon Garis Panduan, spesifikasi 13 item peralatan, pautan dokumen. Status komponen 3 TECC 4.0 jadi Sedia.

## V9.13
- arkib2025: seksyen #embeds, pratonton iframe Canva 2024 + Google Sites 2025 (muat atas ketik, butang buka tab baharu, amaran jika disekat).

## V9.14
- TECC 2.0 jadual: kod warna mengikut program (DKA, DKM, DEQ, DEG, DSB dsb) + legenda.
- TECC 4.0: seksyen #t4week (slot Pengemasan Jumaat 3-5 petang, 47 Jumaat x 2 j = 94 j; 1 Mei dan 25 Dis cuti umum tidak dikira) + aktiviti c20. Jumlah 540.06 j (54.1 peratus).
- TECC 4.0: galeri aktiviti #t4gallery, kolaj 3 slot, pautan folder Drive; foto tambahan: assets/activity/ID-2.webp.
- Semakan bahasa: BM baku (papan pemuka, pengemasan, faktor penggunaan, jarak piksel, anda).
V9.15: asas pembangunan 2025 (Kick Off 3 j, pemasangan 45 j, Simlab 16 j, latihan peralatan 8 j = 72 j; jumlah 612.06 j, 61.3%); bahagian KPI/SKT; foto ganti tanpa 404; favicon/og meta; alt ikon; sasaran sentuh 44px.
