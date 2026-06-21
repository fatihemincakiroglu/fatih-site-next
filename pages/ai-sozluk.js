import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';

const KATEGORILER = ['Tümü', 'AI & LLM', 'GEO', 'SEO', 'Teknik SEO', 'İçerik', 'Otorite', 'Analitik'];

const TERIMLER = [
  { terim: 'AI Agent', trTerim: 'Yapay Zekâ Ajanı', kategori: 'AI & LLM', ilgili: ['LLM (Large Language Model)', 'AI Search', 'AI Overview'],
    aciklama: 'Kullanıcı adına otonom kararlar alabilen, web\'de arama yapan, alışveriş veya rezervasyon gibi eylemleri gerçekleştirebilen yapay zekâ yazılımı. Google\'ın ve OpenAI\'ın geliştirdiği agent\'lar, arama deneyimini sohbet tabanlı görev tamamlamaya dönüştürüyor.' },
  { terim: 'AI Content', trTerim: 'Yapay Zekâ İçeriği', kategori: 'İçerik', ilgili: ['E-E-A-T', 'GEO', 'Topical Authority'],
    aciklama: 'Yapay zekâ modelleri (ChatGPT, Claude, Gemini vb.) kullanılarak üretilen metin, görsel ve video içerik. Google Helpful Content sistemi kalitesiz ve toplu üretilen AI içeriği cezalandırırken özgün, E-E-A-T odaklı AI destekli içeriklere olumlu yaklaşmaktadır.' },
  { terim: 'AI Overview', trTerim: 'Yapay Zekâ Özeti', kategori: 'GEO', ilgili: ['GEO', 'Featured Snippet', 'LLM'],
    aciklama: 'Google\'ın SERP üst kısmına yerleştirdiği LLM tabanlı yanıt kutucuğudur. Kaynak siteler sağ panelde listelenir. AI Overview\'da kaynak olarak görünmek, markalı trafik ve otorite kazanımı açısından kritik bir GEO hedefidir.' },
  { terim: 'Answer Engine Optimization', trTerim: 'AEO — Yanıt Motoru Optimizasyonu', kategori: 'GEO', ilgili: ['GEO', 'Zero-Click', 'Featured Snippet'],
    aciklama: 'Perplexity, ChatGPT Search, You.com gibi yanıt motorlarında içeriklerin kaynak olarak gösterilmesini sağlayan optimizasyon yaklaşımı. Soru-cevap formatındaki içerik yapısı, AEO başarısının temel koşuludur.' },
  { terim: 'Backlink', trTerim: 'Geri Bağlantı', kategori: 'Otorite', ilgili: ['Domain Authority', 'Topical Authority', 'Dijital PR'],
    aciklama: 'Başka bir web sitesinden sizin sitenize verilen bağlantı. Arama motorları bu bağlantıları oy gibi değerlendirir; editoryal, bağlama uygun ve otoriter kaynaklardan gelen backlinkler sıralama gücünüzü artırır.' },
  { terim: 'Canonical Tag', trTerim: 'Kanonik Etiket', kategori: 'Teknik SEO', ilgili: ['Duplicate Content', 'Crawl Bütçesi', 'URL Yapısı'],
    aciklama: 'Birden fazla URL\'de benzer içerik bulunduğunda tercih edilen sayfayı arama motorlarına bildiren HTML etiketi. E-ticaret ve filtre URL\'lerindeki duplicate content sorununu çözmek için kullanılır.' },
  { terim: 'Core Web Vitals', trTerim: 'Temel Web Metrikleri', kategori: 'Teknik SEO', ilgili: ['LCP', 'INP', 'CLS', 'Sayfa Hızı'],
    aciklama: 'Google\'ın kullanıcı deneyimini ölçmek için kullandığı üç temel metrik: LCP (yükleme), INP (etkileşim) ve CLS (görsel kararlılık). Google sıralama sinyali olarak bu metrikleri resmi olarak kabul etmektedir.' },
  { terim: 'Crawl Bütçesi', trTerim: 'Tarama Bütçesi', kategori: 'Teknik SEO', ilgili: ['İndeksleme', 'Robots.txt', 'Site Mimarisi'],
    aciklama: 'Googlebot\'un belirli bir sürede sitenizde tarayabileceği URL sayısı. Düşük kaliteli ve tekrarlı sayfalar bu bütçeyi tüketirken asıl hedef sayfaların indekslenmesini geciktirebilir.' },
  { terim: 'Domain Authority', trTerim: 'Alan Otoritesi', kategori: 'Otorite', ilgili: ['Backlink', 'Trust Score', 'Page Authority'],
    aciklama: 'Moz tarafından geliştirilen, bir sitenin arama motorlarında ne kadar iyi sıralanabileceğini tahmin eden 1-100 arası puan. Backlink profili ve link kalitesi bu skoru doğrudan etkiler.' },
  { terim: 'E-E-A-T', trTerim: 'Deneyim-Uzmanlık-Otorite-Güven', kategori: 'Otorite', ilgili: ['Topical Authority', 'Schema Markup', 'Yazar Profili'],
    aciklama: 'Experience, Expertise, Authoritativeness, Trustworthiness. Google\'ın Search Quality Rater Guidelines\'ında tanımladığı içerik kalite değerlendirme çerçevesi. Özellikle sağlık, finans ve hukuk alanlarında kritik öneme sahiptir.' },
  { terim: 'Embedding', trTerim: 'Vektör Temsil', kategori: 'AI & LLM', ilgili: ['Semantic Search', 'RAG', 'LLM'],
    aciklama: 'Metinlerin anlam bakımından benzerliğini ölçmek için kullanılan vektör temsil yöntemi. Semantik arama sistemleri ve RAG mimarileri embedding modelleri kullanarak içerik eşleştirme yapar.' },
  { terim: 'Featured Snippet', trTerim: 'Öne Çıkan Snippet', kategori: 'SEO', ilgili: ['Zero-Click', 'AI Overview', 'Schema Markup'],
    aciklama: 'Google arama sonuçlarının üstünde gösterilen ve bir soruyu doğrudan yanıtlayan içerik kutucuğu. Paragraf, liste veya tablo formatında olabilir; AI Overview\'ın yoğunlaştığı içerik tipidir.' },
  { terim: 'GEO', trTerim: 'Üretken Arama Optimizasyonu', kategori: 'GEO', ilgili: ['AI Overview', 'LLM', 'AEO'],
    aciklama: 'Generative Engine Optimization. Yapay zekâ destekli arama motorlarında (AI Overview, Perplexity, ChatGPT Search) içeriklerin kaynak olarak gösterilmesini sağlayan optimizasyon pratiği. Klasik SEO\'nun evrimleşmiş halidir.' },
  { terim: 'Grounding', trTerim: 'Kaynak Bağlama', kategori: 'AI & LLM', ilgili: ['RAG', 'GEO', 'E-E-A-T'],
    aciklama: 'LLM\'lerin yanıtlarını doğrulanabilir kaynaklara dayandırması süreci. İçeriğinizin kaynak olarak seçilme olasılığını artırmak için özgün veriler, araştırma atıfları ve uzman görüşleri kritik rol oynar.' },
  { terim: 'Hreflang', trTerim: 'Dil-Bölge Etiketi', kategori: 'Teknik SEO', ilgili: ['Canonical Tag', 'Uluslararası SEO', 'İndeksleme'],
    aciklama: 'Çok dilli sitelerde her sayfanın hangi dil ve bölge için hazırlandığını arama motorlarına bildiren HTML etiketi. Yanlış implementasyon uluslararası sıralama sorunlarına neden olur.' },
  { terim: 'INP', trTerim: 'Sonraki Etkileşime Boyama Süresi', kategori: 'Teknik SEO', ilgili: ['Core Web Vitals', 'CLS', 'LCP'],
    aciklama: 'Interaction to Next Paint. Kullanıcının sayfayla etkileşiminden sonra görsel güncellenmeye kadar geçen süre. 200ms altı "iyi", 500ms üstü "zayıf" olarak değerlendirilir. Mart 2024\'te FID\'in yerini aldı.' },
  { terim: 'Knowledge Graph', trTerim: 'Bilgi Grafiği', kategori: 'SEO', ilgili: ['Entity SEO', 'Schema Markup', 'GEO'],
    aciklama: 'Google\'ın gerçek dünya varlıkları (kişi, yer, kuruluş) arasındaki ilişkileri haritalandırdığı yapılandırılmış veritabanı. Markanızın Knowledge Graph\'ta yer alması GEO görünürlüğü için stratejik avantaj sağlar.' },
  { terim: 'LCP', trTerim: 'En Büyük İçerikli Boyama', kategori: 'Teknik SEO', ilgili: ['Core Web Vitals', 'Sayfa Hızı', 'INP'],
    aciklama: 'Largest Contentful Paint. Sayfadaki en büyük görsel veya metin bloğunun yüklenme süresi. 2.5 saniye altı "iyi" kategorisindedir. Görsel optimizasyonu ve sunucu yanıt süresi LCP\'yi doğrudan etkiler.' },
  { terim: 'LLM', trTerim: 'Büyük Dil Modeli', kategori: 'AI & LLM', ilgili: ['GEO', 'RAG', 'Embedding'],
    aciklama: 'Large Language Model. Büyük ölçekli metin verisi üzerinde eğitilmiş, insan benzeri metin üretebilen yapay zekâ modeli. GPT-4, Claude, Gemini ve Llama bu kategorinin örnekleridir. GEO stratejisinin temel hedef sistemleridir.' },
  { terim: 'llms.txt', trTerim: 'LLM Yönlendirme Dosyası', kategori: 'Teknik SEO', ilgili: ['GEO', 'Robots.txt', 'Crawl Bütçesi'],
    aciklama: 'Web sitelerinin LLM tabanlı sistemlere içeriklerini nasıl kullanmalarını istediklerini bildirdiği standart dosya. Robots.txt\'in AI eşdeğeri olarak kabul edilir. GEO optimizasyonunun teknik temel taşlarından biridir.' },
  { terim: 'Prompt Engineering', trTerim: 'İstem Mühendisliği', kategori: 'AI & LLM', ilgili: ['LLM', 'AI Agent', 'GEO'],
    aciklama: 'LLM\'lerden en iyi sonuçları almak için girdi metnini tasarlama sanatı. İçerik üretimi, SEO araştırması ve GEO stratejisi geliştirmede etkin prompt kullanımı verimliliği katlamaktadır.' },
  { terim: 'RAG', trTerim: 'Geri Alma Destekli Üretim', kategori: 'AI & LLM', ilgili: ['LLM', 'Embedding', 'Grounding'],
    aciklama: 'Retrieval-Augmented Generation. LLM\'lerin gerçek zamanlı veri kaynaklarına erişerek yanıt ürettiği hibrit mimari. AI Overview ve Perplexity bu yaklaşımı kullanır; içeriğinizin RAG sistemlerinde kaynak seçilmesi GEO başarısının göstergesidir.' },
  { terim: 'Schema Markup', trTerim: 'Yapılandırılmış Veri', kategori: 'Teknik SEO', ilgili: ['Rich Results', 'Knowledge Graph', 'GEO'],
    aciklama: 'Arama motorlarının içeriği daha iyi anlaması için sayfalara eklenen JSON-LD formatındaki yapılandırılmış veri kodu. Article, FAQPage, HowTo ve Person gibi schema türleri hem zengin sonuç hem GEO görünürlüğü sağlar.' },
  { terim: 'SERP', trTerim: 'Arama Motoru Sonuç Sayfası', kategori: 'SEO', ilgili: ['Featured Snippet', 'AI Overview', 'Zero-Click'],
    aciklama: 'Search Engine Results Page. Arama sorgusu sonrasında gösterilen sayfa. Organik sonuçlar, reklamlar, AI Overview, featured snippet, knowledge panel ve local pack gibi farklı SERP özellikleri içerir.' },
  { terim: 'Topical Authority', trTerim: 'Konu Otoritesi', kategori: 'Otorite', ilgili: ['E-E-A-T', 'İç Linkleme', 'Pillar-Cluster'],
    aciklama: 'Bir sitenin belirli bir konu alanını kapsamlı biçimde ele alması nedeniyle arama motorları tarafından uzman kaynak olarak tanınması. Pillar-cluster içerik modeli topical authority inşasının temel metodolojisidir.' },
  { terim: 'Zero-Click', trTerim: 'Tıklamasız Arama', kategori: 'Analitik', ilgili: ['Featured Snippet', 'AI Overview', 'Knowledge Graph'],
    aciklama: 'Kullanıcının arama sonuçlarından herhangi bir siteye tıklamadan yanıt bulduğu deneyim. AI Overview\'ın yaygınlaşmasıyla zero-click aramaların payı artmaktadır; marka görünürlüğü stratejileri bu trende göre uyarlanmalıdır.' },
];

