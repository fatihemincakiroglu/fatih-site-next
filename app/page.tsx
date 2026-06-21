import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Fatih Emin Çakıroğlu | SEO ve Dijital Pazarlama Uzmani',
  description: '8+ yillik deneyimle 150+ isletmenin organik buyumesini hizlandirdim. Teknik SEO, GEO ve dijital pazarlama danismanligi.',
  alternates: { canonical: 'https://fatihemincakiroglu.com' }
}

const HIZMETLER = [
  { url: '/seo', ikon: '🔍', baslik: 'SEO Danişmanliği', aciklama: 'Teknik SEO, içerik optimizasyonu ve backlink stratejisiyle organik büyüme.' },
  { url: '/icerik', ikon: '✍️', baslik: 'İçerik Stratejisi', aciklama: 'Arama niyetine uygun, topical authority inşa eden içerik stratejisi.' },
  { url: '/geo', ikon: '🤖', baslik: 'GEO Danişmanliği', aciklama: 'AI aramasinda kaynak olarak görünme stratejisi.' },
  { url: '/backlink', ikon: '🔗', baslik: 'Backlink ve Dijital PR', aciklama: 'Editoryal linkler ve dijital PR ile otorite inşasi.' },
  { url: '/performans', ikon: '📈', baslik: 'Performans ve Growth', aciklama: 'Trafik, dönüşüm ve büyüme hedeflerini optimize etme.' },
  { url: '/vakalar', ikon: '📊', baslik: 'Vaka Çalişmalari', aciklama: 'Gerçek sonuçlar, ölçülebilir başari hikayeleri.' },
]

export default function Home() {
  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Hero */}
      <section style={{ minHeight: '90vh', background: '#1a1612', display: 'flex', alignItems: 'center', padding: '80px 32px' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', border: '1px solid #2a2520', background: '#231f1a', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b6b6b', textTransform: 'uppercase' as const, marginBottom: '28px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--orange)', display: 'inline-block' }}></span>
              SEO UZMANI
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 800, lineHeight: 1.1, color: '#fff', marginBottom: '24px' }}>
              Organik Büyüme ile<br />
              <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>Rakiplerinizi</span><br />
              Geride Bırakın
            </h1>
            <p style={{ fontSize: '16px', color: '#6b6b6b', lineHeight: 1.75, marginBottom: '36px', maxWidth: '460px' }}>
              8 yıllık deneyimle 150+ işletmenin Google üzerindeki görünürlüğünü artırdım. Veriye dayalı SEO stratejileriyle kalıcı büyüme sağlıyorum.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link href="/iletisim" style={{ padding: '14px 28px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '15px', fontFamily: 'var(--font-body)' }}>
                Ücretsiz Teklif Al
              </Link>
              <Link href="/vakalar" style={{ padding: '14px 28px', background: 'transparent', color: '#fff', border: '1px solid #2a2520', borderRadius: '8px', fontWeight: 600, fontSize: '15px', fontFamily: 'var(--font-body)' }}>
                Vaka Çalışmaları
              </Link>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { n: '150+', l: 'Mutlu Müşteri' },
              { n: '8 yıl', l: 'Deneyim' },
              { n: '+300%', l: 'Ort. Büyüme' },
              { n: '%98', l: 'Memnuniyet' }
            ].map((s, i) => (
              <div key={i} style={{ background: '#231f1a', border: '1px solid #2a2520', borderRadius: '12px', padding: '24px', textAlign: 'center' as const }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: 800, color: 'var(--orange)' }}>{s.n}</div>
                <div style={{ fontSize: '13px', color: '#6b6b6b', marginTop: '4px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hizmetler */}
      <section style={{ padding: '96px 32px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, display: 'block', marginBottom: '12px' }}>HİZMETLER</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: 'var(--text)' }}>
              SEO ve dijital pazarlama<br />
              <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>danışmanlık hizmetleri</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {HIZMETLER.map((h, i) => (
              <Link key={i} href={h.url} style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid var(--border)', display: 'block' }}>
                <div style={{ fontSize: '32px', marginBottom: '14px' }}>{h.ikon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>{h.baslik}</h3>
                <p style={{ fontSize: '14px', color: 'var(--dim)', lineHeight: 1.6, marginBottom: '16px' }}>{h.aciklama}</p>
                <span style={{ color: 'var(--orange)', fontWeight: 600, fontSize: '14px' }}>Detayları gör →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '96px 32px', background: '#1a1612', textAlign: 'center' as const }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            Ücretsiz keşif görüşmesi
          </h2>
          <p style={{ color: '#6b6b6b', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>
            Hedeflerinizi değerlendirip size özel yol haritası oluşturuyorum. Bağlayıcı değil, tamamen ücretsiz.
          </p>
          <Link href="/iletisim" style={{ display: 'inline-block', padding: '16px 36px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '16px', fontFamily: 'var(--font-body)' }}>
            İletişime Geç →
          </Link>
        </div>
      </section>
    </div>
  )
}
