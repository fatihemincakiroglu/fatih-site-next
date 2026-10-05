// /blog/slug.md ve /en/blog/slug.md adresleri next.config.mjs içindeki
// rewrite ile buraya gelir. Yazının sade Markdown sürümünü döner.
import { ICERIKLER } from '../blog/[slug]'
import { YAYINDAKI_BLOG_SLUGS } from '../../lib/content-index'
import { blogMarkdown } from '../../lib/blog-markdown'

export default function handler(req, res) {
  const slug = String(req.query.slug || '')
  const isEn = req.query.lang === 'en'
  const veri = ICERIKLER[slug]

  if (!veri || !YAYINDAKI_BLOG_SLUGS.includes(slug)) {
    res.status(404).setHeader('Content-Type', 'text/plain; charset=utf-8')
    return res.send('Not found')
  }

  const canonical = `https://fatihemincakiroglu.com/${isEn ? 'en/blog' : 'blog'}/${slug}`
  res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
  // Google bu dosyayı HTML sayfanın kopyası saymasın: canonical HTML sayfayı gösterir.
  res.setHeader('Link', `<${canonical}>; rel="canonical"`)
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800')
  return res.status(200).send(blogMarkdown(slug, veri, isEn))
}
