// İndekslenebilirlik kontrolü: saf analiz mantığı (ağdan ve tarayıcıdan bağımsız, test edilebilir).
// pages/api/indekslenebilirlik.js ağ isteklerini yapar (yönlendirmeler lib/yonlendirme-kontrol.js ile,
// her adımda SSRF kontrolüyle), bu dosya gelen yanıtı yorumlar. Sayfa (pages/araclar/indekslenebilirlik-kontrolu.js)
// örnek sonucu da bu dosyayla, ağa çıkmadan üretir.
//
// Değerlendirilen sinyaller (Google Search Central dokümanlarına göre):
// • Son HTTP durum kodu ve yönlendirme: yalnızca 200 dönen son adres dizine eklenebilir.
// • robots.txt: Googlebot'un adresi tarayıp tarayamayacağı (lib/robots-test.js). Engelli adresin
//   meta robots ve canonical etiketlerini Google göremez. 4xx robots.txt "kısıtlama yok", 5xx ve 429 "tüm site engelli" sayılır.
// • X-Robots-Tag başlığı ve <meta name="robots|googlebot">: noindex, none, unavailable_after.
//   Genel ve bota özel kurallar birleşir, en kısıtlayıcı olan uygulanır.
// • rel=canonical (HTML ve HTTP Link başlığı): kendisi, başka adres, başka alan adı, birden fazla değer, gövdede olması.
// • hreflang alternatifleri: sayı, kendine referans, x-default, kod hataları (lib/hreflang-uretici.js koduDogrula), göreli adres.
// • meta refresh ve içerik türü.
//
// Google'ın kendi kararını (ör. "Tarandı, şu anda dizine eklenmiş değil") bu araç göremez;
// onun için Search Console URL Denetimi gerekir. Sayfa bunu açıkça söyler.

import { metaRefreshBul } from './yonlendirme-kontrol'
import { ayristir as robotsAyristir, test as robotsTest } from './robots-test'
import { koduDogrula } from './hreflang-uretici'

export const EN_FAZLA_HTML_BAYT = 512 * 1024

export const KONTROL_BOTLARI = [
  { id: 'googlebot', ad: 'Googlebot', ana: true },
  { id: 'bingbot', ad: 'Bingbot' },
  { id: 'gptbot', ad: 'GPTBot' },
  { id: 'google-extended', ad: 'Google-Extended' },
]

const DEGERLI_DIREKTIFLER = new Set(['max-snippet', 'max-image-preview', 'max-video-preview', 'unavailable_after'])
const BILINEN_DIREKTIFLER = new Set(['all', 'index', 'follow', 'noindex', 'nofollow', 'none', 'noarchive', 'nocache', 'nosnippet', 'indexifembedded', 'notranslate', 'noimageindex', 'noodp', 'noydir', ...DEGERLI_DIREKTIFLER])

