// XML site haritası oluşturucu: saf mantık (tarayıcıdan bağımsız, test edilebilir).
// pages/araclar/site-haritasi-olusturucu.js kullanır. Hiçbir veri sunucuya gönderilmez.
//
// Sitemaps protokolü ve Google kuralları:
// • Bir dosyada en fazla 50.000 URL ve sıkıştırılmamış hâlde en fazla 50 MB. Fazlası birden çok dosyaya
//   bölünür ve bir site haritası dizini (sitemapindex) ile listelenir.
// • <loc> tam adres olmalı, en fazla 2.048 karakter; XML için &, <, >, ", ' kaçışlanmalı (entity escape),
//   ASCII dışı karakterler URL kodlamasıyla yazılmalı (new URL().href bunu yapar).
// • <lastmod> W3C Datetime biçiminde (YYYY-MM-DD ya da saat ve saat dilimiyle). Google lastmod'u,
//   tutarlı ve doğru olduğu sürece kullanır. <priority> ve <changefreq> Google tarafından yok sayılır;
//   bu araç onları eklemez.
// • hreflang: her <url> öğesi, kendisi dahil tüm dil sürümlerini xhtml:link ile listeler (karşılıklılık).

import { koduDogrula } from './hreflang-uretici'

export const EN_FAZLA_URL = 50000
export const EN_FAZLA_BAYT = 50 * 1024 * 1024
export const EN_FAZLA_URL_UZUNLUGU = 2048
const NS = 'http://www.sitemaps.org/schemas/sitemap/0.9'
const NS_XHTML = 'http://www.w3.org/1999/xhtml'

