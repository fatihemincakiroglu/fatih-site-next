import Image from 'next/image'
import Link from 'next/link'

// "geo uzmanı" aramasındaki gerçek Google görünürlüğünün kanıtı.
// Anasayfa, hakkımda ve /geo-uzmani sayfalarında kullanılır.
// Ekran görüntüleri: public/images/kanit/ (rakip sonuçlar bulanıklaştırıldı).
// Sıralama değişirse yalnızca bu dosyayı ve görselleri güncellemek yeterli.
export const KANIT = {
  sorgu: 'geo uzmanı',
  sira: 3,
  tarih_tr: 'Kasım 2026',
  tarih_en: 'November 2026',
}

export default function SiralamaKaniti({ isEn = false, id = 'kanit', arkaPlan = 'var(--bg2)', cta = true }) {
  const t = isEn ? {
    etiket: 'PROOF, NOT PROMISES',
    h2a: `#${KANIT.sira} on Google for “${KANIT.sorgu}”,`,
    h2b: 'in both search results and the AI Overview.',
    p: 'Before I promise it to you, I do it on my own site. When someone in Turkey searches “geo uzmanı” (GEO expert), my page ranks in the organic results and Google’s AI Overview cites it as a source.',
    k1: `Organic result · #${KANIT.sira}`,
    k2: 'AI Overview · cited source',
    alt1: `Google results for “${KANIT.sorgu}”: fatihemincakiroglu.com in position ${KANIT.sira}`,
    alt2: `Google AI Overview for “${KANIT.sorgu}” citing fatihemincakiroglu.com`,
    not: `Screenshots from ${KANIT.tarih_en}. Competitor results are blurred. Rankings may vary by location and time.`,
    cta: 'Let’s do the same for your brand →',
    ctaHref: '/en/geo-consulting',
  } : {
    etiket: 'VAAT DEĞİL, KANIT',
    h2a: `“${KANIT.sorgu}” aramasında Google’da ${KANIT.sira}. sıradayım,`,
    h2b: 'hem arama sonuçlarında hem AI Bakışı’nda.',
    p: 'Size önereceğim yöntemi önce kendi sitemde uyguluyorum. Google’da “geo uzmanı” arandığında sayfam organik sonuçlarda üst sıralarda çıkıyor ve Google’ın yapay zekâ yanıtı (AI Bakışı) beni kaynak olarak gösteriyor.',
    k1: `Organik sonuç · ${KANIT.sira}. sıra`,
    k2: 'AI Bakışı · kaynak gösterildi',
    alt1: `Google’da “${KANIT.sorgu}” arama sonuçları: fatihemincakiroglu.com ${KANIT.sira}. sırada`,
    alt2: `Google AI Bakışı’nda “${KANIT.sorgu}” yanıtında kaynak olarak fatihemincakiroglu.com`,
    not: `Ekran görüntüleri ${KANIT.tarih_tr} tarihlidir. Rakip sonuçlar gizlenmiştir. Sıralama konuma ve zamana göre değişebilir.`,
    cta: 'Aynısını markanız için yapalım →',
    ctaHref: '/geo-uzmani',
  }

  const kart = { background: '#fff', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column' }
  const kartBaslik = { display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', borderBottom: '1px solid #eee', fontSize: '12px', fontWeight: 700, color: '#111', background: '#faf9f7' }
  const nokta = { width: '8px', height: '8px', borderRadius: '50%', background: 'var(--orange)', flexShrink: 0 }

  return (
    <section id={id} style={{ padding: '72px 24px', background: arkaPlan, borderTop: '1px solid var(--border)', scrollMarginTop: 'var(--nav-h)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div style={{ maxWidth: '760px', marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '24px', height: '2px', background: 'var(--orange)' }} />
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px' }}>{t.etiket}</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3.2vw, 40px)', fontWeight: 800, color: 'var(--text)', lineHeight: 1.2, marginBottom: '16px' }}>
            {t.h2a}{' '}<span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>{t.h2b}</span>
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text2)', lineHeight: 1.8 }}>{t.p}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.65fr 1fr', gap: '20px', alignItems: 'start' }}>
          <figure style={{ ...kart, margin: 0 }}>
            <div style={kartBaslik}><span style={nokta} />{t.k1}</div>
            <a href="/images/kanit/geo-uzmani-google-3-sira.webp" target="_blank" rel="noopener" aria-label={t.alt1}>
              <Image src="/images/kanit/geo-uzmani-google-3-sira.webp" alt={t.alt1} width={1680} height={1052}
                sizes="(max-width: 768px) 100vw, 700px" style={{ width: '100%', height: 'auto' }} />
            </a>
          </figure>
          <figure style={{ ...kart, margin: 0 }}>
            <div style={kartBaslik}><span style={nokta} />{t.k2}</div>
            <a href="/images/kanit/geo-uzmani-ai-bakisi-kaynak.webp" target="_blank" rel="noopener" aria-label={t.alt2}>
              <Image src="/images/kanit/geo-uzmani-ai-bakisi-kaynak.webp" alt={t.alt2} width={700} height={892}
                sizes="(max-width: 768px) 100vw, 420px" style={{ width: '100%', height: 'auto' }} />
            </a>
          </figure>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '24px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text3)', lineHeight: 1.6, maxWidth: '560px' }}>{t.not}</p>
          {cta && (
            <Link href={t.ctaHref} style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 24px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-body)' }}>
              {t.cta}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
