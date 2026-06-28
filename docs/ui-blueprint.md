# Urbanstories UI Blueprint

**Version:** 1.0

**Status:** LOCKED

**Last Updated:** 29 June 2026

---

# Purpose

Dokumen ini menjadi acuan utama dalam pengembangan antarmuka (UI) Urbanstories.

Setiap keputusan desain, struktur halaman, dan pengalaman pengguna (UX) harus mengacu pada blueprint ini sebelum diimplementasikan ke dalam kode.

Perubahan terhadap UI hanya dilakukan setelah blueprint diperbarui dan disetujui.

---

# Design Principles

Urbanstories dibangun dengan prinsip:

- Editorial-first
- Reader-first
- Mobile-first
- Fast loading
- SEO-friendly
- Minimalist
- Premium
- Scannable

Inspirasi visual:

- Monocle
- Financial Times Weekend
- Kinfolk
- The Verge

---

# UI Philosophy

Urbanstories bukan blog pribadi dan bukan portal berita yang dipenuhi elemen visual berlebihan.

Desain harus mengutamakan kenyamanan membaca, kecepatan menemukan informasi, serta menjaga fokus pembaca terhadap artikel.

Setiap elemen pada halaman harus memiliki tujuan yang jelas dan tidak boleh ditambahkan hanya sebagai dekorasi.
---

# Homepage Blueprint

Homepage merupakan halaman terpenting Urbanstories.

Fungsinya bukan hanya menampilkan artikel terbaru, tetapi juga menjadi wajah editorial Urbanstories serta pintu masuk utama bagi pembaca untuk menemukan konten.

Urutan section homepage telah dikunci (LOCKED) dan tidak boleh diubah tanpa pembaruan blueprint.

---

## Homepage Structure

```
HEADER

↓

HERO

↓

TOP STORY

↓

LATEST HEADLINES

↓

LIFESTYLE

↓

EXPLORE

↓

LATEST ARTICLES

↓

NEWSLETTER

↓

FOOTER
```

---

## Header

Header bersifat sticky ketika pengguna melakukan scroll.

Komponen:

- Logo Urbanstories
- Navigation Menu
- Search

Navigation:

- News
- Lifestyle
- Entertainment
- Technology
- Sports
- Explore
- Index

Rules:

- Logo selalu mengarah ke Homepage.
- Search menggunakan ikon (bukan tombol bertuliskan Search).
- Header harus tetap sederhana dan mudah dipindai.

---

## Hero

Hero bukan area berita.

Hero berfungsi sebagai identitas Urbanstories.

Berisi:

- Logo Urbanstories
- Tagline
- Deskripsi singkat mengenai Urbanstories

Hero bersifat statis dan tidak berubah ketika ada artikel baru diterbitkan.

---

## Top Story

Jumlah artikel:

1

Top Story merupakan artikel terpenting yang dipilih langsung oleh editor.

Top Story **tidak mengikuti artikel terbaru secara otomatis**.

Komponen:

- Hero Image
- Category
- Subcategory
- Headline
- Excerpt
- Author
- Publication Date
- Read Time

Rules:

- Hanya boleh terdapat satu Top Story.
- Tidak boleh muncul kembali di section Latest Headlines.
- Dapat berubah kapan saja berdasarkan keputusan editor.

---

## Latest Headlines

Jumlah artikel:

4

Latest Headlines menampilkan empat artikel terbaru yang bukan merupakan Top Story.

Layout desktop menggunakan grid dua kolom.

Rules:

- Tidak boleh menampilkan Top Story.
- Ketika terdapat Top Story baru, artikel yang sebelumnya menjadi Top Story kembali mengikuti alur artikel normal.
- Apabila terdapat artikel baru, artikel paling lama pada section ini otomatis keluar dari Latest Headlines.

---

## Lifestyle

Jumlah artikel:

3

Komposisi:

- 1 Featured Article
- 2 Secondary Articles

Rules:

- Tidak boleh menampilkan artikel yang sudah muncul di Top Story.
- Tidak boleh menampilkan artikel yang sudah muncul di Latest Headlines.

Header section:

Lifestyle                                             View All →

Tombol View All mengarah ke halaman kategori Lifestyle.

---

## Explore

Jumlah artikel:

3

Komposisi:

- 1 Featured Article
- 2 Secondary Articles

