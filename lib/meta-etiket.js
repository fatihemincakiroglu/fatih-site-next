// Meta etiket oluşturucu: saf mantık (tarayıcıdan bağımsız, test edilebilir).
// pages/araclar/meta-etiket-olusturucu.js kullanır. Hiçbir veri sunucuya gönderilmez.
//
// • htmlKacis: öznitelik değerleri ve <title> metni için &, <, >, ", ' kaçışı.
// • robotsIcerik: index/noindex, follow/nofollow ve max-image-preview seçeneklerinden robots değeri.
//   "index, follow" varsayılan davranış olduğu için tek başına yazılmaz.
// • etkinDegerler: og:title, og:description, og:url boşsa title, description ve canonical kullanılır.
// • metaUret: <head> içine konacak HTML parçası.
// • kontrolEt: eksik ve hatalı alanlar için sorun listesi (kod + seviye + parametreler). Metinler sayfadadır.
// Piksel genişliği ölçümü sayfada lib/serp-olcum.js ile yapılır.

export const OG_TURLERI = ['website', 'article', 'product', 'profile', 'book', 'video.other', 'music.song']
export const TWITTER_KARTLARI = ['summary_large_image', 'summary']
export const VARSAYILAN_VIEWPORT = 'width=device-width, initial-scale=1'

export const SINIR = {
  baslikKarakter: 60,
  baslikKisa: 30,
  aciklamaKarakter: 160,
  aciklamaKisa: 70,
}

