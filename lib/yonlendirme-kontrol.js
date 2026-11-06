// Yönlendirme zinciri ve HTTP durum kodu kontrolü: mantık (tarayıcıdan bağımsız, test edilebilir).
// pages/araclar/yonlendirme-zinciri-kontrol.js ve pages/api/yonlendirme-kontrol.js kullanır.
//
// • adresTemizle(ham): kullanıcı girdisini tam bir http(s) adresine çevirir (şema yoksa https).
// • satirlariOku(metin, en): toplu mod için satır başına bir adres, tekrarlar atılır, en fazla 10.
// • adimTuru(onceki, sonraki): bir yönlendirme adımının ne değiştirdiği (şema, www, sondaki /, alan adı, yol).
// • metaRefreshBul(html, taban): son sayfadaki <meta http-equiv="refresh"> etiketini bulur.
// • zinciriTakipEt(url, { fetchFn, dogrula }): yönlendirmeleri tek tek, elle takip eder.
//   Ağ ve DNS doğrulaması dışarıdan verilir (API, lib/safe-fetch.js içindeki assertPublicUrl'i geçer);
//   bu sayede dosya Node modülü içermez, tarayıcı paketine de güvenle girer ve sahte fetch ile test edilir.
// • zinciriAnalizEt(sonuc): bulgular listesi (kod + seviye + parametreler). Metinler sayfadadır.
// • ayrinti: true verilirse son yanıtın SEO başlıkları (X-Robots-Tag, Link, Content-Type) ve HTML gövdesinin
//   ilk kısmı da döner (sonBasliklar, govde). İndekslenebilirlik kontrolü (pages/api/indekslenebilirlik.js) kullanır.

export const EN_FAZLA_ADIM = 10
export const EN_FAZLA_ADRES = 10
export const YONLENDIRME_KODLARI = [301, 302, 303, 307, 308]
export const KALICI_KODLAR = [301, 308]
export const GECICI_KODLAR = [302, 303, 307]

export const DURUM_METINLERI = {
  200: 'OK', 201: 'Created', 202: 'Accepted', 203: 'Non-Authoritative Information', 204: 'No Content', 206: 'Partial Content',
  300: 'Multiple Choices', 301: 'Moved Permanently', 302: 'Found', 303: 'See Other', 304: 'Not Modified', 307: 'Temporary Redirect', 308: 'Permanent Redirect',
  400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not Found', 405: 'Method Not Allowed', 406: 'Not Acceptable',
  408: 'Request Timeout', 410: 'Gone', 418: "I'm a teapot", 429: 'Too Many Requests', 451: 'Unavailable For Legal Reasons',
  500: 'Internal Server Error', 501: 'Not Implemented', 502: 'Bad Gateway', 503: 'Service Unavailable', 504: 'Gateway Timeout',
}
export const durumMetni = (kod, sunucuMetni = '') => (sunucuMetni && String(sunucuMetni).trim()) || DURUM_METINLERI[kod] || ''

export const yonlendirmeMi = (kod) => YONLENDIRME_KODLARI.includes(kod)

