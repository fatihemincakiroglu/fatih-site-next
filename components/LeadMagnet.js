import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Ücretsiz PDF formu. E-posta /api/lead üzerinden size iletilir (bkz.
// pages/api/lead.js), ardından PDF indirmesi başlar. Kayıt başarısız olursa
// ziyaretçi engellenmez: hata mesajıyla birlikte doğrudan indirme linki gösterilir.
const PDF_URL = '/downloads/2025-teknik-seo-kontrol-listesi.pdf'

export default function LeadMagnet({ isEn = false, compact = false }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState('idle') // idle | sending | done | error | failed

  const t = isEn ? {
    badge: 'FREE PDF',
    title: 'Technical SEO Checklist',
    desc: '30 practical checkpoints across 5 categories — audit your own site in minutes. (The PDF is in Turkish.)',
    placeholder: 'Your email address',
    btn: 'Send me the PDF →',
    sending: 'Sending...',
    done: '✓ Your download has started — enjoy!',
    error: 'Please enter a valid email address.',
    failed: 'We could not save your email right now, but you can still download the PDF:',
    download: 'Download the PDF',
    note: 'No spam. Your email is only used to contact you about SEO.',
    privacy: 'Privacy Policy',
    privacyHref: '/en/privacy',
  } : {
    badge: 'ÜCRETSİZ PDF',
    title: 'Teknik SEO Kontrol Listesi',
    desc: '5 kategoride 30 pratik kontrol maddesiyle sitenizi birkaç dakikada denetleyin.',
    placeholder: 'E-posta adresiniz',
    btn: 'PDF\'i Gönder →',
    sending: 'Gönderiliyor...',
    done: '✓ İndirme başladı, afiyet olsun!',
    error: 'Lütfen geçerli bir e-posta adresi girin.',
    failed: 'E-postanızı şu an kaydedemedik, ama PDF\'i yine de indirebilirsiniz:',
    download: 'PDF\'i indir',
    note: 'Spam yok. E-postanız yalnızca SEO konusunda size ulaşmak için kullanılır.',
    privacy: 'Gizlilik Politikası',
    privacyHref: '/gizlilik',
  }

  const indir = () => {
    const link = document.createElement('a')
    link.href = PDF_URL
    link.download = '2025-teknik-seo-kontrol-listesi.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus('error'); return }
    setStatus('sending')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website, kaynak: router.asPath }),
      })
      if (res.status === 400) { setStatus('error'); return }
      if (!res.ok) throw new Error('lead_failed')
      if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { form: 'pdf_checklist' })
      setStatus('done')
      indir()
    } catch {
      setStatus('failed')
    }
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a1612 0%, #262019 100%)',
      borderRadius: '18px',
      padding: compact ? '24px' : '36px',
      border: '1px solid #2a241d',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '180px', height: '180px', background: 'radial-gradient(circle, rgba(232,86,10,0.18) 0%, transparent 70%)' }} />
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <span style={{ fontSize: '22px' }}>📄</span>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--orange)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{t.badge}</span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: compact ? '18px' : '24px', fontWeight: 800, color: '#fff', marginBottom: '8px', lineHeight: 1.3 }}>{t.title}</h3>
        <p style={{ fontSize: '14px', color: '#a8a29a', lineHeight: 1.6, marginBottom: '20px' }}>{t.desc}</p>

        {status === 'done' ? (
          <div style={{ padding: '14px 16px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '10px', color: '#4ade80', fontSize: '14px', fontWeight: 600 }}>
            {t.done}
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', position: 'relative' }}>
            <input type="text" name="website" value={website} onChange={e => setWebsite(e.target.value)}
              tabIndex={-1} autoComplete="off" aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }} />
            <input
              type="email"
              aria-label={t.placeholder}
              required
              value={email}
              onChange={e => { setEmail(e.target.value); if (status === 'error') setStatus('idle') }}
              placeholder={t.placeholder}
              style={{ flex: '1 1 200px', padding: '13px 16px', borderRadius: '8px', border: status === 'error' ? '1px solid #ef4444' : '1px solid #3a332a', background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none' }}
            />
            <button type="submit" disabled={status === 'sending'} style={{ padding: '13px 22px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-body)', cursor: 'pointer', whiteSpace: 'nowrap', opacity: status === 'sending' ? 0.7 : 1 }}>
              {status === 'sending' ? t.sending : t.btn}
            </button>
          </form>
        )}
        {status === 'error' && <p style={{ color: '#f87171', fontSize: '12px', marginTop: '8px' }}>{t.error}</p>}
        {status === 'failed' && (
          <p style={{ color: '#fbbf24', fontSize: '13px', marginTop: '10px' }}>
            {t.failed}{' '}
            <a href={PDF_URL} download style={{ color: 'var(--orange)', fontWeight: 700 }}>{t.download}</a>
          </p>
        )}
        {status !== 'done' && (
          <p style={{ fontSize: '11px', color: '#6b6459', marginTop: '10px' }}>
            {t.note}{' '}
            <Link href={t.privacyHref} style={{ color: '#8a8278', textDecoration: 'underline' }}>{t.privacy}</Link>
          </p>
        )}
      </div>
    </div>
  )
}
