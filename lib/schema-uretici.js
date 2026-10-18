// Schema oluşturucu aracının saf (tarayıcıdan bağımsız) mantığı.
// pages/araclar/schema-olusturucu.js kullanır. Boş alanlar çıktıya yazılmaz.

const temiz = (v) => (typeof v === 'string' ? v.trim() : v)
const satirlar = (v) => (v || '').split('\n').map(s => s.trim()).filter(Boolean)

// Boş değerleri (null, '', [], içi boş obje) özyinelemeli olarak at
export function bosAt(o) {
  if (Array.isArray(o)) {
    const a = o.map(bosAt).filter(x => x !== undefined)
    return a.length ? a : undefined
  }
  if (o && typeof o === 'object') {
    const r = {}
    for (const [k, v] of Object.entries(o)) {
      const t = bosAt(v)
      if (t !== undefined) r[k] = t
    }
    const anlamli = Object.keys(r).filter(k => k !== '@type')
    return anlamli.length ? r : undefined
  }
  const t = temiz(o)
  return t === '' || t === null || t === undefined ? undefined : t
}

export const ISLETME_TURLERI = [
  { id: 'LocalBusiness', tr: 'Genel yerel işletme', en: 'Local business (general)' },
  { id: 'ProfessionalService', tr: 'Profesyonel hizmet / danışmanlık', en: 'Professional service' },
  { id: 'Dentist', tr: 'Diş kliniği', en: 'Dentist' },
  { id: 'MedicalClinic', tr: 'Tıp merkezi / klinik', en: 'Medical clinic' },
  { id: 'LegalService', tr: 'Hukuk bürosu', en: 'Legal service' },
  { id: 'Restaurant', tr: 'Restoran / kafe', en: 'Restaurant / café' },
  { id: 'Hotel', tr: 'Otel', en: 'Hotel' },
  { id: 'Store', tr: 'Mağaza', en: 'Store' },
  { id: 'BeautySalon', tr: 'Güzellik salonu / kuaför', en: 'Beauty salon' },
  { id: 'RealEstateAgent', tr: 'Emlak ofisi', en: 'Real estate agent' },
]

export const GUNLER = [
  { id: 'Monday', tr: 'Pzt', en: 'Mon' }, { id: 'Tuesday', tr: 'Sal', en: 'Tue' }, { id: 'Wednesday', tr: 'Çar', en: 'Wed' },
  { id: 'Thursday', tr: 'Per', en: 'Thu' }, { id: 'Friday', tr: 'Cum', en: 'Fri' }, { id: 'Saturday', tr: 'Cmt', en: 'Sat' },
  { id: 'Sunday', tr: 'Paz', en: 'Sun' },
]

export function semaUret(tur, d) {
  let o
  if (tur === 'LocalBusiness') {
    const url = temiz(d.url)
    o = {
      '@context': 'https://schema.org',
      '@type': d.altTur || 'LocalBusiness',
      '@id': url ? `${url.replace(/\/$/, '')}/#isletme` : undefined,
      name: d.ad, url, image: d.gorsel, telephone: d.telefon, email: d.eposta,
      priceRange: d.fiyat, description: d.aciklama,
      address: {
        '@type': 'PostalAddress', streetAddress: d.adres, addressLocality: d.ilce,
        addressRegion: d.il, postalCode: d.postaKodu, addressCountry: d.ulke || 'TR',
      },
      geo: (d.enlem && d.boylam) ? { '@type': 'GeoCoordinates', latitude: Number(d.enlem), longitude: Number(d.boylam) } : undefined,
      openingHoursSpecification: (d.saatler || [])
        .filter(s => s.gunler?.length && s.acilis && s.kapanis)
        .map(s => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: s.gunler, opens: s.acilis, closes: s.kapanis })),
      sameAs: satirlar(d.sameAs),
    }
  } else if (tur === 'Organization') {
    const url = temiz(d.url)
    o = {
      '@context': 'https://schema.org', '@type': 'Organization',
      '@id': url ? `${url.replace(/\/$/, '')}/#organizasyon` : undefined,
      name: d.ad, legalName: d.resmiAd, url, logo: d.logo, description: d.aciklama, email: d.eposta,
      foundingDate: d.kurulus,
      contactPoint: d.telefon ? { '@type': 'ContactPoint', telephone: d.telefon, contactType: d.iletisimTuru || 'customer service', availableLanguage: satirlar(d.diller) } : undefined,
      sameAs: satirlar(d.sameAs),
    }
  } else if (tur === 'FAQPage') {
    o = {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: (d.sorular || [])
        .filter(q => temiz(q.s) && temiz(q.c))
        .map(q => ({ '@type': 'Question', name: q.s, acceptedAnswer: { '@type': 'Answer', text: q.c } })),
    }
  } else if (tur === 'Article') {
    o = {
      '@context': 'https://schema.org', '@type': d.makaleTuru || 'Article',
      headline: d.baslik, description: d.aciklama, image: satirlar(d.gorsel),
      datePublished: d.yayin, dateModified: d.guncelleme || d.yayin,
      mainEntityOfPage: d.url,
      author: d.yazar ? { '@type': 'Person', name: d.yazar, url: d.yazarUrl } : undefined,
      publisher: d.yayinci ? { '@type': 'Organization', name: d.yayinci, logo: d.yayinciLogo ? { '@type': 'ImageObject', url: d.yayinciLogo } : undefined } : undefined,
    }
  }
  return bosAt(o) || { '@context': 'https://schema.org', '@type': tur }
}

