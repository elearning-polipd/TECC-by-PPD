# TECC v22 — Part 01 integrated enhancement

Base: user-supplied `0000 TECC-update-v21.zip`. Original header, eight existing report tabs, data, and panels outside Introduction retained. Four-category navigation added in v22.1, preserving original report tabs and deep links.

## Modified files
- `tecc2.html`, `tecc4.html`: hero, profile, conceptual foundation, timeline, facility gallery.
- `part01-v22.css`, `part01-v22.js`: scoped light design, responsive gallery, scroll reveal, keyboard-close native photo dialog, reduced motion.
- `assets/part01/*.webp`: 10 selected facility images. Duplicate uploads excluded; altered ARCHI-SPACE illustration excluded; overview with visible keys excluded.
- This handoff.

## Content / verification
- TECC 2.0: at least 2017 from Dec 2017 timetable; exact launch date pending. 2022 upgrade reported by coordinator; equipment specifications pending. Tender schedule lists PEA1/2 on 7 Oct 2022, not proof of installation.
- TECC 4.0: 2025 commissioning cited in existing source; location and student capacity pending. Room dimensions from proposed plan, not verified as-built.
- Four facility photos mapped to E60 in v22.1; six remain `pend`. Photo dates remain unverified. No usage hours inferred. No stock or AI photos added.
- Sources: BIPD 2024 TECC 2.0 and DigitalEyez guidelines; historical links in timeline. Original Canva and Google Sites archive access not confirmed.
- Existing TECC 2.0 interactive zone plan and TECC 4.0 equipment section retained.

## Validation
JS syntax checked; HTML structural check and local asset paths checked. Offline Chromium tests passed in v22.1 before photo reconciliation; live browser navigation was blocked. No live deployment performed. Native Content Master and Sheet induk mapping updated. Existing site assets outside new Part 01 not audited for global duplicate imagery or privacy.

## Next
Verify profile fields and assign E IDs; browser test; approve Part 01 before proceeding to Part 02. Keep data/site-data.js unchanged unless approved corrections are supplied. Google Sites submission requirement remains outstanding.

## v22.1 — photo reconciliation
- Seven Part 01 image aliases matched existing assets by perceptual hash (distance 0). Canonical repository paths reused; redundant newly added copies removed. E60 matches four existing facility assets; remaining six are pend.
- E60 images appear in TECC 4.0 Part 01 only, not repeated in collage-v11. Two VR facility images moved from home to Part 01; home innovation card now links to documentation without misleading photo caption. Original archive copies retained.
- E60 is a facility record, not attendance or usage; dates and original Drive link pending. No usage figures changed.
- Scope: ten Part 01 photos checked against all WebP assets; not a complete audit of every unrelated historic photo placement.
- Native Content Master: https://docs.google.com/spreadsheets/d/10FX505u3OWeqO41IJCIgoFR-w_p-O3A8Seden8Z_ZZs/edit
- Sheet induk: https://docs.google.com/spreadsheets/d/13vf8v9TYBPMg1bHM3stDponAaUIpFghVKviaV3HTSv0/edit (Dashboard A25:F32; Peta Sumber Laman mapping).

- Re-tested after photo reconciliation: 12 room-page and 6 home-page combinations (360/768/1280 px, BM/EN) passed offline, no horizontal overflow or JS runtime errors; gallery filters and room dialogs tested. Live deployment and external links remain unverified.

## v22.2 — complete Part 01 evidence mapping
- 10/10 facility photos mapped to E60 (4), E78 (4), E79 (2). Visual comparison of canonical assets to user-provided photos completed 28 Nov 2026; E78 and E79 newly registered in Evidence Register and Peta Sumber Laman. No activity hours added. Capture dates, original source links and institutional approval remain unverified.
- Updated HTML captions and data attributes, and photo map with SHA-256 checksums. This is mapping verification, not verification of activity or capture date. Earlier pending-ID notes above are superseded for these ten photos.
- Added E60/E78/E79 to the website appendix register in data/site-data.js. All non-register JSON values are identical to the prior version; usage data unchanged.
