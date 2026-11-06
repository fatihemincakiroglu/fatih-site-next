// Open Graph önizleme aracı: saf mantık (tarayıcıdan ve ağdan bağımsız, test edilebilir).
// pages/araclar/og-onizleme.js ve pages/api/og-getir.js kullanır.
//
// • ogAyristir(html, sayfaUrl): <title>, meta description, og:*, twitter:*, canonical okur.
//   property ve name özniteliklerini, öznitelik sırasını, tek/çift tırnağı ve tırnaksız değerleri,
//   HTML varlıklarını (&amp; &#39; &#x27; &ccedil; ...) ve göreli adresleri (base href dahil) ele alır.
// • etkinDegerler(v): her platformun büyük ihtimalle göstereceği başlık, açıklama ve görsel.
// • ogKontrol(v): eksik ve hatalı etiketler için sorun listesi (kod + seviye + parametreler).
//
// Platformların kesme noktaları resmi değildir (X'in 70/200 sınırı hariç); cihaza ve arayüz
// sürümüne göre değişir. Buradaki sayılar YAKLAŞIK karakter sınırlarıdır.

export const ONERILEN_GORSEL = { genislik: 1200, yukseklik: 630 }

// Yaklaşık karakter sınırları. aciklama: null, platformun akışta açıklamayı genelde göstermediği anlamına gelir.
export const PLATFORM_SINIRLARI = {
  google: { baslik: 60, aciklama: 155 },
  facebook: { baslik: 88, aciklama: 110 },
  linkedin: { baslik: 70, aciklama: null },
  x: { baslik: 70, aciklama: 200 },
  whatsapp: { baslik: 65, aciklama: 80 },
}

const VARLIKLAR = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0', hellip: '…', ndash: '\u2013', mdash: '\u2014',
  lsquo: '\u2018', rsquo: '\u2019', ldquo: '\u201c', rdquo: '\u201d', laquo: '«', raquo: '»', middot: '·', bull: '•',
  copy: '©', reg: '®', trade: '™', euro: '€', pound: '£', yen: '¥', deg: '°', times: '×', shy: '\u00ad',
  ccedil: 'ç', Ccedil: 'Ç', ouml: 'ö', Ouml: 'Ö', uuml: 'ü', Uuml: 'Ü', gbreve: 'ğ', Gbreve: 'Ğ',
  scedil: 'ş', Scedil: 'Ş', inodot: 'ı', imath: 'ı', Idot: 'İ', auml: 'ä', Auml: 'Ä', eacute: 'é', Eacute: 'É',
  egrave: 'è', aacute: 'á', agrave: 'à', acirc: 'â', Acirc: 'Â', icirc: 'î', Icirc: 'Î', ucirc: 'û', Ucirc: 'Û',
  ocirc: 'ô', ntilde: 'ñ', szlig: 'ß', oslash: 'ø', aring: 'å',
}

export function varlikCoz(metin) {
  if (!metin || metin.indexOf('&') === -1) return metin || ''
  return metin.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z][a-z0-9]*);?/gi, (tam, ad) => {
    if (ad[0] === '#') {
      const kod = ad[1] === 'x' || ad[1] === 'X' ? parseInt(ad.slice(2), 16) : parseInt(ad.slice(1), 10)
      if (!Number.isFinite(kod) || kod <= 0 || kod > 0x10ffff) return tam
      try { return String.fromCodePoint(kod) } catch { return tam }
    }
    // Noktalı virgülsüz yazım yalnızca en yaygın varlıklarda kabul edilir (tarayıcı davranışına yakın)
    if (!tam.endsWith(';') && !['amp', 'lt', 'gt', 'quot', 'nbsp'].includes(ad.toLowerCase())) return tam
    const k = Object.prototype.hasOwnProperty.call(VARLIKLAR, ad) ? ad : ad.toLowerCase()
    return Object.prototype.hasOwnProperty.call(VARLIKLAR, k) ? VARLIKLAR[k] : tam
  })
}

const temizle = (s) => varlikCoz(String(s || '')).replace(/\s+/g, ' ').trim()

