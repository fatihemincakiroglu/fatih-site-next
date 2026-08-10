import { YAYINDAKI_BLOG_SLUGS, YAYINDAKI_REHBER_SLUGS } from '../lib/content-index'

const BASE = 'https://fatihemincakiroglu.com'
const TODAY = new Date().toISOString().split('T')[0] + 'T00:00:00Z'

// ── TR PAGES ──────────────────────────────────────────────
const TR_PAGES = [
  { url: '/',               priority: '1.0', changefreq: 'weekly' },
  { url: '/seo',            priority: '0.9', changefreq: 'monthly' },
  { url: '/geo',            priority: '0.9', changefreq: 'monthly' },
  { url: '/icerik',         priority: '0.8', changefreq: 'monthly' },
  { url: '/backlink',       priority: '0.8', changefreq: 'monthly' },
  { url: '/performans',     priority: '0.8', changefreq: 'monthly' },
  { url: '/hizmetler',      priority: '0.8', changefreq: 'monthly' },
  { url: '/hakkimda',       priority: '0.7', changefreq: 'monthly' },
  { url: '/referanslar',    priority: '0.7', changefreq: 'monthly' },
  { url: '/vakalar',        priority: '0.7', changefreq: 'monthly' },
  { url: '/blog',           priority: '0.8', changefreq: 'weekly'  },
  { url: '/rehber',         priority: '0.8', changefreq: 'weekly'  },
  { url: '/kaynaklar',      priority: '0.7', changefreq: 'monthly' },
  { url: '/araclar',        priority: '0.7', changefreq: 'monthly' },
  { url: '/sss',            priority: '0.7', changefreq: 'monthly' },
  { url: '/ai-sozluk',      priority: '0.7', changefreq: 'monthly' },
  { url: '/seo-rehberi',    priority: '0.8', changefreq: 'monthly' },
  { url: '/geo-rehberi',    priority: '0.8', changefreq: 'monthly' },
  { url: '/fiyatlandirma',  priority: '0.6', changefreq: 'monthly' },
  { url: '/iletisim',       priority: '0.6', changefreq: 'monthly' },
  { url: '/randevu',        priority: '0.6', changefreq: 'monthly' },
  { url: '/gizlilik',       priority: '0.3', changefreq: 'yearly'  },
  { url: '/kullanim-kosullari', priority: '0.3', changefreq: 'yearly' },
]

// ── EN PAGES ──────────────────────────────────────────────
const EN_PAGES = [
  { url: '/en',                      priority: '0.9', changefreq: 'weekly'  },
  { url: '/en/seo-consulting',       priority: '0.9', changefreq: 'monthly' },
  { url: '/en/geo-consulting',       priority: '0.9', changefreq: 'monthly' },
  { url: '/en/content-strategy',     priority: '0.8', changefreq: 'monthly' },
  { url: '/en/backlink-digital-pr',  priority: '0.8', changefreq: 'monthly' },
  { url: '/en/performance-growth',   priority: '0.8', changefreq: 'monthly' },
  { url: '/en/services',             priority: '0.8', changefreq: 'monthly' },
  { url: '/en/about',                priority: '0.7', changefreq: 'monthly' },
  { url: '/en/testimonials',         priority: '0.7', changefreq: 'monthly' },
  { url: '/en/case-studies',         priority: '0.7', changefreq: 'monthly' },
  { url: '/en/blog',                 priority: '0.8', changefreq: 'weekly'  },
  { url: '/en/guides',               priority: '0.8', changefreq: 'weekly'  },
  { url: '/en/resources',            priority: '0.7', changefreq: 'monthly' },
  { url: '/en/tools',                priority: '0.7', changefreq: 'monthly' },
  { url: '/en/faq',                  priority: '0.7', changefreq: 'monthly' },
  { url: '/en/ai-glossary',          priority: '0.7', changefreq: 'monthly' },
  { url: '/en/seo-guide',            priority: '0.8', changefreq: 'monthly' },
  { url: '/en/geo-guide',            priority: '0.8', changefreq: 'monthly' },
  { url: '/en/pricing',              priority: '0.6', changefreq: 'monthly' },
  { url: '/en/contact',              priority: '0.6', changefreq: 'monthly' },
  { url: '/en/book-a-call',          priority: '0.6', changefreq: 'monthly' },
  { url: '/en/privacy',              priority: '0.3', changefreq: 'yearly'  },
  { url: '/en/terms',                priority: '0.3', changefreq: 'yearly'  },
]

