const BASE = 'https://fatihemincakiroglu.com'

const PAGES_TR = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/seo', priority: '0.9', changefreq: 'monthly' },
  { url: '/geo', priority: '0.9', changefreq: 'monthly' },
  { url: '/icerik', priority: '0.8', changefreq: 'monthly' },
  { url: '/backlink', priority: '0.8', changefreq: 'monthly' },
  { url: '/performans', priority: '0.8', changefreq: 'monthly' },
  { url: '/hizmetler', priority: '0.8', changefreq: 'monthly' },
  { url: '/hakkimda', priority: '0.7', changefreq: 'monthly' },
  { url: '/referanslar', priority: '0.7', changefreq: 'monthly' },
  { url: '/vakalar', priority: '0.7', changefreq: 'monthly' },
  { url: '/blog', priority: '0.8', changefreq: 'weekly' },
  { url: '/rehber', priority: '0.8', changefreq: 'weekly' },
  { url: '/kaynaklar', priority: '0.7', changefreq: 'monthly' },
  { url: '/araclar', priority: '0.7', changefreq: 'monthly' },
  { url: '/sss', priority: '0.7', changefreq: 'monthly' },
  { url: '/ai-sozluk', priority: '0.7', changefreq: 'monthly' },
  { url: '/seo-rehberi', priority: '0.7', changefreq: 'monthly' },
  { url: '/geo-rehberi', priority: '0.7', changefreq: 'monthly' },
  { url: '/fiyatlandirma', priority: '0.6', changefreq: 'monthly' },
  { url: '/iletisim', priority: '0.6', changefreq: 'monthly' },
  { url: '/randevu', priority: '0.6', changefreq: 'monthly' },
]

const BLOG_SLUGS = [
  'core-web-vitals-2025','javascript-seo-rehberi','teknik-seo-denetim','site-migrasyonu-seo',
  'crawl-butce-optimizasyonu','schema-markup-rehberi','canonical-tag-stratejisi','sayfa-hizi-optimizasyonu',
  'internal-link-stratejisi','xml-sitemap-optimizasyonu','geo-nedir-rehber','google-ai-overview-optimizasyonu',
  'llms-txt-rehberi','perplexity-gorünürlük','entity-seo-rehberi','chatgpt-search-seo',
  'rag-seo-etkisi','ai-icin-icerik-yazma','zero-click-arama-stratejisi','answer-engine-optimization',
  'topical-authority-rehberi','pillar-cluster-modeli','eeat-icin-icerik','anahtar-kelime-arastirmasi',
  'icerik-guncelleme-stratejisi','backlink-stratejisi-2025','dijital-pr-seo','broken-link-building',
  'toksik-backlink-temizleme','e-ticaret-seo-rehberi','shopify-seo-optimizasyonu',
  'ga4-seo-takibi','search-console-rehberi','seo-roi-olcumu','yerel-seo-rehberi',
  'google-business-profile','seo-strateji-haritasi','rakip-analizi-seo',
]

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0]
  
  const trUrls = PAGES_TR.map(p => `
  <url>
    <loc>${BASE}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
    <xhtml:link rel="alternate" hreflang="tr" href="${BASE}${p.url}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE}/en${p.url === '/' ? '' : p.url}"/>
  </url>`).join('')

  const blogUrls = BLOG_SLUGS.map(slug => `
  <url>
    <loc>${BASE}/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${trUrls}
${blogUrls}
</urlset>`
}

export default function Sitemap() { return null }

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
  res.write(generateSitemap())
  res.end()
  return { props: {} }
}
