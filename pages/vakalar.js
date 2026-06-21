import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

const VAKALAR = [
  {
    id: 'tekstil',
    no: '01',
    marka: 'Tekstil Markası',
    sektor: 'E-Ticaret',
    sure: '6 ay',
    hizmet: 'Teknik SEO & Kategori Optimizasyonu',
    renk: '#fff3ee',
    aksan: '#e8560a',
    ozet: 'Sıfırdan organik trafiği 3 katına çıkararak aylık 45.000 ziyaretçiye ulaştık.',
    onceki: { trafik: '14.800', sıralama: '87', dönüşüm: '1.2', domain: '22' },
    sonraki: { trafik: '45.200', sıralama: '312', dönüşüm: '2.8', domain: '41' },
    grafik: [12, 14, 15, 18, 22, 28, 35, 38, 41, 44, 45, 45],
    problem: 'Marka, yoğun rekabet ortamında organik aramalarda görünür değildi. Site teknik sorunlarla doluydu: crawl hataları, duplicate içerik ve optimize edilmemiş kategori sayfaları.',
    cozum: [
      'Kapsamlı teknik SEO denetimi ve 47 kritik hatanın giderilmesi',
      'Kategori sayfaları için anahtar kelime bazlı içerik mimarisi',
      'Ürün şema markup implementasyonu (rich snippet kazanımı)',
      'Aylık 8 editoryal backlink ile domain otoritesi inşası',
      'Core Web Vitals optimizasyonu (LCP: 4.2s → 1.8s)',
    ],
    sonuclar: [
      { etiket: 'Organik Trafik', once: '14.800/ay', sonra: '45.200/ay', artis: '+205%' },
      { etiket: 'Sıralanan Kelime', once: '87', sonra: '312', artis: '+258%' },
      { etiket: 'Dönüşüm Oranı', once: '%1.2', sonra: '%2.8', artis: '+133%' },
      { etiket: 'Domain Rating', once: '22', sonra: '41', artis: '+19 puan' },
    ],
    referans: { isim: 'Mehmet A.', unvan: 'E-Ticaret Direktörü', yorum: 'Fatih ile çalışmaya başladıktan 4 ay sonra organik trafiğimiz %280 arttı. Her adımı şeffaf şekilde takip edebildik.' },
  },
  {
    id: 'hukuk',
    no: '02',
    marka: 'Hukuk Bürosu',
    sektor: 'Yerel SEO',
    sure: '4 ay',
    hizmet: 'Yerel SEO & İçerik Stratejisi',
    renk: '#e8f0e8',
    aksan: '#15803d',
    ozet: 'Yerel aramalarda #1 sıraya ulaşarak aylık müvekkil sayısını 3 katına çıkardık.',
    onceki: { trafik: '820', sıralama: '14', dönüşüm: '0.8', domain: '15' },
    sonraki: { trafik: '2.460', sıralama: '47', dönüşüm: '2.4', domain: '28' },
    grafik: [5, 6, 7, 9, 12, 16, 19, 21, 23, 24, 24, 24],
    problem: 'Büro, Google aramalarında rakip firmaların çok gerisinde kalıyordu. Google Business Profile optimize edilmemiş, yerel anahtar kelimeler için içerik bulunmuyordu.',
    cozum: [
      'Google Business Profile tam optimizasyonu (kategori, fotoğraf, hizmet)',
      'Yerel anahtar kelimeler için 12 içerik sayfası oluşturulması',
      'Yerel backlink inşası (barolar, hukuk dizinleri)',
      'Müvekkil yorumu yönetim sistemi kurulumu',
      'LocalBusiness schema markup implementasyonu',
    ],
    sonuclar: [
      { etiket: 'Organik Trafik', once: '820/ay', sonra: '2.460/ay', artis: '+200%' },
      { etiket: 'Sıralanan Kelime', once: '14', sonra: '47', artis: '+236%' },
      { etiket: 'Lead Dönüşüm', once: '%0.8', sonra: '%2.4', artis: '+200%' },
      { etiket: 'Domain Rating', once: '15', sonra: '28', artis: '+13 puan' },
    ],
    referans: { isim: 'Zeynep K.', unvan: 'Büro Ortağı', yorum: 'Dijital varlığımızı sıfırdan inşa etti. Yerel SEO çalışması sayesinde Google\'da ilk sayfaya çıktık, müvekkil sayımız 3 katına çıktı.' },
  },
  {
    id: 'saas',
    no: '03',
    marka: 'SaaS Girişimi',
    sektor: 'B2B SaaS',
    sure: '8 ay',
    hizmet: 'Growth SEO & Backlink İnşası',
    renk: '#e6ecf5',
    aksan: '#1d4ed8',
    ozet: '8 ayda sıfırdan 45.000 aylık organik ziyaretçiye ulaşarak MRR\'yi 4 katına çıkardık.',
    onceki: { trafik: '0', sıralama: '0', dönüşüm: '0', domain: '0' },
    sonraki: { trafik: '45.000', sıralama: '280', dönüşüm: '3.2', domain: '38' },
    grafik: [0, 1, 3, 6, 11, 18, 26, 33, 39, 43, 44, 45],
    problem: 'Yeni kurulan SaaS ürününün hiç organik varlığı yoktu. Rakip domainler yüksek otoriteye sahipti ve ürün kategorisi kalabalık bir nişteydi.',
    cozum: [
      'Programatik SEO ile 200+ ürün kategori sayfası oluşturulması',
      'Topical authority inşası için 40 derin içerik',
      'HARO ve dijital PR ile 35 yüksek DA backlink',
      'Product-led SEO: ücretsiz araçlar ile organik trafik çekimi',
      'Blog içerik kümeleme ve iç link mimarisi kurulumu',
    ],
    sonuclar: [
      { etiket: 'Organik Trafik', once: '0/ay', sonra: '45.000/ay', artis: 'Sıfırdan' },
      { etiket: 'Sıralanan Kelime', once: '0', sonra: '280', artis: 'Sıfırdan' },
      { etiket: 'Trial Dönüşüm', once: '%0', sonra: '%3.2', artis: 'Sıfırdan' },
      { etiket: 'Domain Rating', once: '0', sonra: '38', artis: '+38 puan' },
    ],
    referans: { isim: 'Can S.', unvan: 'Kurucu & CEO', yorum: 'Teknik SEO denetimi göz açıcıydı. 6 ayda organik trafiği sıfırdan ciddi rakamlara taşıdı. MRR\'miz 4 katına çıktı.' },
  },
  {
    id: 'saglik',
    no: '04',
    marka: 'Sağlık Kliniği',
    sektor: 'Medikal SEO',
    sure: '5 ay',
    hizmet: 'E-E-A-T & Medikal SEO',
    renk: '#f0e8f5',
    aksan: '#7c3aed',
    ozet: 'E-E-A-T sinyal optimizasyonu ile organik randevu sayısını 240% artırdık.',
    onceki: { trafik: '3.200', sıralama: '42', dönüşüm: '0.6', domain: '18' },
    sonraki: { trafik: '8.900', sıralama: '168', dönüşüm: '1.8', domain: '35' },
    grafik: [28, 30, 32, 38, 45, 55, 67, 75, 83, 88, 89, 89],
    problem: 'Klinik, medikal alanda güven sinyalleri yetersiz olduğu için YMYL (Your Money Your Life) kategorisinde zorlanıyordu. Doktor profilleri ve uzmanlık içerikleri yoktu.',
    cozum: [
      'Doktor biyografi ve uzmanlık sayfaları oluşturulması',
      'Medikal schema markup (MedicalOrganization, Physician)',
      'Hasta yorumu yönetimi ve sosyal kanıt optimizasyonu',
      'Sağlık dergilerinde 8 editoryal yayın ile otorite inşası',
      'YMYL uyumlu içerik revizyonu ve kaynak ekleme',
    ],
    sonuclar: [
      { etiket: 'Organik Trafik', once: '3.200/ay', sonra: '8.900/ay', artis: '+178%' },
      { etiket: 'Sıralanan Kelime', once: '42', sonra: '168', artis: '+300%' },
      { etiket: 'Randevu Dönüşüm', once: '%0.6', sonra: '%1.8', artis: '+200%' },
      { etiket: 'Domain Rating', once: '18', sonra: '35', artis: '+17 puan' },
    ],
    referans: { isim: 'Dr. Ayşe M.', unvan: 'Klinik Direktörü', yorum: 'E-E-A-T odaklı çalışma sonrasında hem sıralamalarımız hem de hasta güveni ciddi oranda arttı.' },
  },
];

