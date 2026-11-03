// robots.txt test aracı için: verilen alan adının /robots.txt dosyasını sunucu tarafında getirir.
// Tarayıcı CORS nedeniyle başka sitelerin robots.txt'sini doğrudan okuyamaz.
// SSRF koruması lib/safe-fetch.js'te (her yönlendirme adımında özel IP kontrolü).
import { safeFetchHtml } from '../../lib/safe-fetch'
import { rateLimit, getClientIp } from '../../lib/rate-limit'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: 'method' })
  }
  const limited = rateLimit(`robots:${getClientIp(req)}`, { limit: 15, windowMs: 60_000 })
  if (!limited.ok) {
    res.setHeader('Retry-After', String(limited.retryAfter))
    return res.status(429).json({ error: 'cok_fazla' })
  }
  const raw = String(req.query.site || '').trim().slice(0, 300)
  let hedef
  try {
    const u = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`)
    hedef = `${u.protocol}//${u.host}/robots.txt`
  } catch {
    return res.status(400).json({ error: 'gecersiz' })
  }
  try {
    const { html, status, finalUrl } = await safeFetchHtml(hedef, { timeoutMs: 8000, maxRedirects: 5, maxBytes: 600 * 1024, metinKabul: true })
    res.setHeader('Cache-Control', 'no-store')
    // 4xx: Google robots.txt yokmuş gibi davranır (kısıtlama yok). 5xx: geçici olarak tüm siteyi engelli sayar.
    return res.status(200).json({ ok: true, status, url: finalUrl, metin: status >= 200 && status < 300 ? html : '' })
  } catch (err) {
    return res.status(200).json({ ok: false, error: 'getirilemedi', detay: String(err?.message || '').slice(0, 160) })
  }
}
