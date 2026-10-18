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

// ── GÜVENLİK BAŞLIKLARI ─────────────────────────────────────
// Content-Security-Policy: sayfanın hangi kaynaklardan script, stil, görsel,
// font yükleyebileceğini ve nereye bağlanabileceğini belirler.
// • script-src'de 'unsafe-inline' YOK: sitede inline script bulunmuyor
//   (GA başlatma kodu public/ga-init.js'te). JSON-LD ve __NEXT_DATA__ blokları
//   çalıştırılabilir kod olmadığı için CSP'den etkilenmez.
// • style-src 'unsafe-inline': tasarım satır içi stil ve styled-jsx kullanıyor.
// • Google Analytics 4 alan adları Google'ın GA4 CSP rehberine göre eklendi.
// • img-src www.google.com + *.gstatic.com: AiOzetle kutusundaki asistan logoları.
// • Yeni bir dış kaynak (ör. Calendly gömme, YouTube) eklenirse buraya da eklenmeli.
//
// CSP_ZORLA = false → "Report-Only": tarayıcı hiçbir şeyi ENGELLEMEZ, yalnızca
// ihlalleri konsola yazar. Bir hafta konsolda ihlal görülmezse true yapın.
const CSP_ZORLA = false

const CSP = [
  "default-src 'self'",
  "script-src 'self' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google.com https://*.gstatic.com https://*.google-analytics.com https://*.googletagmanager.com https://*.g.doubleclick.net",
  "font-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://www.google.com",
  "frame-src 'none'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Rapor modunda tarayıcı bu kuralı yok sayıp konsola uyarı yazar; yalnızca engelleyen modda ekle.
  ...(CSP_ZORLA ? ['upgrade-insecure-requests'] : []),
].join('; ')

const GUVENLIK_BASLIKLARI = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // HTTPS zorunluluğu (2 yıl). "preload" bilerek eklenmedi: listeye girince
  // çıkmak aylar sürer; tüm alt alan adları HTTPS olduğundan emin olunmalı.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  // Site bu tarayıcı özelliklerini kullanmıyor; kapalı tutulur.
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  // CSP yalnızca canlı (production) derlemede: geliştirme modu eval kullanır.
  ...(process.env.NODE_ENV === 'production'
    ? [{ key: CSP_ZORLA ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only', value: CSP }]
    : []),
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  // "X-Powered-By: Next.js" başlığı gönderilmez (gereksiz altyapı bilgisi).
  poweredByHeader: false,

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
      // /istanbul-geo-uzmani kaldırıldı (/geo-uzmani ile aynı sorguyu hedefliyordu).
      { source: '/istanbul-geo-uzmani', destination: '/geo-uzmani', statusCode: 301 },
      { source: '/istanbul-geo-uzmani/', destination: '/geo-uzmani', statusCode: 301 },
      // /istanbul-seo-uzmani kaldırıldı (/seo-uzmani ile aynı sorguyu hedefliyordu).
      { source: '/istanbul-seo-uzmani', destination: '/seo-uzmani', statusCode: 301 },
      { source: '/istanbul-seo-uzmani/', destination: '/seo-uzmani', statusCode: 301 },
      // Kaldırılmış eski adresler → ana sayfa. statusCode: 301 (permanent: true 308 verir).
      ...ANASAYFAYA_YONLENEN.flatMap(u => [
        { source: u, destination: '/', statusCode: 301 },
        { source: `${u}/`, destination: '/', statusCode: 301 },
      ]),
      // Genel kural (en sonda kalmalı): /sayfa/ → /sayfa (308, Next'in varsayılanıyla aynı)
      { source: '/:path+/', destination: '/:path+', permanent: true },
    ]
  },

  // ── BLOG VE REHBERLERİN MARKDOWN SÜRÜMLERİ ──────────────
  // /blog/slug.md, /rehber/slug.md → sade metin (yapay zekâ araçları için).
  // beforeFiles: [slug].js dinamik rotasından önce eşleşsin diye.
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/blog/:slug.md', destination: '/api/blog-md?slug=:slug&lang=tr' },
        { source: '/en/blog/:slug.md', destination: '/api/blog-md?slug=:slug&lang=en' },
        { source: '/rehber/:slug.md', destination: '/api/blog-md?slug=:slug&lang=tr&tur=rehber' },
        { source: '/en/guides/:slug.md', destination: '/api/blog-md?slug=:slug&lang=en&tur=rehber' },
      ],
    }
  },

  // Güvenlik başlıkları
  async headers() {
    return [
      {
        source: '/:path*',
        headers: GUVENLIK_BASLIKLARI,
      },
    ]
  },
}

export default nextConfig