// Bir etiketin öznitelik metnini { ad: deger } nesnesine çevirir. Ad küçük harfe indirilir; ilk geçen kazanır.
export function oznitelikler(metin) {
  const sonuc = {}
  const re = /([^\s"'=<>/`]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g
  let m
  while ((m = re.exec(metin)) !== null) {
    const ad = m[1].toLowerCase()
    if (ad in sonuc) continue
    const deger = m[2] !== undefined ? m[2] : m[3] !== undefined ? m[3] : m[4] !== undefined ? m[4] : ''
    sonuc[ad] = varlikCoz(deger)
  }
  return sonuc
}

// Göreli adresi tam adrese çevirir. goreli: değer şemasız yazılmışsa (ör. /img/a.jpg, //cdn..., a.jpg) true.
export function adresCoz(deger, temel) {
  const d = String(deger || '').trim()
  if (!d) return { url: '', goreli: false, gecersiz: false }
  const mutlak = /^[a-z][a-z0-9+.-]*:/i.test(d)
  if (mutlak) {
    try { return { url: new URL(d).toString(), goreli: false, gecersiz: false } } catch { return { url: d, goreli: false, gecersiz: true } }
  }
  if (!temel) return { url: d, goreli: true, gecersiz: false, cozulemedi: true }
  try { return { url: new URL(d, temel).toString(), goreli: true, gecersiz: false } } catch { return { url: d, goreli: true, gecersiz: true } }
}

const BOS_SONUC = () => ({
  title: '', description: '', canonical: '', canonicalHam: '',
  og: { title: '', description: '', image: '', imageHam: '', imageWidth: '', imageHeight: '', imageAlt: '', url: '', urlHam: '', type: '', siteName: '', locale: '' },
  twitter: { card: '', title: '', description: '', image: '', imageHam: '', imageAlt: '', site: '' },
  ogGorselSayisi: 0,
  goreli: { ogImage: false, ogUrl: false, canonical: false, twitterImage: false },
})

/**
 * HTML içinden paylaşım etiketlerini okur.
 * @param {string} html
 * @param {string} [sayfaUrl] göreli adresleri çözmek için sayfanın (son) adresi
 */
export function ogAyristir(html, sayfaUrl = '') {
  const v = BOS_SONUC()
  let h = String(html || '')
  // Yorumlar, script, style ve noscript içindeki etiketler sayılmaz
  h = h.replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<script\b[\s\S]*?<\/script\s*>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style\s*>/gi, ' ')
    .replace(/<noscript\b[\s\S]*?<\/noscript\s*>/gi, ' ')
    .replace(/<svg\b[\s\S]*?<\/svg\s*>/gi, ' ')

  const tm = h.match(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/i)
  if (tm) v.title = temizle(tm[1])

  const meta = {}
  const metaEkle = (anahtar, deger) => {
    if (!anahtar) return
    const k = anahtar.trim().toLowerCase()
    if (!(k in meta)) meta[k] = deger
  }
  let baseHref = ''
  const etiketRe = /<(meta|link|base)\b((?:[^>"']|"[^"]*"|'[^']*')*)\/?>/gi
  let m
  while ((m = etiketRe.exec(h)) !== null) {
    const tip = m[1].toLowerCase()
    const a = oznitelikler(m[2])
    if (tip === 'meta') {
      if (!('content' in a)) continue
      const deger = a.content
      // Facebook property, X name kullanır; pratikte ikisi de karışık yazılıyor, ikisini de oku
      if (a.property) {
        metaEkle(a.property, deger)
        if (/^og:image(:url)?$/i.test(a.property.trim())) v.ogGorselSayisi++
      }
      if (a.name) metaEkle(a.name, deger)
      if (!a.property && !a.name && a.itemprop) metaEkle(`itemprop:${a.itemprop}`, deger)
    } else if (tip === 'link') {
      const rel = (a.rel || '').toLowerCase().split(/\s+/)
      if (rel.includes('canonical') && !v.canonicalHam && a.href !== undefined) v.canonicalHam = a.href.trim()
    } else if (tip === 'base' && !baseHref && a.href) {
      baseHref = a.href.trim()
    }
  }

  let temel = sayfaUrl || ''
  if (baseHref) {
    try { temel = new URL(baseHref, sayfaUrl || undefined).toString() } catch { /* geçersiz base, sayfa adresiyle devam */ }
  }

  const al = (k) => temizle(meta[k])
  v.description = al('description')
  v.og.title = al('og:title')
  v.og.description = al('og:description')
  v.og.imageHam = (meta['og:image'] || meta['og:image:url'] || meta['og:image:secure_url'] || '').trim()
  v.og.imageWidth = al('og:image:width')
  v.og.imageHeight = al('og:image:height')
  v.og.imageAlt = al('og:image:alt')
  v.og.urlHam = (meta['og:url'] || '').trim()
  v.og.type = al('og:type')
  v.og.siteName = al('og:site_name')
  v.og.locale = al('og:locale')
  v.twitter.card = al('twitter:card').toLowerCase()
  v.twitter.title = al('twitter:title')
  v.twitter.description = al('twitter:description')
  v.twitter.imageHam = (meta['twitter:image'] || meta['twitter:image:src'] || '').trim()
  v.twitter.imageAlt = al('twitter:image:alt')
  v.twitter.site = al('twitter:site')
  if (!v.ogGorselSayisi && v.og.imageHam) v.ogGorselSayisi = 1

  const img = adresCoz(v.og.imageHam, temel)
  v.og.image = img.url; v.goreli.ogImage = img.goreli
  const ou = adresCoz(v.og.urlHam, temel)
  v.og.url = ou.url; v.goreli.ogUrl = ou.goreli
  const cn = adresCoz(v.canonicalHam, temel)
  v.canonical = cn.url; v.goreli.canonical = cn.goreli
  const ti = adresCoz(v.twitter.imageHam, temel)
  v.twitter.image = ti.url; v.goreli.twitterImage = ti.goreli
  return v
}

// Platformların büyük ihtimalle kullanacağı değerler (yedek sırasıyla).
export function etkinDegerler(v) {
  const ogBaslik = v.og.title || v.title
  const ogAciklama = v.og.description || v.description
  return {
    og: { baslik: ogBaslik, aciklama: ogAciklama, gorsel: v.og.image },
    x: {
      baslik: v.twitter.title || ogBaslik,
      aciklama: v.twitter.description || ogAciklama,
      gorsel: v.twitter.image || v.og.image,
      // twitter:card yoksa X, og etiketlerinden küçük bir "summary" kartı oluşturabilir; kesin değil.
      kart: v.twitter.card === 'summary_large_image' ? 'buyuk' : 'kucuk',
    },
    google: { baslik: v.title, aciklama: v.description },
  }
}

// Karakter sınırında kelime sınırından keser, sonuna "…" ekler.
export function kisalt(metin, sinir) {
  const s = String(metin || '')
  if (!sinir || [...s].length <= sinir) return s
  const kes = [...s].slice(0, sinir).join('')
  const bosluk = kes.lastIndexOf(' ')
  return (bosluk > sinir * 0.6 ? kes.slice(0, bosluk) : kes).replace(/[\s.,;:!?-]+$/, '') + '…'
}

const uzunluk = (s) => [...String(s || '')].length

// Karşılaştırma için adres normalleştirme: şema ve host küçük harf (URL bunu yapar), # atılır.
// Sondaki "/" farkı bilerek korunur: /sayfa ile /sayfa/ ayrı adreslerdir ve paylaşım sayıları bölünebilir.
export function adresNormal(u) {
  try {
    const x = new URL(u)
    x.hash = ''
    return x.toString()
  } catch { return String(u || '').trim() }
}

/**
 * Sorun listesi. seviye: 'hata' (paylaşım bozuk görünür), 'uyari' (düzeltilmeli), 'bilgi' (öneri).
 * @returns {{kod: string, seviye: 'hata'|'uyari'|'bilgi', [k: string]: any}[]}
 */
export function ogKontrol(v) {
  const s = []
  const e = etkinDegerler(v)
  const ekle = (seviye, kod, ek = {}) => s.push({ seviye, kod, ...ek })

  if (!v.og.imageHam) ekle('hata', 'og-image-yok')
  else {
    if (v.goreli.ogImage) ekle('uyari', 'og-image-goreli', { deger: v.og.imageHam })
    if (/^http:\/\//i.test(v.og.image)) ekle('uyari', 'og-image-http')
    const w = parseInt(v.og.imageWidth, 10), hh = parseInt(v.og.imageHeight, 10)
    if (!w || !hh) ekle('bilgi', 'og-image-boyut-yok')
    else {
      if (w < 600 || hh < 315) ekle('uyari', 'og-image-kucuk', { w, h: hh })
      else if (w < ONERILEN_GORSEL.genislik) ekle('bilgi', 'og-image-onerilen', { w, h: hh })
      const oran = w / hh
      if (oran < 1.7 || oran > 2.1) ekle('bilgi', 'og-image-oran', { w, h: hh, oran: Math.round(oran * 100) / 100 })
    }
    if (!v.og.imageAlt) ekle('bilgi', 'og-image-alt-yok')
  }
  if (!v.og.title) ekle(v.title ? 'uyari' : 'hata', 'og-title-yok', { yedek: !!v.title })
  if (!v.og.description) ekle('uyari', 'og-description-yok', { yedek: !!v.description })
  if (!v.title) ekle('hata', 'title-yok')
  if (!v.description) ekle('uyari', 'description-yok')
  if (!v.twitter.card) ekle('uyari', 'twitter-card-yok')
  else if (!['summary', 'summary_large_image', 'app', 'player'].includes(v.twitter.card)) ekle('uyari', 'twitter-card-gecersiz', { deger: v.twitter.card })
  if (v.twitter.imageHam && v.goreli.twitterImage) ekle('uyari', 'twitter-image-goreli', { deger: v.twitter.imageHam })

  if (!v.og.urlHam) ekle('bilgi', 'og-url-yok')
  else if (v.goreli.ogUrl) ekle('uyari', 'og-url-goreli', { deger: v.og.urlHam })
  if (!v.canonicalHam) ekle('bilgi', 'canonical-yok')
  if (v.og.url && v.canonical && adresNormal(v.og.url) !== adresNormal(v.canonical)) {
    ekle('uyari', 'og-url-canonical-farkli', { ogUrl: v.og.url, canonical: v.canonical })
  }
  if (!v.og.type) ekle('bilgi', 'og-type-yok')
  if (!v.og.siteName) ekle('bilgi', 'og-site-name-yok')

  // Uzunluk kontrolleri (yaklaşık sınırlar)
  const uzun = (platform, alan, metin) => {
    const sinir = PLATFORM_SINIRLARI[platform][alan]
    const n = uzunluk(metin)
    if (sinir && n > sinir) ekle('bilgi', 'uzun', { platform, alan, uzunluk: n, sinir })
  }
  uzun('google', 'baslik', e.google.baslik)
  uzun('google', 'aciklama', e.google.aciklama)
  for (const p of ['facebook', 'linkedin', 'whatsapp']) {
    uzun(p, 'baslik', e.og.baslik)
    uzun(p, 'aciklama', e.og.aciklama)
  }
  uzun('x', 'baslik', e.x.baslik)
  uzun('x', 'aciklama', e.x.aciklama)

  const sira = { hata: 0, uyari: 1, bilgi: 2 }
  return s.sort((a, b) => sira[a.seviye] - sira[b.seviye])
}

// Aracın açılışta gösterdiği örnek (birkaç bilinçli sorun içerir).
export const ORNEK_HTML = `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <title>Teknik SEO Denetimi Nasıl Yapılır? Adım Adım Kontrol Listesi | Örnek Marka</title>
  <meta name="description" content="Tarama, dizine ekleme, site hızı ve yapısal veri kontrollerini adım adım anlatan, indirilebilir kontrol listesi içeren teknik SEO denetimi rehberi.">
  <link rel="canonical" href="https://www.ornek.com/teknik-seo-denetimi">
  <meta property="og:type" content="article">
  <meta property="og:title" content="Teknik SEO Denetimi: Adım Adım Kontrol Listesi">
  <meta property="og:description" content="Tarama, dizine ekleme, hız ve yapısal veri kontrolleri tek listede.">
  <meta property="og:url" content="https://www.ornek.com/teknik-seo-denetimi/">
  <meta property="og:image" content="https://fatihemincakiroglu.com/og-image.jpg">
  <meta property="og:site_name" content="Örnek Marka">
</head>
<body></body>
</html>`