const VARLIK = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', '#39': "'", '#x27': "'", '#47': '/', '#x2f': '/', '#x2F': '/' }
const varlikCoz = (s) => String(s || '').replace(/&(amp|quot|apos|lt|gt|#39|#x27|#47|#x2f|#x2F);/g, (_, k) => VARLIK[k])

// Etiket özniteliklerini { ad: değer } nesnesine çevirir (ad küçük harf, değer varlıkları çözülmüş).
export function oznitelikler(metin) {
  const oz = {}
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g
  let m
  while ((m = re.exec(metin || '')) !== null) {
    const ad = m[1].toLowerCase()
    if (ad in oz) continue // tarayıcılar gibi ilk değeri kullan
    oz[ad] = varlikCoz(m[3] ?? m[4] ?? m[5] ?? '')
  }
  return oz
}

// <head> içinde bulunabilecek etiketler. Başka bir etiket (ör. <img>, <div>, <iframe>) görülürse
// HTML ayrıştırıcısı head bölümünü orada kapatır; sonraki meta ve link etiketleri gövdede sayılır.
const HEAD_ETIKETLERI = new Set(['html', 'head', 'meta', 'link', 'title', 'base', 'script', 'style', 'noscript', 'template'])

const ADRESTEN = (ham, taban) => {
  const s = String(ham || '').trim()
  if (!s) return null
  try {
    const u = new URL(s, taban || undefined)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null
    return u.toString()
  } catch { return null }
}

/**
 * HTML'deki meta robots, canonical, hreflang, base, title ve meta refresh bilgilerini çıkarır.
 * Yorumlar, <script>, <style>, <template> ve <noscript> içerikleri atlanır.
 * Her etiket için konum: 'head' | 'govde'. Head erken kapandıysa kirilma alanında kapatan etiket yazar.
 */
export function htmlAyristir(html, sayfaUrl = '') {
  const ham = String(html || '').slice(0, EN_FAZLA_HTML_BAYT)
  const temiz = ham
    .replace(/<!--[\s\S]*?(?:-->|$)/g, '')
    .replace(/<script\b[\s\S]*?(?:<\/script\s*>|$)/gi, '<script></script>')
    .replace(/<style\b[\s\S]*?(?:<\/style\s*>|$)/gi, '<style></style>')
    .replace(/<template\b[\s\S]*?(?:<\/template\s*>|$)/gi, '')
    .replace(/<noscript\b[\s\S]*?(?:<\/noscript\s*>|$)/gi, '')

  // Head sınırı: </head>, <body> ya da head'e ait olmayan ilk etiket
  let headSonu = temiz.length
  let kirilma = null
  const etiketRe = /<\/?([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*>/g
  let m
  while ((m = etiketRe.exec(temiz)) !== null) {
    const ad = m[1].toLowerCase()
    const kapanis = m[0][1] === '/'
    if (kapanis && ad === 'head') { headSonu = m.index; break }
    if (ad === 'body') { headSonu = m.index; break }
    if (!kapanis && !HEAD_ETIKETLERI.has(ad)) { headSonu = m.index; kirilma = ad; break }
  }
  // </head>, <body> ya da kırılma bulunmazsa (ör. yalnızca head etiketlerinden oluşan parça) her şey head sayılır.

  const konum = (i) => (i < headSonu ? 'head' : 'govde')
  let baseHref = null
  let title = null
  const metaRobots = []
  const canonicallar = []
  const hreflanglar = []

  const tm = temiz.slice(0, headSonu).match(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/i) || temiz.match(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/i)
  if (tm) title = varlikCoz(tm[1].replace(/\s+/g, ' ').trim()).slice(0, 300)

  const baseM = temiz.slice(0, headSonu).match(/<base\b([^>]*)>/i)
  if (baseM) {
    const href = oznitelikler(baseM[1]).href
    if (href) baseHref = ADRESTEN(href, sayfaUrl) || null
  }
  const taban = baseHref || sayfaUrl

  const metaRe = /<meta\b([^>]*)>/gi
  while ((m = metaRe.exec(temiz)) !== null) {
    const oz = oznitelikler(m[1])
    const ad = (oz.name || '').trim().toLowerCase()
    if (!ad || !('content' in oz)) continue
    if (ad === 'robots' || /bot/.test(ad) || ad === 'slurp' || ad === 'yandex') {
      metaRobots.push({ ad, icerik: oz.content.trim(), konum: konum(m.index) })
    }
  }

  const linkRe = /<link\b([^>]*)>/gi
  while ((m = linkRe.exec(temiz)) !== null) {
    const oz = oznitelikler(m[1])
    const rel = (oz.rel || '').toLowerCase().split(/\s+/).filter(Boolean)
    if (rel.includes('canonical')) {
      const hamHref = oz.href ?? ''
      canonicallar.push({ ham: hamHref, url: ADRESTEN(hamHref, taban), goreli: !/^https?:\/\//i.test(hamHref.trim()), konum: konum(m.index), kaynak: 'html' })
    }
    if (rel.includes('alternate') && 'hreflang' in oz) {
      const hamHref = oz.href ?? ''
      hreflanglar.push({ kod: oz.hreflang.trim(), ham: hamHref, url: ADRESTEN(hamHref, taban), goreli: !/^https?:\/\//i.test(hamHref.trim()), konum: konum(m.index), kaynak: 'html' })
    }
  }

  const refreshHam = metaRefreshBul(temiz, taban || undefined)
  return { title, baseHref, metaRobots, canonicallar, hreflanglar, metaRefresh: refreshHam, kirilma, kirildi: !!kirilma }
}

/**
 * HTTP Link başlığını ayrıştırır: <https://a/>; rel="canonical", <https://b/>; rel="alternate"; hreflang="en"
 * Virgüller hem başlık birleştirmede hem bağlantı ayırmada kullanıldığı için < > sınırına göre bölünür.
 */
export function linkBasligiAyristir(deger, taban = '') {
  const sonuc = { canonicallar: [], hreflanglar: [] }
  if (!deger) return sonuc
  const re = /<([^>]*)>\s*((?:;\s*[^;,<]+(?:=\s*(?:"[^"]*"|[^;,<]*))?)*)/g
  let m
  while ((m = re.exec(String(deger))) !== null) {
    const hamHref = m[1].trim()
    const p = {}
    const pre = /;\s*([a-zA-Z*-]+)\s*(?:=\s*(?:"([^"]*)"|([^;,<]*)))?/g
    let q
    while ((q = pre.exec(m[2])) !== null) p[q[1].toLowerCase()] = (q[2] ?? q[3] ?? '').trim()
    const rel = (p.rel || '').toLowerCase().split(/\s+/)
    if (rel.includes('canonical')) sonuc.canonicallar.push({ ham: hamHref, url: ADRESTEN(hamHref, taban), goreli: !/^https?:\/\//i.test(hamHref), konum: 'baslik', kaynak: 'baslik' })
    if (rel.includes('alternate') && p.hreflang) sonuc.hreflanglar.push({ kod: p.hreflang, ham: hamHref, url: ADRESTEN(hamHref, taban), goreli: !/^https?:\/\//i.test(hamHref), konum: 'baslik', kaynak: 'baslik' })
  }
  return sonuc
}

/**
 * Robots direktif dizisini ayrıştırır. X-Robots-Tag için bot öneki desteklenir:
 *   "googlebot: noindex, nofollow"  "otherbot: noindex"  "max-snippet: 20"  "unavailable_after: 2025-12-31"
 * Bot öneki, aynı başlık değerinde yeni bir önek gelene kadar sonraki direktiflere de uygulanır.
 * Dönen öğe: { bot: null | 'googlebot', direktif: 'noindex', deger?: '20', bilinmeyen?: true }
 */
export function direktifAyristir(metin, { botOneki = true, bot: varsayilanBot = null } = {}) {
  const sonuc = []
  let bot = varsayilanBot
  for (const parca of String(metin || '').split(',')) {
    let t = parca.trim()
    if (!t) continue
    if (botOneki) {
      const m = t.match(/^([a-z0-9_.-]+)\s*:\s*(.*)$/i)
      if (m && !DEGERLI_DIREKTIFLER.has(m[1].toLowerCase()) && !BILINEN_DIREKTIFLER.has(m[1].toLowerCase())) {
        bot = m[1].toLowerCase()
        t = m[2].trim()
        if (!t) continue
      }
    }
    const d = t.match(/^([a-z_-]+)\s*(?::\s*(.*))?$/i)
    const ad = d ? d[1].toLowerCase() : ''
    if (d && DEGERLI_DIREKTIFLER.has(ad)) {
      sonuc.push({ bot, direktif: ad, deger: (d[2] || '').trim() })
    } else if (BILINEN_DIREKTIFLER.has(t.toLowerCase())) {
      sonuc.push({ bot, direktif: t.toLowerCase() })
    } else if (sonuc.length && sonuc[sonuc.length - 1].direktif === 'unavailable_after') {
      // Tarih virgül içerebilir (ör. "Friday, 25-Jun-2010 15:00:00 GMT")
      sonuc[sonuc.length - 1].deger += `, ${t}`
    } else {
      sonuc.push({ bot, direktif: t.toLowerCase(), bilinmeyen: true })
    }
  }
  return sonuc
}

// X-Robots-Tag değeri (fetch birden fazla başlığı virgülle birleştirir)
export const xRobotsAyristir = (deger) => direktifAyristir(deger, { botOneki: true }).map(x => ({ ...x, kaynak: 'x-robots' }))

// <meta name="robots|googlebot" content="..."> listesinden direktifler. name="robots" genel (bot: null) sayılır.
export function metaDirektifleri(metaRobots) {
  const sonuc = []
  for (const mr of metaRobots || []) {
    const bot = mr.ad === 'robots' ? null : mr.ad
    for (const d of direktifAyristir(mr.icerik, { botOneki: false, bot })) sonuc.push({ ...d, kaynak: 'meta', konum: mr.konum })
  }
  return sonuc
}

function tarihCoz(s) {
  const t = Date.parse(String(s || '').trim())
  return Number.isFinite(t) ? t : null
}

/**
 * Bir bot için geçerli direktifleri birleştirir. Genel (bot: null) ve bota özel kurallar birlikte uygulanır;
 * çakışmada en kısıtlayıcı kazanır (Google davranışı). 'googlebot-news' kuralları 'googlebot'a uygulanmaz.
 */
export function etkinDirektifler(direktifler, botId = 'googlebot', simdi = Date.now()) {
  const bot = botId.toLowerCase()
  const gecerli = (direktifler || []).filter(d => d.bot == null || d.bot === bot)
  const var_ = (ad) => gecerli.some(d => d.direktif === ad)
  const ua = gecerli.find(d => d.direktif === 'unavailable_after')
  const uaZaman = ua ? tarihCoz(ua.deger) : null
  const r = {
    gecerli,
    noindex: var_('noindex') || var_('none'),
    nofollow: var_('nofollow') || var_('none'),
    nosnippet: var_('nosnippet'),
    noimageindex: var_('noimageindex'),
    noarchive: var_('noarchive'),
    indexifembedded: var_('indexifembedded'),
    unavailableAfter: ua ? { ham: ua.deger, zaman: uaZaman, gecmis: uaZaman != null && uaZaman <= simdi } : null,
  }
  r.kaynak = r.noindex ? gecerli.find(d => d.direktif === 'noindex' || d.direktif === 'none') : null
  return r
}

// Karşılaştırma için normal biçim: parça (#) atılır; alan adı küçük harf ve varsayılan port URL tarafından düzeltilir.
export function urlNormal(u) {
  try { const x = new URL(u); x.hash = ''; return x.toString() } catch { return null }
}

const wwwsuz = (h) => h.replace(/^www\./i, '').toLowerCase()

// İki adres arasındaki farkın türü: null (aynı), 'alan', 'www', 'protokol', 'egik', 'harf', 'sorgu', 'yol'
export function adresFarki(a, b) {
  const na = urlNormal(a)
  const nb = urlNormal(b)
  if (!na || !nb) return 'gecersiz'
  if (na === nb) return null
  const x = new URL(na)
  const y = new URL(nb)
  if (wwwsuz(x.hostname) !== wwwsuz(y.hostname)) return 'alan'
  if (x.hostname.toLowerCase() !== y.hostname.toLowerCase()) return 'www'
  if (x.port !== y.port) return 'alan'
  if (x.protocol !== y.protocol) return 'protokol'
  if (x.pathname !== y.pathname) {
    if (x.pathname + '/' === y.pathname || x.pathname === y.pathname + '/') return 'egik'
    if (x.pathname.toLowerCase() === y.pathname.toLowerCase()) return 'harf'
    return 'yol'
  }
  return 'sorgu'
}

/** robots.txt yanıtını değerlendirir. robots: { durum, metin, url, hata } | null */
export function robotsDegerlendir(robots, hedefUrl) {
  if (!robots) return { durumTuru: 'kontrol-edilmedi', botlar: [] }
  if (robots.hata) return { durumTuru: 'okunamadi', detay: robots.hata, url: robots.url || null, botlar: [] }
  const d = robots.durum
  if (d >= 200 && d < 300) {
    const ayrik = robotsAyristir(robots.metin || '')
    const botlar = KONTROL_BOTLARI.map(b => {
      const r = robotsTest(ayrik, b.id, hedefUrl)
      return { id: b.id, ad: b.ad, ana: !!b.ana, izin: r.gecersiz ? null : r.izin, kural: r.kural || null, ajan: r.secim?.ajan ?? null }
    })
    return { durumTuru: 'var', durum: d, url: robots.url || null, botlar, uyarilar: ayrik.uyarilar.length }
  }
  // Google: 429 ve 5xx tüm siteyi geçici olarak engelli sayar; diğer 4xx robots.txt yokmuş gibi davranır.
  if (d === 429 || d >= 500) return { durumTuru: 'sunucu-hatasi', durum: d, url: robots.url || null, botlar: KONTROL_BOTLARI.map(b => ({ id: b.id, ad: b.ad, ana: !!b.ana, izin: false, kural: null, ajan: null })) }
  if (d >= 400) return { durumTuru: 'yok', durum: d, url: robots.url || null, botlar: KONTROL_BOTLARI.map(b => ({ id: b.id, ad: b.ad, ana: !!b.ana, izin: true, kural: null, ajan: null })) }
  return { durumTuru: 'okunamadi', durum: d, url: robots.url || null, botlar: [] }
}

/** hreflang listesini değerlendirir (HTML ve Link başlığından gelenler birlikte). */
export function hreflangDegerlendir(liste, sayfaUrl) {
  const sayfa = urlNormal(sayfaUrl)
  const kodHatalari = []
  const kodlar = new Map() // normal kod → Set(url)
  let xDefault = false
  let kendisi = false
  let goreli = 0
  let gecersizUrl = 0
  for (const h of liste || []) {
    const k = koduDogrula(h.kod)
    if (k.hata) kodHatalari.push({ ham: h.kod, hata: k.hata, oneri: k.oneri || null })
    const kod = k.kod || String(h.kod || '').toLowerCase()
    if (kod === 'x-default') xDefault = true
    if (h.goreli) goreli++
    if (!h.url) { gecersizUrl++; continue }
    if (sayfa && urlNormal(h.url) === sayfa) kendisi = true
    if (!kodlar.has(kod.toLowerCase())) kodlar.set(kod.toLowerCase(), new Set())
    kodlar.get(kod.toLowerCase()).add(urlNormal(h.url))
  }
  const tekrarlar = [...kodlar.entries()].filter(([, s]) => s.size > 1).map(([k]) => k)
  return { adet: (liste || []).length, dilSayisi: kodlar.size, xDefault, kendisi, goreli, gecersizUrl, kodHatalari, tekrarlar }
}

const HATA_SEVIYE = { hata: 3, uyari: 2, bilgi: 1, iyi: 0 }

// Kontrollerden genel karar: 'engel' (en az bir hata), 'dikkat' (uyarı), 'uygun'
export function kararVer(kontroller) {
  const en = Math.max(0, ...kontroller.map(k => HATA_SEVIYE[k.seviye] ?? 0))
  return en >= 3 ? 'engel' : en === 2 ? 'dikkat' : 'uygun'
}

/**
 * Ana analiz.
 * girdi: {
 *   istenenUrl,
 *   sonuc: zinciriTakipEt(..., { ayrinti: true }) çıktısı (adimlar, sonUrl, sonDurum, dongu, sinirAsildi, hata, sonBasliklar, govde),
 *   robots: { durum, metin, url } | { hata, url } | null,
 * }
 * Dönen: { karar, sonUrl, kontroller: [{ grup, kod, seviye, ...parametreler }], ham, robots }
 */
export function analizEt({ istenenUrl, sonuc, robots = null }, { simdi = Date.now() } = {}) {
  const k = []
  const ekle = (grup, kod, seviye, p = {}) => k.push({ grup, kod, seviye, ...p })
  const adimlar = sonuc?.adimlar || []
  const yonSayisi = adimlar.filter(a => a.sonraki).length
  const son = adimlar[adimlar.length - 1] || null
  const sonUrl = sonuc?.sonUrl || null
  const ham = { istenenUrl, sonUrl, yonSayisi, durum: sonuc?.sonDurum ?? null, icerikTuru: null, xRobotsTag: null, link: null, title: null, metaRobots: [], canonicallar: [], hreflanglar: [], metaRefresh: null, baseHref: null, robotsUrl: robots?.url || null, robotsDurum: robots?.durum ?? null }

  // 1) Erişim ve durum kodu
  if (!sonuc || !son || sonuc.dongu || sonuc.sinirAsildi || sonuc.hata || !sonUrl) {
    const neden = sonuc?.dongu ? 'dongu' : sonuc?.sinirAsildi ? 'sinir' : (sonuc?.hata || 'bilinmiyor')
    ekle('durum', 'erisilemedi', 'hata', { neden, detay: son?.detay || '' })
    return { karar: 'engel', sonUrl: null, kontroller: k, ham, robots: robotsDegerlendir(robots, istenenUrl) }
  }

  const d = sonuc.sonDurum
  if (d === 200) ekle('durum', 'durum-200', 'iyi', { durum: d })
  else if (d >= 200 && d < 300) ekle('durum', 'durum-2xx', 'uyari', { durum: d })
  else if (d === 404) ekle('durum', 'durum-404', 'hata', { durum: d })
  else if (d === 410) ekle('durum', 'durum-410', 'hata', { durum: d })
  else if (d === 401 || d === 403) ekle('durum', 'durum-erisim', 'hata', { durum: d })
  else if (d === 429) ekle('durum', 'durum-429', 'uyari', { durum: d })
  else if (d >= 500) ekle('durum', 'durum-5xx', 'hata', { durum: d })
  else if (d >= 400) ekle('durum', 'durum-4xx', 'hata', { durum: d })
  else ekle('durum', 'durum-diger', 'uyari', { durum: d })

  if (yonSayisi > 0) ekle('yonlendirme', 'yonlendirme-var', 'uyari', { adim: yonSayisi, istenenUrl, sonUrl })
  else ekle('yonlendirme', 'yonlendirme-yok', 'iyi')

  // 2) Başlıklar ve içerik türü
  const b = sonuc.sonBasliklar || {}
  const tur = String(b.icerikTuru || son.icerikTuru || '').toLowerCase()
  const turKisa = tur.split(';')[0].trim()
  ham.icerikTuru = b.icerikTuru || son.icerikTuru || null
  ham.xRobotsTag = b.xRobotsTag || null
  ham.link = b.link || null
  const htmlMi = /text\/html|application\/xhtml/.test(turKisa)
  // Başarılı olmayan yanıtlarda (4xx, 5xx) sayfa etiketleri anlamsızdır: yalnızca durum, başlık ve robots.txt değerlendirilir
  const basarili = d >= 200 && d < 300
  if (!turKisa) ekle('icerik-turu', 'tur-yok', 'uyari')
  else if (htmlMi) ekle('icerik-turu', 'tur-html', 'iyi', { tur: turKisa })
  else ekle('icerik-turu', 'tur-diger', 'bilgi', { tur: turKisa })

  const ayrik = basarili && htmlMi && sonuc.govde ? htmlAyristir(sonuc.govde, sonUrl) : null
  const linkB = basarili ? linkBasligiAyristir(b.link, sonUrl) : { canonicallar: [], hreflanglar: [] }
  if (ayrik) {
    ham.title = ayrik.title
    ham.metaRobots = ayrik.metaRobots
    ham.metaRefresh = ayrik.metaRefresh
    ham.baseHref = ayrik.baseHref
  }
  const canonicallar = [...linkB.canonicallar, ...(ayrik?.canonicallar || [])]
  const hreflanglar = [...linkB.hreflanglar, ...(ayrik?.hreflanglar || [])]
  ham.canonicallar = canonicallar
  ham.hreflanglar = hreflanglar

  // 3) robots.txt
  const r = robotsDegerlendir(robots, sonUrl)
  const gb = r.botlar.find(x => x.id === 'googlebot')
  let robotsEngel = false
  if (r.durumTuru === 'var') {
    if (gb && gb.izin === false) { robotsEngel = true; ekle('robots-txt', 'robots-engel', 'hata', { kural: gb.kural, ajan: gb.ajan, url: r.url }) }
    else ekle('robots-txt', 'robots-izin', 'iyi', { kural: gb?.kural || null, ajan: gb?.ajan ?? null, url: r.url })
  } else if (r.durumTuru === 'yok') ekle('robots-txt', 'robots-yok', 'iyi', { durum: r.durum, url: r.url })
  else if (r.durumTuru === 'sunucu-hatasi') {
    robotsEngel = true
    ekle('robots-txt', r.durum === 429 ? 'robots-429' : 'robots-5xx', r.durum === 429 ? 'uyari' : 'hata', { durum: r.durum, url: r.url })
  } else if (r.durumTuru === 'okunamadi') ekle('robots-txt', 'robots-okunamadi', 'uyari', { detay: r.detay || '', url: r.url })

  // 4) X-Robots-Tag
  const xr = xRobotsAyristir(b.xRobotsTag)
  const md = metaDirektifleri(ayrik?.metaRobots)
  const xrGb = etkinDirektifler(xr, 'googlebot', simdi)
  const digerBotXr = xr.filter(x => x.bot && x.bot !== 'googlebot' && (x.direktif === 'noindex' || x.direktif === 'none'))
  if (!xr.length) ekle('x-robots', 'xrobots-yok', 'iyi')
  else if (xrGb.noindex) ekle('x-robots', 'xrobots-noindex', 'hata', { deger: b.xRobotsTag, bot: xrGb.kaynak?.bot || null })
  else {
    const digerleri = xrGb.gecerli.filter(x => !['all', 'index', 'follow', 'unavailable_after'].includes(x.direktif)).map(x => x.direktif + (x.deger ? `: ${x.deger}` : ''))
    ekle('x-robots', digerleri.length ? 'xrobots-diger' : 'xrobots-index', digerleri.length ? 'bilgi' : 'iyi', { deger: b.xRobotsTag, direktifler: digerleri })
  }
  if (digerBotXr.length) ekle('x-robots', 'xrobots-baska-bot', 'bilgi', { botlar: [...new Set(digerBotXr.map(x => x.bot))] })

  // 5) Meta robots
  const mdGb = etkinDirektifler(md, 'googlebot', simdi)
  if (ayrik) {
    const genelVeGoogle = ayrik.metaRobots.filter(x => x.ad === 'robots' || x.ad === 'googlebot')
    if (!genelVeGoogle.length) ekle('meta-robots', 'meta-yok', 'iyi')
    else if (mdGb.noindex) {
      const kaynak = genelVeGoogle.find(x => /noindex|none/i.test(x.icerik)) || genelVeGoogle[0]
      ekle('meta-robots', 'meta-noindex', 'hata', { ad: kaynak.ad, icerik: kaynak.icerik })
    } else {
      const digerleri = mdGb.gecerli.filter(x => !['all', 'index', 'follow', 'unavailable_after'].includes(x.direktif)).map(x => x.direktif + (x.deger ? `: ${x.deger}` : ''))
      ekle('meta-robots', digerleri.length ? 'meta-diger' : 'meta-index', digerleri.length ? 'bilgi' : 'iyi', { icerik: genelVeGoogle.map(x => `${x.ad}: ${x.icerik}`).join(' | '), direktifler: digerleri })
    }
    const robotsMetalari = ayrik.metaRobots.filter(x => x.ad === 'robots')
    if (robotsMetalari.length > 1 && new Set(robotsMetalari.map(x => x.icerik.toLowerCase().replace(/\s+/g, ''))).size > 1) {
      ekle('meta-robots', 'meta-celisen', 'uyari', { degerler: robotsMetalari.map(x => x.icerik) })
    }
    if (genelVeGoogle.some(x => x.konum === 'govde')) ekle('meta-robots', 'meta-govdede', 'uyari', { kirilma: ayrik.kirilma })
    const digerBotMeta = ayrik.metaRobots.filter(x => x.ad !== 'robots' && x.ad !== 'googlebot' && /noindex|none/i.test(x.icerik))
    if (digerBotMeta.length) ekle('meta-robots', 'meta-baska-bot', 'bilgi', { botlar: [...new Set(digerBotMeta.map(x => x.ad))] })
  } else if (!basarili) {
    // durum kodu zaten engel; etiketler okunmaz
  } else if (!htmlMi) {
    ekle('meta-robots', 'meta-uygulanmaz', 'bilgi')
  } else {
    ekle('meta-robots', 'meta-okunamadi', 'uyari')
  }

  // unavailable_after (X-Robots-Tag ya da meta)
  const ua = xrGb.unavailableAfter || mdGb.unavailableAfter
  if (ua) {
    if (ua.zaman == null) ekle('x-robots', 'unavailable-gecersiz', 'uyari', { deger: ua.ham })
    else if (ua.gecmis) ekle('x-robots', 'unavailable-gecmis', 'hata', { deger: ua.ham })
    else ekle('x-robots', 'unavailable-gelecek', 'uyari', { deger: ua.ham })
  }
  const noindex = xrGb.noindex || mdGb.noindex || !!(ua && ua.gecmis)

  // 6) Canonical
  let canonicalBaska = null
  if (!canonicallar.length) {
    if (basarili && (htmlMi || b.link)) ekle('canonical', 'canonical-yok', 'bilgi')
  } else {
    const gecerli = canonicallar.filter(c => c.url)
    const gecersiz = canonicallar.filter(c => !c.url)
    const benzersiz = [...new Set(gecerli.map(c => urlNormal(c.url)))]
    if (gecersiz.length) ekle('canonical', 'canonical-gecersiz', 'uyari', { ham: gecersiz.map(c => c.ham || '') })
    if (benzersiz.length > 1) {
      const baslikHtml = gecerli.some(c => c.kaynak === 'baslik') && gecerli.some(c => c.kaynak === 'html')
      ekle('canonical', baslikHtml ? 'canonical-baslik-celiski' : 'canonical-coklu', 'uyari', { urller: benzersiz })
    } else if (benzersiz.length === 1) {
      const hedef = benzersiz[0]
      const fark = adresFarki(sonUrl, hedef)
      if (gecerli.length > 1) ekle('canonical', 'canonical-coklu-ayni', 'bilgi', { adet: gecerli.length })
      if (fark === null) ekle('canonical', 'canonical-kendisi', 'iyi', { url: hedef, kaynak: gecerli[0].kaynak })
      else if (fark === 'alan') { canonicalBaska = hedef; ekle('canonical', 'canonical-alan', 'uyari', { url: hedef }) }
      else { canonicalBaska = hedef; ekle('canonical', 'canonical-baska', 'uyari', { url: hedef, fark }) }
      if (/^http:/i.test(hedef) && /^https:/i.test(sonUrl)) ekle('canonical', 'canonical-http', 'uyari', { url: hedef })
    }
    if (gecerli.some(c => c.goreli && c.kaynak === 'html')) ekle('canonical', 'canonical-goreli', 'bilgi', { ham: gecerli.find(c => c.goreli).ham })
    if (canonicallar.some(c => c.konum === 'govde')) ekle('canonical', 'canonical-govdede', 'uyari', { kirilma: ayrik?.kirilma || null })
  }

  // 7) hreflang
  if (hreflanglar.length) {
    const h = hreflangDegerlendir(hreflanglar, sonUrl)
    ekle('hreflang', 'hreflang-var', 'iyi', { adet: h.adet, dilSayisi: h.dilSayisi, xDefault: h.xDefault })
    if (h.kodHatalari.length) ekle('hreflang', 'hreflang-kod', 'uyari', { hatalar: h.kodHatalari })
    if (!h.kendisi) ekle('hreflang', 'hreflang-kendisi-yok', canonicalBaska ? 'bilgi' : 'uyari')
    if (!h.xDefault) ekle('hreflang', 'hreflang-xdefault-yok', 'bilgi')
    if (h.tekrarlar.length) ekle('hreflang', 'hreflang-tekrar', 'uyari', { kodlar: h.tekrarlar })
    if (h.goreli) ekle('hreflang', 'hreflang-goreli', 'uyari', { adet: h.goreli })
    if (canonicalBaska) ekle('hreflang', 'hreflang-canonical', 'uyari', { url: canonicalBaska })
    if (hreflanglar.some(x => x.konum === 'govde')) ekle('hreflang', 'hreflang-govdede', 'uyari')
  } else if (basarili && htmlMi) {
    ekle('hreflang', 'hreflang-yok', 'bilgi')
  }

  // 8) Meta refresh
  if (ayrik?.metaRefresh) ekle('meta-refresh', 'refresh-var', 'uyari', { sure: ayrik.metaRefresh.sure, url: ayrik.metaRefresh.url })
  else if (ayrik) ekle('meta-refresh', 'refresh-yok', 'iyi')

  // 9) Çelişkili sinyaller
  if (noindex && canonicalBaska) ekle('celiski', 'noindex-canonical', 'uyari', { url: canonicalBaska })
  if (robotsEngel && (noindex || canonicallar.length)) ekle('celiski', 'robots-engel-gorunmez', 'uyari', { noindex })
  if (ayrik?.kirildi && (ayrik.canonicallar.some(c => c.konum === 'govde') || ayrik.metaRobots.some(x => x.konum === 'govde') || ayrik.hreflanglar.some(x => x.konum === 'govde'))) {
    ekle('celiski', 'head-kirildi', 'uyari', { etiket: ayrik.kirilma })
  }

  return { karar: kararVer(k), sonUrl, kontroller: k, ham, robots: r }
}

// Sayfada örnek olarak gösterilen, ağa çıkmadan üretilmiş bir girdi.
export const ORNEK_GIRDI = {
  istenenUrl: 'http://ornek.com/hizmetler',
  sonuc: {
    baslangic: 'http://ornek.com/hizmetler',
    adimlar: [
      { url: 'http://ornek.com/hizmetler', durum: 301, durumMetni: 'Moved Permanently', location: 'https://www.ornek.com/hizmetler/', sonraki: 'https://www.ornek.com/hizmetler/', sureMs: 110, yontem: 'HEAD' },
      { url: 'https://www.ornek.com/hizmetler/', durum: 200, durumMetni: 'OK', location: null, sonraki: null, sureMs: 230, yontem: 'HEAD', icerikTuru: 'text/html' },
    ],
    sonUrl: 'https://www.ornek.com/hizmetler/',
    sonDurum: 200,
    dongu: false, donguUrl: null, sinirAsildi: false, metaRefresh: null, hata: null, toplamSureMs: 340,
    sonBasliklar: { xRobotsTag: null, link: null, icerikTuru: 'text/html; charset=utf-8' },
    govde: `<!doctype html><html lang="tr"><head><meta charset="utf-8"><title>Hizmetler | Örnek</title>
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="https://www.ornek.com/hizmetler">
<link rel="alternate" hreflang="tr" href="https://www.ornek.com/hizmetler/">
<link rel="alternate" hreflang="en-UK" href="https://www.ornek.com/en/services/">
</head><body><h1>Hizmetler</h1></body></html>`,
  },
  robots: { durum: 200, url: 'https://www.ornek.com/robots.txt', metin: 'User-agent: *\nDisallow: /sepet/\n\nUser-agent: GPTBot\nDisallow: /\n\nSitemap: https://www.ornek.com/sitemap.xml' },
}

// İngilizce sayfa için aynı örnek, example.com ve İngilizce başlıkla
export const ORNEK_GIRDI_EN = JSON.parse(JSON.stringify(ORNEK_GIRDI)
  .replace(/ornek\.com/g, 'example.com').replace(/\/hizmetler/g, '/services')
  .replace('Hizmetler | Örnek', 'Services | Example').replace('<h1>Hizmetler</h1>', '<h1>Services</h1>')
  .replace('lang=\\"tr\\"', 'lang=\\"en\\"').replace('/sepet/', '/cart/'))
