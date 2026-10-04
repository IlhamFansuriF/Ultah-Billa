# 📸 Petunjuk Pengisian Foto & Lagu Ulang Tahun Sabilah Okta Ramadhani 💖

Website ulang tahun ini dirancang agar sangat mudah disesuaikan dengan foto-foto kenangan asli pacar kamu (**Sabilah Okta Ramadhani**) dan lagu kesukaannya.

---

## 1. 🖼️ Cara Mengganti Foto

1. Masukkan foto-foto pacar kamu ke dalam folder `assets/photos/`.
2. Beri nama file foto tersebut agar rapi, misalnya:
   - `foto1.jpg`
   - `foto2.jpg`
   - `foto3.jpg`
   - `foto4.jpg`
   - `foto5.jpg`
   - `foto6.jpg`
3. Buka file `index.html` dan cari bagian **`<div class="polaroid-grid">`**.
4. Ganti tautan gambar `src="..."` pada tag `<img>` dengan lokasi foto kamu, contoh:
   ```html
   <img src="assets/photos/foto1.jpg" alt="Foto Sabilah 1" class="gallery-img" />
   ```
5. Kamu juga bisa mengubah teks caption di bawah masing-masing foto pada tag `<p>` sesuai momen kenangan kalian!

---

## 2. 🎵 Cara Mengganti Lagu Latar

1. Siapkan file lagu MP3 favorit pacar kamu (misalnya lagu romantis atau lagu kesukaan kalian berdua).
2. Simpan file MP3 tersebut ke dalam folder: `assets/audio/`
3. Beri nama file: `romantic_song.mp3`
4. Jika nama filenya berbeda (misal: `lagu_favorit_bila.mp3`), buka file `index.html`, cari baris audio:
   ```html
   <audio id="bg-music" loop preload="auto">
     <source src="assets/audio/lagu_favorit_bila.mp3" type="audio/mpeg">
   </audio>
   ```
5. Simpan file `index.html`.

---

## 3. 💌 Cara Mengubah Pesan / Surat Romantis

Jika ingin mengubah kalimat pada surat ucapan romantis:
- Buka file `index.html`
- Cari bagian **`<section class="letter-section container">`**
- Edit teks paragraf di dalamnya sesuai dengan perasaan dan pesan pribadi yang ingin kamu sampaikan.

---

Selamat mencoba dan semoga ucapan ulang tahun ini membawa kebahagiaan & kesan indah untuk Sabilah! 🎉✨