function MiniGrafik({ veri, renk }) {
  const max = Math.max(...veri);
  const w = 280, h = 80;
  const points = veri.map((v, i) => `${(i / (veri.length - 1)) * w},${h - (v / max) * h * 0.85}`).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline fill="none" stroke={renk} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
      <polyline fill={renk + '20'} stroke="none" points={`0,${h} ${points} ${w},${h}`} />
    </svg>
  );
}

export default function Page() {
    const router = useRouter()
  const [aktif, setAktif] = useState(null);

  return (
    <>
      <Head>
        <title>{router.locale === 'en' ? 'Case Studies | Fatih Emin Çakıroğlu' : 'Vaka Çalışmaları | Fatih Emin Çakıroğlu'}</title>
        <meta name="description" content={router.locale === 'en' ? 'Real success stories and measurable results from SEO consulting.' : 'SEO danışmanlığı sonucu elde edilen gerçek başarı hikayeleri ve ölçülebilir sonuçlar.'} />
        <link rel="canonical" href={router.locale === 'en' ? 'https://fatihemincakiroglu.com/en/vakalar' : 'https://fatihemincakiroglu.com/vakalar'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/vakalar" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/vakalar" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/vakalar" />
        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "CollectionPage", "name": "Vaka Çalışmaları", "url": "https://fatihemincakiroglu.com/vakalar", "description": "SEO danışmanlığı sonucu elde edilen gerçek başarı hikayeleri ve ölçülebilir sonuçlar.", "author": {"@id": "https://fatihemincakiroglu.com/#person"}})}</script>
        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://fatihemincakiroglu.com"}, {"@type": "ListItem", "position": 2, "name": "Hakkımda", "item": "https://fatihemincakiroglu.com/hakkimda"}, {"@type": "ListItem", "position": 3, "name": "Vaka Çalışmaları", "item": "https://fatihemincakiroglu.com/vakalar"}]})}</script>
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>Ana Sayfa</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <Link href="/hakkimda" style={{ color: '#aaa', fontSize: '13px' }}>Hakkımda</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>Vaka Çalışmaları</span>
          </div>
        </div>


        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '48px 32px 40px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>VAKA ÇALIŞMALARI</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#111', lineHeight: 1.15, marginBottom: '12px' }}>
              Gerçek müşteriler,<br /><span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>ölçülebilir sonuçlar</span>
            </h1>
            <p style={{ color: '#777', fontSize: '16px', maxWidth: '520px', lineHeight: 1.6 }}>Garantili sıralama değil, gerçek verilerle desteklenen şeffaf süreç.</p>
          </div>
        </div>

        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '40px 32px 96px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {VAKALAR.map((v, i) => (
              <div key={i}>
                <div style={{ background: v.renk, borderRadius: '16px', padding: '28px', border: '1px solid rgba(0,0,0,0.06)', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onClick={() => setAktif(aktif === v.id ? null : v.id)}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: v.aksan, letterSpacing: '1px', textTransform: 'uppercase' }}>{v.sektor}</span>
                      <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111', margin: '4px 0' }}>{v.marka}</h3>
                      <p style={{ fontSize: '13px', color: '#888' }}>{v.hizmet} · {v.sure}</p>
                    </div>
                    <span style={{ fontSize: '24px', fontWeight: 800, color: v.aksan, opacity: 0.3 }}>{v.no}</span>
                  </div>

                  <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.6, marginBottom: '20px' }}>{v.ozet}</p>

                  <MiniGrafik veri={v.grafik} renk={v.aksan} />

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '16px' }}>
                    {v.sonuclar.slice(0, 2).map((s, si) => (
                      <div key={si} style={{ background: '#fff', borderRadius: '8px', padding: '12px' }}>
                        <div style={{ fontSize: '11px', color: '#aaa', marginBottom: '4px' }}>{s.etiket}</div>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: v.aksan }}>{s.artis}</div>
                        <div style={{ fontSize: '11px', color: '#aaa' }}>{s.once} → {s.sonra}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '16px', fontSize: '13px', color: v.aksan, fontWeight: 600 }}>
                    {aktif === v.id ? '▲ Kapat' : '▼ Detayları gör'}
                  </div>
                </div>

                {aktif === v.id && (
                  <div style={{ background: '#fff', borderRadius: '0 0 16px 16px', padding: '28px', border: '1px solid #eee', borderTop: 'none', marginTop: '-8px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginBottom: '12px' }}>Problem</h4>
                    <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.7, marginBottom: '20px' }}>{v.problem}</p>

                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginBottom: '12px' }}>Uygulanan Çözümler</h4>
                    <ul style={{ listStyle: 'none', marginBottom: '20px' }}>
                      {v.cozum.map((c, ci) => (
                        <li key={ci} style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontSize: '14px', color: '#555' }}>
                          <span style={{ color: 'var(--orange)', flexShrink: 0 }}>✓</span> {c}
                        </li>
                      ))}
                    </ul>

                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginBottom: '12px' }}>Sonuçlar</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '20px' }}>
                      {v.sonuclar.map((s, si) => (
                        <div key={si} style={{ background: '#f8f7f5', borderRadius: '8px', padding: '14px', border: '1px solid #eee' }}>
                          <div style={{ fontSize: '11px', color: '#aaa', marginBottom: '4px' }}>{s.etiket}</div>
                          <div style={{ fontSize: '22px', fontWeight: 800, color: v.aksan }}>{s.artis}</div>
                          <div style={{ fontSize: '12px', color: '#aaa' }}>{s.once} → {s.sonra}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ background: '#f8f7f5', borderRadius: '10px', padding: '20px', border: '1px solid #eee' }}>
                      <p style={{ fontSize: '15px', color: '#555', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '12px' }}>"{v.referans.yorum}"</p>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#111' }}>{v.referans.isim} · <span style={{ color: '#888', fontWeight: 400 }}>{v.referans.unvan}</span></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '40px', textAlign: 'center', padding: '48px', background: '#1a1612', borderRadius: '16px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#fff', marginBottom: '12px' }}>Sizin için ne yapabilirim?</h2>
            <p style={{ color: '#6b6b6b', fontSize: '15px', marginBottom: '24px' }}>İlk görüşmede sitenizi analiz edip potansiyeli birlikte değerlendiririz.</p>
            <Link href="/randevu">
              <button style={{ padding: '14px 32px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '16px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                Ücretsiz Danışma Al →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() { return { props: {} } }
