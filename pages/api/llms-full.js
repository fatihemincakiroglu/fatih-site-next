// /llms-full.txt (Türkçe) ve /en/llms-full.txt (İngilizce): sitedeki tüm rehberlerin
// ve yayındaki blog yazılarının Markdown içeriği tek dosyada. Yapay zekâ araçlarının
// siteyi tek istekte okuyabilmesi için (llms.txt önerisindeki llms-full.txt kalıbı).
// next.config.mjs içindeki beforeFiles rewrite'ları buraya getirir.
import { ICERIKLER } from '../../lib/blog-icerikler'
import { TUM_REHBERLER } from '../../lib/rehber-icerikler'
import { YAYINDAKI_BLOG_SLUGS, YAYINDAKI_REHBER_SLUGS } from '../../lib/content-index'
import { blogMarkdown, rehberMarkdown } from '../../lib/blog-markdown'

const SITE = 'https://fatihemincakiroglu.com'

export function llmsFull(isEn) {
  const bas = isEn
    ? [
        '# Fatih Emin Çakıroğlu, SEO and GEO Consulting (full content)',
        '',
        `> Full Markdown text of every guide and published article on ${SITE}/en. Short index: ${SITE}/llms.txt. Turkish version: ${SITE}/llms-full.txt.`,
        '',
        'Content may be cited for informational purposes. Please attribute as "Fatih Emin Çakıroğlu (fatihemincakiroglu.com)" and link to the page URL given under each heading.',
      ]
    : [
        '# Fatih Emin Çakıroğlu, SEO ve GEO Danışmanlığı (tam içerik)',
        '',
        `> ${SITE} adresindeki tüm rehberlerin ve yayındaki blog yazılarının tam Markdown metni. Kısa dizin: ${SITE}/llms.txt. İngilizce sürüm: ${SITE}/en/llms-full.txt.`,
        '',
        'İçerik bilgi amaçlı alıntılanabilir. Lütfen "Fatih Emin Çakıroğlu (fatihemincakiroglu.com)" olarak kaynak gösterin ve her başlığın altındaki sayfa adresine bağlantı verin.',
      ]
  const parcalar = [bas.join('\n')]
  parcalar.push(isEn ? '# Guides' : '# Rehberler')
  for (const slug of YAYINDAKI_REHBER_SLUGS) {
    const v = TUM_REHBERLER[slug]
    if (v) parcalar.push(rehberMarkdown(slug, v, isEn))
  }
  parcalar.push(isEn ? '# Blog articles' : '# Blog yazıları')
  for (const slug of YAYINDAKI_BLOG_SLUGS) {
    const v = ICERIKLER[slug]
    if (v) parcalar.push(blogMarkdown(slug, v, isEn))
  }
  return parcalar.join('\n\n---\n\n') + '\n'
}

export default function handler(req, res) {
  const isEn = req.query.lang === 'en'
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('X-Robots-Tag', 'noindex')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800')
  return res.status(200).send(llmsFull(isEn))
}
