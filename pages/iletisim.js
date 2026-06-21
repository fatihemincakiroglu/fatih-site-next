import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';

export default function Page() {
  const [form, setForm] = useState({ ad: '', email: '', konu: '', mesaj: '' });
  const [gonderildi, setGonderildi] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise(r => setTimeout(r, 1000));
    setGonderildi(true);
  };

  return (
    <>
      <Head>
        <title>İletişim | Fatih Emin Çakıroğlu</title>
        <meta name="description" content="Fatih Emin Çakıroğlu ile iletişime geçin. Ücretsiz SEO danışmanlığı görüşmesi için randevu alın veya mesaj gönderin." />
        <link rel="canonical" href="https://fatihemincakiroglu.com/iletisim" />

        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "ContactPage", "name": "İletişim", "url": "https://fatihemincakiroglu.com/iletisim", "description": "Fatih Emin Çakıroğlu ile iletişime geçin.", "mainEntity": {"@type": "Person", "name": "Fatih Emin Çakıroğlu", "email": "info@fatihemincakiroglu.com", "address": {"@type": "PostalAddress", "addressLocality": "İstanbul", "addressCountry": "TR"}, "sameAs": ["https://www.linkedin.com/in/fatihemincakiroglu/"]}})}</script>
        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://fatihemincakiroglu.com"}, {"@type": "ListItem", "position": 2, "name": "İletişim", "item": "https://fatihemincakiroglu.com/iletisim"}]})}</script>
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>Ana Sayfa</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>İletişim</span>
          </div>
        </div>

        <div style={{ background: '#1a1612', padding: '80px 32px 64px', textAlign: 'center' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>İLETİŞİM</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '16px' }}>
              Birlikte<br /><span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>çalışalım</span>
            </h1>
            <p style={{ color: '#9a9a9a', fontSize: '17px', lineHeight: 1.7 }}>İlk görüşmede projenizi değerlendirip size özel bir strateji sunuyorum. Bağlayıcı değil, tamamen ücretsiz.</p>
          </div>
        </div>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 32px 96px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px' }}>
            {gonderildi ? (
              <div style={{ background: '#fff', borderRadius: '16px', padding: '60px', textAlign: 'center', border: '1px solid #eee' }}>
                <div style={{ fontSize: '56px', marginBottom: '16px' }}>✅</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#111', marginBottom: '10px' }}>Mesajınız alındı!</h2>
                <p style={{ color: '#777' }}>En kısa sürede size dönüş yapacağım.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: '16px', padding: '36px', border: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#111', marginBottom: '4px' }}>Mesaj gönderin</h2>
                {[
                  { id: 'ad', label: 'Ad Soyad *', type: 'text', placeholder: 'Adınız ve soyadınız' },
                  { id: 'email', label: 'E-posta *', type: 'email', placeholder: 'ornek@mail.com' },
                  { id: 'konu', label: 'Konu', type: 'text', placeholder: 'SEO danışmanlığı, Teknik SEO...' },
                ].map(f => (
                  <div key={f.id}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#555', marginBottom: '6px' }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} required={f.label.includes('*')} value={form[f.id]} onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#555', marginBottom: '6px' }}>Mesajınız *</label>
                  <textarea required rows={5} placeholder="Projeniz veya hedefiniz hakkında kısaca bilgi verin..." value={form.mesaj} onChange={e => setForm({ ...form, mesaj: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', fontFamily: 'var(--font-body)', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <button type="submit" style={{ padding: '14px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                  Gönder →
                </button>
              </form>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#1a1612', borderRadius: '12px', padding: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>İLETİŞİM BİLGİLERİ</h3>
                <a href="mailto:info@fatihemincakiroglu.com" style={{ display: 'flex', gap: '10px', color: '#9a9a9a', fontSize: '14px', textDecoration: 'none', marginBottom: '12px' }}>
                  <span>✉️</span> info@fatihemincakiroglu.com
                </a>
                <div style={{ display: 'flex', gap: '10px', color: '#9a9a9a', fontSize: '14px', marginBottom: '12px' }}>
                  <span>📍</span> İstanbul
                </div>
                <div style={{ display: 'flex', gap: '10px', color: '#9a9a9a', fontSize: '14px', marginBottom: '16px' }}>
                  <span>⏰</span> Pzt–Cum 09:00–18:00
                </div>
                <a href="https://www.linkedin.com/in/fatihemincakiroglu/" target="_blank" rel="noreferrer" style={{ display: 'flex', gap: '10px', color: '#9a9a9a', fontSize: '14px', textDecoration: 'none' }}>
                  <span>🔗</span> LinkedIn Profili →
                </a>
              </div>
              <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid #eee' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '16px' }}>SÜREÇ</h3>
                {[
                  { no: '1', baslik: 'Form Gönderin', alt: '~2 dakika', sure: '~2 dk' },
                  { no: '2', baslik: 'Ön Değerlendirme', alt: 'Öncelik analizi', sure: '24 saat' },
                  { no: '3', baslik: 'Keşif Görüşmesi', alt: 'Yol haritası', sure: '30 dk' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '11px', flexShrink: 0 }}>{s.no}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#111' }}>{s.baslik}</div>
                      <div style={{ fontSize: '12px', color: '#aaa' }}>{s.alt}</div>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 600 }}>{s.sure}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "iletisim"])),
    },
  }
}
