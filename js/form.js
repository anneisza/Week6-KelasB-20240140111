// ===== Form: DOM & Event Handling =====
const form = document.getElementById("form-pesanan");
const hasilEl = document.getElementById("hasil");
const catatanEl = document.getElementById("catatan");
const hitungEl = document.getElementById("hitung");

// Aturan validasi per field: mengembalikan pesan error, atau "" jika valid
const aturan = {
  nama: (v) => (v.trim().length < 3 ? "Nama minimal 3 karakter." : ""),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Format email belum benar, contoh: nama@email.com."),
  produk: (v) => (v.trim() === "" ? "Pilih atau isi nama produk." : ""),
  jumlah: (v) => {
    const n = Number(v);
    return Number.isInteger(n) && n >= 1 && n <= 99 ? "" : "Jumlah harus bilangan bulat 1–99.";
  },
};

function validasiField(input) {
  const cek = aturan[input.name];
  if (!cek) return true;
  const pesan = cek(input.value);
  document.getElementById(`err-${input.name}`).textContent = pesan;
  input.classList.toggle("invalid", pesan !== "");
  input.classList.toggle("valid", pesan === "");
  return pesan === "";
}

// Event "input": validasi langsung saat mengetik
form.querySelectorAll("input").forEach((el) => {
  el.addEventListener("input", () => validasiField(el));
  el.addEventListener("blur", () => validasiField(el));
});

// Event "input" pada textarea: penghitung karakter dinamis
catatanEl.addEventListener("input", () => {
  hitungEl.textContent = `${catatanEl.value.length} / ${catatanEl.maxLength} karakter`;
});

// Event "submit": validasi semua, lalu tampilkan hasil
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const semuaValid = Object.keys(aturan)
    .map((nama) => validasiField(form.elements[nama]))
    .every(Boolean);

  if (!semuaValid) {
    hasilEl.hidden = true;
    form.querySelector(".invalid")?.focus();
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  tampilkanHasil(data);
});

// Event "click" pada reset: bersihkan tampilan dinamis juga
form.addEventListener("reset", () => {
  hasilEl.hidden = true;
  hitungEl.textContent = `0 / ${catatanEl.maxLength} karakter`;
  form.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
  form.querySelectorAll("input").forEach((el) => el.classList.remove("valid", "invalid"));
});

function tampilkanHasil(d) {
  hasilEl.innerHTML = "";

  const judul = document.createElement("h3");
  judul.textContent = `Terima kasih, ${d.nama.trim()}!`;

  const dl = document.createElement("dl");
  const baris = [
    ["Email", d.email.trim()],
    ["Produk", d.produk.trim()],
    ["Jumlah", d.jumlah],
    ["Catatan", d.catatan.trim() || "-"],
  ];
  baris.forEach(([k, v]) => {
    const dt = document.createElement("dt");
    dt.textContent = k;
    const dd = document.createElement("dd");
    dd.textContent = v; // textContent → aman dari injeksi HTML
    dl.append(dt, dd);
  });

  hasilEl.append(judul, dl);
  hasilEl.hidden = false;
  hasilEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Isi otomatis field produk jika datang dari halaman Etalase (?produk=...)
const produkAwal = new URLSearchParams(window.location.search).get("produk");
if (produkAwal) {
  const produkEl = document.getElementById("produk-dipilih");
  produkEl.value = produkAwal;
  validasiField(produkEl);
}