import type { DemoContent } from './types';
export const corporate: Record<'en' | 'id', DemoContent> = {
  en: {
    name: 'Aruna Counsel',
    descriptor: 'Corporate & commercial',
    image: 'corporate-hero',
    hero: 'Clarity for the decisions that shape your business.',
    heroNote:
      'Considered legal counsel for companies, commercial relationships, and new investment.',
    statement: 'Commercial understanding. Clear direction.',
    statementNote:
      'This imagined practice brings corporate, transactional, and investment advice into one conversation. Its website makes the work, people, and next step easy to find.',
    approach: [
      [
        'Understand the context',
        'Start with the business objective, the relationships involved, and the decisions that need to be made.',
      ],
      [
        'Work through the detail',
        'Translate a complicated brief into an agreed scope, a clear document set, and practical next steps.',
      ],
      [
        'Keep the conversation clear',
        'Identify open questions early and explain the assumptions behind each proposed approach.',
      ],
    ],
    practices: [
      {
        slug: 'corporate',
        title: 'Corporate advisory',
        short: 'Structure, governance, and everyday company decisions.',
        intro:
          'A company needs a structure that supports the way it actually works. This example practice explores how legal advice can sit alongside operational and commercial decisions.',
        work: [
          'Corporate structuring discussions',
          'Governance and internal decision-making',
          'Shareholder arrangements',
          'Ongoing company advisory',
        ],
        sections: [
          [
            'A useful starting point',
            'Begin with the ownership structure, the people who make decisions, and the plans for the business. Existing documents can reveal where expectations and recorded arrangements differ.',
          ],
          [
            'An agreed scope',
            'An engagement might involve a review of current documents, a discussion of alternative structures, or preparation of a focused set of agreements. The specific work and timetable would be agreed before it begins.',
          ],
        ],
      },
      {
        slug: 'transactions',
        title: 'Commercial transactions',
        short: 'Agreements that make commercial relationships easier to manage.',
        intro:
          'A transaction is more than a signature. It brings together responsibilities, timing, information, and expectations about what happens when circumstances change.',
        work: [
          'Commercial contract review',
          'Negotiation preparation',
          'Transaction document coordination',
          'Closing and implementation planning',
        ],
        sections: [
          [
            'Look beyond the document',
            'Understand the commercial purpose of the relationship before reviewing its terms. Delivery, payment, confidentiality, and the process for resolving disagreements all deserve deliberate attention.',
          ],
          [
            'From agreement to implementation',
            'A document set is easier to use when its obligations, key dates, and responsibilities are clear. This fictional service example includes an implementation checklist alongside the agreed documents.',
          ],
        ],
      },
      {
        slug: 'investment',
        title: 'Investment & growth',
        short: 'A considered foundation for a new stage of business.',
        intro:
          'New investment can change the way a business is owned and governed. This example illustrates a structured conversation around the proposed relationship and the information needed to evaluate it.',
        work: [
          'Investment readiness review',
          'Term sheet discussions',
          'Due diligence coordination',
          'Shareholder and investment documents',
        ],
        sections: [
          [
            'Prepare the information',
            'A useful initial review collects the ownership records, key contracts, and important commercial assumptions. Organising that material helps each party ask more precise questions.',
          ],
          [
            'Make expectations explicit',
            'Control, information rights, future funding, and an eventual exit are subjects to discuss early. Advice in a real engagement would depend on the relevant jurisdiction and the parties’ circumstances.',
          ],
        ],
      },
    ],
    people: [
      {
        slug: 'nadia-pranata',
        name: 'Nadia Pranata',
        role: 'Partner · Corporate advisory',
        portrait: 'corporate-person-1',
        intro:
          'A fictional professional profile illustrating how a corporate practice can introduce its people with clarity.',
        bio: [
          [
            'Approach',
            'Nadia’s example profile centres on listening to the commercial brief, defining the decisions at hand, and explaining the alternatives in straightforward language.',
          ],
          [
            'Work and collaboration',
            'The profile shows how a partner’s focus, working style, and related practice areas can be presented without relying on rankings or unverified success claims. All biographical content on this page is fictional.',
          ],
        ],
        focus: ['Corporate advisory', 'Governance', 'Shareholder arrangements'],
      },
      {
        slug: 'adrian-wirya',
        name: 'Adrian Wirya',
        role: 'Partner · Transactions & investment',
        portrait: 'corporate-person-2',
        intro:
          'An imagined profile for a transactional adviser, designed to make the next conversation easier.',
        bio: [
          [
            'Approach',
            'Adrian’s example profile emphasises organising a transaction around the commercial objective, the document set, and the responsibilities of the people involved.',
          ],
          [
            'Work and collaboration',
            'It demonstrates a concise professional introduction with related services and a direct contact path. The name, portrait, role, and narrative are synthetic demonstration content.',
          ],
        ],
        focus: ['Commercial transactions', 'Investment', 'Document coordination'],
      },
    ],
    articles: [
      {
        slug: 'before-signing',
        title: 'Before signing: a useful commercial contract conversation',
        category: 'Commercial perspective',
        image: 'library',
        intro:
          'A practical discussion starts with the relationship behind the document. This example article offers questions to organise that discussion; it is not legal advice.',
        sections: [
          [
            'Start with the commercial purpose',
            'What is each party trying to achieve, and what does a good result look like? A clear answer helps distinguish the terms that matter most from the terms that are simply familiar. Write down the expected deliverables, the timing, and the information each party needs.',
          ],
          [
            'Make responsibilities visible',
            'An agreement is easier to use when someone can identify who must do what, by when, and with which approvals. Consider how changes will be requested, how decisions will be recorded, and how a delay will be communicated. A short responsibilities table can be a useful companion to a detailed document.',
          ],
          [
            'Discuss a change in circumstances',
            'Commercial relationships evolve. Ask what happens if a delivery assumption changes, a key person leaves, or the project takes longer than expected. These are discussion prompts, not prescribed contract terms. Their treatment depends on the transaction and the relevant legal context.',
          ],
          [
            'Leave with a clear next step',
            'The first review does not need to answer every question. It should identify the information still needed, the areas that require advice, and the person responsible for the next draft. In a real matter, obtain advice on the actual documents and circumstances.',
          ],
        ],
      },
      {
        slug: 'investment-readiness',
        title: 'Organising the first investment conversation',
        category: 'Business & growth',
        image: 'corporate-hero',
        intro:
          'Before a proposed investment becomes a document exercise, it helps to organise the business story, the information, and the questions. This is fictional editorial content.',
        sections: [
          [
            'Build a shared picture',
            'Describe how the business works today and what the investment is intended to support. Explain the assumptions behind the plan, including the resources and commercial relationships on which it depends. This gives the discussion a useful frame.',
          ],
          [
            'Collect the essential records',
            'A consistent set of ownership records, important agreements, and internal decisions can make an initial review more efficient. Keep a record of what is current, what is being updated, and what remains uncertain. The appropriate document set will vary by business.',
          ],
          [
            'Talk about the relationship',
            'The investment amount is only one part of the conversation. Decision-making, access to information, future funding, and the parties’ expectations for the business also deserve attention. Questions raised early are often easier to evaluate together.',
          ],
          [
            'Agree on the work ahead',
            'A useful first conversation ends with an information list, a proposed sequence of work, and a clear understanding of who will advise each party. Nothing in this article states a legal requirement or promises a transaction outcome.',
          ],
        ],
      },
    ],
    contactNote:
      'Tell us about the business decision or relationship you would like to discuss. This demonstration form stays entirely in your browser.',
  },
  id: {
    name: 'Aruna Counsel',
    descriptor: 'Korporasi & komersial',
    image: 'corporate-hero',
    hero: 'Kejelasan untuk keputusan yang membentuk bisnis Anda.',
    heroNote:
      'Pendampingan hukum yang terarah untuk perusahaan, hubungan komersial, dan investasi baru.',
    statement: 'Memahami bisnis. Menentukan arah.',
    statementNote:
      'Praktik imajiner ini menyatukan kebutuhan korporasi, transaksi, dan investasi dalam satu percakapan. Website-nya memudahkan pengunjung menemukan layanan, profesional, dan langkah berikutnya.',
    approach: [
      [
        'Memahami konteks',
        'Mulai dari tujuan bisnis, hubungan para pihak, dan keputusan yang perlu dibuat.',
      ],
      [
        'Mengerjakan detail',
        'Mengubah brief yang kompleks menjadi lingkup yang disepakati, dokumen yang jelas, dan langkah praktis.',
      ],
      [
        'Menjaga kejelasan',
        'Mengidentifikasi pertanyaan sejak awal dan menjelaskan asumsi di balik setiap pendekatan.',
      ],
    ],
    practices: [
      {
        slug: 'corporate',
        title: 'Pendampingan korporasi',
        short: 'Struktur, tata kelola, dan keputusan perusahaan sehari-hari.',
        intro:
          'Perusahaan membutuhkan struktur yang mendukung cara kerjanya. Contoh praktik ini memperlihatkan bagaimana pendampingan hukum dapat berjalan bersama keputusan operasional dan komersial.',
        work: [
          'Diskusi struktur korporasi',
          'Tata kelola dan keputusan internal',
          'Pengaturan pemegang saham',
          'Pendampingan perusahaan berkelanjutan',
        ],
        sections: [
          [
            'Titik awal yang berguna',
            'Mulai dari struktur kepemilikan, pengambil keputusan, dan rencana bisnis. Dokumen yang ada dapat menunjukkan perbedaan antara harapan para pihak dan pengaturan yang tercatat.',
          ],
          [
            'Lingkup yang disepakati',
            'Pekerjaan dapat berupa pemeriksaan dokumen, diskusi alternatif struktur, atau penyusunan perjanjian tertentu. Lingkup dan jadwal disepakati sebelum pekerjaan dimulai.',
          ],
        ],
      },
      {
        slug: 'transactions',
        title: 'Transaksi komersial',
        short: 'Perjanjian yang membantu hubungan komersial berjalan lebih jelas.',
        intro:
          'Transaksi bukan sekadar tanda tangan. Di dalamnya terdapat tanggung jawab, waktu, informasi, dan harapan tentang apa yang terjadi ketika keadaan berubah.',
        work: [
          'Pemeriksaan kontrak komersial',
          'Persiapan negosiasi',
          'Koordinasi dokumen transaksi',
          'Perencanaan penutupan dan implementasi',
        ],
        sections: [
          [
            'Melihat hubungan di balik dokumen',
            'Pahami tujuan hubungan komersial sebelum meninjau ketentuannya. Penyerahan, pembayaran, kerahasiaan, dan mekanisme penyelesaian perbedaan perlu dibahas dengan saksama.',
          ],
          [
            'Dari kesepakatan ke pelaksanaan',
            'Dokumen lebih mudah digunakan ketika kewajiban, tanggal penting, dan tanggung jawab jelas. Contoh layanan fiktif ini menyertakan daftar implementasi bersama dokumen yang disepakati.',
          ],
        ],
      },
      {
        slug: 'investment',
        title: 'Investasi & pertumbuhan',
        short: 'Fondasi yang terarah untuk tahap bisnis berikutnya.',
        intro:
          'Investasi baru dapat mengubah kepemilikan dan tata kelola bisnis. Contoh ini menggambarkan percakapan terstruktur mengenai hubungan yang direncanakan dan informasi untuk menilainya.',
        work: [
          'Tinjauan kesiapan investasi',
          'Diskusi term sheet',
          'Koordinasi uji tuntas',
          'Dokumen investasi dan pemegang saham',
        ],
        sections: [
          [
            'Menyiapkan informasi',
            'Tinjauan awal mengumpulkan catatan kepemilikan, kontrak penting, dan asumsi komersial. Informasi yang tertata membantu para pihak mengajukan pertanyaan yang lebih tepat.',
          ],
          [
            'Menjelaskan harapan',
            'Kendali, hak informasi, pendanaan berikutnya, dan rencana keluar perlu dibahas sejak awal. Nasihat dalam pekerjaan nyata bergantung pada yurisdiksi dan keadaan para pihak.',
          ],
        ],
      },
    ],
    people: [
      {
        slug: 'nadia-pranata',
        name: 'Nadia Pranata',
        role: 'Partner · Pendampingan korporasi',
        portrait: 'corporate-person-1',
        intro:
          'Profil profesional fiktif yang memperlihatkan cara sebuah praktik korporasi memperkenalkan orang-orangnya dengan jelas.',
        bio: [
          [
            'Pendekatan',
            'Contoh profil Nadia berfokus pada mendengarkan kebutuhan komersial, merumuskan keputusan, dan menjelaskan alternatif dengan bahasa yang mudah dipahami.',
          ],
          [
            'Pekerjaan dan kolaborasi',
            'Profil ini menunjukkan fokus, gaya kerja, dan bidang terkait tanpa peringkat atau klaim keberhasilan yang tidak terverifikasi. Seluruh biografi pada halaman ini fiktif.',
          ],
        ],
        focus: ['Pendampingan korporasi', 'Tata kelola', 'Pengaturan pemegang saham'],
      },
      {
        slug: 'adrian-wirya',
        name: 'Adrian Wirya',
        role: 'Partner · Transaksi & investasi',
        portrait: 'corporate-person-2',
        intro: 'Profil imajiner penasihat transaksi untuk memudahkan percakapan berikutnya.',
        bio: [
          [
            'Pendekatan',
            'Contoh profil Adrian menekankan penyusunan transaksi berdasarkan tujuan komersial, dokumen, dan tanggung jawab pihak yang terlibat.',
          ],
          [
            'Pekerjaan dan kolaborasi',
            'Halaman ini memperlihatkan pengantar profesional yang ringkas, layanan terkait, dan jalur kontak langsung. Nama, potret, jabatan, dan narasinya merupakan konten demonstrasi sintetis.',
          ],
        ],
        focus: ['Transaksi komersial', 'Investasi', 'Koordinasi dokumen'],
      },
    ],
    articles: [
      {
        slug: 'before-signing',
        title: 'Sebelum tanda tangan: percakapan kontrak yang berguna',
        category: 'Perspektif komersial',
        image: 'library',
        intro:
          'Diskusi praktis dimulai dari hubungan di balik dokumen. Artikel contoh ini menawarkan pertanyaan untuk menata percakapan; bukan nasihat hukum.',
        sections: [
          [
            'Mulai dari tujuan komersial',
            'Apa yang ingin dicapai setiap pihak, dan seperti apa hasil yang diharapkan? Jawaban yang jelas membantu membedakan ketentuan terpenting dari ketentuan yang sekadar familiar. Catat keluaran, jadwal, dan informasi yang dibutuhkan para pihak.',
          ],
          [
            'Memperjelas tanggung jawab',
            'Perjanjian lebih mudah dipakai ketika jelas siapa melakukan apa, kapan, dan dengan persetujuan siapa. Bahas cara mengajukan perubahan, mencatat keputusan, dan menyampaikan keterlambatan. Tabel tanggung jawab singkat dapat mendampingi dokumen rinci.',
          ],
          [
            'Membahas perubahan keadaan',
            'Hubungan komersial berkembang. Tanyakan apa yang terjadi jika asumsi penyerahan berubah, orang kunci berpindah, atau proyek berlangsung lebih lama. Ini adalah bahan diskusi, bukan ketentuan kontrak yang wajib digunakan. Penanganannya bergantung pada transaksi dan konteks hukum.',
          ],
          [
            'Menentukan langkah berikutnya',
            'Tinjauan pertama tidak harus menjawab semua pertanyaan. Tinjauan tersebut perlu mengidentifikasi informasi tambahan, hal yang memerlukan nasihat, dan penanggung jawab draf berikutnya. Untuk pekerjaan nyata, mintalah nasihat berdasarkan dokumen dan keadaan sebenarnya.',
          ],
        ],
      },
      {
        slug: 'investment-readiness',
        title: 'Menata percakapan investasi pertama',
        category: 'Bisnis & pertumbuhan',
        image: 'corporate-hero',
        intro:
          'Sebelum investasi menjadi pekerjaan dokumen, cerita bisnis, informasi, dan pertanyaannya perlu ditata. Ini merupakan konten editorial fiktif.',
        sections: [
          [
            'Membangun gambaran bersama',
            'Jelaskan cara bisnis bekerja saat ini dan tujuan investasi. Uraikan asumsi di balik rencana, termasuk sumber daya dan hubungan komersial yang mendukungnya. Ini memberi kerangka yang berguna untuk diskusi.',
          ],
          [
            'Mengumpulkan catatan penting',
            'Catatan kepemilikan, perjanjian penting, dan keputusan internal yang konsisten membuat tinjauan awal lebih efisien. Tandai informasi yang berlaku, sedang diperbarui, dan belum pasti. Kebutuhan dokumen berbeda untuk setiap bisnis.',
          ],
          [
            'Membicarakan hubungan',
            'Nilai investasi hanya satu bagian percakapan. Pengambilan keputusan, akses informasi, pendanaan berikutnya, dan harapan para pihak juga perlu diperhatikan. Pertanyaan sejak awal lebih mudah dinilai bersama.',
          ],
          [
            'Menyepakati pekerjaan berikutnya',
            'Percakapan awal yang berguna menghasilkan daftar informasi, urutan pekerjaan, dan kejelasan siapa yang mendampingi setiap pihak. Artikel ini tidak menyatakan kewajiban hukum atau menjanjikan hasil transaksi.',
          ],
        ],
      },
    ],
    contactNote:
      'Ceritakan keputusan bisnis atau hubungan yang ingin Anda diskusikan. Form demonstrasi ini hanya bekerja di browser Anda.',
  },
};
