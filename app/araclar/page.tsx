import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `Ücretsiz SEO Araçları | Fatih Emin Çakıroğlu`,
  description: `Meta tag analizi, anahtar kelime araştırması ve SEO skor hesaplayıcı. Kayıt gerekmez.`,
  alternates: { canonical: `https://fatihemincakiroglu.com/araclar` }
}

export default function Page() {
  return (
    <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
      <div style={{ background: '#1a1612', padding: '64px 32px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>ÜCRETSIZ SEO ARAÇLARI</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '20px' }}>Ücretsiz SEO Araçları</h1>
          <p style={{ color: '#9a9a9a', fontSize: '17px', lineHeight: 1.7, marginBottom: '32px', maxWidth: '560px' }}>Meta tag analizi, anahtar kelime araştırması ve SEO skor hesaplayıcı. Kayıt gerekmez.</p>
          <Link href="/iletisim" style={{ display: 'inline-block', padding: '14px 28px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '15px' }}>
            Ücretsiz Teklif Al &rarr;
          </Link>
        </div>
      </div>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 32px 96px' }}>
        <div style={{ background: '#1a1612', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#fff', marginBottom: '12px' }}>Yardımcı olabilir miyim?</h2>
          <Link href="/iletisim" style={{ display: 'inline-block', padding: '13px 28px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700 }}>
            İletişime Geç &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
