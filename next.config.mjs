/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en'],
    localeDetection: true,
  },
  async rewrites() {
    return [
      // EN URL slugs → TR page files
      { source: '/en/seo-consulting',       destination: '/seo' },
      { source: '/en/geo-consulting',       destination: '/geo' },
      { source: '/en/content-strategy',     destination: '/icerik' },
      { source: '/en/backlink-digital-pr',  destination: '/backlink' },
      { source: '/en/performance-growth',   destination: '/performans' },
      { source: '/en/about',                destination: '/hakkimda' },
      { source: '/en/testimonials',         destination: '/referanslar' },
      { source: '/en/case-studies',         destination: '/vakalar' },
      { source: '/en/blog',                 destination: '/blog' },
      { source: '/en/guides',               destination: '/rehber' },
      { source: '/en/tools',                destination: '/araclar' },
      { source: '/en/faq',                  destination: '/sss' },
      { source: '/en/pricing',              destination: '/fiyatlandirma' },
      { source: '/en/contact',              destination: '/iletisim' },
      { source: '/en/book-a-call',          destination: '/randevu' },
      { source: '/en/services',             destination: '/hizmetler' },
      { source: '/en/resources',            destination: '/kaynaklar' },
      { source: '/en/seo-guide',            destination: '/seo-rehberi' },
      { source: '/en/geo-guide',            destination: '/geo-rehberi' },
      { source: '/en/ai-glossary',          destination: '/ai-sozluk' },
    ]
  },
}

export default nextConfig
