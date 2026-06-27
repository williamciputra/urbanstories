# Architecture Decision Records (ADR)

Version: 1.0

---

# Purpose

Dokumen ini mencatat seluruh keputusan arsitektur yang diambil selama pengembangan Urbanstories.

Setiap ADR berisi keputusan yang telah disepakati beserta alasan teknisnya. Dokumen ini menjadi referensi utama apabila di masa depan diperlukan evaluasi atau perubahan terhadap arsitektur sistem.

---

# ADR-001

## Title

Frontend Framework

### Status

Accepted

### Decision

Frontend menggunakan Next.js.

### Rationale

Next.js menyediakan performa tinggi, dukungan SEO yang baik, App Router modern, serta deployment yang terintegrasi dengan Vercel.

---

# ADR-002

## Title

Programming Language

### Status

Accepted

### Decision

Seluruh pengembangan menggunakan TypeScript.

### Rationale

TypeScript meningkatkan keamanan kode melalui static typing, memudahkan refactoring, serta mengurangi potensi bug pada aplikasi yang terus berkembang.

---

# ADR-003

## Title

Styling Framework

### Status

Accepted

### Decision

Menggunakan Tailwind CSS.

### Rationale

Tailwind mempercepat pengembangan antarmuka, menjaga konsistensi desain, dan mengurangi kebutuhan membuat stylesheet terpisah.

---

# ADR-004

## Title

Content Management System

### Status

Accepted

### Decision

Menggunakan Headless WordPress.

### Rationale

WordPress tetap menjadi CMS yang matang dan mudah digunakan editor, sementara frontend memperoleh fleksibilitas penuh melalui pendekatan headless.

---

# ADR-005

## Title

Content API

### Status

Accepted

### Decision

Menggunakan WordPress REST API.

### Rationale

REST API telah menjadi fitur bawaan WordPress, stabil, terdokumentasi dengan baik, dan mencukupi kebutuhan Urbanstories tanpa kompleksitas tambahan.

---

# ADR-006

## Title

Frontend Hosting

### Status

Accepted

### Decision

Frontend di-host pada Vercel.

### Rationale

Vercel merupakan platform yang dioptimalkan untuk Next.js, mendukung deployment otomatis, preview deployment, rollback, dan performa global.

---

# ADR-007

## Title

CMS Hosting

### Status

Accepted

### Decision

WordPress di-host pada Hostinger Business.

### Rationale

Paket Business menyediakan sumber daya yang cukup untuk kebutuhan awal Urbanstories serta mendukung WordPress dengan baik.

---

# ADR-008

## Title

Domain Registrar

### Status

Accepted

### Decision

Domain didaftarkan melalui GoDaddy.

### Rationale

GoDaddy digunakan sebagai registrar domain, sementara hosting dan deployment dipisahkan agar masing-masing layanan dapat dipilih berdasarkan keunggulannya.

---

# ADR-009

## Title

Production Architecture

### Status

Accepted

### Decision

Menggunakan arsitektur Headless CMS.

### Rationale

Frontend dan backend dipisahkan sehingga masing-masing dapat berkembang secara independen. Pendekatan ini meningkatkan fleksibilitas, performa, dan skalabilitas.

---

# ADR-010

## Title

Editorial Workflow

### Status

Accepted

### Decision

Seluruh proses penulisan dilakukan melalui WordPress.

### Rationale

Editor cukup bekerja pada satu antarmuka tanpa perlu memahami struktur frontend.

---

# ADR-011

## Title

Article URL Structure

### Status

Accepted

### Decision

Menggunakan format:

/articles/[slug]

### Rationale

Struktur URL sederhana, mudah dipahami pengguna, dan ramah SEO.

---

# ADR-012

## Title

Dateline

### Status

Accepted

### Decision

Dateline ditulis secara manual oleh editor pada paragraf pertama artikel.

### Rationale

Memberikan fleksibilitas editorial karena lokasi penulisan tidak selalu sama dengan lokasi kejadian.

---

# ADR-013

## Title

Article Typography

### Status

Accepted

### Decision

Tidak menggunakan drop cap pada paragraf pertama.

### Rationale

Gaya pembuka artikel Urbanstories menggunakan format dateline sehingga drop cap tidak lagi relevan dan justru mengurangi keterbacaan.

---

# ADR-014

## Title

Branch Strategy

### Status

Accepted

### Decision

Pengembangan menggunakan branch berdasarkan sprint.

### Rationale

Memisahkan pekerjaan setiap sprint, memudahkan review, dan menjaga branch main tetap stabil.

---

# ADR-015

## Title

Documentation Strategy

### Status

Accepted

### Decision

Seluruh dokumentasi proyek disimpan di dalam repository pada folder docs.

### Rationale

Dokumentasi berkembang bersama kode sumber sehingga selalu berada pada versi yang sama dengan implementasi.

---

# Future ADR

Keputusan berikut akan ditambahkan setelah ditetapkan.

* Plugin Policy
* Backup Strategy
* DNS Strategy
* Cache Strategy
* Security Policy
* CDN Strategy
* Image Optimization Strategy
* Environment Configuration
