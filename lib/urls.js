import { YAYINDAKI_BLOG_SLUGS, YAYINDAKI_REHBER_SLUGS } from './content-index'
export const URL_MAP = {
  tr: {
    home:       '/',
    seo:        '/seo-uzmani',
    geo:        '/geo-uzmani',
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
  }
}

// ─────────────────────────────────────────────────────────────
// TR ↔ EN eşlemesi - hreflang ve dil değiştirici için tek kaynak.
// (Bu tablo pages/sitemap.xml.js ve components/Navbar.js ile tutarlı olmalı.)
// ─────────────────────────────────────────────────────────────
export const TR_TO_EN = Object.fromEntries(
  Object.keys(URL_MAP.tr).map(key => [
    URL_MAP.tr[key],
    key === 'home' ? '/en' : `/en${URL_MAP.en[key]}`,
  ])
)

// Sektör, araç ve güncelleme sayfaları (URL_MAP dışındaki TR ↔ EN çiftleri)
const EK_CIFTLER = {
  '/sektorler': '/en/industries',
  '/schema-olusturucu': '/en/schema-generator',
  '/yonlendirme-olusturucu': '/en/redirect-generator',
  '/robots-txt-test': '/en/robots-txt-tester',
  '/hreflang-olusturucu': '/en/hreflang-generator',
  '/serp-onizleme': '/en/serp-preview',
  '/utm-olusturucu': '/en/utm-builder',
  '/google-guncellemeleri': '/en/google-updates',
  '/klinik-seo': '/en/healthcare-seo',
  '/avukat-seo': '/en/law-firm-seo',
  '/e-ticaret-seo-danismanligi': '/en/ecommerce-seo-consulting',
  '/otel-turizm-seo': '/en/hotel-tourism-seo',
  '/b2b-uretici-seo': '/en/b2b-manufacturer-seo',
}
Object.assign(TR_TO_EN, EK_CIFTLER)

export const EN_TO_TR = Object.fromEntries(
  Object.entries(TR_TO_EN).map(([tr, en]) => [en, tr])
)

// Blog yazıları ve rehberler düz adreste: TR /<slug>, EN /en/<slug> (aynı slug)
const ICERIK_SLUGLARI = new Set([...YAYINDAKI_BLOG_SLUGS, ...YAYINDAKI_REHBER_SLUGS])

/**
 * Verilen yol için { tr, en } karşılıklarını döndürür.
 * hreflang etiketleri karşılıklı (reciprocal) olmak zorundadır; bu yüzden
 * her iki yön de tek bir fonksiyondan üretiliyor.
 * Eşleşme bulunamazsa null döner (o sayfaya hreflang basılmaz).
 */
// Sayfalar derleme sırasında iç yollarıyla (/blog/x, /araclar/x ...) üretilir, tarayıcıda ise
// düz adresle (/x) açılır. Her iki durumda da aynı sonucu vermek için yolu düz biçime çevirir.
const IC_ONEK = /^(\/en)?\/(?:blog|rehber|guides|sektorler|industries|araclar|tools)\/([^/?#]+)/
export function duzYol(path) {
  const yol = (path || '/').split('?')[0].split('#')[0]
  const m = yol.match(IC_ONEK)
  return m ? `${m[1] || ''}/${m[2]}` : yol
}

export function getAlternates(path) {
  const clean = duzYol(path).replace(/\/$/, '') || '/'

  const m = clean.match(/^(\/en)?\/([a-z0-9-]+)$/)
  if (m && ICERIK_SLUGLARI.has(m[2])) return { tr: `/${m[2]}`, en: `/en/${m[2]}` }

  // Ana sayfada canonical 'https://fatihemincakiroglu.com' (sonda / yok) olduğu için
  // hreflang'i de birebir aynı üretiyoruz; aksi hâlde iki farklı URL bildirilmiş olur.
  const norm = (u) => (u === '/' ? '' : u)

  if (TR_TO_EN[clean]) return { tr: norm(clean), en: norm(TR_TO_EN[clean]) }
  if (EN_TO_TR[clean]) return { tr: norm(EN_TO_TR[clean]), en: norm(clean) }
  return null
}
