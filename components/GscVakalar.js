import { useState } from 'react'
import Link from 'next/link'
import { GSC_PROJELER, kisaSayi, artisMetni } from '../lib/gsc-vakalar'
import { SEKTOR_LISTE } from '../lib/sektor-liste'

const sektorAdi = (slug, isEn) => {
  const s = SEKTOR_LISTE.find(x => x.slug === slug)
  return s ? (isEn ? s.en.ad : s.tr.ad) : null
}
const donemMetni = (ay, isEn) => (isEn ? `last ${ay} months` : `son ${ay} ay`)

function Metrik({ etiket, deger, isEn, kismi }) {
  return (
    <div style={{ background: '#faf9f7', border: '1px solid #f0ece6', borderRadius: '10px', padding: '10px 12px', minWidth: 0 }}>
      <div style={{ fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: '4px' }}>{etiket}</div>
      <div style={{ fontSize: '15px', color: '#111', fontWeight: 700, lineHeight: 1.35 }}>
        {kisaSayi(deger[0], isEn)} <span style={{ color: '#bbb' }}>→</span> {kisaSayi(deger[1], isEn)}
      </div>
      {!kismi && <div style={{ fontSize: '13px', fontWeight: 800, color: '#15803d', marginTop: '2px' }}>{artisMetni(deger, isEn)}</div>}
    </div>
  )
}

