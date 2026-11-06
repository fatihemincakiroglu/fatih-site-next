// Open Graph önizleme aracı için: verilen sayfanın HTML'ini sunucu tarafında getirir ve
// paylaşım etiketlerini (title, description, og:*, twitter:*, canonical) ayrıştırıp döndürür.
// Tarayıcı CORS nedeniyle başka sitelerin HTML'ini doğrudan okuyamaz.
// SSRF koruması lib/safe-fetch.js'te (her yönlendirme adımında özel IP kontrolü, boyut sınırı).
import { safeFetchHtml } from '../../lib/safe-fetch'
import { rateLimit, getClientIp } from '../../lib/rate-limit'
import { ogAyristir } from '../../lib/og-ayristir'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: 'method' })
  }
  const limited = rateLimit(`og:${getClientIp(req)}`, { limit: 15, windowMs: 60_000 })
  if (!limited.ok) {
    res.setHeader('Retry-After', String(limited.retryAfter))
    return res.status(429).json({ error: 'cok_fazla' })
  }
  const raw = String(req.query.url || '').trim().slice(0, 500)
  let hedef
  try {
    const u = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`)
    if (!u.hostname.includes('.') && !u.hostname.startsWith('[')) throw new Error('host')
    u.hash = ''
    hedef = u.toString()
  } catch {
    return res.status(400).json({ error: 'gecersiz' })
  }
  try {
    // Paylaşım etiketleri <head> içinde olur; 1 MB sınırı yeterli ve bellek kullanımını sınırlar.
    const { html, status, finalUrl } = await safeFetchHtml(hedef, { timeoutMs: 8000, maxRedirects: 5, maxBytes: 1024 * 1024 })
    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).json({ ok: true, status, url: finalUrl, istenen: hedef, etiketler: ogAyristir(html, finalUrl) })
  } catch (err) {
    return res.status(200).json({ ok: false, error: 'getirilemedi', detay: String(err?.message || '').slice(0, 160) })
  }
}