export function htmlKacis(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const tek = (s) => String(s ?? '').replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim()
export const tamUrlMi = (u) => /^https?:\/\/[^\s/]+\.[^\s/]+/i.test(String(u || '').trim())

// "tr-TR", "tr_tr", "TR" → "tr_TR" biçimi (og:locale). Tanınmazsa olduğu gibi döner.
export function localeDuzelt(ham) {
  const s = tek(ham)
  if (!s) return ''
  const m = s.match(/^([a-zA-Z]{2,3})[-_]([a-zA-Z]{2})$/)
  if (m) return `${m[1].toLowerCase()}_${m[2].toUpperCase()}`
  if (/^tr$/i.test(s)) return 'tr_TR'
  if (/^en$/i.test(s)) return 'en_US'
  return s
}

export function twitterKullanici(ham) {
  const s = tek(ham).replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//i, '').replace(/\/.*$/, '')
  if (!s) return ''
  return s.startsWith('@') ? s : `@${s}`
}

export function robotsIcerik({ index = true, follow = true, buyukGorsel = false } = {}) {
  const p = []
  if (!index) p.push('noindex')
  if (!follow) p.push('nofollow')
  if (buyukGorsel && index) p.push('max-image-preview:large')
  return p.join(', ')
}

export const BOS_FORM = {
  baslik: '', aciklama: '', canonical: '',
  index: true, follow: true, buyukGorsel: true,
  ogBaslik: '', ogAciklama: '', ogGorsel: '', ogGorselAlt: '', ogUrl: '', ogTur: 'website', ogSiteAdi: '', ogLocale: 'tr_TR',
  twitterKart: 'summary_large_image', twitterSite: '',
  temaRengi: '', viewport: VARSAYILAN_VIEWPORT,
}

export function etkinDegerler(f) {
  return {
    baslik: tek(f.baslik),
    aciklama: tek(f.aciklama),
    canonical: tek(f.canonical),
    ogBaslik: tek(f.ogBaslik) || tek(f.baslik),
    ogAciklama: tek(f.ogAciklama) || tek(f.aciklama),
    ogUrl: tek(f.ogUrl) || tek(f.canonical),
    ogGorsel: tek(f.ogGorsel),
    ogGorselAlt: tek(f.ogGorselAlt),
    ogTur: tek(f.ogTur) || 'website',
    ogSiteAdi: tek(f.ogSiteAdi),
    ogLocale: localeDuzelt(f.ogLocale),
    twitterKart: TWITTER_KARTLARI.includes(f.twitterKart) ? f.twitterKart : (tek(f.ogGorsel) ? 'summary_large_image' : 'summary'),
    twitterSite: twitterKullanici(f.twitterSite),
    temaRengi: tek(f.temaRengi),
    viewport: tek(f.viewport),
    robots: robotsIcerik(f),
  }
}

export function metaUret(f, { yorumlar = true, isEn = false } = {}) {
  const e = etkinDegerler(f)
  const k = htmlKacis
  const s = []
  const yorum = (tr, en) => { if (yorumlar) s.push(`<!-- ${isEn ? en : tr} -->`) }

  yorum('Temel etiketler', 'Basic tags')
  if (e.viewport) s.push(`<meta name="viewport" content="${k(e.viewport)}">`)
  if (e.baslik) s.push(`<title>${k(e.baslik)}</title>`)
  if (e.aciklama) s.push(`<meta name="description" content="${k(e.aciklama)}">`)
  if (e.canonical) s.push(`<link rel="canonical" href="${k(e.canonical)}">`)
  if (e.robots) s.push(`<meta name="robots" content="${k(e.robots)}">`)
  if (e.temaRengi) s.push(`<meta name="theme-color" content="${k(e.temaRengi)}">`)

  const og = [
    ['og:type', e.ogTur], ['og:title', e.ogBaslik], ['og:description', e.ogAciklama], ['og:url', e.ogUrl],
    ['og:image', e.ogGorsel], ['og:image:alt', e.ogGorsel ? e.ogGorselAlt : ''], ['og:site_name', e.ogSiteAdi], ['og:locale', e.ogLocale],
  ].filter(([, v]) => v)
  if (og.length) {
    yorum('Open Graph (Facebook, LinkedIn, WhatsApp)', 'Open Graph (Facebook, LinkedIn, WhatsApp)')
    for (const [p, v] of og) s.push(`<meta property="${p}" content="${k(v)}">`)
  }
  yorum('X (Twitter)', 'X (Twitter)')
  s.push(`<meta name="twitter:card" content="${k(e.twitterKart)}">`)
  if (e.twitterSite) s.push(`<meta name="twitter:site" content="${k(e.twitterSite)}">`)
  return s.join('\n')
}

// Sorunlar: { kod, seviye: 'hata' | 'uyari' | 'bilgi', ...parametreler }
export function kontrolEt(f) {
  const e = etkinDegerler(f)
  const r = []
  const bl = [...e.baslik].length
  const al = [...e.aciklama].length
  if (!e.baslik) r.push({ kod: 'baslik-yok', seviye: 'hata' })
  else if (bl > SINIR.baslikKarakter) r.push({ kod: 'baslik-uzun', seviye: 'uyari', uzunluk: bl, sinir: SINIR.baslikKarakter })
  else if (bl < SINIR.baslikKisa) r.push({ kod: 'baslik-kisa', seviye: 'bilgi', uzunluk: bl })
  if (!e.aciklama) r.push({ kod: 'aciklama-yok', seviye: 'uyari' })
  else if (al > SINIR.aciklamaKarakter) r.push({ kod: 'aciklama-uzun', seviye: 'uyari', uzunluk: al, sinir: SINIR.aciklamaKarakter })
  else if (al < SINIR.aciklamaKisa) r.push({ kod: 'aciklama-kisa', seviye: 'bilgi', uzunluk: al })

  if (!e.canonical) r.push({ kod: 'canonical-yok', seviye: 'uyari' })
  else if (!tamUrlMi(e.canonical)) r.push({ kod: 'canonical-goreli', seviye: 'hata', deger: e.canonical })
  else if (/^http:/i.test(e.canonical)) r.push({ kod: 'canonical-http', seviye: 'uyari' })
  if (e.canonical && /[?#]/.test(e.canonical)) r.push({ kod: 'canonical-parametre', seviye: 'bilgi' })

  if (!f.index) r.push({ kod: 'noindex', seviye: 'uyari' })
  if (!f.index && e.canonical) r.push({ kod: 'noindex-canonical', seviye: 'uyari' })
  if (!f.follow) r.push({ kod: 'nofollow', seviye: 'bilgi' })

  if (!e.ogGorsel) r.push({ kod: 'og-gorsel-yok', seviye: 'uyari' })
  else if (!tamUrlMi(e.ogGorsel)) r.push({ kod: 'og-gorsel-goreli', seviye: 'hata', deger: e.ogGorsel })
  else if (/^http:/i.test(e.ogGorsel)) r.push({ kod: 'og-gorsel-http', seviye: 'uyari' })
  if (e.ogGorsel && !e.ogGorselAlt) r.push({ kod: 'og-gorsel-alt-yok', seviye: 'bilgi' })
  if (e.ogUrl && !tamUrlMi(e.ogUrl)) r.push({ kod: 'og-url-goreli', seviye: 'hata', deger: e.ogUrl })
  if (tek(f.ogUrl) && e.canonical && tek(f.ogUrl) !== e.canonical) r.push({ kod: 'og-url-canonical-farkli', seviye: 'uyari' })
  if (!e.ogSiteAdi) r.push({ kod: 'og-site-adi-yok', seviye: 'bilgi' })
  if (e.ogLocale && !/^[a-z]{2,3}_[A-Z]{2}$/.test(e.ogLocale)) r.push({ kod: 'og-locale-bicim', seviye: 'uyari', deger: e.ogLocale })
  if (e.twitterKart === 'summary_large_image' && !e.ogGorsel) r.push({ kod: 'twitter-buyuk-gorselsiz', seviye: 'bilgi' })
  if (e.twitterSite && !/^@[A-Za-z0-9_]{1,15}$/.test(e.twitterSite)) r.push({ kod: 'twitter-site-bicim', seviye: 'uyari', deger: e.twitterSite })

  if (e.temaRengi && !/^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(e.temaRengi) && !/^(rgb|rgba|hsl|hsla)\(/i.test(e.temaRengi) && !/^[a-z]+$/i.test(e.temaRengi)) {
    r.push({ kod: 'tema-rengi-bicim', seviye: 'uyari', deger: e.temaRengi })
  }
  if (!e.viewport) r.push({ kod: 'viewport-yok', seviye: 'hata' })
  else {
    if (!/width\s*=\s*device-width/i.test(e.viewport)) r.push({ kod: 'viewport-genislik', seviye: 'uyari' })
    if (/user-scalable\s*=\s*(no|0)/i.test(e.viewport) || /maximum-scale\s*=\s*1(\.0*)?(\s|,|$)/i.test(e.viewport)) r.push({ kod: 'viewport-yakinlastirma', seviye: 'uyari' })
  }
  return r
}

export const ORNEK_FORM_TR = {
  ...BOS_FORM,
  baslik: 'Teknik SEO Denetimi, 40 Noktada Site Kontrolü | Örnek',
  aciklama: 'Tarama, dizine ekleme, hız ve yapısal veri sorunlarını tek raporda görün. Öncelik sırasıyla yapılacaklar listesi ve uygulama desteği.',
  canonical: 'https://www.ornek.com/teknik-seo-denetimi',
  ogGorsel: 'https://fatihemincakiroglu.com/og-image.jpg',
  ogGorselAlt: 'Teknik SEO denetim raporundan örnek bir ekran',
  ogSiteAdi: 'Örnek',
  ogLocale: 'tr_TR',
  twitterSite: '@ornek',
  temaRengi: '#e8560a',
}

export const ORNEK_FORM_EN = {
  ...BOS_FORM,
  baslik: 'Technical SEO Audit With a 40 Point Site Check | Example',
  aciklama: 'See crawling, indexing, speed and structured data issues in one report, with a prioritised to-do list and hands-on implementation support.',
  canonical: 'https://www.example.com/technical-seo-audit',
  ogGorsel: 'https://fatihemincakiroglu.com/og-image.jpg',
  ogGorselAlt: 'Sample screen from a technical SEO audit report',
  ogSiteAdi: 'Example',
  ogLocale: 'en_US',
  twitterSite: '@example',
  temaRengi: '#e8560a',
}
