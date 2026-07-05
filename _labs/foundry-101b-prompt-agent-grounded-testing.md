---
title: "101B: Buat Prompt Agent dan Uji Grounded Answer"
description: "Buat prompt agent dari portal, attach knowledge base, dan uji jawaban grounded di playground."
excerpt: "Buat prompt agent dari portal, attach knowledge base, dan uji jawaban grounded di playground."
difficulty: 100
duration: 45
persona: "Business user, maker, cloud practitioner"
journey: "foundry-101"
module: "foundry-101"
section: "core_learning_path"
order: 102
optional: false
---

# 101B: Buat Prompt Agent dan Uji Grounded Answer

Lab ini membuat prompt agent portal-first dan menghubungkannya ke knowledge base hasil Lab 101A.

## Lab Details

| Level | Persona | Duration | Outcome |
| --- | --- | --- | --- |
| L100 | Business user / maker | 35-45 minutes | Prompt agent menjawab pertanyaan dari corpus dan menampilkan citation di playground. |

## Why This Matters

Prompt agent memberi jalur tercepat untuk chatbot internal sederhana tanpa menulis runtime code atau mengelola container.

## Prerequisites

- Akses Microsoft Foundry portal.
- Model deployment yang bisa dipilih di agent builder.
- Knowledge base Foundry IQ dari Lab 101A atau resource prebuilt dari trainer.

## Summary of Targets

- Buat prompt agent.
- Isi instructions Bahasa Indonesia.
- Attach knowledge base.
- Test grounded answer dan citation di playground.

## Instructions by Use Case

Konten langkah visual dan screenshot akan diisi dalam plan konten Foundry 101. Foundation page ini memastikan routing, layout, dan metadata lab sudah bekerja.

## Summary of Learnings

- Prompt agent cocok untuk skenario portal-first tanpa custom orchestration.
- Instructions harus membatasi jawaban ke corpus dan mengatur refusal.
- Playground adalah tempat utama untuk validasi source/citation sebelum publish.