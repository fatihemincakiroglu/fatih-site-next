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
//   1) pages/blog/[slug].js içindeki ICERIKLER objesine gerçek içeriği ekleyin,
//   2) slug'ı aşağıdaki listeye ekleyin.
// (Rehberler için: pages/rehber/[slug].js -> TÜM_REHBERLER)
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
]

export const YAYINDAKI_REHBER_SLUGS = [
  'teknik-seo',
  'icerik-stratejisi',
]

export const isYayindaBlog = (slug) => YAYINDAKI_BLOG_SLUGS.includes(slug)
export const isYayindaRehber = (slug) => YAYINDAKI_REHBER_SLUGS.includes(slug)
