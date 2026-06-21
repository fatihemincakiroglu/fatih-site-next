import Head from 'next/head'
import Link from 'next/link'

const HIZMETLER = [
  { url: '/seo', ikon: '🔍', baslik: 'SEO Danışmanlığı', aciklama: 'Teknik + strateji + içerik — uçtan uca organik büyüme.' },
  { url: '/icerik', ikon: '✍️', baslik: 'İçerik Stratejisi', aciklama: 'Arama niyetine oturan, dönüşüm getiren içerik üretimi.' },
  { url: '/geo', ikon: '🤖', baslik: 'GEO Danışmanlığı', aciklama: 'ChatGPT, Perplexity ve AI Overview\'da görünür olun.' },
  { url: '/backlink', ikon: '🔗', baslik: 'Backlink & Dijital PR', aciklama: 'Editoryal link, yayın ilişkileri, marka sinyali.' },
  { url: '/performans', ikon: '📈', baslik: 'Performans & Growth', aciklama: 'Ölçümlenebilir trafik ve gelir artışı.' },
  { url: '/vakalar', ikon: '📊', baslik: 'Vaka Çalışmaları', aciklama: 'Gerçek sonuçlar, ölçülebilir başarı hikayeleri.' },
]

const ISTATISTIKLER = [
  { n: '150+', l: 'Mutlu Müşteri' },
  { n: '8 Yıl', l: 'Deneyim' },
  { n: '+300%', l: 'Ort. Büyüme' },
  { n: '%98', l: 'Memnuniyet' },
]

const REFERANSLAR = [
  { isim: 'Mehmet A.', unvan: 'E-Ticaret Direktörü', sirket: 'Tekstil Markası', yorum: 'Fatih ile çalışmaya başladıktan 4 ay sonra organik trafiğimiz %280 arttı. Her adımı şeffaf şekilde takip edebildik.' },
  { isim: 'Zeynep K.', unvan: 'Büro Ortağı', sirket: 'Hukuk Bürosu', yorum: 'Dijital varlığımızı sıfırdan inşa etti. Yerel SEO çalışması sayesinde müvekkil sayımız 3 katına çıktı.' },
  { isim: 'Can S.', unvan: 'Kurucu & CEO', sirket: 'SaaS Platformu', yorum: 'Teknik SEO denetimi gerçekten göz açıcıydı. 6 ayda organik trafiği sıfırdan ciddi rakamlara taşıdı.' },
]

const ARACLAR = ['SEMrush', 'Ahrefs', 'ChatGPT', 'Perplexity', 'Claude', 'Google', 'Search Console', 'Screaming Frog']

