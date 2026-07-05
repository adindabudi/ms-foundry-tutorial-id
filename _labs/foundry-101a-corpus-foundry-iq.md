---
title: "101A: Siapkan Corpus dan Foundry IQ Knowledge Base"
description: "Upload corpus Contoso Indonesia dan siapkan knowledge base Foundry IQ dari portal."
excerpt: "Upload corpus Contoso Indonesia dan siapkan knowledge base Foundry IQ dari portal."
difficulty: 100
duration: 45
persona: "Business user, maker, cloud practitioner"
journey: "foundry-101"
module: "foundry-101"
section: "core_learning_path"
order: 101
optional: false
---

# 101A: Siapkan Corpus dan Foundry IQ Knowledge Base

Lab ini menyiapkan corpus fiktif Contoso Indonesia dan knowledge base Foundry IQ yang akan dipakai oleh prompt agent di lab berikutnya.

## Lab Details

| Level | Persona | Duration | Outcome |
| --- | --- | --- | --- |
| L100 | Business user / maker | 30-45 minutes | Corpus siap di Blob Storage dan knowledge base siap diuji di Foundry portal. |

## Why This Matters

Chatbot internal hanya berguna jika jawabannya grounded pada dokumen yang benar. Lab ini memperlihatkan fondasi retrieval sebelum agent dipublish ke user.

## Prerequisites

- Akses Microsoft Foundry portal.
- Foundry project yang sudah tersedia.
- Azure AI Search service yang sudah tersedia.
- Blob Storage container atau izin untuk membuat container.
- Corpus Contoso Indonesia dari repository ini.

## Summary of Targets

- Upload corpus ke Blob Storage.
- Buat atau sambungkan Foundry IQ knowledge base.
- Cek indexing status.
- Catat known limitations dan feature status.

## Instructions by Use Case

Konten langkah visual dan screenshot akan diisi dalam plan konten Foundry 101. Foundation page ini memastikan routing, layout, dan metadata lab sudah bekerja.

## Summary of Learnings

- Corpus realistis harus diuji sebelum agent dibuat.
- Foundry IQ via portal harus diberi status Preview/Partial GA untuk agentic retrieval surface.
- Core lab portal-first bergantung pada resource Azure yang sudah tersedia.