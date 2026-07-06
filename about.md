---
title: "About"
layout: single
classes: wide
permalink: /about/
---

MS Foundry Tutorial ID adalah workshop-style tutorial berbahasa Indonesia untuk Microsoft Foundry. Situs ini fokus pada module yang bisa langsung dijalankan: peserta masuk dari module, lalu mengikuti lab di dalamnya secara berurutan.

## Untuk Siapa

- Trainer yang perlu menjalankan guided workshop Foundry 101.
- Engineer, architect, dan maker yang ingin memahami prompt agent berbasis dokumen internal.
- Admin yang perlu menyiapkan resource Azure sebelum workshop.

## Prinsip

- Module adalah entry point utama; lab selalu berada di dalam module.
- Tidak ada halaman workshop terpisah jika isinya hanya menduplikasi urutan module.
- Reference material hanya ditautkan dari lab yang membutuhkannya, bukan dijadikan navigasi utama.
- Screenshot dan asset visual harus benar-benar render; broken logo atau decorative image yang tidak ada dihapus.

## Admin Setup

Admin workshop bisa memakai Terraform di [`infra/terraform/foundry-101-public`](https://github.com/adindaputra/ms-foundry-tutorial-id/tree/HEAD/infra/terraform/foundry-101-public) untuk menyiapkan resource Foundry 101 public/keyless sebelum sesi dimulai.