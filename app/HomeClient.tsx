'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';




function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Fade({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(20px)',
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>{children}</div>
  );
}

function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0; const step = end / (duration / 16);
    const t = setInterval(() => { start += step; if (start >= end) { setCount(end); clearInterval(t); } else setCount(Math.floor(start)); }, 16);
    return () => clearInterval(t);
  }, [inView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const HIZMETLER = [
  { id: 'seo', ikon: '🔍', baslik: 'SEO & Arama', kisa: 'Teknik + strateji + içerik — uçtan uca.', detay: 'Google algoritmalarını derinlemesine analiz ederek sitenizin arama görünürlüğünü artırıyorum. Teknik SEO denetiminden içerik stratejisine, backlink inşasından rakip analizine kadar kapsamlı hizmet.', maddeler: ['Teknik SEO Denetimi', 'Anahtar Kelime Araştırması', 'İçerik Optimizasyonu', 'Backlink Stratejisi', 'Rakip Analizi'] },
  { id: 'eticaret', ikon: '🛒', baslik: 'E-Ticaret Danışmanlığı', kisa: 'Shopify, WooCommerce, Trendyol.', detay: 'E-ticaret platformlarını organik büyüme ve dönüşüm optimizasyonu açısından ele alıyorum. Ürün sayfası SEO\'sundan kategori mimarisine, pazar yeri optimizasyonundan kullanıcı deneyimine kadar.', maddeler: ['Mağaza Mimarisi', 'Ürün Sayfası SEO', 'Kategori Optimizasyonu', 'Trendyol & Hepsiburada', 'CRO Danışmanlığı'] },
  { id: 'dijital', ikon: '📈', baslik: 'Dijital Pazarlama', kisa: 'Google Ads, Meta Ads ve içerik.', detay: 'Performans pazarlaması ve organik büyümeyi birleştirerek en yüksek ROI\'yi hedefliyorum. Bütçenizi akıllıca kullanmak için veri odaklı kararlar alıyoruz.', maddeler: ['Google Ads Yönetimi', 'Meta Ads Stratejisi', 'İçerik Pazarlaması', 'Analitik & Raporlama', 'A/B Testleri'] },
  { id: 'audit', ikon: '⚡', baslik: 'Ücretsiz SEO Audit', kisa: '50+ sinyali tarayan kapsamlı denetim.', detay: 'Sitenizin mevcut SEO durumunu derinlemesine analiz ediyorum. Teknik sorunlar, içerik boşlukları, backlink profili ve rakip karşılaştırması ile başlangıç noktanızı netleştiriyorum.', maddeler: ['Teknik Analiz', 'İçerik Analizi', 'Backlink Profili', 'Rakip Karşılaştırması', 'Aksiyon Planı'] },
  { id: 'performans', ikon: '📊', baslik: 'Performans & Growth', kisa: 'Ölçümlenebilir trafik ve gelir artışı.', detay: 'Organik trafiği gelire dönüştürmek için bütüncül bir yaklaşım uyguluyorum. Conversion funnel optimizasyonu, landing page stratejisi ve büyüme deneylerini birleştiriyorum.', maddeler: ['KPI Belirleme', 'Funnel Optimizasyonu', 'Landing Page SEO', 'Büyüme Deneyleri', 'Aylık Raporlama'] },
  { id: 'backlink', ikon: '🔗', baslik: 'Backlink & Dijital PR', kisa: 'Editoryal link, yayın ilişkileri.', detay: 'Kaliteli backlink inşası ile domain otoritenizi artırıyorum. Medya ilişkileri, dijital PR ve editoryal içerik stratejisi ile organik link kazanımı sağlıyorum.', maddeler: ['Link Profil Analizi', 'Dijital PR Kampanyası', 'Medya İlişkileri', 'Broken Link Building', 'Competitor Gap Analizi'] },
];

const BASARI = [
  { no: '01', marka: 'Tekstil Markası', konu: 'Teknik SEO & Kategori Optimizasyonu', sonuc: '+312% organik trafik, 3 kat anahtar kelime', renk: '#f5efe6', aksan: '#c8783a' },
  { no: '02', marka: 'Hukuk Bürosu', konu: 'Yerel SEO & İçerik Stratejisi', sonuc: 'Yerel aramalarda #1, +180% organik lead', renk: '#e8f0e8', aksan: '#3a7a3a' },
  { no: '03', marka: 'SaaS Girişimi', konu: 'Growth SEO & Backlink', sonuc: '6 ayda 0\'dan 45K/ay organik ziyaretçi', renk: '#e6ecf5', aksan: '#3a5aa0' },
  { no: '04', marka: 'Sağlık Kliniği', konu: 'E-E-A-T & Medikal SEO', sonuc: '+240% organik randevu, +28 otorite skoru', renk: '#f0e8f5', aksan: '#7a3aa0' },
];

const REFERANSLAR = [
  { isim: 'Mehmet A.', unvan: 'E-Ticaret Direktörü', sirket: 'Tekstil Markası', yorum: 'Fatih ile çalışmaya başladıktan 4 ay sonra organik trafiğimiz %280 arttı. Her adımı şeffaf şekilde takip edebildik. Yatırımın geri dönüşü inanılmaz hızda oldu.' },
  { isim: 'Zeynep K.', unvan: 'CEO', sirket: 'Hukuk Bürosu', yorum: 'Dijital varlığımızı sıfırdan inşa etti. Yerel SEO çalışması sayesinde Google\'da ilk sayfaya çıktık, müvekkil sayımız 3 katına çıktı.' },
  { isim: 'Can S.', unvan: 'Kurucu', sirket: 'SaaS Platform', yorum: 'Teknik SEO denetimi gerçekten göz açıcıydı. Fark etmediğimiz onlarca kritik hata vardı. 6 ayda organik trafiği sıfırdan ciddi rakamlara taşıdı.' },
];

const BLOG_POSTS = [
  { slug: 'eticaret-seo-rehberi-2025', baslik: 'E-Ticaret SEO Rehberi 2025: Rakiplerinizin Önüne Geçin', tarih: '15 Ocak 2025', sure: '8 dk', etiket: 'SEO', no: '01' },
  { slug: 'google-core-update-2025', baslik: 'Google Core Update 2025: Sitenizi Nasıl Korursunuz?', tarih: '3 Şubat 2025', sure: '6 dk', etiket: 'Google', no: '02' },
  { slug: 'trendyol-seo-ipuclari', baslik: 'Trendyol\'da Üst Sıralara Çıkmanın 10 Yolu', tarih: '20 Şubat 2025', sure: '5 dk', etiket: 'E-Ticaret', no: '03' },
  { slug: 'yerel-seo-rehberi', baslik: 'Yerel SEO Rehberi: Google Haritalar\'da Öne Çıkın', tarih: '8 Mart 2025', sure: '7 dk', etiket: 'Yerel SEO', no: '04' },
];

const ARACLAR = ['Ahrefs', 'SEMrush', 'Search Console', 'Screaming Frog', 'Google Analytics', 'Moz', 'Majestic', 'SERPstat'];

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function HomeClient() {
  const [aktifHizmet, setAktifHizmet] = useState(0);
  const [domain, setDomain] = useState('');
  const [formData, setFormData] = useState({ ad: '', email: '', telefon: '', mesaj: '', hizmet: '' });
  const [formStatus, setFormStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    await new Promise(r => setTimeout(r, 1500));
    setFormStatus('sent');
  };

  return (
    <>
      

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh', paddingTop: 'calc(var(--nav-h) + 60px)',
        paddingBottom: '80px', paddingLeft: '32px', paddingRight: '32px',
        background: '#1a1612',
        display: 'flex', alignItems: 'center',
      }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

          {/* Sol */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', border: '1px solid #2a2520', background: '#231f1a', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b6b6b', textTransform: 'uppercase', marginBottom: '28px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--orange)', display: 'inline-block' }}></span>
              SEO UZMANI · DİJİTAL PAZARLAMA
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 4.5vw, 60px)',
              fontWeight: 800, lineHeight: 1.1, color: '#fff',
              marginBottom: '24px', letterSpacing: '-1px',
            }}>
              Organik Büyüme ile<br />
              <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>Rakiplerinizi</span><br />
              Geride Bırakın
            </h1>
            <p style={{ fontSize: '16px', color: '#6b6b6b', lineHeight: 1.75, marginBottom: '36px', maxWidth: '460px' }}>
              8 yıllık deneyimle 150+ işletmenin Google'daki görünürlüğünü ve satışlarını artırdım. Veriye dayalı SEO stratejileriyle kalıcı büyüme sağlıyorum.
            </p>

            {/* Domain analiz */}
            <div style={{ background: '#231f1a', borderRadius: '12px', padding: '6px 6px 6px 16px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', border: '1px solid #2a2520' }}>
              <span style={{ fontSize: '14px', color: '#4a4540' }}>🔍</span>
              <input
                type="text" placeholder="Alan adınızı girin... (ornek.com)"
                value={domain} onChange={e => setDomain(e.target.value)}
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px', color: '#fff', background: 'transparent', fontFamily: 'var(--font-body)' }}
              />
              <button onClick={() => scrollTo('iletisim')} style={{
                padding: '10px 20px', background: 'var(--orange)', color: '#fff',
                border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer',
                fontSize: '14px', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#ff6b1a'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--orange)'}
              >Analiz Et</button>
            </div>

            <button onClick={() => scrollTo('iletisim')} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              background: '#fff', color: '#1a1a1a',
              border: 'none', borderRadius: '50px', padding: '12px 24px',
              cursor: 'pointer', fontFamily: 'var(--font-body)',
              fontSize: '14px', fontWeight: 700, marginBottom: '20px',
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              <span style={{ width: '28px', height: '28px', background: 'var(--orange)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#fff', fontWeight: 800 }}>+</span>
              <span>Ücretsiz Teklif Alın</span>
              <span style={{ color: '#9a9a9a', fontSize: '12px', fontWeight: 400 }}>24 saat içinde dönüş</span>
              <span>→</span>
            </button>

            <p style={{ fontSize: '12px', color: '#4a4540' }}>✓ Bağlayıcı değil · İlk görüşme tamamen ücretsiz</p>
          </div>

          {/* Sağ — Google simülasyonu */}
          <div>
            <div style={{ background: '#231f1a', borderRadius: '16px', padding: '20px', border: '1px solid #2a2520', position: 'relative' }}>
              {/* Tarayıcı bar */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', alignItems: 'center' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3a3530' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3a3530' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3a3530' }}></div>
                <div style={{ flex: 1, background: '#2a2520', borderRadius: '6px', padding: '6px 12px', fontSize: '11px', color: '#4a4540', marginLeft: '8px' }}>
                  🔒 google.com/search?q=seo+danışmanı
                </div>
              </div>

              <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'var(--orange)', color: '#fff', borderRadius: '6px', padding: '5px 10px', fontSize: '11px', fontWeight: 700 }}>
                #1 Sonuç
              </div>

              {[
                { url: 'fatihemincakiroglu.com', baslik: 'Fatih Emin Çakıroğlu — SEO Uzmanı İstanbul', aciklama: '8 yıllık deneyim, 150+ mutlu müşteri. Ücretsiz SEO analizi için hemen iletişime geçin.', highlight: true },
                { url: 'rakip-ajans.com', baslik: 'SEO Ajansı — Dijital Pazarlama Hizmetleri', aciklama: 'SEO, SEM ve sosyal medya yönetimi hizmetleri...', highlight: false },
                { url: 'seo-firması.com', baslik: 'Profesyonel SEO Firması İstanbul', aciklama: 'Garantili sıralama vaat eden SEO çözümleri...', highlight: false },
              ].map((s, i) => (
                <div key={i} style={{ padding: '12px 0', borderBottom: i < 2 ? '1px solid #2a2520' : 'none', opacity: i === 0 ? 1 : 0.4 }}>
                  <div style={{ fontSize: '11px', color: '#4a4540', marginBottom: '2px' }}>{s.url}</div>
                  <div style={{ fontSize: '15px', color: i === 0 ? '#6eaaff' : '#6b6b6b', fontWeight: i === 0 ? 600 : 400, marginBottom: '3px' }}>{s.baslik}</div>
                  <div style={{ fontSize: '12px', color: '#4a4540', lineHeight: 1.4 }}>{s.aciklama}</div>
                </div>
              ))}

              <div style={{ marginTop: '14px', background: '#1a2a1a', border: '1px solid #2a4a2a', borderRadius: '8px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: '#4ade80', fontSize: '13px' }}>+312% görünürlük</strong>
                <span style={{ fontSize: '11px', color: '#4a4540' }}>son 90 gün · SEO sonrası</span>
              </div>
            </div>

            {/* Küçük stat kartları */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '12px' }}>
              {[
                { n: '150+', l: 'Müşteri' },
                { n: '8 yıl', l: 'Deneyim' },
                { n: '%98', l: 'Memnuniyet' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#231f1a', border: '1px solid #2a2520', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: 'var(--orange)' }}>{s.n}</div>
                  <div style={{ fontSize: '11px', color: '#4a4540', marginTop: '2px' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SEKTÖRLER BANDI ─────────────────────────────────────────── */}
      <section style={{ background: '#231f1a', borderTop: '1px solid #2a2520', borderBottom: '1px solid #2a2520', padding: '20px 32px' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: '10px', color: '#4a4540', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Çalışılan Sektörler</span>
          {['E-Ticaret', 'Hukuk', 'Sağlık', 'SaaS', 'Finans', 'Gayrimenkul', 'Eğitim', 'Medya'].map(s => (
            <span key={s} style={{ fontSize: '14px', fontWeight: 700, color: '#4a4540', letterSpacing: '-0.3px' }}>{s}</span>
          ))}
        </div>
      </section>

      {/* ── SAYILAR ───────────────────────────────────────────────────── */}
      <section style={{ padding: '64px 32px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', background: '#fff' }}>
            {[
              { n: 150, s: '+', l: 'Mutlu Müşteri', alt: '8 yılda toplam' },
              { n: 300, s: '%', l: 'Ort. Trafik Artışı', alt: 'Çalışmalarımızın ortalaması' },
              { n: 8, s: ' yıl', l: 'Sektör Deneyimi', alt: 'Aktif çalışma' },
              { n: 98, s: '%', l: 'Memnuniyet', alt: 'Müşteri geri dönüş oranı' },
            ].map((item, i) => (
              <Fade key={i} delay={i * 0.1}>
                <div style={{ padding: '40px 32px', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '44px', fontWeight: 800, color: 'var(--text)', lineHeight: 1, marginBottom: '6px' }}>
                    <Counter end={item.n} suffix={item.s} />
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>{item.l}</div>
                  <div style={{ fontSize: '12px', color: 'var(--dim2)' }}>{item.alt}</div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── HİZMETLER ────────────────────────────────────────────────── */}
      <section id="hizmetler" style={{ padding: '96px 32px', background: '#fff' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <Fade>
            <div style={{ marginBottom: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '4px', height: '32px', background: 'var(--orange)', borderRadius: '2px' }}></div>
                <span style={{ fontSize: '11px', color: 'var(--dim2)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>HİZMETLERİM</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: 'var(--text)', lineHeight: 1.15 }}>
                SEO ve dijital pazarlama<br />danışmanlık hizmetleri
              </h2>
            </div>
          </Fade>

          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
            {/* Sol liste */}
            <div style={{ borderRight: '1px solid var(--border)', background: '#faf8f5' }}>
              {HIZMETLER.map((h, i) => (
                <div key={i} onClick={() => setAktifHizmet(i)} style={{
                  padding: '16px 20px', cursor: 'pointer',
                  borderBottom: '1px solid var(--border)',
                  background: aktifHizmet === i ? '#fff' : 'transparent',
                  borderLeft: aktifHizmet === i ? '3px solid var(--orange)' : '3px solid transparent',
                  transition: 'all 0.2s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: aktifHizmet === i ? 'rgba(232,86,10,0.08)' : 'var(--bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>{h.ikon}</div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: aktifHizmet === i ? 'var(--text)' : 'var(--dim)' }}>{h.baslik}</div>
                        <div style={{ fontSize: '11px', color: 'var(--dim2)', marginTop: '1px' }}>{h.kisa}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--border)', fontWeight: 600 }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sağ detay */}
            <div style={{ padding: '40px', background: '#fff' }}>
              <span style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(232,86,10,0.08)', border: '1px solid rgba(232,86,10,0.15)', borderRadius: '4px', fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
                {HIZMETLER[aktifHizmet].baslik}
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: 800, marginBottom: '14px', color: 'var(--text)', lineHeight: 1.2 }}>{HIZMETLER[aktifHizmet].baslik}</h3>
              <p style={{ color: 'var(--dim)', fontSize: '15px', lineHeight: 1.75, marginBottom: '24px' }}>{HIZMETLER[aktifHizmet].detay}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                {HIZMETLER[aktifHizmet].maddeler.map(m => (
                  <li key={m} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text)' }}>
                    <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(232,86,10,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--orange)', display: 'block' }}></span>
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => scrollTo('iletisim')} style={{ padding: '11px 24px', background: 'var(--orange)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '14px', fontFamily: 'var(--font-body)', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#ff6b1a'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--orange)'}
                >Teklif Al →</button>
                <button onClick={() => scrollTo('iletisim')} style={{ padding: '11px 24px', background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
                  Ücretsiz Audit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BAŞARI HİKAYELERİ ─────────────────────────────────────────── */}
      <section id="basari" style={{ padding: '96px 32px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <Fade>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ width: '4px', height: '32px', background: 'var(--orange)', borderRadius: '2px' }}></div>
                  <span style={{ fontSize: '11px', color: 'var(--dim2)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>VAKA ÇALIŞMALARI</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: 'var(--text)', lineHeight: 1.15 }}>
                  Başarı <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>Hikayeleri</span>
                </h2>
                <p style={{ color: 'var(--dim)', fontSize: '15px', maxWidth: '500px', marginTop: '8px' }}>Ölçülebilir büyüme: teknik SEO, içerik ve dijital pazarlama ile elde edilen somut sonuçlar.</p>
              </div>
              <button onClick={() => scrollTo('iletisim')} style={{ padding: '12px 24px', background: 'var(--text)', color: '#fff', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 600, fontSize: '14px', fontFamily: 'var(--font-body)' }}>
                Sizin için ne yapabilirim? →
              </button>
            </div>
          </Fade>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
            {BASARI.map((v, i) => (
              <Fade key={i} delay={i * 0.1}>
                <div style={{ background: v.renk, borderRadius: '16px', padding: '28px', border: '1px solid rgba(0,0,0,0.06)', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                    <span style={{ fontSize: '22px', fontWeight: 800, color: v.aksan, opacity: 0.4 }}>{v.no}</span>
                    <span style={{ fontSize: '12px', color: v.aksan, opacity: 0.5 }}>Vaka</span>
                  </div>
                  <div style={{ display: 'inline-block', background: v.aksan, color: '#fff', borderRadius: '4px', padding: '5px 10px', fontSize: '11px', fontWeight: 700, marginBottom: '12px' }}>{v.konu}</div>
                  <div style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>{v.marka}</div>
                  <div style={{ fontSize: '13px', color: 'var(--dim)', lineHeight: 1.6 }}>{v.sonuc}</div>
                  <div style={{ marginTop: '16px', fontSize: '13px', color: v.aksan, fontWeight: 600 }}>Detayları incele →</div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── REFERANSLAR ──────────────────────────────────────────────── */}
      <section style={{ padding: '96px 32px', background: '#fff' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <Fade>
            <div style={{ marginBottom: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '4px', height: '32px', background: 'var(--orange)', borderRadius: '2px' }}></div>
                <span style={{ fontSize: '11px', color: 'var(--dim2)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>MÜŞTERİ YORUMLARI</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: 'var(--text)' }}>
                Müşterilerimin<br />SEO Deneyimi
              </h2>
            </div>
          </Fade>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Fade>
              <div style={{ background: 'var(--bg)', borderRadius: '16px', padding: '40px', border: '1px solid var(--border)', gridRow: 'span 2' }}>
                <div style={{ fontSize: '48px', color: 'var(--orange)', marginBottom: '16px', fontFamily: 'var(--font-display)', lineHeight: 1 }}>"</div>
                <p style={{ fontSize: '20px', fontWeight: 700, lineHeight: 1.5, color: 'var(--text)', marginBottom: '28px', fontFamily: 'var(--font-display)' }}>{REFERANSLAR[0].yorum}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '18px' }}>{REFERANSLAR[0].isim[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>{REFERANSLAR[0].isim}</div>
                    <div style={{ fontSize: '12px', color: 'var(--dim2)' }}>{REFERANSLAR[0].unvan} · {REFERANSLAR[0].sirket}</div>
                  </div>
                </div>
              </div>
            </Fade>
            {REFERANSLAR.slice(1).map((r, i) => (
              <Fade key={i} delay={0.1 + i * 0.1}>
                <div style={{ background: 'var(--bg)', borderRadius: '16px', padding: '28px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>{r.isim[0]}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '13px' }}>{r.isim}</div>
                      <div style={{ fontSize: '11px', color: 'var(--dim2)' }}>{r.unvan} · {r.sirket}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--dim)', lineHeight: 1.7 }}>{r.yorum}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── HAKKIMDA ─────────────────────────────────────────────────── */}
      <section id="hakkimda" style={{ padding: '96px 32px', background: '#1a1612' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <Fade>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '4px', height: '32px', background: 'var(--orange)', borderRadius: '2px' }}></div>
                <span style={{ fontSize: '11px', color: '#4a4540', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>HAKKIMDA</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: '20px' }}>
                8 yıldır işletmelerin<br />dijital büyümesini<br />hızlandırıyorum
              </h2>
              <p style={{ color: '#6b6b6b', fontSize: '15px', lineHeight: 1.85, marginBottom: '24px' }}>
                SEO, e-ticaret ve dijital pazarlama alanlarında uzmanlaşmış bir danışman olarak her müşterime özel strateji geliştiriyorum. Google algoritmalarını, kullanıcı davranışını ve dönüşüm psikolojisini bir arada kullanarak somut sonuçlar üretiyorum.
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
                {['SEO', 'E-Ticaret', 'Google Ads', 'Meta Ads', 'Analytics', 'CRO', 'Backlink', 'İçerik'].map(t => (
                  <span key={t} style={{ padding: '6px 14px', borderRadius: '20px', border: '1px solid #2a2520', fontSize: '13px', color: '#6b6b6b' }}>{t}</span>
                ))}
              </div>
              <button onClick={() => scrollTo('iletisim')} style={{ padding: '13px 28px', background: 'var(--orange)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '15px', fontFamily: 'var(--font-body)', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#ff6b1a'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--orange)'}
              >Birlikte Çalışalım →</button>
            </div>
          </Fade>
          <Fade delay={0.2}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { n: '+312%', l: 'Ort. Trafik Artışı', s: 'Tüm çalışmaların ortalaması' },
                { n: '150+', l: 'Tamamlanan Proje', s: '8 yılda toplam' },
                { n: '%98', l: 'Müşteri Memnuniyeti', s: 'Geri dönüş oranı' },
                { n: '8 yıl', l: 'Sektör Deneyimi', s: 'Aktif çalışma' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#231f1a', border: '1px solid #2a2520', borderRadius: '12px', padding: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: 800, color: 'var(--orange)', marginBottom: '6px' }}>{s.n}</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>{s.l}</div>
                  <div style={{ fontSize: '11px', color: '#4a4540' }}>{s.s}</div>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* ── ARAÇLAR ──────────────────────────────────────────────────── */}
      <section style={{ padding: '40px 32px', background: '#111', borderTop: '1px solid #1a1612' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div style={{ fontSize: '10px', color: '#2a2520', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', textAlign: 'center' }}>KULLANDIĞIM ARAÇLAR</div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {ARACLAR.map(a => (
              <span key={a} style={{ fontSize: '14px', fontWeight: 700, color: '#3a3530', padding: '8px 18px', border: '1px solid #2a2520', borderRadius: '8px' }}>{a}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '96px 32px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <Fade>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ width: '4px', height: '32px', background: 'var(--orange)', borderRadius: '2px' }}></div>
                  <span style={{ fontSize: '11px', color: 'var(--dim2)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>BLOG</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: 'var(--text)' }}>
                  SEO'nun <span style={{ fontStyle: 'italic', color: 'var(--orange)' }}>sanatı</span>,<br />haftalık notlar
                </h2>
              </div>
              <Link href="/blog">
                <button style={{ padding: '11px 22px', background: 'var(--text)', color: '#fff', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 600, fontSize: '14px', fontFamily: 'var(--font-body)' }}>Tüm yazılar →</button>
              </Link>
            </div>
          </Fade>

          <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr 120px 80px', padding: '12px 24px', borderBottom: '2px solid var(--orange)' }}>
              {['#', 'BAŞLIK', 'ETİKET', 'SÜRE'].map((h, i) => (
                <div key={i} style={{ fontSize: '11px', color: 'var(--dim2)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>{h}</div>
              ))}
            </div>
            {BLOG_POSTS.map((post, i) => (
              <Link key={i} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr 120px 80px', padding: '18px 24px', borderBottom: i < BLOG_POSTS.length - 1 ? '1px solid #f5f0e8' : 'none', transition: 'background 0.15s', alignItems: 'center' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#faf8f5'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}
                >
                  <div style={{ fontSize: '14px', color: 'var(--border)', fontWeight: 700 }}>{post.no}</div>
                  <div style={{ fontSize: '15px', color: 'var(--text)', fontWeight: 500, paddingRight: '16px' }}>{post.baslik}</div>
                  <div>
                    <span style={{ padding: '3px 10px', borderRadius: '4px', background: 'rgba(232,86,10,0.08)', color: 'var(--orange)', fontSize: '11px', fontWeight: 700 }}>{post.etiket}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--orange)', fontWeight: 600 }}>{post.sure} →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── İLETİŞİM ─────────────────────────────────────────────────── */}
      <section id="iletisim" style={{ padding: '96px 32px', background: '#1a1612' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Fade>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', border: '1px solid #2a2520', background: '#231f1a', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#6b6b6b', textTransform: 'uppercase', marginBottom: '20px' }}>
                ÜCRETSİZ DANIŞMA
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>Ücretsiz keşif görüşmesi</h2>
              <p style={{ color: '#6b6b6b', fontSize: '16px', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
                Hedeflerinizi ve mevcut durumunuzu birlikte değerlendirip size özel yol haritası oluşturuyorum. İş günlerinde 24 saat içinde dönüş garantisi.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
                {['8+ yıl deneyim', '150+ marka', 'Bağlayıcı olmayan ilk görüşme'].map(b => (
                  <span key={b} style={{ padding: '5px 14px', borderRadius: '20px', border: '1px solid #2a2520', fontSize: '12px', color: '#6b6b6b' }}>{b}</span>
                ))}
              </div>
            </div>
          </Fade>

          <Fade delay={0.1}>
            {formStatus === 'sent' ? (
              <div style={{ textAlign: 'center', padding: '60px', background: '#231f1a', borderRadius: '16px', border: '1px solid #2a2520' }}>
                <div style={{ fontSize: '56px', marginBottom: '16px' }}>✅</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#fff', marginBottom: '10px' }}>Mesajınız alındı!</h3>
                <p style={{ color: '#6b6b6b' }}>En kısa sürede size dönüş yapacağım.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px' }}>
                {/* Form */}
                <form onSubmit={handleSubmit} style={{ background: '#231f1a', borderRadius: '16px', padding: '36px', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid #2a2520' }}>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>Projeniz hakkında bilgi verin</h3>

                  {/* Hizmet seçimi */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#6b6b6b', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Hangi hizmete ihtiyacınız var?</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {['SEO & Arama', 'E-Ticaret', 'Dijital Pazarlama', 'SEO Audit'].map(h => (
                        <button key={h} type="button" onClick={() => setFormData({ ...formData, hizmet: h })} style={{
                          padding: '10px 14px', borderRadius: '8px', fontSize: '13px', fontFamily: 'var(--font-body)',
                          border: formData.hizmet === h ? '1px solid var(--orange)' : '1px solid #2a2520',
                          background: formData.hizmet === h ? 'rgba(232,86,10,0.1)' : 'transparent',
                          color: formData.hizmet === h ? 'var(--orange)' : '#6b6b6b',
                          cursor: 'pointer', fontWeight: formData.hizmet === h ? 600 : 400,
                          textAlign: 'left', transition: 'all 0.15s',
                        }}>{h}</button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {[
                      { id: 'ad', label: 'Ad Soyad', placeholder: 'Adınız', type: 'text' },
                      { id: 'email', label: 'E-posta', placeholder: 'ornek@mail.com', type: 'email' },
                    ].map(f => (
                      <div key={f.id}>
                        <label style={{ display: 'block', fontSize: '12px', color: '#6b6b6b', marginBottom: '6px', fontWeight: 600 }}>{f.label}</label>
                        <input type={f.type} placeholder={f.placeholder} required value={formData[f.id]} onChange={e => setFormData({ ...formData, [f.id]: e.target.value })} style={{ width: '100%', padding: '11px 14px', background: '#1a1612', border: '1px solid #2a2520', borderRadius: '8px', color: '#fff', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none' }} />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#6b6b6b', marginBottom: '6px', fontWeight: 600 }}>Alan adınız</label>
                    <input type="text" placeholder="siteniz.com" value={formData.telefon} onChange={e => setFormData({ ...formData, telefon: e.target.value })} style={{ width: '100%', padding: '11px 14px', background: '#1a1612', border: '1px solid #2a2520', borderRadius: '8px', color: '#fff', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#6b6b6b', marginBottom: '6px', fontWeight: 600 }}>Mesajınız</label>
                    <textarea placeholder="Projeniz veya hedefiniz hakkında kısaca bilgi verin..." rows={4} required value={formData.mesaj} onChange={e => setFormData({ ...formData, mesaj: e.target.value })} style={{ width: '100%', padding: '11px 14px', background: '#1a1612', border: '1px solid #2a2520', borderRadius: '8px', color: '#fff', fontSize: '14px', fontFamily: 'var(--font-body)', resize: 'vertical', outline: 'none' }} />
                  </div>
                  <button type="submit" disabled={formStatus === 'sending'} style={{ padding: '14px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', opacity: formStatus === 'sending' ? 0.7 : 1, transition: 'background 0.2s' }}
                    onMouseEnter={e => { if (formStatus !== 'sending') e.currentTarget.style.background = '#ff6b1a'; }}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--orange)'}
                  >
                    {formStatus === 'sending' ? 'Gönderiliyor...' : 'Sonraki → Form Gönder'}
                  </button>
                </form>

                {/* Sağ bilgi paneli */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ background: '#231f1a', border: '1px solid #2a2520', borderRadius: '12px', padding: '24px' }}>
                    <div style={{ fontSize: '11px', color: '#4a4540', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>NASIL İLERLERİZ?</div>
                    {[
                      { no: '1', baslik: 'Formu doldurun', alt: 'Kısa ihtiyaç formu', sure: '~2 dk' },
                      { no: '2', baslik: 'Ön değerlendirme', alt: 'Öncelik ve kapsam analizi', sure: '24 saat' },
                      { no: '3', baslik: 'Keşif görüşmesi', alt: 'Hedefe net yol haritası', sure: '30 dk' },
                    ].map(s => (
                      <div key={s.no} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '12px', flexShrink: 0 }}>{s.no}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{s.baslik}</div>
                          <div style={{ fontSize: '12px', color: '#6b6b6b' }}>{s.alt}</div>
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 600, padding: '2px 8px', background: 'rgba(232,86,10,0.1)', borderRadius: '4px' }}>{s.sure}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: '#231f1a', border: '1px solid #2a2520', borderRadius: '12px', padding: '24px' }}>
                    <div style={{ fontSize: '11px', color: '#4a4540', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>İLETİŞİM</div>
                    <div style={{ fontSize: '13px', color: '#6b6b6b', marginBottom: '6px' }}>✉️ info@fatihemincakiroglu.com</div>
                    <div style={{ fontSize: '13px', color: '#6b6b6b', marginBottom: '6px' }}>📍 İstanbul</div>
                    <div style={{ fontSize: '13px', color: '#6b6b6b' }}>⏰ Pzt–Cum 09:00–18:00</div>
                  </div>
                </div>
              </div>
            )}
          </Fade>
        </div>
      </section>
    </>
  );
}
