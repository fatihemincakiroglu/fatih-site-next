// İndekslenebilirlik kontrolü için: verilen adresi sunucu tarafında getirir ve analiz eder.
// 1) Yönlendirmeler lib/yonlendirme-kontrol.js ile adım adım takip edilir; her adımda lib/safe-fetch.js
//    içindeki assertPublicUrl çağrılır (yalnızca http/https, DNS çözümü, özel/iç ağ/loopback/metadata IP engeli).
//    ayrinti: true ile son yanıtın X-Robots-Tag, Link ve Content-Type başlıkları ile HTML'in ilk 512 KB'ı alınır.
// 2) robots.txt safeFetchHtml ile getirilir (her yönlendirmede aynı SSRF kontrolü, 5 yönlendirme, 500 KiB).
//    İstenen adresin robots.txt'si zincirle paralel istenir; son adres başka bir kökendeyse onunki ayrıca getirilir.
// 3) Analiz lib/indekslenebilirlik.js'te. HTML gövdesi istemciye gönderilmez, yalnızca çıkarılan değerler döner.
// Zaman aşımı ve IP başına istek sınırı vardır (her kontrol 2 ile 4 dış istek yapar).
import { assertPublicUrl, safeFetchHtml } from '../../lib/safe-fetch'
import { rateLimit, getClientIp } from '../../lib/rate-limit'
import { adresTemizle, zinciriTakipEt, EN_FAZLA_ADIM } from '../../lib/yonlendirme-kontrol'
import { analizEt, EN_FAZLA_HTML_BAYT } from '../../lib/indekslenebilirlik'

const kokOf = (u) => { try { const x = new URL(u); return `${x.protocol}//${x.host}` } catch { return null } }

async function robotsGetir(kok, timeoutMs) {
  const url = `${kok}/robots.txt`
  try {
    const { html, status, finalUrl } = await safeFetchHtml(url, { timeoutMs, maxRedirects: 5, maxBytes: 520 * 1024, metinKabul: true })
    return { durum: status, url: finalUrl, metin: status >= 200 && status < 300 ? html : '' }
  } catch (err) {
    return { hata: String(err?.message || 'hata').slice(0, 160), url }
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: 'method' })
  }
  const limited = rateLimit(`indeks:${getClientIp(req)}`, { limit: 15, windowMs: 60_000 })
  if (!limited.ok) {
    res.setHeader('Retry-After', String(limited.retryAfter))
    return res.status(429).json({ error: 'cok_fazla' })
  }
  const hedef = adresTemizle(String(req.query.url || '').slice(0, 2000))
  if (!hedef) return res.status(400).json({ error: 'gecersiz' })

  try {
    const ilkKok = kokOf(hedef)
    const robotsIlk = robotsGetir(ilkKok, 5000)
    const sonuc = await zinciriTakipEt(hedef, {
      fetchFn: fetch,
      dogrula: assertPublicUrl,
      enFazlaAdim: EN_FAZLA_ADIM,
      adimSuresiMs: 5000,
      toplamSureMs: 8000,
      enFazlaBayt: EN_FAZLA_HTML_BAYT,
      ayrinti: true,
    })
    const sonKok = kokOf(sonuc.sonUrl || hedef)
    // robotsGetir hata fırlatmaz; farklı kökende ilk istek sonucu kullanılmadan biter
    const robots = sonKok && sonKok !== ilkKok ? await robotsGetir(sonKok, 4000) : await robotsIlk

    const analiz = analizEt({ istenenUrl: hedef, sonuc, robots })
    const { govde, ...zincir } = sonuc
    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).json({ ok: true, zincir, analiz, htmlBayt: govde ? govde.length : 0 })
  } catch (err) {
    return res.status(200).json({ ok: false, error: 'kontrol_edilemedi', detay: String(err?.message || '').slice(0, 160) })
  }
}

// Kötü durumda yönlendirme zinciri ve robots.txt birlikte ~12 sn sürebilir.
export const config = { maxDuration: 15 }
