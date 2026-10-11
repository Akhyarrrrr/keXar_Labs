import type { DemoContent } from './types';
export const privateClient: Record<'en' | 'id', DemoContent> = {
  en: {
    name: 'Aster & Vale',
    descriptor: 'Private client practice',
    image: 'private-hero',
    hero: 'For what matters. Today, and for the years ahead.',
    heroNote:
      'Thoughtful conversations around family, property, and the arrangements that support continuity.',
    statement: 'Personal matters deserve a personal approach.',
    statementNote:
      'This imagined private client practice makes room for a quieter conversation. A clear introduction, accessible services, and considered editorial content help visitors find their way.',
    approach: [
      [
        'Listen carefully',
        'Understand the circumstances, the people involved, and what matters to them.',
      ],
      [
        'Explain the options',
        'Create a shared understanding of the questions, the documents, and the work proposed.',
      ],
      [
        'Plan with care',
        'Agree on practical next steps and keep the conversation understandable throughout.',
      ],
    ],
    practices: [
      {
        slug: 'family',
        title: 'Family matters',
        short: 'Careful conversations around changing family circumstances.',
        intro:
          'Personal circumstances rarely fit a simple template. This fictional service example illustrates a calm, private first conversation about the people involved and the questions that need advice.',
        work: [
          'Initial family discussions',
          'Agreement review',
          'Planning for changing circumstances',
          'Coordination of related advice',
        ],
        sections: [
          [
            'A private starting point',
            'A first conversation can identify immediate concerns and the information needed to understand the circumstances. Sensitive details belong in a confidential engagement, not a public contact form.',
          ],
          [
            'A clear plan',
            'The proposed work, communication preferences, and practical next steps should be explained. Specific advice and available options in a real matter depend on the applicable law and individual circumstances.',
          ],
        ],
      },
      {
        slug: 'property',
        title: 'Property',
        short: 'Clarity around a home, a property interest, or a new arrangement.',
        intro:
          'Property decisions often connect a legal document to a personal plan. This example service starts with the purpose of the proposed arrangement and the information available.',
        work: [
          'Property document review',
          'Ownership arrangement discussions',
          'Transaction preparation',
          'Related agreement coordination',
        ],
        sections: [
          [
            'Understand the arrangement',
            'Identify the property, the proposed parties, and the purpose of the transaction. Existing records, expectations, and practical constraints can guide the questions asked at the outset.',
          ],
          [
            'Prepare for the decision',
            'A review may identify documents to obtain and points to discuss before proceeding. This fictional description does not confirm title, prescribe a transaction process, or state a legal requirement.',
          ],
        ],
      },
      {
        slug: 'planning',
        title: 'Asset & continuity planning',
        short: 'A considered conversation about the arrangements for the future.',
        intro:
          'Planning begins with understanding what someone wants to support and the people connected to those decisions. This demonstration shows how a practice can make that conversation approachable.',
        work: [
          'Planning objectives',
          'Asset information organisation',
          'Review of existing arrangements',
          'Coordination with other advisers',
        ],
        sections: [
          [
            'Build a clear picture',
            'A useful starting point is a current summary of assets, relevant documents, and the people or purposes involved. Note uncertainties and avoid assuming that one arrangement suits every circumstance.',
          ],
          [
            'Review over time',
            'Plans may need to be reconsidered when personal circumstances change. A real engagement would require advice on the applicable law, the proposed documents, and any related professional input.',
          ],
        ],
      },
    ],
    people: [
      {
        slug: 'elena-mahira',
        name: 'Elena Mahira',
        role: 'Partner · Family & continuity',
        portrait: 'private-person-1',
        intro:
          'A fictional professional profile showing a listening-led approach to personal matters.',
        bio: [
          [
            'A considered conversation',
            'Elena’s imagined profile focuses on understanding the people and circumstances before setting out a proposed scope of work.',
          ],
          [
            'Clear communication',
            'It demonstrates a calm introduction, areas of focus, and a direct route to a conversation. All names, roles, portraits, and narrative details are fictional; no professional credentials are claimed.',
          ],
        ],
        focus: ['Family matters', 'Continuity planning', 'Personal arrangements'],
      },
      {
        slug: 'daniel-ardana',
        name: 'Daniel Ardana',
        role: 'Partner · Property & planning',
        portrait: 'private-person-2',
        intro:
          'An imagined profile for a professional helping to organise property and planning discussions.',
        bio: [
          [
            'Practical perspective',
            'Daniel’s example narrative connects a property decision to its purpose, the relevant records, and the questions that need to be examined.',
          ],
          [
            'Working together',
            'The profile illustrates how related advisers and a client can be part of one understandable work plan. Its identity and biography are synthetic demonstration content.',
          ],
        ],
        focus: ['Property', 'Asset planning', 'Document review'],
      },
    ],
    articles: [
      {
        slug: 'planning-conversation',
        title: 'Making space for a planning conversation',
        category: 'Personal perspective',
        image: 'private-hero',
        intro:
          'A calm conversation can help turn broad intentions into useful questions. This fictional article is general editorial content and does not give personal legal advice.',
        sections: [
          [
            'Begin with what matters',
            'Describe the people, purposes, and practical concerns that the plan is intended to support. The first discussion does not need to settle the final arrangement. It helps create a shared picture of what should be considered.',
          ],
          [
            'Organise the current picture',
            'Collect the records that describe existing arrangements and note where information may be incomplete. A clear summary can make a conversation with an adviser more focused. The appropriate records will depend on the circumstances.',
          ],
          [
            'Ask rather than assume',
            'Family expectations and practical preferences may not be the same. Leave room to ask questions and clarify the assumptions behind a plan. Sensitive or difficult discussions may need their own setting and professional support.',
          ],
          [
            'Keep the plan open to review',
            'Circumstances change over time. An agreed review point can help identify when further advice is needed. This article does not recommend a particular document, asset structure, or legal outcome. Obtain advice tailored to the actual situation.',
          ],
        ],
      },
      {
        slug: 'property-questions',
        title: 'Questions to organise a property discussion',
        category: 'Property & home',
        image: 'library',
        intro:
          'Before reviewing a document, it helps to understand the decision it supports. These are illustrative conversation prompts, not a property checklist for a real transaction.',
        sections: [
          [
            'Explain the purpose',
            'Is the discussion about a home, an investment, an existing ownership arrangement, or a proposed change? A clear purpose helps frame the questions and identify the people who need to be involved.',
          ],
          [
            'Gather the records',
            'Identify the documents already available and note their dates and source. Keep a list of information still to be obtained. Do not assume that a short summary confirms ownership or answers the questions that require a proper review.',
          ],
          [
            'Discuss practical expectations',
            'Timing, intended use, shared responsibilities, and future changes can all influence the discussion. Record the points on which people agree and the points that need more thought. This is a way to organise information, not a set of legal terms.',
          ],
          [
            'Choose a useful next step',
            'An initial conversation might lead to document review, further information gathering, or advice from another professional. The appropriate course depends on the property, jurisdiction, and circumstances. No legal rule or transaction result is claimed here.',
          ],
        ],
      },
    ],
    contactNote:
      'Start with the type of matter you would like to discuss. Keep private details for a confidential conversation. This form is a local demonstration.',
  },
  id: {
    name: 'Aster & Vale',
    descriptor: 'Praktik private client',
    image: 'private-hero',
    hero: 'Untuk yang berarti. Hari ini, dan tahun-tahun mendatang.',
    heroNote:
      'Percakapan yang saksama tentang keluarga, properti, dan pengaturan yang mendukung keberlanjutan.',
    statement: 'Urusan personal memerlukan pendekatan personal.',
    statementNote:
      'Praktik private client imajiner ini memberi ruang percakapan yang lebih tenang. Pengantar jelas, layanan yang mudah ditemukan, dan konten editorial membantu pengunjung menentukan langkah.',
    approach: [
      [
        'Mendengarkan',
        'Memahami keadaan, orang-orang yang terlibat, dan hal yang berarti bagi mereka.',
      ],
      [
        'Menjelaskan pilihan',
        'Menyamakan pemahaman tentang pertanyaan, dokumen, dan pekerjaan yang diusulkan.',
      ],
      ['Merencanakan', 'Menyepakati langkah praktis dan menjaga percakapan tetap mudah dipahami.'],
    ],
    practices: [
      {
        slug: 'family',
        title: 'Urusan keluarga',
        short: 'Percakapan saksama menghadapi perubahan keadaan keluarga.',
        intro:
          'Keadaan personal jarang sesuai satu pola. Contoh layanan fiktif ini menggambarkan percakapan awal yang tenang tentang orang-orang dan pertanyaan yang membutuhkan nasihat.',
        work: [
          'Diskusi keluarga awal',
          'Tinjauan perjanjian',
          'Perencanaan perubahan keadaan',
          'Koordinasi nasihat terkait',
        ],
        sections: [
          [
            'Titik awal yang privat',
            'Percakapan pertama mengidentifikasi kekhawatiran dan informasi untuk memahami keadaan. Rincian sensitif disampaikan dalam hubungan kerja yang rahasia, bukan form publik.',
          ],
          [
            'Rencana yang jelas',
            'Pekerjaan, cara berkomunikasi, dan langkah berikutnya dijelaskan. Nasihat dan pilihan dalam urusan nyata bergantung pada hukum yang berlaku dan keadaan individu.',
          ],
        ],
      },
      {
        slug: 'property',
        title: 'Properti',
        short: 'Kejelasan tentang rumah, kepentingan properti, atau pengaturan baru.',
        intro:
          'Keputusan properti menghubungkan dokumen hukum dengan rencana personal. Contoh layanan ini dimulai dari tujuan pengaturan dan informasi yang tersedia.',
        work: [
          'Tinjauan dokumen properti',
          'Diskusi pengaturan kepemilikan',
          'Persiapan transaksi',
          'Koordinasi perjanjian terkait',
        ],
        sections: [
          [
            'Memahami pengaturan',
            'Identifikasi properti, para pihak, dan tujuan transaksi. Catatan, harapan, dan batas praktis membantu menentukan pertanyaan awal.',
          ],
          [
            'Menyiapkan keputusan',
            'Tinjauan dapat menunjukkan dokumen yang dibutuhkan dan hal untuk dibahas sebelum melanjutkan. Deskripsi fiktif ini tidak memastikan kepemilikan, menentukan prosedur transaksi, atau menyatakan kewajiban hukum.',
          ],
        ],
      },
      {
        slug: 'planning',
        title: 'Perencanaan aset & keberlanjutan',
        short: 'Percakapan yang terarah mengenai pengaturan untuk masa depan.',
        intro:
          'Perencanaan dimulai dengan memahami tujuan dan orang-orang yang terkait. Demonstrasi ini menunjukkan cara membuat percakapan tersebut lebih mudah dimulai.',
        work: [
          'Tujuan perencanaan',
          'Penataan informasi aset',
          'Tinjauan pengaturan yang ada',
          'Koordinasi dengan penasihat lain',
        ],
        sections: [
          [
            'Membuat gambaran jelas',
            'Mulai dari ringkasan aset, dokumen terkait, serta orang atau tujuan yang terlibat. Catat ketidakpastian tanpa berasumsi satu pengaturan sesuai untuk semua keadaan.',
          ],
          [
            'Meninjau dari waktu ke waktu',
            'Rencana dapat perlu ditinjau ketika keadaan personal berubah. Pekerjaan nyata memerlukan nasihat tentang hukum, dokumen yang diusulkan, dan masukan profesional terkait.',
          ],
        ],
      },
    ],
    people: [
      {
        slug: 'elena-mahira',
        name: 'Elena Mahira',
        role: 'Partner · Keluarga & keberlanjutan',
        portrait: 'private-person-1',
        intro: 'Profil fiktif yang menunjukkan pendekatan mendengarkan untuk urusan personal.',
        bio: [
          [
            'Percakapan yang saksama',
            'Profil imajiner Elena berfokus pada memahami orang dan keadaan sebelum menjelaskan lingkup pekerjaan.',
          ],
          [
            'Komunikasi yang jelas',
            'Halaman memperlihatkan pengantar tenang, bidang fokus, dan jalur percakapan langsung. Semua nama, jabatan, potret, dan narasi fiktif; tidak ada klaim kredensial profesional.',
          ],
        ],
        focus: ['Urusan keluarga', 'Perencanaan keberlanjutan', 'Pengaturan personal'],
      },
      {
        slug: 'daniel-ardana',
        name: 'Daniel Ardana',
        role: 'Partner · Properti & perencanaan',
        portrait: 'private-person-2',
        intro: 'Profil imajiner profesional yang membantu menata diskusi properti dan perencanaan.',
        bio: [
          [
            'Perspektif praktis',
            'Narasi contoh Daniel menghubungkan keputusan properti dengan tujuannya, catatan terkait, dan pertanyaan yang perlu ditelaah.',
          ],
          [
            'Bekerja bersama',
            'Profil ini memperlihatkan penasihat terkait dan klien dalam satu rencana kerja yang mudah dipahami. Identitas dan biografinya merupakan konten demonstrasi sintetis.',
          ],
        ],
        focus: ['Properti', 'Perencanaan aset', 'Tinjauan dokumen'],
      },
    ],
    articles: [
      {
        slug: 'planning-conversation',
        title: 'Memberi ruang untuk percakapan perencanaan',
        category: 'Perspektif personal',
        image: 'private-hero',
        intro:
          'Percakapan tenang membantu mengubah niat menjadi pertanyaan yang berguna. Artikel fiktif ini bersifat editorial umum, bukan nasihat hukum personal.',
        sections: [
          [
            'Mulai dari hal yang berarti',
            'Jelaskan orang, tujuan, dan kekhawatiran praktis yang ingin didukung rencana. Diskusi pertama tidak harus menetapkan pengaturan akhir. Tujuannya membangun gambaran bersama tentang hal yang perlu dipertimbangkan.',
          ],
          [
            'Menata gambaran saat ini',
            'Kumpulkan catatan pengaturan yang ada dan tandai informasi yang belum lengkap. Ringkasan jelas membuat percakapan dengan penasihat lebih terarah. Catatan yang tepat bergantung pada keadaan.',
          ],
          [
            'Bertanya tanpa berasumsi',
            'Harapan keluarga dan preferensi praktis dapat berbeda. Beri ruang pertanyaan dan jelaskan asumsi di balik rencana. Diskusi sensitif dapat memerlukan tempat dan dukungan profesional tersendiri.',
          ],
          [
            'Membuka ruang peninjauan',
            'Keadaan berubah seiring waktu. Jadwal tinjauan membantu mengetahui kapan nasihat lanjutan dibutuhkan. Artikel ini tidak merekomendasikan dokumen, struktur aset, atau hasil hukum tertentu. Mintalah nasihat sesuai keadaan sebenarnya.',
          ],
        ],
      },
      {
        slug: 'property-questions',
        title: 'Pertanyaan untuk menata diskusi properti',
        category: 'Properti & rumah',
        image: 'library',
        intro:
          'Sebelum meninjau dokumen, pahami keputusan yang didukungnya. Ini pertanyaan ilustratif, bukan daftar transaksi properti nyata.',
        sections: [
          [
            'Menjelaskan tujuan',
            'Apakah diskusi tentang rumah, investasi, pengaturan kepemilikan, atau perubahan baru? Tujuan jelas membantu merumuskan pertanyaan dan orang yang perlu terlibat.',
          ],
          [
            'Mengumpulkan catatan',
            'Identifikasi dokumen yang tersedia beserta tanggal dan sumbernya. Catat informasi yang belum didapat. Ringkasan singkat tidak memastikan kepemilikan atau menjawab pertanyaan yang membutuhkan tinjauan lengkap.',
          ],
          [
            'Membahas harapan praktis',
            'Waktu, penggunaan, tanggung jawab bersama, dan perubahan masa depan dapat memengaruhi diskusi. Catat hal yang disepakati dan yang perlu dipikirkan lagi. Ini cara menata informasi, bukan ketentuan hukum.',
          ],
          [
            'Memilih langkah berguna',
            'Percakapan awal dapat dilanjutkan dengan tinjauan dokumen, pengumpulan informasi, atau nasihat profesional lain. Langkah yang tepat bergantung pada properti, yurisdiksi, dan keadaan. Tidak ada klaim aturan atau hasil transaksi di sini.',
          ],
        ],
      },
    ],
    contactNote:
      'Mulai dari jenis urusan yang ingin dibahas. Simpan rincian pribadi untuk percakapan rahasia. Form ini merupakan demonstrasi lokal.',
  },
};
