// Markdown sürümleri. next.config.mjs içindeki rewrite'lar buraya getirir:
//   /blog/slug.md, /en/blog/slug.md         → tur=blog
//   /rehber/slug.md, /en/guides/slug.md     → tur=rehber
import { ICERIKLER } from '../blog/[slug]'
import { TUM_REHBERLER } from '../rehber/[slug]'
import { YAYINDAKI_BLOG_SLUGS, YAYINDAKI_REHBER_SLUGS } from '../../lib/content-index'
import { blogMarkdown, rehberMarkdown } from '../../lib/blog-markdown'

const SITE = 'https://fatihemincakiroglu.com'

export default function handler(req, res) {
  const slug = String(req.query.slug || '')
  const isEn = req.query.lang === 'en'
  const rehber = req.query.tur === 'rehber'

  const veri = rehber ? TUM_REHBERLER[slug] : ICERIKLER[slug]
  const yayinda = (rehber ? YAYINDAKI_REHBER_SLUGS : YAYINDAKI_BLOG_SLUGS).includes(slug)
  if (!veri || !yayinda) {
    res.status(404).setHeader('Content-Type', 'text/plain; charset=utf-8')
    return res.send('Not found')
  }

  const yol = rehber ? (isEn ? 'en/guides' : 'rehber') : (isEn ? 'en/blog' : 'blog')
  res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
  // Google bu dosyayı HTML sayfanın kopyası saymasın: canonical HTML sayfayı gösterir.
  res.setHeader('Link', `<${SITE}/${yol}/${slug}>; rel="canonical"`)
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800')
  return res.status(200).send(rehber ? rehberMarkdown(slug, veri, isEn) : blogMarkdown(slug, veri, isEn))
}
