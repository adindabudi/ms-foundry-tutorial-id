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

Lab ini menjadi quality gate sebelum pilot: jalankan prompt validasi, catat hasil, inspect trace jika tersedia, dan pilih active version.

## Lab Details

| Level | Persona | Duration | Outcome |
| --- | --- | --- | --- |
| L150 | Business user / maker | 30-40 minutes | Agent punya validation log dan active version yang siap untuk pilot. |

## Why This Matters

Agent yang terlihat benar di satu prompt belum tentu siap dipakai user. Validation dan observability dasar membantu menemukan retrieval error sebelum pilot.

## Prerequisites

- Prompt agent dari Lab 101B atau prebuilt agent trainer.
- Validation prompt set.
- Application Insights connected jika trace inspection tersedia.

## Summary of Targets

- Jalankan validation prompts.
- Catat pass/fail dan source/citation.
- Inspect trace/run detail bila tersedia.
- Pin active version.

## Instructions by Use Case

Konten langkah visual dan screenshot akan diisi dalam plan konten Foundry 101. Foundation page ini memastikan routing, layout, dan metadata lab sudah bekerja.

## Summary of Learnings

- Validation log memberi artifact yang bisa dibahas dengan stakeholder.
- Trace prompt agents bergantung Application Insights dan RBAC.
- Pin active version membantu menjaga stabilitas pilot.