import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const [form, setForm] = useState({ isim: '', email: '', telefon: '', konu: '', mesaj: '', website: '' })
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.isim || !form.email || !form.mesaj) {
      setStatus('error')
      setErrorMsg(isEn ? 'Please fill in your name, email and message.' : 'Lütfen ad, e-posta ve mesaj alanlarını doldurun.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus('error')
      setErrorMsg(isEn ? 'Please enter a valid email address.' : 'Lütfen geçerli bir e-posta adresi girin.')
      return
    }
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setStatus('done')
      setForm({ isim: '', email: '', telefon: '', konu: '', mesaj: '', website: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(isEn ? 'Something went wrong. Please try again or email us directly.' : 'Bir şeyler ters gitti. Lütfen tekrar deneyin veya doğrudan e-posta gönderin.')
    }
  }

  const t = {
    title: isEn ? 'Contact | Fatih Emin Çakıroğlu SEO Consultant' : 'İletişim | Fatih Emin Çakıroğlu SEO Danışmanı',
    badge: isEn ? 'CONTACT' : 'İLETİŞİM',
    h1: isEn ? 'Get in Touch' : 'İletişime Geçin',
    desc: isEn ? 'Book a free SEO discovery call or send a message.' : 'Ücretsiz SEO keşif görüşmesi için randevu alın veya mesaj gönderin.',
    breadcrumb: isEn ? ['Home', 'Contact'] : ['Ana Sayfa', 'İletişim'],
    form: {
      isim: isEn ? 'Full Name' : 'Ad Soyad',
      email: isEn ? 'Email Address' : 'E-posta Adresi',
      telefon: isEn ? 'Phone Number' : 'Telefon Numarası',
      konu: isEn ? 'Subject' : 'Konu',
      konuSecPlaceholder: isEn ? 'Select a topic' : 'Bir konu seçin',
      konuOptions: isEn
        ? ['SEO', 'GEO', 'Content', 'Performance', 'Backlink']
        : ['SEO', 'GEO', 'İçerik', 'Performans', 'Backlink'],
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
        <meta name="description" content={isEn ? "Get in touch with Fatih Emin Çakıroğlu. Book a free SEO and GEO consulting session today to discover your website's organic growth potential and next steps." : 'Fatih Emin Çakıroğlu ile iletişime geçin. Ücretsiz SEO ve GEO danışmanlığı görüşmesi için hemen randevu alın ve sitenizin organik büyüme potansiyelini öğrenin.'} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/contact' : 'https://fatihemincakiroglu.com/iletisim'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/iletisim" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/contact" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/iletisim" />
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href={isEn ? "/en" : "/"} style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[0]}</Link>
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
            {status === 'done' ? (
              <div style={{ padding: '18px 20px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '10px', color: '#16a34a', fontSize: '15px', fontWeight: 600 }}>
                {isEn ? '✓ Thank you! Your message has been sent — we will get back to you within 24 hours.' : '✓ Teşekkürler! Mesajınız gönderildi, 24 saat içinde size dönüş yapacağız.'}
              </div>
            ) : (
              <form onSubmit={handleSubmit} autoComplete="off" data-lpignore="true" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* autoComplete="off" + suppressHydrationWarning: Chrome bazen sayfa yenilendiğinde
                    daha önce forma yazılan metinleri otomatik geri yüklüyor. Bu, React'ın "boş"
                    olarak render ettiği input ile tarayıcının geri yüklediği metin arasında uyuşmazlığa
                    (hydration mismatch) yol açıp formu tıklanamaz hale getirebiliyordu. Bu satırlar
                    hem geri yüklemeyi engelliyor hem de olası bir uyuşmazlıkta React'ın çökmesini önlüyor. */}
                <input type="text" name="website" value={form.website} onChange={e => setForm({...form, website: e.target.value})}
                  autoComplete="off" tabIndex={-1} suppressHydrationWarning
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }} aria-hidden="true" />
                {[{id:'isim',label:t.form.isim,type:'text'},{id:'email',label:t.form.email,type:'email'},{id:'telefon',label:t.form.telefon,type:'tel'}].map(f => (
                  <div key={f.id}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#555', marginBottom: '6px' }}>{f.label}</label>
                    <input type={f.type} name={f.id} value={form[f.id]} onChange={e => setForm({...form, [f.id]: e.target.value})}
                      required={f.id === 'isim' || f.id === 'email'} autoComplete="off" suppressHydrationWarning
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none' }} />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#555', marginBottom: '6px' }}>{t.form.konu}</label>
                  <select name="konu" value={form.konu} onChange={e => setForm({...form, konu: e.target.value})}
                    suppressHydrationWarning
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none', background: '#fff', color: form.konu ? '#111' : '#999', appearance: 'none', WebkitAppearance: 'none', backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'><path d=\'M1 1l5 5 5-5\' stroke=\'%23999\' stroke-width=\'1.5\' fill=\'none\' fill-rule=\'evenodd\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}>
                    <option value="">{t.form.konuSecPlaceholder}</option>
                    {t.form.konuOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#555', marginBottom: '6px' }}>{t.form.mesaj}</label>
                  <textarea rows={5} name="mesaj" value={form.mesaj} onChange={e => setForm({...form, mesaj: e.target.value})}
                    required autoComplete="off" suppressHydrationWarning
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical' }} />
                </div>
                {status === 'error' && (
                  <div style={{ padding: '12px 16px', background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.25)', borderRadius: '8px', color: '#dc2626', fontSize: '13px', fontWeight: 600 }}>
                    {errorMsg}
                  </div>
                )}
                <button type="submit" disabled={status === 'sending'}
                  style={{ padding: '14px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '15px', cursor: status === 'sending' ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-body)', opacity: status === 'sending' ? 0.7 : 1 }}>
                  {status === 'sending' ? (isEn ? 'Sending...' : 'Gönderiliyor...') : t.form.btn}
                </button>
              </form>
            )}
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
