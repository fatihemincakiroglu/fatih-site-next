import Link from 'next/link';
import Head from 'next/head';


const DENEYIM = [
  { yil: '2024 – Günümüz', rol: 'Bağımsız SEO Danışmanı', yer: 'İstanbul', aciklama: 'Kurumsal markalar ve büyüme odaklı girişimler için SEO stratejisi, teknik SEO denetimi ve içerik danışmanlığı.' },
  { yil: '2021 – 2024', rol: 'Senior SEO Uzmanı', yer: 'Dijital Ajans, İstanbul', aciklama: 'E-ticaret, SaaS ve kurumsal sektörde 30+ müşteriye SEO ve dijital pazarlama hizmeti.' },
  { yil: '2018 – 2021', rol: 'SEO Uzmanı', yer: 'Medya Grubu, İstanbul', aciklama: 'Haber siteleri ve içerik platformları için teknik SEO, hız optimizasyonu ve içerik stratejisi.' },
  { yil: '2016 – 2018', rol: 'Dijital Pazarlama Uzmanı', yer: 'E-ticaret Şirketi, İstanbul', aciklama: 'Google Ads, Meta Ads ve SEO entegrasyonu ile organik ve ücretli trafik yönetimi.' },
];

const SERTIFIKALAR = [
  { isim: 'Google Analytics 4 Sertifikası', kurum: 'Google', yil: '2024' },
  { isim: 'Google Ads Arama Sertifikası', kurum: 'Google', yil: '2024' },
  { isim: 'HubSpot Content Marketing', kurum: 'HubSpot', yil: '2023' },
  { isim: 'SEMrush SEO Toolkit', kurum: 'SEMrush', yil: '2023' },
  { isim: 'Ahrefs SEO Training', kurum: 'Ahrefs', yil: '2022' },
];

const MEDYA = [
  { isim: 'Webrazzi', konu: 'Türkiye\'de E-Ticaret SEO Trendleri', yil: '2024', url: '#' },
  { isim: 'Dijital Strateji Podcast', konu: 'GEO ve Yapay Zeka Araması', yil: '2024', url: '#' },
  { isim: 'Search Engine Journal TR', konu: 'Core Web Vitals Optimizasyonu', yil: '2023', url: '#' },
  { isim: 'Marketing Türkiye', konu: 'İçerik Stratejisi ve SEO Entegrasyonu', yil: '2023', url: '#' },
];

const DEGERLER = [
  { ikon: '🔍', baslik: 'Veri Odaklı', aciklama: 'Her karar, gerçek veriye dayalıdır. Sezgisel tahminlerle değil, ölçülebilir kanıtlarla hareket ederim.' },
  { ikon: '🔄', baslik: 'Şeffaf Süreç', aciklama: 'Neler yaptığımı, neden yaptığımı ve hangi sonuçları beklediğimizi her adımda net biçimde paylaşırım.' },
  { ikon: '📈', baslik: 'Uzun Vadeli Büyüme', aciklama: 'Hızlı ama kalıcı olmayan sonuçlar yerine sürdürülebilir organik büyümeyi hedeflerim.' },
  { ikon: '🤝', baslik: 'Ortaklık Anlayışı', aciklama: 'Müşterilerimi müşteri olarak değil, uzun vadeli iş ortağı olarak görürüm.' },
];

