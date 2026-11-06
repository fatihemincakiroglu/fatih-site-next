import fs from 'fs'
// ── KALDIRILMIŞ ESKİ ADRESLER → ANA SAYFA (301) ─────────────
// Eski WordPress temasından kalan (kategori, etiket, portfolyo, ekip, tarih
// arşivi) ve hiç yayına alınmamış blog/rehber adresleri. Hepsi 404 veriyordu.
// Sondaki "/" farkı otomatik karşılanır (her adres iki biçimde eşleşir).
// DİKKAT: Buradaki bir blog/rehber slug'ı ileride yayına alınırsa önce
// bu listeden çıkarılmalı; yönlendirme sayfanın önüne geçer.
const ANASAYFAYA_YONLENEN = [
  '/2025/12',
  '/category/performans-pazarlamasi',
  '/analitik-raporlama',
  '/tag/web',
  '/category/dijital-pazarlama',
  '/service-one',
  '/meta-ads-yonetimi',
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

// Eski blog adresleri: içeriği artık sitede bulunan konuya yönlenir (ana sayfa yerine).
// /blog/eeat-icin-icerik ve /en/blog/google-ai-overview-optimizasyonu yeniden yayında olduğu için listede yok.
const KONUYA_YONLENEN = [
  ['/blog/icerik-guncelleme-stratejisi', '/content-pruning'],
  ['/blog/programatik-seo-rehberi', '/programatik-seo'],
  ['/blog/pillar-cluster-modeli', '/topical-authority'],
  ['/blog/backlink-stratejisi-2025', '/backlink-dijital-pr'],
  ['/blog/teknik-seo-2025', '/teknik-seo'],
  ['/en/guides/mobil-seo', '/en/mobil-seo'],
  ['/en/blog/site-migrasyonu-seo', '/en/site-tasima-seo'],
  // Eski kontrol listesi PDF'i → güncel teknik SEO denetim listesi
  ['/downloads/2025-teknik-seo-kontrol-listesi.pdf', '/downloads/teknik-seo-denetim-kontrol-listesi.pdf'],
]

// ── DÜZ ADRESLER (ara kırılım yok) ──────────────────────────
// Blog yazıları, rehberler, sektör sayfaları ve araçlar kök adreste yayında:
//   /<slug>  ve  /en/<slug>
// Sayfa dosyaları klasörlerinde duruyor (pages/blog/[slug].js, pages/rehber/[slug].js,
// pages/sektorler/[slug].js, pages/araclar/*.js ve EN karşılıkları); düz adres
// rewrite ile bu dosyalara bağlanır. Eski /blog/x, /rehber/x, /sektorler/x, /araclar/x
// (ve /en/blog/x, /en/guides/x, /en/industries/x, /en/tools/x) adresleri 301 ile düz adrese gider.
// Liste kaynakları: lib/content-index.js (blog + rehber), lib/sektorler/*.json, ARACLAR.
// Yeni bir yazı/rehber yayına alındığında ek bir şey yapmaya gerek yok.
const ARACLAR = [
  ['schema-olusturucu', 'schema-generator'],
  ['yonlendirme-olusturucu', 'redirect-generator'],
  ['robots-txt-test', 'robots-txt-tester'],
  ['hreflang-olusturucu', 'hreflang-generator'],
  ['serp-onizleme', 'serp-preview'],
  ['utm-olusturucu', 'utm-builder'],
  ['og-onizleme', 'og-preview'],
  ['seo-roi-hesaplayici', 'seo-roi-calculator'],
  ['yonlendirme-zinciri-kontrol', 'redirect-checker'],
  ['anahtar-kelime-gruplama', 'keyword-clustering'],
  ['site-haritasi-olusturucu', 'sitemap-generator'],
  ['meta-etiket-olusturucu', 'meta-tag-generator'],
]
function duzRotalar() {
  const oku = (y) => fs.readFileSync(new URL(y, import.meta.url), 'utf8')
  const [blogKismi, rehberKismi] = oku('./lib/content-index.js').split('export const YAYINDAKI_REHBER_SLUGS')
  const sluglar = (t) => [...t.matchAll(/^ {2}'([a-z0-9-]+)',$/gm)].map(m => m[1])
  const sektorler = fs.readdirSync(new URL('./lib/sektorler/', import.meta.url))
    .filter(f => f.endsWith('.json'))
    .map(f => [f.slice(0, -5), JSON.parse(oku(`./lib/sektorler/${f}`)).slug_en])
  return [
    ...sluglar(blogKismi).flatMap(s => [[`/${s}`, `/blog/${s}`], [`/en/${s}`, `/en/blog/${s}`]]),
    ...sluglar(rehberKismi.split(']')[0]).flatMap(s => [[`/${s}`, `/rehber/${s}`], [`/en/${s}`, `/en/guides/${s}`]]),
    ...sektorler.flatMap(([tr, en]) => [[`/${tr}`, `/sektorler/${tr}`], [`/en/${en}`, `/en/industries/${en}`]]),
    ...ARACLAR.flatMap(([tr, en]) => [[`/${tr}`, `/araclar/${tr}`], [`/en/${en}`, `/en/tools/${en}`]]),
  ]
}
// Eski ara kırılımlı adresler → düz adres. Next'in istemci tarafı veri isteklerine
// (x-nextjs-data başlığı) uygulanmaz; aksi hâlde sayfa içi geçişlerde döngü oluşurdu.
const ESKI_ONEKLER = ['/blog', '/rehber', '/sektorler', '/araclar', '/en/blog', '/en/guides', '/en/industries', '/en/tools']
const veriIstegiDegil = [{ type: 'header', key: 'x-nextjs-data' }]

// ── GÜVENLİK BAŞLIKLARI ─────────────────────────────────────
// Content-Security-Policy: sayfanın hangi kaynaklardan script, stil, görsel,
// font yükleyebileceğini ve nereye bağlanabileceğini belirler.
// • script-src'de 'unsafe-inline' YOK: sitede inline script bulunmuyor
//   (GA başlatma kodu public/ga-init.js'te). JSON-LD ve __NEXT_DATA__ blokları
//   çalıştırılabilir kod olmadığı için CSP'den etkilenmez.
// • style-src 'unsafe-inline': tasarım satır içi stil ve styled-jsx kullanıyor.
// • Google Analytics 4 alan adları Google'ın GA4 CSP rehberine göre eklendi.
// • img-src www.google.com + *.gstatic.com: AiOzetle kutusundaki asistan logoları.
// • img-src https: Open Graph önizleme aracı (/og-onizleme) kullanıcının girdiği sayfanın
//   og:image görselini herhangi bir alan adından gösterir; bu yüzden tüm https görsellerine izin var.
// • Yeni bir dış kaynak (ör. Calendly gömme, YouTube) eklenirse buraya da eklenmeli.
//
// CSP_ZORLA = false → "Report-Only": tarayıcı hiçbir şeyi ENGELLEMEZ, yalnızca
// ihlalleri konsola yazar. Bir hafta konsolda ihlal görülmezse true yapın.
const CSP_ZORLA = false

const CSP = [
  "default-src 'self'",
  "script-src 'self' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
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
      ...KONUYA_YONLENEN.flatMap(([u, hedef]) => [
        { source: u, destination: hedef, statusCode: 301 },
        { source: `${u}/`, destination: hedef, statusCode: 301 },
      ]),
      // Kaldırılmış eski adresler → ana sayfa. statusCode: 301 (permanent: true 308 verir).
      ...ESKI_ONEKLER.map(onek => ({
        source: `${onek}/:slug`,
        destination: `${onek.startsWith('/en') ? '/en' : ''}/:slug`,
        statusCode: 301,
        missing: veriIstegiDegil,
      })),
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
        // Markdown sürümleri: /<slug>.md ve /en/<slug>.md (blog mu rehber mi API slug'dan anlar)
        { source: '/:slug.md', destination: '/api/blog-md?slug=:slug&lang=tr' },
        { source: '/en/:slug.md', destination: '/api/blog-md?slug=:slug&lang=en' },
      ],
      // Düz adres → sayfa dosyası (sayfa ve public dosyalarından sonra, dinamik rotalardan önce)
      afterFiles: duzRotalar().map(([source, destination]) => ({ source, destination })),
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