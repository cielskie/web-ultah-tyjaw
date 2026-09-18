/**
 * =========================================================================
 * PUSAT PENGATURAN KADO ULANG TAHUN (BIRTHDAY CONFIGURATION)
 * =========================================================================
 * Cukup edit data di file ini jika ingin mengganti nama, ucapan, foto, atau lagu.
 * Tidak perlu mengedit kode komponen JSX yang rumit!
 */


export const birthdayData = {
  // ── Informasi Penerima ──────────────────────────────────────────────────
  recipient: {
    fullName: 'Tyas Diva Syakilla',
    nickname: 'TYJAW',
    shortName: 'Tyjaw',
  },

  // ── Alur Transisi Kata (Stage 3) ────────────────────────────────────────
  // Kata-kata yang akan muncul berurutan dengan efek tipografi romantis
  flow: {
    countdownWords: ['HAPPY', 'BIRTHDAY', 'TO', 'TYJAW', '❤️'],
  },

  // ── PIN Kunci Rahasia (Stage 0) ─────────────────────────────────────────
  pin: '1909', // 19 September

  // ── Surat Ucapan di Kue Ulang Tahun (Stage 4 & 6) ─────────────────────
  letter: {
    title: 'Happy Birthday Sayang!',
    body: `Selamat ulang tahun Sayangku🤍! Ga terasa sekarang udah masuk kepala dua yang makin matang, Semoga di umur yang sekarang ini bisa jadi pribadi yang lebih baik lebih sabar dan kurangin marah marahnya😅, dan semoga semua impian yang di harapkan dan semua yang diusahakan tercapai ya sayang! aku juga minta maaf kalo selama ini masih banyak kurangnya… 

tapii seneng bisa nemenin kamu ngerayain momen bertambahnya usia dari tahun ketahun hehe..

Terima kasih juga ya Tyjaw sudah jadi tempat aku mengeluh setiap hari tempat aku yapping setiap hari, yang selalu sabar, dan jadi alasan buat senyum tiap hari. Apa pun yang terjadi ke depan, tetap jadi diri sendiri yang baik ya. Kalau ada apa-apa, capek, atau lagi pusing, ingat ada aku yang bakal selalu support dari belakang.

Sekali lagi, happy 21st birthday, Tyjaw! Let's make this year our best year yet. I love u so much🤍`,
    longBody: `Selamat ulang tahun Sayangku🤍! Ga terasa sekarang udah masuk kepala dua yang makin matang, Semoga di umur yang sekarang ini bisa jadi pribadi yang lebih baik lebih sabar dan kurangin marah marahnya😅, dan semoga semua impian yang di harapkan dan semua yang diusahakan tercapai ya sayang! aku juga minta maaf kalo selama ini masih banyak kurangnya… 

tapii seneng bisa nemenin kamu ngerayain momen bertambahnya usia dari tahun ketahun hehe..

Terima kasih juga ya Tyjaw sudah jadi tempat aku mengeluh setiap hari tempat aku yapping setiap hari, yang selalu sabar, dan jadi alasan buat senyum tiap hari. Apa pun yang terjadi ke depan, tetap jadi diri sendiri yang baik ya. Kalau ada apa-apa, capek, atau lagi pusing, ingat ada aku yang bakal selalu support dari belakang.

Sekali lagi, happy 21st birthday, Tyjaw! Let's make this year our best year yet. I love u so much🤍`,
  },

  // ── Audio / Musik Latar ────────────────────────────────────────────────
  audio: {
    src: '/music.mp3', // File berada di folder public/music.mp3
    title: 'Moments Tyjaw',
  },

  // ── Pesan Romantis di Atas Buku Foto (Stage 5 Scrapbook) ──────────────
  // Ditampilkan dengan efek ketik (typewriter) dari kiri ke kanan per halaman/spread
  photoBookQuotes: [
    "Happy birthday to my favorite person in the world.",
    "Every single day with you is my favorite memory.",
    "Your smile has always been the warmest place to be.",
    "Thank you for being you, and for choosing me.",
    "I love you more than words could ever explain.",
  ],

  // ── Koleksi Foto Galeri Hati (Stage 5) ──────────────────────────────────
  // Kamu bisa mengganti URL foto dengan link gambar lain atau foto lokal di folder public/
  gallery: [
    {
      id: 1,
      url: '/user-photos/photobook1.jpeg',
      title: 'Momen Berdua',
      caption: 'Setiap momen bersamamu adalah kenangan terindah.',
    },
    {
      id: 2,
      url: '/user-photos/photobook2.jpeg',
      title: 'Senyum Tyjaw',
      caption: 'Senyumanmu selalu jadi alasan aku bahagia.',
    },
    {
      id: 3,
      url: '/user-photos/photobook3.jpeg',
      title: 'Kebersamaan',
      caption: 'Bersamamu adalah tempatku pulang.',
    },
    {
      id: 4,
      url: '/user-photos/photobook4.jpeg',
      title: 'Kenangan Manis',
      caption: 'Setiap detik bersamamu terasa berharga.',
    },
    {
      id: 5,
      url: '/user-photos/photobook5.jpeg',
      title: 'Cerita Kita',
      caption: 'Kisah kita penuh dengan tawa dan cinta.',
    },
    {
      id: 6,
      url: '/user-photos/photobook6.jpeg',
      title: 'Hari Indah',
      caption: 'Hari-hari bersamamu selalu terasa hangat.',
    },
    {
      id: 7,
      url: '/user-photos/photobook7.jpeg',
      title: 'Cinta Sejati',
      caption: 'Cintaku untukmu takkan pernah berubah.',
    },
    {
      id: 8,
      url: '/user-photos/photobook8.jpeg',
      title: 'Happy Birthday Sayang',
      caption: 'Happy 21st birthday, Tyjaw! I love u so much 🤍',
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&h=560&q=80',
      title: 'Langkah Bersama',
      caption: 'Menatap masa depan dengan penuh rasa optimis dan cinta.',
    },
    {
      id: 10,
      url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&h=560&q=80',
      title: 'Kenangan Abadi',
      caption: 'Momen-momen indah yang akan selalu tersimpan erat di hati.',
    },
    {
      id: 11,
      url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&h=560&q=80',
      title: 'Hari Spesial Anita',
      caption: 'Semoga selalu diberikan kebahagiaan dan kesehatan terindah.',
    },
    {
      id: 12,
      url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&h=560&q=80',
      title: 'Senyuman Manis',
      caption: 'Kebahagiaanmu adalah prioritas utamaku.',
    },
    {
      id: 13,
      url: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&h=560&q=80',
      title: 'Cinta Sejati',
      caption: 'Setiap detik bersamamu adalah anugerah.',
    },
    {
      id: 14,
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=560&q=80',
      title: 'Kisah Manis',
      caption: 'Terima kasih telah hadir dalam hidupku.',
    },
    {
      id: 15,
      url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&h=560&q=80',
      title: 'Pelukan Hangat',
      caption: 'Kehangatan yang tak akan pernah tergantikan.',
    },
    {
      id: 16,
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&h=560&q=80',
      title: 'Abadi Berdua',
      caption: 'Selamanya dalam cinta dan kebahagiaan.',
    },
    {
      id: 17,
      url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=400&h=560&q=80',
      title: 'Indahnya Cinta',
      caption: 'Bersamamu adalah tempat terbaik untuk pulang.',
    },
    {
      id: 18,
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=560&q=80',
      title: 'Senyuman Indah',
      caption: 'Cahaya dalam setiap hariku.',
    },
    {
      id: 19,
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400&h=560&q=80',
      title: 'Masa Depan Bersama',
      caption: 'Saling melengkapi satu sama lain.',
    },
    {
      id: 20,
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=400&h=560&q=80',
      title: 'Kebersamaan',
      caption: 'Momen berharga yang selalu dikenang.',
    },
    {
      id: 21,
      url: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=400&h=560&q=80',
      title: 'Sentuhan Cinta',
      caption: 'Cinta yang tak bertepi.',
    },
    {
      id: 22,
      url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&h=560&q=80',
      title: 'Kasih Sayang',
      caption: 'Terukir dalam kenangan selamanya.',
    },
  ],
};

export default birthdayData;
