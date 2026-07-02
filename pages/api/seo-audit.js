// Basit ama GERÇEK bir mini SEO denetimi: verilen URL'yi sunucu tarafında çeker,
// temel on-page SEO sinyallerini regex ile çıkarır. Rastgele/sahte veri üretmez.
// CORS kısıtlaması olmadan çalışması için istemci yerine burada (sunucuda) fetch ediyoruz.

function extractTag(html, regex) {
  const m = html.match(regex)
  return m ? m[1].trim() : null
}

function decodeEntities(str) {
  if (!str) return str
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

export default async function handler(req, res) {
  const raw = (req.query.url || '').toString().trim()
  if (!raw) return res.status(400).json({ error: 'URL gerekli.' })

  let target
  try {
    target = raw.match(/^https?:\/\//i) ? raw : `https://${raw}`
    target = new URL(target).toString()
  } catch {
    return res.status(400).json({ error: 'Geçerli bir URL girin.' })
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)
  const start = Date.now()

  try {
    const response = await fetch(target, {
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; FatihSEOAuditBot/1.0; +https://fatihemincakiroglu.com)' },
    })
    const responseTimeMs = Date.now() - start
    clearTimeout(timeout)

    const html = await response.text()
    const finalUrl = response.url || target
    const isHttps = finalUrl.startsWith('https://')

    const title = decodeEntities(extractTag(html, /<title[^>]*>([\s\S]*?)<\/title>/i))
    const metaDescription = decodeEntities(extractTag(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)
      || extractTag(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i))
    const viewport = extractTag(html, /<meta[^>]+name=["']viewport["'][^>]*>/i)
    const canonical = extractTag(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i)
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || []
    const imgMatches = html.match(/<img\b[^>]*>/gi) || []
    const imgsWithoutAlt = imgMatches.filter(tag => !/\salt=["'][^"']*["']/i.test(tag)).length
    const hasRobotsMeta = /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*noindex[^"']*)["']/i.test(html)
    const sizeKb = Math.round(Buffer.byteLength(html, 'utf8') / 1024)

    const titleLength = title ? title.length : 0
    const descLength = metaDescription ? metaDescription.length : 0

    const checks = {
      https: { ok: isHttps, label: isHttps ? 'Aktif' : 'Yok', detail: isHttps ? 'Bağlantı SSL ile şifreleniyor.' : 'Site HTTPS üzerinden sunulmuyor.' },
      title: { ok: !!title && titleLength >= 15 && titleLength <= 65, label: title ? `${titleLength} karakter` : 'Bulunamadı', detail: title || 'Title etiketi bulunamadı.' },
      metaDescription: { ok: !!metaDescription && descLength >= 50 && descLength <= 165, label: metaDescription ? `${descLength} karakter` : 'Bulunamadı', detail: metaDescription || 'Meta açıklama bulunamadı.' },
      viewport: { ok: !!viewport, label: viewport ? 'Var' : 'Yok', detail: viewport ? 'Mobil viewport etiketi mevcut.' : 'Mobil viewport etiketi eksik — mobil uyumluluk riskli.' },
      canonical: { ok: !!canonical, label: canonical ? 'Var' : 'Yok', detail: canonical || 'Canonical etiketi bulunamadı.' },
      h1: { ok: h1Matches.length === 1, label: `${h1Matches.length} adet`, detail: h1Matches.length === 0 ? 'H1 etiketi bulunamadı.' : h1Matches.length > 1 ? 'Birden fazla H1 etiketi var, tek olması önerilir.' : 'Sayfada tek bir H1 etiketi var.' },
      imagesAlt: { ok: imgsWithoutAlt === 0, label: `${imgsWithoutAlt} / ${imgMatches.length} eksik`, detail: imgsWithoutAlt === 0 ? 'Tüm görsellerde alt metin mevcut.' : `${imgsWithoutAlt} görselde alt metin eksik.` },
      indexable: { ok: !hasRobotsMeta, label: hasRobotsMeta ? 'noindex' : 'index', detail: hasRobotsMeta ? 'Sayfa robots meta ile noindex olarak işaretlenmiş!' : 'Sayfa arama motorları tarafından indekslenebilir.' },
      speed: { ok: responseTimeMs < 800, label: `${responseTimeMs} ms`, detail: `Sunucu yanıt süresi ${responseTimeMs}ms (TTFB dahil değil, toplam istek süresi).` },
      pageSize: { ok: sizeKb < 500, label: `${sizeKb} KB`, detail: `HTML doküman boyutu ${sizeKb} KB.` },
    }

    const passCount = Object.values(checks).filter(c => c.ok).length
    const score = Math.round((passCount / Object.keys(checks).length) * 100)

    return res.status(200).json({
      url: finalUrl,
      status: response.status,
      score,
      checks,
    })
  } catch (err) {
    clearTimeout(timeout)
    const message = err.name === 'AbortError'
      ? 'Site zaman aşımına uğradı (8sn). Site çok yavaş olabilir veya erişilemiyor.'
      : 'Siteye erişilemedi. URL doğru mu ve site herkese açık mı kontrol edin.'
    return res.status(502).json({ error: message })
  }
}