Rules:

- Tidak boleh menampilkan artikel yang sudah muncul di Top Story.
- Tidak boleh menampilkan artikel yang sudah muncul di Latest Headlines.

Header section:

Explore                                                View All →

Tombol View All mengarah ke halaman kategori Explore.
---

## Latest Articles

Latest Articles merupakan daftar kronologis seluruh artikel yang telah dipublikasikan.

Section ini menjadi pusat konten Urbanstories dan memastikan seluruh artikel tetap dapat ditemukan oleh pembaca meskipun tidak tampil pada section utama Homepage.

Jumlah artikel:

- 10–15 artikel per halaman.

Komponen setiap artikel:

- Thumbnail
- Category
- Subcategory
- Headline
- Excerpt
- Author
- Publication Date
- Read Time

Rules:

- Seluruh artikel terbaru ditampilkan berdasarkan waktu publikasi.
- Artikel boleh muncul kembali meskipun sebelumnya sudah tampil pada Top Story, Latest Headlines, Lifestyle, atau Explore.
- Menggunakan Pagination, bukan Infinite Scroll.

Contoh Pagination:

Previous

1

2

3

4

Next

---

## Newsletter

Newsletter ditempatkan setelah Latest Articles.

Tujuan:

- Mengajak pembaca berlangganan pembaruan Urbanstories.
- Menjadi salah satu kanal distribusi konten.

Komponen:

- Headline
- Deskripsi singkat
- Email Input
- Subscribe Button

Newsletter harus memiliki desain sederhana dan tidak mengganggu pengalaman membaca.

---

## Footer

Footer menjadi navigasi terakhir pada Homepage.

Komponen:

- Logo Urbanstories
- Navigation
- Contact
- Privacy Policy
- Terms of Use
- Copyright
- Social Media

Footer menggunakan desain minimalis dengan fokus pada kemudahan navigasi.

---

# Homepage Editorial Rules

## Hero

Bersifat statis.

Tidak digunakan untuk menampilkan artikel.

---

## Top Story

- Dipilih manual oleh editor.
- Maksimal satu artikel.
- Menjadi berita utama hari tersebut.

---

## Latest Headlines

- Empat artikel terbaru.
- Tidak boleh menampilkan Top Story.

---

## Lifestyle

- Tiga artikel pilihan kategori Lifestyle.
- Tidak boleh menduplikasi artikel pada Top Story maupun Latest Headlines.

---

## Explore

- Tiga artikel pilihan kategori Explore.
- Tidak boleh menduplikasi artikel pada Top Story maupun Latest Headlines.

---

## Latest Articles

- Menampilkan seluruh artikel terbaru.
- Menggunakan Pagination.
- Menjadi daftar artikel kronologis Urbanstories.
---

# Article Page Blueprint

Halaman artikel merupakan inti pengalaman membaca di Urbanstories.

Desain harus mengutamakan kenyamanan membaca, meminimalkan distraksi, serta memudahkan pembaca untuk menjelajahi kategori dan artikel terkait.

Urutan komponen pada halaman artikel telah dikunci (LOCKED).

---

## Article Structure

```
HEADER

↓

LOGO

↓

BREADCRUMB

↓

CATEGORY

↓

SUBCATEGORY

↓

HEADLINE

↓

AUTHOR • PUBLICATION DATE • READ TIME

↓

HERO IMAGE

↓

ARTICLE CONTENT

↓

SHARE

↓

RELATED ARTICLES

↓

NEWSLETTER

↓

FOOTER
```

---

## Header

Menggunakan Header yang sama dengan Homepage.

Komponen:

- Logo Urbanstories
- Navigation
- Search

Header bersifat sticky.

---

## Logo

Logo Urbanstories tetap ditampilkan pada halaman artikel.

Rules:

- Selalu mengarah ke Homepage.
- Menjadi identitas utama Urbanstories.

---

## Breadcrumb

Breadcrumb membantu pembaca memahami posisi artikel dalam struktur website.

Format:

Home

>

Category

>

Subcategory

>

Headline

Contoh:

Home

>

Technology

>

AI

>

Apple Perkenalkan...

Rules:

- Seluruh elemen dapat diklik kecuali Headline.
- Breadcrumb selalu berada di atas Category.

---

## Category

Category ditampilkan di atas Headline.

