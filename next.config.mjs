/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript ve ESLint hataları artık build'i durdurur.
  // (Önceden ignore ediliyordu; bu, kırık kodun sessizce prod'a çıkmasına yol açar.)
  reactStrictMode: true,

  images: {
    // Next'in görsel optimizasyonu açık: kaynak PNG/JPG'ler istemciye
    // AVIF/WebP olarak, cihaz genişliğine uygun boyutta servis edilir.
    formats: ['image/avif', 'image/webp'],
    // Logo/ikon gibi küçük görseller için ek boyut basamakları
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 400],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 gün
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