const ALFABE = 'ABCDEFGHIJKLMNOPRSTUVWXYZ'.split('');

export default function Page() {
  const [aktifKat, setAktifKat] = useState('Tümü');
  const [arama, setArama] = useState('');
  const [aktifHarf, setAktifHarf] = useState('Tümü');

  let filtered = TERIMLER;
  if (aktifKat !== 'Tümü') filtered = filtered.filter(t => t.kategori === aktifKat);
  if (arama) filtered = filtered.filter(t => t.terim.toLowerCase().includes(arama.toLowerCase()) || t.aciklama.toLowerCase().includes(arama.toLowerCase()));
  if (aktifHarf !== 'Tümü') filtered = filtered.filter(t => t.terim.toUpperCase().startsWith(aktifHarf));

  // Group by first letter
  const gruplar = {};
  filtered.forEach(t => {
    const harf = t.terim[0].toUpperCase();
    if (!gruplar[harf]) gruplar[harf] = [];
    gruplar[harf].push(t);
  });

  const katRenk = {
    'AI & LLM': { bg: '#fff7ed', color: '#ea580c', border: '#fed7aa' },
    'GEO': { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' },
    'SEO': { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
    'Teknik SEO': { bg: '#faf5ff', color: '#9333ea', border: '#e9d5ff' },
    'İçerik': { bg: '#fff1f2', color: '#e11d48', border: '#fecdd3' },
    'Otorite': { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
    'Analitik': { bg: '#f0fdfa', color: '#0d9488', border: '#99f6e4' },
  };

  const mevcutHarfler = new Set(TERIMLER.map(t => t.terim[0].toUpperCase()));

  return (
    <>
      <Head>
        <title>AI Sözlük | SEO ve GEO Terimleri | Fatih Emin Çakıroğlu</title>
        <meta name="description" content="125+ SEO, GEO ve AI terimi içeren kapsamlı sözlük. LLM, AI Overview, E-E-A-T, Core Web Vitals ve daha fazlasının Türkçe açıklamaları." />
        <link rel="canonical" href="https://fatihemincakiroglu.com/ai-sozluk" />

        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "DefinedTermSet", "name": "AI ve SEO Terimleri Sözlüğü", "url": "https://fatihemincakiroglu.com/ai-sozluk", "description": "125+ SEO, GEO ve AI terimi. LLM, AI Overview, E-E-A-T ve daha fazlası.", "author": {"@id": "https://fatihemincakiroglu.com/#person"}})}</script>
        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://fatihemincakiroglu.com"}, {"@type": "ListItem", "position": 2, "name": "Kaynaklar", "item": "https://fatihemincakiroglu.com/kaynaklar"}, {"@type": "ListItem", "position": 3, "name": "AI Sözlük", "item": "https://fatihemincakiroglu.com/ai-sozluk"}]})}</script>
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#faf9f7' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>Ana Sayfa</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <Link href="/kaynaklar" style={{ color: '#aaa', fontSize: '13px' }}>Kaynaklar</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>AI Sözlük</span>
          </div>
        </div>

        {/* Hero header */}
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#aaa', padding: '3px 10px', border: '1px solid #eee', borderRadius: '20px', letterSpacing: '1px' }}>SÖZLÜK</span>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#ddd', display: 'inline-block' }}></span>
                  <span style={{ fontSize: '12px', color: '#aaa' }}>{TERIMLER.length}+ terim · GEO, AI araması ve klasik SEO</span>
                </div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#111', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '5px', height: '36px', background: 'var(--orange)', borderRadius: '3px', display: 'inline-block', flexShrink: 0 }}></span>
                  AI Sözlük
                </h1>
                <p style={{ color: '#777', fontSize: '14px', marginTop: '8px', maxWidth: '600px', lineHeight: 1.6 }}>
                  Kategori seçerek daraltın, A–Z şeridinden harfe atlayın veya arama kutusuyla terim ve tanım içinde arayın.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '24px 32px 96px' }}>

          {/* Filter box */}
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px 24px', marginBottom: '32px' }}>
            {/* Kategori filtreleri */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {KATEGORILER.map(k => (
                <button key={k} onClick={() => { setAktifKat(k); setAktifHarf('Tümü'); }}
                  style={{
                    padding: '6px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                    background: aktifKat === k ? 'var(--orange)' : '#f5f5f5',
                    color: aktifKat === k ? '#fff' : '#555',
                    fontSize: '13px', fontWeight: aktifKat === k ? 700 : 500,
                    fontFamily: 'var(--font-body)', transition: 'all 0.15s',
                  }}>{k}</button>
              ))}
            </div>

            {/* Arama */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #eee', borderRadius: '10px', padding: '11px 16px', marginBottom: '16px', background: '#faf9f7' }}>
              <span style={{ color: '#bbb', fontSize: '15px' }}>🔍</span>
              <input type="text" placeholder='Terim veya tanım içinde ara... (ör: "AI Overview", "hreflang", "entity")'
                value={arama} onChange={e => { setArama(e.target.value); setAktifHarf('Tümü'); }}
                style={{ border: 'none', outline: 'none', fontSize: '14px', background: 'transparent', fontFamily: 'var(--font-body)', width: '100%', color: '#333' }} />
            </div>

            {/* A-Z harf şeridi */}
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              <button onClick={() => setAktifHarf('Tümü')}
                style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: aktifHarf === 'Tümü' ? 'var(--orange)' : '#f0f0f0', color: aktifHarf === 'Tümü' ? '#fff' : '#555', fontWeight: 700, fontSize: '12px', fontFamily: 'var(--font-body)' }}>
                Tüm
              </button>
              {ALFABE.map(h => (
                <button key={h} onClick={() => mevcutHarfler.has(h) && setAktifHarf(aktifHarf === h ? 'Tümü' : h)}
                  style={{
                    width: '32px', height: '32px', borderRadius: '8px', border: 'none', cursor: mevcutHarfler.has(h) ? 'pointer' : 'default',
                    background: aktifHarf === h ? 'var(--orange)' : mevcutHarfler.has(h) ? '#f0f0f0' : 'transparent',
                    color: aktifHarf === h ? '#fff' : mevcutHarfler.has(h) ? '#555' : '#ddd',
                    fontWeight: 600, fontSize: '13px', fontFamily: 'var(--font-body)',
                    transition: 'all 0.15s',
                  }}>{h}</button>
              ))}
            </div>
          </div>

          {/* Sonuç sayısı */}
          {(arama || aktifKat !== 'Tümü' || aktifHarf !== 'Tümü') && (
            <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '20px' }}>
              <strong style={{ color: '#555' }}>{filtered.length}</strong> terim bulundu
            </div>
          )}

          {/* Terim grupları */}
          {Object.keys(gruplar).sort().map(harf => (
            <div key={harf} id={`harf-${harf}`} style={{ marginBottom: '32px' }}>
              {/* Harf başlığı */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid var(--orange)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#111' }}>{harf}</span>
              </div>

              {/* Terim kartları */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {gruplar[harf].map((t, i) => {
                  const rk = katRenk[t.kategori] || { bg: '#f5f5f5', color: '#555', border: '#eee' };
                  return (
                    <div key={i} id={`terim-${t.terim.replace(/\s+/g, '-').toLowerCase()}`}
                      style={{ background: '#fff', borderRadius: '16px', padding: '24px 28px', border: '1px solid #eee', transition: 'box-shadow 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#111', margin: 0 }}>{t.terim}</h3>
                        <span style={{ padding: '4px 12px', borderRadius: '20px', background: rk.bg, color: rk.color, border: `1px solid ${rk.border}`, fontSize: '11px', fontWeight: 700, flexShrink: 0, marginLeft: '12px' }}>{t.kategori}</span>
                      </div>
                      {t.trTerim && <div style={{ fontSize: '14px', color: 'var(--orange)', fontStyle: 'italic', marginBottom: '14px' }}>({t.trTerim})</div>}
                      <div style={{ background: '#faf9f7', borderRadius: '10px', padding: '14px 16px', marginBottom: t.ilgili ? '14px' : '0' }}>
                        <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.75, margin: 0 }}>{t.aciklama}</p>
                      </div>
                      {t.ilgili && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '12px', color: '#aaa', fontWeight: 600 }}>İlgili:</span>
                          {t.ilgili.map((il, ii) => (
                            <span key={ii} style={{ fontSize: '13px', color: 'var(--orange)', fontWeight: 600, cursor: 'pointer' }}
                              onClick={() => setArama(il)}>
                              {il}{ii < t.ilgili.length - 1 ? ' ·' : ''}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#aaa' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#555', marginBottom: '8px' }}>Sonuç bulunamadı</div>
              <div style={{ fontSize: '14px' }}>Farklı bir terim veya kategori deneyin.</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "ai-sozluk"])),
    },
  }
}
