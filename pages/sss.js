import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

const SSS_DATA = [
  {
    kategori: 'SEO & Danışmanlık',
    sorular: [
      { soru: 'SEO danışmanlığı ne kadar sürede sonuç verir?', cevap: 'SEO, uzun vadeli bir yatırımdır. İlk teknik iyileştirmelerin etkileri 4-6 haftada görünebilir. Anlamlı trafik artışı için 3-6 ay, kalıcı ve rekabetçi sıralamalara ulaşmak içinse 6-12 ay öngörmek gerekir. Bu süre; sektörün rekabet yoğunluğuna, sitenin mevcut teknik durumuna ve uygulanan stratejinin kapsamına göre değişir. Kısa vadeli garanti veren hizmetler çoğunlukla sürdürülemez taktiklere dayanır.' },
      { soru: 'SEO garantisi verilebilir mi?', cevap: 'Belirli bir sıralama veya trafik rakamını garanti eden hizmetler, genellikle manipülatif yöntemlere başvurur ve uzun vadede Google penaltısıyla sonuçlanabilir. Ben ölçülebilir hedefler, şeffaf süreç ve düzenli raporlama sunuyorum; ancak algoritmanın dinamik yapısı nedeniyle kesin sıralama garantisi vermiyorum. Başarıyı trafik artışı, organik dönüşüm oranı ve yatırım geri dönüşü gibi gerçek iş metrikleri üzerinden ölçüyorum.' },
      { soru: 'Aylık SEO maliyeti ne kadar?', cevap: 'Fiyatlandırma; sitenizin büyüklüğü, hedef anahtar kelime rekabeti, hizmet kapsamı ve mevcut teknik durum gibi faktörlere göre değişir. Başlangıç paketleri aylık 8.500 TL\'den, kurumsal çözümler ise özel teklife göre başlamaktadır. İlk görüşmede sitenizi analiz edip size özel bir fiyat teklifi sunuyorum. Bu görüşme tamamen ücretsiz ve bağlayıcı değildir.' },
      { soru: 'SEO çalışması yapılırken siteme müdahale gerekir mi?', cevap: 'Teknik SEO uygulamaları için sitenize erişim (CMS, hosting paneli veya geliştirici desteği) gereklidir. İçerik ve backlink çalışmaları ise çoğunlukla sitenize doğrudan müdahale gerektirmeden yürütülebilir. Tüm değişiklikler önceden tarafınıza bildiriliyor ve onayınızla uygulanıyor; süreci her aşamada şeffaf biçimde paylaşıyorum.' },
    ],
  },
  {
    kategori: 'Teknik SEO',
    sorular: [
      { soru: 'Teknik SEO denetimi (audit) ne içerir?', cevap: 'Teknik SEO denetimi; crawlability (taranabilirlik) analizi, indeksleme sorunları, URL yapısı, canonical etiketler, hız ve Core Web Vitals değerlendirmesi, mobil uyum, yapılandırılmış veri (schema markup), iç link mimarisi, duplicate içerik tespiti ve 301/302 yönlendirme zinciri analizini kapsar. Screaming Frog, Ahrefs, Google Search Console ve PageSpeed Insights araçlarıyla 100+ kontrol noktası incelenir.' },
      { soru: 'Core Web Vitals sıralamayı doğrudan etkiler mi?', cevap: 'Evet, Core Web Vitals (LCP, INP, CLS) Google\'ın resmi sıralama faktörleri arasındadır ve özellikle benzer kalitedeki içerikler arasında belirleyici rol oynar. LCP\'nin 2.5 saniyenin altında, INP\'nin 200ms\'nin altında ve CLS\'nin 0.1\'in altında olması "iyi" olarak kabul edilir. Bu değerlerin optimizasyonu yalnızca sıralama değil, kullanıcı deneyimi ve dönüşüm oranı açısından da kritik önem taşır.' },
      { soru: 'Sayfa hızı ne kadar sürede iyileşir?', cevap: 'Teknik hız optimizasyonu çalışmalarının (görsel sıkıştırma, lazy loading, JavaScript optimizasyonu, CDN kurulumu) etkileri genellikle 2-4 hafta içinde PageSpeed Insights skorlarına yansır. Ancak gerçek kullanıcı verilerini ölçen CrUX (Chrome User Experience Report) verileri 28 günlük bir pencerede toplanır, bu nedenle Core Web Vitals iyileştirmelerinin Search Console\'a yansıması 4-6 hafta alabilir.' },
    ],
  },
  {
    kategori: 'İçerik & Anahtar Kelime',
    sorular: [
      { soru: 'Anahtar kelime araştırması nasıl yapılır?', cevap: 'Etkili anahtar kelime araştırması; hacim ve rekabet güçlüğünün ötesinde arama niyetini (informational, commercial, transactional) merkeze alır. Ahrefs, SEMrush ve Google Search Console verileri, rakip içerik analizi ve "People Also Ask" sorularıyla beslenen bir araştırma, doğru anahtar kelime planlamasının temelini oluşturur. Özellikle long-tail (uzun kuyruklu) kelimeler, dönüşüm potansiyeli yüksek ve rekabetin daha düşük olduğu hedefler sunar.' },
      { soru: 'Ne sıklıkla içerik üretmeliyim?', cevap: 'İçerik sıklığından çok içerik kalitesi ve tutarlılığı belirleyicidir. Ayda 2-4 derinlemesine, araştırmaya dayalı makale; yüksek hacimde üretilen yüzeysel içerikten çok daha değerlidir. Google\'ın Helpful Content sisteminin odaklandığı kriter, kullanıcı sorusunu gerçekten yanıtlayan, uzman bakış açısı taşıyan içeriklerdir. Mevcut içeriklerinizi düzenli güncellemek de yeni içerik üretmek kadar önemlidir.' },
      { soru: 'Yapay zeka ile üretilen içerikler SEO için kullanılabilir mi?', cevap: 'Google, yapay zeka ile üretilen içerikleri otomatik olarak cezalandırmaz; önemli olan içeriğin kalitesi ve kullanıcı değeridir. Ancak ham AI çıktısı, uzman revizyonu ve özgün deneyim eklenmeden yayınlandığında E-E-A-T sinyalleri zayıf kalır ve "helpful content" kriterlerini karşılamakta zorlanır. AI, araştırma ve taslak aşamasında verimli bir araç olarak kullanılabilir; ancak son çıktının mutlaka uzman gözünden geçirilmesi şarttır.' },
    ],
  },
];

