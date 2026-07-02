import { useState } from 'react'

// NOT: Bu bileşen e-postayı şu an tarayıcının localStorage'ında saklıyor ve
// ardından PDF indirmesini tetikliyor. Gerçek bir e-posta listesi biriktirmek
// için buraya Mailchimp / ConvertKit / Brevo gibi bir servisin API isteğini
// eklemeniz gerekir (bkz. handleSubmit içindeki yorum).
export default function LeadMagnet({ isEn = false, compact = false }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  const t = isEn ? {
    badge: 'FREE PDF',
    title: '2025 Technical SEO Checklist',
    desc: '30 practical checkpoints across 5 categories — audit your own site in minutes.',
    placeholder: 'Your email address',
    btn: 'Send me the PDF →',
    sending: 'Sending...',
    done: '✓ Check your downloads — enjoy!',
    error: 'Please enter a valid email address.',
    note: 'No spam. Unsubscribe anytime.',
  } : {
    badge: 'ÜCRETSİZ PDF',
    title: '2025 Teknik SEO Kontrol Listesi',
    desc: '5 kategoride 30 pratik kontrol maddesiyle sitenizi birkaç dakikada denetleyin.',
    placeholder: 'E-posta adresiniz',
    btn: 'PDF\'i Gönder →',
    sending: 'Gönderiliyor...',
    done: '✓ İndirme başladı, afiyet olsun!',
    error: 'Lütfen geçerli bir e-posta adresi girin.',
    note: 'Spam yok. İstediğiniz zaman çıkabilirsiniz.',
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus('error'); return }
    setStatus('sending')

    // TODO: Gerçek e-posta listesi entegrasyonu için burada servis API'nize istek atın, örn:
    // await fetch('https://api.brevo.com/v3/contacts', { method: 'POST', headers: {...}, body: JSON.stringify({ email }) })
    try {
      const saved = JSON.parse(localStorage.getItem('lead_emails') || '[]')
      saved.push({ email, date: new Date().toISOString() })
      localStorage.setItem('lead_emails', JSON.stringify(saved))
    } catch {}

    setTimeout(() => {
      setStatus('done')
      const link = document.createElement('a')
      link.href = '/downloads/2025-teknik-seo-kontrol-listesi.pdf'
      link.download = '2025-teknik-seo-kontrol-listesi.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }, 600)
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
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              type="email"
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
        {status !== 'done' && <p style={{ fontSize: '11px', color: '#6b6459', marginTop: '10px' }}>{t.note}</p>}
      </div>
    </div>
  )
}
