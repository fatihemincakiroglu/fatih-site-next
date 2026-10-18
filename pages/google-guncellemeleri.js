import Head from 'next/head'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { renderInline } from '../components/IcerikBlok'
import IlgiliRehberler from '../components/IlgiliRehberler'

// Google güncellemeleri günlüğü — TR: /google-guncellemeleri, EN: /en/google-updates
// Veri: lib/google-guncellemeleri.json (her kayıtta resmi kaynak URL'si).
// Yeni güncelleme: JSON'daki "kayitlar" dizisinin başına ekleyin, "son_kontrol" tarihini güncelleyin.

const BASE = 'https://fatihemincakiroglu.com'

const TURLER = {
  core: { tr: 'Çekirdek', en: 'Core', renk: '#e8560a', bg: '#fff7ed' },
  spam: { tr: 'Spam', en: 'Spam', renk: '#dc2626', bg: '#fef2f2' },
  icerik: { tr: 'İçerik', en: 'Content', renk: '#0ea5e9', bg: '#f0f9ff' },
  politika: { tr: 'Politika', en: 'Policy', renk: '#7c3aed', bg: '#f5f3ff' },
  'yapay-zeka': { tr: 'Yapay zekâ', en: 'AI search', renk: '#4f46e5', bg: '#eef2ff' },
  olcum: { tr: 'Ölçüm / araç', en: 'Metrics / tools', renk: '#15803d', bg: '#f0fdf4' },
}

