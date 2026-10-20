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
  'dijital-pazarlama-ajansi-nasil-secilir': '/images/blog/dijital-pazarlama-ajansi-nasil-secilir.png',
  'turkiye-en-iyi-10-seo-ajansi-2026': '/images/blog/turkiye-en-iyi-10-seo-ajansi-2026.png',
  'turkiye-en-iyi-15-seo-ajansi-2026': '/images/blog/turkiye-en-iyi-15-seo-ajansi-2026.png',
  'turkiye-en-iyi-10-geo-ajansi-2026': '/images/blog/turkiye-en-iyi-10-geo-ajansi-2026.png',
  'turkiye-en-iyi-15-geo-ajansi-2026': '/images/blog/turkiye-en-iyi-15-geo-ajansi-2026.png',
  'turkiye-en-iyi-10-sosyal-medya-ajansi-2026': '/images/blog/turkiye-en-iyi-10-sosyal-medya-ajansi-2026.png',
  'turkiye-en-iyi-15-sosyal-medya-ajansi-2026': '/images/blog/turkiye-en-iyi-15-sosyal-medya-ajansi-2026.png',
  'turkiye-en-iyi-10-dijital-pazarlama-ajansi-2026': '/images/blog/turkiye-en-iyi-10-dijital-pazarlama-ajansi-2026.png',
  'turkiye-en-iyi-15-dijital-pazarlama-ajansi-2026': '/images/blog/turkiye-en-iyi-15-dijital-pazarlama-ajansi-2026.png',
  // Ekim 2026 (2. dalga) — tools/kapak_uret.py ile üretildi
  '301-302-yonlendirme': '/images/blog/301-302-yonlendirme.png',
  'anchor-text': '/images/blog/anchor-text.png',
  'black-friday-seo': '/images/blog/black-friday-seo.png',
  'chatgpt-ile-seo': '/images/blog/chatgpt-ile-seo.png',
  'content-pruning': '/images/blog/content-pruning.png',
  'crawl-butcesi': '/images/blog/crawl-butcesi.png',
  'cro-ve-seo': '/images/blog/cro-ve-seo.png',
  'e-ticaret-urun-aciklamasi': '/images/blog/e-ticaret-urun-aciklamasi.png',
  'eeat-icin-icerik': '/images/blog/eeat-icin-icerik.png',
  'entity-seo': '/images/blog/entity-seo.png',
  'featured-snippet-serp-ozellikleri': '/images/blog/featured-snippet-serp-ozellikleri.png',
  'ga4-seo-takibi': '/images/blog/ga4-seo-takibi.png',
  'google-ads-butce-optimizasyonu': '/images/blog/google-ads-butce-optimizasyonu.png',
  'google-ai-overview-optimizasyonu': '/images/blog/google-ai-overview-optimizasyonu.png',
  'google-sitelinks': '/images/blog/google-sitelinks.png',
  'hepsiburada-urun-sayfasi': '/images/blog/hepsiburada-urun-sayfasi.png',
  'hreflang-uluslararasi-seo': '/images/blog/hreflang-uluslararasi-seo.png',
  'ic-linkleme': '/images/blog/ic-linkleme.png',
  'javascript-seo': '/images/blog/javascript-seo.png',
  'meta-ads-ve-seo': '/images/blog/meta-ads-ve-seo.png',
  'mobil-seo': '/images/blog/mobil-seo.png',
  'rakip-analizi-seo': '/images/blog/rakip-analizi-seo.png',
  'robots-txt': '/images/blog/robots-txt.png',
  'search-console-rehberi': '/images/blog/search-console-rehberi.png',
  'seo-audit-araclari': '/images/blog/seo-audit-araclari.png',
  'seo-roi-olcumu': '/images/blog/seo-roi-olcumu.png',
  'seo-strateji-plani': '/images/blog/seo-strateji-plani.png',
  'seo-trendleri-2026': '/images/blog/seo-trendleri-2026.png',
  'sesli-arama-seo': '/images/blog/sesli-arama-seo.png',
  'shopify-seo': '/images/blog/shopify-seo.png',
  'toksik-backlink-disavow': '/images/blog/toksik-backlink-disavow.png',
  'topical-authority': '/images/blog/topical-authority.png',
  'trendyol-urun-sirasi': '/images/blog/trendyol-urun-sirasi.png',
  'url-yapisi-seo': '/images/blog/url-yapisi-seo.png',
  'video-seo': '/images/blog/video-seo.png',
  'woocommerce-seo': '/images/blog/woocommerce-seo.png',
  'zero-click-arama': '/images/blog/zero-click-arama.png',
}

export const getBlogKapak = (slug) => BLOG_KAPAKLARI[slug] || null
