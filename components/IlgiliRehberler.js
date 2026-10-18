import Link from 'next/link'
import { REHBER_LISTE } from '../lib/rehber-liste'

// Hizmet sayfaları, pillar rehberler ve blog yazılarının sonunda gösterilen
// "İlgili rehberler" kutusu. Bağlantı metni rehberin başlığıdır (anahtar kelimeli).
//
//   <IlgiliRehberler sluglar={['yerel-seo', 'schema-yapisal-veri']} isEn={isEn} />
export default function IlgiliRehberler({ sluglar = [], isEn = false, baslik, koyu = false, stil = {} }) {
  const liste = sluglar.map(s => REHBER_LISTE.find(r => r.slug === s)).filter(Boolean)
  if (!liste.length) return null
  return (
    <section aria-label={isEn ? 'Related guides' : 'İlgili rehberler'} style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 16px', ...stil }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, color: koyu ? '#fff' : '#111', marginBottom: '16px' }}>
        {baslik || (isEn ? 'Related guides' : 'İlgili rehberler')}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
        {liste.map(r => {
          const l = isEn ? r.en : r.tr
          return (
            <Link key={r.slug} href={isEn ? `/en/guides/${r.slug}` : `/rehber/${r.slug}`}
              style={{ display: 'block', padding: '18px', borderRadius: '12px', border: koyu ? '1px solid #2a2a2a' : '1px solid #eee', background: koyu ? '#161616' : '#fff', textDecoration: 'none' }}>
              <div style={{ fontSize: '15px', fontWeight: 700, color: koyu ? '#fff' : '#111', lineHeight: 1.4, marginBottom: '6px' }}>
                <span aria-hidden="true" style={{ marginRight: '8px' }}>{r.ikon}</span>{l.baslik}
              </div>
              <div style={{ fontSize: '13px', color: koyu ? '#aaa' : '#777', lineHeight: 1.6, marginBottom: '8px' }}>{l.ozet}</div>
              <span style={{ fontSize: '12.5px', color: 'var(--orange)', fontWeight: 600 }}>{isEn ? 'Read the guide →' : 'Rehberi oku →'}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
