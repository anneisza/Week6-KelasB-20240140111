// ===== Fetch API: data produk dari DummyJSON =====
const API_URL = "https://dummyjson.com/products";

const daftarEl = document.getElementById("daftar-produk");
const statusEl = document.getElementById("status");
const cariEl = document.getElementById("cari");

let semuaProduk = [];

const rupiahUSD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function tampilkanLoading() {
  statusEl.className = "";
  statusEl.innerHTML = '<span class="spinner"></span>Memuat data produk…';
  daftarEl.innerHTML = "";
}

function tampilkanError(pesan) {
  statusEl.className = "error";
  statusEl.textContent = "";
  const teks = document.createTextNode(`Gagal memuat produk: ${pesan} `);
  const tombol = document.createElement("button");
  tombol.type = "button";
  tombol.textContent = "Coba lagi";
  tombol.addEventListener("click", ambilProduk);
  statusEl.append(teks, tombol);
}

function renderProduk(list) {
  daftarEl.innerHTML = "";

  if (list.length === 0) {
    statusEl.className = "";
    statusEl.textContent = "Tidak ada produk yang cocok dengan pencarian.";
    return;
  }
  statusEl.className = "";
  statusEl.textContent = `Menampilkan ${list.length} dari ${semuaProduk.length} produk.`;

  const fragment = document.createDocumentFragment();
  list.forEach((p) => {
    const li = document.createElement("li");
    li.className = "produk";

    const img = document.createElement("img");
    img.src = p.thumbnail;
    img.alt = p.title;
    img.loading = "lazy";

    const nama = document.createElement("h3");
    nama.textContent = p.title;

    const kategori = document.createElement("p");
    kategori.className = "kategori";
    kategori.textContent = p.category;

    const harga = document.createElement("p");
    harga.className = "harga";
    harga.textContent = rupiahUSD.format(p.price);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Pesan";
    btn.addEventListener("click", () => pilihProduk(p.title));

    li.append(img, nama, kategori, harga, btn);
    fragment.appendChild(li);
  });
  daftarEl.appendChild(fragment);
}

// Pindah ke halaman form sambil membawa nama produk lewat query string
function pilihProduk(judul) {
  window.location.href = `form.html?produk=${encodeURIComponent(judul)}`;
}

async function ambilProduk() {
  tampilkanLoading();
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    semuaProduk = data.products;
    renderProduk(semuaProduk);
  } catch (err) {
    console.error(err);
    tampilkanError(err.message);
  }
}

// Event "input": filter produk saat mengetik
cariEl.addEventListener("input", () => {
  const kata = cariEl.value.trim().toLowerCase();
  renderProduk(semuaProduk.filter((p) => p.title.toLowerCase().includes(kata)));
});

document.addEventListener("DOMContentLoaded", ambilProduk);