Rules:

- Dapat diklik.
- Mengarah ke halaman kategori.
- Menggunakan style editorial sederhana.

---

## Subcategory

Subcategory berada tepat di bawah Category.

Rules:

- Dapat diklik.
- Mengarah ke halaman subkategori.
- Menggunakan ukuran lebih kecil dibanding Category.

---

## Headline

Headline merupakan elemen visual terpenting pada halaman artikel.

Rules:

- Menggunakan ukuran terbesar pada halaman.
- Tidak menggunakan efek visual yang mengganggu.
- Maksimal tiga baris pada desktop.

---

## Article Meta

Komponen:

- Author
- Publication Date
- Read Time

Ditampilkan dalam satu baris.

Contoh:

By William Ciputra • 29 June 2026 • 5 min read

---

## Hero Image

Hero Image menggunakan rasio konsisten.

Rules:

- Full width mengikuti container artikel.
- Selalu berada setelah metadata.
- Tidak menampilkan caption kecuali diperlukan secara editorial.

---

## Article Content

Komponen utama halaman.

Rules:

- Fokus pada kenyamanan membaca.
- Tidak menggunakan drop cap.
- Tidak mengubah kapitalisasi huruf pertama secara otomatis.
- Paragraph spacing konsisten.
- Maksimal lebar konten mengikuti readability.

Seluruh penulisan mengikuti Editorial Guidelines Urbanstories.

---

## Share

Ditempatkan setelah isi artikel.

Berfungsi memudahkan pembaca membagikan artikel ke media sosial.

---

## Related Articles

Menampilkan artikel yang memiliki Category yang sama.

Jumlah:

3 artikel.

Rules:

- Tidak boleh menampilkan artikel yang sedang dibaca.
- Diurutkan berdasarkan relevansi terlebih dahulu, kemudian tanggal publikasi.

---

## Newsletter

Newsletter ditempatkan setelah Related Articles.

---

## Footer

Menggunakan Footer yang sama dengan Homepage.
---

# Category Page Blueprint

Setiap Category memiliki halaman khusus yang menampilkan seluruh artikel dalam kategori tersebut.

Contoh:

/news

/lifestyle

/entertainment

/technology

/sports

/explore

---

## Category Structure

```
HEADER

↓

CATEGORY TITLE

↓

CATEGORY DESCRIPTION

↓

FEATURED ARTICLE

↓

LATEST ARTICLES

↓

PAGINATION

↓

NEWSLETTER

↓

FOOTER
```

---

## Featured Article

Jumlah:

1 artikel.

Rules:

- Menjadi artikel unggulan pada kategori tersebut.
- Tidak harus merupakan artikel terbaru.
- Dipilih oleh editor.

---

## Latest Category Articles

Jumlah:

10–15 artikel per halaman.

Rules:

- Berdasarkan tanggal publikasi.
- Menggunakan Pagination.

---

# Subcategory Page Blueprint

Setiap Subcategory memiliki halaman sendiri.

Contoh:

/technology/ai

/news/nasional

/explore/relationship

---

## Subcategory Structure

```
HEADER

↓

CATEGORY

↓

SUBCATEGORY

↓

LATEST ARTICLES

↓

PAGINATION

↓

NEWSLETTER

↓

FOOTER
```

Rules:

- Menampilkan seluruh artikel pada subkategori tersebut.
- Menggunakan Pagination.

---

# Search Page Blueprint

Search menjadi salah satu navigasi utama Urbanstories.

Contoh URL:

/search?q=ai

---

## Search Structure

```
HEADER

↓

SEARCH INPUT

↓

SEARCH RESULT

↓

PAGINATION

↓

FOOTER
```

Komponen setiap hasil pencarian:

- Thumbnail
- Category
- Subcategory
- Headline
- Excerpt
- Publication Date

Rules:

- Menampilkan jumlah hasil pencarian.
- Diurutkan berdasarkan relevansi terlebih dahulu.
- Jika relevansi sama, gunakan tanggal publikasi terbaru.

---

# Index Blueprint

Index merupakan halaman arsip editorial Urbanstories.

Index **bukan kategori**, melainkan daftar seluruh artikel yang pernah dipublikasikan.

Konsep mengacu pada halaman indeks RMOL.

---

## Index Structure

