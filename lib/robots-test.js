// robots.txt test aracı - saf mantık (tarayıcıdan bağımsız, test edilebilir).
// pages/araclar/robots-txt-test.js kullanır.
//
// Google'ın robots.txt yorumuna (RFC 9309 + Google Search Central dokümanı) göre:
// • Satırlar: alan:değer. Alan adları büyük/küçük harf duyarsız. # sonrası yorum.
// • Grup: art arda gelen user-agent satırları + ardından gelen kurallar.
//   Aynı user-agent için birden fazla grup varsa kuralları birleştirilir.
// • Tarayıcı, kendisiyle eşleşen EN ÖZEL grubu uygular; yoksa "*" grubunu. Diğer gruplar yok sayılır.
// • Yol eşleşmesi: * (herhangi bir dizi) ve $ (sonu) desteklenir. En uzun (en özel) kural kazanır;
//   eşit uzunlukta allow ile disallow çakışırsa daha az kısıtlayıcı olan (allow) kazanır.
// • Boş "Disallow:" hiçbir şeyi engellemez. /robots.txt her zaman erişilebilirdir.
// • Google 500 KiB sonrasını yok sayar; crawl-delay ve noindex gibi alanları desteklemez.

export const BOTLAR = [
  { id: 'googlebot', ad: 'Googlebot', grup: 'Google' },
  { id: 'googlebot-image', ad: 'Googlebot-Image', grup: 'Google' },
  { id: 'googlebot-news', ad: 'Googlebot-News', grup: 'Google' },
  { id: 'googlebot-video', ad: 'Googlebot-Video', grup: 'Google' },
  { id: 'storebot-google', ad: 'Storebot-Google', grup: 'Google' },
  { id: 'google-extended', ad: 'Google-Extended', grup: 'Google', not: 'kontrol' },
  { id: 'adsbot-google', ad: 'AdsBot-Google', grup: 'Google', not: 'yildiz-yok' },
  { id: 'bingbot', ad: 'Bingbot', grup: 'Microsoft' },
  { id: 'gptbot', ad: 'GPTBot', grup: 'OpenAI' },
  { id: 'oai-searchbot', ad: 'OAI-SearchBot', grup: 'OpenAI' },
  { id: 'chatgpt-user', ad: 'ChatGPT-User', grup: 'OpenAI', not: 'kullanici' },
  { id: 'claudebot', ad: 'ClaudeBot', grup: 'Anthropic' },
  { id: 'claude-searchbot', ad: 'Claude-SearchBot', grup: 'Anthropic' },
  { id: 'claude-user', ad: 'Claude-User', grup: 'Anthropic' },
  { id: 'perplexitybot', ad: 'PerplexityBot', grup: 'Perplexity' },
  { id: 'applebot', ad: 'Applebot', grup: 'Apple' },
  { id: 'applebot-extended', ad: 'Applebot-Extended', grup: 'Apple', not: 'kontrol' },
  { id: 'ccbot', ad: 'CCBot', grup: 'Common Crawl' },
  { id: 'yandexbot', ad: 'YandexBot', grup: 'Yandex' },
]

const MAKS_BAYT = 500 * 1024
const BILINEN = new Set(['user-agent', 'allow', 'disallow', 'sitemap'])
const GOOGLE_YOK_SAYAR = new Set(['crawl-delay', 'noindex', 'nofollow', 'host', 'clean-param', 'request-rate', 'visit-time'])

// Yaygın yazım hatalarını Google da tolere eder (ör. "dissallow"); yalnızca uyarı veriyoruz.
const YAZIM = { 'dissallow': 'disallow', 'disalow': 'disallow', 'user agent': 'user-agent', 'useragent': 'user-agent', 'user_agent': 'user-agent', 'alow': 'allow' }