export default function Page() {
    const router = useRouter()
  const [aktifKat, setAktifKat] = useState('Tümü');
  const [acik, setAcik] = useState(null);
  const [arama, setArama] = useState('');

  const katlar = ['Tümü', ...SSS_DATA.map(k => k.kategori)];
  const tumSorular = SSS_DATA.flatMap(k => k.sorular.map(s => ({ ...s, kategori: k.kategori })));
  const filteredKat = aktifKat === 'Tümü' ? tumSorular : tumSorular.filter(s => s.kategori === aktifKat);
  const filtered = arama ? filteredKat.filter(s => s.soru.toLowerCase().includes(arama.toLowerCase()) || s.cevap.toLowerCase().includes(arama.toLowerCase())) : filteredKat;
  const gruplar = SSS_DATA.filter(k => aktifKat === 'Tümü' || k.kategori === aktifKat);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tumSorular.map(s => ({
      "@type": "Question",
      "name": s.soru,
      "acceptedAnswer": { "@type": "Answer", "text": s.cevap }
    }))
  };

  return (
    <>
      <Head>
        <title>{router.locale === 'en' ? 'FAQ | Fatih Emin Çakıroğlu' : 'Sıkça Sorulan Sorular | Fatih Emin Çakıroğlu'}</title>
        <meta name="description" content={router.locale === 'en' ? 'Most frequently asked questions and answers about SEO consulting.' : 'SEO danışmanlığı hakkında en sık sorulan sorular ve yanıtları.'} />
        <link rel="canonical" href={router.locale === 'en' ? 'https://fatihemincakiroglu.com/en/sss' : 'https://fatihemincakiroglu.com/sss'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/sss" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/sss" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/sss" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://fatihemincakiroglu.com"},
            {"@type": "ListItem", "position": 2, "name": "SSS", "item": "https://fatihemincakiroglu.com/sss"}
          ]
        })}</script>
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>Ana Sayfa</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <Link href="/kaynaklar" style={{ color: '#aaa', fontSize: '13px' }}>Kaynaklar</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>SSS</span>
          </div>
        </div>

        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '48px 32px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>SSS</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#111', marginBottom: '12px' }}>
              Sıkça Sorulan <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>Sorular</span>
            </h1>
            <p style={{ color: '#777', fontSize: '16px', maxWidth: '520px', marginBottom: '24px' }}>
              {tumSorular.length} soru-cevap · SEO danışmanlığı, teknik SEO ve içerik stratejisi
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8f7f5', border: '1px solid #eee', borderRadius: '8px', padding: '10px 16px', maxWidth: '400px' }}>
              <span style={{ color: '#aaa' }}>🔍</span>
              <input type="text" placeholder='Soru veya cevap içinde ara...' value={arama} onChange={e => setArama(e.target.value)}
                style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#333', background: 'transparent', fontFamily: 'var(--font-body)', width: '100%' }} />
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '32px 32px 96px' }}>
          {/* Filtre */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {katlar.map(k => (
              <button key={k} onClick={() => setAktifKat(k)} style={{
                padding: '7px 16px', borderRadius: '20px', border: 'none',
                background: aktifKat === k ? 'var(--orange)' : '#fff',
                color: aktifKat === k ? '#fff' : 'var(--dim)',
                fontSize: '13px', fontWeight: aktifKat === k ? 700 : 400,
                cursor: 'pointer', fontFamily: 'var(--font-body)',
                border: aktifKat === k ? 'none' : '1px solid #eee',
              }}>{k}</button>
            ))}
          </div>

          {arama ? (
            <div>
              <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '16px' }}>{filtered.length} sonuç</div>
              {filtered.map((s, i) => <SoruKart key={i} soru={s} acik={acik} setAcik={setAcik} idx={`a-${i}`} />)}
            </div>
          ) : (
            gruplar.map((grup, gi) => (
              <div key={gi} style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ width: '3px', height: '20px', background: 'var(--orange)', borderRadius: '2px' }}></div>
                  <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111' }}>{grup.kategori}</h2>
                  <span style={{ fontSize: '12px', color: '#aaa' }}>{grup.sorular.length} soru</span>
                </div>
                {grup.sorular.map((s, si) => (
                  <SoruKart key={si} soru={s} acik={acik} setAcik={setAcik} idx={`${gi}-${si}`} />
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

function SoruKart({ soru, acik, setAcik, idx }) {
  const isAcik = acik === idx;
  return (
    <div style={{ background: '#fff', borderRadius: '12px', marginBottom: '10px', border: '1px solid #eee', overflow: 'hidden' }}>
      <button onClick={() => setAcik(isAcik ? null : idx)} style={{
        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '16px',
      }}>
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#111', lineHeight: 1.4 }}>{soru.soru}</span>
        <span style={{ fontSize: '20px', color: '#aaa', transition: 'transform 0.2s', transform: isAcik ? 'rotate(45deg)' : 'none', flexShrink: 0 }}>+</span>
      </button>
      {isAcik && (
        <div style={{ padding: '0 24px 20px', borderTop: '1px solid #f5f5f5' }}>
          <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.8, marginTop: '12px' }}>{soru.cevap}</p>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() { return { props: {} } }