const tarihMetni = (iso, isEn) => (iso
  ? new Intl.DateTimeFormat(isEn ? 'en-GB' : 'tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${iso}T12:00:00Z`))
  : '')

export default function GoogleGuncellemeleri({ isEn = false, veri }) {
  const [filtre, setFiltre] = useState('hepsi')
  const canonical = `${BASE}${isEn ? '/en/google-updates' : '/google-guncellemeleri'}`
  const kayitlar = veri.kayitlar
  const gorunen = useMemo(() => (filtre === 'hepsi' ? kayitlar : kayitlar.filter(k => k.tur === filtre)), [filtre, kayitlar])
  const yillar = useMemo(() => {
    const m = new Map()
    for (const k of gorunen) {
      const y = (k.baslangic || '').slice(0, 4)
      if (!m.has(y)) m.set(y, [])
      m.get(y).push(k)
    }
    return [...m.entries()]
  }, [gorunen])
  const mevcutTurler = Object.keys(TURLER).filter(tur => kayitlar.some(k => k.tur === tur))
  const duz = (t) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '')

  const t = isEn ? {
    title: 'Google Algorithm Updates Log (2023–2026) | Fatih Emin Çakıroğlu',
    desc: 'Every confirmed Google core, spam and policy update and AI search milestone since 2023, with dates, official sources and what site owners should do.',
    h1: 'Google Updates Log',
    son: 'Last checked',
    hepsi: 'All', kaynak: 'Official source ↗', ne: 'What to do', devam: 'ongoing / end not announced',
  } : {
    title: 'Google Algoritma Güncellemeleri Günlüğü (2023–2026) | Fatih Emin Çakıroğlu',
    desc: "2023'ten bu yana Google'ın çekirdek, spam ve politika güncellemeleri ile yapay zekâ arama gelişmeleri: tarihler, resmi kaynaklar ve yapılması gerekenler.",
    h1: 'Google Güncellemeleri Günlüğü',
    son: 'Son kontrol',
    hepsi: 'Tümü', kaynak: 'Resmi kaynak ↗', ne: 'Ne yapmalı?', devam: 'devam ediyor / bitiş duyurulmadı',
  }
  const metaBaslik = t.title.length <= 70 ? t.title : t.title.replace(' | Fatih Emin Çakıroğlu', '')

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article', '@id': `${canonical}#article`, headline: t.h1, description: t.desc, url: canonical,
        mainEntityOfPage: canonical, inLanguage: isEn ? 'en' : 'tr-TR', dateModified: veri.son_kontrol,
        author: { '@id': `${BASE}/#person` }, publisher: { '@id': `${BASE}/#person` },
        image: `${BASE}/og-image.jpg`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Ana Sayfa', item: isEn ? `${BASE}/en` : BASE },
          { '@type': 'ListItem', position: 2, name: t.h1, item: canonical },
        ],
      },
      ...(veri.sss?.length ? [{
        '@type': 'FAQPage', '@id': `${canonical}#faq`,
        mainEntity: veri.sss.map(f => ({ '@type': 'Question', name: f.s, acceptedAnswer: { '@type': 'Answer', text: duz(f.c) } })),
      }] : []),
    ],
  }

  return (
    <>
      <Head>
        <title>{metaBaslik}</title>
        <meta name="description" content={t.desc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" key="og-type" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        <header style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '44px 16px 32px' }}>
          <div style={{ maxWidth: '920px', margin: '0 auto' }}>
            <nav aria-label="breadcrumb" style={{ fontSize: '13px', marginBottom: '14px' }}>
              <Link href={isEn ? '/en' : '/'} style={{ color: '#aaa' }}>{isEn ? 'Home' : 'Ana Sayfa'}</Link>
              <span style={{ color: '#ccc', margin: '0 6px' }}>›</span>
              <span style={{ color: '#555' }} aria-current="page">{t.h1}</span>
            </nav>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 800, color: '#111', lineHeight: 1.15, marginBottom: '10px' }}>{t.h1}</h1>
            <div style={{ fontSize: '13px', color: '#999', marginBottom: '16px' }}>{t.son}: <time dateTime={veri.son_kontrol}>{tarihMetni(veri.son_kontrol, isEn)}</time></div>
            {veri.giris.map((p, i) => <p key={i} style={{ color: '#555', fontSize: '15.5px', lineHeight: 1.8, margin: '0 0 12px', maxWidth: '780px' }}>{renderInline(p)}</p>)}
          </div>
        </header>

        <main style={{ maxWidth: '920px', margin: '0 auto', padding: '24px 16px 32px' }}>
          <div role="group" aria-label={isEn ? 'Filter by type' : 'Türe göre filtrele'} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {['hepsi', ...mevcutTurler].map(tur => {
              const aktif = filtre === tur
              const etiket = tur === 'hepsi' ? t.hepsi : (isEn ? TURLER[tur].en : TURLER[tur].tr)
              return (
                <button key={tur} type="button" aria-pressed={aktif} onClick={() => setFiltre(tur)}
                  style={{ padding: '7px 14px', borderRadius: '20px', border: aktif ? '1px solid var(--orange)' : '1px solid #e5e5e5', background: aktif ? 'var(--orange)' : '#fff', color: aktif ? '#fff' : '#444', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                  {etiket}
                </button>
              )
            })}
          </div>

          {yillar.map(([yil, liste]) => (
            <section key={yil} aria-labelledby={`yil-${yil}`} style={{ marginBottom: '28px' }}>
              <h2 id={`yil-${yil}`} style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#111', margin: '0 0 12px' }}>{yil}</h2>
              <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '12px' }}>
                {liste.map(k => {
                  const tur = TURLER[k.tur] || TURLER.core
                  return (
                    <li key={k.id} id={k.id} style={{ background: '#fff', border: '1px solid #eee', borderLeft: `4px solid ${tur.renk}`, borderRadius: '12px', padding: '18px 20px' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: tur.renk, background: tur.bg, padding: '3px 8px', borderRadius: '4px' }}>{isEn ? tur.en : tur.tr}</span>
                        <span style={{ fontSize: '13px', color: '#888' }}>
                          <time dateTime={k.baslangic}>{tarihMetni(k.baslangic, isEn)}</time>
                          {k.bitis ? <> – <time dateTime={k.bitis}>{tarihMetni(k.bitis, isEn)}</time></> : (k.tur === 'core' || k.tur === 'spam' ? ` (${t.devam})` : '')}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111', margin: '0 0 8px', lineHeight: 1.35 }}>{k.ad}</h3>
                      <p style={{ color: '#555', fontSize: '14.5px', lineHeight: 1.75, margin: '0 0 8px' }}>{renderInline(k.ozet)}</p>
                      {k.ne_yapmali && (
                        <p style={{ color: '#333', fontSize: '14px', lineHeight: 1.7, margin: '0 0 8px', background: '#faf9f7', padding: '8px 12px', borderRadius: '8px' }}>
                          <strong>{t.ne}</strong> {renderInline(k.ne_yapmali)}
                        </p>
                      )}
                      {k.kaynak && <a href={k.kaynak} target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: 'var(--orange)', fontWeight: 600 }}>{t.kaynak}</a>}
                    </li>
                  )
                })}
              </ol>
            </section>
          ))}

          {veri.sss?.length > 0 && (
            <section style={{ background: '#fff', border: '1px solid #eee', borderRadius: '16px', padding: 'clamp(20px, 4vw, 32px)', marginTop: '12px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(19px, 3vw, 24px)', fontWeight: 800, color: '#111', margin: '0 0 10px' }}>{isEn ? 'Frequently Asked Questions' : 'Sıkça Sorulan Sorular'}</h2>
              {veri.sss.map((f, i) => (
                <div key={i} style={{ borderTop: i ? '1px solid #f0ece6' : 'none', padding: '14px 0' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginBottom: '6px' }}>{f.s}</h3>
                  <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.8, margin: 0 }}>{renderInline(f.c)}</p>
                </div>
              ))}
            </section>
          )}
        </main>
        <IlgiliRehberler sluglar={['seo-raporlama', 'icerik-stratejisi', 'teknik-seo']} isEn={isEn} stil={{ maxWidth: '920px', padding: '8px 16px 80px' }} />
      </div>
    </>
  )
}

export async function getStaticProps() {
  const { guncellemeVerisi } = await import('../lib/google-guncellemeleri')
  return { props: { isEn: false, veri: guncellemeVerisi('tr') } }
}