export default function Page() {
  return (
    <>
      <Head>
        <title>Hakkımda | Fatih Emin Çakıroğlu — SEO & Dijital Pazarlama Uzmanı</title>
        <meta name="description" content="8+ yıllık deneyimli SEO uzmanı Fatih Emin Çakıroğlu hakkında. Uzmanlık alanları, deneyim ve başarı hikayeleri." />
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>

        {/* Hero */}
        <div style={{ background: '#1a1612', padding: '80px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '80px', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>HAKKIMDA</span>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: '20px' }}>
                Fatih Emin<br /><span style={{ color: 'var(--orange)' }}>Çakıroğlu</span>
              </h1>
              <p style={{ color: '#9a9a9a', fontSize: '16px', lineHeight: 1.8, marginBottom: '28px', maxWidth: '500px' }}>
                8 yılı aşkın süredir e-ticaret, SaaS ve kurumsal markaların organik büyümesini hızlandırıyorum. Teknik SEO, içerik stratejisi ve yapay zeka araması konularında uzmanlaşmış bir danışman olarak her müşterime veriye dayalı, özelleştirilmiş bir yaklaşım sunuyorum.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
                {['SEO', 'GEO', 'E-Ticaret', 'Teknik SEO', 'İçerik', 'Google Ads', 'Analytics'].map(t => (
                  <span key={t} style={{ padding: '6px 14px', borderRadius: '20px', border: '1px solid #2a2520', fontSize: '13px', color: '#6b6b6b' }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Link href="/randevu">
                  <button style={{ padding: '13px 28px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                    Birlikte Çalışalım →
                  </button>
                </Link>
                <a href="https://www.linkedin.com/in/fatihemincakiroglu/" target="_blank" rel="noreferrer">
                  <button style={{ padding: '13px 28px', borderRadius: '8px', background: 'transparent', color: '#fff', border: '1px solid #2a2520', fontWeight: 600, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                    LinkedIn →
                  </button>
                </a>
              </div>
            </div>

            {/* Profil kartı */}
            <div style={{ background: '#231f1a', borderRadius: '20px', padding: '32px', border: '1px solid #2a2520' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--orange), #ff9a5c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', fontWeight: 800, color: '#fff', margin: '0 auto 20px', fontFamily: 'var(--font-display)' }}>F</div>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>Fatih Emin Çakıroğlu</div>
                <div style={{ fontSize: '13px', color: '#6b6b6b', marginTop: '4px' }}>SEO & Dijital Pazarlama Uzmanı</div>
                <div style={{ fontSize: '13px', color: '#4a4540', marginTop: '4px' }}>📍 İstanbul, Türkiye</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { n: '8+', l: 'Yıl Deneyim' },
                  { n: '150+', l: 'Proje' },
                  { n: '+300%', l: 'Ort. Büyüme' },
                  { n: '%98', l: 'Memnuniyet' },
                ].map((s, i) => (
                  <div key={i} style={{ background: '#1a1612', borderRadius: '10px', padding: '14px', textAlign: 'center', border: '1px solid #2a2520' }}>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--orange)', fontFamily: 'var(--font-display)' }}>{s.n}</div>
                    <div style={{ fontSize: '11px', color: '#4a4540', marginTop: '2px' }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '16px', padding: '12px', background: '#1a1612', borderRadius: '8px', border: '1px solid #2a2520' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6b6b6b' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                  Yeni proje kabul ediyor
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '64px 32px 96px' }}>

          {/* Değerler */}
          <div style={{ marginBottom: '64px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, color: '#111', marginBottom: '32px' }}>Çalışma Felsefem</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {DEGERLER.map((d, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #eee' }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>{d.ikon}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>{d.baslik}</h3>
                  <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.6 }}>{d.aciklama}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deneyim */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '64px' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: '#111', marginBottom: '28px' }}>Deneyim</h2>
              {DENEYIM.map((d, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '24px', paddingBottom: '24px', borderBottom: i < DENEYIM.length - 1 ? '1px solid #eee' : 'none' }}>
                  <div style={{ width: '3px', background: i === 0 ? 'var(--orange)' : '#eee', borderRadius: '2px', flexShrink: 0 }}></div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--orange)', fontWeight: 700, marginBottom: '4px' }}>{d.yil}</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#111', marginBottom: '2px' }}>{d.rol}</div>
                    <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '6px' }}>{d.yer}</div>
                    <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>{d.aciklama}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              {/* Sertifikalar */}
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: '#111', marginBottom: '28px' }}>Sertifikalar</h2>
              {SERTIFIKALAR.map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: '#fff', borderRadius: '8px', border: '1px solid #eee', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#111' }}>{s.isim}</div>
                    <div style={{ fontSize: '12px', color: '#aaa' }}>{s.kurum}</div>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--orange)', fontWeight: 700 }}>{s.yil}</span>
                </div>
              ))}

              {/* Medya */}
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: '#111', margin: '32px 0 20px' }}>Basında</h2>
              {MEDYA.map((m, i) => (
                <a key={i} href={m.url} target="_blank" rel="noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: '#fff', borderRadius: '8px', border: '1px solid #eee', marginBottom: '8px', textDecoration: 'none', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--orange)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#eee'}
                >
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#111' }}>{m.konu}</div>
                    <div style={{ fontSize: '12px', color: '#aaa' }}>{m.isim}</div>
                  </div>
                  <span style={{ fontSize: '12px', color: '#aaa' }}>{m.yil} ↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: '#1a1612', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#fff', marginBottom: '12px' }}>Birlikte çalışalım</h2>
            <p style={{ color: '#6b6b6b', fontSize: '16px', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>İlk görüşmede projenizi değerlendirip size özel bir strateji sunuyorum.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <Link href="/randevu">
                <button style={{ padding: '13px 28px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Randevu Al →</button>
              </Link>
              <a href="mailto:info@fatihemincakiroglu.com">
                <button style={{ padding: '13px 28px', borderRadius: '8px', background: 'transparent', color: '#fff', border: '1px solid #2a2520', fontWeight: 600, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>E-posta Gönder</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() { return { props: {} } }
