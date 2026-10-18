// ─────────────────────────────────────────────────────────────
// BLOG YAZILARI: YAYIN VE GÜNCELLEME TARİHLERİ
//
// yayin      → ilk yayın tarihi (YYYY-AA-GG). Git geçmişinden alındı.
// guncelleme → içerik anlamlı biçimde güncellendiğinde bu tarihi değiştirin.
//              Sayfadaki "Son güncelleme" yazısı ve Article şemasındaki
//              dateModified buradan üretilir. Sadece tarihi değiştirip içeriğe
//              dokunmamak Google'ın önerdiği bir şey değildir.
// ─────────────────────────────────────────────────────────────

export const BLOG_META = {
  'core-web-vitals-2025': {
    yayin: '2026-06-22', guncelleme: '2026-06-22',
  },
  'seo-ajansi-nasil-secilir': {
    yayin: '2026-07-02', guncelleme: '2026-07-02',
  },
  'turkiye-en-iyi-15-seo-ajansi-2026': {
    yayin: '2026-07-02', guncelleme: '2026-07-02',
  },
  'turkiye-en-iyi-10-seo-ajansi-2026': {
    yayin: '2026-07-02', guncelleme: '2026-07-02',
  },
  'turkiye-en-iyi-15-sosyal-medya-ajansi-2026': {
    yayin: '2026-09-27', guncelleme: '2026-09-27',
  },
  'turkiye-en-iyi-10-sosyal-medya-ajansi-2026': {
    yayin: '2026-09-27', guncelleme: '2026-09-27',
  },
  'turkiye-en-iyi-15-dijital-pazarlama-ajansi-2026': {
    yayin: '2026-09-27', guncelleme: '2026-09-27',
  },
  'turkiye-en-iyi-10-dijital-pazarlama-ajansi-2026': {
    yayin: '2026-09-27', guncelleme: '2026-09-27',
  },
  'sosyal-medya-ajansi-nasil-secilir': {
    yayin: '2026-09-27', guncelleme: '2026-09-27',
  },
  'dijital-pazarlama-ajansi-nasil-secilir': {
    yayin: '2026-09-27', guncelleme: '2026-09-27',
  },
  'turkiye-en-iyi-15-geo-ajansi-2026': {
    yayin: '2026-10-03', guncelleme: '2026-10-03',
  },
  'turkiye-en-iyi-10-geo-ajansi-2026': {
    yayin: '2026-10-03', guncelleme: '2026-10-03',
  },
  'geo-ajansi-nasil-secilir': {
    yayin: '2026-10-04', guncelleme: '2026-10-04',
  },  'seo-ajansi-fiyatlari': {
    yayin: '2026-10-17', guncelleme: '2026-10-17',
  },
  'chatgpt-marka-gorunurlugu': {
    yayin: '2026-10-17', guncelleme: '2026-10-17',
  },
  'llms-txt-rehberi': {
    yayin: '2026-10-17', guncelleme: '2026-10-17',
  },
  'seo-uzmani-mi-seo-ajansi-mi': {
    yayin: '2026-10-17', guncelleme: '2026-10-17',
  },
  'google-business-profile': {
    yayin: '2026-10-17', guncelleme: '2026-10-17',
  },
}

// Rehber sayfaları (/rehber/slug). Tarihler git geçmişinden alındı.
export const REHBER_META = {
  'teknik-seo': { yayin: '2026-06-23', guncelleme: '2026-06-23' },
  'icerik-stratejisi': { yayin: '2026-06-23', guncelleme: '2026-10-18' },
  'yerel-seo': { yayin: '2026-10-18', guncelleme: '2026-10-18' },
  'geo-uygulama': { yayin: '2026-10-18', guncelleme: '2026-10-18' },
  'site-tasima-seo': { yayin: '2026-10-18', guncelleme: '2026-10-18' },
  'e-ticaret-seo': { yayin: '2026-10-18', guncelleme: '2026-10-18' },
  'backlink-dijital-pr': { yayin: '2026-10-18', guncelleme: '2026-10-18' },
  'anahtar-kelime-arastirmasi': { yayin: '2026-10-18', guncelleme: '2026-10-18' },
  'schema-yapisal-veri': { yayin: '2026-10-18', guncelleme: '2026-10-18' },
  'seo-raporlama': { yayin: '2026-10-18', guncelleme: '2026-10-18' },
  'saglik-seo': { yayin: '2026-10-18', guncelleme: '2026-10-18' },
}

export const getBlogMeta = (slug) => BLOG_META[slug] || null
export const getRehberMeta = (slug) => REHBER_META[slug] || null

// "2026-10-04" → "Ekim 2026" / "October 2026"
// Saat 12:00 eklenir ki saat dilimi farkı tarihi bir gün kaydırmasın.
export function ayYil(iso, isEn) {
  if (!iso) return ''
  return new Intl.DateTimeFormat(isEn ? 'en-US' : 'tr-TR', { month: 'long', year: 'numeric' })
    .format(new Date(`${iso}T12:00:00Z`))
}
