/**
 * Bank Soal Edukatif Ular Tangga - Khusus Siswa MAN (Madrasah Aliyah Negeri)
 * Topik:
 * 1. Al-Qur'an Hadits
 * 2. Akidah Akhlak
 * 3. Fikih & Muamalah
 * 4. Sejarah Kebudayaan Islam (SKI)
 * 5. Bahasa Arab Dasar
 * 6. Pengetahuan Umum & Sains Islam
 */

export const initialQuestions = [
  // AL-QUR'AN HADITS
  {
    id: 1,
    category: "Al-Qur'an Hadits",
    question: "Dalam ilmu Tajwid, apabila nun sukun (نْ) atau tanwin bertemu dengan huruf Ra (ر) atau Lam (ل), maka hukum bacaannya adalah...",
    options: [
      "Iqlab",
      "Idgham Bighunnah",
      "Idgham Bilaghunnah",
      "Ikhfa Haqiqi"
    ],
    answerIndex: 2,
    explanation: "Idgham Bilaghunnah terjadi jika nun sukun atau tanwin bertemu huruf Lam (ل) atau Ra (ر), dibaca lebur tanpa mendengung."
  },
  {
    id: 2,
    category: "Al-Qur'an Hadits",
    question: "Surah Al-Hujurat ayat 13 menegaskan bahwa manusia diciptakan berbangsa-bangsa dan bersuku-suku dengan tujuan utama untuk...",
    options: [
      "Saling bersaing kekayaan",
      "Saling mengenal dan memahami (Lita'arafu)",
      "Menunjukkan keunggulan ras masing-masing",
      "Membentuk aliansi militer dunia"
    ],
    answerIndex: 1,
    explanation: "Potongan ayat 'li-ta'aarafuu' berarti 'agar kamu saling mengenal', mendorong toleransi dan persaudaraan lintas bangsa."
  },
  {
    id: 3,
    category: "Al-Qur'an Hadits",
    question: "Hadits yang diriwayatkan oleh perawi yang adil, kuat ingatannya (dhabit), sanadnya bersambung, tidak ada cacat ('illat), dan tidak janggal (syadz) disebut hadits...",
    options: [
      "Maudhu'",
      "Dha'if",
      "Hasan Lighairihi",
      "Shahih"
    ],
    answerIndex: 3,
    explanation: "Kelima syarat tersebut merupakan definisi standar dari Hadits Shahih menurut para ulama muhadditsin."
  },
  {
    id: 4,
    category: "Al-Qur'an Hadits",
    question: "Hukum bacaan Mad yang terjadi karena adanya huruf Mad bertemu dengan huruf berharakat sukun asli dalam satu kata dan dibaca 6 harakat disebut...",
    options: [
      "Mad Lazim Kilmi Mutsaqqal",
      "Mad Lazim Kilmi Mukhaffaf",
      "Mad 'Aridh Lissukun",
      "Mad Jaiz Munfashil"
    ],
    answerIndex: 1,
    explanation: "Mad Lazim Kilmi Mukhaffaf terjadi bila huruf mad bertemu huruf bersukun asli tanpa tasydid, contohnya pada lafaz 'Aal-aana' di Surah Yunus."
  },
  {
    id: 5,
    category: "Al-Qur'an Hadits",
    question: "Menurut hadits riwayat Bukhari dan Muslim, amal yang paling dicintai Allah setelah shalat tepat pada waktunya adalah...",
    options: [
      "Mencari harta melimpah",
      "Berbakti kepada kedua orang tua (Birrul Walidain)",
      "Berpuasa sunnah sepanjang tahun",
      "Menuntut ilmu ke luar negeri"
    ],
    answerIndex: 1,
    explanation: "Rasulullah SAW menjawab: 'Shalat pada waktunya, kemudian berbakti kepada kedua orang tua, lalu jihad fi sabilillah'."
  },

  // AKIDAH AKHLAK
  {
    id: 6,
    category: "Akidah Akhlak",
    question: "Sifat wajib bagi Allah 'Mukhalafatuhu lil hawaditsi' memiliki makna bahwa Allah...",
    options: [
      "Berdiri sendiri tanpa butuh bantuan",
      "Maha Mendengar segala suara",
      "Berbeda dengan segala makhluk ciptaan-Nya",
      "Maha Kekal tanpa permulaan dan akhir"
    ],
    answerIndex: 2,
    explanation: "Mukhalafatuhu lil hawaditsi berarti berbeda dengan segala yang baru (makhluk). Allah tidak serupa dengan apapun."
  },
  {
    id: 7,
    category: "Akidah Akhlak",
    question: "Sikap pertengahan, adil, seimbang, dan tidak ekstrem dalam memahami ajaran agama dikenal dalam nilai moderasi beragama sebagai...",
    options: [
      "Tasamuh",
      "Tawassuth",
      "Ta'aruf",
      "Tafakkur"
    ],
    answerIndex: 1,
    explanation: "Tawassuth bermakna mengambil jalan tengah (moderat), tidak condong ke ekstrem kanan maupun ekstrem kiri."
  },
  {
    id: 8,
    category: "Akidah Akhlak",
    question: "Sikap menerima dengan ikhlas serta merasa cukup atas rezeki halal yang telah dianugerahkan Allah SWT disebut...",
    options: [
      "Qana'ah",
      "Raja'",
      "Khauf",
      "Istiqamah"
    ],
    answerIndex: 0,
    explanation: "Qana'ah adalah sifat terpuji rela menerima apa adanya dan bersyukur atas ketentuan rezeki dari Allah SWT."
  },
  {
    id: 9,
    category: "Akidah Akhlak",
    question: "Menampilkan perbuatan ibadah dengan tujuan agar dilihat, dipuji, atau disanjung oleh manusia lain termasuk penyakit hati yaitu...",
    options: [
      "Sum'ah",
      "Ujub",
      "Riya'",
      "Hasad"
    ],
    answerIndex: 2,
    explanation: "Riya' berasal dari kata 'ra'aa' (melihat), yaitu melakukan amalan agar dipuji atau dilihat oleh orang lain."
  },
  {
    id: 10,
    category: "Akidah Akhlak",
    question: "Al-Asmaul Husna 'Al-Adl' menunjukkan bahwa Allah Maha Adil. Contoh penerapan sifat ini dalam kehidupan siswa madrasah adalah...",
    options: [
      "Membagi tugas kelompok secara merata dan proporsional",
      "Memilih teman hanya yang satu suku",
      "Mengambil keputusan berdasarkan perasaan sepihak",
      "Mendiamkan kecurangan saat ujian"
    ],
    answerIndex: 0,
    explanation: "Berlaku adil berarti menempatkan sesuatu pada tempatnya dan memperlakukan sesama secara proporsional dan bijaksana."
  },

  // FIKIH & MUAMALAH
  {
    id: 11,
    category: "Fikih",
    question: "Salah satu syarat diperbolehkannya seorang musafir menjamak dan meng-qashar shalat fardhu adalah jarak perjalanan minimal mencapai...",
    options: [
      "1 marhalah (sekitar 20 km)",
      "2 marhalah (sekitar 80-89 km)",
      "4 marhalah (sekitar 180 km)",
      "Bebas tanpa batasan jarak"
    ],
    answerIndex: 1,
    explanation: "Jarak minimal masafatul qashr menurut mayoritas ulama adalah 2 marhalah atau kira-kira 80,64 km hingga 88,7 km."
  },
  {
    id: 12,
    category: "Fikih",
    question: "Dalam transaksi jual beli online (e-commerce), akad pemesanan barang dengan kriteria jelas dan pembayaran dilakukan di awal disebut akad...",
    options: [
      "Murabahah",
      "Ijarah",
      "Salam atau Istishna'",
      "Mudharabah"
    ],
    answerIndex: 2,
    explanation: "Akad Salam adalah jual beli barang pesanan dengan spesifikasi tertentu yang pembayarannya dilunasi di awal."
  },
  {
    id: 13,
    category: "Fikih",
    question: "Nisab zakat mal untuk emas adalah 85 gram dengan haul satu tahun. Persentase zakat yang wajib dikeluarkan adalah sebesar...",
    options: [
      "1,5%",
      "2,5%",
      "5%",
      "10%"
    ],
    answerIndex: 1,
    explanation: "Kadar zakat emas dan perak serta harta simpanan yang mencapai nisab dan haul adalah 2,5% (seperempat puluh)."
  },
  {
    id: 14,
    category: "Fikih",
    question: "Kerjasama usaha antara pemilik modal (shahibul mal) dan pengelola modal (mudharib) dengan nisbah bagi hasil yang disepakati disebut...",
    options: [
      "Musyarakah",
      "Mudharabah",
      "Wadi'ah",
      "Rahn"
    ],
    answerIndex: 1,
    explanation: "Mudharabah adalah kemitraan di mana satu pihak menyediakan 100% modal dan pihak lain bertindak sebagai pengelola profesional."
  },
  {
    id: 15,
    category: "Fikih",
    question: "Batas waktu sah penyembelihan hewan kurban (Udh-hiyah) adalah sejak selesai shalat Idul Adha sampai terbenam matahari pada...",
    options: [
      "Hari Tasyrik pertama (11 Dzulhijjah)",
      "Hari Tasyrik kedua (12 Dzulhijjah)",
      "Akhir hari Tasyrik (13 Dzulhijjah)",
      "Akhir bulan Dzulhijjah"
    ],
    answerIndex: 2,
    explanation: "Waktu kurban berlangsung selama 4 hari: Hari Nahar (10 Dzulhijjah) dan tiga hari Tasyrik (11, 12, 13 Dzulhijjah)."
  },

  // SEJARAH KEBUDAYAAN ISLAM (SKI)
  {
    id: 16,
    category: "Sejarah Kebudayaan Islam",
    question: "Khalifah yang memprakarsai pembukuan dan standardisasi Mushaf Al-Qur'an resmi menjadi rujukan umat Islam adalah...",
    options: [
      "Abu Bakar Ash-Shiddiq",
      "Umar bin Khattab",
      "Utsman bin Affan",
      "Ali bin Abi Thalib"
    ],
    answerIndex: 2,
    explanation: "Khalifah Utsman bin Affan membentuk panitia penulisan Al-Qur'an yang diketuai Zaid bin Tsabit dan melahirkan Mushaf Utsmani."
  },
  {
    id: 17,
    category: "Sejarah Kebudayaan Islam",
    question: "Lembaga penerjemahan dan perpustakaan megah pusat keilmuan peradaban Islam di Baghdad pada masa Dinasti Abbasiyah bernama...",
    options: [
      "Baitul Mal",
      "Baitul Hikmah",
      "Darul Arqam",
      "Majelis Syura"
    ],
    answerIndex: 1,
    explanation: "Baitul Hikmah didirikan oleh Khalifah Harun Ar-Rasyid dan berkembang pesat pada era Khalifah Al-Ma'mun sebagai pusat riset dunia."
  },
  {
    id: 18,
    category: "Sejarah Kebudayaan Islam",
    question: "Salah satu anggota Walisongo yang terkenal menyebarkan Islam di Jawa melalui media wayang kulit dan tembang Ilir-Ilir adalah...",
    options: [
      "Sunan Giri",
      "Sunan Kalijaga",
      "Sunan Ampel",
      "Sunan Gresik"
    ],
    answerIndex: 1,
    explanation: "Sunan Kalijaga (Raden Said) menggunakan pendekatan budaya Jawa seperti wayang, gamelan, dan tembang suluk yang sarat nilai tauhid."
  },
  {
    id: 19,
    category: "Sejarah Kebudayaan Islam",
    question: "Piagam Madinah (Shahifatul Madinah) yang dirumuskan oleh Nabi Muhammad SAW merupakan tonggak konstitusi modern pertama karena...",
    options: [
      "Hanya melindungi hak umat Islam saja",
      "Mengakui kesetaraan hak, persatuan, dan kebebasan beragama warga Madinah",
      "Membubarkan suku-suku Arab yang ada",
      "Mewajibkan seluruh penduduk Madinah untuk berperang"
    ],
    answerIndex: 1,
    explanation: "Piagam Madinah menjamin perlindungan hukum, toleransi antar-agama, dan persatuan warga Madinah sebagai satu kesatuan umat/bangsa."
  },
  {
    id: 20,
    category: "Sejarah Kebudayaan Islam",
    question: "Ibukota kekhalifahan Dinasti Umayyah yang berkembang pesat menjadi pusat arsitektur dan kebudayaan Islam di Syam adalah kota...",
    options: [
      "Kufah",
      "Damaskus",
      "Kairo",
      "Kordoba"
    ],
    answerIndex: 1,
    explanation: "Muawiyah bin Abi Sufyan memindahkan pusat pemerintahan Dinasti Umayyah dari Madinah/Kufah ke Damaskus (Suriah)."
  },

  // BAHASA ARAB DASAR
  {
    id: 21,
    category: "Bahasa Arab",
    question: "Kata ganti (Dhamir) dalam Bahasa Arab untuk orang ketiga jamak laki-laki ('mereka laki-laki') adalah...",
    options: [
      "Antum (أَنْتُمْ)",
      "Nahnu (نَحْنُ)",
      "Hum (هُمْ)",
      "Hunna (هُنَّ)"
    ],
    answerIndex: 2,
    explanation: "'Hum' (هُمْ) adalah dhamir munfashil untuk jamak mudzakkar ghaib (mereka laki-laki)."
  },
  {
    id: 22,
    category: "Bahasa Arab",
    question: "Arti dari kosakata Bahasa Arab 'الْمَدْرَسَةُ الثَّانَوِيَّةُ الإِسْلاَمِيَّةُ' (Al-Madrasatu Ats-Tsanawiyyatu Al-Islamiyyah) adalah...",
    options: [
      "Madrasah Ibtidaiyah",
      "Madrasah Tsanawiyah (SMP)",
      "Madrasah Aliyah (SMA/MA)",
      "Perguruan Tinggi Islam"
    ],
    answerIndex: 2,
    explanation: "Dalam jenjang pendidikan Kementerian Agama, Madrasah Tsanawiyyah Al-Islamiyyah setara dengan Madrasah Aliyah (jenjang SLTA)."
  },
  {
    id: 23,
    category: "Bahasa Arab",
    question: "Fi'il yang menunjukkan perbuatan yang sedang berlangsung atau akan datang dalam tata bahasa Arab disebut...",
    options: [
      "Fi'il Madhi",
      "Fi'il Mudhari'",
      "Fi'il Amr",
      "Isim Fa'il"
    ],
    answerIndex: 1,
    explanation: "Fi'il Mudhari' menunjukkan perbuatan yang menunjukkan waktu sekarang (hal) atau masa mendatang (istiqbal)."
  },
  {
    id: 24,
    category: "Bahasa Arab",
    question: "Lawan kata (Antonim) dari kata 'كَبِيْرٌ' (Kabiirun / besar) dalam bahasa Arab adalah...",
    options: [
      "طَوِيْلٌ (Thawiilun)",
      "صَغِيْرٌ (Shaghiirun)",
      "قَصِيْرٌ (Qashiirun)",
      "جَمِيْلٌ (Jamiilun)"
    ],
    answerIndex: 1,
    explanation: "'Shaghiirun' (صغير) artinya kecil, merupakan antonim dari 'kabiirun' (كبير) yang artinya besar."
  },

  // PENGETAHUAN UMUM & SAINS ISLAM
  {
    id: 25,
    category: "Pengetahuan Umum & Sains",
    question: "Ilmuwan muslim abad pertengahan yang dikenal sebagai 'Bapak Kedokteran Modern' dan penulis karya monumental 'Al-Qanun fi at-Tibb' adalah...",
    options: [
      "Al-Farabi",
      "Ibnu Sina (Avicenna)",
      "Al-Ghazali",
      "Jabir bin Hayyan"
    ],
    answerIndex: 1,
    explanation: "Ibnu Sina menulis 'The Canon of Medicine' yang menjadi buku rujukan utama fakultas kedokteran di Eropa selama ratusan tahun."
  },
  {
    id: 26,
    category: "Pengetahuan Umum & Sains",
    question: "Al-Khawarizmi adalah ilmuwan muslim terkemuka penemu konsep angka nol dalam matematika dan penemu cabang ilmu...",
    options: [
      "Geometri Fraktal",
      "Aljabar dan Algoritma",
      "Kalkulus Integral",
      "Teori Relativitas"
    ],
    answerIndex: 1,
    explanation: "Karya Al-Khawarizmi 'Al-Kitab al-Mukhtasar fi Hisab al-Jabr wal-Muqabala' melahirkan istilah Aljabar dan nama beliau diabadikan sebagai Algoritma."
  },
  {
    id: 27,
    category: "Pengetahuan Umum & Sains",
    question: "Motto Kementerian Agama Republik Indonesia yang selalu tertera pada logo resmi madrasah adalah...",
    options: [
      "Tut Wuri Handayani",
      "Ikhlas Beramal",
      "Bhinneka Tunggal Ika",
      "Cerdas Berakhlak"
    ],
    answerIndex: 1,
    explanation: "Semboyan Kementerian Agama RI dan Madrasah adalah 'Ikhlas Beramal', mencerminkan dedikasi pengabdian tulus."
  },
  {
    id: 28,
    category: "Pengetahuan Umum & Sains",
    question: "Tokoh muslim penemu optik modern dan penulis kitab 'Al-Manazir' yang meletakkan dasar kerja kamera adalah...",
    options: [
      "Ibnu Al-Haitsam (Alhazen)",
      "Ibnu Rusyd (Averroes)",
      "Al-Kindi",
      "Al-Battani"
    ],
    answerIndex: 0,
    explanation: "Ibnu Al-Haitsam membedah fungsi penglihatan dan refraksi cahaya serta membuat prinsip kamera obskura pertama di dunia."
  },
  {
    id: 29,
    category: "Pengetahuan Umum & Sains",
    question: "Lembaga negara di Indonesia yang bertugas menguji dan menerbitkan fatwa kehalalan produk pangan, obat, dan kosmetik adalah...",
    options: [
      "Badan POM",
      "Komisi Fatwa Majelis Ulama Indonesia (MUI)",
      "Badan Amil Zakat Nasional (BAZNAS)",
      "Dewan Perwakilan Daerah (DPD)"
    ],
    answerIndex: 1,
    explanation: "Ketetapan kehalalan produk secara syar'i dikeluarkan oleh Komisi Fatwa MUI setelah diaudit oleh LPPOM MUI / BPJPH."
  },
  {
    id: 30,
    category: "Pengetahuan Umum & Sains",
    question: "Dalam taksonomi sains biologi, makhluk hidup dikelompokkan ke dalam 5 Kingdom utama. Salah satu ilmuwan biologi muslim perintis studi botani farmasi adalah...",
    options: [
      "Ibnu Al-Baitar",
      "Ibnu Khaldun",
      "Al-Jahiz",
      "Umar Khayyam"
    ],
    answerIndex: 0,
    explanation: "Ibnu Al-Baitar mengklasifikasikan lebih dari 1.400 jenis tumbuhan berkhasiat obat dalam karyanya 'Al-Jami' li-Mufradat al-Adwiya wal-Aghdhiya'."
  }
];

export const CATEGORIES = [
  "Semua Kategori",
  "Al-Qur'an Hadits",
  "Akidah Akhlak",
  "Fikih",
  "Sejarah Kebudayaan Islam",
  "Bahasa Arab",
  "Pengetahuan Umum & Sains"
];