export function ayristir(metin) {
  const uyarilar = []
  const gruplar = [] // { ajanlar: [], kurallar: [{tip, yol, satir}], satir }
  const siteHaritalari = []
  let ham = metin || ''
  const bayt = new TextEncoder().encode(ham).length
  if (bayt > MAKS_BAYT) {
    uyarilar.push({ kod: 'boyut', bayt })
    // 500 KiB sınırını karakter yaklaşık olarak uygula
    let kes = ham.length
    while (new TextEncoder().encode(ham.slice(0, kes)).length > MAKS_BAYT) kes = Math.floor(kes * 0.95)
    ham = ham.slice(0, kes)
  }
  let mevcut = null
  let sonKural = false
  ham.replace(/^﻿/, '').split(/\r\n|\r|\n/).forEach((satirHam, i) => {
    const no = i + 1
    const satir = satirHam.replace(/#.*$/, '').trim()
    if (!satir) return
    const iki = satir.indexOf(':')
    if (iki < 0) { uyarilar.push({ kod: 'bicim', satir: no, metin: satirHam.trim() }); return }
    let alan = satir.slice(0, iki).trim().toLowerCase()
    const deger = satir.slice(iki + 1).trim()
    if (YAZIM[alan]) { uyarilar.push({ kod: 'yazim', satir: no, alan, dogru: YAZIM[alan] }); alan = YAZIM[alan] }
    if (!BILINEN.has(alan)) {
      uyarilar.push({ kod: GOOGLE_YOK_SAYAR.has(alan) ? 'desteklenmiyor' : 'bilinmeyen', satir: no, alan })
      return
    }
    if (alan === 'sitemap') {
      if (!/^https?:\/\//i.test(deger)) uyarilar.push({ kod: 'sitemap-goreli', satir: no, deger })
      siteHaritalari.push({ url: deger, satir: no })
      return
    }
    if (alan === 'user-agent') {
      if (!mevcut || sonKural) { mevcut = { ajanlar: [], kurallar: [], satir: no }; gruplar.push(mevcut); sonKural = false }
      mevcut.ajanlar.push(deger.toLowerCase())
      return
    }
    // allow / disallow
    if (!mevcut) { uyarilar.push({ kod: 'ajansiz-kural', satir: no }); return }
    sonKural = true
    if (deger === '') return // boş disallow/allow: kural değil
    if (!deger.startsWith('/') && !deger.startsWith('*')) uyarilar.push({ kod: 'yol-bicimi', satir: no, deger })
    mevcut.kurallar.push({ tip: alan, yol: deger, satir: no })
  })
  for (const g of gruplar) {
    if (g.ajanlar.includes('*') && g.kurallar.some(k => k.tip === 'disallow' && k.yol === '/') && !g.kurallar.some(k => k.tip === 'allow')) {
      uyarilar.push({ kod: 'tumu-engelli', satir: g.satir })
    }
  }
  return { gruplar, siteHaritalari, uyarilar }
}

// Yüzde kodlamasını normalleştir: ASCII dışı karakterleri UTF-8 olarak kodla, %xx'i büyük harfe çevir.
// (Ayrılmış karakterlerin kodlanmış/kodlanmamış biçimleri birbirine dönüştürülmez.)
function normallestir(s) {
  let out = ''
  for (const ch of s) {
    const c = ch.codePointAt(0)
    if (c > 0x7e || c < 0x21) out += encodeURIComponent(ch)
    else out += ch
  }
  return out.replace(/%[0-9a-f]{2}/gi, m => m.toUpperCase())
}

function desenRegex(yol) {
  const n = normallestir(yol)
  const sonda = n.endsWith('$')
  const govde = sonda ? n.slice(0, -1) : n
  const kacis = govde.split('*').map(p => p.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('.*')
  return new RegExp('^' + kacis + (sonda ? '$' : ''))
}

// Bir tarayıcı için uygulanacak grupları seç
export function grupSec(gruplar, botId) {
  const bot = botId.toLowerCase()
  const bilgi = BOTLAR.find(b => b.id === bot)
  let enIyi = null
  let enUzun = -1
  for (const g of gruplar) {
    for (const a of g.ajanlar) {
      if (a === '*') continue
      // Tam eşleşme ya da ürün belirtecinin öneki (googlebot-image → googlebot grubunu da kabul eder)
      if (bot === a || bot.startsWith(a + '-')) {
        if (a.length > enUzun) { enUzun = a.length; enIyi = a }
      }
    }
  }
  if (enIyi) return { ajan: enIyi, gruplar: gruplar.filter(g => g.ajanlar.includes(enIyi)) }
  if (bilgi?.not === 'yildiz-yok') return { ajan: null, gruplar: [], yildizYok: true }
  const yildiz = gruplar.filter(g => g.ajanlar.includes('*'))
  return { ajan: yildiz.length ? '*' : null, gruplar: yildiz }
}

// URL'yi (tam adres ya da yol) robots.txt yol biçimine çevir: /yol?sorgu
export function yolAl(girdi) {
  const s = (girdi || '').trim()
  if (!s) return null
  try {
    const u = new URL(s, 'https://ornek.invalid')
    return u.pathname + u.search
  } catch { return null }
}

export function test(ayrik, botId, url) {
  const yol = yolAl(url)
  if (yol == null) return { gecersiz: true }
  const secim = grupSec(ayrik.gruplar, botId)
  if (yol === '/robots.txt') return { izin: true, sebep: 'robots', secim }
  const hedef = normallestir(yol)
  let kazanan = null
  for (const g of secim.gruplar) {
    for (const k of g.kurallar) {
      if (!desenRegex(k.yol).test(hedef)) continue
      const uzunluk = normallestir(k.yol).length
      if (!kazanan || uzunluk > kazanan.uzunluk || (uzunluk === kazanan.uzunluk && k.tip === 'allow' && kazanan.kural.tip !== 'allow')) {
        kazanan = { kural: k, uzunluk }
      }
    }
  }
  if (!kazanan) return { izin: true, sebep: secim.gruplar.length ? 'kural-yok' : 'grup-yok', secim }
  return { izin: kazanan.kural.tip === 'allow', kural: kazanan.kural, secim }
}

export const ORNEK_ROBOTS = `# Örnek robots.txt
User-agent: *
Disallow: /sepet/
Disallow: /hesabim/
Disallow: /*?siralama=
Allow: /hesabim/giris

User-agent: GPTBot
Disallow: /

User-agent: Googlebot-Image
Disallow: /ozel-gorseller/

Sitemap: https://www.ornek.com/sitemap.xml`
