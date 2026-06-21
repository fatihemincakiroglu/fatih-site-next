import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';

const PAKETLER = [
  {
    isim: 'Başlangıç',
    fiyat: { aylik: '8.500', yillik: '7.200' },
    aciklama: 'Küçük işletmeler ve yeni web siteleri için temel SEO paketi.',
    renk: '#f8f7f5',
    border: '#e0dbd0',
    ozellikler: [
      'Teknik SEO Denetimi (50+ kontrol)',
      'Anahtar Kelime Araştırması (50 kelime)',
      'On-Page Optimizasyon (10 sayfa)',
      'Aylık Raporlama',
      'Google Search Console Kurulumu',
      'Google Analytics 4 Entegrasyonu',
      'E-posta Desteği',
    ],
    dahilDegil: ['Backlink İnşası', 'İçerik Üretimi', 'Rakip Analizi'],
    cta: 'Başlangıç Paketi Al',
    populer: false,
  },
  {
    isim: 'Profesyonel',
    fiyat: { aylik: '18.500', yillik: '15.500' },
    aciklama: 'Büyümek isteyen işletmeler için kapsamlı SEO ve içerik stratejisi.',
    renk: '#1a1612',
    border: '#e8560a',
    ozellikler: [
      'Teknik SEO Denetimi (100+ kontrol)',
      'Anahtar Kelime Araştırması (200 kelime)',
      'On-Page Optimizasyon (30 sayfa)',
      'Backlink İnşası (10 link/ay)',
      'Aylık 4 Blog İçeriği',
      'Rakip Analizi',
      'Haftalık Raporlama',
      'Öncelikli E-posta & Telefon Desteği',
    ],
    dahilDegil: [],
    cta: 'Profesyonel Paketi Al',
    populer: true,
  },
  {
    isim: 'Kurumsal',
    fiyat: { aylik: 'Teklif', yillik: 'Teklif' },
    aciklama: 'Büyük ölçekli siteler ve ajanslar için özelleştirilmiş çözümler.',
    renk: '#f8f7f5',
    border: '#e0dbd0',
    ozellikler: [
      'Sınırsız Teknik SEO Denetimi',
      'Kapsamlı Anahtar Kelime Araştırması',
      'Tüm Sayfa Optimizasyonu',
      'Backlink İnşası (Sınırsız)',
      'Haftalık İçerik Üretimi',
      'Dijital PR Kampanyaları',
      'Özel SEO Stratejisi',
      '7/24 Öncelikli Destek',
      'Aylık Strateji Toplantısı',
    ],
    dahilDegil: [],
    cta: 'Teklif Al',
    populer: false,
  },
];

const SSS = [
  { s: 'Sözleşme süresi ne kadar?', c: 'Minimum 3 aylık çalışma taahhüdü istiyoruz. SEO sonuçları 3-6 ay içinde oluştuğundan kısa vadeli çalışmalar genellikle yeterli veri sunmaz.' },
  { s: 'Sonuçları ne zaman görürüm?', c: 'İlk teknik iyileştirmelerin etkileri 4-6 haftada görünebilir. Anlamlı trafik artışı için 3-6 ay, tam potansiyele ulaşmak için 6-12 ay öngörülmektedir.' },
  { s: 'Raporlama nasıl yapılıyor?', c: 'Başlangıç paketinde aylık, diğer paketlerde haftalık otomatik raporlar Google Looker Studio üzerinden gönderilir. Trafik, sıralama ve dönüşüm verileri birlikte sunulur.' },
  { s: 'Paket değiştirmek mümkün mü?', c: 'Evet, herhangi bir ay başında paket değişikliği yapabilirsiniz. Yükseltme anında geçerli olurken düşürme bir sonraki fatura döneminde uygulanır.' },
];

