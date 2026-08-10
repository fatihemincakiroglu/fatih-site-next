// Basit, bağımlılıksız in-memory rate limiter (sliding window).
//
// SINIRLAMA: Serverless ortamda her instance kendi belleğini tutar, dolayısıyla
// bu kesin bir global sınır değil — kötüye kullanımı yavaşlatmak için bir ilk
// savunma katmanıdır. Gerçek bir global limit için Upstash Redis / Vercel KV
// gibi paylaşımlı bir store gerekir.

const buckets = new Map()

export function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for']
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim()
  if (Array.isArray(fwd) && fwd.length) return fwd[0]
  return req.socket?.remoteAddress || 'unknown'
}

/**
 * @returns {{ok: boolean, retryAfter: number}}
 */
export function rateLimit(key, { limit = 10, windowMs = 60_000 } = {}) {
  const now = Date.now()
  const hits = (buckets.get(key) || []).filter(t => now - t < windowMs)

  if (hits.length >= limit) {
    const retryAfter = Math.ceil((windowMs - (now - hits[0])) / 1000)
    buckets.set(key, hits)
    return { ok: false, retryAfter }
  }

  hits.push(now)
  buckets.set(key, hits)

  // Bellek sızıntısını önlemek için ara sıra eski kayıtları temizle
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (!v.length || now - v[v.length - 1] > windowMs) buckets.delete(k)
    }
  }

  return { ok: true, retryAfter: 0 }
}
