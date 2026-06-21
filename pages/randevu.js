import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

const HİZMETLER = [
  { id: 'seo', ikon: '🔍', baslik: 'SEO & Arama', alt: 'Teknik SEO, içerik, sıralama' },
  { id: 'geo', ikon: '✦', baslik: 'AI & GEO', alt: 'AI Overview, LLM görünürlük' },
  { id: 'icerik', ikon: '📄', baslik: 'İçerik & Otorite', alt: 'İçerik stratejisi, konu otoritesi' },
  { id: 'backlink', ikon: '🔗', baslik: 'Backlink & Dijital PR', alt: 'Otorite inşası, editoryal link' },
  { id: 'performans', ikon: '📈', baslik: 'Performans & Growth', alt: 'Büyüme yönetimi, KPI' },
  { id: 'audit', ikon: '🔎', baslik: 'Site Audit', alt: 'Teknik denetim, aksiyon planı' },
  { id: 'migration', ikon: '🔄', baslik: 'SEO Migration', alt: 'Site taşıma, trafik koruma' },
  { id: 'diger', ikon: '❓', baslik: 'Diğer / Bilmiyorum', alt: 'Birlikte belirleyelim' },
];

const BÜTÇELER = [
  'Henüz Belirlemedim',
  '5.000 – 10.000 ₺ / ay',
  '10.000 – 20.000 ₺ / ay',
  '20.000 – 50.000 ₺ / ay',
  '50.000 ₺+ / ay',
];

const REFERANSLAR = ['kariyer.net', 'Hepsiburada', 'hepsiEmlak', 'Turkish Airlines', 'obilet'];

