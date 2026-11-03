// hreflang oluşturucu — saf mantık (tarayıcıdan bağımsız, test edilebilir).
// pages/araclar/hreflang-olusturucu.js kullanır.
//
// Google kuralları (Search Central "Localized versions" dokümanı):
// • Değer: ISO 639-1 dil kodu, isteğe bağlı olarak "-" ve ISO 3166-1 Alpha 2 bölge kodu (ör. tr, en-GB).
//   Bölge tek başına kullanılamaz. "x-default" eşleşmeyen kullanıcılar için yedek sayfadır.
// • Her dil sürümü, kendisi dahil tüm sürümleri listelemeli (karşılıklılık); URL'ler tam adres olmalı.
// • Üç yöntem eşdeğerdir: HTML <link>, HTTP Link başlığı, XML site haritası.

const DILLER = 'aa ab ae af ak am an ar as av ay az ba be bg bh bi bm bn bo br bs ca ce ch co cr cs cu cv cy da de dv dz ee el en eo es et eu fa ff fi fj fo fr fy ga gd gl gn gu gv ha he hi ho hr ht hu hy hz ia id ie ig ii ik io is it iu ja jv ka kg ki kj kk kl km kn ko kr ks ku kv kw ky la lb lg li ln lo lt lu lv mg mh mi mk ml mn mr ms mt my na nb nd ne ng nl nn no nr nv ny oc oj om or os pa pi pl ps pt qu rm rn ro ru rw sa sc sd se sg si sk sl sm sn so sq sr ss st su sv sw ta te tg th ti tk tl tn to tr ts tt tw ty ug uk ur uz ve vi vo wa wo xh yi yo za zh zu'.split(' ')
const BOLGELER = 'AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW'.split(' ')
const DIL_SET = new Set(DILLER)
const BOLGE_SET = new Set(BOLGELER)
// Sık yapılan hatalar → doğru öneri
// Not: 'uk' (Ukraynaca), 'eu' (Baskça) ve 'se' (Kuzey Samice) GEÇERLİ dil kodlarıdır; yalnızca bölge olarak hatalıdır.
const DUZELTME = { jp: 'ja', cn: 'zh', kr: 'ko', gr: 'el', dk: 'da', cz: 'cs', ua: 'uk', iw: 'he', in: 'id', ji: 'yi' }

// Kodu doğrula ve standart yazıma çevir: dil küçük harf, bölge büyük harf (Google büyük/küçük harfe duyarsızdır; okunurluk için)
export function koduDogrula(hamKod) {
  const ham = (hamKod || '').trim().replace('_', '-')
  if (!ham) return { hata: 'bos' }
  if (ham.toLowerCase() === 'x-default') return { kod: 'x-default' }
  const k = ham.toLowerCase()
  if (k in DUZELTME) return { hata: 'yaygin-hata', ham, oneri: DUZELTME[k] }
  const p = ham.split('-')
  if (p.length > 2) return { hata: 'bicim', ham }
  const [dil, bolge] = p
  if (!DIL_SET.has(dil.toLowerCase())) {
    if (BOLGE_SET.has(dil.toUpperCase()) && !bolge) return { hata: 'yalniz-bolge', ham }
    return { hata: 'dil', ham }
  }
  if (bolge !== undefined) {
    if (bolge.toLowerCase() === 'uk') return { hata: 'yaygin-hata', ham, oneri: `${dil.toLowerCase()}-GB` }
    if (bolge.toLowerCase() === 'eu' || bolge.toLowerCase() === '419') return { hata: 'bolge-desteklenmiyor', ham }
    if (!BOLGE_SET.has(bolge.toUpperCase())) return { hata: 'bolge', ham }
    return { kod: `${dil.toLowerCase()}-${bolge.toUpperCase()}` }
  }
  return { kod: dil.toLowerCase() }
}

const tamUrlMi = (u) => /^https?:\/\/[^\s/]+\.[^\s/]+/i.test(u)

