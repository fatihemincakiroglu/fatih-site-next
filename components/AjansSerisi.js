import Link from 'next/link'

// "Türkiye'nin en iyi ajansları" serisi: önceki/sonraki yazı ve serinin tamamı.
// Yeni bir ajans listesi eklendiğinde buraya da ekleyin (sıra = okuma sırası).
export const AJANS_SERISI = [
  { slug: 'turkiye-en-iyi-10-seo-ajansi-2026', tr: 'En İyi 10 SEO Ajansı', en: 'Best 10 SEO Agencies' },
  { slug: 'turkiye-en-iyi-15-seo-ajansi-2026', tr: 'En İyi 15 SEO Ajansı', en: 'Best 15 SEO Agencies' },
  { slug: 'turkiye-en-iyi-10-geo-ajansi-2026', tr: 'En İyi 10 GEO Ajansı', en: 'Best 10 GEO Agencies' },
  { slug: 'turkiye-en-iyi-15-geo-ajansi-2026', tr: 'En İyi 15 GEO Ajansı', en: 'Best 15 GEO Agencies' },
  { slug: 'turkiye-en-iyi-10-dijital-pazarlama-ajansi-2026', tr: 'En İyi 10 Dijital Pazarlama Ajansı', en: 'Best 10 Digital Marketing Agencies' },
  { slug: 'turkiye-en-iyi-15-dijital-pazarlama-ajansi-2026', tr: 'En İyi 15 Dijital Pazarlama Ajansı', en: 'Best 15 Digital Marketing Agencies' },
  { slug: 'turkiye-en-iyi-10-sosyal-medya-ajansi-2026', tr: 'En İyi 10 Sosyal Medya Ajansı', en: 'Best 10 Social Media Agencies' },
  { slug: 'turkiye-en-iyi-15-sosyal-medya-ajansi-2026', tr: 'En İyi 15 Sosyal Medya Ajansı', en: 'Best 15 Social Media Agencies' },
  { slug: 'turkiye-en-iyi-10-e-ticaret-ajansi-2026', tr: 'En İyi 10 E-ticaret Ajansı', en: 'Best 10 E-commerce Agencies' },
  { slug: 'turkiye-en-iyi-10-google-ads-ajansi-2026', tr: 'En İyi 10 Google Ads Ajansı', en: 'Best 10 Google Ads Agencies' },
  { slug: 'turkiye-en-iyi-10-web-tasarim-ajansi-2026', tr: 'En İyi 10 Web Tasarım Ajansı', en: 'Best 10 Web Design Agencies' },
]

export default function AjansSerisi({ slug, isEn = false }) {
  const i = AJANS_SERISI.findIndex(x => x.slug === slug)
  if (i < 0) return null
  const yol = (s) => (isEn ? `/en/${s}` : `/${s}`)
  const ad = (x) => (isEn ? x.en : x.tr)
  const onceki = AJANS_SERISI[(i - 1 + AJANS_SERISI.length) % AJANS_SERISI.length]
  const sonraki = AJANS_SERISI[(i + 1) % AJANS_SERISI.length]
  const ok = { flex: '1 1 220px', display: 'block', padding: '14px 16px', borderRadius: '12px', border: '1px solid #eee', background: '#fff', textDecoration: 'none' }
  return (
    <nav aria-label={isEn ? 'Agency list series' : 'Ajans listeleri serisi'} style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid #f0ece6' }}>
      <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#999', marginBottom: '12px' }}>
        {isEn ? `Series · Turkey's best agencies (${i + 1}/${AJANS_SERISI.length})` : `Seri · Türkiye'nin en iyi ajansları (${i + 1}/${AJANS_SERISI.length})`}
      </div>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '14px' }}>
        <Link href={yol(onceki.slug)} rel="prev" style={ok}>
          <div style={{ fontSize: '11.5px', color: '#999', marginBottom: '4px' }}>{isEn ? '← Previous list' : '← Önceki liste'}</div>
          <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#111' }}>{ad(onceki)}</div>
        </Link>
        <Link href={yol(sonraki.slug)} rel="next" style={{ ...ok, textAlign: 'right' }}>
          <div style={{ fontSize: '11.5px', color: '#999', marginBottom: '4px' }}>{isEn ? 'Next list →' : 'Sonraki liste →'}</div>
          <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#111' }}>{ad(sonraki)}</div>
        </Link>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 8px' }}>
        {AJANS_SERISI.map((x, j) => j === i ? (
          <span key={x.slug} aria-current="page" style={{ fontSize: '12.5px', padding: '5px 10px', borderRadius: '999px', background: 'var(--orange)', color: '#fff', fontWeight: 700 }}>{ad(x)}</span>
        ) : (
          <Link key={x.slug} href={yol(x.slug)} style={{ fontSize: '12.5px', padding: '5px 10px', borderRadius: '999px', background: '#f5f2ee', color: '#555', textDecoration: 'none' }}>{ad(x)}</Link>
        ))}
      </div>
    </nav>
  )
}
