import ching1 from "../assets/ching.png";
import ching2 from "../assets/ching2.png";

// Konfigurasi Cerita & Konten (Bahasa Indonesia)
// Kamu bisa mengubah foto, teks, dan pesan langsung di sini!

export const storyData = {
  recipientName: "Ching Sioe",
  nicknames: ["Ching", "Ching Sioe"],
  birthDate: "Hari Ini",

  opening: {
    sequence: [
      "hai...",
      "sebelum kamu melanjutkan,",
      "luangkan waktu sejenak ya.",
    ],
    buttonText: "masuk ✦",
    hint: "lebih berkesan jika didengarkan dengan earphone 🎧",
  },

  intro: {
    preTitle: "khusus untuk seseorang yang istimewa",
    name: "Ching Sioe",
    line1: "hari ini bukan sekadar hari biasa.",
    line2: "karena di hari ini, seseorang yang begitu luar biasa lahir ke dunia.",
    subtext: "gulir perlahan ke bawah ya...",
  },

  memoriesHeader: {
    badge: "Tentang Dirimu ✦",
    title: "Di Setiap Sudut Pandang",
    subtitle: "catatan kecil tentang betapa keren, hebat, dan mengagumkannya kamu di mataku.",
  },

  memories: [
    {
      id: 1,
      number: "01",
      image: ching1,
      caption: "kamu selalu punya aura keren dan tangguh.",
      subCaption: "mandiri, berdedikasi tinggi, dan selalu berani melangkah.",
      date: "Sosok yang Hebat",
      fullStory: "Setiap kali memperhatikan caramu bekerja dan menyelesaikan berbagai tantangan, aku selalu kagum. Kamu adalah orang yang berprinsip, pekerja keras, dan punya pesona tersendiri yang membuat siapapun hormat padamu.",
      rotation: -2,
    },
    {
      id: 2,
      number: "02",
      image: ching2,
      caption: "dan di balik ketegasanmu, selalu terpancar ketulusan yang luar biasa.",
      subCaption: "sosok yang istimewa, membumi, dan selalu menginspirasi.",
      date: "Inspirasi Nyata",
      fullStory: "Nggak banyak orang yang bisa tetap rendah hati, hangat, dan bersinar terang di saat yang bersamaan. Melihatmu terus bertumbuh dan melangkah maju adalah hal yang selalu membuatku bangga dan kagum.",
      rotation: 2,
    },
  ],

  qualities: {
    title: "hal-hal yang kusuka tentangmu",
    subtitle: "mungkin ada seribu hal baik yang bisa kuceritakan tentangmu.",
    items: [
      {
        icon: "Sparkles",
        tag: "✦",
        highlight: "kamu itu pekerja keras",
        description: "bahkan saat keadaan terasa berat atau melelahkan, kamu selalu berusaha melangkah maju dengan penuh keanggunan.",
      },
      {
        icon: "Heart",
        tag: "✦",
        highlight: "kamu itu tulus dan baik hati",
        description: "dalam cara yang tenang dan bersahaja, membuat orang di sekitarmu merasa nyaman, aman, dan dihargai.",
      },
      {
        icon: "Smile",
        tag: "✦",
        highlight: "kamu kadang suka aneh dan lucu",
        description: "keanehan yang menyenangkan—selalu membawa tawa spontan yang bikin suasana canggung jadi hangat.",
      },
      {
        icon: "Sun",
        tag: "✦",
        highlight: "kamu bikin hari-hari biasa terasa nggak biasa",
        description: "kehadiranmu saja sudah cukup untuk mengubah rutinitas yang membosankan jadi sesuatu yang berkesan.",
      },
      {
        icon: "Star",
        tag: "✦",
        highlight: "dan yang terpenting...",
        description: "dari semua kebaikan dan keunikan yang kamu punya...",
      },
      {
        icon: "Moon",
        tag: "✦",
        highlight: "kamu adalah kamu.",
        description: "seorang Ching Sioe yang tak tergantikan, unik apa adanya, dan itulah hal yang paling istimewa.",
      },
    ],
  },

  gift: {
    heading: "ada sebuah kejutan kecil untukmu",
    subheading: "ketuk atau klik pita untuk membuka kotak kado",
    unwrappedTag: "kamu berhasil membukanya!",
    message: {
      title: "doa & kejutan ulang tahunmu",
      body: "Semoga di usiamu yang baru ini, semesta memelukmu dengan hal-hal baik: pagi yang tenang, kebahagiaan-kebahagiaan kecil yang tak terduga, kedamaian hati, dan keberanian untuk meraih apapun yang kamu impikan. Kamu pantas dirayakan setiap hari.",
      signature: "dengan segenap doa hangat ♡",
    },
  },

  letter: {
    greeting: "Untuk Ching,",
    paragraphs: [
      "Aku rasa kata-kata tidak akan pernah benar-benar cukup untuk menggambarkan betapa berharganya dirimu.",
      "Bertambahnya usia berarti terbukanya lembaran baru yang dipenuhi harapan-harapan baru, petualangan baru, dan cerita-cerita indah yang menanti untuk ditulis. Hidup mungkin punya pasang surutnya, tapi caramu menghadapinya dengan tegar selalu membuatku kagum.",
      "Terima kasih sudah menjadi pribadi yang begitu tulus, hangat, dan menyenangkan. Untuk setiap obrolan kecil, tawa bersama, dan kenyamanan yang kamu hadirkan bahkan tanpa kamu sadari.",
      "Aku berharap di tahun ini, kamu menemukan kedamaian yang kamu cari, dipertemukan dengan momen-momen yang membuat hatimu berbunga-bunga, dan tidak pernah lupa betapa berartinya kehadiranmu.",
      "Selamat ulang tahun, Ching. Semoga semesta selalu bersikap lembut dan baik kepadamu.",
    ],
    closing: "Selalu mendoakan yang terbaik untukmu,",
    sender: "Seseorang yang peduli padamu",
  },

  // Konfirmasi pengiriman paket kado fisik
  delivery: {
    badge: "di luar layar ini 📦",
    heading: "Ada Satu Hal Kecil Lagi...",
    paragraphs: [
      "Ada satu hal kecil lagi yang ingin kusampaikan.",
      "Selain website cerita ini, aku sebenarnya sudah menyiapkan sebuah kado kecil untukmu. Bukan sesuatu yang mewah atau heboh — hanya kado sederhana, tapi aku benar-benar berharap ini bisa menemanimu beristirahat dan membuatmu sedikit tersenyum setelah seharian lelah beraktivitas.",
    ],
    question: "Bolehkah aku kirim paket kado ini ke tempatmu nanti setelah kamu pulang kerja?",
    subQuestion: "Tenang saja, sama sekali nggak akan mengganggu waktu istirahatmu kok.",

    // Ganti dengan nomor WhatsApp kamu (awalan 62 tanpa tanda +)
    whatsappNumber: "62859175756451",

    options: {
      accept: {
        id: "accept",
        label: "Boleh banget, kirim aja! ✦",
        subLabel: "Senang sekali mendengarnya!",
        responseTitle: "Yay! Terima kasih banyak ✨",
        responseText: "Nanti kabari kalau kamu sudah sampai di rumah dan sudah santai ya. Paketnya bakal langsung meluncur ke tempatmu.",
        waButtonText: "Kirim Pesan Konfirmasi via WhatsApp",
        waMessageTemplate: "Hai! Aku udah buka dan baca webnya... Boleh banget kok kirim paket kadonya ke tempatku setelah pulang kerja nanti 😊✨",
      },
      later: {
        id: "later",
        label: "Kabari aku dulu ya nanti",
        subLabel: "Santai saja, no pressure sama sekali.",
        responseTitle: "Siap, take your time! 🌙",
        responseText: "Nanti kita atur waktu yang paling pas dan nyaman buat kamu ya. Yang terpenting hari ini kamu bisa istirahat dengan nyenyak.",
        waButtonText: "Kasih Tahu via WhatsApp",
        waMessageTemplate: "Hai! Makasih banyak ya buat web dan kadonya, manis banget. Nanti kabari aku lagi ya soal paketnya!",
      },
    },
  },

  wish: {
    title: "sebelum kamu beranjak...",
    prompt: "panjatkan sebuah harapan.",
    candlePrompt: "ketuk lilin untuk meniup apinya 🕯️",
    candleBlownText: "apinya sudah padam... sekarang ucapkan harapanmu",
    placeholder: "tulis doa dan harapan rahasiamu untuk tahun ini...",
    button: "PANJATKAN HARAPAN ✦",
    climaxResponse: "Semoga tahun ini memberimu lebih banyak alasan untuk tersenyum.",
    subResponse: "Harapanmu telah diterbangkan bersama bintang-bintang ✨",
  },

  ending: {
    symbol: "✦",
    lines: [
      "sampai di sini dulu ya.",
      "untuk saat ini.",
    ],
    symbol2: "✦",
    birthdayLine1: "selamat ulang tahun,",
    birthdayName: "Ching Sioe.",
    birthdayLine2: "tetaplah menjadi",
    birthdayLine3: "dirimu yang luar biasa.",
    heart: "♡",
    replayButton: "ulangi cerita dari awal",
  },

  // Audio track ambient piano lembut
  audio: {
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=piano-moment-9835.mp3",
    title: "Piano Lembut",
  },
};
