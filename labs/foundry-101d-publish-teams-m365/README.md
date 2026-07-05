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

Lab optional ini menyiapkan publish ke Teams/M365 untuk pilot. Langkah ini tenant-dependent dan tidak menjadi syarat kelulusan Foundry 101 core.

## Lab Details

| Level | Persona | Duration | Outcome |
| --- | --- | --- | --- |
| L150 | Business user / maker | 30-45 minutes | Agent dipublish untuk pilot bila tenant policy dan admin approval memungkinkan. |

## Why This Matters

User internal biasanya bekerja di Teams/M365. Publish pilot membantu menguji agent di channel kerja nyata, tetapi harus jujur terhadap status Early Access Preview dan limitation channel.

## Prerequisites

- Agent sudah lolos validation Lab 101C.
- Permission untuk publish agent.
- Azure Bot Service provider dan permission terkait bila dibutuhkan.
- Tenant/admin policy mengizinkan pilot.

## Summary of Targets

- Pilih active version.
- Isi metadata publish.
- Pilih scope pilot yang sesuai.
- Validasi behavior di Teams/M365 atau catat fallback bila publish tidak tersedia.

## Instructions by Use Case

Konten langkah visual dan screenshot akan diisi dalam plan konten Foundry 101. Foundation page ini memastikan routing, layout, dan metadata lab sudah bekerja.

## Summary of Learnings

- Publish ke Teams/M365 adalah Early Access Preview dan tenant-dependent.
- Organization scope membutuhkan admin approval.
- Published agents punya limitation, termasuk streaming dan citations.