import Link from 'next/link'
import { useRouter } from 'next/router'

export default function NotFound() {
  const router = useRouter()
  const isEn = router.pathname.startsWith('/en')
  return (
    <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#faf9f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '120px', fontWeight: 900, color: '#f0ede8', lineHeight: 1, marginBottom: '8px' }}>404</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#111', marginBottom: '16px' }}>
          {isEn ? 'Page Not Found' : 'Sayfa Bulunamadı'}
        </h1>
        <p style={{ color: '#777', fontSize: '16px', marginBottom: '36px', maxWidth: '400px', margin: '0 auto 36px' }}>
          {isEn ? 'The page you\'re looking for doesn\'t exist or has been moved.' : 'Aradığınız sayfa mevcut değil veya taşınmış olabilir.'}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ padding: '12px 28px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '15px', fontFamily: 'var(--font-body)' }}>
            {isEn ? '← Go Home' : '← Ana Sayfaya Dön'}
          </Link>
          <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ padding: '12px 28px', background: '#fff', color: '#333', border: '1px solid #ddd', borderRadius: '8px', fontWeight: 600, fontSize: '15px', fontFamily: 'var(--font-body)' }}>
            {isEn ? 'Contact' : 'İletişim'}
          </Link>
        </div>
        <div style={{ marginTop: '48px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { tr: 'SEO Danışmanlığı', en: 'SEO Consulting', href: '/seo' },
            { tr: 'GEO Danışmanlığı', en: 'GEO Consulting', href: '/geo' },
            { tr: 'Blog', en: 'Blog', href: '/blog' },
            { tr: 'SSS', en: 'FAQ', href: '/sss' },
          ].map((l, i) => (
            <Link key={i} href={l.href} style={{ color: 'var(--orange)', fontSize: '14px', fontWeight: 600 }}>
              {isEn ? l.en : l.tr} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
