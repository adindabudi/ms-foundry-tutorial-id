---
title: "Dataset"
layout: single
classes: wide
permalink: /dataset/
---

Corpus fiktif **Contoso Indonesia** yang dipakai di [Lab 101A]({{ '/labs/foundry-101a-corpus-foundry-iq/' | relative_url }}). Semua nama perusahaan, kebijakan, orang, dan angka di sini fiktif. Kamu mengunduh artifact yang sudah jadi, lalu upload ke Azure Blob Storage; kamu tidak perlu men-generate PDF atau gambar sendiri.

Corpus ini sengaja meniru tantangan dokumen enterprise nyata: tabel policy panjang, tabel yang pecah antar-halaman PDF, flow chart, gambar form hasil scan, dan istilah policy yang mirip sehingga retrieval harus grounded.

## Dipakai di L100

Tiga PDF ini corpus minimum untuk Lab 101A. Upload ke container `corpus` sebelum membuat knowledge source.

| File | Isi | Retrieval challenge |
| --- | --- | --- |
| [HR-001-kebijakan-cuti-2026.pdf]({{ '/sample-data/contoso-indonesia/pdf/HR-001-kebijakan-cuti-2026.pdf' | relative_url }}) | Policy cuti HR dengan tabel entitlement. | Lookup entitlement cuti multi-halaman dan edge case. |
| [HR-002-benefit-karyawan-2026.pdf]({{ '/sample-data/contoso-indonesia/pdf/HR-002-benefit-karyawan-2026.pdf' | relative_url }}) | Matriks benefit dengan nama allowance yang mirip. | Bedakan internet allowance vs device allowance, plus gap kebijakan parkir. |
| [FIN-001-reimburse-dan-perjalanan-dinas.pdf]({{ '/sample-data/contoso-indonesia/pdf/FIN-001-reimburse-dan-perjalanan-dinas.pdf' | relative_url }}) | Policy reimburse dan perjalanan dinas, tabel panjang pecah dua halaman. | Row lookup limit vs approval threshold, tier kota, dan flowchart approval. |

Gambar form scan opsional untuk melihat behavior image verbalization:

- [FORM-reimburse-scan.png]({{ '/sample-data/contoso-indonesia/assets/FORM-reimburse-scan.png' | relative_url }}) — form reimburse scan/noisy fiktif.

## Source dan pendukung

Opsional untuk trainer/maintainer. Tidak perlu di-upload untuk L100 default.

| File | Kegunaan |
| --- | --- |
| [HR-001 (.docx)]({{ '/sample-data/contoso-indonesia/docx/HR-001-kebijakan-cuti-2026.docx' | relative_url }}) · [HR-002 (.docx)]({{ '/sample-data/contoso-indonesia/docx/HR-002-benefit-karyawan-2026.docx' | relative_url }}) · [FIN-001 (.docx)]({{ '/sample-data/contoso-indonesia/docx/FIN-001-reimburse-dan-perjalanan-dinas.docx' | relative_url }}) | Word source yang bisa diedit; upload hanya jika ingin membandingkan behavior format dokumen. |
| [HR-001 (.md)]({{ '/sample-data/contoso-indonesia/source/HR-001-kebijakan-cuti-2026.md' | relative_url }}) · [HR-002 (.md)]({{ '/sample-data/contoso-indonesia/source/HR-002-benefit-karyawan-2026.md' | relative_url }}) · [FIN-001 (.md)]({{ '/sample-data/contoso-indonesia/source/FIN-001-reimburse-dan-perjalanan-dinas.md' | relative_url }}) | Snapshot Markdown dari data corpus terstruktur. |
| [reimburse-approval.mmd]({{ '/sample-data/contoso-indonesia/diagrams/reimburse-approval.mmd' | relative_url }}) · [DIAGRAM-proses-persetujuan.svg]({{ '/sample-data/contoso-indonesia/assets/DIAGRAM-proses-persetujuan.svg' | relative_url }}) | Source Mermaid dan fallback SVG untuk flow approval reimburse. |

Maintainer bisa me-regenerate semua artifact dengan `npm run generate:corpus`.
