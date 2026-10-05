// ── KALDIRILMIŞ ESKİ ADRESLER → ANA SAYFA (301) ─────────────
// Eski WordPress temasından kalan (kategori, etiket, portfolyo, ekip, tarih
// arşivi) ve hiç yayına alınmamış blog/rehber adresleri. Hepsi 404 veriyordu.
// Sondaki "/" farkı otomatik karşılanır (her adres iki biçimde eşleşir).
// DİKKAT: Buradaki bir blog/rehber slug'ı ileride yayına alınırsa önce
// bu listeden çıkarılmalı; yönlendirme sayfanın önüne geçer.
const ANASAYFAYA_YONLENEN = [
  '/blog/icerik-guncelleme-stratejisi',
  '/blog/programatik-seo-rehberi',
  '/2025/12',
  '/blog/google-business-profile',
  '/category/performans-pazarlamasi',
  '/analitik-raporlama',
  '/blog/eeat-icin-icerik',
  '/blog/pillar-cluster-modeli',
  '/tag/web',
  '/blog/backlink-stratejisi-2025',
  '/category/dijital-pazarlama',
  '/service-one',
  '/en/blog/google-ai-overview-optimizasyonu',
  '/meta-ads-yonetimi',
  '/en/guides/mobil-seo',
  '/en/blog/site-migrasyonu-seo',
  '/blog/teknik-seo-2025',
  '/rehber/yerel-seo',
  '/portfolio_category/design',
  '/2024/04/05/leveraging-feedback-on-insights-best-seo',
  '/portfolio-slider',
  '/portfolio/article-data-analysis',
  '/anahtar-kelime-stratejisi',
  '/2024/04/07/the-basics-of-blogging-search-optimization',
  '/category/digital-agency',
  '/tag/startup',
  '/portfolio-masonry',
  '/tag/business',
  '/2024/04/07/cloud-hosting-growing-faster-ever',
  '/blog-classic',
  '/team/parker-wolf',
  '/category/marketing-agency',
  '/team/haley-ryan',
  '/team/colt-nova',
  '/category/marketing',
  '/category/seo-marketing',
  '/team/lana-skye',
  '/category/seo-analysis',
  '/service/seo-marketing',
  '/portfolio-grid-3',
  '/2024/04/07/how-to-increase-your-roi-through-scientific',
  '/e-ticaret-yonetimi',
  '/service/marketing-strategy',
  '/e-ticaret-site-kurulumu',
  '/contact',
  '/elements',
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript ve ESLint hataları artık build'i durdurur.
  // (Önceden ignore ediliyordu; bu, kırık kodun sessizce prod'a çıkmasına yol açar.)
  reactStrictMode: true,

  // Next'in yerleşik "sondaki / işaretini sil" yönlendirmesi (308) kapatıldı;
  // aynı iş redirects() sonundaki genel kuralla yapılıyor. Böylece eski
  // adreslerin "/" ile biten biçimleri de araya 308 girmeden TEK ADIMDA 301 ile
  // ana sayfaya gider. Diğer tüm sayfalarda davranış önceki gibidir.
  skipTrailingSlashRedirect: true,

  images: {
    // Next'in görsel optimizasyonu açık: kaynak PNG/JPG'ler istemciye
    // AVIF/WebP olarak, cihaz genişliğine uygun boyutta servis edilir.
    formats: ['image/avif', 'image/webp'],
    // Logo/ikon gibi küçük görseller için ek boyut basamakları
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 400],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 gün
  },

  // ── 301 YÖNLENDİRMELER ──────────────────────────────────
  // /seo ve /geo, hedef kelimeyi (SEO/GEO danışmanlığı) içeren adreslere
  // taşındı. Eski adresler indekslenmiş olabileceği ve dış bağlantı
  // taşıyabileceği için kalıcı (301) yönlendiriliyor.
  //
  // permanent: true  -> 308 (kalıcı, metodu korur; Google 301 gibi işler)
  // Yönlendirme zinciri oluşmaması için doğrudan nihai adrese gidiyor.
  async redirects() {
    return [
      { source: '/seo', destination: '/seo-uzmani', permanent: true },
      { source: '/geo', destination: '/geo-uzmani', permanent: true },
      // /seo-danismanligi ve /geo-danismanligi, /seo-uzmani ve /geo-uzmani adreslerine taşındı.
      { source: '/seo-danismanligi', destination: '/seo-uzmani', permanent: true },
      { source: '/geo-danismanligi', destination: '/geo-uzmani', permanent: true },
      // Kaldırılmış eski adresler → ana sayfa. statusCode: 301 (permanent: true 308 verir).
      ...ANASAYFAYA_YONLENEN.flatMap(u => [
        { source: u, destination: '/', statusCode: 301 },
        { source: `${u}/`, destination: '/', statusCode: 301 },
      ]),
      // Genel kural (en sonda kalmalı): /sayfa/ → /sayfa (308, Next'in varsayılanıyla aynı)
      { source: '/:path+/', destination: '/:path+', permanent: true },
    ]
  },

  // ── BLOG YAZILARININ MARKDOWN SÜRÜMLERİ ─────────────────
  // /blog/slug.md → sade metin (yapay zekâ araçları için).
  // beforeFiles: [slug].js dinamik rotasından önce eşleşsin diye.
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/blog/:slug.md', destination: '/api/blog-md?slug=:slug&lang=tr' },
        { source: '/en/blog/:slug.md', destination: '/api/blog-md?slug=:slug&lang=en' },
      ],
    }
  },

  // Güvenlik başlıkları
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ]
  },
}

export default nextConfig