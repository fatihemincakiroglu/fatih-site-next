import type { Metadata } from 'next'
import Link from 'next/link'

type Props = { params: { slug: string } }

const POSTS: Record<string, { baslik: string; ozet: string; tarih: string; etiket: string }> = {
  'eticaret-seo-rehberi-2025': { baslik: 'E-Ticaret SEO Rehberi 2025', ozet: 'E-ticaret sitelerinin Google\'da üst sıralara çıkması için kapsamlı rehber.', tarih: '15 Ocak 2025', etiket: 'E-Ticaret' },
  'geo-nedir': { baslik: 'GEO Nedir? Generative Engine Optimization Rehberi', ozet: 'ChatGPT, Perplexity ve Google AI Overview\'da içerik stratejisi.', tarih: '12 Nisan 2025', etiket: 'AI & GEO' },
  'teknik-seo-denetim-rehberi': { baslik: 'Teknik SEO Denetim Rehberi', ozet: 'Crawl bütçesi, indeksleme sorunları ve hız optimizasyonu.', tarih: '10 Şubat 2025', etiket: 'Teknik SEO' },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = POSTS[params.slug]
  const baslik = p?.baslik || params.slug
  return {
    title: `${baslik} | Fatih Emin Çakıroğlu`,
    description: p?.ozet || `${baslik} hakkında kapsamlı rehber.`,
    alternates: { canonical: `https://fatihemincakiroglu.com/blog/${params.slug}` }
  }
}

export default function BlogPost({ params }: Props) {
  const p = POSTS[params.slug]
  const baslik = p?.baslik || params.slug

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": baslik,
    "author": { "@type": "Person", "name": "Fatih Emin Çakıroğlu" },
    "datePublished": p?.tarih,
    "url": `https://fatihemincakiroglu.com/blog/${params.slug}`
  }

  return (
    <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Breadcrumb */}
      <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '12px 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <nav style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '13px' }}>
            <Link href="/" style={{ color: 'var(--orange)' }}>Ana Sayfa</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <Link href="/blog" style={{ color: 'var(--orange)' }}>Blog</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#888' }}>{baslik}</span>
          </nav>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '48px 32px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          {p?.etiket && <span style={{ padding: '4px 12px', borderRadius: '4px', background: '#fff3ee', color: 'var(--orange)', fontSize: '11px', fontWeight: 700, display: 'inline-block', marginBottom: '16px' }}>{p.etiket}</span>}
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, color: '#111', lineHeight: 1.2, marginBottom: '16px' }}>{baslik}</h1>
          {p?.ozet && <p style={{ color: '#777', fontSize: '16px', lineHeight: 1.6, borderLeft: '3px solid var(--orange)', paddingLeft: '16px' }}>{p.ozet}</p>}
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 32px 96px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '32px' }}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '48px', border: '1px solid #eee' }}>
          <p style={{ color: '#555', fontSize: '16px', lineHeight: 1.85 }}>
            Bu makale yakında detaylı içerikle güncellenecektir. Konuyla ilgili danışmanlık almak için iletişime geçebilirsiniz.
          </p>
        </div>
        <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)', alignSelf: 'start' }}>
          <div style={{ background: '#1a1612', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: '#fff', marginBottom: '8px' }}>Danışmanlık almak ister misiniz?</h3>
            <Link href="/iletisim" style={{ display: 'block', padding: '10px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '13px', textAlign: 'center', marginTop: '12px' }}>
              İletişime Geç →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
