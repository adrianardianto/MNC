# 🍜 Mangkok & Cerita (MNC)

**Mangkok & Cerita** adalah sebuah platform web interaktif untuk usaha kuliner yang menargetkan "Anak Rantau" sebagai audiens utamanya. Website ini tidak hanya berfungsi sebagai katalog menu dan pemesanan online, tetapi juga sebagai wadah komunitas bagi pelanggan untuk saling berbagi cerita.

Website ini dibangun dengan pendekatan desain **Modern Premium** yang menggabungkan estetika hangat (_warm_) dengan elemen interaktif seperti _Glassmorphism_, animasi 3D subtil, dan tata letak yang responsif sepenuhnya.

---

## ✨ Fitur Utama

### 1. 🍽️ Katalog & Pemesanan (E-Commerce Lite)

- **Katalog Produk**: Menampilkan menu Makanan, Minuman, dan Snack dengan gambar, harga, dan kategori.
- **Keranjang Belanja (Local Storage)**: Sistem keranjang belanja yang persisten (tidak hilang saat di-refresh) menggunakan Local Storage browser.
- **Checkout via WhatsApp**: Pesanan dikonfirmasi melalui WhatsApp API dengan format pesan otomatis yang rinci (Daftar Menu, Subtotal, Total Harga).
- **Responsive Cart**: Tabel keranjang yang otomatis berubah menjadi tampilan kartu (cards) yang rapi saat diakses melalui ponsel.

### 2. 👥 Komunitas "Anak Rantau"

- **Forum Cerita**: Fitur bagi pengguna untuk menulis dan membagikan cerita/pengalaman mereka.
- **Interaksi**:
  - ❤️ **Like System**: Pengguna bisa menyukai cerita (Real-time update & animasi).
  - 💬 **Komentar**: Kolom komentar interaktif dengan opsi nama (atau Anonim).
  - ✏️ **CRUD Cerita**: Pengguna bisa Mengedit dan Menghapus cerita mereka sendiri.
- **Filter & Sorting**: Fitur untuk mengurutkan cerita berdasarkan "Terbaru" atau "Terlama".

### 3. 🎨 UI/UX Modern & Interaktif

- **Glassmorphism Design**: Efek kaca buram (blur) pada elemen formulir dan kartu untuk tampilan elegan.
- **3D Tilt Effects**: Efek miring 3D yang halus pada kartu produk saat di-hover.
- **Animasi Scroll**: Elemen muncul secara halus (_fade-in/slide-up_) saat pengguna menggulir halaman.
- **Responsive Design**: Tampilan yang optimal di Desktop, Tablet, dan Mobile (HP).

---

## 🛠️ Teknologi yang Digunakan

Project ini dibangun menggunakan **Vanilla Web Technologies** murni tanpa framework berat, memastikan performa yang cepat dan ringan.

- **HTML5**: Struktur semantik halaman web.
- **CSS3**:
  - Variables (`:root`) untuk konsistensi tema warna.
  - Flexbox & Grid Layout.
  - Media Queries untuk responsivitas.
  - CSS Animations & Transitions.
- **JavaScript (ES6+)**:
  - DOM Manipulation.
  - `localStorage` API untuk manajemen data (Keranjang & Postingan Komunitas).
  - `MutationObserver` (untuk elemen dinamis).

---

## 📂 Struktur File

```text
MNC/
│
├── index.html          # Halaman Utama (Beranda & Katalog)
├── checkout.html       # Halaman Keranjang & Pembayaran
├── komunitas.html      # Halaman Forum Komunitas
│
├── style.css           # File Stylesheet Utama (Semua halaman)
├── script.js           # Logika Utama (Cart, Products, Community, dll)
├── 3d_ui.js            # Script khusus efek visual 3D
│
└── README.md           # Dokumentasi Project
```

---

## 🚀 Cara Menjalankan

Karena website ini bersifat **Statis** (Client-Side only), Anda tidak memerlukan server backend khusus (seperti Node.js atau PHP) untuk menjalankannya.

1.  **Clone** atau **Download** repository ini.
2.  Buka folder project.
3.  Klik dua kali pada file `index.html` untuk membukanya di browser (Chrome, Edge, Firefox, dll).
4.  Selesai! Website siap digunakan.

---

## 📖 Panduan Penggunaan

### Cara Memesan Makanan

1.  Buka halaman **Beranda** (`index.html`).
2.  Gulir ke bagian **Menu Favorit**.
3.  Klik tombol **"Tambah ke Keranjang"** pada menu yang diinginkan.
4.  Klik ikon **Keranjang** di pojok kanan atas atau navigasi ke halaman Checkout.
5.  Di halaman Checkout, periksa pesanan Anda.
6.  Klik tombol **Konfirmasi Pembayaran (WA)**.
7.  Anda akan diarahkan ke WhatsApp dengan pesan pemesanan yang sudah terisi otomatis.

### Cara Berbagi Cerita

1.  Buka halaman **Komunitas** (`komunitas.html`).
2.  Isi nama, judul, dan cerita Anda pada formulir di bagian atas.
3.  Klik **Posting Cerita**.
4.  Cerita Anda akan muncul di Feed di bawahnya.
5.  Gunakan tombol **Filter** untuk melihat cerita dari yang terbaru atau terlama.

---

## 📝 Catatan Pengembang

- Data keranjang dan postingan komunitas disimpan di **Browser Local Storage**. Jika Anda menghapus cache browser, data tersebut akan hilang.
- Pastikan koneksi internet aktif untuk memuat gambar produk dan font (Google Fonts).

---
