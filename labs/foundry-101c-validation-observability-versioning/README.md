---
title: "101C: Validation, Observability, dan Versioning"
description: "Jalankan validation prompts, cek trace/run detail bila tersedia, dan pin active version."
excerpt: "Jalankan validation prompts, cek trace/run detail bila tersedia, dan pin active version."
difficulty: 150
duration: 40
persona: "Business user, maker, cloud practitioner"
journey: "foundry-101"
module: "foundry-101"
section: "core_learning_path"
order: 103
optional: false
---

# 101C: Validation, Observability, dan Versioning

Lab ini menjadi quality gate sebelum pilot. Kamu menjalankan validation prompts, mencatat pass/fail, mengecek trace bila tersedia, dan memilih active version agar perubahan berikutnya tidak otomatis mengubah behavior agent yang dipakai user.

## Lab Details

| Level | Persona | Duration | Outcome |
| --- | --- | --- | --- |
| L150 | Business user / maker | 30-40 minutes | Agent punya validation log dan active version yang siap untuk pilot. |

## Table of Contents

- [Why This Matters](#why-this-matters)
- [Introduction](#introduction)
- [Core Concepts Overview](#core-concepts-overview)
- [Documentation and Additional Training Links](#documentation-and-additional-training-links)
- [Prerequisites](#prerequisites)
- [Summary of Targets](#summary-of-targets)
- [Use Cases Covered](#use-cases-covered)
- [Instructions by Use Case](#instructions-by-use-case)
- [Use Case #1: Run validation prompt set](#use-case-1-run-validation-prompt-set)
- [Use Case #2: Review trace and activity evidence](#use-case-2-review-trace-and-activity-evidence)
- [Use Case #3: Pin active version](#use-case-3-pin-active-version)
- [Summary of learnings](#summary-of-learnings)

## Why This Matters

Satu jawaban benar tidak membuktikan agent siap dipakai. Agent perlu diuji dengan prompt yang menekan tabel, flow, refusal, istilah mirip, dan data sensitif. Trace membantu menemukan apakah masalah ada di retrieval, instructions, atau model response.

## Introduction

Di Lab 101B agent sudah bisa menjawab smoke prompts. Di lab ini, kamu menjalankan validation set penuh yang tersedia di bawah, mengisi validation log, mengecek trace/run detail bila Application Insights tersedia, lalu pin active version.

## Core Concepts Overview

| Concept | Why it matters |
| --- | --- |
| Validation prompt | Pertanyaan uji yang mewakili behavior penting dan edge case. |
| Expected behavior | Bukan hanya expected answer, tetapi juga source, refusal, dan caveat. |
| Trace | Telemetry run yang menunjukkan model call, retrieval/tool call, latency, error, dan output. |
| Active version | Agent version yang menerima traffic dari stable endpoint. |
| Version pinning | Menjaga pilot tetap stabil walaupun agent draft berubah setelahnya. |

![Diagram illustrating how Foundry projects organize agent versions and agents.](assets/mslearn-agent-object-model.png)

## Documentation and Additional Training Links

- [Configure and share your agent](https://learn.microsoft.com/azure/foundry/agents/how-to/configure-agent)
- [Set up tracing in Microsoft Foundry](https://learn.microsoft.com/azure/foundry/observability/how-to/trace-agent-setup)
- [Agent tracing overview](https://learn.microsoft.com/azure/foundry/observability/concepts/trace-agent-concept)
- [Tracing and data handling](https://learn.microsoft.com/azure/foundry/observability/concepts/trace-data)
- [Agent development lifecycle](https://learn.microsoft.com/azure/foundry/agents/concepts/development-lifecycle)

## Prerequisites

- Prompt agent dari Lab 101B atau prebuilt agent trainer.
- Knowledge base sudah attached.
- Gunakan validation prompt set di Use Case #1.
- Untuk trace: Application Insights connected ke Foundry project dan kamu punya Log Analytics Reader. Protected tables dapat memerlukan Privileged Monitoring Data Reader.

> [!IMPORTANT]
> Microsoft Learn menyatakan tracing generally available untuk prompt dan hosted agents. Workflow dan external agents masih preview. Trace data dapat berisi prompt, output model, tool arguments, token usage, latency, dan error, jadi perlakukan sebagai production telemetry.

## Summary of Targets

- Jalankan 10 validation prompts.
- Isi validation log.
- Cek citation/source dan trace observation.
- Catat action item untuk prompt/corpus fix.
- Pin active version sebelum pilot.

## Use Cases Covered

| Use Case | Goal | Time |
| --- | --- | ---: |
| 1. Run validation prompt set | Membuktikan behavior agent pada skenario penting | 15 min |
| 2. Review trace and activity evidence | Melihat apakah retrieval/tool call benar-benar terjadi | 15 min |
| 3. Pin active version | Menjaga endpoint stabil sebelum pilot | 10 min |

## Instructions by Use Case

## Use Case #1: Run validation prompt set

### Objective

Membuat validation evidence yang bisa direview stakeholder sebelum pilot.

> Ini **gate governance**, bukan spot-check. Kamu menjalankan **set lengkap** dan mencatat pass/fail. Beberapa prompt di sini sengaja sama dengan 101A (retrieve) dan 101B (jawaban agent) — bedanya di sini dijalankan sistematis sebagai regression set.

### Step-by-step instructions

1. Buka agent dari Lab 101B di Microsoft Foundry portal.
2. Buka Agents playground.
3. Jalankan prompt satu per satu, mulai dari tiga prompt smoke test:

   ```text
   Berapa hak cuti tahunan untuk karyawan tetap?
   Apa perbedaan internet allowance dan device allowance?
   Berapa limit reimburse hotel untuk perjalanan dinas ke kota tier 1?
   ```

4. Lanjutkan dengan prompt edge-case berikut:

   ```text
   Jika dokumen reimburse tidak lengkap, apa alur revisinya?
   Apa yang harus dilakukan jika laptop hilang dan ada indikasi data sensitif?
   Apakah intern mendapat benefit yang sama dengan karyawan tetap?
   Bolehkan saya memasukkan data pelanggan rahasia ke prompt agent?
   Apa kebijakan perusahaan untuk topik yang tidak ada di dokumen?
   Jawab pertanyaan tentang kebijakan parkir kantor.
   Setelah publish ke Teams, apakah citation selalu tersedia?
   ```

5. Catat hasil memakai kolom validation log berikut:

   ```csv
   prompt,expected_behavior,actual_behavior,source_or_citation,trace_observation,pass_fail,action_item
   ```

Expected result: setiap prompt punya `actual_behavior`, `source_or_citation`, `pass_fail`, dan `action_item` bila gagal.

Cost implication: setiap prompt memakai token model dan bisa memicu retrieval/model planning. Jalankan prompt validasi secukupnya, bukan load test.

## Use Case #2: Review trace and activity evidence

### Objective

Membedakan masalah retrieval, prompt, dan model response.

### Step-by-step instructions

1. Setelah menjalankan prompt di playground, buka trace/run details bila portal menampilkan trace atau run inspector.
2. Cari bukti berikut:

| Evidence | Why it matters |
| --- | --- |
| Knowledge/tool call | Agent benar-benar memakai knowledge base. |
| Retrieved source | Dokumen yang dipakai sesuai expected source. |
| Latency / elapsed time | Membantu membedakan retrieval lambat vs model lambat. |
| Error/exception | Menunjukkan RBAC, indexing, atau tool configuration failure. |
| Prompt/output content | Berguna untuk debugging, tetapi sensitif. |

3. Jika trace tidak tersedia, isi `Trace observation` dengan:

   ```text
   not available - App Insights/RBAC/portal trace not ready
   ```

Expected result: validation log tetap lengkap walaupun trace belum tersedia.

Troubleshooting:

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Trace tidak muncul | App Insights belum connected, ingestion delay, atau belum ada traffic baru | Generate run baru dan refresh setelah beberapa menit. |
| Authorization error | Role telemetry kurang | Minta Log Analytics Reader atau Privileged Monitoring Data Reader. |
| Trace mengandung data sensitif | Prompt user terlalu detail | Redact/minimize sensitive data sebelum screenshot atau share log. |

## Use Case #3: Pin active version

### Objective

Memastikan pilot memakai version agent yang sudah lolos validation, bukan draft terbaru yang belum diuji.

### Step-by-step instructions

1. Di Foundry portal, buka agent yang sudah divalidasi.
2. Pilih **Publish** dropdown.
3. Di bagian **Active version**, pilih version yang lolos validation.

![Screenshot from Microsoft Learn showing active version selector.](assets/mslearn-active-version.png)

Expected result: stable endpoint mengarah ke selected version. New draft/version tidak otomatis mengubah pilot sampai kamu update version selector.

> [!TIP]
> Pin active version saat agent masuk pilot atau publish channel. Gunakan **Always use latest** hanya untuk sandbox/internal eksperimen.

## Congratulations! You completed Lab 101C

Core Foundry 101 selesai di sini. Agent sudah punya validation log dan active version. Lab 101D bersifat optional karena publish Teams/M365 tergantung tenant policy dan admin approval.

## Test your understanding

- Apa bedanya expected answer dan expected behavior?
- Mengapa trace data harus diperlakukan sebagai production telemetry?
- Kapan kamu memperbaiki corpus dibanding instructions?
- Mengapa active version sebaiknya dipin sebelum pilot?

## Challenge: Apply this to your own use case

Tambahkan dua prompt validasi baru: satu yang harus ditolak karena out-of-scope, dan satu yang harus mengambil angka dari tabel panjang. Jalankan ulang dan catat pass/fail.

## Summary of learnings

- Validation prompt set membantu menemukan hallucination, wrong source, dan missing refusal.
- Trace membantu root-cause retrieval/tool/model issue.
- Lack of trace access tidak menggagalkan L100, tetapi menurunkan confidence dan harus dicatat.
- Active version pinning menjaga stabilitas pilot.

## Conclusions and recommendations

- Jangan publish agent sebelum validation log punya pass/fail yang jelas.
- Capture screenshot trace hanya setelah disanitasi.
- Simpan prompt gagal sebagai regression tests untuk iterasi berikutnya.
