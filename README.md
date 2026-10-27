# Week 6 – JavaScript DOM, Event Handling, dan Fetch API

Dua halaman web statis (HTML + CSS + JS native, tanpa library) yang terhubung lewat nav bar sticky.

## Halaman

### Etalase (`public/index.html`)
Katalog produk yang datanya diambil dengan Fetch API dari [dummyjson.com/products](https://dummyjson.com/products).

- Menampilkan nama, kategori, harga, dan gambar produk lewat DOM
- Status loading (spinner) dan penanganan error dengan tombol "Coba lagi"
- Cari produk berdasarkan nama (event `input`)
- Tombol "Pesan" membuka halaman form dengan nama produk terisi otomatis

### Pesan (`public/form.html`)
Form pesanan dengan validasi dan umpan balik dinamis.

| Field   | Aturan                              |
|---------|-------------------------------------|
| Nama    | wajib, minimal 3 karakter           |
| Email   | wajib, format email valid           |
| Produk  | wajib                               |
| Jumlah  | bilangan bulat 1-99                 |
| Catatan | opsional, maksimal 120 karakter     |

Event yang dipakai: `input`, `blur`, `submit`, `reset`, `click`. Hasil pesanan ditampilkan di halaman lewat manipulasi DOM.

## Struktur Folder

```
Week6-Kelas[X]-20240140111/
├── public/
│   ├── index.html      # halaman Etalase
│   ├── form.html       # halaman Pesan
│   ├── css/
│   │   ├── index.css   # style utama, dipakai kedua halaman
│   │   └── form.css    # style khusus form (dimuat setelah index.css)
│   └── js/
│       ├── index.js    # fetch, loading/error, cari produk
│       └── form.js     # validasi dan hasil form
└── README.md
```

## Cara Menjalankan
Buka `public/index.html` di browser. Halaman Etalase butuh koneksi internet untuk mengambil data produk.
