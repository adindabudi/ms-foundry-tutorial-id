---
title: "101D: Publish ke Teams/M365 Pilot"
description: "Publish agent ke Teams/M365 untuk pilot jika tenant dan admin policy mengizinkan."
excerpt: "Publish agent ke Teams/M365 untuk pilot jika tenant dan admin policy mengizinkan."
difficulty: 150
duration: 45
persona: "Business user, maker, cloud practitioner"
journey: "foundry-101"
module: "foundry-101"
section: "optional_labs"
order: 104
optional: true
---

# 101D: Publish ke Teams/M365 Pilot

Lab optional ini menyiapkan publish ke Microsoft Teams dan Microsoft 365 Copilot. Lab ini tidak menjadi syarat kelulusan Foundry 101 core karena publish bergantung tenant policy, Azure Bot Service permission, dan admin approval.

## Lab Details

| Level | Persona | Duration | Outcome |
| --- | --- | --- | --- |
| L150 | Business user / maker | 30-45 minutes | Agent dipublish untuk pilot bila tenant policy dan admin approval memungkinkan. |

## Table of Contents

- [Why This Matters](#why-this-matters)
- [Introduction](#introduction)
- [Core Concepts Overview](#core-concepts-overview)
- [Documentation and Additional Training Links](#documentation-and-additional-training-links)
- [Prerequisites](#prerequisites)
- [Summary of Targets](#summary-of-targets)
- [Use Cases Covered](#use-cases-covered)
- [Instructions by Use Case](#instructions-by-use-case)
- [Use Case #1: Confirm active version and prerequisites](#use-case-1-confirm-active-version-and-prerequisites)
- [Use Case #2: Publish to Teams/M365](#use-case-2-publish-to-teamsm365)
- [Use Case #3: Validate pilot channel](#use-case-3-validate-pilot-channel)
- [Summary of learnings](#summary-of-learnings)

## Why This Matters

User internal biasanya bekerja di Teams dan Microsoft 365. Publishing menempatkan agent di channel kerja nyata, tetapi juga menambah dependency: Bot Service, tenant policy, admin approval, channel limitations, dan data boundary review.

## Introduction

Lab ini dimulai setelah Lab 101C selesai. Agent sudah punya validation log dan active version. Kamu akan membuka publish flow, memilih scope pilot, mengisi metadata, lalu memvalidasi apakah agent muncul di Microsoft 365/Teams.

> [!IMPORTANT]
> Microsoft Learn menandai publish Foundry agents ke Microsoft 365 Copilot dan Teams sebagai **Early Access Preview**. Gunakan untuk pilot dengan approval yang jelas, bukan klaim GA production path.

## Core Concepts Overview

| Concept | Why it matters |
| --- | --- |
| Stable endpoint | Published channel mengarah ke entity agent yang stabil, bukan setiap draft. |
| Active version | Version yang menerima traffic. Pin ke version yang sudah lolos validation. |
| Azure Bot Service | Resource yang digunakan channel Teams/M365 untuk menyampaikan message ke agent. |
| Publish scope | `Just you` untuk personal pilot, `People in your organization` untuk org rollout dengan admin approval. |
| Channel limitations | Published agents tidak selalu punya fitur sama seperti playground, termasuk citations/streaming. |

## Documentation and Additional Training Links

- [Publish agents to Microsoft 365 Copilot and Microsoft Teams](https://learn.microsoft.com/azure/foundry/agents/how-to/publish-copilot)
- [Configure and share your agent](https://learn.microsoft.com/azure/foundry/agents/how-to/configure-agent)
- [Role-based access control in the Foundry portal](https://learn.microsoft.com/azure/foundry/concepts/rbac-foundry)
- [Set up Agent Store in Microsoft 365 Copilot](https://learn.microsoft.com/microsoft-365/copilot/copilot-agent-store)

## Prerequisites

- Agent sudah lolos Lab 101C validation.
- Active version sudah dipilih atau siap dipilih.
- User punya Foundry User role pada project.
- Subscription mengizinkan Azure Bot Service resource.
- Resource provider `Microsoft.BotService` sudah registered.
- Untuk organization scope, Microsoft 365 admin siap review request.

## Summary of Targets

- Confirm active version.
- Buka publish to Teams/M365 flow.
- Isi metadata publish.
- Pilih pilot scope.
- Validasi agent muncul atau dokumentasikan blocker tenant/admin.
- Catat channel limitations sebelum stakeholder test.

## Use Cases Covered

| Use Case | Goal | Time |
| --- | --- | ---: |
| 1. Confirm active version and prerequisites | Memastikan publish memakai version yang benar | 10 min |
| 2. Publish to Teams/M365 | Mengisi metadata dan memilih publish scope | 20 min |
| 3. Validate pilot channel | Memastikan agent bisa ditemukan/dibuka atau blocker terdokumentasi | 15 min |

## Instructions by Use Case

## Use Case #1: Confirm active version and prerequisites

### Objective

Memastikan publish tidak mengambil draft yang belum lolos validation.

### Step-by-step instructions

1. Buka agent di Microsoft Foundry portal.
2. Pilih **Publish** dropdown.
3. Cek **Active version**.

![Microsoft Learn screenshot of the Publish dropdown.](assets/mslearn-publish-dropdown.png)

4. Jika belum dipin, pilih version yang lolos Lab 101C.

![Microsoft Learn screenshot of active version selector.](assets/mslearn-active-version.png)

Expected result: publish flow memakai active version yang sudah divalidasi.

Cost implication: memilih active version tidak signifikan biayanya, tetapi publish flow dapat membuat atau memakai Azure Bot Service resource.

## Use Case #2: Publish to Teams/M365

### Objective

Publish agent untuk pilot personal atau org rollout.

### Step-by-step instructions

1. Di Foundry portal, pilih **Publish** > **Publish to Teams and Microsoft 365 Copilot**.
2. Pastikan Azure Bot Service field valid. Jika muncul permission error, cek role Azure Bot Service Contributor atau resource provider `Microsoft.BotService`.
3. Isi metadata publish:

| Field | Example | Notes |
| --- | --- | --- |
| Name | `Asisten Karyawan Contoso` | Display name di agent store. |
| Publish version | `1.0.0` | Semantic version untuk metadata publish. |
| Short description | `Asisten kebijakan internal Contoso Indonesia.` | Satu kalimat. |
| Description | `Menjawab pertanyaan karyawan berdasarkan corpus HR, benefit, reimburse, dan alur approval.` | Jangan masukkan secret. |
| Developer | `Contoso Indonesia` | Nama organisasi/trainer. |

4. Pilih **Next: Publish options**.
5. Pilih scope:

| Scope | Behavior | Admin approval | Best for |
| --- | --- | --- | --- |
| Just you | Available immediately untuk kamu | Tidak | Pilot personal dan smoke test |
| People in your organization | Submit untuk admin approval | Ya | Org rollout setelah pilot |

6. Pilih **Publish**.

Expected result: portal menampilkan publish success atau menjelaskan approval/error yang harus diselesaikan.

> [!WARNING]
> Jangan masukkan API key, endpoint private, user email, tenant ID, atau informasi sensitif ke metadata publish. Metadata terlihat oleh user/admin.

## Use Case #3: Validate pilot channel

### Objective

Memastikan agent bisa ditemukan dan behavior channel sesuai ekspektasi.

### Step-by-step instructions

1. Jika memakai `Just you`, buka Microsoft 365 Copilot agent store atau Teams Apps sesuai link yang diberikan portal.
2. Cari agent di **Your agents**.
3. Jika memakai org scope, minta admin membuka Microsoft 365 admin center dan approve request.

![Microsoft Learn screenshot of the Agent Store.](assets/mslearn-agent-store.png)

4. Share link jika scope individual mendukung sharing.

![Microsoft Learn screenshot for sharing an individual scoped published agent.](assets/mslearn-share-published-agent.png)

5. Jalankan prompt smoke test:

```text
Berapa limit reimburse hotel untuk staff saat perjalanan dinas ke kota tier 1?
```

Expected result:

- Agent menjawab dari kebijakan reimburse.
- Jika citation tidak muncul di channel publish, catat sebagai limitation, bukan failure retrieval.
- Jika agent tidak muncul, cek scope, admin approval, dan tenant app policy.

## Known limitations

| Limitation | Impact |
| --- | --- |
| Early Access Preview | Terms dan behavior dapat berubah. Gunakan untuk pilot terkontrol. |
| File uploads/image generation tidak bekerja di Microsoft 365 | Jangan mendesain flow M365 yang bergantung upload file. |
| Private Link tidak didukung untuk Teams/Azure Bot Service integrations | Private network projects memerlukan pattern khusus/manual. |
| Published agents tidak support streaming responses atau citations | Validasi source/citation tetap dilakukan di playground. |

## Troubleshooting

| Issue | Likely cause | Fix |
| --- | --- | --- |
| Publish gagal saat Azure Bot Service creation | Permission kurang atau provider belum registered | Cek permission resource group dan `Microsoft.BotService`. |
| Organization agent tidak muncul | Admin approval pending | Cek Microsoft 365 admin center > Agents requests. |
| Agent works in Foundry but fails in Teams | Agent identity kurang akses downstream resources | Assign RBAC ke agent identity. |
| User tidak bisa menemukan agent | Scope salah atau app policy membatasi | Share individual link atau minta admin review policy. |

## Congratulations! You completed Lab 101D

Jika publish berhasil, kamu punya pilot channel di Teams/M365. Jika tidak, kamu tetap punya agent validated di playground dari Lab 101C; blocker tenant/admin harus dicatat sebagai action item, bukan dianggap gagal belajar.

## Test your understanding

- Apa beda `Just you` dan `People in your organization`?
- Kenapa active version harus dipilih sebelum publish?
- Kenapa citation hilang di channel publish tidak otomatis berarti retrieval gagal?
- Role/resource apa yang biasanya menyebabkan publish gagal?

## Challenge: Apply this to your own use case

Tulis metadata publish untuk agent internal kamu: name, short description, full description, target users, dan approval owner. Pastikan tidak ada secret atau private endpoint di metadata.

## Summary of learnings

- Publishing membawa agent ke channel kerja user, tetapi menambah dependency tenant/admin.
- Active version menentukan behavior yang diterima user.
- Teams/M365 publish punya limitations yang harus dijelaskan sebelum pilot.
- Playground tetap menjadi tempat validasi citation/source.

## Conclusions and recommendations

- Mulai dari `Just you` untuk pilot kecil.
- Pakai org scope hanya setelah validation log dan owner approval siap.
- Jelaskan Early Access Preview dan channel limitations ke stakeholder.
- Simpan daftar blocker publish sebagai bagian dari pilot readiness.
