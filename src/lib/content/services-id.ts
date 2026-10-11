import type { Service } from './types';
export const idServices: Service[] = [
  {
    id: 'legal-web',
    title: 'Website firma hukum',
    short: 'Tempat keahlian firma Anda tampil dengan jelas.',
    intro:
      'Website yang memberi calon klien gambaran tentang firma, bidang praktik, dan cara memulai percakapan. Struktur dan desain disusun mengikuti identitas serta kebutuhan firma Anda.',
    needs: [
      'Website pertama untuk firma atau praktik pribadi.',
      'Penyajian bidang praktik, profil partner, dan publikasi.',
      'Konten Indonesia dan Inggris untuk audiens yang berbeda.',
    ],
    deliverables: [
      'Struktur halaman dan arah visual yang disepakati.',
      'Website responsif dengan alur kontak dan fondasi SEO.',
      'Pemeriksaan konten, deployment, dan panduan penggunaan.',
    ],
    example:
      'Company profile dengan bidang praktik, profil profesional, artikel, dan jalur konsultasi.',
  },
  {
    id: 'redesign',
    title: 'Redesign website',
    short: 'Bangun kembali kesan dan alur yang sudah ada.',
    intro:
      'Website dapat bertumbuh tanpa kehilangan informasi yang penting. Kami meninjau perjalanan pengunjung dan fondasi teknis sebelum merancang ulang.',
    needs: [
      'Tampilan lama sulit digunakan di ponsel.',
      'Layanan dan profil sulit ditemukan.',
      'Perubahan identitas, konten, atau arah bisnis.',
    ],
    deliverables: [
      'Evaluasi struktur dan prioritas perbaikan.',
      'Prototype dan implementasi tampilan baru.',
      'Pemetaan URL serta redirect jika dibutuhkan.',
    ],
    example:
      'Pembaruan navigasi dan halaman praktik, dengan konten lama yang dipindahkan secara terencana.',
  },
  {
    id: 'web-app',
    title: 'Aplikasi web',
    short: 'Alur kerja yang lebih mudah dijalankan.',
    intro:
      'Dari portal internal hingga sistem layanan, kami merancang aplikasi berdasarkan pengguna dan pekerjaan yang perlu mereka selesaikan.',
    needs: [
      'Portal dokumen atau dashboard internal.',
      'Proses berbasis spreadsheet yang mulai sulit dikelola.',
      'Integrasi layanan yang digunakan organisasi.',
    ],
    deliverables: [
      'Pemetaan pengguna, alur, dan kebutuhan akses.',
      'Interface serta fitur aplikasi sesuai ruang lingkup.',
      'Pengujian alur dan panduan operasional.',
    ],
    example:
      'Portal permintaan layanan dengan autentikasi, status pekerjaan, dan akses sesuai peran.',
  },
  {
    id: 'seo',
    title: 'SEO & performa',
    short: 'Mudah ditemukan. Nyaman digunakan.',
    intro:
      'Struktur informasi dan performa website membantu orang menemukan serta membaca layanan Anda. Kami menyusun perbaikan dari kondisi website dan tujuan kontennya.',
    needs: [
      'Struktur halaman dan metadata belum tertib.',
      'Halaman lambat atau aset terlalu berat.',
      'Rencana konten berdasarkan kebutuhan calon klien.',
    ],
    deliverables: [
      'Audit teknis dan daftar prioritas.',
      'Perbaikan metadata, struktur, dan aset sesuai kebutuhan.',
      'Laporan hasil pemeriksaan serta rekomendasi lanjutan.',
    ],
    example:
      'Optimasi halaman bidang praktik dan kecepatan mobile. Peringkat pencarian tidak dijanjikan.',
  },
  {
    id: 'server',
    title: 'Server & deployment',
    short: 'Fondasi yang mendukung website Anda.',
    intro:
      'Hosting dan deployment dipilih berdasarkan beban, integrasi, serta kemampuan pengelolaan. Kami membantu menyiapkan jalur dari kode ke website yang dapat digunakan.',
    needs: [
      'Setup domain, DNS, HTTPS, dan hosting.',
      'Deployment aplikasi atau migrasi lingkungan.',
      'Kebutuhan backup dan pemantauan operasional.',
    ],
    deliverables: [
      'Konfigurasi lingkungan sesuai kebutuhan aplikasi.',
      'Proses deployment dan dokumentasi akses.',
      'Rencana backup serta pemeriksaan yang disepakati.',
    ],
    example: 'Website statis di Cloudflare atau aplikasi pada server sesuai kebutuhan proyek.',
  },
  {
    id: 'ai',
    title: 'AI & otomasi',
    short: 'Bantuan terukur untuk pekerjaan berulang.',
    intro:
      'Kami memulai dari alur kerja yang jelas, lalu menilai bagian yang dapat dibantu AI atau otomasi. Batas akses data dan pemeriksaan manusia dirancang sejak awal.',
    needs: [
      'Penyusunan draf dan pencarian informasi internal.',
      'Pemindahan data antar layanan.',
      'Proses berulang yang membutuhkan pemeriksaan.',
    ],
    deliverables: [
      'Pemetaan alur dan batas penggunaan data.',
      'Prototype integrasi yang dapat dievaluasi.',
      'Kontrol akses, pemeriksaan hasil, dan panduan penggunaan.',
    ],
    example:
      'Asisten pencarian dokumen internal dengan sumber rujukan dan peninjauan manusia; bukan pengganti penilaian hukum.',
  },
];
