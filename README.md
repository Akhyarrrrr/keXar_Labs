# keXar Labs

Website studio jasa web untuk firma hukum, tersedia dalam English dan Indonesia. Astro menghasilkan HTML statis; React islands menangani galeri, form kontak, globe, dan portal 3D. Animasi fotografi hero memakai script native. Cloudflare Worker melayani aset dan `POST /api/contact`.

## Menjalankan proyek

Gunakan Node.js 22.12 atau lebih baru.

```powershell
npm ci
npm run dev
```

Untuk preview build dengan redirect bahasa dan API kontak:

```powershell
npm run typecheck
npm run build
npm run preview
```

Development Astro mendukung hot reload. Preview Worker tersedia di `http://127.0.0.1:8787/`. Dependensi, build, dan cache dibuat ulang oleh perintah tersebut; tidak disertakan dalam folder source.

## Struktur

- `src/pages`, `src/layouts`: route statis, navigasi, dan metadata.
- `src/lib/content`, `src/lib/demos`: konten studio dan tiga konsep hukum dalam dua bahasa.
- `src/components`, `src/scripts`, `src/styles`: interface, interaksi, dan tema.
- `public`: fotografi, screenshot galeri, wordmark, poster 3D, data globe, dan font WOFF2 yang digunakan.
- `worker`: redirect bahasa, validasi kontak, Turnstile, Resend, dan idempotensi retry.
- `scripts/check-release.mjs`: pengaman konfigurasi sebelum publikasi.
- `licenses`: pemberitahuan lisensi komponen yang diadaptasi.

Halaman studio meliputi enam layanan, showcase, studio, kontak, dan privasi. Setiap konsep hukum memiliki 12 halaman per bahasa: beranda, indeks praktik dan tiga detail, indeks profesional dan dua profil, indeks artikel dan dua contoh, serta kontak demonstratif. Identitas dan konten demo fiktif; form demo tidak mengirim atau menyimpan pesan. Materi klien confidential tidak disertakan.

Tema studio mengikuti perangkat sampai pilihan light/dark disimpan di localStorage. System mengembalikan tema perangkat. Demo mempertahankan tema masing-masing. Cookie fungsional `kexar-language` mengingat pilihan bahasa selama satu tahun. Pada `/`, Worker memilih cookie tersebut, preferensi `Accept-Language`, kemudian English. Route `/en/` dan `/id/` selalu dihormati; pergantian bahasa mempertahankan halaman, query, dan anchor.

Scene 3D dimuat dekat viewport dan berhenti saat di luar layar atau tab tersembunyi. Drag menghentikan rotasi otomatis; kontrol keyboard, reset, dan poster tetap tersedia. Mobile dan reduced motion tidak memakai rotasi otomatis. Koneksi globe bersifat ilustratif.

## Konfigurasi kontak dan deployment

1. Buat `.env.local` dari `.env.example`. Isi origin HTTPS `PUBLIC_SITE_URL`, email publik, nomor WhatsApp internasional tanpa tanda baca, dan site key Turnstile. Nilai `PUBLIC_*` tersedia bagi browser; jangan isi secret di sana.
2. Buat widget Turnstile untuk hostname yang digunakan dengan action `contact`. Worker memeriksa token, hostname, dan action. Untuk development, gunakan test key resmi.
3. Verifikasi domain pengirim di Resend. Isi `MAIL_FROM`, inbox tetap `CONTACT_TO_EMAIL`, dan `ALLOWED_ORIGIN` yang sama dengan origin situs di `wrangler.jsonc`.
4. Untuk Worker lokal, buat `.dev.vars` dari `.dev.vars.example`. Untuk produksi, jalankan `npx wrangler login`, lalu simpan `RESEND_API_KEY` dan `TURNSTILE_SECRET_KEY` menggunakan `npx wrangler secret put`.
5. Jalankan `npm run cf:types` jika binding Worker berubah, kemudian `npm run typecheck`, `npm run deploy:check`, dan `npm run build`.
6. Verifikasi preview, widget hostname, origin, dan kedatangan email nyata di inbox. Penerimaan provider belum membuktikan email tiba. Setelah konfigurasi dan pengiriman terbukti, jalankan `npm run deploy`.

