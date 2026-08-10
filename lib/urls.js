export const URL_MAP = {
  tr: {
    home:       '/',
    seo:        '/seo',
    geo:        '/geo',
    icerik:     '/icerik',
    backlink:   '/backlink',
    performans: '/performans',
    hakkimda:   '/hakkimda',
    referanslar:'/referanslar',
    vakalar:    '/vakalar',
    blog:       '/blog',
    rehber:     '/rehber',
    araclar:    '/araclar',
    sss:        '/sss',
    fiyatlandirma:'/fiyatlandirma',
    iletisim:   '/iletisim',
    randevu:    '/randevu',
    hizmetler:  '/hizmetler',
    kaynaklar:  '/kaynaklar',
    seoRehberi: '/seo-rehberi',
    geoRehberi: '/geo-rehberi',
    aiSozluk:   '/ai-sozluk',
    gizlilik:   '/gizlilik',
    kosullar:   '/kullanim-kosullari',
  },
  en: {
    home:       '/',
    seo:        '/seo-consulting',
    geo:        '/geo-consulting',
    icerik:     '/content-strategy',
    backlink:   '/backlink-digital-pr',
    performans: '/performance-growth',
    hakkimda:   '/about',
    referanslar:'/testimonials',
    vakalar:    '/case-studies',
    blog:       '/blog',
    rehber:     '/guides',
    araclar:    '/tools',
    sss:        '/faq',
    fiyatlandirma:'/pricing',
    iletisim:   '/contact',
    randevu:    '/book-a-call',
    hizmetler:  '/services',
    kaynaklar:  '/resources',
    seoRehberi: '/seo-guide',
    geoRehberi: '/geo-guide',
    aiSozluk:   '/ai-glossary',
    gizlilik:   '/privacy',
    kosullar:   '/terms',
  }
}

// ─────────────────────────────────────────────────────────────
// TR ↔ EN eşlemesi — hreflang ve dil değiştirici için tek kaynak.
// (Bu tablo pages/sitemap.xml.js ve components/Navbar.js ile tutarlı olmalı.)
// ─────────────────────────────────────────────────────────────
export const TR_TO_EN = Object.fromEntries(
  Object.keys(URL_MAP.tr).map(key => [
    URL_MAP.tr[key],
    key === 'home' ? '/en' : `/en${URL_MAP.en[key]}`,
  ])
)

export const EN_TO_TR = Object.fromEntries(
  Object.entries(TR_TO_EN).map(([tr, en]) => [en, tr])
)

// Slug tabanlı (dinamik) rotalar: TR öneki ↔ EN öneki
const DYNAMIC_PREFIX_PAIRS = [
  { tr: '/blog/', en: '/en/blog/' },
  { tr: '/rehber/', en: '/en/guides/' },
]

/**
 * Verilen yol için { tr, en } karşılıklarını döndürür.
 * hreflang etiketleri karşılıklı (reciprocal) olmak zorundadır; bu yüzden
 * her iki yön de tek bir fonksiyondan üretiliyor.
 * Eşleşme bulunamazsa null döner (o sayfaya hreflang basılmaz).
 */
export function getAlternates(path) {
  const clean = (path || '/').split('?')[0].split('#')[0].replace(/\/$/, '') || '/'

  for (const pair of DYNAMIC_PREFIX_PAIRS) {
    if (clean.startsWith(pair.tr)) {
      const slug = clean.slice(pair.tr.length)
      if (slug) return { tr: clean, en: pair.en + slug }
    }
    if (clean.startsWith(pair.en)) {
      const slug = clean.slice(pair.en.length)
      if (slug) return { tr: pair.tr + slug, en: clean }
    }
  }

  // Ana sayfada canonical 'https://fatihemincakiroglu.com' (sonda / yok) olduğu için
  // hreflang'i de birebir aynı üretiyoruz; aksi hâlde iki farklı URL bildirilmiş olur.
  const norm = (u) => (u === '/' ? '' : u)

  if (TR_TO_EN[clean]) return { tr: norm(clean), en: norm(TR_TO_EN[clean]) }
  if (EN_TO_TR[clean]) return { tr: norm(EN_TO_TR[clean]), en: norm(clean) }
  return null
}