// Kullanıcı girdisini tam adrese çevirir; geçersizse null. Şema yoksa https varsayılır.
export function adresTemizle(ham) {
  const s = String(ham || '').trim().slice(0, 2000)
  if (!s) return null
  if (/^[a-z][a-z0-9+.-]*:/i.test(s) && !/^https?:\/\//i.test(s)) return null
  try {
    const u = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null
    if (!u.hostname.includes('.') && !u.hostname.startsWith('[')) return null
    u.hash = ''
    return u.toString()
  } catch {
    return null
  }
}

// Toplu mod: satır başına bir adres. Boş satırlar ve tekrarlar atılır; geçersiz satırlar ayrıca döner.
export function satirlariOku(metin, en = EN_FAZLA_ADRES) {
  const adresler = []
  const gecersiz = []
  let fazla = 0
  for (const satir of String(metin || '').split(/\r?\n/)) {
    const s = satir.trim()
    if (!s) continue
    const a = adresTemizle(s)
    if (!a) { gecersiz.push(s); continue }
    if (adresler.includes(a)) continue
    if (adresler.length >= en) { fazla++; continue }
    adresler.push(a)
  }
  return { adresler, gecersiz, fazla }
}

const wwwsuz = (h) => h.replace(/^www\./i, '')

// Bir yönlendirme adımının ne değiştirdiğini sınıflandırır.
export function adimTuru(onceki, sonraki) {
  let a, b
  try { a = new URL(onceki); b = new URL(sonraki) } catch { return { gecersiz: true } }
  const r = {
    httpsYukseltme: a.protocol === 'http:' && b.protocol === 'https:',
    httpsDusurme: a.protocol === 'https:' && b.protocol === 'http:',
    wwwEkleme: !/^www\./i.test(a.hostname) && /^www\./i.test(b.hostname) && wwwsuz(a.hostname) === wwwsuz(b.hostname),
    wwwKaldirma: /^www\./i.test(a.hostname) && !/^www\./i.test(b.hostname) && wwwsuz(a.hostname) === wwwsuz(b.hostname),
    alanDegisti: wwwsuz(a.hostname).toLowerCase() !== wwwsuz(b.hostname).toLowerCase(),
    egikEkleme: false,
    egikKaldirma: false,
    harfDuzeltme: false,
    yolDegisti: false,
    sorguDegisti: a.search !== b.search,
  }
  if (!r.alanDegisti) {
    const pa = a.pathname
    const pb = b.pathname
    if (pa !== pb) {
      if (pa + '/' === pb) r.egikEkleme = true
      else if (pa === pb + '/') r.egikKaldirma = true
      else if (pa.toLowerCase() === pb.toLowerCase()) r.harfDuzeltme = true
      else r.yolDegisti = true
    }
  } else {
    r.yolDegisti = a.pathname !== b.pathname
  }
  // Yalnızca biçim düzeltmesi mi? (kalıcı olması beklenen kanonik yönlendirmeler)
  r.kanonik = !r.alanDegisti && !r.yolDegisti && !r.sorguDegisti && (r.httpsYukseltme || r.wwwEkleme || r.wwwKaldirma || r.egikEkleme || r.egikKaldirma || r.harfDuzeltme)
  return r
}

const VARLIK = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', '#39': "'", '#x27': "'", '#47': '/', '#x2f': '/', '#x2F': '/' }
const varlikCoz = (s) => s.replace(/&(amp|quot|apos|lt|gt|#39|#x27|#47|#x2f|#x2F);/g, (_, k) => VARLIK[k])

// <meta http-equiv="refresh" content="5; url=https://..."> etiketini bulur. Yorumlar ve <noscript> içi atlanır.
export function metaRefreshBul(html, taban = '') {
  if (!html) return null
  const temiz = String(html).replace(/<!--[\s\S]*?-->/g, '').replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
  const re = /<meta\b([^>]*)>/gi
  let m
  while ((m = re.exec(temiz)) !== null) {
    const oz = {}
    const ore = /([a-zA-Z:-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/g
    let o
    while ((o = ore.exec(m[1])) !== null) oz[o[1].toLowerCase()] = o[3] ?? o[4] ?? o[5] ?? ''
    if ((oz['http-equiv'] || '').toLowerCase() !== 'refresh') continue
    const icerik = varlikCoz(oz.content || '').trim()
    const p = icerik.match(/^\s*(\d+(?:\.\d+)?)?\s*[;,]?\s*(?:url\s*=\s*)?(.*)$/i)
    const sure = p && p[1] !== undefined ? Number(p[1]) : 0
    let hedef = p ? p[2].trim().replace(/^['"]|['"]$/g, '') : ''
    if (hedef) {
      try { hedef = new URL(hedef, taban || undefined).toString() } catch { /* göreli ve taban yok: olduğu gibi */ }
    }
    return { sure, url: hedef || null }
  }
  return null
}

const UA = 'Mozilla/5.0 (compatible; FatihSEOAuditBot/1.0; +https://fatihemincakiroglu.com)'

// Belirli bir süre sonunda isteği iptal eden fetch sarmalayıcısı.
async function zamanliIstek(fetchFn, url, secenek, sureMs) {
  const ctrl = new AbortController()
  const zamanlayici = setTimeout(() => ctrl.abort(), sureMs)
  try {
    return await fetchFn(url, { ...secenek, signal: ctrl.signal })
  } finally {
    clearTimeout(zamanlayici)
  }
}

async function govdeOku(yanit, enFazlaBayt) {
  const okuyucu = yanit.body?.getReader?.()
  if (!okuyucu) {
    try { return (await yanit.text()).slice(0, enFazlaBayt) } catch { return '' }
  }
  const parcalar = []
  let alinan = 0
  while (true) {
    const { done, value } = await okuyucu.read()
    if (done) break
    alinan += value.length
    parcalar.push(value)
    if (alinan >= enFazlaBayt) { try { await okuyucu.cancel() } catch { /* yok say */ } break }
  }
  const birlesik = new Uint8Array(Math.min(alinan, enFazlaBayt))
  let i = 0
  for (const p of parcalar) {
    const kalan = birlesik.length - i
    if (kalan <= 0) break
    birlesik.set(p.subarray(0, kalan), i)
    i += Math.min(p.length, kalan)
  }
  return new TextDecoder('utf-8').decode(birlesik)
}

const govdeyiBirak = async (yanit) => { try { await yanit.body?.cancel?.() } catch { /* yok say */ } }

// Son yanıttan indekslenebilirlik için gereken başlıklar. Aynı adlı birden fazla başlık fetch tarafından
// virgülle birleştirilir (ör. iki ayrı X-Robots-Tag satırı tek değer olarak gelir).
function seoBasliklari(yanit) {
  const al = (k) => { try { return yanit.headers.get(k) } catch { return null } }
  return { xRobotsTag: al('x-robots-tag'), link: al('link'), icerikTuru: al('content-type') }
}

/**
 * Yönlendirmeleri elle, adım adım takip eder. Her adımda önce dogrula(url) çağrılır
 * (sunucuda: DNS çözümü + özel/iç ağ IP engeli). HEAD isteği gönderilir; HEAD hata verirse
 * ya da 4xx/5xx dönerse aynı adres GET ile yeniden denenir (bazı sunucular HEAD'i desteklemez).
 * Son sayfa HTML ise meta refresh için gövdenin ilk kısmı okunur.
 */
export async function zinciriTakipEt(baslangic, {
  fetchFn = (typeof fetch !== 'undefined' ? fetch : null),
  dogrula = async (u) => new URL(u),
  enFazlaAdim = EN_FAZLA_ADIM,
  adimSuresiMs = 5000,
  toplamSureMs = 9000,
  enFazlaBayt = 256 * 1024,
  simdi = () => Date.now(),
  ayrinti = false,
} = {}) {
  const adimlar = []
  const gorulen = new Set()
  const bitis = simdi() + toplamSureMs
  let current = baslangic
  let dongu = false
  let sinirAsildi = false
  let metaRefresh = null
  let hata = null
  let sonBasliklar = null
  let govde = null

  for (let i = 0; i <= enFazlaAdim; i++) {
    if (gorulen.has(current)) { dongu = true; break }
    if (i === enFazlaAdim) { sinirAsildi = true; break }
    gorulen.add(current)

    const adim = { url: current, durum: null, durumMetni: '', location: null, sonraki: null, sureMs: null, yontem: 'HEAD' }
    adimlar.push(adim)

    try {
      await dogrula(current)
    } catch (e) {
      adim.hata = 'dogrulama'
      adim.detay = String(e?.message || '').slice(0, 160)
      hata = 'dogrulama'
      break
    }

    if (bitis - simdi() <= 200) { adim.hata = 'zaman-asimi'; hata = 'zaman-asimi'; break }
    // Her deneme kalan toplam süreyle sınırlanır (HEAD + GET birlikte de toplam süreyi aşamaz)
    const istek = (yontem) => {
      const kalan = bitis - simdi()
      if (kalan <= 200) { const e = new Error('zaman'); e.name = 'AbortError'; return Promise.reject(e) }
      return zamanliIstek(fetchFn, current, {
        method: yontem,
        redirect: 'manual',
        headers: { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml,*/*;q=0.8' },
      }, Math.min(adimSuresiMs, kalan))
    }

    let yanit = null
    const t0 = simdi()
    try {
      yanit = await istek('HEAD')
      if (yanit.status >= 400 || yanit.status === 0) {
        // HEAD desteklenmiyor ya da yanlış yanıt veriyor olabilir: GET ile doğrula
        await govdeyiBirak(yanit)
        adim.yontem = 'GET'
        yanit = await istek('GET')
      }
    } catch (e) {
      if (adim.yontem === 'HEAD') {
        try {
          adim.yontem = 'GET'
          yanit = await istek('GET')
        } catch (e2) {
          adim.hata = e2?.name === 'AbortError' ? 'zaman-asimi' : 'baglanti'
          adim.detay = String(e2?.cause?.code || e2?.message || '').slice(0, 160)
        }
      } else {
        adim.hata = e?.name === 'AbortError' ? 'zaman-asimi' : 'baglanti'
        adim.detay = String(e?.cause?.code || e?.message || '').slice(0, 160)
      }
    }
    adim.sureMs = Math.max(0, Math.round(simdi() - t0))
    if (!yanit) { hata = adim.hata; break }

    adim.durum = yanit.status
    adim.durumMetni = durumMetni(yanit.status, yanit.statusText)
    const tur = (yanit.headers.get('content-type') || '').toLowerCase()
    adim.icerikTuru = tur.split(';')[0].trim() || null

    if (yonlendirmeMi(yanit.status)) {
      const loc = yanit.headers.get('location')
      await govdeyiBirak(yanit)
      adim.location = loc
      if (!loc) { adim.hata = 'location-yok'; hata = 'location-yok'; break }
      let sonraki
      try { sonraki = new URL(loc, current) } catch { adim.hata = 'location-gecersiz'; hata = 'location-gecersiz'; break }
      if (sonraki.protocol !== 'http:' && sonraki.protocol !== 'https:') { adim.hata = 'location-gecersiz'; hata = 'location-gecersiz'; break }
      sonraki.hash = ''
      adim.sonraki = sonraki.toString()
      current = adim.sonraki
      continue
    }

    // Son yanıt: HTML ise meta refresh ara
    if (ayrinti) sonBasliklar = seoBasliklari(yanit)
    const htmlMi = !tur || /text\/html|application\/xhtml/.test(tur)
    if (htmlMi && yanit.status >= 200 && yanit.status < 300) {
      try {
        let govdeYaniti = yanit
        if (adim.yontem === 'HEAD') {
          const kalan2 = bitis - simdi()
          govdeYaniti = kalan2 > 300 ? await zamanliIstek(fetchFn, current, { method: 'GET', redirect: 'manual', headers: { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml' } }, Math.min(adimSuresiMs, kalan2)) : null
        }
        if (govdeYaniti && govdeYaniti.status >= 200 && govdeYaniti.status < 300) {
          // GET yanıtının başlıkları esas alınır (bazı sunucular HEAD'e farklı başlık döndürür)
          if (ayrinti && govdeYaniti !== yanit) sonBasliklar = seoBasliklari(govdeYaniti)
          const metin = await govdeOku(govdeYaniti, enFazlaBayt)
          if (ayrinti) govde = metin
          metaRefresh = metaRefreshBul(metin, current)
        } else if (govdeYaniti) {
          await govdeyiBirak(govdeYaniti)
        }
      } catch { /* meta refresh kontrolü isteğe bağlı: hata sonucu bozmaz */ }
    } else {
      await govdeyiBirak(yanit)
    }
    break
  }

  const son = adimlar[adimlar.length - 1]
  return {
    baslangic,
    adimlar,
    sonUrl: son && !son.hata && !dongu && !sinirAsildi && !yonlendirmeMi(son.durum) ? son.url : null,
    sonDurum: son && !dongu && !sinirAsildi && !yonlendirmeMi(son.durum) ? son.durum : null,
    dongu,
    donguUrl: dongu ? current : null,
    sinirAsildi,
    metaRefresh,
    hata,
    toplamSureMs: adimlar.reduce((t, a) => t + (a.sureMs || 0), 0),
    ...(ayrinti ? { sonBasliklar, govde } : {}),
  }
}

// Bulgular: { kod, seviye: 'hata' | 'uyari' | 'bilgi' | 'iyi', ...parametreler }
export function zinciriAnalizEt(s) {
  const b = []
  if (!s || !s.adimlar || !s.adimlar.length) return b
  const yon = s.adimlar.filter(a => yonlendirmeMi(a.durum) && a.sonraki)
  const yonSayisi = yon.length

  if (s.dongu) b.push({ kod: 'dongu', seviye: 'hata', url: s.donguUrl })
  if (s.sinirAsildi) b.push({ kod: 'sinir', seviye: 'hata', sinir: EN_FAZLA_ADIM })
  if (s.hata) {
    const a = s.adimlar[s.adimlar.length - 1]
    b.push({ kod: `hata-${s.hata}`, seviye: 'hata', url: a.url, detay: a.detay || '' })
  }

  if (yonSayisi > 1 && !s.dongu) b.push({ kod: 'zincir', seviye: 'uyari', adim: yonSayisi, hedef: s.sonUrl || yon[yon.length - 1].sonraki, baslangic: s.baslangic })

  yon.forEach((a, i) => {
    const tur = adimTuru(a.url, a.sonraki)
    const no = i + 1
    if (tur.httpsDusurme) b.push({ kod: 'https-dusurme', seviye: 'hata', no, url: a.url, sonraki: a.sonraki })
    if (GECICI_KODLAR.includes(a.durum)) {
      if (tur.kanonik || tur.alanDegisti) b.push({ kod: 'gecici-kalici-gibi', seviye: 'uyari', no, durum: a.durum, url: a.url, sonraki: a.sonraki })
      else b.push({ kod: 'gecici', seviye: 'bilgi', no, durum: a.durum, url: a.url, sonraki: a.sonraki })
    }
    if (tur.httpsYukseltme) b.push({ kod: 'http-https', seviye: 'bilgi', no })
    if (tur.wwwEkleme || tur.wwwKaldirma) b.push({ kod: 'www', seviye: 'bilgi', no, ekleme: tur.wwwEkleme })
    if (tur.egikEkleme || tur.egikKaldirma) b.push({ kod: 'egik', seviye: 'bilgi', no, ekleme: tur.egikEkleme })
    if (tur.harfDuzeltme) b.push({ kod: 'harf', seviye: 'bilgi', no })
    if (tur.alanDegisti) b.push({ kod: 'alan', seviye: 'bilgi', no, sonraki: a.sonraki })
  })

  // Aynı zincirde birden fazla kanonik düzeltme (ör. http → https → www → sondaki /) tek adımda yapılabilir
  const kanonikSayisi = yon.filter(a => adimTuru(a.url, a.sonraki).kanonik).length
  if (kanonikSayisi > 1) b.push({ kod: 'kanonik-birlestir', seviye: 'uyari', adet: kanonikSayisi })

  const d = s.sonDurum
  if (d != null) {
    if (d >= 200 && d < 300) {
      if (d === 200) b.push({ kod: 'son-200', seviye: 'iyi', yonSayisi })
      else b.push({ kod: 'son-2xx', seviye: 'bilgi', durum: d })
    } else if (d === 404) b.push({ kod: 'son-404', seviye: 'hata', yonSayisi })
    else if (d === 410) b.push({ kod: 'son-410', seviye: yonSayisi ? 'hata' : 'bilgi', yonSayisi })
    else if (d === 401 || d === 403) b.push({ kod: 'son-erisim', seviye: 'uyari', durum: d })
    else if (d === 429) b.push({ kod: 'son-429', seviye: 'uyari' })
    else if (d >= 500) b.push({ kod: 'son-5xx', seviye: 'hata', durum: d })
    else if (d >= 400) b.push({ kod: 'son-4xx', seviye: 'hata', durum: d })
    else b.push({ kod: 'son-diger', seviye: 'uyari', durum: d })
  }

  if (s.metaRefresh) {
    b.push({ kod: 'meta-refresh', seviye: 'uyari', sure: s.metaRefresh.sure, url: s.metaRefresh.url })
  }

  const yavas = s.adimlar.filter(a => (a.sureMs || 0) > 1000)
  if (yavas.length) b.push({ kod: 'yavas', seviye: 'bilgi', adet: yavas.length, enYavas: Math.max(...yavas.map(a => a.sureMs)) })
  return b
}

// Bulgulardan özet seviye: en kötü seviye.
export function genelSeviye(bulgular) {
  if (bulgular.some(x => x.seviye === 'hata')) return 'hata'
  if (bulgular.some(x => x.seviye === 'uyari')) return 'uyari'
  return 'iyi'
}

// UI'da örnek olarak gösterilen, ağa çıkmadan üretilmiş bir sonuç.
export const ORNEK_SONUC = {
  baslangic: 'http://ornek.com/hizmetler',
  adimlar: [
    { url: 'http://ornek.com/hizmetler', durum: 301, durumMetni: 'Moved Permanently', location: 'https://ornek.com/hizmetler', sonraki: 'https://ornek.com/hizmetler', sureMs: 120, yontem: 'HEAD' },
    { url: 'https://ornek.com/hizmetler', durum: 302, durumMetni: 'Found', location: 'https://www.ornek.com/hizmetler', sonraki: 'https://www.ornek.com/hizmetler', sureMs: 95, yontem: 'HEAD' },
    { url: 'https://www.ornek.com/hizmetler', durum: 301, durumMetni: 'Moved Permanently', location: '/hizmetler/', sonraki: 'https://www.ornek.com/hizmetler/', sureMs: 88, yontem: 'HEAD' },
    { url: 'https://www.ornek.com/hizmetler/', durum: 200, durumMetni: 'OK', location: null, sonraki: null, sureMs: 210, yontem: 'HEAD', icerikTuru: 'text/html' },
  ],
  sonUrl: 'https://www.ornek.com/hizmetler/',
  sonDurum: 200,
  dongu: false,
  donguUrl: null,
  sinirAsildi: false,
  metaRefresh: null,
  hata: null,
  toplamSureMs: 513,
}
