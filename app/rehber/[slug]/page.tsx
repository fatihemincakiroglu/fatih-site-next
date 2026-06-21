import type { Metadata } from 'next'
import Link from 'next/link'

type Props = { params: { slug: string } }

const REHBERLER: Record<string, { baslik: string; aciklama: string }> = {
  'teknik-seo': { baslik: 'Teknik SEO', aciklama: 'Crawl bütçesi, site mimarisi ve Core Web Vitals rehberi.' },
  'on-page-seo': { baslik: 'On-Page SEO', aciklama: 'Başlık, içerik sinyalleri ve sayfa içi optimizasyon.' },
  'off-page-seo': { baslik: 'Off Page SEO', aciklama: 'Dış güven, itibar ve marka sinyalleri.' },
  'keyword-research': { baslik: 'Keyword Research', aciklama: 'Arama niyeti odaklı anahtar kelime araştırması.' },
  'backlink': { baslik: 'Link Oluşturma', aciklama: 'Backlink kalitesi ve sürdürülebilir link stratejisi.' },
  'mobil-seo': { baslik: 'Mobil SEO', aciklama: 'Mobile-first indeksleme ve mobil deneyim.' },
  'core-web-vitals': { baslik: 'Core Web Vitals', aciklama: 'LCP, INP ve CLS optimizasyonu.' },
  'yerel-seo': { baslik: 'Yerel SEO', aciklama: 'Google Maps ve yerel arama optimizasyonu.' },
  'seo-101': { baslik: 'SEO 101', aciklama: 'SEO\'ya giriş için temel çerçeve.' },
  'geo-nedir': { baslik: 'GEO Nedir?', aciklama: 'Generative Engine Optimization tanımı.' },
  'llmstxt': { baslik: 'llms.txt', aciklama: 'LLM sistemler için standart dosya oluşturma.' },
  'ai-overview': { baslik: 'AI Overview Optimizasyonu', aciklama: 'Google AI Overview\'da kaynak olma.' },
  'aeo': { baslik: 'Answer Engine Optimization', aciklama: 'Yanıt motorlarına uygun içerik stratejisi.' },
  'zero-click': { baslik: 'Zero-Click Search', aciklama: 'Tıklamasız aramada görünürlük stratejisi.' },
  'eeat': { baslik: 'E-E-A-T Rehberi', aciklama: 'Deneyim, Uzmanlık, Otorite ve Güvenilirlik sinyalleri.' },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = REHBERLER[params.slug]
  const baslik = r?.baslik || params.slug
  return {
    title: `${baslik} | SEO Rehberi | Fatih Emin Çakıroğlu`,
    description: r?.aciklama || `${baslik} hakkında kapsamlı rehber.`,
    alternates: { canonical: `https://fatihemincakiroglu.com/rehber/${params.slug}` }
  }
}

export async function generateStaticParams() {
  return Object.keys(REHBERLER).map(slug => ({ slug }))
}

export default function RehberPost({ params }: Props) {
  const r = REHBERLER[params.slug]
  const baslik = r?.baslik || params.slug
  const aciklama = r?.aciklama || ''

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": baslik,
    "author": { "@type": "Person", "name": "Fatih Emin Çakıroğlu" },
    "url": `https://fatihemincakiroglu.com/rehber/${params.slug}`
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://fatihemincakiroglu.com" },
      { "@type": "ListItem", "position": 2, "name": "Rehber", "item": "https://fatihemincakiroglu.com/rehber" },
      { "@type": "ListItem", "position": 3, "name": baslik }
    ]
  }

  return (
    <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '12px 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <nav style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '13px' }}>
            <Link href="/" style={{ color: 'var(--orange)' }}>Ana Sayfa</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <Link href="/rehber" style={{ color: 'var(--orange)' }}>Rehber</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#888' }}>{baslik}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '48px 32px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#111', lineHeight: 1.2, marginBottom: '16px' }}>{baslik}</h1>
          {aciklama && <p style={{ color: '#777', fontSize: '16px', lineHeight: 1.6, borderLeft: '3px solid var(--orange)', paddingLeft: '16px' }}>{aciklama}</p>}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>F</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#111' }}>Fatih Emin Çakıroğlu</div>
              <div style={{ fontSize: '12px', color: '#aaa' }}>SEO & Dijital Pazarlama Uzmanı</div>
            </div>
          </div>
        </div>
      </div>

      {/* İçerik + Sidebar */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 32px 96px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '32px' }}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '48px', border: '1px solid #eee' }}>
          <p style={{ color: '#555', fontSize: '16px', lineHeight: 1.85, marginBottom: '24px' }}>
            {baslik}, dijital pazarlama ve SEO stratejisinin kritik bir bileşenidir. Bu rehberde konuyu derinlemesine ele alarak uygulamalı bir çerçeve sunuyoruz.
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#111', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '4px', height: '22px', background: 'var(--orange)', borderRadius: '2px', display: 'inline-block' }}></span>
            Temel Prensipler
          </h2>
          <p style={{ color: '#555', fontSize: '16px', lineHeight: 1.85, marginBottom: '24px' }}>
            Etkili bir uygulama için önce mevcut durumun analizi, ardından öncelikli aksiyon alanlarının belirlenmesi ve ölçülebilir hedeflerin tanımlanması gerekmektedir. Veriye dayalı karar alma her adımda esas olmalıdır.
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#111', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '4px', height: '22px', background: 'var(--orange)', borderRadius: '2px', display: 'inline-block' }}></span>
            Uygulama Adımları
          </h2>
          <p style={{ color: '#555', fontSize: '16px', lineHeight: 1.85 }}>
            Sistematik yaklaşım benimsemek, kaynakların en verimli biçimde kullanılmasını sağlar. Düzenli ölçüm ve optimizasyon döngüsü başarının anahtarıdır.
          </p>
        </div>

        {/* Sidebar */}
        <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)', display: 'flex', flexDirection: 'column', gap: '16px', alignSelf: 'start' }}>
          <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #eee' }}>
            <div style={{ fontSize: '11px', color: '#aaa', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px' }}>İÇİNDEKİLER</div>
            {['Temel Prensipler', 'Uygulama Adımları'].map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '10px', padding: '6px 8px', borderRadius: '6px' }}>
                <span style={{ fontSize: '12px', color: 'var(--orange)', fontWeight: 700, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: '13px', color: '#666', lineHeight: 1.4 }}>{b}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#1a1612', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px' }}>DANIŞMANLIK</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: '#fff', marginBottom: '8px', lineHeight: 1.4 }}>Bu konuda yardım almak ister misiniz?</h3>
            <Link href="/iletisim" style={{ display: 'block', padding: '10px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '13px', textAlign: 'center', marginTop: '12px' }}>
              İletişime Geç →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