export function xmlKacis(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// UTF-8 bayt uzunluğu (TextEncoder olmayan ortamlar için yedekli)
export function baytUzunlugu(s) {
  if (typeof TextEncoder !== 'undefined') return new TextEncoder().encode(s).length
  return unescape(encodeURIComponent(s)).length
}

// W3C Datetime: YYYY, YYYY-MM, YYYY-MM-DD, YYYY-MM-DDThh:mm(:ss(.s))?(Z|±hh:mm)
const TARIH_RE = /^(\d{4})(-(\d{2})(-(\d{2})(T(\d{2}):(\d{2})(:(\d{2})(\.\d+)?)?(Z|[+-]\d{2}:\d{2}))?)?)?$/

export function tarihDogrula(ham, { bugun = new Date() } = {}) {
  const s = String(ham || '').trim()
  if (!s) return { bos: true }
  const m = s.match(TARIH_RE)
  if (!m) return { hata: 'tarih-bicim', ham: s }
  const yil = +m[1], ay = m[3] ? +m[3] : 1, gun = m[5] ? +m[5] : 1
  if (ay < 1 || ay > 12 || gun < 1 || gun > 31) return { hata: 'tarih-bicim', ham: s }
  const d = new Date(Date.UTC(yil, ay - 1, gun))
  if (d.getUTCMonth() !== ay - 1) return { hata: 'tarih-bicim', ham: s }
  if (m[7] !== undefined && (+m[7] > 23 || +m[8] > 59 || (m[10] !== undefined && +m[10] > 59))) return { hata: 'tarih-bicim', ham: s }
  const yarin = Date.UTC(bugun.getUTCFullYear(), bugun.getUTCMonth(), bugun.getUTCDate() + 1)
  if (d.getTime() > yarin) return { deger: s, gelecek: true }
  if (yil < 1995) return { hata: 'tarih-bicim', ham: s }
  return { deger: s }
}

// Adresi doğrular ve XML'e yazılacak standart biçime çevirir.
export function urlDogrula(ham) {
  const s = String(ham || '').trim()
  if (!/^https?:\/\//i.test(s)) return { hata: 'url-goreli', ham: s }
  let u
  try { u = new URL(s) } catch { return { hata: 'url-gecersiz', ham: s } }
  if (!u.hostname.includes('.')) return { hata: 'url-gecersiz', ham: s }
  const parcaVar = !!u.hash
  u.hash = ''
  const href = u.href
  if (href.length > EN_FAZLA_URL_UZUNLUGU) return { hata: 'url-uzun', ham: s }
  // ASCII dışı karakter ya da boşluk vardı ve URL kodlamasıyla yazıldı (ör. ş → %C5%9F)
  return { url: href, host: u.host.toLowerCase(), parcaVar, kodlandi: /[^\x21-\x7e]/.test(s.replace(/#.*$/, '')) }
}

const TARIH_SON_RE = /^(.*?)[\s,;\t]+(\d{4}(?:-\d{2}(?:-\d{2}(?:T[\d:.]+(?:Z|[+-]\d{2}:\d{2})?)?)?)?)$/

/**
 * Basit mod: satır başına bir adres; isteğe bağlı olarak sonunda tarih ("url,2026-11-01" ya da "url<TAB>2026-11-01").
 * @returns {{ girdiler: Array<{url, lastmod, satir}>, hatalar: Array, uyarilar: Array, host: string|null }}
 */
export function basitOku(metin, { varsayilanLastmod = '', bugun } = {}) {
  const hatalar = []
  const uyarilar = []
  const girdiler = []
  const gorulen = new Map()
  const hostSayac = new Map()
  let kodlanan = 0
  const vars = varsayilanLastmod ? tarihDogrula(varsayilanLastmod, { bugun }) : { bos: true }
  if (vars.hata) hatalar.push({ kod: 'varsayilan-tarih', ham: varsayilanLastmod })

  String(metin || '').split(/\r?\n/).forEach((ham, i) => {
    const satir = i + 1
    const s = ham.trim()
    if (!s || s.startsWith('#')) return
    let urlHam = s
    let tarihHam = ''
    const m = s.match(TARIH_SON_RE)
    if (m && /^https?:\/\//i.test(m[1])) { urlHam = m[1]; tarihHam = m[2] }
    const r = urlDogrula(urlHam)
    if (r.hata) { hatalar.push({ kod: r.hata, satir, ham: r.ham }); return }
    if (gorulen.has(r.url)) { uyarilar.push({ kod: 'tekrar', satir, ilk: gorulen.get(r.url), url: r.url }); return }
    gorulen.set(r.url, satir)
    if (r.parcaVar) uyarilar.push({ kod: 'parca', satir, url: r.url })
    if (r.kodlandi) kodlanan++
    let lastmod = ''
    if (tarihHam) {
      const t = tarihDogrula(tarihHam, { bugun })
      if (t.hata) uyarilar.push({ kod: t.hata, satir, ham: tarihHam }) // adres kalır, lastmod yazılmaz
      else { lastmod = t.deger; if (t.gelecek) uyarilar.push({ kod: 'tarih-gelecek', satir, tarih: t.deger }) }
    } else if (vars.deger) lastmod = vars.deger
    hostSayac.set(r.host, (hostSayac.get(r.host) || 0) + 1)
    girdiler.push({ url: r.url, host: r.host, lastmod, satir })
  })

  const host = hostKontrol(girdiler, hostSayac, uyarilar)
  if (kodlanan) uyarilar.push({ kod: 'kodlandi', adet: kodlanan })
  if (vars.gelecek) uyarilar.push({ kod: 'tarih-gelecek', satir: 0, tarih: vars.deger })
  return { girdiler, hatalar, uyarilar, host }
}

// En sık görülen host dışındakiler için uyarı (site haritası kendi host'undaki adresleri listelemeli)
function hostKontrol(girdiler, hostSayac, uyarilar) {
  if (!hostSayac.size) return null
  const ana = [...hostSayac.entries()].sort((a, b) => b[1] - a[1])[0][0]
  if (hostSayac.size > 1) {
    const farkli = girdiler.filter(g => g.host !== ana)
    uyarilar.push({ kod: 'farkli-host', ana, adet: farkli.length, ornek: farkli[0].url, hostlar: [...hostSayac.keys()].filter(h => h !== ana) })
  }
  const protokoller = new Set(girdiler.map(g => g.url.split(':')[0]))
  if (protokoller.size > 1) uyarilar.push({ kod: 'karisik-protokol' })
  else if (protokoller.has('http')) uyarilar.push({ kod: 'http' })
  return ana
}

/**
 * hreflang modu: satır başına bir sayfa grubu, "kod|url" çiftleri boşlukla ayrılır.
 * Örnek: "tr|https://ornek.com/hakkimizda  en|https://ornek.com/en/about  x-default|https://ornek.com/en/about"
 * Satır sonunda isteğe bağlı tarih olabilir: "... 2026-11-01".
 * xDefault: '' (ekleme) ya da bir dil kodu (grupta x-default yoksa o dilin adresi x-default olur).
 */
export function hreflangOku(metin, { varsayilanLastmod = '', xDefault = '', bugun } = {}) {
  const hatalar = []
  const uyarilar = []
  const gruplar = []
  const urlGrup = new Map()
  const hostSayac = new Map()
  const tumGirdiler = []
  const vars = varsayilanLastmod ? tarihDogrula(varsayilanLastmod, { bugun }) : { bos: true }
  if (vars.hata) hatalar.push({ kod: 'varsayilan-tarih', ham: varsayilanLastmod })
  const xd = xDefault ? koduDogrula(xDefault).kod || '' : ''

  String(metin || '').split(/\r?\n/).forEach((ham, i) => {
    const satir = i + 1
    const s = ham.trim()
    if (!s || s.startsWith('#')) return
    const parcalar = s.split(/\s+/)
    let tarihHam = ''
    if (parcalar.length && !parcalar[parcalar.length - 1].includes('|') && /^\d{4}/.test(parcalar[parcalar.length - 1])) tarihHam = parcalar.pop()
    const alternatifler = []
    let satirHatali = false
    for (const p of parcalar) {
      const ayir = p.indexOf('|')
      if (ayir < 1) { hatalar.push({ kod: 'hreflang-bicim', satir, ham: p }); satirHatali = true; continue }
      const kodHam = p.slice(0, ayir)
      const k = koduDogrula(kodHam)
      if (k.hata) { hatalar.push({ kod: 'hreflang-kod', satir, ham: kodHam, oneri: k.oneri, neden: k.hata }); satirHatali = true; continue }
      const r = urlDogrula(p.slice(ayir + 1))
      if (r.hata) { hatalar.push({ kod: r.hata, satir, ham: r.ham }); satirHatali = true; continue }
      if (alternatifler.some(a => a.kod === k.kod)) { hatalar.push({ kod: 'hreflang-tekrar-kod', satir, ham: k.kod }); satirHatali = true; continue }
      alternatifler.push({ kod: k.kod, url: r.url, host: r.host })
    }
    if (satirHatali || !alternatifler.length) return
    if (xd && !alternatifler.some(a => a.kod === 'x-default')) {
      const kaynak = alternatifler.find(a => a.kod === xd)
      if (kaynak) alternatifler.push({ kod: 'x-default', url: kaynak.url, host: kaynak.host })
      else uyarilar.push({ kod: 'x-default-dil-yok', satir, dil: xd })
    }
    const dilSayisi = alternatifler.filter(a => a.kod !== 'x-default').length
    if (dilSayisi < 2) uyarilar.push({ kod: 'hreflang-tek', satir })
    let lastmod = ''
    if (tarihHam) {
      const t = tarihDogrula(tarihHam, { bugun })
      if (t.hata) uyarilar.push({ kod: t.hata, satir, ham: tarihHam }) // adres kalır, lastmod yazılmaz
      else { lastmod = t.deger; if (t.gelecek) uyarilar.push({ kod: 'tarih-gelecek', satir, tarih: t.deger }) }
    } else if (vars.deger) lastmod = vars.deger
    // Aynı adres başka bir grupta da varsa çelişkili sinyal
    for (const a of alternatifler) {
      if (a.kod === 'x-default') continue
      if (urlGrup.has(a.url) && urlGrup.get(a.url) !== satir) uyarilar.push({ kod: 'hreflang-cakisma', satir, ilk: urlGrup.get(a.url), url: a.url })
      else urlGrup.set(a.url, satir)
    }
    gruplar.push({ satir, alternatifler, lastmod })
  })

  // Her benzersiz adres kendi <url> öğesini alır; x-default ayrı bir sayfaysa o da listelenir.
  const gorulen = new Set()
  for (const g of gruplar) {
    for (const a of g.alternatifler) {
      if (gorulen.has(a.url)) continue
      gorulen.add(a.url)
      hostSayac.set(a.host, (hostSayac.get(a.host) || 0) + 1)
      tumGirdiler.push({ url: a.url, host: a.host, lastmod: g.lastmod, satir: g.satir, alternatifler: g.alternatifler })
    }
  }
  const host = hostKontrol(tumGirdiler, hostSayac, uyarilar)
  if (vars.gelecek) uyarilar.push({ kod: 'tarih-gelecek', satir: 0, tarih: vars.deger })
  return { girdiler: tumGirdiler, gruplar, hatalar, uyarilar, host }
}

function urlXml(g, girinti = '  ') {
  const ic = `${girinti}  `
  const satirlar = [`${girinti}<url>`, `${ic}<loc>${xmlKacis(g.url)}</loc>`]
  if (g.lastmod) satirlar.push(`${ic}<lastmod>${xmlKacis(g.lastmod)}</lastmod>`)
  if (g.alternatifler) {
    for (const a of g.alternatifler) satirlar.push(`${ic}<xhtml:link rel="alternate" hreflang="${xmlKacis(a.kod)}" href="${xmlKacis(a.url)}"/>`)
  }
  satirlar.push(`${girinti}</url>`)
  return satirlar.join('\n')
}

export function urlsetXml(girdiler) {
  const hreflang = girdiler.some(g => g.alternatifler)
  const bas = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="${NS}"${hreflang ? ` xmlns:xhtml="${NS_XHTML}"` : ''}>`
  return [bas, ...girdiler.map(g => urlXml(g)), '</urlset>', ''].join('\n')
}

export function indexXml(dosyalar) {
  const satirlar = [`<?xml version="1.0" encoding="UTF-8"?>`, `<sitemapindex xmlns="${NS}">`]
  for (const d of dosyalar) {
    satirlar.push('  <sitemap>', `    <loc>${xmlKacis(d.url)}</loc>`)
    if (d.lastmod) satirlar.push(`    <lastmod>${xmlKacis(d.lastmod)}</lastmod>`)
    satirlar.push('  </sitemap>')
  }
  satirlar.push('</sitemapindex>', '')
  return satirlar.join('\n')
}

// En yeni lastmod: aynı biçimdeki tarihleri metin olarak karşılaştırmak yerine Date.parse ile.
function enYeni(tarihler) {
  let enIyi = ''
  let enIyiT = -Infinity
  for (const t of tarihler) {
    if (!t) continue
    const v = Date.parse(t.length === 4 ? `${t}-01-01` : t.length === 7 ? `${t}-01` : t)
    if (Number.isFinite(v) && v > enIyiT) { enIyiT = v; enIyi = t }
  }
  return enIyi
}

/**
 * Girdileri dosyalara böler. Tek dosyaya sığarsa index üretilmez.
 * taban: dosyaların yayınlanacağı klasör adresi (ör. https://ornek.com/). Dosya adları sitemap-1.xml, sitemap-2.xml ...;
 * dizin dosyası sitemap.xml (ya da dizinAdi).
 */
export function dosyalariUret(girdiler, { taban = '', enFazlaUrl = EN_FAZLA_URL, enFazlaBayt = EN_FAZLA_BAYT, onEk = 'sitemap', dizinAdi = 'sitemap.xml' } = {}) {
  if (!girdiler.length) return { dosyalar: [], dizin: null }
  let boyut = Math.max(1, Math.min(enFazlaUrl, EN_FAZLA_URL))
  let parcalar
  // Bayt sınırı aşılırsa parça boyutunu yarıya indirerek yeniden böl
  for (;;) {
    parcalar = []
    for (let i = 0; i < girdiler.length; i += boyut) parcalar.push(girdiler.slice(i, i + boyut))
    const xmller = parcalar.map(urlsetXml)
    if (xmller.every(x => baytUzunlugu(x) <= enFazlaBayt) || boyut === 1) {
      if (parcalar.length === 1) {
        return { dosyalar: [{ ad: dizinAdi, xml: xmller[0], adet: parcalar[0].length, bayt: baytUzunlugu(xmller[0]) }], dizin: null }
      }
      const tb = tabanDuzelt(taban, girdiler[0].url)
      const dosyalar = parcalar.map((p, i) => ({
        ad: `${onEk}-${i + 1}.xml`, xml: xmller[i], adet: p.length, bayt: baytUzunlugu(xmller[i]),
        url: `${tb}${onEk}-${i + 1}.xml`, lastmod: enYeni(p.map(g => g.lastmod)),
      }))
      const dx = indexXml(dosyalar)
      return { dosyalar, dizin: { ad: dizinAdi, xml: dx, adet: dosyalar.length, bayt: baytUzunlugu(dx) } }
    }
    boyut = Math.ceil(boyut / 2)
  }
}

// Taban adres "/" ile bitmeli; boşsa ilk adresin kökü kullanılır.
export function tabanDuzelt(taban, ornekUrl = '') {
  let t = String(taban || '').trim()
  if (!t) {
    try { t = `${new URL(ornekUrl).origin}/` } catch { t = '/' }
  }
  return t.endsWith('/') ? t : `${t}/`
}

export const ORNEK_BASIT = [
  'https://www.ornek.com/',
  'https://www.ornek.com/hizmetler/teknik-seo',
  'https://www.ornek.com/blog/site-haritasi-nedir,2026-10-28',
  'https://www.ornek.com/iletişim',
  'https://www.ornek.com/urunler?kategori=ayakkabı&renk=siyah',
].join('\n')

export const ORNEK_HREFLANG = [
  'tr|https://www.ornek.com/ en|https://www.ornek.com/en/',
  'tr|https://www.ornek.com/hakkimizda en|https://www.ornek.com/en/about de|https://www.ornek.com/de/uber-uns 2026-10-01',
].join('\n')
