import Link from 'next/link'
import Image from 'next/image'

// Görselli yazı kartları. Veri getStaticProps'ta lib/yazi-kart.js ile hazırlanır.
//   <YaziKartlari kartlar={yazilar} baslik="..." aciklama="..." isEn={isEn} />
export default function YaziKartlari({ kartlar = [], baslik, aciklama, isEn = false, stil = {} }) {
  if (!kartlar.length) return null
  return (
    <section style={{ maxWidth: '920px', margin: '0 auto', padding: '24px 16px 8px', ...stil }}>
      {baslik && (
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, color: '#111', marginBottom: aciklama ? '6px' : '14px' }}>{baslik}</h2>
      )}
      {aciklama && <p style={{ color: '#666', fontSize: '15px', lineHeight: 1.7, margin: '0 0 16px' }}>{aciklama}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
        {kartlar.map(k => (
          <Link key={k.slug} href={k.href} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '12px', border: '1px solid #eee', background: '#fff', textDecoration: 'none' }}>
            {k.kapak && (
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#f3f3f3' }}>
                <Image src={k.kapak} alt={k.baslik} fill sizes="(max-width: 768px) 100vw, 300px" style={{ objectFit: 'cover' }} />
              </div>
            )}
            <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#111', lineHeight: 1.4, marginBottom: '6px' }}>{k.baslik}</div>
              {k.ozet && <div style={{ fontSize: '13px', color: '#777', lineHeight: 1.55, marginBottom: '10px', flex: 1 }}>{k.ozet}</div>}
              <span style={{ fontSize: '12.5px', color: 'var(--orange)', fontWeight: 600 }}>{isEn ? 'Read →' : 'Yazıyı oku →'}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
