import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ServerError() {
  const router = useRouter()
  const isEn = router.pathname.startsWith('/en')
  return (
    <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#faf9f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '120px', fontWeight: 900, color: '#f0ede8', lineHeight: 1, marginBottom: '8px' }}>500</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, color: '#111', marginBottom: '12px' }}>
          {isEn ? 'Something went wrong' : 'Bir hata oluştu'}
        </h1>
        <p style={{ color: '#777', fontSize: '15px', marginBottom: '32px', maxWidth: '380px', margin: '0 auto 32px' }}>
          {isEn ? 'Our server encountered an unexpected error. Please try again.' : 'Sunucumuzda beklenmedik bir hata oluştu. Lütfen tekrar deneyin.'}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => router.reload()} style={{ padding: '12px 28px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '15px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
            {isEn ? '↺ Try Again' : '↺ Tekrar Dene'}
          </button>
          <Link href="/" style={{ padding: '12px 28px', background: '#fff', color: '#333', border: '1px solid #ddd', borderRadius: '8px', fontWeight: 600, fontSize: '15px', fontFamily: 'var(--font-body)' }}>
            {isEn ? '← Go Home' : '← Ana Sayfaya Dön'}
          </Link>
        </div>
      </div>
    </div>
  )
}