export default function Page() {
  return (
    <>
      <Head>
        <title>Fatih Emin Çakıroğlu | SEO ve Dijital Pazarlama Uzmanı</title>
        <meta name="description" content="8+ yıllık deneyimle 150+ işletmenin organik büyümesini hızlandırdım. Teknik SEO, GEO ve dijital pazarlama danışmanlığı." />
        <link rel="canonical" href="https://fatihemincakiroglu.com" />
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)' }}>

        {/* ── HERO ── */}
        <section className="hero-section" style={{ background: '#faf9f7', padding: '80px 32px 64px', borderBottom: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
              {/* Sol */}
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '20px', border: '1px solid #e0dbd0', background: '#fff', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#888', textTransform: 'uppercase', marginBottom: '28px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--orange)', display: 'inline-block' }}></span>
                  SEO UZMANI · GEO · DİJİTAL PAZARLAMA
                </div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 4vw, 58px)', fontWeight: 800, lineHeight: 1.1, color: '#111', marginBottom: '24px' }}>
                  SEO ve GEO ile<br />
                  Arama Görünürlüğünüzü<br />
                  <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>Baştan Tasarlayın</span>
                </h1>
                <p style={{ fontSize: '17px', color: '#666', lineHeight: 1.75, marginBottom: '36px', maxWidth: '460px' }}>
                  8 yıllık deneyimle 150+ işletmenin Google ve yapay zekâ aramalarındaki görünürlüğünü artırdım. Veriye dayalı strateji, ölçülebilir büyüme.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Link href="/iletisim" style={{ padding: '14px 28px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '15px', fontFamily: 'var(--font-body)', display: 'inline-block' }}>
                    Ücretsiz Teklif Al →
                  </Link>
                  <Link href="/vakalar" style={{ padding: '14px 28px', background: '#fff', color: '#333', border: '1px solid #ddd', borderRadius: '8px', fontWeight: 600, fontSize: '15px', fontFamily: 'var(--font-body)', display: 'inline-block' }}>
                    Vaka Çalışmaları
                  </Link>
                </div>
                <p style={{ marginTop: '20px', fontSize: '13px', color: '#aaa' }}>
                  ✓ İlk görüşme tamamen ücretsiz
                </p>
              </div>

              {/* Sağ — istatistik kartları */}
              <div className="hero-right">
                <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #ede8e0', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '12px', color: '#aaa', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px' }}>SONUÇLAR</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                    {ISTATISTIKLER.map((s, i) => (
                      <div key={i} style={{ background: '#faf9f7', borderRadius: '12px', padding: '20px', border: '1px solid #ede8e0' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: 'var(--orange)' }}>{s.n}</div>
                        <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: '#faf9f7', borderRadius: '12px', padding: '16px', border: '1px solid #ede8e0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '18px', flexShrink: 0 }}>F</div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#111' }}>Fatih Emin Çakıroğlu</div>
                      <div style={{ fontSize: '12px', color: '#aaa' }}>SEO & Dijital Pazarlama Uzmanı · İstanbul</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HİZMETLER ── */}
        <section style={{ padding: '80px 32px', background: '#fff' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ width: '28px', height: '2px', background: 'var(--orange)' }}></div>
                  <span style={{ fontSize: '11px', color: '#aaa', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>HİZMETLER</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, color: '#111' }}>
                  SEO, GEO ve organik büyüme<br />
                  <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>danışmanlık hizmetleri</span>
                </h2>
              </div>
              <Link href="/hizmetler" style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #ddd', color: '#555', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
                Tüm Hizmetler →
              </Link>
            </div>

            <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {HIZMETLER.map((h, i) => (
                <Link key={i} href={h.url} style={{ background: '#faf9f7', borderRadius: '16px', padding: '28px', border: '1px solid #ede8e0', display: 'block', transition: 'box-shadow 0.2s, transform 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}
                >
                  <div style={{ fontSize: '28px', marginBottom: '16px' }}>{h.ikon}</div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#111', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>{h.baslik}</h3>
                  <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.6, marginBottom: '20px' }}>{h.aciklama}</p>
                  <span style={{ color: 'var(--orange)', fontWeight: 600, fontSize: '13px' }}>İncele →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── REFERANSLAR ── */}
        <section style={{ padding: '80px 32px', background: '#faf9f7', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ width: '28px', height: '2px', background: 'var(--orange)' }}></div>
                  <span style={{ fontSize: '11px', color: '#aaa', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>MÜŞTERİ YORUMLARI</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, color: '#111' }}>
                  Müşterilerin <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>deneyimleri.</span>
                </h2>
              </div>
              <Link href="/referanslar" style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #ddd', color: '#555', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
                Tüm Referanslar →
              </Link>
            </div>

            <div className="ref-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {REFERANSLAR.map((r, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #ede8e0' }}>
                  <div style={{ fontSize: '36px', color: 'var(--orange)', fontFamily: 'var(--font-display)', lineHeight: 1, marginBottom: '16px' }}>"</div>
                  <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.75, marginBottom: '24px' }}>{r.yorum}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '15px', flexShrink: 0 }}>{r.isim[0]}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#111' }}>{r.isim}</div>
                      <div style={{ fontSize: '12px', color: '#aaa' }}>{r.unvan} · {r.sirket}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ARAÇLAR ── */}
        <section style={{ padding: '48px 32px', background: '#111', borderTop: '1px solid #222' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{ fontSize: '11px', color: '#555', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '4px' }}>ÇALIŞMA ARAÇLARI</div>
                <div style={{ fontSize: '16px', color: '#fff', fontWeight: 700 }}>Veri ve <span style={{ color: 'var(--orange)' }}>AI araçları</span></div>
              </div>
              <div style={{ flex: 1, display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {ARACLAR.map((a, i) => (
                  <span key={i} style={{ padding: '7px 16px', borderRadius: '6px', background: '#1e1e1e', border: '1px solid #2a2a2a', color: '#bbb', fontSize: '13px', fontWeight: 500 }}>{a}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: '96px 32px', background: '#faf9f7', borderTop: '1px solid #ede8e0', textAlign: 'center' }}>
          <div style={{ maxWidth: '580px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '28px', height: '2px', background: 'var(--orange)' }}></div>
              <span style={{ fontSize: '11px', color: '#aaa', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>ÜCRETSİZ GÖRÜŞME</span>
              <div style={{ width: '28px', height: '2px', background: 'var(--orange)' }}></div>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#111', marginBottom: '16px', lineHeight: 1.2 }}>
              Siteniz için özel<br />
              <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>yol haritası</span> oluşturalım
            </h2>
            <p style={{ color: '#777', fontSize: '16px', lineHeight: 1.7, marginBottom: '36px' }}>
              Hedeflerinizi değerlendirip size özel SEO ve GEO stratejisi hazırlıyorum. İlk görüşme tamamen ücretsiz.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/iletisim" style={{ padding: '15px 32px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block' }}>
                İletişime Geç →
              </Link>
              <Link href="/randevu" style={{ padding: '15px 32px', background: '#fff', color: '#333', border: '1px solid #ddd', borderRadius: '8px', fontWeight: 600, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block' }}>
                Randevu Al
              </Link>
            </div>
          </div>
        </section>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-right { display: none; }
          .services-grid { grid-template-columns: 1fr !important; }
          .ref-grid { grid-template-columns: 1fr !important; }
          .hero-section { padding: 48px 16px 40px !important; }
          section { padding-left: 16px !important; padding-right: 16px !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .ref-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  )
}

export async function getServerSideProps() {
  return { props: {} }
}