export function GscVakaKart({ proje, isEn, sektorGoster = true }) {
  const [secili, setSecili] = useState(0)
  const no = GSC_PROJELER.indexOf(proje) + 1
  const g = proje.gorunumler[secili]
  const sektor = sektorAdi(proje.sektor, isEn)
  const yapilan = (isEn ? proje.ne_yapildi_en : proje.ne_yapildi_tr) || []
  const alt = isEn
    ? `Google Search Console performance chart, project ${no}, ${donemMetni(g.donem, true)}: clicks ${kisaSayi(g.tik[0], true)} to ${kisaSayi(g.tik[1], true)}, impressions ${kisaSayi(g.gos[0], true)} to ${kisaSayi(g.gos[1], true)}`
    : `Google Search Console performans grafiği, proje ${no}, ${donemMetni(g.donem, false)}: tıklama ${kisaSayi(g.tik[0], false)} → ${kisaSayi(g.tik[1], false)}, gösterim ${kisaSayi(g.gos[0], false)} → ${kisaSayi(g.gos[1], false)}`

  return (
    <article style={{ background: '#fff', border: '1px solid #eee', borderRadius: '16px', padding: 'clamp(16px, 3vw, 24px)', minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111', margin: 0 }}>
          {isEn ? `Project ${no}` : `Proje ${no}`}
          {sektorGoster && sektor && <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--orange)', background: '#fff7ed', padding: '3px 8px', borderRadius: '4px', marginLeft: '8px', verticalAlign: 'middle' }}>{sektor}</span>}
        </h3>
        {proje.gorunumler.length > 1 && (
          <div role="group" aria-label={isEn ? 'Date range' : 'Tarih aralığı'} style={{ display: 'flex', gap: '6px' }}>
            {proje.gorunumler.map((x, i) => (
              <button key={i} type="button" aria-pressed={secili === i} onClick={() => setSecili(i)}
                style={{ padding: '5px 12px', borderRadius: '16px', border: secili === i ? '1px solid var(--orange)' : '1px solid #e5e5e5', background: secili === i ? 'var(--orange)' : '#fff', color: secili === i ? '#fff' : '#444', fontWeight: 600, fontSize: '12.5px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                {isEn ? `${x.donem} months` : `${x.donem} ay`}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px', marginBottom: '12px' }}>
        <Metrik etiket={isEn ? 'Clicks' : 'Tıklama'} deger={g.tik} isEn={isEn} kismi={g.kismi} />
        <Metrik etiket={isEn ? 'Impressions' : 'Gösterim'} deger={g.gos} isEn={isEn} kismi={g.kismi} />
      </div>

      <a href={g.gorsel} target="_blank" rel="noopener" style={{ display: 'block', border: '1px solid #eee', borderRadius: '10px', overflow: 'hidden' }}
        aria-label={isEn ? 'Open full-size screenshot' : 'Ekran görüntüsünü tam boyutta aç'}>
        {/* Görseller zaten WebP ve küçük; next/image optimizasyon kotası harcamamak için düz img. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={g.gorsel} alt={alt} width={g.w} height={g.h} loading="lazy" decoding="async" style={{ display: 'block', width: '100%', height: 'auto' }} />
      </a>

      <p style={{ fontSize: '12.5px', color: '#888', lineHeight: 1.6, margin: '8px 0 0' }}>
        {isEn
          ? `Google Search Console, ${donemMetni(g.donem, true)} vs. previous ${g.donem} months.`
          : `Google Search Console, ${donemMetni(g.donem, false)} ile önceki ${g.donem} ay karşılaştırması.`}
        {g.kismi && (isEn
          ? ' The site had no data for part of the previous period, so no growth multiple is shown.'
          : ' Önceki dönemin bir kısmında site henüz veri toplamıyordu; bu yüzden artış katı gösterilmiyor.')}
      </p>

      {yapilan.length > 0 && (
        <ul style={{ margin: '12px 0 0', paddingLeft: '18px', color: '#555', fontSize: '14px', lineHeight: 1.7 }}>
          {yapilan.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      )}
    </article>
  )
}

export function GscNotu({ isEn }) {
  return (
    <p style={{ fontSize: '13.5px', color: '#666', lineHeight: 1.7, margin: 0 }}>
      {isEn
        ? 'Why do average CTR and position sometimes look worse? When impressions grow sharply, the site starts appearing for many new, lower-ranked queries. Those new impressions pull the averages down even while clicks rise. Clicks and impressions are the metrics that show growth.'
        : 'Ortalama TO ve konum neden bazen kötüleşmiş görünüyor? Gösterimler hızla artınca site, henüz alt sıralarda olduğu çok sayıda yeni sorguda da görünmeye başlar. Bu yeni gösterimler, tıklamalar artarken bile ortalamaları aşağı çeker. Büyümeyi asıl gösteren ölçüler tıklama ve gösterimdir.'}
    </p>
  )
}

// /vakalar için tüm projeler
export default function GscVakalar({ isEn }) {
  return (
    <section id="search-console" aria-labelledby="gsc-baslik" style={{ padding: '56px 16px 24px' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
          GOOGLE SEARCH CONSOLE
        </span>
        <h2 id="gsc-baslik" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3.6vw, 34px)', fontWeight: 800, color: '#111', lineHeight: 1.2, margin: '0 0 10px' }}>
          {isEn ? 'Real Results from Search Console' : "Search Console'dan Gerçek Sonuçlar"}
        </h2>
        <p style={{ color: '#555', fontSize: '15.5px', lineHeight: 1.75, maxWidth: '760px', margin: '0 0 12px' }}>
          {isEn
            ? 'Unedited Google Search Console screenshots from projects I work on. Client names are withheld for confidentiality; each card compares a period with the one before it.'
            : 'Çalıştığım projelerin düzenlenmemiş Google Search Console ekran görüntüleri. Gizlilik gereği müşteri adları paylaşılmıyor; her kart bir dönemi kendinden önceki dönemle karşılaştırıyor.'}
        </p>
        <div style={{ maxWidth: '760px', marginBottom: '24px' }}><GscNotu isEn={isEn} /></div>
        <div className="gsc-izgara" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px' }}>
          {GSC_PROJELER.map(p => <GscVakaKart key={p.id} proje={p} isEn={isEn} />)}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: '@media (max-width: 860px){.gsc-izgara{grid-template-columns:minmax(0,1fr)!important}}' }} />
    </section>
  )
}

// Sektör sayfaları için: yalnızca o sektöre atanmış projeler (yoksa hiçbir şey göstermez)
export function SektorGscVakalari({ projeler, isEn, sektorAd }) {
  if (!projeler?.length) return null
  return (
    <section aria-labelledby="sektor-gsc" style={{ maxWidth: '920px', margin: '0 auto', padding: '8px 16px 8px' }}>
      <h2 id="sektor-gsc" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, color: '#111', margin: '0 0 8px' }}>
        {isEn ? `Real results: ${sektorAd}` : `Gerçek sonuçlar: ${sektorAd}`}
      </h2>
      <p style={{ color: '#666', fontSize: '14.5px', lineHeight: 1.7, margin: '0 0 14px' }}>
        {isEn ? 'Google Search Console data from a project in this industry.' : 'Bu sektörden bir projenin Google Search Console verileri.'}
      </p>
      <div style={{ display: 'grid', gap: '16px' }}>
        {projeler.map(p => <GscVakaKart key={p.id} proje={p} isEn={isEn} sektorGoster={false} />)}
      </div>
      <p style={{ margin: '12px 0 0', fontSize: '14px' }}>
        <Link href={isEn ? '/en/case-studies#search-console' : '/vakalar#search-console'} style={{ color: 'var(--orange)', fontWeight: 700 }}>
          {isEn ? 'See all case studies →' : 'Tüm vaka çalışmaları →'}
        </Link>
      </p>
    </section>
  )
}