export default function Page() {
  const [donem, setDonem] = useState('aylik');
  const [acikSSS, setAcikSSS] = useState(null);

  return (
    <>
      <Head>
        <title>Fiyatlandırma | Fatih Emin Çakıroğlu — SEO Danışmanlık Paketleri</title>
        <meta name="description" content="SEO danışmanlığı fiyat ve paketleri. Aylık retainer, proje bazlı ve tek seferlik SEO denetim seçenekleri." />
        <link rel="canonical" href="https://fatihemincakiroglu.com/fiyatlandirma" />

        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "PriceSpecification", "name": "SEO Danışmanlık Paketleri", "priceCurrency": "TRY", "description": "Aylık retainer, proje bazlı ve tek seferlik SEO danışmanlık paket seçenekleri."})}</script>
        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://fatihemincakiroglu.com"}, {"@type": "ListItem", "position": 2, "name": "Fiyatlandırma", "item": "https://fatihemincakiroglu.com/fiyatlandirma"}]})}</script>
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>Ana Sayfa</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>Fiyatlandırma</span>
          </div>
        </div>


        {/* Header */}
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '64px 32px 48px', textAlign: 'center' }}>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>FİYATLANDIRMA</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#111', lineHeight: 1.15, marginBottom: '16px' }}>
              Şeffaf fiyatlandırma,<br /><span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>ölçülebilir sonuçlar</span>
            </h1>
            <p style={{ color: '#777', fontSize: '16px', lineHeight: 1.6, marginBottom: '28px' }}>
              Gizli ücret yok. Her pakette ne aldığınızı tam olarak bilirsiniz.
            </p>
            {/* Aylık / Yıllık toggle */}
            <div style={{ display: 'inline-flex', background: '#f0ece4', borderRadius: '10px', padding: '4px', gap: '4px' }}>
              {['aylik', 'yillik'].map(d => (
                <button key={d} onClick={() => setDonem(d)} style={{
                  padding: '8px 20px', borderRadius: '8px', border: 'none',
                  background: donem === d ? '#fff' : 'transparent',
                  color: donem === d ? '#111' : '#888',
                  fontSize: '14px', fontWeight: donem === d ? 700 : 400,
                  cursor: 'pointer', fontFamily: 'var(--font-body)',
                  boxShadow: donem === d ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                }}>
                  {d === 'aylik' ? 'Aylık' : 'Yıllık'}{d === 'yillik' && <span style={{ marginLeft: '6px', fontSize: '11px', color: 'var(--orange)', fontWeight: 700 }}>%15 İndirim</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Paketler */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignItems: 'start' }}>
            {PAKETLER.map((p, i) => (
              <div key={i} style={{
                background: p.populer ? '#1a1612' : '#fff',
                borderRadius: '16px', padding: '32px',
                border: `2px solid ${p.populer ? 'var(--orange)' : '#eee'}`,
                position: 'relative', transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {p.populer && (
                  <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--orange)', color: '#fff', padding: '4px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    EN POPÜLER
                  </div>
                )}
                <div style={{ marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: p.populer ? '#fff' : '#111', marginBottom: '8px' }}>{p.isim}</h2>
                  <p style={{ fontSize: '13px', color: p.populer ? '#9a9a9a' : '#888', lineHeight: 1.5, marginBottom: '20px' }}>{p.aciklama}</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    {p.fiyat[donem] === 'Teklif' ? (
                      <span style={{ fontSize: '32px', fontWeight: 800, color: p.populer ? '#fff' : '#111' }}>Özel Teklif</span>
                    ) : (
                      <>
                        <span style={{ fontSize: '36px', fontWeight: 800, color: p.populer ? '#fff' : '#111' }}>₺{p.fiyat[donem]}</span>
                        <span style={{ fontSize: '14px', color: p.populer ? '#6b6b6b' : '#aaa' }}>/ay</span>
                      </>
                    )}
                  </div>
                  {donem === 'yillik' && p.fiyat.yillik !== 'Teklif' && (
                    <div style={{ fontSize: '12px', color: 'var(--orange)', marginTop: '4px', fontWeight: 600 }}>Yıllık ödemede geçerli</div>
                  )}
                </div>

                <Link href="/randevu">
                  <button style={{
                    width: '100%', padding: '13px', borderRadius: '8px', border: 'none',
                    background: p.populer ? 'var(--orange)' : '#111',
                    color: '#fff', fontWeight: 700, fontSize: '15px',
                    cursor: 'pointer', fontFamily: 'var(--font-body)', marginBottom: '24px',
                    transition: 'opacity 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >{p.cta}</button>
                </Link>

                <div style={{ borderTop: `1px solid ${p.populer ? '#2a2520' : '#f0f0f0'}`, paddingTop: '20px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: p.populer ? '#6b6b6b' : '#aaa', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>DAHIL</div>
                  {p.ozellikler.map((o, oi) => (
                    <div key={oi} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' }}>
                      <span style={{ color: 'var(--orange)', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>✓</span>
                      <span style={{ fontSize: '14px', color: p.populer ? '#d0cbc0' : '#555', lineHeight: 1.4 }}>{o}</span>
                    </div>
                  ))}
                  {p.dahilDegil.length > 0 && (
                    <>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: p.populer ? '#4a4540' : '#ccc', textTransform: 'uppercase', letterSpacing: '1px', margin: '16px 0 12px' }}>DAHİL DEĞİL</div>
                      {p.dahilDegil.map((o, oi) => (
                        <div key={oi} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <span style={{ color: '#ccc', fontSize: '14px' }}>✕</span>
                          <span style={{ fontSize: '14px', color: '#bbb', textDecoration: 'line-through' }}>{o}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Güven */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', margin: '40px 0', padding: '24px', background: '#fff', borderRadius: '12px', border: '1px solid #eee' }}>
            {['Bağlayıcı olmayan ilk görüşme', 'Şeffaf raporlama', '8+ yıl deneyim', '150+ mutlu müşteri'].map((g, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#555' }}>
                <span style={{ color: 'var(--orange)' }}>✓</span> {g}
              </div>
            ))}
          </div>

          {/* SSS */}
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: '#111', textAlign: 'center', marginBottom: '32px' }}>Sıkça Sorulan Sorular</h2>
            {SSS.map((item, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '10px', marginBottom: '10px', border: '1px solid #eee', overflow: 'hidden' }}>
                <button onClick={() => setAcikSSS(acikSSS === i ? null : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-body)' }}>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: '#111' }}>{item.s}</span>
                  <span style={{ fontSize: '20px', color: '#aaa', transform: acikSSS === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
                </button>
                {acikSSS === i && (
                  <div style={{ padding: '0 20px 18px' }}>
                    <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.7 }}>{item.c}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() { return { props: {} } }