const urlMi = (v) => !v || /^https?:\/\/[^\s]+\.[^\s]+/.test(v.trim())

// Google'ın zengin sonuç/genel önerilerine göre eksik veya hatalı alanlar
export function uyarilar(tur, d, isEn) {
  const u = []
  const e = (tr, en) => u.push(isEn ? en : tr)
  if (tur === 'LocalBusiness') {
    if (!temiz(d.ad)) e('İşletme adı zorunlu.', 'Business name is required.')
    if (!temiz(d.adres) || !temiz(d.ilce)) e('Adres (sokak ve ilçe) önerilir; yerel aramalar için önemlidir.', 'Street address and locality are recommended for local search.')
    if (!temiz(d.telefon)) e('Telefon önerilir.', 'Telephone is recommended.')
    if ((d.enlem && !d.boylam) || (!d.enlem && d.boylam)) e('Enlem ve boylamı birlikte girin.', 'Enter latitude and longitude together.')
    if (d.enlem && isNaN(Number(d.enlem))) e('Enlem sayı olmalı (ör. 40.9903).', 'Latitude must be a number.')
    if (d.boylam && isNaN(Number(d.boylam))) e('Boylam sayı olmalı (ör. 29.0277).', 'Longitude must be a number.')
  }
  if (tur === 'Organization' && !temiz(d.ad)) e('Kurum adı zorunlu.', 'Organization name is required.')
  if (tur === 'Article') {
    if (!temiz(d.baslik)) e('Başlık (headline) zorunlu.', 'Headline is required.')
    if (!temiz(d.yayin)) e('Yayın tarihi önerilir.', 'Publish date is recommended.')
    if (!temiz(d.yazar)) e('Yazar adı önerilir.', 'Author name is recommended.')
  }
  if (tur === 'FAQPage') {
    const dolu = (d.sorular || []).filter(q => temiz(q.s) && temiz(q.c)).length
    if (!dolu) e('En az bir soru ve cevap girin.', 'Add at least one question and answer.')
    e('Not: Google, SSS (FAQ) zengin sonuçlarını 7 Mayıs 2026\'dan beri Google Arama\'da göstermiyor. İşaretleme yine de geçerlidir ve içeriğin anlaşılmasına yardımcı olabilir; yalnızca sayfada gerçekten görünen soruları ekleyin.',
      'Note: Google has not shown FAQ rich results in Search since May 7, 2026. The markup is still valid and can help machines understand the content; only mark up questions visible on the page.')
  }
  for (const [k, v] of Object.entries(d)) {
    if (['url', 'gorsel', 'logo', 'yazarUrl', 'yayinciLogo'].includes(k) && typeof v === 'string' && v.trim() && !satirlar(v).every(urlMi)) {
      e(`"${k}" alanı tam bir adres olmalı (https:// ile başlamalı).`, `"${k}" must be a full URL starting with https://.`)
    }
  }
  return u
}

// "<" karakteri \u003c olarak yazılır: kullanıcı metninde "</script>" geçse bile
// kod sitesine yapıştırıldığında script etiketini erken kapatamaz.
export const jsonLdMetni = (obj) =>
  `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/</g, '\\u003c')}\n</script>`