```
HEADER

↓

DATE SELECTOR

↓

ARTICLE LIST

↓

PAGINATION

↓

FOOTER
```

---

## Index Rules

- Seluruh artikel otomatis masuk ke Index setelah dipublikasikan.
- Artikel dikelompokkan berdasarkan tanggal publikasi.
- Dalam setiap tanggal, artikel diurutkan berdasarkan waktu publikasi terbaru.
- Mendukung Pagination apabila jumlah artikel melebihi satu halaman.

Contoh:

29 June 2026

09:00

Headline

08:45

Headline

08:20

Headline

────────────────────

28 June 2026

...

Index menjadi arsip resmi seluruh artikel Urbanstories.

---

# Responsive Rules

Urbanstories menggunakan pendekatan Mobile First.

---

## Desktop

Menggunakan seluruh layout sesuai blueprint.

---

## Tablet

Grid berubah menjadi dua kolom apabila diperlukan.

Navigation tetap menggunakan Header Desktop.

---

## Mobile

Navigation berubah menjadi Drawer Menu.

Seluruh section berubah menjadi satu kolom.

Urutan section tidak berubah.

Top Story

↓

Latest Headlines

↓

Lifestyle

↓

Explore

↓

Latest Articles

Pagination tetap ditampilkan pada bagian bawah halaman.

Seluruh halaman harus mempertahankan kenyamanan membaca tanpa horizontal scrolling.
---

# Editorial Taxonomy

Struktur kategori Urbanstories telah dikunci (LOCKED) sebagai berikut.

## News

Subcategory:

- Nasional
- Internasional
- Ekonomi

---

## Lifestyle

Subcategory:

- Kesehatan
- Travel
- Fashion
- Kuliner

---

## Entertainment

Subcategory:

- Film
- Musik
- Hot Issue
- Pop Art

---

## Technology

Subcategory:

- Gadgets
- Apps
- AI

---

## Sports

Tidak memiliki subkategori.

---

## Explore

Subcategory:

- Horoscope
- Intimacy
- Relationship
- Horror

---

# Editorial Rules

Seluruh artikel Urbanstories wajib mengikuti aturan berikut.

- Satu artikel hanya memiliki satu Category.
- Satu artikel hanya memiliki satu Subcategory.
- Tidak diperbolehkan menggunakan lebih dari satu Category.
- Tidak diperbolehkan melakukan cross-category.
- Seluruh struktur URL mengikuti Category dan Subcategory.

Contoh:

/technology/ai/judul-artikel

/news/nasional/judul-artikel

/explore/relationship/judul-artikel

---

# Navigation Rules

Navigation utama Urbanstories terdiri dari:

- News
- Lifestyle
- Entertainment
- Technology
- Sports
- Explore
- Index

Rules:

- Seluruh Category dapat diklik.
- Logo selalu mengarah ke Homepage.
- Search selalu tersedia pada Header.
- Index menjadi menu terpisah dan bukan Category.

---

# UI Consistency Rules

Untuk menjaga konsistensi desain, seluruh halaman Urbanstories mengikuti aturan berikut.

- Menggunakan spacing yang konsisten.
- Menggunakan typography yang konsisten.
- Tidak menggunakan efek visual berlebihan.
- Mengutamakan kenyamanan membaca.
- Mengutamakan performa dan kecepatan loading.
- Mobile selalu menjadi prioritas.

---

# Development Workflow

Seluruh pengembangan UI mengikuti alur berikut.

Planning

↓

Blueprint Approval

↓

Implementation

↓

Desktop QA

↓

Tablet QA

↓

Mobile QA

↓

Commit

↓

Merge to Main

↓

Production QA

Tidak diperbolehkan mengubah desain ketika implementasi sedang berlangsung.

Seluruh perubahan desain harus dilakukan pada Blueprint terlebih dahulu.

---

# Versioning

Blueprint menggunakan sistem versioning.

Contoh:

Version 1.0

Initial Production UI Blueprint

Version 1.1

Minor UI Improvement

Version 2.0

Major Homepage Redesign

Seluruh perubahan harus disertai pembaruan versi dokumen.

---

# Status

Current Version

1.0

Status

LOCKED

Blueprint ini menjadi acuan resmi seluruh pengembangan antarmuka Urbanstories sampai terdapat revisi pada versi berikutnya.