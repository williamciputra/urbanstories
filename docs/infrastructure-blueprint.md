# Urbanstories Infrastructure Blueprint

Version: 1.0 (Draft)
Status: Active

---

# 1. Purpose

Dokumen ini mendefinisikan arsitektur teknis Urbanstories sebagai acuan pengembangan, deployment, dan pemeliharaan sistem.

Seluruh keputusan arsitektur yang telah disepakati harus mengacu pada dokumen ini. Perubahan yang memengaruhi infrastruktur harus diperbarui pada blueprint ini sebelum diimplementasikan.

---

# 2. Project Vision

Urbanstories merupakan platform media digital modern yang mengutamakan performa, pengalaman membaca yang nyaman, optimasi SEO, serta kemudahan pengelolaan konten melalui pendekatan Headless CMS.

---

# 3. Design Principles

Urbanstories dibangun berdasarkan prinsip berikut.

* Mobile-first.
* SEO-first.
* Fast loading.
* Clean architecture.
* Maintainable code.
* Scalable infrastructure.
* Headless CMS.
* Documentation-driven development.

---

# 4. Technology Stack

| Layer            | Technology           | Status |
| ---------------- | -------------------- | ------ |
| Frontend         | Next.js 15           | Locked |
| Language         | TypeScript           | Locked |
| Styling          | Tailwind CSS         | Locked |
| UI               | React 19             | Locked |
| CMS              | WordPress (Headless) | Locked |
| API              | WordPress REST API   | Locked |
| Database         | MySQL                | Locked |
| Frontend Hosting | Vercel               | Locked |
| CMS Hosting      | Hostinger Business   | Locked |
| Domain Registrar | GoDaddy              | Locked |

---

# 5. Production Architecture

```text
Internet
        │
        ▼
urbanstories.id
        │
        ▼
GoDaddy DNS
        │
        ├──────────────► Vercel
        │                  │
        │                  ▼
        │             Next.js Frontend
        │                  │
        │                  ▼
        │          WordPress REST API
        │                  │
        ▼                  ▼
cms.urbanstories.id → Hostinger
                           │
                           ▼
                     WordPress CMS
                           │
                           ▼
                         MySQL
```

## Rationale

Frontend dipisahkan dari CMS agar masing-masing dapat berkembang secara independen.

Next.js bertanggung jawab terhadap tampilan, performa, SEO, dan pengalaman pengguna.

WordPress digunakan khusus sebagai Content Management System sehingga editor dapat bekerja menggunakan antarmuka yang sudah dikenal tanpa memengaruhi frontend.

---

# 6. Domain Architecture

| Domain                                            | Function                 |
| ------------------------------------------------- | ------------------------ |
| urbanstories.id                                   | Frontend Production      |
| [www.urbanstories.id](http://www.urbanstories.id) | Redirect ke domain utama |
| cms.urbanstories.id                               | WordPress CMS & REST API |

## Rationale

CMS ditempatkan pada subdomain terpisah agar area administrasi tidak bercampur dengan frontend publik.

---

# 7. Hosting Architecture

## Frontend

Provider:

* Vercel

Responsibilities:

* Hosting Next.js
* Edge Delivery
* Automatic Deployment
* Preview Deployment
* HTTPS

---

## Backend

Provider:

* Hostinger Business

Responsibilities:

* WordPress
* MySQL
* Media Library
* REST API

---

# 8. Development Workflow

```text
Developer
        │
        ▼
Local Development
        │
        ▼
Git Commit
        │
        ▼
GitHub
        │
        ▼
Vercel Deployment
        │
        ▼
Production
```

---

# 9. Editorial Workflow

```text
Editor

↓

Login WordPress

↓

Create Article

↓

Review

↓

Publish

↓

REST API

↓

Next.js

↓

Reader
```

---

# 10. URL Strategy

Homepage

```
/
```

Article

```
/articles/[slug]
```

Category

```
/category/[slug]
```

Author

```
/author/[slug]
```

Search

```
/search
```

Static Pages

```
/about
/contact
/privacy-policy
/disclaimer
```

---

# 11. Content Model

Setiap artikel wajib memiliki:

* Title
* Slug
* Excerpt
* Content
* Featured Image
* Category
* Tags
* Author
* Publish Date
* Last Updated
* Meta Title
* Meta Description
* Canonical URL

---

# 12. Editorial Standards

* Dateline ditulis manual pada paragraf pertama.
* Tidak menggunakan drop cap.
* Featured image menggunakan rasio 16:9.
* Slug mengikuti judul artikel dan dapat disesuaikan editor bila diperlukan.
* URL yang telah dipublikasikan diusahakan tidak berubah.

---

# 13. Git Workflow

Model pengembangan menggunakan Git Flow sederhana.

* main → Stable Production Branch.
* sprint-* → Development Branch.

Seluruh pengembangan dilakukan pada branch sprint dan baru digabungkan ke main setelah melalui pengujian.

---

# 14. Security Baseline

Status: Pending

Topik yang akan ditetapkan:

* Login Security
* SSL
* Firewall
* REST API Security
* User Roles
* Automatic Updates

---

# 15. Backup Strategy

Status: Pending

Topik yang akan ditetapkan:

* Backup Frequency
* Storage Location
* Restore Procedure
* Retention Policy

---

# 16. Monitoring

Status: Pending

Rencana integrasi:

* Google Search Console
* Google Analytics 4
* Uptime Monitoring
* Error Monitoring

---

# 17. Deployment Strategy

Production deployment dilakukan melalui GitHub ke Vercel.

CMS dikelola secara terpisah pada Hostinger.

Frontend hanya mengambil data melalui WordPress REST API.

---

# 18. Future Expansion

Blueprint ini dirancang agar mendukung pengembangan berikut tanpa perubahan arsitektur besar.

* Multi Author
* Newsletter
* Membership
* AI Search
* Mobile Application
* Multilingual
* Recommendation Engine

---

# 19. Change Log

| Version | Description                      |
| ------- | -------------------------------- |
| 1.0     | Initial Infrastructure Blueprint |
