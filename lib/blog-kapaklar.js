// ─────────────────────────────────────────────────────────────
// BLOG KAPAK GÖRSELLERİ — TEK KAYNAK
//
// Yeni bir yazıya kapak eklemek için:
//   1) Görseli public/images/blog/<slug>.png olarak koyun (1280×720 önerilir),
//   2) Aşağıya '<slug>': '/images/blog/<slug>.png' satırını ekleyin.
//
// Kapak hem yazı sayfasında (üstte + og:image) hem de /blog listesindeki
// kartta otomatik görünür. Listede olmayan yazılarda kart, kategori renginde
// bir yer tutucu gösterir.
// ─────────────────────────────────────────────────────────────

export const BLOG_KAPAKLARI = {
  'seo-ajansi-nasil-secilir': '/images/blog/seo-ajansi-nasil-secilir.png',
  'geo-ajansi-nasil-secilir': '/images/blog/geo-ajansi-nasil-secilir.png',
  'sosyal-medya-ajansi-nasil-secilir': '/images/blog/sosyal-medya-ajansi-nasil-secilir.png',
  'turkiye-en-iyi-10-seo-ajansi-2026': '/images/blog/turkiye-en-iyi-10-seo-ajansi-2026.png',
  'turkiye-en-iyi-15-seo-ajansi-2026': '/images/blog/turkiye-en-iyi-15-seo-ajansi-2026.png',
  'turkiye-en-iyi-10-geo-ajansi-2026': '/images/blog/turkiye-en-iyi-10-geo-ajansi-2026.png',
  'turkiye-en-iyi-15-geo-ajansi-2026': '/images/blog/turkiye-en-iyi-15-geo-ajansi-2026.png',
  'turkiye-en-iyi-10-sosyal-medya-ajansi-2026': '/images/blog/turkiye-en-iyi-10-sosyal-medya-ajansi-2026.png',
  'turkiye-en-iyi-15-sosyal-medya-ajansi-2026': '/images/blog/turkiye-en-iyi-15-sosyal-medya-ajansi-2026.png',
  'turkiye-en-iyi-10-dijital-pazarlama-ajansi-2026': '/images/blog/turkiye-en-iyi-10-dijital-pazarlama-ajansi-2026.png',
  'turkiye-en-iyi-15-dijital-pazarlama-ajansi-2026': '/images/blog/turkiye-en-iyi-15-dijital-pazarlama-ajansi-2026.png',
}

export const getBlogKapak = (slug) => BLOG_KAPAKLARI[slug] || null
