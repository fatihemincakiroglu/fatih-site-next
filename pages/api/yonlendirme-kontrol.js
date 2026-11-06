// Yönlendirme zinciri kontrol aracı için: verilen adresin yönlendirmelerini sunucu tarafında,
// adım adım (en fazla 10) takip eder ve her adımın durum kodunu, Location başlığını ve süresini döndürür.
// Tarayıcı CORS ve redirect:'manual' kısıtları nedeniyle başka sitelerin yönlendirmelerini göremez.
// SSRF koruması: her adımda lib/safe-fetch.js içindeki assertPublicUrl çağrılır (yalnızca http/https,
// DNS çözümü, özel/iç ağ/loopback/metadata IP engeli). Zaman aşımı ve IP başına istek sınırı vardır.
// Toplu mod sayfada adresleri tek tek gönderir; her adres bir istek sayılır.
import { assertPublicUrl } from '../../lib/safe-fetch'
import { rateLimit, getClientIp } from '../../lib/rate-limit'
import { adresTemizle, zinciriTakipEt, zinciriAnalizEt, EN_FAZLA_ADIM } from '../../lib/yonlendirme-kontrol'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: 'method' })
  }
  const limited = rateLimit(`yk:${getClientIp(req)}`, { limit: 30, windowMs: 60_000 })
  if (!limited.ok) {
    res.setHeader('Retry-After', String(limited.retryAfter))
    return res.status(429).json({ error: 'cok_fazla' })
  }
  const hedef = adresTemizle(String(req.query.url || '').slice(0, 2000))
  if (!hedef) return res.status(400).json({ error: 'gecersiz' })

  try {
    const sonuc = await zinciriTakipEt(hedef, {
      fetchFn: fetch,
      dogrula: assertPublicUrl,
      enFazlaAdim: EN_FAZLA_ADIM,
      adimSuresiMs: 5000,
      toplamSureMs: 9000,
      enFazlaBayt: 256 * 1024,
    })
    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).json({ ok: true, sonuc, bulgular: zinciriAnalizEt(sonuc) })
  } catch (err) {
    return res.status(200).json({ ok: false, error: 'kontrol_edilemedi', detay: String(err?.message || '').slice(0, 160) })
  }
}
