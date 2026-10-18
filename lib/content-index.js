// ─────────────────────────────────────────────────────────────
// YAYINDAKİ İÇERİK — TEK KAYNAK (single source of truth)
//
// Yalnızca GERÇEK, özgün içeriği yazılmış slug'lar burada listelenir.
// Bu listelerde olmayan bir slug:
//   • blog / rehber listeleme sayfalarında görünmez,
//   • sitemap'e eklenmez,
//   • doğrudan URL ile açılırsa 404 döner.
//
// Yeni bir yazı yayına alırken:
//   1) lib/blog-icerikler.js içindeki ICERIKLER objesine gerçek içeriği ekleyin,
//   2) slug'ı aşağıdaki listeye ekleyin.
// (Rehberler için: lib/rehber-icerikler.js ve lib/rehber-yazilar/ → TUM_REHBERLER)
//
// NOT: Şablon/dolgu metniyle sayfa yayınlamak, birbirinin aynısı onlarca URL
// ürettiği için "thin / duplicate content" sinyali yaratır ve site geneli
// kalite skorunu düşürür. Bu yüzden kapı burada kapalı tutuluyor.
// ─────────────────────────────────────────────────────────────

export const YAYINDAKI_BLOG_SLUGS = [
  'core-web-vitals-2025',
  'seo-ajansi-nasil-secilir',
  'turkiye-en-iyi-15-seo-ajansi-2026',
  'turkiye-en-iyi-10-seo-ajansi-2026',
  'turkiye-en-iyi-15-sosyal-medya-ajansi-2026',
  'turkiye-en-iyi-10-sosyal-medya-ajansi-2026',
  'turkiye-en-iyi-15-dijital-pazarlama-ajansi-2026',
  'turkiye-en-iyi-10-dijital-pazarlama-ajansi-2026',
  'sosyal-medya-ajansi-nasil-secilir',
  'dijital-pazarlama-ajansi-nasil-secilir',
  'turkiye-en-iyi-15-geo-ajansi-2026',
  'turkiye-en-iyi-10-geo-ajansi-2026',
  'geo-ajansi-nasil-secilir',
  'seo-ajansi-fiyatlari',
  'chatgpt-marka-gorunurlugu',
  'llms-txt-rehberi',
  'seo-uzmani-mi-seo-ajansi-mi',
  'google-business-profile',
  'tarandi-dizine-eklenmemis',
  'cekirdek-guncelleme-trafik-dususu',
  'programatik-seo',
  'e-ticaret-altyapisi-seo-karsilastirma',
  'trendyol-magazasi-mi-kendi-site-mi',
  'avukatlar-icin-seo',
  'dis-klinikleri-yerel-seo',
  'google-ai-mode-turkiye',
  'perplexity-kaynak-gosterilme',
  'marka-bahsi-brand-mention',
  'yoast-mu-rank-math-mi',
  'yapay-zeka-icerik-google-politikasi',
  'ga4-yapay-zeka-trafigi',
  'seo-mu-google-ads-mi',
  'google-yorumlarina-cevap',
]

export const YAYINDAKI_REHBER_SLUGS = [
  'teknik-seo',
  'icerik-stratejisi',
  'yerel-seo',
  'geo-uygulama',
  'site-tasima-seo',
  'e-ticaret-seo',
  'backlink-dijital-pr',
  'anahtar-kelime-arastirmasi',
  'schema-yapisal-veri',
  'seo-raporlama',
  'saglik-seo',
]

export const isYayindaBlog = (slug) => YAYINDAKI_BLOG_SLUGS.includes(slug)
export const isYayindaRehber = (slug) => YAYINDAKI_REHBER_SLUGS.includes(slug)