export default function Page() {
    const router = useRouter()
  const [adim, setAdim] = useState(1);
  const [seciliHizmetler, setSeciliHizmetler] = useState([]);
  const [butce, setButce] = useState('Henüz Belirlemedim');
  const [form, setForm] = useState({ ad: '', email: '', sirket: '', telefon: '', mesaj: '' });
  const [gonderildi, setGonderildi] = useState(false);
  const [gonderiyor, setGonderiyor] = useState(false);

  const toggleHizmet = (id) => {
    setSeciliHizmetler(prev => prev.includes(id) ? prev.filter(h => h !== id) : [...prev, id]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGonderiyor(true);
    await new Promise(r => setTimeout(r, 1500));
    setGonderildi(true);
  };

  if (gonderildi) return (
    <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#1a1612', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>Ana Sayfa</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>Randevu</span>
          </div>
        </div>

      <div style={{ textAlign: 'center', padding: '60px 40px', maxWidth: '480px' }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#fff', marginBottom: '12px' }}>Talebiniz alındı!</h2>
        <p style={{ color: '#6b6b6b', fontSize: '16px', lineHeight: 1.6, marginBottom: '24px' }}>İş günlerinde 24 saat içinde size dönüş yapacağım. E-postanızı kontrol etmeyi unutmayın.</p>
        <div style={{ padding: '16px', background: '#231f1a', borderRadius: '10px', border: '1px solid #2a2520', fontSize: '14px', color: '#6b6b6b' }}>
          ✉️ info@fatihemincakiroglu.com
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>{router.locale === 'en' ? 'Book a Call | Fatih Emin Çakıroğlu' : 'Randevu | Fatih Emin Çakıroğlu'}</title>
        <meta name="description" content={router.locale === 'en' ? 'Book a free SEO discovery call.' : 'Ücretsiz SEO keşif görüşmesi için randevu alın.'} />
        <link rel="canonical" href={router.locale === 'en' ? 'https://fatihemincakiroglu.com/en/randevu' : 'https://fatihemincakiroglu.com/randevu'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/randevu" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/randevu" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/randevu" />
        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "Service", "name": "Ücretsiz SEO Keşif Görüşmesi", "url": "https://fatihemincakiroglu.com/randevu", "description": "Ücretsiz SEO ve GEO keşif görüşmesi için randevu alın.", "provider": {"@id": "https://fatihemincakiroglu.com/#person"}, "offers": {"@type": "Offer", "price": "0", "priceCurrency": "TRY", "availability": "https://schema.org/InStock", "name": "Ücretsiz Keşif Görüşmesi"}})}</script>
        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://fatihemincakiroglu.com"}, {"@type": "ListItem", "position": 2, "name": "Randevu", "item": "https://fatihemincakiroglu.com/randevu"}]})}</script>
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'calc(var(--nav-h) + 40px) 32px 96px' }}>

        {/* Üst başlık */}
        <div style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '600px' }}>
          <div style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
            FATİH EMİN İLE PREMİUM KEŞİF HATTI
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', marginBottom: '12px', lineHeight: 1.15 }}>
            Ücretsiz keşif görüşmesi
          </h1>
          <p style={{ color: '#6b6b6b', fontSize: '15px', lineHeight: 1.7 }}>
            Hedeflerinizi ve mevcut durumunuzu birlikte değerlendirip sizin için en doğru yol haritasını netleştirelim. Formu kısa sürede doldurun, iş günlerinde <span style={{ color: 'var(--orange)', fontWeight: 600 }}>24 saat</span> içinde size dönüş yapalım.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
            {['8+ yıl deneyim', '150+ marka referansı', 'Bağlayıcı olmayan ilk görüşme'].map(b => (
              <span key={b} style={{ padding: '5px 14px', borderRadius: '20px', border: '1px solid #2a2520', fontSize: '12px', color: '#6b6b6b' }}>{b}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px', width: '100%', maxWidth: '960px' }}>

          {/* Sol — Form */}
          <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden' }}>
            {/* Adım göstergesi */}
            <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', gap: '0', alignItems: 'center' }}>
              {[
                { no: 1, label: 'PROJENİZ' },
                { no: 2, label: 'İLETİŞİM' },
                { no: 3, label: 'DETAY' },
              ].map((a, i) => (
                <React.Fragment key={a.no}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      background: adim >= a.no ? 'var(--orange)' : 'var(--bg)',
                      border: adim >= a.no ? 'none' : '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 700,
                      color: adim >= a.no ? '#fff' : 'var(--dim2)',
                    }}>{a.no}</div>
                    <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: adim === a.no ? 'var(--text)' : 'var(--dim2)' }}>{a.label}</span>
                  </div>
                  {i < 2 && <div style={{ flex: 1, height: '1px', background: 'var(--border)', margin: '0 12px' }}></div>}
                </React.Fragment>
              ))}
            </div>

            <div style={{ padding: '32px 28px' }}>
              {adim === 1 && (
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', marginBottom: '6px' }}>Hangi konuda yardımcı olalım?</h2>
                  <p style={{ fontSize: '13px', color: 'var(--dim2)', marginBottom: '20px' }}>Birden fazla seçebilirsiniz.</p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '24px' }}>
                    {HİZMETLER.map(h => {
                      const secili = seciliHizmetler.includes(h.id);
                      return (
                        <button key={h.id} onClick={() => toggleHizmet(h.id)} style={{
                          padding: '16px 14px', borderRadius: '10px', cursor: 'pointer',
                          border: secili ? '1.5px solid var(--orange)' : '1px solid var(--border)',
                          background: secili ? 'rgba(232,86,10,0.04)' : '#fff',
                          textAlign: 'left', fontFamily: 'var(--font-body)',
                          transition: 'all 0.15s', position: 'relative',
                        }}>
                          {secili && <div style={{ position: 'absolute', top: '8px', right: '8px', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#fff', fontWeight: 700 }}>✓</div>}
                          <div style={{ fontSize: '20px', marginBottom: '8px' }}>{h.ikon}</div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>{h.baslik}</div>
                          <div style={{ fontSize: '11px', color: 'var(--dim2)' }}>{h.alt}</div>
                        </button>
                      );
                    })}
                  </div>

                  {seciliHizmetler.length === 0 && (
                    <p style={{ fontSize: '12px', color: 'var(--orange)', marginBottom: '16px' }}>Devam etmek için en az bir hizmet seçin.</p>
                  )}

                  {/* Bütçe */}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>Aylık bütçe aralığınız</label>
                      <span style={{ fontSize: '12px', color: 'var(--dim2)' }}>isteğe bağlı</span>
                    </div>
                    <select value={butce} onChange={e => setButce(e.target.value)} style={{
                      width: '100%', padding: '12px 14px', borderRadius: '8px',
                      border: '1px solid var(--border)', background: '#fff',
                      fontSize: '14px', color: 'var(--text)', fontFamily: 'var(--font-body)',
                      outline: 'none', cursor: 'pointer',
                    }}>
                      {BÜTÇELER.map(b => <option key={b}>{b}</option>)}
                    </select>
                  </div>

                  <button onClick={() => seciliHizmetler.length > 0 && setAdim(2)} style={{
                    width: '100%', padding: '14px', borderRadius: '8px',
                    background: seciliHizmetler.length > 0 ? 'var(--orange)' : 'var(--border)',
                    color: '#fff', border: 'none', fontWeight: 700, fontSize: '15px',
                    fontFamily: 'var(--font-body)', cursor: seciliHizmetler.length > 0 ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s',
                  }}>Sonraki →</button>
                </div>
              )}

              {adim === 2 && (
                <form onSubmit={e => { e.preventDefault(); setAdim(3); }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', marginBottom: '20px' }}>İletişim bilgileriniz</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                    {[
                      { id: 'ad', label: 'Ad Soyad *', placeholder: 'Adınız ve soyadınız', type: 'text', required: true },
                      { id: 'email', label: 'E-posta *', placeholder: 'is@sirketiniz.com', type: 'email', required: true },
                      { id: 'sirket', label: 'Şirket / Marka', placeholder: 'Şirket adı', type: 'text', required: false },
                      { id: 'telefon', label: 'Telefon', placeholder: '0xxx xxx xx xx', type: 'tel', required: false },
                    ].map(f => (
                      <div key={f.id}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>{f.label}</label>
                        <input type={f.type} placeholder={f.placeholder} required={f.required} value={form[f.id]} onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                          style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '14px', color: 'var(--text)', fontFamily: 'var(--font-body)', outline: 'none' }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="button" onClick={() => setAdim(1)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: '#fff', color: 'var(--dim)', fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>← Geri</button>
                    <button type="submit" style={{ flex: 2, padding: '12px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Sonraki →</button>
                  </div>
                </form>
              )}

              {adim === 3 && (
                <form onSubmit={handleSubmit}>
                  <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', marginBottom: '6px' }}>Projeniz hakkında detaylar</h2>
                  <p style={{ fontSize: '13px', color: 'var(--dim2)', marginBottom: '20px' }}>Ne kadar detay verirseniz o kadar isabetli bir değerlendirme yapabilirim.</p>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>Alan adınız</label>
                    <input type="text" placeholder="siteniz.com" style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '14px', color: 'var(--text)', fontFamily: 'var(--font-body)', outline: 'none' }} />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>Mesajınız *</label>
                    <textarea required rows={5} placeholder="Projeniz, hedefleriniz veya karşılaştığınız sorunlar hakkında kısaca bilgi verin..." value={form.mesaj} onChange={e => setForm({ ...form, mesaj: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '14px', color: 'var(--text)', fontFamily: 'var(--font-body)', resize: 'vertical', outline: 'none' }} />
                  </div>
                  {/* Özet */}
                  <div style={{ background: 'var(--bg)', borderRadius: '8px', padding: '14px', marginBottom: '16px', fontSize: '13px', color: 'var(--dim)', lineHeight: 1.6 }}>
                    <strong style={{ color: 'var(--text)' }}>Seçimleriniz:</strong> {seciliHizmetler.map(id => HİZMETLER.find(h => h.id === id)?.baslik).join(', ')}
                    {butce !== 'Henüz Belirlemedim' && <div><strong style={{ color: 'var(--text)' }}>Bütçe:</strong> {butce}</div>}
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="button" onClick={() => setAdim(2)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: '#fff', color: 'var(--dim)', fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>← Geri</button>
                    <button type="submit" disabled={gonderiyor} style={{ flex: 2, padding: '12px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'var(--font-body)', opacity: gonderiyor ? 0.7 : 1 }}>
                      {gonderiyor ? 'Gönderiliyor...' : 'Talebi Gönder ✓'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Sağ bilgi paneli */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Nasıl ilerleriz */}
            <div style={{ background: '#1a1612', border: '1px solid #2a2520', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '11px', color: '#4a4540', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>NASIL İLERLERİZ?</div>
              {[
                { no: '1', baslik: 'Form', alt: 'Kısa ihtiyaç formu', sure: '~2 DK' },
                { no: '2', baslik: 'Ön değerlendirme', alt: 'Öncelik ve kapsam analizi', sure: '24 SAAT' },
                { no: '3', baslik: 'Keşif', alt: 'Hedefe net yol haritası', sure: '30 DK' },
              ].map((s, i) => (
                <div key={s.no} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: i < 2 ? '16px' : '0', position: 'relative' }}>
                  {i < 2 && <div style={{ position: 'absolute', left: '13px', top: '28px', width: '1px', height: 'calc(100% + 4px)', background: '#2a2520' }}></div>}
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '12px', flexShrink: 0, zIndex: 1 }}>{s.no}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{s.baslik}</div>
                    <div style={{ fontSize: '12px', color: '#6b6b6b' }}>{s.alt}</div>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, padding: '3px 8px', background: 'rgba(232,86,10,0.1)', borderRadius: '4px', flexShrink: 0 }}>{s.sure}</span>
                </div>
              ))}
            </div>

            {/* Güven */}
            <div style={{ background: '#1a1612', border: '1px solid #2a2520', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '11px', color: '#4a4540', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px' }}>GÜVEN</div>
              <p style={{ fontSize: '13px', color: '#6b6b6b', lineHeight: 1.6, marginBottom: '12px' }}>Kanıtlanmış deneyim: 8+ yıl, 150+ marka ile çalışma pratiği.</p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {['8+ yıl', '150+ marka', 'Kurumsal referans'].map(b => (
                  <span key={b} style={{ padding: '4px 10px', borderRadius: '4px', background: '#231f1a', border: '1px solid #2a2520', fontSize: '11px', color: '#6b6b6b' }}>{b}</span>
                ))}
              </div>
              <div style={{ fontSize: '11px', color: '#4a4540', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>ÇALIŞMA MODELİ</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {['Retainer', 'Şeffaf süreç', 'Bağlayıcı değil'].map(b => (
                  <span key={b} style={{ padding: '4px 10px', borderRadius: '4px', background: '#231f1a', border: '1px solid #2a2520', fontSize: '11px', color: '#6b6b6b' }}>{b}</span>
                ))}
              </div>
            </div>

            {/* İletişim */}
            <div style={{ background: '#1a1612', border: '1px solid #2a2520', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '11px', color: '#4a4540', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>İLETİŞİM</div>
              <div style={{ fontSize: '13px', color: '#6b6b6b', marginBottom: '8px' }}>✉️ info@fatihemincakiroglu.com</div>
              <div style={{ fontSize: '13px', color: '#6b6b6b', marginBottom: '8px' }}>📍 İstanbul</div>
              <div style={{ fontSize: '13px', color: '#6b6b6b' }}>⏰ Pzt–Cum 08:00–18:00</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() { return { props: {} } }