`npm run deploy` menjalankan guard dan build sebelum Wrangler. Guard memeriksa nilai publik dan konfigurasi Worker; secret, DNS, akun provider, dan kedatangan email tetap perlu diverifikasi. Tanpa konfigurasi kontak, situs tidak menampilkan keberhasilan pengiriman palsu. Domain dan konfigurasi kontak belum disediakan; publikasi belum dilakukan.

Email dikirim sebagai teks biasa ke inbox tetap, dengan email pengunjung sebagai reply-to. ID pengiriman tetap sama pada retry; idempotensi Resend mencegah pengiriman ganda selama jendela retensinya. Setiap retry membutuhkan verifikasi baru. Tidak ada database pengiriman. Log aplikasi hanya berisi ID dan status; Cloudflare dapat memproses metadata teknis request.

Canonical, hreflang, sharing preview, sitemap, dan robots memakai `PUBLIC_SITE_URL` saat build. Seluruh demo memakai `noindex`. Batas layanan provider dan biaya domain terpisah dari source ini.

## Aset dan lisensi

Fotografi arsitektur dan enam potret sintetis dibuat khusus untuk proyek; tempat dan orangnya imajiner. Preview galeri berasal dari tiga website demo yang dibangun. Gambar teroptimasi menyimpan provenance tertanam. Source master, script regenerasi, dokumentasi desain, kode tes, dan hasil QA telah dihapus; untuk mengganti aset, sediakan file teroptimasi pada path yang digunakan aplikasi.

Cormorant Garamond, Manrope, Libre Baskerville, dan Sora di-host lokal dengan SIL Open Font License 1.1. Pemberitahuan lengkap tersedia di `public/fonts/*-OFL.txt`; pengunjung tidak meminta font dari Google. Sumber resmi: [Cormorant](https://github.com/google/fonts/tree/main/ofl/cormorantgaramond), [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope), [Libre Baskerville](https://github.com/google/fonts/tree/main/ofl/librebaskerville), dan [Sora](https://github.com/google/fonts/tree/main/ofl/sora).

- **Aceternity UI / Manu Arora:** pola [Container Scroll](https://ui.aceternity.com/components/container-scroll-animation), [Compare](https://ui.aceternity.com/components/compare), [GitHub Globe](https://ui.aceternity.com/components/github-globe), dan [Parallax Hero Images](https://ui.aceternity.com/components/parallax-hero-images) diadaptasi dengan aset dan geometri proyek. Geografi globe berasal dari [aset Aceternity](https://assets.aceternity.com/globe.json). [Lisensi](https://ui.aceternity.com/licence) mengizinkan modifikasi dan produk akhir komersial; jangan redistribusikan sebagai komponen stok atau produk marketplace template.
- **Motion Primitives / ibelick:** interaksi shared-layout dialog diadaptasi dengan pengelolaan fokus Radix. MIT, copyright 2024; notice lengkap di `licenses/motion-primitives-LICENSE.txt`. [Upstream](https://github.com/ibelick/motion-primitives/blob/main/components/core/morphing-dialog.tsx).
- **shadcn/ui:** komposisi accordion Radix diadaptasi untuk FAQ. MIT, copyright 2023; notice lengkap di `licenses/shadcn-LICENSE.txt`. Source 21st yang tidak dapat diakses tidak disalin; padanan upstream digunakan.
- **Three.js:** OrbitControls dan RoomEnvironment resmi digunakan dengan lisensi MIT dari paket. Wordmark, custom X, favicon, komposisi sharing, dan geometri portal merupakan karya proyek.

Lisensi dependensi lain disertakan dalam paket saat `npm ci`. Source 21st Scroll Expansion Hero yang membutuhkan autentikasi tidak disalin; framing fotografi hero dibuat menggunakan event browser dan requestAnimationFrame.