// ── BLOG & REHBER SLUGS ───────────────────────────────────
// Tek kaynak: lib/content-index.js
// Sitemap'e yalnızca gerçek içeriği yazılmış sayfalar girer. Dolgu/şablon
// içerikli URL'lerin sitemap'te olması thin-content sinyali yaratır.
const BLOG_SLUGS = YAYINDAKI_BLOG_SLUGS
const REHBER_SLUGS = YAYINDAKI_REHBER_SLUGS

// ── XML BUILDERS ─────────────────────────────────────────
function buildUrlEntry(url, priority, changefreq, trUrl, enUrl) {
  return `
  <url>
    <loc>${BASE}${url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="tr" href="${BASE}${trUrl}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE}${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}${trUrl}"/>
  </url>`
}

// TR↔EN URL mapping
const TR_EN_MAP = {
  '/': '/en',
  '/seo': '/en/seo-consulting',
  '/geo': '/en/geo-consulting',
  '/icerik': '/en/content-strategy',
  '/backlink': '/en/backlink-digital-pr',
  '/performans': '/en/performance-growth',
  '/hizmetler': '/en/services',
  '/hakkimda': '/en/about',
  '/referanslar': '/en/testimonials',
  '/vakalar': '/en/case-studies',
  '/blog': '/en/blog',
  '/rehber': '/en/guides',
  '/kaynaklar': '/en/resources',
  '/araclar': '/en/tools',
  '/sss': '/en/faq',
  '/ai-sozluk': '/en/ai-glossary',
  '/seo-rehberi': '/en/seo-guide',
  '/geo-rehberi': '/en/geo-guide',
  '/fiyatlandirma': '/en/pricing',
  '/iletisim': '/en/contact',
  '/randevu': '/en/book-a-call',
  '/gizlilik': '/en/privacy',
  '/kullanim-kosullari': '/en/terms',
}

function buildSitemapTR() {
  const urls = TR_PAGES.map(p => {
    const enUrl = TR_EN_MAP[p.url] || p.url
    return buildUrlEntry(p.url, p.priority, p.changefreq, p.url, enUrl)
  }).join('')

  const blogUrls = BLOG_SLUGS.map(slug =>
    buildUrlEntry(`/blog/${slug}`, '0.6', 'monthly', `/blog/${slug}`, `/en/blog/${slug}`)
  ).join('')

  const rehberUrls = REHBER_SLUGS.map(slug =>
    buildUrlEntry(`/rehber/${slug}`, '0.6', 'monthly', `/rehber/${slug}`, `/en/guides/${slug}`)
  ).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
${blogUrls}
${rehberUrls}
</urlset>`
}

function buildSitemapEN() {
  const EN_TR_MAP = Object.fromEntries(Object.entries(TR_EN_MAP).map(([k,v]) => [v, k]))

  const urls = EN_PAGES.map(p => {
    const trUrl = EN_TR_MAP[p.url] || p.url
    return buildUrlEntry(p.url, p.priority, p.changefreq, trUrl, p.url)
  }).join('')

  const blogUrls = BLOG_SLUGS.map(slug =>
    buildUrlEntry(`/en/blog/${slug}`, '0.6', 'monthly', `/blog/${slug}`, `/en/blog/${slug}`)
  ).join('')

  const rehberUrls = REHBER_SLUGS.map(slug =>
    buildUrlEntry(`/en/guides/${slug}`, '0.6', 'monthly', `/rehber/${slug}`, `/en/guides/${slug}`)
  ).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
${blogUrls}
${rehberUrls}
</urlset>`
}

function buildSitemapIndex() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE}/sitemap-tr.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE}/sitemap-en.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
</sitemapindex>`
}

// ── ROUTE HANDLERS ────────────────────────────────────────
export default function Sitemap() { return null }

export async function getServerSideProps({ req, res }) {
  const path = req.url

  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')

  if (path === '/sitemap-tr.xml') {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.write(buildSitemapTR())
  } else if (path === '/sitemap-en.xml') {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.write(buildSitemapEN())
  } else {
    // /sitemap.xml — index
    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.write(buildSitemapIndex())
  }

  res.end()
  return { props: {} }
}