// sutunlar: ['tr', 'en', 'de-DE', 'x-default']; satirlar: her sayfa grubu için URL dizisi (boş = o dilde yok)
export function analizEt(sutunlarHam, satirlarHam) {
  const hatalar = []
  const uyarilar = []
  const sutunlar = sutunlarHam.map((s, i) => {
    const r = koduDogrula(s)
    if (r.hata) hatalar.push({ kod: r.hata, sutun: i + 1, ham: r.ham ?? s, oneri: r.oneri })
    return r.kod || null
  })
  const tekrar = sutunlar.filter((k, i) => k && sutunlar.indexOf(k) !== i)
  for (const k of new Set(tekrar)) hatalar.push({ kod: 'tekrar-kod', ham: k })
  if (!sutunlar.includes('x-default')) uyarilar.push({ kod: 'x-default-yok' })
  // Bölgeli kod var ama aynı dilin bölgesiz genel sürümü yok (ör. en-GB, en-US var; en yok) → bilgi
  const diller = new Set(sutunlar.filter(Boolean).filter(k => k !== 'x-default').map(k => k.split('-')[0]))
  for (const d of diller) {
    const bolgeli = sutunlar.filter(k => k && k.startsWith(d + '-'))
    if (bolgeli.length && !sutunlar.includes(d)) uyarilar.push({ kod: 'genel-dil-yok', dil: d, ornek: bolgeli[0] })
  }

  const gruplar = []
  satirlarHam.forEach((urller, si) => {
    const g = []
    urller.forEach((u, i) => {
      const url = (u || '').trim()
      if (!url) return
      if (!tamUrlMi(url)) { hatalar.push({ kod: 'goreli-url', satir: si + 1, sutun: i + 1, ham: url }); return }
      if (sutunlar[i]) g.push({ kod: sutunlar[i], url })
    })
    const urlTekrar = g.map(x => x.url).filter((u, i, a) => a.indexOf(u) !== i && !(g[i].kod === 'x-default' || g[a.indexOf(u)].kod === 'x-default'))
    for (const u of new Set(urlTekrar)) hatalar.push({ kod: 'tekrar-url', satir: si + 1, ham: u })
    if (g.filter(x => x.kod !== 'x-default').length === 1) uyarilar.push({ kod: 'tek-surum', satir: si + 1 })
    if (g.length) gruplar.push(g)
  })
  return { sutunlar, gruplar, hatalar, uyarilar }
}

const xmlKacis = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function uret(gruplar, format, { isEn = false } = {}) {
  if (format === 'html') {
    // Her sürümün <head> bölümüne aynı blok eklenir (karşılıklılık otomatik sağlanır)
    return gruplar.map((g, i) => {
      const sayfalar = g.filter(x => x.kod !== 'x-default').map(x => x.url)
      const baslik = `<!-- ${isEn ? `Page group ${i + 1}: add to the <head> of every one of these pages:` : `${i + 1}. sayfa grubu: şu sayfaların hepsinin <head> bölümüne ekleyin:`}\n${sayfalar.map(u => `     ${u}`).join('\n')} -->`
      return [baslik, ...g.map(x => `<link rel="alternate" hreflang="${x.kod}" href="${xmlKacis(x.url)}" />`)].join('\n')
    }).join('\n\n')
  }
  if (format === 'http') {
    return gruplar.map(g => {
      const deger = g.map(x => `<${x.url}>; rel="alternate"; hreflang="${x.kod}"`).join(', ')
      return g.filter(x => x.kod !== 'x-default').map(x => `# ${x.url}\nLink: ${deger}`).join('\n\n')
    }).join('\n\n')
  }
  if (format === 'xml') {
    const urlBloklari = []
    for (const g of gruplar) {
      const linkler = g.map(x => `    <xhtml:link rel="alternate" hreflang="${x.kod}" href="${xmlKacis(x.url)}" />`).join('\n')
      for (const x of g.filter(y => y.kod !== 'x-default')) {
        urlBloklari.push(`  <url>\n    <loc>${xmlKacis(x.url)}</loc>\n${linkler}\n  </url>`)
      }
    }
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urlBloklari.join('\n')}\n</urlset>`
  }
  return ''
}

// "tr, en, de-DE" → ['tr','en','de-DE'] ; satır metni → URL dizileri (sekme, virgül, noktalı virgül ya da boşlukla ayrılmış)
export const sutunOku = (s) => (s || '').split(/[,;\s]+/).map(x => x.trim()).filter(Boolean)
export const satirOku = (metin, sutunSayisi) => (metin || '').split(/\r?\n/).filter(l => l.trim()).map(l => {
  const p = l.includes('\t') ? l.split('\t') : l.split(/[,;]|\s+/)
  return Array.from({ length: sutunSayisi }, (_, i) => (p[i] || '').trim())
})
