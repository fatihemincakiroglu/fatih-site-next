import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

export default function Page() {
  const router = useRouter()
  const isEn = router.locale === 'en'
  const [form, setForm] = useState({ isim: '', email: '', konu: '', mesaj: '' })
  const t = {
    title: isEn ? 'Contact | Fatih Emin Çakıroğlu' : 'İletişim | Fatih Emin Çakıroğlu',
    badge: isEn ? 'CONTACT' : 'İLETİŞİM',
    h1: isEn ? 'Get in Touch' : 'İletişime Geçin',
    desc: isEn ? 'Book a free SEO discovery call or send a message.' : 'Ücretsiz SEO keşif görüşmesi için randevu alın veya mesaj gönderin.',
    breadcrumb: isEn ? ['Home', 'Contact'] : ['Ana Sayfa', 'İletişim'],
    form: {
      isim: isEn ? 'Full Name' : 'Ad Soyad',
      email: isEn ? 'Email Address' : 'E-posta Adresi',
      konu: isEn ? 'Subject' : 'Konu',
      mesaj: isEn ? 'Your Message' : 'Mesajınız',
      btn: isEn ? 'Send Message →' : 'Mesaj Gönder →',
    },
    info: [
      { label: isEn ? 'Location' : 'Konum', val: 'İstanbul, Türkiye' },
      { label: isEn ? 'Response Time' : 'Yanıt Süresi', val: isEn ? 'Within 24 hours' : '24 saat içinde' },
      { label: isEn ? 'Languages' : 'Diller', val: isEn ? 'Turkish, English' : 'Türkçe, İngilizce' },
    ],
    randevuTitle: isEn ? 'Or book a call' : 'Veya randevu alın',
    randevuDesc: isEn ? 'Free 30-minute discovery call.' : 'Ücretsiz 30 dakikalık keşif görüşmesi.',
    randevuBtn: isEn ? 'Book a Call →' : 'Randevu Al →',
  }
  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={isEn ? 'Get in touch with Fatih Emin Çakıroğlu. Book a free SEO consulting session.' : 'Fatih Emin Çakıroğlu ile iletişime geçin. Ücretsiz SEO danışmanlığı için randevu alın.'} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/iletisim' : 'https://fatihemincakiroglu.com/iletisim'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/iletisim" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/iletisim" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/iletisim" />
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[0]}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{t.breadcrumb[1]}</span>
          </div>
        </div>
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '48px 32px 40px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>{t.badge}</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#111', marginBottom: '12px' }}>{t.h1}</h1>
            <p style={{ color: '#777', fontSize: '16px' }}>{t.desc}</p>
          </div>
        </div>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '48px 32px 96px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '40px', alignItems: 'start' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', border: '1px solid #eee' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[{id:'isim',label:t.form.isim,type:'text'},{id:'email',label:t.form.email,type:'email'},{id:'konu',label:t.form.konu,type:'text'}].map(f => (
                <div key={f.id}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#555', marginBottom: '6px' }}>{f.label}</label>
                  <input type={f.type} value={form[f.id]} onChange={e => setForm({...form, [f.id]: e.target.value})}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none' }} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#555', marginBottom: '6px' }}>{t.form.mesaj}</label>
                <textarea rows={5} value={form.mesaj} onChange={e => setForm({...form, mesaj: e.target.value})}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical' }} />
              </div>
              <button style={{ padding: '14px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>{t.form.btn}</button>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #eee' }}>
              {t.info.map((item, i) => (
                <div key={i} style={{ marginBottom: i < t.info.length-1 ? '16px' : 0, paddingBottom: i < t.info.length-1 ? '16px' : 0, borderBottom: i < t.info.length-1 ? '1px solid #f0f0f0' : 'none' }}>
                  <div style={{ fontSize: '11px', color: '#aaa', fontWeight: 700, marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ fontSize: '14px', color: '#333', fontWeight: 600 }}>{item.val}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#111', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#fff', marginBottom: '8px' }}>{t.randevuTitle}</h3>
              <p style={{ color: '#6b6b6b', fontSize: '13px', marginBottom: '16px' }}>{t.randevuDesc}</p>
              <Link href={isEn?'/en/book-a-call':'/randevu'}><button style={{ width: '100%', padding: '11px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>{t.randevuBtn}</button></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps() { return { props: {} } }
